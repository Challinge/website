/**
 * @ADOUKO Franck Venance
 */

var rechargement = false;
var appelRowEditor = false;
Ext.define("CLVETLAT.controller.tableaux.Facture", {
	extend : 'Ext.app.Controller',

	views : ['tableaux.Facture'],
	models : ['tableaux.Facture'],
	stores : ['tableaux.Facture'],

	init : function() {
		this.control({
			/*//Met un problème d'abstractmodel quand on veut le charger dans IconView.
			'#facture_editor' : {
				render : this.onEditorRender,
				edit : this.afterMovieEdit,
				factureEdit : this.onMovieEdit,
				factureDelete : this.onMovieDelete
			},
			*/
			'gfacture button' : {
				click : this.addMovie
			},
			'gfacture' : {
				render : this.onEditorRender,
				edit : this.afterMovieEdit,
				factureEdit : this.onMovieEdit,
				factureDelete : this.onMovieDelete
			}
		});
		
		//Communication entre stores par l'évenement fireevent.
		//Il exécute la méthode fireeventtableauxfacture de controller/tableaux/Facture.
		this.application.on({
			fireeventtableaufacture : this.onFireEventTableauFacture,
			scope : this
		});
	},

	onEditorRender : function() {
		// cache a reference to the proprietaireEditor and rowEditor
		var nbRefs = nbreReferencesFacture;
		if (!appelRowEditor){
			this.moviesEditor = Ext.ComponentQuery.query('gfacture')[nbRefs];
			this.rowEditor = this.moviesEditor.rowEditor;
		}else{
			nbRefs = nbreReferencesFacture - 1;
			this.moviesEditor = Ext.ComponentQuery.query('gfacture')[nbRefs];
			this.rowEditor = this.moviesEditor.rowEditor;
		}
	},

	afterMovieEdit : function() {
		var movieStore = this.getStore('tableaux.Facture');
		movieStore.sync();
	},

	addMovie : function() {
		var newMovie;
		var movieStore = this.getStore('tableaux.Facture');

		// add blank item to store -- will automatically add new row to grid.
		newMovie = movieStore.add({
		title: '',
		year: ''
		})[0];

		this.rowEditor.startEdit(newMovie, this.moviesEditor.columns[0]);
	},

	onMovieEdit : function(evtData) {
		var movieStore = this.getStore('tableaux.Facture');
		var record = movieStore.getAt(evtData.rowIndex);
		if (record) {
			this.rowEditor.startEdit(record, this.moviesEditor.columns[evtData.colIndex]);
		}
	},

	onMovieDelete : function(evtData) {
		var movieStore = this.getStore('tableaux.Facture');
		var record = movieStore.getAt(evtData.rowIndex);
		if (record) {
			movieStore.remove(record);
			movieStore.sync();
		}
	},
	
	onFireEventTableauFacture : function(rcdIdSoin){
		var countRecord = null;
		//var nbRefs = nbreReferencesFacture - 1;
		//recordNmAnimal = rcdNmAnim;
		var factureStore = this.getStore('tableaux.Facture');
		//Requête à la base grâce à store/formulaires/Soins.
		factureStore.proxy.extraParams.idsoin = rcdIdSoin;
		//Référence à gsoins.
		factureEditor = Ext.ComponentQuery.query('gfacture')[0];
		//Chargement du store après la réquête de lecture faite à la base.
		factureEditor.reconfigure(factureStore.load({
		    scope: this,
		    //Calcul du montant à payer et affectation au numberfield #idtotalapayer, après chargement du store.
		    callback: function(records, operation, success) {
		    	
		        if (records){
		        	var totalAPayer = 0;
		        	for (var i = 0; i < records.length;  i++){
		    			totalAPayer = totalAPayer + records[i].data.montant;
		    			
		    		}
		        	var nbRefs = nbreReferencesFacture - 1;
	    			factureForm = Ext.ComponentQuery.query('ffacture')[nbRefs];
	    			factureForm.down('#idtotalapayer').readOnly = false;
	    			factureForm.down('#idtotalapayer').setValue(Ext.util.Format.number(totalAPayer, '000.000.000'));
	    			factureForm.down('#idtotalapayer').readOnly = true;
		        }
		        
		    }
		}));
		
		//Perpective à étudier.
		//console.log(factureEditor.down('#idmontant').getEditor(factureStore.getAt()).getValue());
		
	}
});