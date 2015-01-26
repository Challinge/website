<?php
session_start();

$periodeInactive = 1200; //D�finition de la p�riode d'inactivit�.

$session_life = 0;
$lifeValidation = true;

if (isset($_SESSION['timeout'])) {

	$timelogout = (int)  htmlentities(strip_tags($_SESSION['timeout']));
	$session_life = time() - $timelogout;
	if ($session_life > $periodeInactive) {
		//Changement d'�tat de la connexion de l'utilisateur pour aller � disconnected.
		include_once('ConnBdd.class.php');
		$bd = new ConnBdd('vetolatrilledb');
		$bdd = $bd -> getBdd();

		//Requête UPDATE sur la BDD.
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
		//Récupération des données envoyées par la requête.
		$string = $HTTP_RAW_POST_DATA;

		//Decodage du JSON pour l'utiliser.
		include_once('JsonHandler.class.php');
		$encoderjson = new JsonHandler();
		$result = $encoderjson -> decode($string, true);

		//Exemple : Result - array(2) { ["foo"]=> string(3) "bar" ["cool"]=> string(4) "attr" }
		var_dump($result);

		if (trim($result['nomanimal']) != '' AND trim($result['race']) !='' AND trim($result['robe']) !='' AND
				trim($result['datedenaissance']) !='' AND trim($result['sexe']) >= '' AND trim($result['poids']) > 0 AND
				(int) trim($result['idanimal']) > 0 AND (int)trim($result['idproprietaire']) > 0){


			//Access à la BDD.
			include_once('ConnBdd.class.php');
			$bd = new ConnBdd('vetolatrilledb');
			$bdd = $bd -> getBdd();

			///Appel de la classe Animal.
			include_once('Animal.class.php');
			//Controlle de la faille xss et de l'injection. dans la
			//classe animal.
			$animal = new Animal($result['idanimal'], $result['idproprietaire'], $result['nomanimal'], $result['race'],
					$result['robe'], $result['datedenaissance'], $result['sexe'], $result['poids']);

			//Requête DELETE sur la BDD.
			$req = $bdd->prepare('DELETE FROM animal WHERE idanimal = :idanimal');
			$req->execute(array(
					'idanimal' => $animal -> idanimal
			));


			//Envoie du r�sultat au client.
			print json_encode(array("success" => true , "msgjson" => "Informations sur l'animal supprim&eacute;es avec succ&egrave;s."));
			$_SESSION['timeout'] = time();
		}
		else{
			print json_encode(array("success" => false , "msgjson" => "Informations sur l'animal non supprim&eacute;es. Veuillez resaisir correctement ces informations."));
			$_SESSION['timeout'] = time();
		}
	}else{
		//Récupération des données envoyées par la requête.
		$string = $HTTP_RAW_POST_DATA;

		//Decodage du JSON pour l'utiliser.
		include_once('JsonHandler.class.php');
		$encoderjson = new JsonHandler();
		$result = $encoderjson -> decode($string, true);

		//Exemple : Result - array(2) { ["foo"]=> string(3) "bar" ["cool"]=> string(4) "attr" }
		var_dump($result);
		print $encoderjson -> encode(array("success" => 'neutre' , "msgjson" => "http:&#47;&#47;".$_SESSION['serveur']."&#47;vetolatrille&#47;"));
	}
}else{
	//Récupération des données envoyées par la requête.
	$string = $HTTP_RAW_POST_DATA;

	//Decodage du JSON pour l'utiliser.
	include_once('JsonHandler.class.php');
	$encoderjson = new JsonHandler();
	$result = $encoderjson -> decode($string, true);

	//Exemple : Result - array(2) { ["foo"]=> string(3) "bar" ["cool"]=> string(4) "attr" }
	var_dump($result);
	print json_encode(array("success" => 'neutre' , "msgjson" => "http:&#47;&#47;".$_SESSION['serveur']."&#47;vetolatrille&#47;"));
}