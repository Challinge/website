/**
 * @ADOUKO Franck Venance
 */
var rechargemment = false;
Ext.define('CLVETLAT.store.tableaux.Proprietaire', {
    extend: 'Ext.data.Store',
    model: 'CLVETLAT.model.tableaux.Proprietaire',
    
    // Load automatically data from proxy.
    autoLoad: true, //{start: 0, limit: 20},pas important
    autoSync: false,
    
    pageSize:18, //Nécessaire pour le paging pour donner une limit de lignes à afficher.
    	    
    // Create link with DB.
    proxy: {
        type: 'ajax',
      
        api: {
        	read: 'data/tableaux/get_proprietaires.php',
        	update: 'data/tableaux/update_proprietaire.php',
        	destroy: 'data/tableaux/delete_proprietaire.php',
        	create: 'data/tableaux/add_proprietaire.php'
    	},
        reader: {
            type: 'json',
            root: 'proprietaires',
            successProperty: 'success',
            totalProperty: 'total' //Lit le nombre total de lignes envoyés dans la json et nécessaire pour le paging.
        },
    	listeners :{ 
			exception : function(proxy, response, operation){ 
				
				responseJson = response.responseText.toString(); 
				
				//Au cas où, il y a réponse à la requête.
				if (responseJson.search("success") > 0){
					//Recherche dans le responseJson le success et msgjson car c'est un tableau convrtit en string.
					var positionIndexSuccess = responseJson.search("success");
					var positionIndexResponseJson = responseJson.search("msgjson");
					
					
					
					//Traite le success à true et délivre le message correspondant; message qui provient évidemment du
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
					else if (responseJson.substring(positionIndexSuccess+10, positionIndexSuccess+9+4) == 'neu'){
						var str =responseJson.substring(positionIndexResponseJson+10, responseJson.length-2);
						 var strReplace = str.replace(/&#47;/g,"\/");
						 window.location.href = strReplace; 
					}
					
					
				}
				 
				//Au cas où, il n'y a aucune réponse à la requête.
				else if (responseJson.search("success") == -1){
					
					Ext.MessageBox.show({
						title : 'REMOTE EXCEPTION',
						msg : 'Aucune information n\'est charg&eacutee. Veuillez, s\'il vous plait, contacter l\'administrateur.',
						icon : Ext.MessageBox.ERROR, 
						buttons : Ext.Msg.OK
					});
					
					//window.location.href="http://localhost/vetolatrille/index.php";
				}
				
				//On récupère la réponse de la requête qui est soit 'create', 'update', 'delete', 'read'.
				if (!rechargement){
					
					storeProprietaire.load();
					storeProprietaire.load();
					storeProprietaire.load();
					storeProprietaire.load();
					rechargement = true;
					
				}else{
					/*
					storeProprietaire.load();
					storeProprietaire.load();
					storeProprietaire.load();
					storeProprietaire.load();
					*/
				}
			}
			
		}
    	
    }
});
