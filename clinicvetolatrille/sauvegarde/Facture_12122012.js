/**
 * @author dev
 */
Ext.define('Person', {
    extend: 'Ext.data.Model',
    fields: ['email', 'first'],
    validations: [{
        type: 'length',
        field: 'email',
        min: 1
    }, {
        type: 'length',
        field: 'first',
        min: 1
    }, {
        type: 'length',
        field: 'last',
        min: 1
    }]
});
var store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        autoSync: true,
        model: 'Person',
        proxy: {
            type: 'rest',
            url: 'app.php/users',
            reader: {
                type: 'json',
                root: 'data'
            },
            writer: {
                type: 'json'
            }
        },
        listeners: {
            write: function(store, operation){
                var record = operation.getRecords()[0],
                    name = Ext.String.capitalize(operation.action),
                    verb;
                    
                    
                if (name == 'Destroy') {
                    record = operation.records[0];
                    verb = 'Destroyed';
                } else {
                    verb = name + 'd';
                }
                Ext.example.msg(name, Ext.String.format("{0} user: {1}", verb, record.getId()));
                
            }
        }
    });
    
    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing');
    



Ext.define('CLVETLAT.view.outils.Facture', {
	extend : 'Ext.window.Window',
	alias : 'widget.ffacture',
	require :['Ext.data.*', 'Ext.grid.*'],
	
	title : 'Facture',
	closable: true,
    closeAction: 'hide',
	//collapsible : true,
	//animCollapse : true,
	//maximizable : true,
	width : 750,
	height : 500,
	minWidth : 300,
	minHeight : 200,
	layout : 'fit',
	x: 120,
    y: 40,
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
       var grid = Ext.create('Ext.grid.Panel', {
        renderTo: document.body,
        plugins: [rowEditing],
        width: 400,
        height: 300,
        frame: true,
        title: 'Honoraires pour les soins',
        store: store,
        
        columns: [{
            text: 'DESIGNATION',
            flex: 1,
            sortable: true,
            dataIndex: 'email',
            field: {
                xtype: 'textfield'
            }
        }, {
            header: 'MONTANT',
            width: 80,
            sortable: true,
            dataIndex: 'first',
            field: {
                xtype: 'textfield'
            }
        }],
        dockedItems: [{
            xtype: 'toolbar',
            items: [{
                text: 'Add',
                iconCls: 'icon-add',
                handler: function(){
                    // empty record
                    store.insert(0, new Person());
                    rowEditing.startEdit(0, 0);
                }
            }, '-', {
                itemId: 'delete',
                text: 'Delete',
                iconCls: 'icon-delete',
                disabled: true,
                handler: function(){
                    var selection = grid.getView().getSelectionModel().getSelection()[0];
                    if (selection) {
                        store.remove(selection);
                    }
                }
            }]
        }]
    });
    grid.getSelectionModel().on('selectionchange', function(selModel, selections){
        grid.down('#delete').setDisabled(selections.length === 0);
    });
		this.items = [{
			xtype : 'form',
			plain : true,
			border : 0,
			bodyPadding : 5,
			url : 'save-form.php',

			fieldDefaults : {
				labelWidth : 155,
				anchor : '100%'
			},

			layout : {
				type : 'vbox',
				align : 'stretch' // Child items are stretched to full width
			},
			items : [{
				xtype : 'numberfield',
				fieldLabel : 'Num&eacute;ro :'
				
			}, {
				xtype : 'datefield',
				name : 'dateaujourdhui',
				fieldLabel : 'Date :'
			}, {
				xtype : 'numberfield',
				fieldLabel : 'Doit :'
				
			}, grid,{
				xtype : 'textfield',
				disabled : true,
				fieldLabel : 'Total &agrave; payer :'
				
			}]
		}];

		this.buttons = [{
			text : 'Enregistrer',
			action : 'save'
		}, {
			text : 'Annuler',
			scope : this,
			handler : this.close
		}];

		this.callParent(arguments);
	}
});
