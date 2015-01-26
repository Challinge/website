/**
 * @ADOUKO Franck Venance
 */
Ext.define('CLVETLAT.view.outils.Fiche', {
	extend : 'Ext.Window',
	alias : 'widget.ffiche',
	require : ['Ext.data.*', 'Ext.ux.FieldReplicator', 'Ext.ux.LiveSearchGridPanel'],

	
	title : 'Fiche',
	//collapsible : true,
	//animCollapse : true,
	//maximizable : true,
	closable : true,
	closeAction : 'hide',
	width : 1250,
	height : 600,
	minWidth : 300,
	minHeight : 200,
	x : 120,
	y : 40,
	plain : true,
	layout : 'fit',

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
		var me = this;
		var tabs = Ext.create('Ext.tab.Panel', {
			activeTab : 0,
			//id : 'idFiche', //Met un problème d'abstractmodel quand on veut le charger dans IconView.
			items : [{
				itemId : 'proprietaire',
				//xtype : 'form',

				title : 'Renseignements Propi&eacute;taire',
				bodyPadding : 5,
				width : 950,
				layout : 'column', // Specifies that the items will now be arranged in columns

				fieldDefaults : {
					labelAlign : 'left',
					msgTarget : 'side'
				},

				items : [{
					xtype : 'gproprietaire'
					
				}, {
					xtype : 'fproprietaire'
				}]

			},{
				itemId : 'animal',
				//xtype : 'form',

				title : 'Renseignements Animal',
				bodyPadding : 5,
				width : 950,
				layout : 'column', // Specifies that the items will now be arranged in columns

				fieldDefaults : {
					labelAlign : 'left',
					msgTarget : 'side'
				},

				items : [{
					xtype : 'ganimal'
					
				}, {
					xtype : 'fanimal'
				}]

			},{
				itemId : 'soins',
				//xtype : 'form',

				title : 'Renseignements Soins',
				bodyPadding : 5,
				width : 950,
				layout : 'column', // Specifies that the items will now be arranged in columns

				fieldDefaults : {
					labelAlign : 'left',
					msgTarget : 'side'
				},

				items : [{
					xtype : 'gsoins'
					
				}, {
					xtype : 'fsoins'
				}]

			}]
		});

		this.items = [tabs];

		this.callParent(arguments);

	}
});

