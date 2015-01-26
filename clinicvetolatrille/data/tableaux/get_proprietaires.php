<?php
session_start();

$periodeInactive = 1200; //D�finition de la p�riode d'inactivit�.
$session_life = 0;
$lifeValidation = true;

//Conntrolle de la session au cas o� elle est active, sinon on la detruit apr�s 20mn
//d'inactivit�
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

		//Access à la BDD.
		include_once('ConnBdd.class.php');
		$bd = new ConnBdd('vetolatrilledb');
		$bdd = $bd -> getBdd();

		$recupStart = (int) strip_tags($_GET['start']);
		$recupLimit = (int) strip_tags($_GET['limit']);

		//Requête READ sur la BDD.
		$rep = $bdd -> prepare('SELECT * FROM proprietaire ORDER BY idproprietaire DESC LIMIT :start, :limit');

		$rep->bindParam(':start', $recupStart, PDO::PARAM_INT);
		$rep->bindParam(':limit', $recupLimit, PDO::PARAM_INT);
		$rep->execute();

		$tabProprietaire[0] = '';
		$compteur = 0;

		//Appel de la classe Proprietaire.
		include_once('Proprietaire.class.php');

		while ($donnees = $rep -> fetch()) {
			//Récupération du résultat de la requête SELECT, avec controlle de la faille xss et de l'injection. dans la
			//classe proprietaire.
			$proprietaire = new Proprietaire($donnees['idproprietaire'], $donnees['nomproprietaire'], $donnees['profession'],
					$donnees['adressegeograph'], $donnees['adressepostale'], $donnees['telbureau'], $donnees['teldomicile'],
					$donnees['telportable']);

			//Affectation d'objets au tableau.
			$tabProprietaire[$compteur] = $proprietaire;
			$compteur++;

		}

		$rep -> closeCursor();

		//Compte le nombre total d'entr�e dans la table proprietaire, pour le transmettre � Pagingtoolbar du store relatif.
		$rep = $bdd -> query('SELECT COUNT(*) as nombretotalproprietaires FROM proprietaire');
		$donnees = $rep -> fetch();
		$rep -> closeCursor();

		//Encodage du JSON pour l'encoi à celui qui a fait la requête.
		include_once ('JsonHandler.class.php');
		$encoderjson = new JsonHandler();
		print $encoderjson -> encode(array("success" => true, "proprietaires" => $tabProprietaire,
				"total" => (int) strip_tags($donnees['nombretotalproprietaires'])), 0);

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
