/**
 * @ADOUKO Franck Venance
 */
Ext.define('CLVETLAT.view.tableaux.Animal', {
	extend : 'Ext.grid.Panel',

	alias : 'widget.ganimal',
	//id : "animal_editor", //Met un problème d'abstractmodel quand on veut le charger dans IconView.

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
	store : 'formulaires.Animal',

	initComponent : function() {

		var animalEditor = this;
		this.addEvents(['animalEdit', 'animalDelete']);

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
			text : 'Nom',

			sortable : true,
			dataIndex : 'nomanimal',
			width : 184,
			field : {
				xtype : 'textfield'
			}
		}, {
			text : 'Race',
			width : 146,
			sortable : true,
			dataIndex : 'race',
			field : {
				xtype : 'textfield'
			}
		}, {
			text : 'Robe',
			width : 140,
			sortable : true,
			dataIndex : 'robe',
			field : {
				xtype : 'textfield'
			}
		}, {
			text : 'Date de naissance',
			width : 150,
			sortable : true,
			renderer : Ext.util.Format.dateRenderer('d-m-Y'),
			dataIndex : 'datedenaissance',
			field : {
				xtype : 'datefield'
			}
		}, {
			text : 'Sexe',

			sortable : true,
			dataIndex : 'sexe',
			field : {
				xtype : 'combobox',
				store : new Ext.data.ArrayStore({
					id : 0,
					fields : ['myId', // numeric value is the key
					'displayText'],
					data : [['Male', 'M'], ['Femele', 'F']] // data is local
				}),
				queryMode : 'local',
				displayField : 'myId',
				valueField : 'displayText'
			}
		}, {
			text : 'Poids',
			width : 60,
			sortable : true,
			dataIndex : 'poids',
			field : {
				xtype : 'numberfield',
				minValue: 0 //prevention contre les valeurs négatives.
			}
		}, {
			xtype : 'actioncolumn',
			width : 50,
			items : [{
				icon : 'images/edit.png', // Use a URL in the icon config
				tooltip : 'Modifier',
				handler : function(grid, rowIndex, colIndex) {
					animalEditor.fireEvent('animalEdit', {
						rowIndex : rowIndex,
						colIndex : colIndex
					});
				}
			}, {
				icon : 'images/del.png',
				tooltip : 'Supprimer',
				handler : function(grid, rowIndex, colIndex) {
					animalEditor.fireEvent('animalDelete', {
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
				//id:'ajout_animal', //Met un problème d'abstractmodel quand on veut le charger dans IconView.
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
