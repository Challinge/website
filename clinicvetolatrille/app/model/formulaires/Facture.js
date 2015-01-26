/**
 * @ADOUKO Franck Venance
 */
Ext.define('CLVETLAT.model.formulaires.Facture', {
	extend : 'Ext.data.Model',

	
	fields : [{
		name : 'id_soin',
		type : 'int'
	},{
		name : 'id_animal',
		type : 'int'
	},{
		name : 'id_prop',
		type : 'int'
	}, {
		name : 'nom_anim',
		type : 'string'
	},{
		name : 'nom_prop',
		type : 'string'
	}, {
		name : 'd_date',
		type : 'date'
	}, {
		name : 'num_factu',
		type : 'string'
	}, {
		name : 'doit',
		type : 'int'
	}]
}); 