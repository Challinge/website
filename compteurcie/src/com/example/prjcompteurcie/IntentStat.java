package com.example.prjcompteurcie;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class IntentStat extends Activity {

	private String activityName = null;
	private Intent activiteStat = null;
	private Button btnstatok = null;
	private EditText editstatlibzone;
	private EditText editstattraite;
	private EditText editstattotal;

	public final static String IDSTATZONE = "com.example.prjcompteurcie.idZone";

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.layout_statistiques);
		setTitle(getResources().getString(R.string.app_name)
				+ " - statistiques");

		// On récupère l'intent qui a lancé cette activité
		final Intent i = getIntent();

		activityName = i.getStringExtra(IntentCompteur.ACTIVITYCPT);

		if (activityName != null) {
			String[] temp;
			temp = activityName.split(";");

			// Sélection du nombre de compteurs traités.
			ZoneDAO zodao = new ZoneDAO(IntentStat.this);
			zodao.open();
			Zone z = zodao.selectionnerInfoZone(Integer.valueOf(temp[1]));
			zodao.close();

			editstatlibzone = (EditText) findViewById(R.id.editStatLibZone);
			editstattraite = (EditText) findViewById(R.id.editStatTraite);
			editstattotal = (EditText) findViewById(R.id.editStatTotal);

			editstatlibzone.setEnabled(true);
			editstatlibzone.setText(z.getLibelleZone());
			editstatlibzone.setEnabled(false);

			editstattraite.setEnabled(true);
			editstattraite.setText(String.valueOf(z.getTraite()));
			editstattraite.setEnabled(false);

			editstattotal.setEnabled(true);
			editstattotal.setText(String.valueOf(z.getTotal()));
			editstattotal.setEnabled(false);
		}

		activityName = i.getStringExtra(IntentPhoto.ACTIVITYPHOTO);

		if (activityName != null) {
			String[] temp;
			temp = activityName.split(";");
			
			
			// Sélection du nombre de compteurs traités.
			ZoneDAO zodao = new ZoneDAO(IntentStat.this);
			zodao.open();
			Zone z = zodao.selectionnerInfoZone(Integer.valueOf(temp[2]));
			zodao.close();

			editstatlibzone = (EditText) findViewById(R.id.editStatLibZone);
			editstattraite = (EditText) findViewById(R.id.editStatTraite);
			editstattotal = (EditText) findViewById(R.id.editStatTotal);

			editstatlibzone.setEnabled(true);
			editstatlibzone.setText(z.getLibelleZone());
			editstatlibzone.setEnabled(false);

			editstattraite.setEnabled(true);
			editstattraite.setText(String.valueOf(z.getTraite()));
			editstattraite.setEnabled(false);

			editstattotal.setEnabled(true);
			editstattotal.setText(String.valueOf(z.getTotal()));
			editstattotal.setEnabled(false);
		}
		
		activityName = i.getStringExtra(IntentRecap.ACTIVITYRECAP);

		if (activityName != null) {
			String[] temp;
			temp = activityName.split(";");

			// Sélection du nombre de compteurs traités.
			ZoneDAO zodao = new ZoneDAO(IntentStat.this);
			zodao.open();
			Zone z = zodao.selectionnerInfoZone(Integer.valueOf(temp[2]));
			zodao.close();

			editstatlibzone = (EditText) findViewById(R.id.editStatLibZone);
			editstattraite = (EditText) findViewById(R.id.editStatTraite);
			editstattotal = (EditText) findViewById(R.id.editStatTotal);

			editstatlibzone.setEnabled(true);
			editstatlibzone.setText(z.getLibelleZone());
			editstatlibzone.setEnabled(false);

			editstattraite.setEnabled(true);
			editstattraite.setText(String.valueOf(z.getTraite()));
			editstattraite.setEnabled(false);

			editstattotal.setEnabled(true);
			editstattotal.setText(String.valueOf(z.getTotal()));
			editstattotal.setEnabled(false);
		}
		
		
		btnstatok = (Button) findViewById(R.id.btnStatOk);
		btnstatok.setOnClickListener(new View.OnClickListener() {

			@Override
			public void onClick(View arg0) {
				// Puis on récupère le nom de l' activité qui l'a lancée, ou 0
				// si cet extra n'est pas dans l'intent
				activityName = i.getStringExtra(IntentCompteur.ACTIVITYCPT);

				String[] temp;
				if (activityName != null) {
					temp = activityName.split(";");
					for (int i = 0; i < temp.length; i++) {
						if (temp[i].equalsIgnoreCase("compteur")) {

							activiteStat = new Intent(IntentStat.this,
									IntentCompteur.class);

							// On récupère l'intent et son paramètre id utile
							// pour la suite.
							// par un split et son delimiter ";" et on renvoie à
							// IntentCompteur.
							activiteStat.putExtra(IDSTATZONE,
									Integer.valueOf(temp[1]));

							// Puis on lance l'intent !
							startActivity(activiteStat);

						}
					}
				}
				activityName = i.getStringExtra(IntentPhoto.ACTIVITYPHOTO);
				if (activityName != null) {
					temp = activityName.split(";");
					for (int i = 0; i < temp.length; i++) {
						if (temp[i].equalsIgnoreCase("photo")) {

							activiteStat = new Intent(IntentStat.this,
									IntentPhoto.class);
							
							activityName = activityName.substring(6);

							// On récupère l'intent et son paramètre id utile
							// pour la suite.
							// par un split et son delimiter ";" et on renvoie à
							// IntentCompteur.
							activiteStat.putExtra(IDSTATZONE,
									activityName);

							// Puis on lance l'intent !
							startActivity(activiteStat);

						}
					}
				}
				activityName = i.getStringExtra(IntentRecap.ACTIVITYRECAP);
				if (activityName != null) {
					temp = activityName.split(";");
					for (int i = 0; i < temp.length; i++) {
						if (temp[i].equalsIgnoreCase("recap")) {

							activiteStat = new Intent(IntentStat.this,
									IntentRecap.class);

							activityName = activityName.substring(6);
							
							// On récupère l'intent et son paramètre id utile
							// pour la suite.
							// par un split et son delimiter ";" et on renvoie à
							// IntentCompteur.
							activiteStat.putExtra(IDSTATZONE,
									activityName);
							

							// Puis on lance l'intent !
							startActivity(activiteStat);

						}
					}
				}

			}
			// }
		});
	}

}
