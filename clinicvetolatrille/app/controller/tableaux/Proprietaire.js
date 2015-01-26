/**
 * @ADOUKO Franck Venance
 */
var rechargement = false;
var appelRowEditor = false;

Ext.define("CLVETLAT.controller.tableaux.Proprietaire", {
	extend : 'Ext.app.Controller',

	views : ['tableaux.Proprietaire'],
	models : ['tableaux.Proprietaire'],
	stores : ['tableaux.Proprietaire'],
	
	/*Marche pleinement
	refs: [{
	    // A component query
	    selector: 'ganimal',
	    ref: 'animalList' //génère getAnimalList qu'on peut utiliser.
	}],
	*/
	
	init : function() {
		var alphaSpaceTest = /^[-\d0-9]+$/;

		Ext.apply(Ext.form.field.VTypes, {
			//  vtype validation function
			alphaSpace : function(val, field) {
				return alphaSpaceTest.test(val);
			},
			// vtype Text property: The error text to display when the validation function returns false
			alphaSpaceText : 'Ce que vous avez saisi n\'est pas correcte. Le champs doit &ecirc;tre compos&eacute; que de chiffres.',
			// vtype Mask property: The keystroke filter mask
			alphaSpaceMask : /^[-\d0-9]+$/
		});
		
		this.control({
			/*//Met un problème d'abstractmodel quand on veut le charger dans IconView.
			'#proprietaire_editor' : {
				render : this.onEditorRender,
				edit : this.afterProprietaireEdit,
				proprietaireEdit : this.onProprietaireEdit,
				proprietaireDelete : this.onProprietaireDelete
			},
			*/
			'gproprietaire button' : {
				click : this.addProprietaire
			},
			'gproprietaire' : {
				render : this.onEditorRender,
				edit : this.afterProprietaireEdit,
				proprietaireEdit : this.onProprietaireEdit,
				proprietaireDelete : this.onProprietaireDelete,
				itemmouseenter : this.chargeProprietaireFormulaire
			}
		});
		
		//Communication entre stores par l'évenement fireevent.
		//Il exécute la méthode fireeventanimal de contoller/formulaires/Proprietaires.
		/*Marche bien mais bon pas utile
		this.application.on({
			fireeventanimal : this.onFireEventAnimal,
			scope : this
		});
		*/
	},

	chargeProprietaireFormulaire : function(grid, record) {
		/*//Met un problème d'abstractmodel quand on veut le charger dans IconView.
		var tabWithId = Ext.ComponentQuery.query('form');
		if (tabWithId.length) {
			for (var i = 0, l = tabWithId.length; i < l; i++) {
				if (tabWithId[i].getId() == 'proprietaire_form') {
					tabWithId[i].loadRecord(record);
				}
			}
		}
		*/
		var nbRefs = nbreReferencesFiche - 1;
		var proprietaireForm = Ext.ComponentQuery.query('fproprietaire')[nbRefs];
		proprietaireForm.loadRecord(record);
	},

	onEditorRender : function() {
		// cache a reference to the proprietaireEditor and rowEditor
		var nbRefs = nbreReferencesFiche;
		if (!appelRowEditor){
			this.proprietaireEditor = Ext.ComponentQuery.query('gproprietaire')[nbRefs];
			this.rowEditor = this.proprietaireEditor.rowEditor;
			appelRowEditor = true;
		}else{
			nbRefs = nbreReferencesFiche - 1;
			this.proprietaireEditor = Ext.ComponentQuery.query('gproprietaire')[nbRefs];
			this.rowEditor = this.proprietaireEditor.rowEditor;
		}
		
	},

	afterProprietaireEdit : function() {
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
						var proprietaireStore = controll.getStore('tableaux.Proprietaire');
						storeProprietaire = controll.getStore('tableaux.Proprietaire');
						proprietaireStore.sync();
						
						var record = proprietaireStore.getAt(1);//'Modification faite';
						//var recupDonnee = record.get('idproprietaire');
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
						/*
						Ext.Msg.show({
							title : 'Ajout effectu&eacute;e',
							msg : 'L\'information a &eacute;t&eacute; correctement ajout&eacute;.',
							//msg : recupDonnee,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.INFO
						});
						*/
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
						/*
						var proprietaireStore = controll.getStore('tableaux.Proprietaire');
						proprietaireStore.load();
						proprietaireStore.load();
						proprietaireStore.load();
						proprietaireStore.load();
						proprietaireStore.load();
						proprietaireStore.load();
						*/
						var proprietaireStore = controll.getStore('tableaux.Proprietaire');
						storeProprietaire = controll.getStore('tableaux.Proprietaire');
						proprietaireStore.sync();
						/*
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
						*/
						/*
						Ext.Msg.show({
							title : 'Modification effectu&eacute;e',
							msg : 'L\'information a &eacute;t&eacute; correctement modifi&eacute;.',
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.INFO
						});
						*/
						
					}
				}
			});
		}
	},

	addProprietaire : function() {
		var newProprietaire;
		var proprietaireStore = this.getStore('tableaux.Proprietaire');
		var nbRefs = nbreReferencesFiche - 1;
		
		// add blank item to store -- will automatically add new row to grid
		newProprietaire = proprietaireStore.add({
		nomproprietaire: '',
		profession: '',
		adressegeograph: '',
		adressepostale: '',
		telbureau: 0,
		teldomicile:0,
		telportable:0
		})[0];

		this.rowEditor.startEdit(newProprietaire, this.proprietaireEditor.columns[nbRefs]);

		rechargement = true;
	},

	onProprietaireEdit : function(evtData) {
		var proprietaireStore = this.getStore('tableaux.Proprietaire');
		var record = proprietaireStore.getAt(evtData.rowIndex);
		if (record) {
			this.rowEditor.startEdit(record, this.proprietaireEditor.columns[evtData.colIndex]);
		}
	},

	onProprietaireDelete : function(evtData) {
		var controll = this;
		Ext.Msg.show({
			title : 'Information &agrave; supprimer',
			msg : 'Vous supprimerai d&eacute;finitivement cette information. Le voulez-vous?',
			buttons : Ext.Msg.YESNO,
			icon : Ext.Msg.QUESTION,
			fn : function(btn) {
				if (btn === 'yes') {
					var proprietaireStore = controll.getStore('tableaux.Proprietaire');
					storeProprietaire = controll.getStore('tableaux.Proprietaire');
					var record = proprietaireStore.getAt(evtData.rowIndex);
					if (record) {
						proprietaireStore.remove(record);
						proprietaireStore.sync();
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
						
						/*
						Ext.Msg.show({
							title : 'Suppression effectu&eacute;e',
							msg : 'L\'information a &eacute;t&eacute; correctement supprim&eacute;.',
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.INFO,
						});
						*/
					}
				}
			}
		});
	}
	//,
	
	//Récupération du record de ladite firevent ci-dessus et exécution.
	/*Marche bien mais bon pas utile
	onFireEventAnimal : function(rcdProprietaire){
		//Affectation dans la variable globale afin de la crée
		recordAnimal = rcdProprietaire;
		var animalStore = this.getStore('formulaires.Animal');
		//Requête à la base grâce à store/formulaires/Animal.
		animalStore.proxy.extraParams.idproprietaire = recordAnimal;
		//Référence à ganimal.
		animalEditor = Ext.ComponentQuery.query('ganimal')[nbRefs];
		//Chargement du store après la réquête de lecture faite à la base.
		animalEditor.reconfigure(animalStore.load());
		
		/*marche à peine mais mérite plus de développement.
		var animalList = this.getAnimalList(); //Fait référence à la ref ci dessus.
		animalList.dockedItems.items[2].items.items[1].disabled = true;
		console.log(animalList.dockedItems.items[2].items.items[1].disabled);
		*/
	//}
});
