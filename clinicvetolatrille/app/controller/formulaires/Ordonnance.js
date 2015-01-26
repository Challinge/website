/**
 * @ADOUKO Franck Venance
 */
Ext.define("CLVETLAT.controller.formulaires.Ordonnance", {
	extend : 'Ext.app.Controller',

	views : ['outils.Ordonnance'],
	refs: [{
	    // A component query
	    selector: 'fordonnance',
	    ref: 'ordonnanceF' //g�n�re getAnimalList qu'on peut utiliser.
	}],

	init : function() {
		this.control({
			//Gestion de l�venement click du bouton de libell� suivant de views/formulaires/Soins.
			'fordonnance button[action=enrgistrerordonnance]' : {
				click : this.enregistrerFormOrdonnance
			}
		});
	},
	
	//Enrgistre les valeurs des champs du formulaire Ordonnance.
	enregistrerFormOrdonnance : function() {
		
		 var nbRefs = nbreReferencesOrdonnance - 1;
		 var ordonnanceForm = Ext.ComponentQuery.query('fordonnance')[nbRefs];
		 var formOrdonn = ordonnanceForm.down('form');
		 var valueFormOrdonn = formOrdonn.getForm();
	
		 //Le formulaire Ordonnance ne doit pas �tre vide, pour enregistrer les donn�es.
		 if (ordonnanceForm.down('form').down('#idnomprop').getValue() != ''
			 &&  ordonnanceForm.down('form').down('#idnomanim').getValue() != ''){
			 Ext.MessageBox.show({
	               msg: 'Modification en cours, attendez s\'il vous plait...',
	               progressText: 'Modification...',
	               width:300,
	               wait:true,
	               waitConfig: {interval:200}
	            });
	            setTimeout(function(){
	                Ext.MessageBox.hide();
	             }, 8000);
	            
	         //Traitement d'envoie de requ�te de modification.
			 valueFormOrdonn.submit({
				 	url: 'data/formulaires/update_ordonnance.php',
				    params: {
				    	idsoins: recordIdSoin
				    },
				    success : function(form, action) {
				    	Ext.Msg.show({
							title : 'Modification effectu&eacute;e',
							msg : action.result.msg,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.INFO
						});
						 
					}
			 });
		 }else{
			 Ext.MessageBox.show({
					title : 'Attention',
					msg : 'Suivez la proc�dure de s�lection de propri�taire, animal et soin, via la fiche, avant d\'�tablir une ordonnance.',
					icon : Ext.MessageBox.ERROR, 
					buttons : Ext.Msg.OK
				});
			 
		 }
			
			
			
		 
		 
		 
	}

	
});