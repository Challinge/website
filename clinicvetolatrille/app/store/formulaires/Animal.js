/**
 * @ADOUKO Franck Venance
 */
var rechargementAnim = false;
Ext.define('CLVETLAT.store.formulaires.Animal', {
    extend: 'Ext.data.Store',
    model: 'CLVETLAT.model.tableaux.Animal',
    
    // Load automatically data from proxy.
    autoLoad: true,
    autoSync: false,
    	    
    pageSize:18, //Nécessaire pour le paging pour donner une limit de lignes à afficher.
    
    // Create link with DB.
    proxy: {
        type: 'ajax',
        api: {
        	read: 'data/formulaires/get_formanimalparams.php',
        	create: 'data/tableaux/add_animal.php',
        	update: 'data/tableaux/update_animal.php',
        	destroy: 'data/tableaux/delete_animal.php'
    	},
    	extraParams: {idproprietaire : 0},
        reader: {
            type: 'json',
            root: 'animal',
            successProperty: 'success',
            totalProperty: 'total' //Lit le nombre total de lignes envoyés dans la json et nécessaire pour le paging.
        },
    	listeners :{ 
			exception : function(proxy, response, operation){ 
				
				responseJson = response.responseText.toString(); 
				
				//Au cas où, il n'y a aucune réponse à la requête.
				if (responseJson.search("success") == -1){
				
					Ext.MessageBox.show({
						title : 'REMOTE EXCEPTION',
						msg : 'Aucune information n\'est charg&eacutee. Veuillez, s\'il vous plait, contacter l\'administrateur.',
						icon : Ext.MessageBox.ERROR, 
						buttons : Ext.Msg.OK
					});
				}
				
				if (rechargementAnim){
					
					//Au cas où, il y a réponse à la requête.
					if (responseJson.search("success") > 0){
						//Recherche dans le responseJson le success et msgjson car c'est un tableau convrtit en string.
						var positionIndexSuccess = responseJson.search("success");
						var positionIndexResponseJson = responseJson.search("msgjson");
						
						//Traite le success à true et délivre le message correspondantt; message qui provient évidemment du
						//résultat fournit par le serveur.
						if (responseJson.substring(positionIndexSuccess+9, positionIndexSuccess+9+3) == 'tru'){
							storeAnimal.load();
							storeAnimal.load();
							storeAnimal.load();
							storeAnimal.load();
							Ext.Msg.show({
								title : 'Modification effectu&eacute;e',
								msg : responseJson.substring(positionIndexResponseJson+10, responseJson.length-3),
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
						}
						else if (responseJson.substring(positionIndexSuccess+9, positionIndexSuccess+9+3) == 'fal'){
							Ext.Msg.show({
								title : 'Informations non retrouv&eacute;es',
								msg : responseJson.substring(positionIndexResponseJson+10, responseJson.length-3),
								buttons : Ext.Msg.OK,
								icon : Ext.Msg.INFO
							});
							recordIdProprietaire = null;
							recordIdAnimal = null;
							recordIdSoin = null;
						}
						
					}
				}
				rechargementAnim = true;
			}
			
		}
    	
    	
    }
});
