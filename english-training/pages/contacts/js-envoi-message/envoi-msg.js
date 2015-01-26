jQuery(document).ready(function(){

	jQuery('#envoi-msge').submit(function(){
		
		//recuperation des variables
		
		var nomUser = jQuery("#nameUser").val();
		
		var mailUser = jQuery("#Prenoms").val();
		
		var sujetMsg = jQuery("#sujet").val();
		
		var corpsMsg = jQuery("#coprs").val();
		
			if(nomUser =='' && mailUser =='' && sujetMsg =='' && corpsMsg ==''){
			
				alert ('Veuillez renseigner les différents champs est obligatoire S.V.P');
			  
                return false;
			
			}else{
			
				jQuery.ajax({
					
					type:'GET',
						 
					url:'js-envoi-message/controller/controlle-msg.php?nomUser='+nomUser+'&mailUser='+mailUser+'&sujetMsg='+sujetMsg+'&corpsMsg='+corpsMsg+'&test=addMsg',
						
					timeout: 3000,
						 
					 success: function(data, textStatus, jqXHR) {

					   /*alert(data);*/
					   
						if(data=='Votre préoccupation a été bien enregistrée et qu\'il aura un retour sous peu.'){
						
							jQuery("#envoi-msge").slideUp(700);
							
							jQuery('.afich-msg').html(data);
						}
					   
					 }
						,
					  error: function() {
						
					   alert('Votre requête a été interompu veuillez reprendre s.v.p');
							  
						return false;
							
					  }
				 });
				 
				  return false;
				
			}
		
		
		return false;
	
	});
	
});