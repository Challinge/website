/**
 * @ADOUKO Franck Venance
 */
Ext.define("CLVETLAT.controller.formulaires.Ordonnance", {
	extend : 'Ext.app.Controller',

	views : ['outils.Ordonnance'],
	refs: [{
	    // A component query
	    selector: 'fordonnance',
	    ref: 'ordonnanceF' //génère getAnimalList qu'on peut utiliser.
	}],

	init : function() {
		this.control({
			//Gestion de lévenement click du bouton de libellé suivant de views/formulaires/Soins.
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
	
		 //Le formulaire Ordonnance ne doit pas être vide, pour enregistrer les données.
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
	            
	         //Traitement d'envoie de requête de modification.
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
					msg : 'Suivez la procédure de sélection de propriétaire, animal et soin, via la fiche, avant d\'établir une ordonnance.',
					icon : Ext.MessageBox.ERROR, 
					buttons : Ext.Msg.OK
				});
			 
		 }
			
			
			
		 
		 
		 
	}

	
});