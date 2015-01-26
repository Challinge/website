package com.example.prjcompteurcie;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.lang.ref.WeakReference;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Date;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Toast;

@SuppressLint("SimpleDateFormat")
public class IntentConnexion extends Activity {

	private FileInputStream input = null;
	private File mFileUser = null;
	private File mFileMdp = null;
	private EditText textUser = null;
	private EditText textPass = null;
	private Button btnValider = null;
	private StringBuffer luUser = null;
	private StringBuffer luPass = null;

	private int mProgression = 0;
	private int mProgressStatus = 0;
	private ProgressBar mProgress = null;
	private Handler mHandler = new Handler();

	private ProgressTask mHandlerTask = null;
	public static final int NOTIFICATION_ID = 42;
	private static final int REQUEST_CODE = 0;
	private String notificationTitle;

	public final static String NBREZONES = "com.example.prjcompteurcie.nZone";

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.layout_connexion);
		setTitle(getResources().getString(R.string.app_name) + " - connexion");

		// On crée un fichier qui correspond à l'emplacement extérieur
		mFileUser = new File(Environment.getExternalStorageDirectory()
				.getPath() + "/android/" + "user.txt");
		// On crée un fichier qui correspond à l'emplacement extérieur
		mFileMdp = new File(Environment.getExternalStorageDirectory().getPath()
				+ "/android/" + "mdp.txt");

		// On utilise un StringBuffer pour construire la chaîne au
		// fur et à mesure.
		luUser = new StringBuffer();
		luPass = new StringBuffer();
		int value;

		// En externe : file User.
		if (Environment.MEDIA_MOUNTED.equals(Environment
				.getExternalStorageState())) {
			luUser = new StringBuffer();
			try {
				input = new FileInputStream(mFileUser);
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				while ((value = input.read()) != -1)
					luUser.append((char) value);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			if (input != null)
				try {
					input.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		}

		// En externe : file Mot de passe.
		if (Environment.MEDIA_MOUNTED.equals(Environment
				.getExternalStorageState())) {
			luPass = new StringBuffer();
			try {
				input = new FileInputStream(mFileMdp);
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				while ((value = input.read()) != -1)
					luPass.append((char) value);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			if (input != null)
				try {
					input.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		}
		textUser = (EditText) findViewById(R.id.editTextPseudo);
		textPass = (EditText) findViewById(R.id.editTextPass);
		btnValider = (Button) findViewById(R.id.buttonValider);
		mProgress = (ProgressBar) findViewById(R.id.progressBarConnexion);

		textUser.addTextChangedListener(textWatcher);
		textPass.addTextChangedListener(textWatcher);

		new Thread(new Runnable() {
			public void run() {
				while (mProgressStatus < 500) {
					mProgressStatus = doWork();
					try {
						Thread.sleep(100);
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					// Update the progress bar
					mHandler.post(new Runnable() {
						public void run() {
							mProgress.setProgress(mProgressStatus);
						}
					});
				}
			}
		}).start();

		btnValider.setOnClickListener(new View.OnClickListener() {

			@Override
			public void onClick(View v) {
				mProgress.setVisibility(0);
				// hashage de User.
				MessageDigest md = null;
				try {
					md = MessageDigest.getInstance("SHA-512");
				} catch (NoSuchAlgorithmException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}

				try {
					md.update(textUser.getText().toString().trim()
							.getBytes("UTF-8"));
				} catch (UnsupportedEncodingException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				} // Change this to "UTF-16" if needed
				byte[] digest = md.digest();

				// convert the byte to hex format method 1
				StringBuffer sbUser = new StringBuffer();
				for (int i = 0; i < digest.length; i++) {
					sbUser.append(Integer.toString((digest[i] & 0xff) + 0x100,
							16).substring(1));
				}

				// Hashage du mot de passe.
				try {
					md.update(textUser.getText().toString().trim()
							.getBytes("UTF-8"));
				} catch (UnsupportedEncodingException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				} // Change this to "UTF-16" if needed
				digest = md.digest();

				// convert the byte to hex format method 1
				StringBuffer sbPass = new StringBuffer();
				for (int i = 0; i < digest.length; i++) {
					sbPass.append(Integer.toString((digest[i] & 0xff) + 0x100,
							16).substring(1));
				}
				if (sbUser.toString().equalsIgnoreCase(luUser.toString())
						&& sbPass.toString()
								.equalsIgnoreCase(luPass.toString())) {

					ZoneDAO zodao = new ZoneDAO(IntentConnexion.this);
					CompteurDAO cptdao = new CompteurDAO(IntentConnexion.this);
					zodao.open();
					// Dénombre le nombre de zones.
					int nbreZone = zodao.selectionnerCountZone();
					zodao.close();
					if (nbreZone <= 0) {
						Date aujourdhui = new Date();

						SimpleDateFormat sdf = new SimpleDateFormat(
								"yyyy-mm-dd");

						Zone zo = new Zone(1, "treichville", 0, 3, "non");
						zodao.open();
						zodao.ajouter(zo);
						zodao.close();

						Compteur cpt = new Compteur(1, "cpt1", 10, 0, "non",
								"non", sdf.format(aujourdhui), 1);
						cptdao.open();
						cptdao.ajouter(cpt);
						cptdao.close();
						cpt = new Compteur(2, "cpt2", 45, 0, "non", "non", sdf
								.format(aujourdhui), 1);
						cptdao.open();
						cptdao.ajouter(cpt);
						cptdao.close();
						cpt = new Compteur(3, "cpt3", 51, 0, "non", "non", sdf
								.format(aujourdhui), 1);
						cptdao.open();
						cptdao.ajouter(cpt);
						cptdao.close();

						zo = new Zone(2, "marcory", 0, 4, "non");
						zodao.open();
						zodao.ajouter(zo);
						zodao.close();

						cpt = new Compteur(7, "cpt10", 15, 0, "non", "non", sdf
								.format(aujourdhui), 2);
						cptdao.open();
						cptdao.ajouter(cpt);
						cptdao.close();
						cpt = new Compteur(8, "cpt20", 8, 0, "non", "non", sdf
								.format(aujourdhui), 2);
						cptdao.open();
						cptdao.ajouter(cpt);
						cptdao.close();
						cpt = new Compteur(9, "cpt30", 95, 0, "non", "non", sdf
								.format(aujourdhui), 2);
						cptdao.open();
						cptdao.ajouter(cpt);
						cptdao.close();
						cpt = new Compteur(10, "cpt40", 110, 0, "non", "non",
								sdf.format(aujourdhui), 2);
						cptdao.open();
						cptdao.ajouter(cpt);
						cptdao.close();

						zo = new Zone(3, "abobo", 0, 3, "non");
						zodao.open();
						zodao.ajouter(zo);
						zodao.close();

						cpt = new Compteur(4, "cpt1", 101, 0, "non", "non", sdf
								.format(aujourdhui), 3);
						cptdao.open();
						cptdao.ajouter(cpt);
						cptdao.close();
						cpt = new Compteur(5, "cpt2", 454, 0, "non", "non", sdf
								.format(aujourdhui), 3);
						cptdao.open();
						cptdao.ajouter(cpt);
						cptdao.close();
						cpt = new Compteur(6, "cpt3", 745, 0, "non", "non", sdf
								.format(aujourdhui), 3);
						cptdao.open();
						cptdao.ajouter(cpt);
						cptdao.close();
					} else if (nbreZone > 0) {

						/*********
						 * SELECTION DES ELEMENTS NON MISE A JOUR DANS LA TABLE
						 * ZONE
						 ***********/
						// cptdao.open();
						// Compteur cpt = cptdao.selectionnerInfoCpt(4);
						// Log.d("IntentConnexion",
						// "***//////////////////////////////////////***"+
						// cpt.getRecu());
						// cptdao.close();

						zodao.open();
						// Dénombre le nombre de zones non a jour.
						int nbreZoneNonAJour = zodao
								.selectionnerCountZoneNonAJour();
						zodao.close();
						zodao.open();
						// Renvoie dans un tableau tous les idzones non mis a
						// jour.
						int[] tabIdZonesNonAJour = zodao
								.selectionnerIdZoneNonAJour(nbreZoneNonAJour);
						zodao.close();

						/*********
						 * SELECTION DES ELEMENTS NON MISE A JOUR DANS LA TABLE
						 * COMPTEUR
						 ***********/
						cptdao.open();
						// Dénombre le nombre de compteurs non a jour.
						int nbreCptsNonAJour = cptdao
								.selectionnerCountCompteurNonAjour();
						cptdao.close();
						cptdao.open();
						// Renvoie dans un tableau tous les idzones non mis a
						// jour.
						int[] tabIdCptNonAJour = cptdao
								.selectionnerIdCptNonAJour(nbreCptsNonAJour);
						cptdao.close();

						// Mise à jour de la base sur serveur physique par un
						// autre
						// thread asynchrone.
						// On recrée à chaque fois l'objet
						mHandlerTask = new ProgressTask(IntentConnexion.this,
								tabIdZonesNonAJour, tabIdCptNonAJour, zodao,
								cptdao);
						// On l'exécute
						mHandlerTask.execute();

					}

					zodao.open();

					// Dénombre le nombre de zones.
					nbreZone = zodao.selectionnerCountZone();

					zodao.close();
					// Le premier paramètre est le nom de l'activité
					// actuelle
					// Le second est le nom de l'activité de destination
					Intent activiteZone = new Intent(IntentConnexion.this,
							IntentZone.class);

					// On rajoute un extra
					activiteZone.putExtra(NBREZONES, nbreZone);
					// Puis on lance l'intent !
					startActivity(activiteZone);
					mProgressStatus = 501;
				} else {
					Toast.makeText(IntentConnexion.this,
							"Pseudo ou Mot de passe incorrect",
							Toast.LENGTH_LONG).show();
				}
			}

		});

	}

	// Sera utilisé à partir du moment où l'utilisateur écrit dans l'un des
	// EditText.
	private TextWatcher textWatcher = new TextWatcher() {

		@Override
		public void onTextChanged(CharSequence s, int start, int before,
				int count) {

			if (!textUser.getText().toString().trim().equalsIgnoreCase("")
					&& !textPass.getText().toString().trim()
							.equalsIgnoreCase("")) {
				btnValider.setEnabled(true);

			}
		}

		@Override
		public void beforeTextChanged(CharSequence s, int start, int count,
				int after) {

		}

		@Override
		public void afterTextChanged(Editable s) {

		}

	};

	// Simulation du chargement.
	public int doWork() {
		if (mProgression <= 500) {
			mProgression++;
			return mProgression;
		}
		return 500;
	}

	// L'AsyncTask est bien une classe interne statique
	static class ProgressTask extends AsyncTask<Void, String, String> {
		// Référence faible à l'activité
		private WeakReference<IntentConnexion> mActivity = null;
		// Récupération de l'email pour vérifier sa validité.

		private int[] tIdZoNonAJour = null;
		private int[] tIdCptNonAJour = null;

		String ligne = null;
		String lignes = null;
		private ZoneDAO zodao = null;
		private CompteurDAO cptdao = null;

		public ProgressTask(IntentConnexion pActivity, int[] tIdZoNonAJour,
				int[] tIdCptNonAJour, ZoneDAO zodao, CompteurDAO cptdao) {
			link(pActivity);

			this.tIdZoNonAJour = tIdZoNonAJour;
			this.tIdCptNonAJour = tIdCptNonAJour;
			this.zodao = zodao;
			this.cptdao = cptdao;
		}

		@Override
		protected void onPreExecute() {
			// Rien à faire.
		}

		@Override
		protected void onPostExecute(String lignes) {
			// if (mActivity.get() != null) {

			// if (result)
			// if (mActivity.get() != null)
			mActivity.get().createNotification(lignes);

			/*
			 * else Toast.makeText(mActivity.get(),
			 * "Echec  de la requête de validation", Toast.LENGTH_SHORT).show();
			 */
			// }
		}

		@Override
		protected String doInBackground(Void... arg0) {

			/*********
			 * MISE A JOUR DE LA TABLE COMPTEUR AU NIVEAU DE LA BASE DE DONNEES
			 * MYSQL PUIS DE LA BASE DE DONNEES SQLLITE
			 ***********/
			for (int i = 0; i < tIdCptNonAJour.length; i++) {
				cptdao.open();

				Compteur cpt = cptdao.selectionnerInfoCpt(tIdCptNonAJour[i]);

				cptdao.close();

				System.setProperty("http.keepAlive", "false");
				OutputStreamWriter writer = null;
				BufferedReader reader = null;
				HttpURLConnection connexion = null;
				try {
					// Encodage des paramètres de la requête
					String donnees = URLEncoder.encode("idz", "UTF-8")
							+ "="
							+ URLEncoder.encode(
									String.valueOf(cpt.getIdzone()), "UTF-8")
							+ "&"
							+ URLEncoder.encode("numcpt", "UTF-8")
							+ "="
							+ URLEncoder.encode(cpt.getNumcompteur(), "UTF-8")
							+ "&"
							+ URLEncoder.encode("nouvind", "UTF-8")
							+ "="
							+ URLEncoder.encode(
									String.valueOf(cpt.getNouvelindex()),
									"UTF-8") + "&"
							+ URLEncoder.encode("dterel", "UTF-8") + "="
							+ URLEncoder.encode(cpt.getDaterel(), "UTF-8") + "&" 
							+ URLEncoder.encode("rel", "UTF-8") + "="
							+ URLEncoder.encode(cpt.getReleve(), "UTF-8");

					String adresse = "http://192.168.1.5/cptcie/relevetous.php"; // localhost
																					// n'est
																					// pas
																					// supporté
																					// et
																					// n'envoie
																					// aucune
																					// réponse
					// On a envoyé les données à une adresse distante
					URL url = new URL(adresse);
					connexion = (HttpURLConnection) url.openConnection();
					connexion.setRequestMethod("POST");
					connexion.setDoOutput(true);
					connexion.setChunkedStreamingMode(0);
					// On envoie la requête ici
					writer = new OutputStreamWriter(connexion.getOutputStream());
					// On insère les données dans notre flux
					writer.write(donnees);
					// Et on s'assure que le flux est vidé
					writer.flush();
					// On lit la réponse ici
					reader = new BufferedReader(new InputStreamReader(
							connexion.getInputStream()));

					ligne = null;
					// Tant que « ligne » n'est pas null, c'est que le flux n'a
					// pas terminé d'envoyer des informations
					while ((ligne = reader.readLine()) != null) {
						lignes = ligne;

					}
					cptdao.open();
					cptdao.modifierRecu(cpt.getIdzone(), cpt.getNumcompteur(),
							lignes);
					cptdao.close();

					// Toast.makeText(mActivity.get(), ligne,
					// Toast.LENGTH_SHORT)
					// .show();
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

			}

			/*********
			 * MISE A JOUR DE LA TABLE ZONE AU NIVEAU DE LA BASE DE DONNEES
			 * MYSQL PUIS DE LA BASE DE DONNEES SQLLITE
			 ***********/
			for (int i = 0; i < tIdZoNonAJour.length; i++) {

				zodao.open();
				Zone zo = zodao.selectionnerInfoZone(tIdZoNonAJour[i]);
				zodao.close();

				System.setProperty("http.keepAlive", "false");
				OutputStreamWriter writer = null;
				BufferedReader reader = null;
				HttpURLConnection connexion = null;
				try {
					// Encodage des paramètres de la requête
					String donnees = URLEncoder.encode("idz", "UTF-8")
							+ "="
							+ URLEncoder.encode(String.valueOf(zo.getIdZone()),
									"UTF-8")
							+ "&"
							+ URLEncoder.encode("traite", "UTF-8")
							+ "="
							+ URLEncoder.encode(String.valueOf(zo.getTraite()),
									"UTF-8");

					String adresse = "http://192.168.1.2/cptcie/relevetous.php"; // localhost
																					// n'est
																					// pas
																					// supporté
																					// et
																					// n'envoie
																					// aucune
																					// réponse
					// On a envoyé les données à une adresse distante
					URL url = new URL(adresse);
					connexion = (HttpURLConnection) url.openConnection();
					connexion.setRequestMethod("POST");
					connexion.setDoOutput(true);
					connexion.setChunkedStreamingMode(0);
					// On envoie la requête ici
					writer = new OutputStreamWriter(connexion.getOutputStream());
					// On insère les données dans notre flux
					writer.write(donnees);
					// Et on s'assure que le flux est vidé
					writer.flush();
					// On lit la réponse ici
					reader = new BufferedReader(new InputStreamReader(
							connexion.getInputStream()));

					ligne = null;
					// Tant que « ligne » n'est pas null, c'est que le flux n'a
					// pas terminé d'envoyer des informations
					while ((ligne = reader.readLine()) != null) {
						lignes = ligne;

					}

					zodao.open();
					zodao.modifierRecu(zo.getIdZone(), lignes);
					zodao.close();

					// Toast.makeText(mActivity.get(), ligne,
					// Toast.LENGTH_SHORT)
					// .show();
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

			}
			return lignes;
		}

		// Méthode callback pour décrire la situation d'update.
		// Pas forcer d'implémenter cela dans ce TP.
		@Override
		protected void onProgressUpdate(String... resp) {
			// Mise à jour de la validité ou non.
			// UTILISER CE MOYEN EN NOTIFICATION.
			// if (mActivity.get() != null)
			// mActivity.get().updateReponseEmail(resp[0]); // Juste en haut
			// avant
			// cette classe.
		}

		// Méthode callback pour décrire la situation d'annulation.
		@Override
		protected void onCancelled() {

		}

		public void link(IntentConnexion pActivity) {
			mActivity = new WeakReference<IntentConnexion>(pActivity);
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
				.setContentTitle(
						getResources().getString(R.string.notification_title))
				.setContentText(
						getResources().getString(R.string.notification_desc))
				.setContentIntent(pendingIntent);

		mNotification.notify(NOTIFICATION_ID, builder.build());
	}
}
