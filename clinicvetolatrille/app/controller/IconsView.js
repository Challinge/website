/**
 * @author dev
 */

var boolAfiicheVieww = true;
var viewFiche;
var boolAfficheViewFiche = true;
var viewwww;
var boolAfiicheViewwww = true;
Ext.define('CLVETLAT.controller.IconsView', {
	extend : 'Ext.app.Controller',

	views : ['IconsView', 'outils.Fiche', 'recherche.LiveSearchGridPanel', 'tableaux.Facture', 'outils.Facture'],

	models : ['IconsView', 'Soins'],

	stores : ['IconsView', 'Soins'],

	init : function() {
		this.control({
			'iconesview' : {
				itemclick : this.onPanelRendered
			}
			/*
			 ,
			 'ffiche button[action=savee]' : {
			 click : this.updateUser
			 },
			 'ffiche gridpanel[action=soin]' : {
			 itemclick : this.editUser
			 }
			 */

		});
	},

	onPanelRendered : function(view, record, item, index) {

		if (index == 0) {//Ordonnance
			//Il ne fallait pas mettre d'ID dans les VIEWS.
			//console.log(vieww);
			//if (vieww == null) {
				
				//vieww = Ext.widget('fordonnance');
				
			//}
			/*
			if (!boolAfiicheVieww) {
				vieww = Ext.widget('fordonnance');
				boolAfiicheVieww = true;
			}*/
			/*
			if (!vieww.isVisible()) {
				vieww.show();
				
				//boolAfiicheVieww = false;
			}
			*/
			//Solution :
			 Ext.widget('fordonnance');
			 nbreReferencesOrdonnance++;
		}
		
		if (index == 1) {//Fiche 
			//Il ne fallait pas mettre d'ID dans les VIEWS.
			//if (!viewFiche) {
				//viewFiche = Ext.widget('ffiche');
					
			/*
			}
			
			if (!boolAfficheViewFiche) {
				viewFiche = Ext.widget('ffiche');
				boolAfficheViewFiche = true;
				console.log('1');
			}
			
			if (!viewFiche.isVisible()) {
				viewFiche.show();
				boolAfficheViewFiche = false;
				console.log('2');
			}
			*/
			//Solution :
			 Ext.widget('ffiche');
			 nbreReferencesFiche++;
		}
		if (index == 2) {//Ffsature
			//Il ne fallait pas mettre d'ID dans les VIEWS.
			/*
			if (!viewwww) {
				viewwww = Ext.widget('ffacture');
			}
			if (!boolAfiicheViewwww) {
				viewwww = Ext.widget('ffacture');
				boolAfiicheViewwww = true;
			}
			if (!viewwww.isVisible()) {
				viewwww.show();
				boolAfiicheViewwww = false;
			}
			*/
			//Solution :
			Ext.widget('ffacture');
			nbreReferencesFacture++;
			//Méthode qui sera exécuté après dans le controller/formulaires/Facture.
			this.application.fireEvent('fireeventformfacture');
		}
	},

	updateUser : function(button) {

		/*var win    = button.up('window'),
		form   = win.down('form'),
		sometime = form.down('fieldset'),
		text = sometime.down('textfield')
		//record = form.getRecord(),
		values = text.getValue();*/
		/*
		var invalidFields =  Ext.ComponentQuery.query('#franck > textfield');;
		if (invalidFields.length) {

		for (var i = 0, l = invalidFields.length; i < l; i++) {
		console.log(invalidFields[i].getValue());
		}
		}
		*/
		//console.log('clicked on savee');
		var invalidFields = Ext.ComponentQuery.query('form');
		//console.log(invalidFields[0].getId());
		//console.log(invalidFields[1].getId());
		//console.log(invalidFields[2].getId());
		//console.log(invalidFields[3].getId());
		//console.log(invalidFields.length);
		//if (invalidFields.length) {
		/*
		invalidFields[2].getForm().load({
		url: 'data/xml-soins.xml',
		waitMsg: 'Loading...'
		});
		// console.log('clicked on ' + invalidFields[2].getRecord());
		*/
		//}
		/*
		invalidFields[2].getForm().submit({
			url : 'data/soins.json',
			submitEmptyText : false,
			waitMsg : 'Saving Data...'
		});
		A considÃ©rer
		var form = this.gsForm.getForm();
		if (form.isValid()) {
			this.store.insert(0, form.getValues());
		}
		*/
	},

	editUser : function(model, records) {
		//console.log('clicked on ' + records.get('company'));
		// console.log('clicked on ' + record.set('company'));
		//console.log('clicked on ' + record.get('company'));

	}
});
