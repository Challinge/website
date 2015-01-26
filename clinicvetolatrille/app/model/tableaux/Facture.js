/**
 * @ADOUKO Franck Venance
 */
Ext.define('CLVETLAT.model.tableaux.Facture', {
    extend: 'Ext.data.Model',
    
   fields: [{
        name: 'designa',
        type: 'string'
    },{
        name: 'unite',
        type: 'int'
    },{
        name: 'montant',
        type: 'int'
    }]
});