/**
 * @ADOUKO Franck Venance
 */

var rechargement = false;
var appelRowEditor = false;
Ext.define("CLVETLAT.controller.tableaux.Soins", {
	extend : 'Ext.app.Controller',

	views : ['tableaux.Soins'],
	models : ['tableaux.Soins'],
	stores : ['formulaires.Soins'],

	init : function() {
		this.control({
			/*//Met un problème d'abstractmodel quand on veut le charger dans IconView.
			'#soins_editor' : {
				render : this.onEditorRender,
				edit : this.afterSoinsEdit,
				soinsEdit : this.onSoinsEdit,
				soinsDelete : this.onSoinsDelete
			},
			*/
			'gsoins button' : {
				click : this.addSoins
			},
			'gsoins' : {
				itemmouseenter : this.chargeSoinsFormulaire,
				render : this.onEditorRender,
				edit : this.afterSoinsEdit,
				soinsEdit : this.onSoinsEdit,
				soinsDelete : this.onSoinsDelete
			}
		});
	},

	chargeSoinsFormulaire : function(grid, record) {
		/*//Met un problème d'abstractmodel quand on veut le charger dans IconView.
		//console.log('clicked on ' + record.get('soins'));
		var tabWithId = Ext.ComponentQuery.query('form');
		if (tabWithId.length) {
			for (var i = 0, l = tabWithId.length; i < l; i++) {
				if (tabWithId[i].getId() == 'soins_form') {
					tabWithId[i].loadRecord(record);
				}
			}
		}
		*/
		var nbRefs = nbreReferencesFiche - 1;
		var soinForm = Ext.ComponentQuery.query('fsoins')[nbRefs];
		soinForm.loadRecord(record);
	},

	onEditorRender : function() {
		// cache a reference to the soinsEditor and rowEditor
		var nbRefs = nbreReferencesFiche;
		if (!appelRowEditor){
			this.soinsEditor = Ext.ComponentQuery.query('gsoins')[nbRefs];
			this.rowEditor = this.soinsEditor.rowEditor;
			appelRowEditor = true;
		}else{
			nbRefs = nbreReferencesFiche - 1;
			this.soinsEditor = Ext.ComponentQuery.query('gsoins')[nbRefs];
			this.rowEditor = this.soinsEditor.rowEditor;
		}
	},

	afterSoinsEdit : function() {
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
						var soinsStore = controll.getStore('formulaires.Soins');
						storeSoin = controll.getStore('formulaires.Soins');
						soinsStore.sync();
						
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
						var soinsStore = controll.getStore('formulaires.Soins');
						storeSoin = controll.getStore('formulaires.Soins');
						soinsStore.sync();
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

	addSoins : function() {
		var newSoins;
		var soinsStore = this.getStore('formulaires.Soins');

		var nbRefs = nbreReferencesFiche - 1;
		if ((recordIdAnimal == null) || (recordIdAnimal <= 0)){
			Ext.MessageBox.show({
				title : 'REMOTE EXCEPTION',
				msg : 'Veuillez, s\'il vous plait, sélectionner un animal avant l\'ajout d\'informations concernant un soin.',
				icon : Ext.MessageBox.ERROR, 
				buttons : Ext.Msg.OK
			});
		}else{	
			// add blank item to store -- will automatically add new row to grid
			newSoins = soinsStore.add({
			idanimal: recordIdAnimal,
			dates: '',
			symptomes: '',
			diagnostic: '',
			typesoin: '',
			traitements: ''
			})[0];
	
			this.rowEditor.startEdit(newSoins, this.soinsEditor.columns[nbRefs]);
	
			rechargement = true;
		}
	},

	onSoinsEdit : function(evtData) {
		var soinsStore = this.getStore('formulaires.Soins');
		var record = soinsStore.getAt(evtData.rowIndex);
		if (record) {
			this.rowEditor.startEdit(record, this.soinsEditor.columns[evtData.colIndex]);
		}
	},

	onSoinsDelete : function(evtData) {
		var controll = this;
		Ext.Msg.show({
			title : 'Information &agrave; supprimer',
			msg : 'Vous supprimerai d&eacute;finitivement cette information. Le voulez-vous?',
			buttons : Ext.Msg.YESNO,
			icon : Ext.Msg.QUESTION,
			fn : function(btn) {
				if (btn === 'yes') {
					var soinsStore = controll.getStore('formulaires.Soins');
					storeSoin = controll.getStore('formulaires.Soins');
					var record = soinsStore.getAt(evtData.rowIndex);
					if (record) {
						soinsStore.remove(record);
						soinsStore.sync();
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
	}
});
