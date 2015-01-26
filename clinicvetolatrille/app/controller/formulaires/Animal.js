/**
 * @ADOUKO Franck Venance
 */
Ext.define("CLVETLAT.controller.formulaires.Animal", {
	extend : 'Ext.app.Controller',

	views : ['formulaires.Animal'],
	stores : ['formulaires.Soins'],

	init : function() {
		this.control({
			//Gestion de lévenement click du bouton de libellé suivant de views/formulaires/Animal.
			'fanimal button[action=changetabanim]' : {
				click : this.changeTab
			}
		});
		
		//Communication entre stores par l'évenement fireevent.
		//Il exécute la méthode fireeventanimal de contoller/formulaires/Proprietaires.
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
		//Récupération du record chargé dans controller/tableaux/Animal, après le déclenchement
		//de itemmouseover du même fichier.
		var tabWithId = Ext.ComponentQuery.query('form');
		var rcdIdAnimal;
		var rcdNmAnim;
		var recordAnimal; //Le record adapté au formulaire Animal.
		
		if ((recordIdProprietaire == null) ||
				(parseInt(recordIdProprietaire > 0) && parseInt(recordIdAnimal > 0) && parseInt(recordIdSoin) > 0)){
					Ext.MessageBox.show({
						title : 'REMOTE EXCEPTION',
						msg : 'Veuillez, s\'il vous plait, suivre la proc&eacute;dure de selection du propri&eacute;taire, de l\'animal, et des soins apport&eacute;s.',
						icon : Ext.MessageBox.ERROR, 
						buttons : Ext.Msg.OK
					});
					
		}else{
				/*//Met un problème d'abstractmodel quand on veut le charger dans IconView.
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
										
										//Méthode qui sera exécuté après dans le controller/tableaux/Animal.
										//On lui envoie en paramètre la valeur du record idproporietaire.
										//Marche bien mais bon pas utile.
										//this.application.fireEvent('fireeventsoins', rcdAnimal);
										
										//Si un animal n'a pas au moins un soin, l'ancien store soin du précédent animal doit être éffacé 
										//pour montrer effectivement qu'il n'y avait pas le nouveau soin n'a pas d'animal.
										//Et pour éviter toute confusion après le chargement dans le grid Soin.
										var soinsStore = this.getStore('formulaires.Soins');
										storeSoin = this.getStore('formulaires.Soins');
										soinsStore.removeAll();
										storeSoin.removeAll();
										
										//Affectation dans la variable globale afin de crée le soin à partir de idanimal
										recordIdAnimal = rcdIdAnimal;
										//Pour charger le champ relatif du formulaire ordonnance
										recordNmAnimal = rcdNmAnim;
										var soinStore = this.getStore('formulaires.Soins');
										//Requête à la base grâce à store/formulaires/Soins.
										soinStore.proxy.extraParams.idanimal = recordIdAnimal;
										//Référence à gsoins.
										soinEditor = Ext.ComponentQuery.query('gsoins')[nbRefs];
										//Chargement du store après la réquête de lecture faite à la base.
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

										//Effacer tous les champs au cas où le store Animal n'a pas de valeurs dans le grid Animal:
										//nécessité de cohérence.
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