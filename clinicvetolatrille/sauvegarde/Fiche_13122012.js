/**
 * @ADOUKO Franck Venance
 */
// sample static data for the store
var myData = [['3m Co', 71.72, 0.02, 0.03, '9/1 12:00am'], ['Alcoa Inc', 29.01, 0.42, 1.47, '9/1 12:00am'], ['Altria Group Inc', 83.81, 0.28, 0.34, '9/1 12:00am'], ['American Express Company', 52.55, 0.01, 0.02, '9/1 12:00am'], ['American International Group, Inc.', 64.13, 0.31, 0.49, '9/1 12:00am'], ['AT&T Inc.', 31.61, -0.48, -1.54, '9/1 12:00am'], ['Boeing Co.', 75.43, 0.53, 0.71, '9/1 12:00am'], ['Caterpillar Inc.', 67.27, 0.92, 1.39, '9/1 12:00am'], ['Citigroup, Inc.', 49.37, 0.02, 0.04, '9/1 12:00am'], ['E.I. du Pont de Nemours and Company', 40.48, 0.51, 1.28, '9/1 12:00am'], ['Exxon Mobil Corp', 68.1, -0.43, -0.64, '9/1 12:00am'], ['General Electric Company', 34.14, -0.08, -0.23, '9/1 12:00am'], ['General Motors Corporation', 30.27, 1.09, 3.74, '9/1 12:00am'], ['Hewlett-Packard Co.', 36.53, -0.03, -0.08, '9/1 12:00am'], ['Honeywell Intl Inc', 38.77, 0.05, 0.13, '9/1 12:00am'], ['Intel Corporation', 19.88, 0.31, 1.58, '9/1 12:00am'], ['International Business Machines', 81.41, 0.44, 0.54, '9/1 12:00am'], ['Johnson & Johnson', 64.72, 0.06, 0.09, '9/1 12:00am'], ['JP Morgan & Chase & Co', 45.73, 0.07, 0.15, '9/1 12:00am'], ['McDonald\'s Corporation', 36.76, 0.86, 2.40, '9/1 12:00am'], ['Merck & Co., Inc.', 40.96, 0.41, 1.01, '9/1 12:00am'], ['Microsoft Corporation', 25.84, 0.14, 0.54, '9/1 12:00am'], ['Pfizer Inc', 27.96, 0.4, 1.45, '9/1 12:00am'], ['The Coca-Cola Company', 45.07, 0.26, 0.58, '9/1 12:00am'], ['The Home Depot, Inc.', 34.64, 0.35, 1.02, '9/1 12:00am'], ['The Procter & Gamble Company', 61.91, 0.01, 0.02, '9/1 12:00am'], ['United Technologies Corporation', 63.26, 0.55, 0.88, '9/1 12:00am'], ['Verizon Communications', 35.57, 0.39, 1.11, '9/1 12:00am'], ['Wal-Mart Stores, Inc.', 45.45, 0.73, 1.63, '9/1 12:00am']];

var ds = Ext.create('Ext.data.ArrayStore', {
	fields : [{
		name : 'company'
	}, {
		name : 'price'
		//type : 'float'
	}, {
		name : 'change'
		//type : 'float'
	}, {
		name : 'pctChange'
		//type : 'float'
	}, {
		name : 'lastChange'
		//type : 'date',
		//dateFormat : 'n/j h:ia'
	},
	// Rating dependent upon performance 0 = best, 2 = worst
	{
		name : 'rating',
		type : 'int',
		convert : function(value, record) {
			var pct = record.get('pctChange');
			if (pct < 0)
				return 2;
			if (pct < 1)
				return 1;
			return 0;
		}
	}],
	data : myData
});

// example of custom renderer function
function change(val) {
	if (val > 0) {
		return '<span style="color:green;">' + val + '</span>';
	} else if (val < 0) {
		return '<span style="color:red;">' + val + '</span>';
	}
	return val;
}

