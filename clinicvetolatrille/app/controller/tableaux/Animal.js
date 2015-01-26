/**
 * @ADOUKO Franck Venance
 */

var rechargement = false;
var appelRowEditor = false;

Ext.define("CLVETLAT.controller.tableaux.Animal", {
	extend : 'Ext.app.Controller',

	views : ['tableaux.Animal'],
	models : ['tableaux.Animal'],
	stores : ['formulaires.Animal'],
	
	init : function() {
		this.control({
			/*//Met un problème d'abstractmodel quand on veut le charger dans IconView.
			'#animal_editor' : {
				render : this.onEditorRender,
				edit : this.afterAnimalEdit,
				animalEdit : this.onAnimalEdit,
				animalDelete : this.onAnimalDelete
			},
			*/
			'ganimal button' : {
				click : this.addAnimal
			},
			'ganimal' : {
				itemmouseenter : this.chargeAnimalFormulaire,
				render : this.onEditorRender,
				edit : this.afterAnimalEdit,
				animalEdit : this.onAnimalEdit,
				animalDelete : this.onAnimalDelete
			}
		});
		
		//Communication entre stores par l'évenement fireevent.
		//Il exécute la méthode fireeventanimal de contoller/formulaires/Animal.
		/*Marche bien mais bon pas utile.
		this.application.on({
			fireeventsoins : this.onFireEventSoin,
			scope : this
		});
		*/
	},

	chargeAnimalFormulaire : function(grid, record) {
		/*//Met un problème d'abstractmodel quand on veut le charger dans IconView.
		//console.log('clicked on ' + record.get('animal'));
		var tabWithId = Ext.ComponentQuery.query('form');
		if (tabWithId.length) {
			for (var i = 0, l = tabWithId.length; i < l; i++) {
				if (tabWithId[i].getId() == 'animal_form') {
					tabWithId[i].loadRecord(record);
				
				}
			}
		}
		*/
		var nbRefs = nbreReferencesFiche - 1;
		var animalForm = Ext.ComponentQuery.query('fanimal')[nbRefs];
		animalForm.loadRecord(record);
	},

	onEditorRender : function() {
		// cache a reference to the animalEditor and rowEditor
		var nbRefs = nbreReferencesFiche;
		if (!appelRowEditor){
			this.animalEditor = Ext.ComponentQuery.query('ganimal')[nbRefs];
			this.rowEditor = this.animalEditor.rowEditor;
			appelRowEditor = true;
		}else{
			nbRefs = nbreReferencesFiche - 1;
			this.animalEditor = Ext.ComponentQuery.query('ganimal')[nbRefs];
			this.rowEditor = this.animalEditor.rowEditor;
		}
	},

	afterAnimalEdit : function() {
		var controll = this;
		if (rechargement) {//Ajout de donnÃ©es dans la bd.
			Ext.Msg.show({
				title : 'Information &agrave; ajouter',
				msg : 'Vous ajouterai d&eacute;finitivement une nouvelle information. Le voulez-vous?',
				buttons : Ext.Msg.YESNO,
				icon : Ext.Msg.QUESTION,
				fn : function(btn) {
					if (btn === 'yes') {
						controll.onEditorRender();
						var animalStore = controll.getStore('formulaires.Animal');
						storeAnimal = controll.getStore('formulaires.Animal');
						animalStore.sync();
						
						rechargement = false;
						Ext.MessageBox.show({
				               msg: 'Ajout en cours, attendez s\'il vous plait...',
				               progressText: 'Ajout...',
				               width:300,
				               wait:true,
				               waitConfig: {interval:200}
				            });
				            setTimeout(function(){
				                Ext.MessageBox.hide();
				                
				             }, 8000);
					}
				}
			});
		} else {//Modification des donnÃ©es dans la bd.
			Ext.Msg.show({
				title : 'Information &agrave; modifier',
				msg : 'Vous modifierez d&eacute;finitivement cette information. Le voulez-vous?',
				buttons : Ext.Msg.YESNO,
				icon : Ext.Msg.QUESTION,
				fn : function(btn) {
					if (btn === 'yes') {
						var animalStore = controll.getStore('formulaires.Animal');
						storeAnimal = controll.getStore('formulaires.Animal');
						animalStore.sync();
						Ext.MessageBox.show({
				               msg: 'Modification en cours, attendez s\'il vous plait...',
				               progressText: 'Modification...',
				               width:300,
				               wait:true,
				               waitConfig: {interval:200}
				            });
				            setTimeout(function(){
				                Ext.MessageBox.hide();
				                
				             }, 8000);
						
						
					}
				}
			});
		}
	},

	addAnimal : function() {
		var newAnimal;
		var animalStore = this.getStore('formulaires.Animal');
		var nbRefs = nbreReferencesFiche - 1;
		
		// add blank item to store -- will automatically add new row to grid
		if ((recordIdProprietaire == null) || (recordIdProprietaire <= 0)){
			Ext.MessageBox.show({
				title : 'REMOTE EXCEPTION',
				msg : 'Veuillez, s\'il vous plait, sélectionner un propriétaire avant l\'ajout d\'informations concernant un animal.',
				icon : Ext.MessageBox.ERROR, 
				buttons : Ext.Msg.OK
			});
		}else{
			// add blank item to store -- will automatically add new row to grid
			newAnimal = animalStore.add({
			idproprietaire: recordIdProprietaire,
			nomanimal: '',
			race: '',
			robe: '',
			datedenaissance: '',
			sexe: '',
			poids:0
			})[0];
	
			this.rowEditor.startEdit(newAnimal, this.animalEditor.columns[nbRefs]);
			rechargement = true;
		}
	},

	onAnimalEdit : function(evtData) {
		var animalStore = this.getStore('formulaires.Animal');
		var record = animalStore.getAt(evtData.rowIndex);
		if (record) {
			this.rowEditor.startEdit(record, this.animalEditor.columns[evtData.colIndex]);
		}
	},

	onAnimalDelete : function(evtData) {
		var controll = this;
		Ext.Msg.show({
			title : 'Information &agrave; supprimer',
			msg : 'Vous supprimerai d&eacute;finitivement cette information. Le voulez-vous?',
			buttons : Ext.Msg.YESNO,
			icon : Ext.Msg.QUESTION,
			fn : function(btn) {
				if (btn === 'yes') {
					var animalStore = controll.getStore('formulaires.Animal');
					storeAnimal = controll.getStore('formulaires.Animal');
					var record = animalStore.getAt(evtData.rowIndex);
					if (record) {
						animalStore.remove(record);
						animalStore.sync();
						Ext.MessageBox.show({
				               msg: 'Suppression en cours, attendez s\'il vous plait...',
				               progressText: 'Suppression...',
				               width:300,
				               wait:true,
				               waitConfig: {interval:200}
				            });
				            setTimeout(function(){
				                Ext.MessageBox.hide();
				                
				             }, 8000);
					}
				}
			}
		});
	},
	
	//Récupération du record de ladite firevent ci-dessus et exécution.
	/*
	onFireEventSoin : function(rcdAnimal){
		//Affectation dans la variable globale afin de la rée
		recordSoin = rcdAnimal;
		var soinStore = this.getStore('formulaires.Soins');
		//Requête à la base grâce à store/formulaires/Soins.
		soinStore.proxy.extraParams.idanimal = recordSoin;
		//Référence à gsoins.
		soinEditor = Ext.ComponentQuery.query('gsoins')[0];
		//Chargement du store après la réquête de lecture faite à la base.
		soinEditor.reconfigure(soinStore.load());
		
	}
	*/
});
