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
		//Encodage du JSON pour l'encoi à celui qui a fait la requête.
		include_once ('JsonHandler.class.php');

		$recupIProp = (int) strip_tags($_GET['idproprietaire']);
		if ((isset ($_GET['idproprietaire'])) AND ($recupIProp > 0)){

			//Access à la BDD.
			include_once('ConnBdd.class.php');
			$bd = new ConnBdd('vetolatrilledb');
			$bdd = $bd -> getBdd();

			$recupIProp = (int) strip_tags($_GET['idproprietaire']);
			$recupStart = (int) strip_tags($_GET['start']);
			$recupLimit = (int) strip_tags($_GET['limit']);

			//Requête READ sur la BDD.
			$rep = $bdd -> prepare('SELECT * FROM animal WHERE idproprietaire = :idproprietaire ORDER BY idanimal DESC LIMIT :start, :limit');

			$rep->bindParam(':idproprietaire', $recupIProp, PDO::PARAM_INT);
			$rep->bindParam(':start', $recupStart, PDO::PARAM_INT);
			$rep->bindParam(':limit', $recupLimit, PDO::PARAM_INT);
			$rep->execute();

			$tabAnimal[0] = '';
			$compteur = 0;

			//Appel de la classe Proprietaire.
			include_once('Animal.class.php');

			while ($donnees = $rep -> fetch()) {
				//Récupération du résultat de la requête SELECT, avec controlle de la faille xss et de l'injection. dans la
				//classe Animal.
				$animal = new Animal($donnees['idanimal'], $donnees['idproprietaire'], $donnees['nomanimal'], $donnees['race'],
						$donnees['robe'], trim($donnees['datedenaissance']), $donnees['sexe'], $donnees['poids']);

				//Affectation d'objets au tableau.
				$tabAnimal[$compteur] = $animal;
				$compteur++;
			}


			$rep -> closeCursor();

			//Compte le nombre total d'entr�e dans la table animal, pour le transmettre � Pagingtoolbar du store relatif.
			$rep = $bdd -> prepare('SELECT COUNT(*) as nombretotalanimaux FROM animal WHERE idproprietaire = :idproprietaire');
			$rep->bindParam(':idproprietaire', $recupIProp, PDO::PARAM_INT);
			$rep->execute();

			$donnees = $rep -> fetch();
			$rep -> closeCursor();

			if ($tabAnimal[0] != ''){
				$encoderjson = new JsonHandler();
				print $encoderjson -> encode(array("success" => true, "animal" => $tabAnimal,
						"total" => (int) strip_tags($donnees['nombretotalanimaux'])), 0);
				$_SESSION['timeout'] = time();
			}else{
				print json_encode(array("success" => false , "msgjson" => "Aucun animal trouv&eacute; pour ce propri&eacute;taire."));
				$_SESSION['timeout'] = time();
			}
		}else{
			print json_encode(array("success" => false , "msgjson" => "Aucune donn&eacute;e concernant l'animal n'est charg&eacute;e. Veuillez contacter l'administrateur."));
			$_SESSION['timeout'] = time();
		}

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
