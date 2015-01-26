/**
 * @ADOUKO Franck Venance
 */
Ext.define('CLVETLAT.view.tableaux.Facture', {
	extend : 'Ext.grid.Panel',

	alias : 'widget.gfacture',
	//id : "facture_editor", //Met un problème d'abstractmodel quand on veut le charger dans IconView.
	
	selType : 'rowmodel',
	rowEditor : Ext.create('Ext.grid.plugin.RowEditing', {
		clicksToEdit : 2
	}),

	frame : true,
	title : 'Honoraires pour les soins',

	store : 'tableaux.Facture',

	initComponent : function() {

		var factureEditor = this;
		this.addEvents(['factureEdit', 'factureDelete']);

		this.columns = [{
			text : 'DESIGNATION',
			flex : 1,
			sortable : true,
			dataIndex : 'designa',
			field : {
				xtype : 'textfield'
			}
		}, {
			header : 'UNITE',
			width : 80,
			sortable : true,
			dataIndex : 'unite',
			field : {
				xtype : 'numberfield',
				minValue: 0 //prevention contre les valeurs négatives.
			}
		},{
			header : 'MONTANT',
			width : 80,
			sortable : true,
			itemId : 'idmontant',
			dataIndex : 'montant',
			field : {
				xtype : 'numberfield',
				minValue: 0 //prevention contre les valeurs négatives.
			}
		}, {
			xtype : 'actioncolumn',
			width : 50,
			items : [{
				icon : 'images/edit.png', // Use a URL in the icon config
				tooltip : 'Edit',
				handler : function(grid, rowIndex, colIndex) {
					factureEditor.fireEvent('factureEdit', {
						rowIndex : rowIndex,
						colIndex : colIndex
					});
				}
			}, {
				icon : 'images/del.png',
				tooltip : 'Delete',
				handler : function(grid, rowIndex, colIndex) {
					factureEditor.fireEvent('factureDelete', {
						rowIndex : rowIndex,
						colIndex : colIndex
					});
				}
			}]
		}];

		this.dockedItems = [{
			xtype : 'toolbar',
			items : ['->', {
				text : 'Ajout',
				iconCls : 'icon-add',
				handler : function() {
					// empty record
					//store.insert(0, new Person());
					rowEditing.startEdit(0, 0);
				}
			}]
		}];
		
		this.plugins = [this.rowEditor];
		this.callParent(arguments);
	}
});
