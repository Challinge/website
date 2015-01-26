/**
 * @ADOUKO Franck Venance
 */
Ext.define('CLVETLAT.model.tableaux.Soins', {
	extend : 'Ext.data.Model',

	
	fields : [{
		name : 'idsoins',
		type : 'int'
	},{
		name : 'idanimal',
		type : 'int'
	},{
		name : 'dates',
		type : 'date'
	}, {
		name : 'symptomes',
		type : 'string'
	},{
		name : 'diagnostic',
		type : 'string'
	},{
		name : 'typesoin',
		type : 'string'
	},{
		name : 'traitements',
		type : 'string'
	}]
}); 