/**
 * @ADOUKO Franck Venance
 */
Ext.define("CLVETLAT.controller.formulaires.Animal", {
	extend : 'Ext.app.Controller',

	views : ['formulaires.Animal'],
	stores : ['formulaires.Soins'],

	init : function() {
		this.control({
			//Gestion de l�venement click du bouton de libell� suivant de views/formulaires/Animal.
			'fanimal button[action=changetabanim]' : {
				click : this.changeTab
			}
		});
		
		//Communication entre stores par l'�venement fireevent.
		//Il ex�cute la m�thode fireeventanimal de contoller/formulaires/Proprietaires.
		/*//Marche bien mais bon pas utile
		this.application.on({
			fireeventanimal : this.onFireEventAnimal,
			scope : this
		});
		*/
	},

	//Active l'onglet Soin.
	changeTab : function() {
		var nbRefs = nbreReferencesFiche - 1;
		//R�cup�ration du record charg� dans controller/tableaux/Animal, apr�s le d�clenchement
		//de itemmouseover du m�me fichier.
		var tabWithId = Ext.ComponentQuery.query('form');
		var rcdIdAnimal;
		var rcdNmAnim;
		var recordAnimal; //Le record adapt� au formulaire Animal.
		
		if ((recordIdProprietaire == null) ||
				(parseInt(recordIdProprietaire > 0) && parseInt(recordIdAnimal > 0) && parseInt(recordIdSoin) > 0)){
					Ext.MessageBox.show({
						title : 'REMOTE EXCEPTION',
						msg : 'Veuillez, s\'il vous plait, suivre la proc&eacute;dure de selection du propri&eacute;taire, de l\'animal, et des soins apport&eacute;s.',
						icon : Ext.MessageBox.ERROR, 
						buttons : Ext.Msg.OK
					});
					
		}else{
				/*//Met un probl�me d'abstractmodel quand on veut le charger dans IconView.
				if (tabWithId.length) {
					for (var i = 0, l = tabWithId.length; i < l; i++) {
						if (tabWithId[i].getId() == 'animal_form') {
						recordAnimal = tabWithId[i].getRecord();
				*/
			var animalForm = Ext.ComponentQuery.query('fanimal')[nbRefs];
			recordAnimal = animalForm.getRecord()
							 if (recordAnimal == null || recordAnimal == 'undefined'){
									Ext.MessageBox.show({
										title : 'REMOTE EXCEPTION',
										msg : 'Veuillez, s\'il vous plait, renseigner les champs nom, race, robe, date de naissance, sexe, poids de ce formulaire.',
										icon : Ext.MessageBox.ERROR, 
										buttons : Ext.Msg.OK
									});
									
								}else{
										rcdIdAnimal = recordAnimal.get('idanimal');
										rcdNmAnim = recordAnimal.get('nomanimal');
										
										//M�thode qui sera ex�cut� apr�s dans le controller/tableaux/Animal.
										//On lui envoie en param�tre la valeur du record idproporietaire.
										//Marche bien mais bon pas utile.
										//this.application.fireEvent('fireeventsoins', rcdAnimal);
										
										//Si un animal n'a pas au moins un soin, l'ancien store soin du pr�c�dent animal doit �tre �ffac� 
										//pour montrer effectivement qu'il n'y avait pas le nouveau soin n'a pas d'animal.
										//Et pour �viter toute confusion apr�s le chargement dans le grid Soin.
										var soinsStore = this.getStore('formulaires.Soins');
										storeSoin = this.getStore('formulaires.Soins');
										soinsStore.removeAll();
										storeSoin.removeAll();
										
										//Affectation dans la variable globale afin de cr�e le soin � partir de idanimal
										recordIdAnimal = rcdIdAnimal;
										//Pour charger le champ relatif du formulaire ordonnance
										recordNmAnimal = rcdNmAnim;
										var soinStore = this.getStore('formulaires.Soins');
										//Requ�te � la base gr�ce � store/formulaires/Soins.
										soinStore.proxy.extraParams.idanimal = recordIdAnimal;
										//R�f�rence � gsoins.
										soinEditor = Ext.ComponentQuery.query('gsoins')[nbRefs];
										//Chargement du store apr�s la r�qu�te de lecture faite � la base.
										soinEditor.reconfigure(soinStore.load());
										
										var ficheForm = Ext.ComponentQuery.query('ffiche')[nbRefs];
										var tabPanel = ficheForm.down('tabpanel');
										var anotherTab = tabPanel.child('#soins');
										anotherTab.tab.show();
										tabPanel.setActiveTab(anotherTab);
										
										/*
										var tabWithId = Ext.ComponentQuery.query('tabpanel');
										if (tabWithId.length) {
											for (var i = 0, l = tabWithId.length; i < l; i++) {
												if (tabWithId[i].getId() == 'idFiche') {
													var anotherTab = tabWithId[i].child('#soins');
													anotherTab.tab.show();
													tabWithId[i].setActiveTab(anotherTab);
												}
											}
										}
										*/

										//Effacer tous les champs au cas o� le store Animal n'a pas de valeurs dans le grid Animal:
										//n�cessit� de coh�rence.
										var animalForm = Ext.ComponentQuery.query('fsoins')[nbRefs];
										animalForm.down('#iddates').setValue('');
										animalForm.down('#idsymptomes').setValue('');
										animalForm.down('#iddiagnostic').setValue('');
										animalForm.down('#idtraitements').setValue('');
									
									}
						//}
					//}
				//}
		}
		
	}
	
});