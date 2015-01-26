/**
 * @ADOUKO Franck Venance
 */

Ext.define('CLVETLAT.store.formulaires.Facture', {
    extend: 'Ext.data.Store',
    model: 'CLVETLAT.model.formulaires.Facture',
    
    // Load automatically data from proxy.
    autoLoad: true,
    autoSync: false,
    
    // Create link with DB.
    proxy: {
        type: 'ajax',
        api: {
        	read: 'data/formulaires/get_formfacture.php'   	
    	},
    	reader: {
             type: 'json',
             root: 'derniersoin',
             successProperty: 'success'
        }
    	
    }
});
