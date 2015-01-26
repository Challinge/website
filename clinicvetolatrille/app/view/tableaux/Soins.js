/**
 * @ADOUKO Franck Venance
 */
Ext.define('CLVETLAT.view.tableaux.Soins', {
	extend : 'Ext.grid.Panel',

	alias : 'widget.gsoins',
	//id : "soins_editor", //Met un problème d'abstractmodel quand on veut le charger dans IconView.

	selType : 'rowmodel',
	rowEditor : Ext.create('Ext.grid.plugin.RowEditing', {
		clicksToEdit : 1,
		clicksToMoveEditor : 1,
		autoCancel : false
	}),

	columnWidth : 0.68,
	frame : true,
	title : 'Liste des animaux',
	height : 530,
	store : 'formulaires.Soins',

	initComponent : function() {

		var soinsEditor = this;
		this.addEvents(['soinsEdit', 'soinsDelete']);

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
			text : 'Dates',

			sortable : true,
			dataIndex : 'dates',
			renderer : Ext.util.Format.dateRenderer('d-m-Y'),
			field : {
				xtype : 'datefield'
			}
		}, {
			text : 'Sympt&ocirc;mes',
			width : 240,
			sortable : true,
			dataIndex : 'symptomes',
			field : {
				xtype : 'textareafield'
			}
		}, {
			text : 'Diagnotic',
			width : 220,
			sortable : true,
			dataIndex : 'diagnostic',
			field : {
				xtype : 'textfield'
			}
		}, {
			text : 'Type soin',
			sortable : true,
			dataIndex : 'typesoin',
			field : {
				xtype : 'combobox',
				store : new Ext.data.ArrayStore({
					id : 0,
					fields : ['myId', // numeric value is the key
					'displayText'],
					data : [['Consultation', 'C'], ['Hospitalisation', 'H']] // data is local
				}),
				queryMode : 'local',
				displayField : 'myId',
				valueField : 'displayText'
			}
		}, {
			text : 'Traitements',
			width : 220,
			sortable : true,
			dataIndex : 'traitements',
			field : {
				xtype : 'textfield'
			}
		}, {
			xtype : 'actioncolumn',
			width : 50,
			items : [{
				icon : 'images/edit.png', // Use a URL in the icon config
				tooltip : 'Modifier',
				handler : function(grid, rowIndex, colIndex) {
					soinsEditor.fireEvent('soinsEdit', {
						rowIndex : rowIndex,
						colIndex : colIndex
					});
				}
			}, {
				icon : 'images/del.png',
				tooltip : 'Supprimer',
				handler : function(grid, rowIndex, colIndex) {
					soinsEditor.fireEvent('soinsDelete', {
						rowIndex : rowIndex,
						colIndex : colIndex
					});
				}
			}]
		}];

		// paging bar on the bottom
        this.bbar= Ext.create('Ext.PagingToolbar', {
            store:  this.store,
            displayInfo: true,
            displayMsg: 'Affichage animaux {0} - {1} of {2}',
            emptyMsg: "Aucun animal &agrave; afficher"
           
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
