package com.example.prjcompteurcie;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.lang.ref.WeakReference;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

@SuppressLint("SimpleDateFormat")
public class IntentRecap extends Activity {

	private Button btnrecapsuivant = null;
	private Button btnrecapfin = null;
	private Button btnrecapzone = null;
	private Button btnrecapstat = null;
	private EditText editrecapnumcpt = null;
	private EditText editrecapnoind = null;

	private int idz = 0;
	public final static String ACTIVITYRECAP = "com.example.prjcompteurcie.activityrecap";
	private String[] tabString = null;
	private String tmpString = null;
	
	private ProgressTask mHandler = null;
	
	public static final int NOTIFICATION_ID = 42;
	private static final int REQUEST_CODE = 0;
	private String notificationTitle;

	
	@Override
	public void onCreate(Bundle savedInstanceState) {

		super.onCreate(savedInstanceState);
		setContentView(R.layout.layout_recapitulatif);
		setTitle(getResources().getString(R.string.app_name)
				+ " - r�capitulatif");

		// On r�cup�re l'intent qui a lanc� cette activit�
		Intent i = getIntent();

		// Puis on r�cup�re l'id de la zone donn�e dans l'autre activit�, ou 0
		// si cet extra n'est pas dans l'intent
		tmpString = i.getStringExtra(IntentPhoto.ACTIVITYPHOTO);
		if (tmpString != null) {
			tabString = tmpString.split(";");
			idz = Integer.valueOf(tabString[1]);
		} else if (tmpString == null) {

			tmpString = i.getStringExtra(IntentStat.IDSTATZONE);
			if (tmpString != null) {
				tabString = tmpString.split(";");
				idz = Integer.valueOf(tabString[1]);

			}
		}
		// R�cup�re l'id zone de statitique.
		// if (idz == 0) {
		// idz = i.getIntExtra(IntentStat.IDSTATZONE, 0);
		// }

		// **********************A OBSERVER********************************///
		// String uri = "drawable/dupral";

		// int imageResource = R.drawable.icon;
		// int imageResource = getResources().getIdentifier(uri, null,
		// getPackageName());

		// ImageView imageView = (ImageView) findViewById(R.id.imageView2);
		// Drawable image = getResources().getDrawable(imageResource);
		// imageView.setImageDrawable(image);
		// **********************FIN A
		// OBSERVER********************************///

		editrecapnumcpt = (EditText) findViewById(R.id.editRecapNumcpt);
		editrecapnoind = (EditText) findViewById(R.id.editRecapNouvInd);

		editrecapnumcpt.setEnabled(true);
		editrecapnumcpt.setText(tabString[2]);
		editrecapnumcpt.setEnabled(false);

		editrecapnoind.setEnabled(true);
		editrecapnoind.setText(tabString[3]);
		editrecapnoind.setEnabled(false);

		btnrecapsuivant = (Button) findViewById(R.id.btnRecapSuivant);
		btnrecapsuivant.setOnClickListener(new View.OnClickListener() {

			@Override
			public void onClick(View arg0) {
				// Affichage d'un alertdialogue
				AlertDialog.Builder alertD = new AlertDialog.Builder(
						IntentRecap.this);
				alertD.setCancelable(false);
				alertD.setMessage("Voulez-vous l'enregistrer d�finitivement?");
				alertD.setTitle("Enregistrement d�finitif");
				alertD.setNegativeButton("Non",
						new DialogInterface.OnClickListener() {
							public void onClick(DialogInterface dialog, int id) {
								// if this button is clicked, just close
								// the dialog box and do nothing
								dialog.cancel();
							}
						});
				alertD.setPositiveButton("Oui",
						new DialogInterface.OnClickListener() {

							public void onClick(DialogInterface dialog, int id) {
								
								Date aujourdhui = new Date();
								
							    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd");
							    
								// Mise � jour d�finitif du compteur dans la
								// base de donn�es.
								CompteurDAO cptdao = new CompteurDAO(
										IntentRecap.this);
								cptdao.open();
								cptdao.modifierCpt(idz, tabString[2],
										tabString[3], sdf.format(aujourdhui), "oui");
								cptdao.close();

								// S�lection du nombre de compteurs trait�s.
								ZoneDAO zodao = new ZoneDAO(IntentRecap.this);
								zodao.open();
								Zone z = zodao.selectionnerInfoZone(idz);
								zodao.close();

								int traite = z.getTraite();
								traite = traite + 1;
								int total = z.getTotal();
								// Mise � jour du nombre de compteurs trait�s,
								// apr�s
								// incr�mentation.
								zodao.open();
								zodao.modifierTraite(traite, idz);
								zodao.close();
								
								//Mise � jour de la base sur serveur physique par un autre thread asynchrone.
								// On recr�e � chaque fois l'objet
								mHandler = new ProgressTask(IntentRecap.this, idz, tabString[2],
										tabString[3], "oui", sdf.format(aujourdhui),  traite);
								// On l'ex�cute
								mHandler.execute();
								
								if (traite < total) {
									// if this button is clicked, close
									// current activity
									Intent activiteCompteur = new Intent(
											IntentRecap.this,
											IntentCompteur.class);

									// On ajoute l'idzone. pour le r�ultisliser
									// dans
									// IntentCompteur.
									activiteCompteur.putExtra(ACTIVITYRECAP,
											tmpString);

									// Puis on lance l'intent !
									startActivity(activiteCompteur);
								} else if (traite >= total) {
									btnrecapsuivant.setEnabled(false);
									Toast.makeText(
											IntentRecap.this,
											"Tous les compteurs ont �t� relev�s. Cliquez sur 'Zone' pour choisir une autre, s'il vous plait!",
											Toast.LENGTH_LONG).show();
								}
							}
						});

				AlertDialog alertDialog = alertD.create();
				alertDialog.show();

			}

		});

		btnrecapfin = (Button) findViewById(R.id.btnRecapFin);
		btnrecapfin.setOnClickListener(new View.OnClickListener() {

			@Override
			public void onClick(View arg0) {
				// TODO Auto-generated method stub
				// if this button is clicked, close
				// current activity
				Intent activiteMain = new Intent(IntentRecap.this,
						MainActivity.class);

				// Puis on lance l'intent !
				startActivity(activiteMain);
			}

		});

		btnrecapzone = (Button) findViewById(R.id.btnRecapZone);
		btnrecapzone.setOnClickListener(new View.OnClickListener() {

			@Override
			public void onClick(View arg0) {
				// TODO Auto-generated method stub
				// if this button is clicked, close
				// current activity
				ZoneDAO zodao = new ZoneDAO(IntentRecap.this);
				zodao.open();
				// D�nombre le nombre de zones.
				int nbreZone = zodao.selectionnerCountZone();
				zodao.close();

				Intent activiteZone = new Intent(IntentRecap.this,
						IntentZone.class);

				activiteZone.putExtra(ACTIVITYRECAP, nbreZone);

				// Puis on lance l'intent !
				startActivity(activiteZone);
			}

		});

		btnrecapstat = (Button) findViewById(R.id.btnRecapStat);
		btnrecapstat.setOnClickListener(new View.OnClickListener() {

			@Override
			public void onClick(View arg0) {

				// if this button is clicked, close
				// current activity
				Intent activiteStat = new Intent(IntentRecap.this,
						IntentStat.class);

				// Pour savoir quel est l'activit� vers laquel on revient, avec
				// son param�tre
				// qui l'a lanc�e.
				String nameActivty = "recap";
				nameActivty = nameActivty + ";" + tmpString; // String.valueOf(idz);
																// //Modifi�
																// pour cause de
																// java
																// nullpointer.

				// On rajoute un extra
				activiteStat.putExtra(ACTIVITYRECAP, nameActivty);

				// Puis on lance l'intent !
				startActivity(activiteStat);
			}

		});
	}

	
	