// example of custom renderer function
function pctChange(val) {
	if (val > 0) {
		return '<span style="color:green;">' + val + '%</span>';
	} else if (val < 0) {
		return '<span style="color:red;">' + val + '%</span>';
	}
	return val;
}

// render rating as "A", "B" or "C" depending upon numeric value.
function rating(v) {
	if (v == 0)
		return "02574712";
	if (v == 1)
		return "47589520";
	if (v == 2)
		return "41895623";
}

function getSearchValue(){
        var me = this,
            value = me.textField.getValue();
            
        if (value === '') {
            return null;
        }
        if (!me.regExpMode) {
            value = value.replace(me.regExpProtect, function(m) {
                return '\\' + m;
            });
        } else {
            try {
                new RegExp(value);
            } catch (error) {
                me.statusBar.setStatus({
                    text: error.message,
                    iconCls: 'x-status-error'
                });
                return null;
            }
            // this is stupid
            if (value === '^' || value === '$') {
                return null;
            }
        }

        return value;
    }
    
function onTextFieldChange(){
	var me = this,
             count = 0;

         //me.view.refresh();
         // reset the statusbar
         //m//e.statusBar.setStatus({
             //text: me.defaultStatusText,
             //iconCls: ''
         //});

         me.searchValue = getSearchValue();
         me.indexes = [];
         me.currentIndex = null;

         if (me.searchValue !== null) {
             me.searchRegExp = new RegExp(me.searchValue, 'g' + (me.caseSensitive ? '' : 'i'));
             
             
             me.store.each(function(record, idx) {
                 var td = Ext.fly(me.view.getNode(idx)).down('td'),
                     cell, matches, cellHTML;
                 while(td) {
                     cell = td.down('.x-grid-cell-inner');
                     matches = cell.dom.innerHTML.match(me.tagsRe);
                     cellHTML = cell.dom.innerHTML.replace(me.tagsRe, me.tagsProtect);
                     
                     // populate indexes array, set currentIndex, and replace wrap matched string in a span
                     cellHTML = cellHTML.replace(me.searchRegExp, function(m) {
                        count += 1;
                        if (Ext.Array.indexOf(me.indexes, idx) === -1) {
                            me.indexes.push(idx);
                        }
                        if (me.currentIndex === null) {
                            me.currentIndex = idx;
                        }
                        return '<span class="' + me.matchCls + '">' + m + '</span>';
                     });
                     // restore protected tags
                     Ext.each(matches, function(match) {
                        cellHTML = cellHTML.replace(me.tagsProtect, match); 
                     });
                     // update cell html
                     cell.dom.innerHTML = cellHTML;
                     td = td.next();
                 }
             }, me);

             // results found
             if (me.currentIndex !== null) {
                 me.getSelectionModel().select(me.currentIndex);
                 me.statusBar.setStatus({
                     text: count + ' matche(s) found.',
                     iconCls: 'x-status-valid'
                 });
             }
         }

         // no results found
         if (me.currentIndex === null) {
             me.getSelectionModel().deselectAll();
         }

         // force textfield focus
         me.textField.focus();
	
	
	alert('franck je suis la');}

