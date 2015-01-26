<?php
session_start();

$periodeInactive = 1200; //Définition de la période d'inactivité.
$session_life = 0;
$lifeValidation = true;

//Conntrolle de la session au cas où elle est active, sinon on la detruit après 20mn
//d'inactivité
if (isset($_SESSION['timeout'])) {

	$timelogout = (int)  htmlentities(strip_tags($_SESSION['timeout']));
	$session_life = time() - $timelogout;
	if ($session_life > $periodeInactive) {
		//Changement d'état de la connexion de l'utilisateur pour aller à disconnected.
		include_once('ConnBdd.class.php');
		$bd = new ConnBdd('vetolatrilledb');
		$bdd = $bd -> getBdd();

		//RequÃªte UPDATE sur la BDD.
		$req = $bdd->prepare('UPDATE utilisateur SET connectutilisateur = :connectutilisateur
				WHERE idutilisateur = :idutilisateur  AND loginutilisateur = :loginutilisateur');
		$req->execute(array(
				'idutilisateur' => htmlentities(strip_tags($_SESSION['id']), ENT_QUOTES, 'ISO-8859-1'),
				'loginutilisateur' =>  htmlentities(strip_tags($_SESSION['logged']), ENT_QUOTES, 'ISO-8859-1'),
				'connectutilisateur'=> 'disconnected'
		));
		//Destruction de la session et indiquation par $lifeValidation.
		session_destroy();
		$lifeValidation = false;
	}

}

if(isset($_SESSION['id']) AND isset($_SESSION['logged']) AND $lifeValidation){
	$id = htmlentities(strip_tags($_SESSION['id']), ENT_QUOTES, 'ISO-8859-1');
	$logged = htmlentities(strip_tags($_SESSION['logged']), ENT_QUOTES, 'ISO-8859-1');

	include_once('ConnBdd.class.php');
	$bd = new ConnBdd('vetolatrilledb');
	$bdd = $bd -> getBdd();

	$req = $bdd->prepare('SELECT validiteutilisateur, connectutilisateur FROM utilisateur WHERE idutilisateur = :id
			AND loginutilisateur = :logged');
	$req->execute(array(
			'id' => $id,
			'logged' => $logged));
	$resultat = $req->fetch();

	if (trim($resultat['validiteutilisateur']) == 'valide' AND trim($resultat['connectutilisateur']) == 'connected' AND $lifeValidation){

		if (isset($_POST['idfacture']) AND isset($_POST['idprop']) AND isset($_POST['totalapayer']) AND isset($_POST['payer'])){

			//Protection contre faille XSS.
			$recupIdFact = strip_tags($_POST['idfacture']);
			$recupIdProp = (int) strip_tags($_POST['idprop']);
			$recupTotAPay = (int) strip_tags($_POST['totalapayer']);
			$recupPay = (int) strip_tags($_POST['payer']);

			if ($recupIdFact != '' AND $recupIdProp > 0 AND $recupTotAPay > 0 AND $recupPay > 0){

				//Access Ã  la BDD.
				include_once('ConnBdd.class.php');
				$bd = new ConnBdd('vetolatrilledb');
				$bdd = $bd -> getBdd();

				//RequÃªte INSERT sur la BDD.
				$req = $bdd->prepare('INSERT INTO facture(numfacture, idproprietaire, totalapayer, payer)
						VALUES(:idfacture, :idprop, :totalapayer, :payer)');
				$req->execute(array(
						'idfacture' => $recupIdFact,
						'idprop' => $recupIdProp,
						'totalapayer' => $recupTotAPay,
						'payer' => $recupPay
				));

				//"Ordonnance mise &agrave;."
				print '{"success": true, "msg":"Facture ajout&eacute;e."}';
				$_SESSION['timeout'] = time();
			}else{
				print json_encode(array("success" => false , "msgjson" => "Informations concernant le soin non ajout&eacute;es. Veuillez resaisir correctement ces informations."));
				$_SESSION['timeout'] = time();
			}
		}else{
			print json_encode(array("success" => false , "msgjson" => "Informations concernant la facture non ajout&eacute;es. Veuillez resaisir correctement ces informations."));
			$_SESSION['timeout'] = time();
		}
		$_SESSION['timeout'] = time();
	}else{
		include_once('JsonHandler.class.php');
		$encoderjson = new JsonHandler();
		print $encoderjson -> encode(array("success" => 'neutre' , "msgjson" => "http:&#47;&#47;".$_SESSION['serveur']."&#47;vetolatrille&#47;"));
	}
}else{
	include_once('JsonHandler.class.php');
	$encoderjson = new JsonHandler();
	print $encoderjson -> encode(array("success" => 'neutre' , "msgjson" => "http:&#47;&#47;".$_SESSION['serveur']."&#47;vetolatrille&#47;"));
}
