package com.example.prjcompteurcie;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class IntentZone extends Activity {

	private ZoneDAO zodao = null; 
	private AutoCompleteTextView completeZone = null;
    private Zone zone = null;
	private EditText edittraite = null;
	private EditText edittotal = null;
	private Button btnzonesuivant = null;
	
	public final static String IDZONE = "com.example.prjcompteurcie.idZone";
	
	private int idz = 0; //Pour récupérer l'id de la zone, utile pour l'activité IntentCompteur.
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.layout_zone);
		setTitle(getResources().getString(R.string.app_name) + " - zone");

		// On commence à charger le Autocomplete.
		zodao = new ZoneDAO(IntentZone.this);

		// On récupère l'intent qui a lancé cette activité
		Intent i = getIntent();

		// Puis on récupère le nombre de zones donné dans l'autre activité, ou 0
		// si cet extra n'est pas dans l'intent
		int nbreZone = i.getIntExtra(IntentConnexion.NBREZONES, 0);
		
		if (nbreZone == 0){
			 nbreZone = i.getIntExtra(IntentRecap.ACTIVITYRECAP, 0);
		}

		zodao.open();
		String[] tabZone = zodao.selectionnerLibZone(nbreZone);
		zodao.close();
		// On récupère l'AutoCompleteTextView déclaré dans notre layout
		completeZone = (AutoCompleteTextView) findViewById(R.id.autoCompleteLiZone);
		completeZone.setThreshold(2);
		
		
		//On récupère les views de cet activité.
		edittraite = (EditText) findViewById(R.id.editTraite);
		edittotal = (EditText) findViewById(R.id.editTotal);
		
		btnzonesuivant  = (Button) findViewById(R.id.buttonZoneSuivant); 
		
		// On associe un adaptateur à notre liste de couleurs…
		ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
				android.R.layout.simple_dropdown_item_1line, tabZone);
		// … puis on indique que notre AutoCompleteTextView utilise cet
		// adaptateur
		completeZone.setAdapter(adapter);
		completeZone.addTextChangedListener(completeWatcherZone);
		btnzonesuivant.setOnClickListener(new View.OnClickListener(){

			@Override
			public void onClick(View arg0) {
				// Le premier paramètre est le nom de l'activité
				// actuelle
				// Le second est le nom de l'activité de destination
				Intent activiteCompteur = new Intent(IntentZone.this,
						IntentCompteur.class);
				
				// On rajoute un extra
				activiteCompteur.putExtra(IDZONE, idz);
				
				// Puis on lance l'intent !
				startActivity(activiteCompteur);
				
			}
			
		});
		
		
	}

	// Sera utilisé à partir du moment où l'utilisateur écrit dans l'un des
	// EditText.
	private TextWatcher completeWatcherZone = new TextWatcher() {

		private int inttotal = 0;

		@Override
		public void onTextChanged(CharSequence s, int start, int before, int count) {
			
		}

		@Override
		public void beforeTextChanged(CharSequence s, int start, int count,
				int after) {

		}

		@Override
		public void afterTextChanged(Editable s) {
			zodao = new ZoneDAO(IntentZone.this);
			zodao.open();
			zone = zodao.selectionnerInfoZone(completeZone.getText().toString().trim());
			zodao.close();
			edittraite.setEnabled(true);
			edittraite.setText(String.valueOf(zone.getTraite()));
			edittraite.setEnabled(false);
			edittotal.setEnabled(true);
			edittotal.setText(String.valueOf(zone.getTotal()));
			edittotal.setEnabled(false);
			
			edittotal.setEnabled(true);
			inttotal = Integer.valueOf(edittotal.getText().toString().trim());
			edittotal.setEnabled(false);
			
			if (completeZone.getText().toString().trim().equalsIgnoreCase("")){
				btnzonesuivant.setEnabled(false);
			}
			if (!completeZone.getText().toString().trim().equalsIgnoreCase("")
					&& inttotal > 0) {
				
				idz = (int)zone.getIdZone();
				if (zone.getTraite() >= zone.getTotal()) {
					btnzonesuivant.setEnabled(false);
					Toast.makeText(
							IntentZone.this,
							"Tous les compteurs ont été relevés. Saisissez une autre zone, s'il vous plait!",
							Toast.LENGTH_LONG).show();
				}else if (zone.getTraite() < zone.getTotal()){
					btnzonesuivant.setEnabled(true);
				}
			}
		}

	};

}