/**
 * @ADOUKO Franck Venance
 */
var appelRowEditor = false
Ext.define('CLVETLAT.view.formulaires.Soins', {
	extend : 'Ext.form.FormPanel',

	alias : 'widget.fsoins',
	//id : 'soins_form', //Met un problème d'abstractmodel quand on veut le charger dans IconView.

	columnWidth : 0.32,
	margin : '0 0 0 10',
	title : 'D&eacute;tails sur le soin',
	bodyPadding : 5,

	initComponent : function() {
		//Ext.apply(this, {
		this.items = [{
			xtype : 'datefield',
			width : 370,
			name : 'dates',
			itemId : 'iddates',
			format : 'd/m/Y',
			submitFormat : 'Y-m-d H:i:s',
			fieldLabel : 'Date'
		}, {
			xtype : 'textareafield',
			width : 370,
			name : 'symptomes',
			itemId : 'idsymptomes',
			fieldLabel : 'Symt&ocirc;mes'
		}, {
			xtype : 'textareafield',
			width : 370,
			name : 'diagnostic',
			itemId : 'iddiagnostic',
			fieldLabel : 'Diagnotic'
		},  {
			xtype : 'textfield',
			width : 370,
			name : 'typesoin',
			itemId : 'idtypesoin',
			fieldLabel : 'Type soin'
		},{
			xtype : 'textareafield',
			width : 370,
			name : 'traitements',
			itemId : 'idtraitements',
			fieldLabel : 'Traitements'
		}, {
			xtype : 'button',
			width : 370,
			action: 'changeformfordonnance',
			text : 'Suivant'

		}];
		//});
		this.callParent(arguments);
	}
});
