Ext.onReady(function() {
	Ext.application({
	
		name : 'CLVETLAT',

		appFolder : 'app',

		controllers : ['IconsView','tableaux.Facture','tableaux.Proprietaire','formulaires.Proprietaire',
		               'tableaux.Animal','formulaires.Animal', 'tableaux.Soins','formulaires.Soins', 'formulaires.Ordonnance',
		               'formulaires.Facture'],
	

		launch : function() {
		
			Ext.create('Ext.container.Viewport', {
				layout : 'border',
				title : 'Ext Layout Browser',
				items : [{
					xtype : 'box',
					id : 'header',
					region : 'north',
					html : '<div style="position:relative;"><h1><b><i>CLINIQUE VETERINAIRE DU LATRILLE</b></i><i><a id="deconnexion" href="deconnexion.php">Déconnexion</a><i></h1></div>',
					height : 30
					}, {
					xtype : 'iconesview'
				}]

			});
		
			/*
			Ext.apply(Ext, {			/* Move cursor doesn't disappear within IE9  */
				/*
				 removeNode : Ext.isIE6 || Ext.isIE7 ? function(){
					var d;
					return function(n){
						if(n && n.tagName != 'BODY'){
							(Ext.enableNestedListenerRemoval) ? Ext.EventManager.purgeElement(n, true) : Ext.EventManager.removeAll(n);
							d = d || DOC.createElement('div');
							d.appendChild(n);
							d.innerHTML = '';
							delete Ext.elCache[n.id];
						}
					};
				}() : function(n){
					if(n && n.parentNode && n.tagName != 'BODY'){
						(Ext.enableNestedListenerRemoval) ? Ext.EventManager.purgeElement(n, true) : Ext.EventManager.removeAll(n);
						n.parentNode.removeChild(n);
						delete Ext.elCache[n.id];
					}
				}
			});
			*/
			}
		});
});