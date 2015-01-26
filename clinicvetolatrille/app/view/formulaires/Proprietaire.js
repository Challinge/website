/**
 * @ADOUKO Franck Venance
 */
Ext.define('CLVETLAT.view.formulaires.Proprietaire', {
	extend : 'Ext.form.FormPanel',

	alias : 'widget.fproprietaire',
	//id : "proprietaire_form", //Met un problème d'abstractmodel quand on veut le charger dans IconView.

	columnWidth : 0.32,
	margin : '0 0 0 10',
	title : 'D&eacute;tails sur le propri&eacute;taire',
	bodyPadding : 5,

	initComponent : function() {
		//Ext.apply(this, {
			this.items = [{
				xtype : 'textfield',
				width : 370,
				name : 'nomproprietaire',
				fieldLabel : 'Propri&eacute;taire'
				
			}, {
				xtype : 'textfield',
				width : 370,
				name : 'profession',
				fieldLabel : 'Profession'
			}, {
				xtype : 'textfield',
				width : 370,
				name : 'adressegeograph',
				fieldLabel : 'Adresse g&eacute;ographique'
			},{
				xtype : 'textfield',
				width : 370,
				name : 'adressepostale',
				fieldLabel : 'Adresse postale'
			},{
				xtype : 'textfield',
				width : 370,
				name : 'telbureau',
				fieldLabel : 'Tel (Bureau)'
			}, {
				xtype : 'textfield',
				width : 370,
				name : 'teldomicile',
				fieldLabel : 'Tel (Domicile)'
			}, {
				xtype : 'textfield',
				width : 370,
				name : 'telportable',
				fieldLabel : 'Tel (Portable)'
			}, {
				xtype : 'button',
				width : 370,
				action: 'changetabprop',
   				text : 'Suivant'

			}];
		//});
		this.callParent(arguments);
	}
});
