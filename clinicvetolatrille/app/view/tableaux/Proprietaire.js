/**
 * @ADOUKO Franck Venance
 */
Ext.define('CLVETLAT.view.tableaux.Proprietaire', {
	extend : 'Ext.grid.Panel',

	alias : 'widget.gproprietaire',
	//id : "proprietaire_editor", //Met un problème d'abstractmodel quand on veut le charger dans IconView.

	selType : 'rowmodel',
	rowEditor : Ext.create('Ext.grid.plugin.RowEditing', {
		clicksToEdit : 1,
		clicksToMoveEditor : 1,
		autoCancel : false
	}),

	columnWidth : 0.68,
	frame : true,
	title : 'Liste des propri&eacute;taires',
	height : 530,
	store : 'tableaux.Proprietaire',

	initComponent : function() {

		var proprietaireEditor = this;
		this.addEvents(['proprietaireEdit', 'proprietaireDelete']);

		this.tbar = ['Recherche', {
			xtype : 'textfield',
			name : 'searchField',
			hideLabel : true,
			width : 200,
			/*
			 listeners : {
			 change : {
			 fn : onTextFieldChange,
			 buffer : 100
			 }
			 }
			 */
		}];
		this.columns = [{
			text : 'Propri&eacute;taire',

			sortable : true,
			dataIndex : 'nomproprietaire',
			field : {
				xtype : 'textfield'
			}
		}, {
			text : 'Profession',
			width : 146,
			sortable : true,
			dataIndex : 'profession',
			field : {
				xtype : 'textfield'
			}
		}, {
			text : 'Adresse g&eacute;ographique',
			width : 140,
			sortable : true,
			dataIndex : 'adressegeograph',
			field : {
				xtype : 'textfield'
			}
		}, {
			text : 'Adresse postale',

			sortable : true,
			dataIndex : 'adressepostale',
			renderer: Ext.util.Format.uppercase,
			field : {
				xtype : 'textfield'
			}
		}, {
			text : 'Tel (Bureau)',

			sortable : true,
			dataIndex : 'telbureau',
			field : {
				xtype : 'textfield',
				vtype : 'alphaSpace'
			}
		}, {
			text : 'Tel (Domicile)',

			sortable : true,
			dataIndex : 'teldomicile',
			field : {
				xtype : 'textfield',
				vtype : 'alphaSpace'
			}
		}, {
			text : 'Tel (Portable)',

			sortable : true,
			dataIndex : 'telportable',
			field : {
				xtype : 'textfield',
				vtype : 'alphaSpace'
			}
		}, {
			xtype : 'actioncolumn',
			width : 50,
			items : [{
				icon : 'images/edit.png', // Use a URL in the icon config
				tooltip : 'Modifier',
				handler : function(grid, rowIndex, colIndex) {
					proprietaireEditor.fireEvent('proprietaireEdit', {
						rowIndex : rowIndex,
						colIndex : colIndex
					});
				}
			}, {
				icon : 'images/del.png',
				tooltip : 'Supprimer',
				handler : function(grid, rowIndex, colIndex) {
					proprietaireEditor.fireEvent('proprietaireDelete', {
						rowIndex : rowIndex,
						colIndex : colIndex
					});
				}
			}]
		}];
			
		// paging bar on the bottom
        this.bbar= Ext.create('Ext.PagingToolbar', {
            store: this.store,
            displayInfo: true,
            displayMsg: 'Affichage propri&eacute;taires {0} - {1} of {2}',
            emptyMsg: "Aucun propri&eacute;taire &agrave; afficher"
           
        });

		this.dockedItems = [{
			xtype : 'toolbar',
			dock : 'bottom',
			items : ['->', {
				text : 'Ajout',
				iconCls : 'icon-add',
				handler : function() {
					// empty record
					//store.insert(0, new Person());
					//rowEditing.startEdit(0, 0);
				}
			}]
		}];

		this.plugins = [this.rowEditor];
		this.callParent(arguments);
	}
});
