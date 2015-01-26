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
		//Access Ã  la BDD.
		include_once('ConnBdd.class.php');
		$bd = new ConnBdd('vetolatrilledb');
		$bdd = $bd -> getBdd();

		$recupStart = (int) strip_tags($_GET['start']);
		$recupLimit = (int) strip_tags($_GET['limit']);

		//RequÃªte READ sur la BDD.
		$rep = $bdd -> prepare('SELECT * FROM soins ORDER BY idanimal DESC LIMIT :start, :limit');

		$rep->bindParam(':start', $recupStart, PDO::PARAM_INT);
		$rep->bindParam(':limit', $recupLimit, PDO::PARAM_INT);
		$rep->execute();

		$tabSoins[0] = '';
		$compteur = 0;

		//Appel de la classe Proprietaire.
		include_once('Soin.class.php');

		while ($donnees = $rep -> fetch()) {
			//RÃ©cupÃ©ration du rÃ©sultat de la requÃªte SELECT, avec controlle de la faille xss et de l'injection. dans la
			//classe Soins.
			$soins = new Soin($donnees['idsoins'], $donnees['idanimal'], $donnees['dates'], $donnees['symptomes'],
					$donnees['diagnostic'], $donnees['typesoin'], $donnees['traitements']);

			//Affectation d'objets au tableau.
			$tabSoins[$compteur] = $soins;
			$compteur++;

		}

		$rep -> closeCursor();

		//Compte le nombre total d'entrée dans la table soins, pour le transmettre à Pagingtoolbar du store relatif.
		$rep = $bdd -> query('SELECT COUNT(*) as nombretotalsoins FROM soins');
		$donnees = $rep -> fetch();
		$rep -> closeCursor();

		//Encodage du JSON pour l'encoi Ã  celui qui a fait la requÃªte.
		include_once ('JsonHandler.class.php');
		$encoderjson = new JsonHandler();
		print $encoderjson -> encode(array("success" => true, "soins" => $tabSoins,
				"total" => (int) strip_tags($donnees['nombretotalsoins'])), 0);
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