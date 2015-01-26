/**
 * @ADOUKO Franck Venance
 */
Ext.define('CLVETLAT.model.tableaux.Proprietaire', {
	extend : 'Ext.data.Model',

	idProperty : 'idproprietaire',

	fields : [{
		name : 'nomproprietaire',
		type : 'string'
	}, {
		name : 'profession',
		type : 'string'
	},{
		name : 'adressegeograph',
		type : 'string'
	}, {
		name : 'adressepostale',
		type : 'string'
	},{
		name : 'telbureau',
		type : 'string'
	},{
		name : 'teldomicile',
		type : 'string'
	}, {
		name : 'telportable',
		type : 'string'
	}]
}); 