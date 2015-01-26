/**
 * @ADOUKO Franck Venance
 */
Ext.define('CLVETLAT.view.outils.Ordonnance', {
	extend : 'Ext.Window',
	alias : 'widget.fordonnance',
	require : ['Ext.data.*', 'Ext.ux.FieldReplicator'],

	title : 'Ordonnance',
	closable: true,
    closeAction: 'hide',
	//collapsible : true,
	//animCollapse : true,
	//maximizable : true,
	width : 850,
	height : 400,
	minWidth : 300,
	minHeight : 200,
	layout : 'fit',
	x: 120,
    y: 40,
	autoShow : true,
	

	initComponent : function() {
		var ordForm = this;
		this.items = [{
			xtype : 'form',
			plain : true,
			border : 0,
			bodyPadding : 5,
			url : 'save-form.php',
			/*
			fieldDefaults : {
				labelWidth : 155,
				anchor : '100%'
			},
			*/
			layout : {
				type : 'vbox',
				align : 'stretch' // Child items are stretched to full width
			},
			items : [{
				xtype : 'textfield',
				readOnly : true, //Il faut le préciser pour pouvoir l'utiliser.
				itemId : 'idnomprop',
				fieldLabel : 'Propriétaire :'
				
			},{
				xtype : 'textfield',
				readOnly : true, //Il faut le préciser pour pouvoir l'utiliser.
				itemId : 'idnomanim',
				fieldLabel : 'Animal :'
				
			}
			         
			/*Changé le 19/01/2013, pour des raisons de règles de gestion dde traitement
			{
				xtype : 'combo',
				fieldLabel : 'Propi&eacute;taire',
				store : Ext.create('Ext.data.ArrayStore', {
					fields : ['proprietaire'],
					data : [['SANOGO Daouda'], ['KOFFI Kouakou'], ['TITILO Sinome']]
				}),
				displayField : 'proprietaire'
				
			}
			*/
			, {
				xtype : 'datefield',
				name : 'dateaujourdhui',
				readOnly : true, //Il faut le préciser pour pouvoir l'utiliser.
				itemId : 'iddateaujourdhui',
				format : 'd/m/Y',
				submitFormat : 'Y-m-d',
				fieldLabel : 'Abidjan le :'
			}, {
				xtype : 'datefield',
				name : 'dateprochainrdv',
				itemId : 'iddateprochainrdv',
				format : 'd/m/Y',
				submitFormat : 'Y-m-d H:i:s',
				fieldLabel : 'Prochain rendez-vous le :'
			}, {
				xtype : 'textareafield',
				fieldLabel : 'M&eacute;dicaments :',
				hideLabel : true,
				name : 'traitements',
				itemId : 'idtraite',
				style : 'margin:0', // Remove default margin
				flex : 1 // Take up all *remaining* vertical space
			}]
		}];

		this.buttons = [{
			text : 'Enregistrer',
			action : 'enrgistrerordonnance',
			handler : function() {
				/*Besoin de cohérence dans le code, et donc implémentation de la fonction dans le 
				 * Controller formulaires.Ordonnance.
				 var win = ordForm.up('window');
				 var formm = ordForm.down('form');
				 var form = formm.getForm();
				 
				 form.submit({
					 url: 'data/formulaires/update_ordonnance.php',
					    params: {
					    	idsoins: recordIdSoin
					    },
					    success : function(form, action) {
							 Ext.Msg.alert('Modification effectu&eacute;e', action.result.msg);//action.msg is red from add_user
							 }
				 });*/
			}
			
		}, {
			text : 'Annuler',
			scope : this,
			handler : this.close
		}];

		this.callParent(arguments);
	}
});
