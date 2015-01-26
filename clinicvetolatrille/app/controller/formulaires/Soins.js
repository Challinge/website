/**
 * @ADOUKO Franck Venance
 */
Ext.define("CLVETLAT.controller.formulaires.Soins", {
	extend : 'Ext.app.Controller',

	views : ['formulaires.Soins'],
	refs: [{
	    // A component query
	    selector: 'fordonnance',
	    ref: 'ordonnanceF' //génère getAnimalList qu'on peut utiliser.
	}],

	init : function() {
		this.control({
			//Gestion de lévenement click du bouton de libellé suivant de views/formulaires/Soins.
			'fsoins button[action=changeformfordonnance]' : {
				click : this.changeForm
			}
		});
	},
	
	//Charge le formulaire Ordonnance.
	changeForm : function() {
		var nbRefs = nbreReferencesFiche - 1;
		//var tabWithId = Ext.ComponentQuery.query('form');//Met un problème d'abstractmodel quand on veut le charger dans IconView.
		var rcdIdSoin = null; 
		var rcdDatesSoin = null;
		var rcdSymptSoin = null;
		var rcdDiagSoin = null;
		var rcdTraitSoin = null;
		var recordSoin = null; //Le record adapté au formulaire Soin.
		var valuesSoin = null; //Les valeurs des champs adaptées au formulaire Soin.
		
		if ((recordIdProprietaire == null && recordIdAnimal == null && recordIdSoin == null) ||
				(parseInt(recordIdProprietaire > 0) && parseInt(recordIdAnimal > 0) && parseInt(recordIdSoin) > 0)){
					Ext.MessageBox.show({
						title : 'REMOTE EXCEPTION',
						msg : 'Veuillez, s\'il vous plait, suivre la proc&eacute;dure de selection du propri&eacute;taire, de l\'animal, et des soins apport&eacute;s.',
						icon : Ext.MessageBox.ERROR, 
						buttons : Ext.Msg.OK
					});
					
		}else{
			/*//Met un problème d'abstractmodel quand on veut le charger dans IconView.
			if (tabWithId.length) {
				for (var i = 0, l = tabWithId.length; i < l; i++) {
					if (tabWithId[i].getId() == 'soins_form') {
						recordSoin = tabWithId[i].getRecord();
						 valuesSoin = tabWithId[i].getValues();
					}
				}
			}
			*/
			
			var soinForm = Ext.ComponentQuery.query('fsoins')[nbRefs];
			recordSoin = soinForm.getRecord();
			valuesSoin = soinForm.getValues();
			
			if (recordSoin == null || recordSoin== 'undefined'){
				Ext.MessageBox.show({
					title : 'REMOTE EXCEPTION',
					msg : 'Veuillez, s\'il vous plait, renseigner les champs dates, symptomes, diagnostic, traitements de ce formulaire.',
					icon : Ext.MessageBox.ERROR, 
					buttons : Ext.Msg.OK
				});
				
			}else{
				
				 recordSoin.set(valuesSoin);
				 rcdIdSoin = recordSoin.get('idsoins');
				 rcdDatesSoin = recordSoin.get('dates');
				 rcdSymptSoin = recordSoin.get('symptomes');
				 rcdDiagSoin = recordSoin.get('diagnostic');
				 rcdTraitSoin = recordSoin.get('traitements');
			
				//Pour charger les champs relatifs du formulaire ordonnance
				recordIdSoin = rcdIdSoin;
				recordDatesSoin = rcdDatesSoin;
				recordTraitSoin = rcdTraitSoin;
				
				//Mise à jour du formulaire Soins.
				var soinsStore = this.getStore('formulaires.Soins');
				storeSoin = this.getStore('formulaires.Soins');
				soinsStore.sync();
				
				vieww = Ext.widget('fordonnance');
				nbreReferencesOrdonnance++;
				var ordonnanceF = this.getOrdonnanceF(); //Fait référence à la ref ci dessus.
				//On sélectionne chaque champ pour le renseigner.
				/*A travailler car offre de bellles pperpectives
				ordonnanceF.down('form').down('textfield')[nbRefs].setValue(recordNmProprietaire);
				ordonnanceF.down('form').down('textfield')[1].setValue(recordNmAnimal);
				*/
			
				if ((recordDatesSoin == null && rcdSymptSoin == null && rcdDiagSoin == null && recordTraitSoin == null)||
						(recordDatesSoin == '' && rcdSymptSoin == '' && rcdDiagSoin == '' && recordTraitSoin == '')){
					Ext.MessageBox.show({
						title : 'REMOTE EXCEPTION',
						msg : 'Veuillez, s\'il vous plait, renseigner les champs dates, symptomes, diagnostic, traitements de ce formulaire.',
						icon : Ext.MessageBox.ERROR, 
						buttons : Ext.Msg.OK
					});
					
				}else{
					//On sélectionne chaque champ pour le renseigner.
					ordonnanceF.down('form').down('#idnomprop').readOnly = false;
					ordonnanceF.down('form').down('#idnomprop').setValue(recordNmProprietaire);
					ordonnanceF.down('form').down('#idnomprop').readOnly = true;
					ordonnanceF.down('form').down('#idnomanim').readOnly = false;
					ordonnanceF.down('form').down('#idnomanim').setValue(recordNmAnimal);
					ordonnanceF.down('form').down('#idnomanim').readOnly = true;
					ordonnanceF.down('form').down('#iddateaujourdhui').readOnly = false;
					ordonnanceF.down('form').down('#iddateaujourdhui').setValue(recordDatesSoin);
					ordonnanceF.down('form').down('#iddateaujourdhui').readOnly = true;
					ordonnanceF.down('form').down('#idtraite').readOnly = false;
					ordonnanceF.down('form').down('#idtraite').setValue(recordTraitSoin);
					ordonnanceF.down('form').down('#idtraite').readOnly = true;
					
					/*Marche Très bien. Mais pour des soucis de cohérence avec le rest du code, on privillégiera ce qui est au-dessus.
					ordonnanceF.items.items[nbRefs].items.items[nbRefs].readOnly = false;
					ordonnanceF.items.items[nbRefs].items.items[nbRefs].setValue(recordNmProprietaire);
					ordonnanceF.items.items[nbRefs].items.items[nbRefs].readOnly = true;
					ordonnanceF.items.items[nbRefs].items.items[1].readOnly = false;
					ordonnanceF.items.items[nbRefs].items.items[1].setValue(recordNmAnimal);
					ordonnanceF.items.items[nbRefs].items.items[1].readOnly = true;
					ordonnanceF.items.items[nbRefs].items.items[2].readOnly = false;
					ordonnanceF.items.items[nbRefs].items.items[2].setValue(recordDatesSoin);
					ordonnanceF.items.items[nbRefs].items.items[2].readOnly = true;
					ordonnanceF.items.items[nbRefs].items.items[4].setValue(recordTraitSoin);
					*/
				}
			}
		}
	}
	
});