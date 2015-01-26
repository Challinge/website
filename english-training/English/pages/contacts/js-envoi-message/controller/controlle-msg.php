<?php
	
	require_once'../manager/manager-message.php';

    $recup=$_GET['test'];   $retour=null;	$test=FALSE;
	
	$nomCplte = null;	$varDate = null;	$mailInformat  = null;
	
	$owner_email = null;	$headers = null;	$subject = null;
	
	$messageBody = null;
	
	if(!empty($recup) && $recup=="addMsg"){

        if(isset($_GET['nomUser'])){

            $nomUser=$_GET['nomUser'];
			
			$test=true;

        }else{

            $test=false;

        }
		
		
		if(isset($_GET['mailUser'])){

            $mailUser=$_GET['mailUser'];
			
			$test=true;

        }else{

            $test=false;

        }
		
		
		if(isset($_GET['sujetMsg'])){

            $sujetMsg=$_GET['sujetMsg'];
			
			$test=true;

        }else{

            $test=false;

        }
		
		
		if(isset($_GET['corpsMsg'])){

            $corpsMsg=$_GET['corpsMsg'];
			
			$test=true;

        }else{

            $test=false;

        }
		
		
		
		if($test==true){
			
			$cnx= new MgerMsg();
			
			$nomCplte = $nomUser;	$varDate = date('d/m/Y - H:i:s');
			
			//Stockage dans la BD des données envoyées
			$recup = $cnx->addMsg($nomCplte, $sujetMsg, $corpsMsg, $varDate);
			
				if ($recup==2){
					
					$owner_email = 'infos@iformat-institute.net';
					$headers = 'From: '.$mailUser.'';
					$subject = $sujetMsg;
					$messageBody = "";
					
					$messageBody .= 'De : '.$nomCplte.'' . "\n";
					
					$messageBody .= '' . $corpsMsg . '' . "\n";
					
					mail($owner_email, $subject, $messageBody, $headers);
							
							
					$retour='Votre préoccupation a été bien enregistrée et qu\'il aura un retour sous peu.';

				}else{
															
					$retour='Échec de l\'envoi de votre message';
																
				}

		}
		
		
	}
	
	
	echo $retour;
