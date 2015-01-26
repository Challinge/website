/**
 * @ADOUKO Franck Venance
 */
Ext.define('CLVETLAT.store.tableaux.Animal', {
    extend: 'Ext.data.Store',
    model: 'CLVETLAT.model.tableaux.Animal',
    
    autoLoad: true,
    autoSync: false,
    
    pageSize:18, //Nécessaire pour le paging pour donner une limit de lignes à afficher.
    
    //data removed, instead using proxy:
    proxy: {
        type: 'ajax',
        api: {
        	//read: 'data/tableaux/get_animaux.php',
        	update: 'data/tableaux/update_animal.php',
        	destroy: 'data/tableaux/delete_animal.php',
        	create: 'data/tableaux/add_animal.php'
    	},
        reader: {
            type: 'json',
            root: 'animal',
            successProperty: 'success',
            totalProperty: 'total' //Lit le nombre total de lignes envoyés dans la json et nécessaire pour le paging.
        },
    	listeners :{ 
			exception : function(proxy, response, operation){ 
				//On récupère la réponse de la requête qui est soit 'create', 'update', 'delete', 'read'.
				if (!rechargement){
					storeAnimal.load();
					storeAnimal.load();
					storeAnimal.load();
					storeAnimal.load();
					rechargement = true;
				}else{
					storeAnimal.load();
					storeAnimal.load();
					storeAnimal.load();
					storeAnimal.load();
				}
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
				
				//Au cas où, il y a réponse à la requête.
				else if (responseJson.search("success") > 0){
					//Recherche dans le responseJson le success et msgjson car c'est un tableau convrtit en string.
					var positionIndexSuccess = responseJson.search("success");
					var positionIndexResponseJson = responseJson.search("msgjson");
					
					//Traite le success à true et délivre le message correspondantt; message qui provient évidemment du
					//résultat fournit par le serveur.
					if (responseJson.substring(positionIndexSuccess+9, positionIndexSuccess+9+3) == 'tru'){
						Ext.Msg.show({
							title : 'Modification effectu&eacute;e',
							msg : responseJson.substring(positionIndexResponseJson+10, responseJson.length-3),
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.INFO
						});
					}
					//Traite le success à false et délivre le message correspondant; message qui provient évidemment du
					//résultat fournit par le serveur.
					else if (responseJson.substring(positionIndexSuccess+9, positionIndexSuccess+9+3) == 'fal'){
						Ext.Msg.show({
							title : 'Modification non effectu&eacute;e',
							msg : responseJson.substring(positionIndexResponseJson+10, responseJson.length-3),
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.INFO
						});
					}
					
				}
			}
			
		}
    }
});
