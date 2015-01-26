/**
 * @ADOUKO Franck Venance
 */
Ext.define('CLVETLAT.model.tableaux.Animal', {
	extend : 'Ext.data.Model',

	idProperty : 'idanimal',

	fields : [{
		name : 'idproprietaire',
		type : 'int'
	},{
		name : 'nomanimal',
		type : 'string'
	}, {
		name : 'race',
		type : 'string'
	},{
		name : 'robe',
		type : 'string'
	}, {
		name : 'datedenaissance',
		type : 'date'
	},{
		name : 'sexe',
		type : 'string'
	},{
		name : 'poids',
		type : 'int'
	}]
}); 