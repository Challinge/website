/**
 * @ADOUKO Franck Venance
 */
Ext.define("CLVETLAT.controller.formulaires.Proprietaire", {
	extend : 'Ext.app.Controller',

	views : ['formulaires.Proprietaire'],
	stores : ['formulaires.Animal'],
	refs: [{
	    // A component query
	    selector: 'fanimal',
	    ref: 'animalF' //g�n�re getAnimalList qu'on peut utiliser.
	}],

	init : function() {
		this.control({
			//Gestion de l�venement click du bouton de libell� suivant de views/formulaires/Propriitaire.
			'fproprietaire button[action=changetabprop]' : {
				click : this.changeTab
			}
		});
	},

	//Active l'onglet Animal.
	changeTab : function() {
		var nbRefs = nbreReferencesFiche - 1;
		var contr = this;
		//R�cup�ration du record charg� dans controller/tableaux/Proprietaire, apr�s le d�clenchement
		//de itemmouseover du m�me fichier.
		var tabWithId = Ext.ComponentQuery.query('form');
		var rcdIdProprietaire = null;
		var recordProprietaire = null; //Le record adapt� au formulaire Propri�taire.
		var rcdNmProp;
		/*//Met un probl�me d'abstractmodel quand on veut le charger dans IconView.
		if (tabWithId.length) {
			for (var i = 0, l = tabWithId.length; i < l; i++) {
				if (tabWithId[i].getId() == 'proprietaire_form') {
				//recordProprietaire = tabWithId[i].getRecord();//Met un probl�me d'abstractmodel quand on veut le charger dans IconView.
				*/
				var proprietaireForm = Ext.ComponentQuery.query('fproprietaire')[nbRefs];
				recordProprietaire = proprietaireForm.getRecord();
					 if (recordProprietaire == null || recordProprietaire== 'undefined'){
							Ext.MessageBox.show({
								title : 'REMOTE EXCEPTION',
								msg : 'Veuillez, s\'il vous plait, renseigner les champs propri&eacute;taire, porfession, adresses et t&eacute;l&eacute;phones de ce formulaire.',
								icon : Ext.MessageBox.ERROR, 
								buttons : Ext.Msg.OK
							});
							
						}else{
								rcdIdProprietaire = recordProprietaire.get('idproprietaire');
								rcdNmProp = recordProprietaire.get('nomproprietaire');
							 
							 	//M�thode qui sera ex�cut� apr�s dans le controller/tableaux/Proprietaire.
								//On lui envoie en param�tre la valeur du record idproporietaire.
								//Marche mais boon pas utile.
								//this.application.fireEvent('fireeventanimal');
								
								//Si un propri�taire n'a pas au moins un animal, l'ancien store animal du pr�c�dent propri�taire doit �tre �ffac� 
								//pour montrer effectivement qu'il n'y avait pas le nouveau proprietaire n'a pas d'animal.
								//Et pour �viter toute confusion apr�s le chargement dans le grid Animal.
								var animalStore = this.getStore('formulaires.Animal');
								storeAnimal = this.getStore('formulaires.Animal');
								animalStore.removeAll();
								storeAnimal.removeAll();
								
								//Affectation dans la variable globale afin de cr�er l'animal � partir de son idproprietaire
								recordIdProprietaire = rcdIdProprietaire;
								//Pour charger le champ relatif du formulaire ordonnance
								recordNmProprietaire = rcdNmProp;
								var animalStore = this.getStore('formulaires.Animal');
								//Requ�te � la base gr�ce � store/formulaires/Animal.
								animalStore.proxy.extraParams.idproprietaire = recordIdProprietaire;
								//R�f�rence � ganimal.
								var animalEditor = Ext.ComponentQuery.query('ganimal')[nbRefs];
								//Chargement du store apr�s la r�qu�te de lecture faite � la base.
								animalEditor.reconfigure(animalStore.load());
								
								//Affichage du l'onglet Animal.
								//var ficheForm = Ext.ComponentQuery.query('tabpanel');
								var ficheForm = Ext.ComponentQuery.query('ffiche')[nbRefs];
								var tabPanel = ficheForm.down('tabpanel');
								var anotherTab = tabPanel.child('#animal')
								anotherTab.tab.show();
								tabPanel.setActiveTab(anotherTab);
								/*
								if (tabWithId.length) {
									for (var i = 0, l = tabWithId.length; i < l; i++) {
										if (tabWithId[i].getId() == 'idFiche') {
											var anotherTab = tabWithId[i].child('#animal');
											anotherTab.tab.show();
											tabWithId[i].setActiveTab(anotherTab);
											
										}
									}
								}
								*/
								//Effacer tous les champs au cas o� le store Animal n'a pas de valeurs dans le grid Animal:
								//n�cessit� de coh�rence.
								var animalForm = Ext.ComponentQuery.query('fanimal')[nbRefs];
								
								//Met un probl�me d'abstractmodel quand on veut le charger dans IconView.
								animalForm.down('#idnomanimal').setValue('');
								animalForm.down('#idrace').setValue('');
								animalForm.down('#idrobe').setValue('');
								animalForm.down('#iddatedenaissance').setValue('');
								animalForm.down('#idsexe').setValue('');
								animalForm.down('#idpoids').setValue(0);
								
						}
				//}
			//}
		//}
		
			
		
	}
	
});
