/**
 * @ADOUKO Franck Venance
 */

var rechargementSoin = false;
Ext.define('CLVETLAT.store.formulaires.Soins', {
    extend: 'Ext.data.Store',
    model: 'CLVETLAT.model.tableaux.Soins',
    
    // Load automatically data from proxy.
    autoLoad: true,
    autoSync: false,
    
    pageSize:18, //Nécessaire pour le paging pour donner une limit de lignes à afficher.
    	    
    // Create link with DB.
    proxy: {
        type: 'ajax',
        api: {
        	read: 'data/formulaires/get_formsoinsparams.php',
        	update: 'data/tableaux/update_soins.php',
        	destroy: 'data/tableaux/delete_soins.php',
        	create: 'data/tableaux/add_soins.php'
    	},
    	extraParams: {idanimal : 0},
        reader: {
            type: 'json',
            root: 'soin',
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
				
				if (rechargementSoin){
					//Au cas où, il y a réponse à la requête.
					if (responseJson.search("success") > 0){
						//Recherche dans le responseJson le success et msgjson car c'est un tableau convrtit en string.
						var positionIndexSuccess = responseJson.search("success");
						var positionIndexResponseJson = responseJson.search("msgjson");
						
						//Traite le success à true et délivre le message correspondantt; message qui provient évidemment du
						//résultat fournit par le serveur.
						if (responseJson.substring(positionIndexSuccess+9, positionIndexSuccess+9+3) == 'tru'){
							storeSoin.load();
							storeSoin.load();
							storeSoin.load();
							storeSoin.load();
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
				rechargementSoin = true;
			}
			
		}
    	
    }
});
