/**
 * @author ADOUKO Franck Venance
 */
Ext.define('CLVETLAT.view.IconsView', {
	extend : 'Ext.view.View',
	alias : 'widget.iconesview',
	
	margins: '15 20 55 15',
	//layout : 'fit',
	autoShow : true,

	initComponent : function() {

		var imageTpl = new Ext.XTemplate('<tpl for=".">', '<div style="margin-bottom: 10px; cursor:  pointer;" class="thumb-wrap">', '<img src="{src}" />', '<br/><span>{caption}</span>', '</div>', '</tpl>');
		this.store = 'IconsView';
	    this.tpl = imageTpl;
	    this.itemSelector = 'div.thumb-wrap';
		this.emptyText = 'No images available';
		//this.renderTo = Ext.getBody();

		this.callParent(arguments);
	}
});
