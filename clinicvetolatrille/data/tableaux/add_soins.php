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

		if (trim($result['dates']) != '' AND trim($result['symptomes']) !='' AND trim($result['diagnostic']) !='' AND
				trim($result['typesoin']) !=''AND trim($result['traitements']) !='' AND (int) trim($result['idanimal']) > 0){

			//Access à la BDD.
			include_once('ConnBdd.class.php');
			$bd = new ConnBdd('vetolatrilledb');
			$bdd = $bd -> getBdd();


			///Appel de la classe Animal.
			include_once('Soin.class.php');
			//Controlle de la faille xss et de l'injection. dans la
			//classe animal.
			$soin = new Soin($result['idsoins'], $result['idanimal'], $result['dates'], $result['symptomes'], $result['diagnostic'],
					$result['typesoin'], $result['traitements']);


			//Requête INSERT sur la BDD.
			$req = $bdd->prepare('INSERT INTO soins(idanimal, dates, symptomes, diagnostic, typesoin, traitements, idutilisateur)
					VALUES(:idanimal, :dates, :symptomes, :diagnostic, :typesoin, :traitements, :idutilisateur)');
			$req->execute(array(
					'idanimal' => $soin -> idanimal,
					'dates' => $soin -> dates,
					'symptomes' => $soin -> symptomes,
					'diagnostic' => $soin -> diagnostic,
					'typesoin' => $soin -> typesoin,
					'traitements' => $soin -> traitements,
					'idutilisateur'=> $id
			));
			//Envoie du r�sultat au client.
			print json_encode(array("success" => true , "msgjson" => "Informations concernant le soin ajout&eacute;es avec succ&egrave;s."));
			$_SESSION['timeout'] = time();
		}
		else{
			print json_encode(array("success" => false , "msgjson" => "Informations concernant le soin non ajout&eacute;es. Veuillez resaisir correctement ces informations."));
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

