/**
 * @ADOUKO Franck Venance
 */
var tmpDoit = 0;
Ext.define("CLVETLAT.controller.formulaires.Facture", {
	extend : 'Ext.app.Controller',

	models : ['formulaires.Facture'],
	stores : ['formulaires.Facture'],
	
	init : function() {
		this.control({
			//Gestion de l�venement click du bouton de libell� suivant de views/formulaires/Soins.
			'ffacture button[action=enregistrerfacture]' : {
				click : this.enregistrerFormFacture
			},
			'ffacture' : {
				eventChangeDoit : this.onEventChangeDoit
			}
		});
		
		//Communication entre stores par l'�venement fireevent.
		//Il ex�cute la m�thode fireeventformfacture de contoller/Iconview.
		this.application.on({
			fireeventformfacture : this.onFireEventFormFacture,
			scope : this
		});
		
	},
	
	//Charge les valeurs de la requ�te juste apr�s l'ouverture de la facture.
	onFireEventFormFacture : function(){
		
		var nbRefs = nbreReferencesFacture - 1;
		var factureStore = this.getStore('formulaires.Facture');
		var factureRecord = factureStore.getAt(0);
		
		 //R�f�rence de la facture
		var factureForm = Ext.ComponentQuery.query('ffacture')[nbRefs];
		//Met un probl�me d'abstractmodel quand on veut le charger dans IconView.
		//Affectation des champs pour v�rifier que la facture est exacte.
		factureForm.down('#num_factu').readOnly = false;
		factureForm.down('#num_factu').setValue(factureRecord.get('num_factu'));
		factureForm.down('#num_factu').readOnly = true;
		factureForm.down('#nm_prop').readOnly = false;
		factureForm.down('#nm_prop').setValue(factureRecord.get('nom_prop'));
		factureForm.down('#nm_prop').readOnly = true;
		factureForm.down('#nm_anim').readOnly = false;
		factureForm.down('#nm_anim').setValue(factureRecord.get('nom_anim'));
		factureForm.down('#nm_anim').readOnly = true;
		factureForm.down('#d_date').readOnly = false;
		factureForm.down('#d_date').setValue(factureRecord.get('d_date'));
		factureForm.down('#d_date').readOnly = true;
		factureForm.down('#iddoit').readOnly = false;
		factureForm.down('#iddoit').setValue(factureRecord.get('doit'));
		factureForm.down('#iddoit').readOnly = true;
		
		
		tmpDoit = parseInt(factureForm.down('#iddoit').getValue());
		var rcdIdSoin = factureRecord.get('id_soin');
		
		//M�thode qui sera ex�cut� apr�s dans le controller/tableaux/Facture.
		this.application.fireEvent('fireeventtableaufacture', rcdIdSoin);
		
		//factureForm.down('#idpayer').setValue(0);
	},
	
	//Enrgistre les valeurs des champs du formulaire Ordonnance.
	enregistrerFormFacture : function() {
		 //R�cup�rtaion des param�tres pour l'ajout de la facture.
		 var factureStore = this.getStore('formulaires.Facture');
		 var factureRecord = factureStore.getAt(0);
		 var rcdIdFacture = factureRecord.get('num_factu');
		 var rcdIdProp = factureRecord.get('id_prop');
		 
		 //R�f�rence de la facture
		 var nbRefs = nbreReferencesFacture - 1;
		 var factureForm = Ext.ComponentQuery.query('ffacture')[nbRefs];
		 var formFacture = factureForm.down('form');
		 var valueFormFacture = formFacture.getForm();
		 
		//Le formulaire Facture ne doit pas �tre vide, pour enregistrer les donn�es.
		 if (factureForm.down('#num_factu').getValue() != ''
			 &&  factureForm.down('#nm_prop').getValue() != ''
				 && parseInt(factureForm.down('#idtotalapayer').getValue()) > 0
				 	&& parseInt(factureForm.down('#idpayer').getValue()) >= 0
				 		&& parseInt(factureForm.down('#iddoit').getValue()) >= 0){
			 if (factureForm.down('#num_factu').getValue() != ''
				 &&  factureForm.down('#nm_prop').getValue() != ''
					 && parseInt(factureForm.down('#idtotalapayer').getValue()) > 0
					 	&& parseInt(factureForm.down('#idpayer').getValue()) > 0){
				 Ext.MessageBox.show({
		               msg: 'Ajout en cours, attendez s\'il vous plait...',
		               progressText: 'Ajout...',
		               width:300,
		               wait:true,
		               waitConfig: {interval:200}
		            });
		            setTimeout(function(){
		                Ext.MessageBox.hide();

		             }, 8000);
				 valueFormFacture.submit({
					 	url: 'data/formulaires/add_facture.php',
					    params: {
					    	idfacture: rcdIdFacture,
					    	idprop: rcdIdProp
					    },
					    success : function(form, action) {
					    	Ext.Msg.show({
								title : 'Ajout effectu�e',
								msg : action.result.msg,
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
							
					    }
				 });
			 }else{
				 Ext.MessageBox.show({
						title : 'Attention',
						msg : 'Les champs "Pay�" et "Total � payer" ne doivent �tre sup�rieurs � 0, avant d\'ajouter une facture.',
						icon : Ext.MessageBox.ERROR, 
						buttons : Ext.Msg.OK
					});
			 }
			 
		 }else{
			 Ext.MessageBox.show({
					title : 'Attention',
					msg : 'Suivez la proc�dure de s�lection de propri�taire, animal et soin, via la fiche, avant d\'�tablir une facture.',
					icon : Ext.MessageBox.ERROR, 
					buttons : Ext.Msg.OK
				});
		 }
		 
	},
	
	//Calcul le total du exact du propri�taire � cet instant, en prenant en compte la facture � cet instant.
	onEventChangeDoit: function(value) {
		var nbRefs = nbreReferencesFacture - 1;
		var factureForm = Ext.ComponentQuery.query('ffacture')[nbRefs];
		var doit = tmpDoit + 
			(parseInt(factureForm.down('#idtotalapayer').getValue()) - parseInt(factureForm.down('#idpayer').getValue()));
		factureForm.down('#iddoit').readOnly = false;
		factureForm.down('#iddoit').setValue(doit);
		factureForm.down('#iddoit').readOnly = true;
		if (value == null){
			factureForm.down('#iddoit').readOnly = false;
			factureForm.down('#iddoit').setValue(tmpDoit);
			factureForm.down('#iddoit').readOnly = true;
		}
		 
	}
	
});