Ext.define('CLVETLAT.view.outils.Fiche', {
	extend : 'Ext.Window',
	alias : 'widget.ffiche',
	require : ['Ext.data.*', 'Ext.ux.FieldReplicator','Ext.ux.LiveSearchGridPanel'],

	title : 'Fiche',
	//collapsible : true,
	//animCollapse : true,
	//maximizable : true,
	closable: true,
    closeAction: 'hide',
	width : 850,
	height : 500,
	minWidth : 300,
	minHeight : 200,
	x: 120,
    y: 40,
     plain: true,
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
		 var tabs =  Ext.create('Ext.tab.Panel', {
			//xtype : 'tabpanel',
			
			activeTab: 0,
			
			items : [
			
			{
			itemId: 'proprietaire',
			xtype : 'form',
			
			title : 'Renseignement Propi&eacute;taire',
			bodyPadding : 5,
			width : 950,
			layout : 'column', // Specifies that the items will now be arranged in columns

			fieldDefaults : {
				labelAlign : 'left',
				msgTarget : 'side'
			},
			items :[
			{
				columnWidth : 0.70,
				
				xtype : 'gridpanel',
				tbar : ['Recherche',{
                 xtype: 'textfield',
                 name: 'searchField',
                 hideLabel: true,
                 width: 200,
                 listeners: {
                     change: {
                         fn: onTextFieldChange,
                         buffer: 100
                     }
                 }
            }],
				defaultStatusText: 'Nothing Found',
				store : ds,
				height : 400,
				title : 'Liste de propi&eacute;taires',

				columns : [{
					text : 'Propi&eacute;taire',
					
					sortable : true,
					dataIndex : 'company'
				}, {
					text : 'Profession',
					width : 75,
					sortable : true,
					dataIndex : 'price'
				}, {
					text : 'Adresse g&eacute;ographique',
					width : 75,
					sortable : true,
					renderer : change,
					dataIndex : 'change'
				}, {
					text : 'Adresse Postale',
					width : 75,
					sortable : true,
					renderer : pctChange,
					dataIndex : 'pctChange'
				}, {
					text : 'Tel (Bureau)',
					width : 85,
					sortable : true,
					renderer : Ext.util.Format.dateRenderer('m/d/Y'),
					dataIndex : 'lastChange'
				}, {
					text : 'Tel (Portable)',
					width : 30,
					sortable : true,
					renderer : rating,
					dataIndex : 'rating'
				}],

				listeners : {
					selectionchange : function(model, records) {
						if (records[0]) {
							this.up('form').getForm().loadRecord(records[0]);
						}
					}
				}
			},{
				columnWidth : 0.3,
				margin : '0 0 0 2',
				xtype : 'fieldset',
				title : 'D&eacute;tails propi&eacute;taires',
				defaults : {
					width : 240,
					labelWidth : 90
				},
				defaultType : 'textfield',
				items : [{
					fieldLabel : 'Propi&eacute;taire',
					name : 'company'
				}, {
					fieldLabel : 'Profession',
					name : 'price'
				}, {
					fieldLabel : 'Adresse g&eacute;ographique',
					name : 'pctChange'
				}, {
					fieldLabel : 'Tel (Bureau)',
					name : 'lastChange'
				}, {
					xtype: 'button',
            		text : 'Suivant',
            		handler: function() {
            			var users = tabs.child('#animal');
    					users.tab.show();
    					tabs.setActiveTab(users);
    				}
            	}
				]
				}]
			},
			
			{
				itemId: 'animal',
			xtype : 'form',
			layout : 'fit',
			title : 'Animal',
			bodyPadding : 5,
			width : 950,
			layout : 'column', // Specifies that the items will now be arranged in columns

			fieldDefaults : {
				labelAlign : 'left',
				msgTarget : 'side'
			},
			items :[
			{
				columnWidth : 0.60,
				
				xtype : 'gridpanel',
				tbar : ['Recherche',{
                 xtype: 'textfield',
                 name: 'searchField',
                 hideLabel: true,
                 width: 200,
                 listeners: {
                     change: {
                         fn: onTextFieldChange,
                         buffer: 100
                     }
                 }
            }],
				defaultStatusText: 'Nothing Found',
				store : ds,
				height : 400,
				title : 'Liste d\'animaux',

				columns : [{
					text : 'Nom',
					flex : 1,
					sortable : true,
					dataIndex : 'company'
				}, {
					text : 'Race',
					width : 75,
					sortable : true,
					dataIndex : 'price'
				}, {
					text : 'Date de naissance',
					width : 75,
					sortable : true,
					renderer : change,
					dataIndex : 'change'
				}, {
					text : 'Robe',
					width : 75,
					sortable : true,
					renderer : pctChange,
					dataIndex : 'pctChange'
				}, {
					text : 'Poids',
					width : 85,
					sortable : true,
					renderer : Ext.util.Format.dateRenderer('m/d/Y'),
					dataIndex : 'lastChange'
				}, {
					text : 'Sexe',
					width : 30,
					sortable : true,
					renderer : rating,
					dataIndex : 'rating'
				}],

				listeners : {
					selectionchange : function(model, records) {
						if (records[0]) {
							this.up('form').getForm().loadRecord(records[0]);
						}
					}
				}
			},{
				columnWidth : 0.4,
				margin : '0 0 0 10',
				xtype : 'fieldset',
				title : 'D&eacute;tails animal',
				defaults : {
					width : 240,
					labelWidth : 90
				},
				defaultType : 'textfield',
				items : [{
					fieldLabel : 'Nom',
					name : 'company'
				}, {
					fieldLabel : 'Race',
					name : 'price'
				}, {
					fieldLabel : 'Sexe',
					name : 'pctChange'
				}, {
					fieldLabel : 'Poids',
					name : 'lastChange'
				},{
					xtype: 'button',
            		text : 'Suivant',
            		handler: function() {
            			var users = tabs.child('#soins');
    					users.tab.show();
    					tabs.setActiveTab(users);
    				}
            	}]
				}]
			},
			{
			xtype : 'form',
			layout : 'fit',
			title : 'Soins',
			itemId: 'soins',
			bodyPadding : 5,
			width : 950,
			layout : 'column', // Specifies that the items will now be arranged in columns

			fieldDefaults : {
				labelAlign : 'left',
				msgTarget : 'side'
			},
			
	        
			items :[
			{
				columnWidth : 0.60,
				
				xtype : 'gridpanel',
				tbar : ['Recherche',{
                 xtype: 'textfield',
                 name: 'searchField',
                 hideLabel: true,
                 width: 200,
                 listeners: {
                     change: {
                         fn: onTextFieldChange,
                         buffer: 100
                     }
                 }
            }],
				defaultStatusText: 'Nothing Found',
				store : ds,
				height : 400,
				title : 'Liste des soins',

				columns : [{
					text : 'Date',
					flex : 1,
					sortable : true,
					dataIndex : 'company'
				}, {
					text : 'Symptômes',
					width : 75,
					sortable : true,
					dataIndex : 'price'
				}, {
					text : 'Diagnotic',
					width : 75,
					sortable : true,
					renderer : change,
					dataIndex : 'change'
				}, {
					text : 'Traitement',
					width : 75,
					sortable : true,
					renderer : pctChange,
					dataIndex : 'pctChange'
				}, {
					text : 'Poids',
					width : 85,
					sortable : true,
					renderer : Ext.util.Format.dateRenderer('m/d/Y'),
					dataIndex : 'lastChange'
				}, {
					text : 'Sexe',
					width : 30,
					sortable : true,
					renderer : rating,
					dataIndex : 'rating'
				}],
				action : 'soin'
				/*
				listeners : {
					selectionchange : function(model, records) {
						if (records[0]) {
							this.up('form').getForm().loadRecord(records[0]);
						}
					}
				}
				*/
			},{
				columnWidth : 0.4,
				margin : '0 0 0 10',
				xtype : 'form',
		
				bodyPadding : 5,
				// configure how to read the XML data
				
        reader : Ext.create('Ext.data.reader.Xml', {
            model: 'CLVETLAT.model.Soins',
            record : 'soins',
            successProperty: '@success'
        }),
	        waitMsgTarget: true,
				id:'franck',
				title : 'D&eacute;tails soins',
				defaults : {
					width : 240,
					labelWidth : 90
				},
				defaultType : 'textfield',
				items : [{
					
					fieldLabel : 'Nom',
					name : 'sympt'
				}, {
					//xtype : 'textarea',
					fieldLabel : 'Race',
					name : 'diag'
				}, {
					fieldLabel : 'Sexe',
					name : 'traite'
				}, {
					xtype: 'button',
            		text : 'Enregister',
            		formBind: true,
            		action : 'savee'
            	}]
				}]
			}
			
			
			]
		});
		 	
		this.items = [tabs];

		this.callParent(arguments);
		
		
	}
});
