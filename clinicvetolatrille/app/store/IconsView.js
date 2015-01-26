/**
 * @author ADOUKO Franck Venance
 */
Ext.define('CLVETLAT.store.IconsView', {
	extend : 'Ext.data.Store',
	id : 'storeicoview',
	model : 'CLVETLAT.model.IconsView',
	data : [{
		src : 'images/notepadLarge.png',
		caption : 'Ordonnance'
	}, {
		src : 'images/accordionLarge.png',
		caption : 'Fiche'
	}, {
		src : 'images/gridLarge.png',
		caption : 'Facture'
	}]
});