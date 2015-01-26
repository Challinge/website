/**
 * @author dev
 */
Ext.define('CLVETLAT.view.tableaux.Facture', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.gfacture',
	selType : 'rowmodel',
	rowEditor : Ext.create('Ext.grid.plugin.RowEditing', {
		clicksToEdit : 2
	}),
	
	frame : true,
	title : 'Honoraires pour les soins',
	initComponent : function() {
		this.store = 'Facture';
		this.columns = [{
			text : 'DESIGNATION',
			flex : 1,
			sortable : true,
			dataIndex : 'email',
			field : {
				xtype : 'textfield'
			}
		}, {
			header : 'MONTANT',
			width : 80,
			sortable : true,
			dataIndex : 'first',
			field : {
				xtype : 'textfield'
			}
		}];
		this.dockedItems = [{
			xtype : 'toolbar',
			items : ['->',{
				text : 'Ajout',
				iconCls : 'icon-add',
				handler : function() {
					// empty record
					//store.insert(0, new Person());
					rowEditing.startEdit(0, 0);
				}
			}, 
			
			'-', {
				itemId : 'delete',
				text : 'Delete',
				iconCls : 'icon-delete',
				disabled : true,
				handler : function() {
					var selection = grid.getView().getSelectionModel().getSelection()[0];
					if (selection) {
						store.remove(selection);
					}
				}
			}]
		}];
		this.plugins = [this.rowEditor];
		this.callParent(arguments);
	}
}); 