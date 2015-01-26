/**
 * @ADOUKO Franck Venance
 */
Ext.define('CLVETLAT.view.formulaires.Animal', {
	extend : 'Ext.form.FormPanel',

	alias : 'widget.fanimal',
	//id : "animal_form",//Met un problème d'abstractmodel quand on veut le charger dans IconView.

	columnWidth : 0.32,
	margin : '0 0 0 10',
	title : 'D&eacute;tails sur l\'animal',
	bodyPadding : 5,

	initComponent : function() {
		//Ext.apply(this, {
			this.items = [{
				xtype : 'textfield',
				itemId : 'idnomanimal',
				width : 370,
				name : 'nomanimal',
				fieldLabel : 'Nom'
			}, {
				xtype : 'textfield',
				width : 370,
				name : 'race',
				itemId : 'idrace',
				fieldLabel : 'Race'
			}, {
				xtype : 'textfield',
				width : 370,
				name : 'robe',
				itemId : 'idrobe',
				fieldLabel : 'Robe'
			},{
				xtype : 'datefield',
				format : 'd/m/Y',
				submitFormat : 'Y-m-d H:i:s',
				width : 370,
				itemId : 'iddatedenaissance',
				name : 'datedenaissance',
				fieldLabel : 'Date de naissance'
			},{
				xtype : 'textfield',
				width : 370,
				name : 'sexe',
				itemId : 'idsexe',
				fieldLabel : 'sexe'
			},{
				xtype : 'numberfield',
				width : 370,
				name : 'poids',
				itemId : 'idpoids',
				minValue: 0, //prevention contre les valeurs négatives.
				fieldLabel : 'Poids'
			},{
				xtype : 'button',
				width : 370,
				action: 'changetabanim',
				text : 'Suivant'

			}];
		//});
		this.callParent(arguments);
	}
});
