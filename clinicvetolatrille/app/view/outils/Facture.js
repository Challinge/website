/**
 * @ADOUKO Franck Venance
 */
Ext.define('CLVETLAT.view.outils.Facture', {
	extend : 'Ext.Window',
	alias : 'widget.ffacture',
	require : ['Ext.data.*', 'Ext.grid.*'],

	title : 'Facture',
	closable : true,
	closeAction : 'hide',
	//collapsible : true,
	//animCollapse : true,
	//maximizable : true,
	width : 750,
	height : 580,
	minWidth : 300,
	minHeight : 200,
	layout : 'fit',
	x : 120,
	y : 40,
	autoShow : true,
	dockedItems : [{
		xtype : 'toolbar',
		dock : 'bottom',
		ui : 'footer',
		layout : {
			pack : 'center'
		}
	}],

	initComponent : function() {
		var changeDoit = this;
		this.addEvents(['changeEventDoit']);
		this.items = [{
			xtype : 'form',
			plain : true,
			border : 0,
			bodyPadding : 5,
			//url : 'save-form.php',

			fieldDefaults : {
				labelWidth : 155,
				anchor : '100%'
			},

			layout : {
				type : 'vbox',
				align : 'stretch' // Child items are stretched to full width
			},
			items : [{
				xtype : 'textfield',
				itemId : 'num_factu',
				readOnly : true,
				fieldLabel : 'Num&eacute;ro :'

			},{
				xtype : 'textfield',
				itemId : 'nm_prop',
				readOnly : true,
				fieldLabel : 'Propri&eacute;taire :'

			},{
				xtype : 'textfield',
				itemId : 'nm_anim',
				readOnly : true,
				fieldLabel : 'Animal :'
					
			}, {
				xtype : 'datefield',
				itemId : 'd_date',
				format : 'd/m/Y',
				submitFormat : 'Y-m-d H:i:s',
				name : 'dateaujourdhui',
				readOnly : true,
				fieldLabel : 'Date :'
			}, {
				xtype : 'numberfield',
				readOnly : true,
				itemId : 'iddoit',
				fieldLabel : 'Doit :'

			}, {
                    xtype: 'gfacture',
                   width : 400,
					height : 332,
			}, {
			xtype : 'numberfield',
			itemId : 'idtotalapayer',
			name : 'totalapayer',
			readOnly : true,
			fieldLabel : 'Total &agrave; payer :'

			}, {
				xtype : 'numberfield',
				listeners: {
		            change: function(field, value) {
		            	changeDoit.fireEvent('eventChangeDoit',value);
		            }
		        },
				name : 'payer',
				itemId : 'idpayer',
				value :0,
				minValue: 0, //prevention contre les valeurs négatives.
				fieldLabel : 'Payé :'

			}]
		}];

		this.buttons = [{
			text : 'Enregistrer',
			action : 'enregistrerfacture'
		}, {
			text : 'Annuler',
			scope : this,
			handler : this.close
		}];

		this.callParent(arguments);
	}
});
