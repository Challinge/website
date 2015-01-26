Ext.onReady(function() {
	var form = null;
	//Ext.QuickTips.init();
	//Ext.EventManager.on(document,'keypress',function(e)bon a travailler
			
    var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
	 var simple = Ext.widget({
	        xtype: 'form',
	        layout: 'form',
	        id: 'simpleForm',
	        frame: true,
	        title: 'Connexion au logiciel de clinique vétérinaire',
	        bodyPadding: '5 5 0',
	        width: 350,
	        listeners: {
	        	afterrender : function() {
	        		Ext.create('Ext.util.KeyNav', this.getEl(), {
	        		"enter" : function(e){
	        			//Controlle de la touche ENTREE est appuyé.
	        			if (e.getKey()==13){
	        				//Si idlogin et idmotdepasse ne sont pas nuls alors éxécution de la méthode connexionForm().
	        				if (simple.down('#idlogin').getValue()!='' && simple.down('#idmotdepasse').getValue() != ''){
	        					connexionForm ();
	        				}else{
	        					Ext.MessageBox.show({
                 					title : 'Attention',
                 					msg : 'Veuillez, s\'il vous plait, saisir le login et mot de passe pour vous connecter à l\'application.',
                 					icon : Ext.MessageBox.ERROR, 
                 					buttons : Ext.Msg.OK
                 				});
	        				}
	    		        	
	        			}
	        		}
	        	});
	        	}
              },
            
	        fieldDefaults: {
	            msgTarget: 'side',
	            labelWidth: 90
	        },
	        defaultType: 'textfield',
	        items: [{
	            fieldLabel: 'Login :',
	            afterLabelTextTpl: required,
	            itemId : 'idlogin',
	            name: 'login',
	            allowBlank:false,
	            blankText: 'Le champ est requis.',
	            listeners: {
	                afterrender: function(field) {
	                  field.focus(false, 1000);
	                }
	              }
	        },{
	            fieldLabel: 'Mot de passe :',
	            afterLabelTextTpl: required,
	            inputType : 'password',
	            itemId : 'idmotdepasse',
	            name: 'pass',
	            allowBlank:false,
	            blankText: 'Le champ est requis.'
	        },{
	        	xtype: 'displayfield',
	        	//fieldLabel: '* : Champs obligatoire à remplir',
		        //name: 'home_score',
		        value: '(<span  style="color:red;">*</span>) : Champs obligatoire à remplir'
	        }],
	        
	        buttons: [{
	            text: 'Se connecter',
	            formBind: true,
                disabled: true,
                 
		        handler: function() {
		        	connexionForm ();
		        }
	        
	        },{
	            text: 'Annuler',
	            handler: function() {
	            	window.close();
	            }
	        }]
	    });

	    simple.render(Ext.get("div-1"));
	    
	    function connexionForm (){
	    	Ext.MessageBox.show({
	               msg: 'Connexion et chargement en cours, attendez s\'il vous plait...',
	               progressText: 'Connexion...',
	               width:400,
	               wait:true,
	               waitConfig: {interval:200}
	            });
	            setTimeout(function(){
	                Ext.MessageBox.hide();
	                
	             }, 8000);
	        var form = simple.getForm();   
	        form.submit({
	        	url: 'data/connexionform.php',
             success: function(form, action) {
             	var connexion = action.result.msg;
             	var splitConnexion = connexion.split(";")
             	if (splitConnexion[0] == 'true'){
             	
             	simple.hide();
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
         	    				html : '<div style="position:relative;"><h1><b><i> CLINIQUE VETERINAIRE DU LATRILLE</b></i><i><a id="deconnexion" href="deconnexion.php">Déconnexion</a><i></h1></div> ',
         	    				height : 30
         	    			}, {
         	    				xtype : 'iconesview'
         	    			}]

         	    		});
         	    	}	
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
         	    	
         	    });
             
             	
             	}else{
             		 Ext.MessageBox.show({
      					title : 'Attention',
      					msg : connexion,
      					icon : Ext.MessageBox.ERROR, 
      					buttons : Ext.Msg.OK
      				});
             		
             	}
             }
         });
	    }
	    
});