	// L'AsyncTask est bien une classe interne statique
	static class ProgressTask extends AsyncTask<Void, String, String> {
		// R�f�rence faible � l'activit�
		private WeakReference<IntentRecap> mActivity = null;
		// R�cup�ration de l'email pour v�rifier sa validit�.
		private int idZ = 0;
		private String numCpt = null;
		private String nouvInd = null;
		private String rel = null;
		private String dterel = null;
		private int traite = 0;
		
		String ligne = null;
		String lignes = null;
		
		public ProgressTask(IntentRecap pActivity, int idz, String numcpt, String nouvind, String rel, String dterel, int traite) {
			link(pActivity);
			this.idZ = idz;
			this.numCpt = numcpt;
			this.nouvInd = nouvind;
			this.rel = rel;
			this.traite = traite;
			this.dterel = dterel;
		}

		@Override
		protected void onPreExecute() {
			// Rien � faire.
		}

		@Override
		protected void onPostExecute(String lignes) {
			//if (mActivity.get() != null) {

				// if (result)
				//if (mActivity.get() != null)
					mActivity.get().createNotification(lignes);
					
				/*
				 * else Toast.makeText(mActivity.get(),
				 * "Echec  de la requ�te de validation",
				 * Toast.LENGTH_SHORT).show();
				 */
			//}
		}

