package com.example.prjcompteurcie;

import java.text.SimpleDateFormat;
import java.util.Date;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

@SuppressLint("SimpleDateFormat")
public class IntentCompteur extends Activity {

	private EditText editnumcpt = null;
	private EditText editanind = null;
	private EditText editnoind = null;
	private CompteurDAO cptdao = null;
	private Compteur cpt = null;
	private int idz = 0;
	private Button btncptsuivant = null;

	private int anind = 0;
	private int noind = 0;
	private Button btncptstat = null;
	
	public final static String ACTIVITYCPT = "com.example.prjcompteurcie.activitycpt";
	private String[] tabString = null;
	private String tmpString = null;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.layout_compteur);
		setTitle(getResources().getString(R.string.app_name) + " - relevé");

		// On récupère les views de cet activité.
		editnumcpt = (EditText) findViewById(R.id.editNumCompteur);
		editanind = (EditText) findViewById(R.id.editAncienIndex);
		editnoind = (EditText) findViewById(R.id.editNouvelIndex);

		// Evénement au changement du texte ou de nombre dans l'EditText.
		editnumcpt.addTextChangedListener(editWatcherNumCpt);
		editnoind.addTextChangedListener(editWatcherNoIndex);

		// On récupère l'intent qui a lancé cette activité
		Intent i = getIntent();

		// Puis on récupère l'id de la zone donnée dans l'autre activité, ou 0
		// si cet extra n'est pas dans l'intent
		idz = i.getIntExtra(IntentZone.IDZONE, 0);
		
		//Récupère l'id zone de statitique.
		if (idz == 0){
			idz = i.getIntExtra(IntentStat.IDSTATZONE, 0);
			if (idz == 0){
				tmpString = i.getStringExtra(IntentRecap.ACTIVITYRECAP);
				tabString = tmpString.split(";");
				idz  = Integer.valueOf(tabString[1]);
				
			}
		}

		editnoind.setOnFocusChangeListener(new View.OnFocusChangeListener() {

			@Override
			public void onFocusChange(View v, boolean hasFocus) {
				editnoind.setText("");

			}
		});
		
		btncptstat = (Button) findViewById(R.id.btnCptStat);
		btncptstat.setOnClickListener(new View.OnClickListener() {

			@Override
			public void onClick(View arg0) {
				
				// if this button is clicked, close
				// current activity
				Intent activiteStat = new Intent(IntentCompteur.this,
						IntentStat.class);
				
				//Pour savoir quel est l'activité vers laquel on revient, avec son paramètre
				//qui l'a lancée.
				String nameActivty = "compteur";
				nameActivty = nameActivty + ";" + String.valueOf(idz);
				
				// On rajoute un extra
				activiteStat.putExtra(ACTIVITYCPT, nameActivty);
				
				// Puis on lance l'intent !
				startActivity(activiteStat);
			}
			
		});

		btncptsuivant = (Button) findViewById(R.id.btnCompteurSuivant);
		btncptsuivant.setOnClickListener(new View.OnClickListener() {

			@Override
			public void onClick(View arg0) {
				if (noind > anind) {
					// Affichage d'un alertdialogue
					AlertDialog.Builder alertD = new AlertDialog.Builder(
							IntentCompteur.this);
					alertD.setCancelable(false);
					alertD.setMessage("N° Compteur :"
							+ editnumcpt.getText().toString().trim() + " -- "
							+ "Nouvel Index :"
							+ editnoind.getText().toString().trim() + "    "
							+ "Voulez-vous l'enregistrer?");
					alertD.setTitle("Enregistrement temporaire");
					alertD.setNegativeButton("Non",
							new DialogInterface.OnClickListener() {
								public void onClick(DialogInterface dialog,
										int id) {
									// if this button is clicked, just close
									// the dialog box and do nothing
									dialog.cancel();
								}
							});
					alertD.setPositiveButton("Oui",
							new DialogInterface.OnClickListener() {
								public void onClick(DialogInterface dialog,
										int id) {
									
									Date aujourdhui = new Date();
									
								    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd");
								    
									//Mise à jour temporaire du compteur dans la base de données.
									CompteurDAO cptdao = new CompteurDAO(IntentCompteur.this);
									cptdao.open();
									
									cptdao.modifierCpt(idz, editnumcpt.getText().toString(),
											editnoind.getText().toString(), sdf.format(aujourdhui),"non");
									cptdao.close();
									
									String transfertDonneesCpt = "donnees";
									transfertDonneesCpt = transfertDonneesCpt + ";" + String.valueOf(idz) + ";"
											+ editnumcpt.getText().toString() + ";" 
											+ editnoind.getText().toString() ;
									
									// if this button is clicked, close
									// current activity
									Intent activitePhoto = new Intent(IntentCompteur.this,
											IntentPhoto.class);
									
									// On rajoute un extra
									activitePhoto.putExtra(ACTIVITYCPT, transfertDonneesCpt);
									
									// Puis on lance l'intent !
									startActivity(activitePhoto);
									
								}
							});
					
					AlertDialog alertDialog = alertD.create();
					alertDialog.show();
				} else {
					Toast.makeText(
							IntentCompteur.this,
							"Le nouvel index doit être supérieur à l'ancien index",
							Toast.LENGTH_LONG).show();
				}
			}
		});

	}

	// Sera utilisé à partir du moment où l'utilisateur écrit dans l'un des
	// EditText.
	private TextWatcher editWatcherNumCpt = new TextWatcher() {

		@Override
		public void onTextChanged(CharSequence s, int start, int before,
				int count) {

		}

		@Override
		public void beforeTextChanged(CharSequence s, int start, int count,
				int after) {

		}

		@Override
		public void afterTextChanged(Editable s) {
			cptdao = new CompteurDAO(IntentCompteur.this);
			cptdao.open();
			cpt = cptdao.selectionnerInfoCpt(editnumcpt.getText().toString()
					.trim(), idz);
			cptdao.close();

			if (editnumcpt.getText().toString().trim().equalsIgnoreCase("")) {
				editnoind.setEnabled(true);
				editnoind.setText("0");
				editnoind.setEnabled(false);
				btncptsuivant.setEnabled(false);
			}
			if (!editnumcpt.getText().toString().trim().equalsIgnoreCase("")
					&& cpt.getAncienindex() > 0) {
				editanind.setEnabled(true);
				editanind.setText(String.valueOf(cpt.getAncienindex()));
				editanind.setEnabled(false);
				editnoind.setEnabled(true);
				editnoind.setText(String.valueOf(cpt.getNouvelindex()));
				
				if (cpt.getReleve().equalsIgnoreCase("true")){
					Toast.makeText(IntentCompteur.this,
							"Compteur déjà relevé, saisissez un autre compteur, s'il vous plait!",
							Toast.LENGTH_LONG).show();
					editnoind.setEnabled(false);
					btncptsuivant.setEnabled(false);
				}

			} else if (!editnumcpt.getText().toString().trim()
					.equalsIgnoreCase("")
					&& cpt.getAncienindex() <= 0) {
				editanind.setEnabled(true);
				editanind.setText("0");
				editanind.setEnabled(false);
				editnoind.setEnabled(true);
				editnoind.setText("0");
				editnoind.setEnabled(false);
			}

		}

	};
	private TextWatcher editWatcherNoIndex = new TextWatcher() {

		@Override
		public void onTextChanged(CharSequence s, int start, int before,
				int count) {

		}

		@Override
		public void beforeTextChanged(CharSequence s, int start, int count,
				int after) {

		}

		@Override
		public void afterTextChanged(Editable s) {
			
			if (!editnoind.getText().toString().trim().equalsIgnoreCase("")) {
				editanind.setEnabled(true);
				anind = Integer.valueOf(editanind.getText().toString().trim());
				editanind.setEnabled(false);
				noind = Integer.valueOf(editnoind.getText().toString().trim());
				if (noind > 0) {
					btncptsuivant.setEnabled(true);
				} else if (noind <= 0) {
					btncptsuivant.setEnabled(false);
				}
			}
		}
	};
}
