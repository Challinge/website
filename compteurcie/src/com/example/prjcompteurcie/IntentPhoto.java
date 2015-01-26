package com.example.prjcompteurcie;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class IntentPhoto extends Activity {

	private Button btnphotosuivant = null;
	private Button btnphotostat = null;

	public final static String ACTIVITYPHOTO = "com.example.prjcompteurcie.activityphoto";
	@SuppressWarnings("unused")
	private int idz = 0;
	private String tmpString = null;
	private String[] tabString = null;

	@Override
	public void onCreate(Bundle savedInstanceState) {

		super.onCreate(savedInstanceState);
		setContentView(R.layout.layout_photo);
		setTitle(getResources().getString(R.string.app_name) + " - photo");

		// On récupère l'intent qui a lancé cette activité
		Intent i = getIntent();

		// Puis on récupère l'id de la zone donnée dans l'autre activité, ou 0
		// si cet extra n'est pas dans l'intent

		tmpString = i.getStringExtra(IntentCompteur.ACTIVITYCPT);
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
		// Récupère l'id zone de statitique.
		// if (idz == 0) {
		// idz = i.getIntExtra(IntentStat.IDSTATZONE, 0);
		// }

		btnphotosuivant = (Button) findViewById(R.id.btnPhotoSuivant);
		btnphotosuivant.setOnClickListener(new View.OnClickListener() {

			@Override
			public void onClick(View arg0) {
				// TODO Auto-generated method stub
				// if this button is clicked, close
				// current activity
				Intent activiteRecap = new Intent(IntentPhoto.this,
						IntentRecap.class);

				// On ajoute l'idzone. pour le réultisliser dans IntentCompteur.
				activiteRecap.putExtra(ACTIVITYPHOTO, tmpString);

				// Puis on lance l'intent !
				startActivity(activiteRecap);
			}

		});

		btnphotostat = (Button) findViewById(R.id.btnPhotoStat);
		btnphotostat.setOnClickListener(new View.OnClickListener() {

			@Override
			public void onClick(View arg0) {

				// if this button is clicked, close
				// current activity
				Intent activiteStat = new Intent(IntentPhoto.this,
						IntentStat.class);

				// Pour savoir quel est l'activité vers laquel on revient, avec
				// son paramètre
				// qui l'a lancée.
				String nameActivty = "photo";
				nameActivty = nameActivty + ";" + tmpString; 
				
				// String.valueOf(idz);
				// //Modifié
				// pour cause de
				// java
				// nullpointer.

				// On rajoute un extra
				activiteStat.putExtra(ACTIVITYPHOTO, nameActivty);

				// Puis on lance l'intent !
				startActivity(activiteStat);
			}

		});
	}

}
