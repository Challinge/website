/**
 * @ADOUKO Franck Venance
 */
Ext.define('CLVETLAT.store.tableaux.Facture', {
    extend: 'Ext.data.Store',
    model: 'CLVETLAT.model.tableaux.Facture',
    autoLoad: true,
    autoSync: true,
    
    
    //data removed, instead using proxy:
    proxy: {
    	type: 'ajax',
        api: {
        	read: 'data/tableaux/get_tableaufacture.php'   	
    	},
        reader: {
            type: 'json',
            root: 'tabfacture',
            successProperty: 'success'
            
        },
        extraParams: {idsoin : 0},
    }
});