		@Override
		protected String doInBackground(Void... arg0) {
			System.setProperty("http.keepAlive", "false");
			OutputStreamWriter writer = null;
			BufferedReader reader = null;
			HttpURLConnection connexion = null;
			
			try {
				// Encodage des param�tres de la requ�te
				String donnees = URLEncoder.encode("idz", "UTF-8") + "="
						+ URLEncoder.encode(String.valueOf(idZ), "UTF-8") + "&"
				 		+ URLEncoder.encode("numcpt", "UTF-8") + "="
				 		+ URLEncoder.encode(numCpt, "UTF-8") + "&"
				 		+ URLEncoder.encode("nouvind", "UTF-8") + "="
				 		+ URLEncoder.encode(nouvInd, "UTF-8") + "&"
				 		+ URLEncoder.encode("rel", "UTF-8") + "="
				 		+ URLEncoder.encode(rel, "UTF-8") + "&"
				 		+ URLEncoder.encode("dterel", "UTF-8") + "="
				 		+ URLEncoder.encode(dterel, "UTF-8") + "&"
				 		+ URLEncoder.encode("trai", "UTF-8") + "="
				 		+ URLEncoder.encode(String.valueOf(traite), "UTF-8");
				 		
				String adresse = "http://192.168.1.5/cptcie/releve.php"; // localhost
																		// n'est
																		// pas
																		// support�
																		// et
																		// n'envoie
																		// aucune
																		// r�ponse
				// On a envoy� les donn�es � une adresse distante
				URL url = new URL(adresse);
				connexion = (HttpURLConnection) url.openConnection();
				connexion.setRequestMethod("POST");
				connexion.setDoOutput(true);
				connexion.setChunkedStreamingMode(0);
				// On envoie la requ�te ici
				writer = new OutputStreamWriter(connexion.getOutputStream());
				// On ins�re les donn�es dans notre flux
				writer.write(donnees);
				// Et on s'assure que le flux est vid�
				writer.flush();
				// On lit la r�ponse ici
				reader = new BufferedReader(new InputStreamReader(
						connexion.getInputStream()));
				
				ligne = null;
				// Tant que � ligne � n'est pas null, c'est que le flux n'a
				// pas termin� d'envoyer des informations
				while ((ligne = reader.readLine()) != null) {
					lignes = ligne;
					
				}
				Log.d("IntentRecap", "IntentRecap - doInBackground -----" + lignes);
				
				//Toast.makeText(mActivity.get(), ligne, Toast.LENGTH_SHORT)
					//	.show();
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				try {
					writer.close();
				} catch (Exception e) {
				}
				try {
					reader.close();
				} catch (Exception e) {
				}
				try {
					connexion.disconnect();
				} catch (Exception e) {
				}
			}
			return lignes;
		}

		// M�thode callback pour d�crire la situation d'update.
		// Pas forcer d'impl�menter cela dans ce TP.
		@Override
		protected void onProgressUpdate(String... resp) {
			// Mise � jour de la validit� ou non.
			//UTILISER CE MOYEN EN NOTIFICATION.
			//if (mActivity.get() != null)
				//mActivity.get().updateReponseEmail(resp[0]); // Juste en haut
																// avant
																// cette classe.
		}

		// M�thode callback pour d�crire la situation d'annulation.
		@Override
		protected void onCancelled() {
			
		}

		public void link(IntentRecap pActivity) {
			mActivity = new WeakReference<IntentRecap>(pActivity);
		}
		
	}
	
	@SuppressLint("NewApi")
	private final void createNotification(String lis) {
		
		final NotificationManager mNotification = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);

		final Intent launchNotifiactionIntent = new Intent(this,
				IntentRecap.class);
		final PendingIntent pendingIntent = PendingIntent.getActivity(this,
				REQUEST_CODE, launchNotifiactionIntent,
				PendingIntent.FLAG_ONE_SHOT);

		Notification.Builder builder = new Notification.Builder(this)
				.setWhen(System.currentTimeMillis())
				.setTicker(notificationTitle)
				.setSmallIcon(R.drawable.notification)
				.setContentTitle(getResources().getString(R.string.notification_title))
				.setContentText(getResources().getString(R.string.notification_desc))
				.setContentIntent(pendingIntent);

		mNotification.notify(NOTIFICATION_ID, builder.build());
	}
	
	
}