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
		//Encodage du JSON pour l'encoi Ã  celui qui a fait la requÃªte.
		include_once ('JsonHandler.class.php');

		//Access Ã  la BDD.
		include_once('ConnBdd.class.php');
		$bd = new ConnBdd('vetolatrilledb');
		$bdd = $bd -> getBdd();

		$reqStringSql = 'SELECT COUNT(*) AS nombretotalfacture FROM facture';

		//Compte le nombre total d'entrées dans la table facture, pour le transmettre au numéro de facture de view/formulaires/Facture.
		$rep = $bdd -> query($reqStringSql);
		$donnees = $rep -> fetch();
		$rep -> closeCursor();

		//Creation d'un code facture de ce genre : 000001.
		$numFacture = (int) strip_tags($donnees['nombretotalfacture']);
		$strLongueurChaine = strlen((String) ($numFacture +1));
		$strTotalLongueurChaine = abs(8 - $strLongueurChaine);
		$compteur = 0;
		$strNumFacture = (String) ($numFacture +1);
		while ($compteur < $strTotalLongueurChaine){
			$strNumFacture = '0'. $strNumFacture;
			$compteur++;
		}

		//Calcule le total du d'un proprietaire, à partir des factures précédentes, pour l'affecter au champs Doit de view/formulaires/Facture.
		$reqStringSql = 'SELECT (SUM(totalapayer) - SUM(payer)) AS diffpayer
				FROM facture
				GROUP BY idproprietaire';
		/*Ne marche pas.
		 * SELECT SUM(totalapayer) AS sumtotalapayer
		, SUM(payer) AS sumpayer,
		(sumtotalapayer - sumpayer) AS diffpayer
		*/
		//Compte le nombre total d'entrées dans la table facture, pour le transmettre au numéro de facture.
		$rep = $bdd -> query($reqStringSql);
		$donnees = $rep -> fetch();
		$rep -> closeCursor();

		$diffPayer = (int) strip_tags($donnees['diffpayer']);

		$reqStringSql = 'SELECT s.idsoins id_soin, a.idanimal id_animal, p.idproprietaire id_prop, a.nomanimal nom_anim,
				p.nomproprietaire nom_prop, s.dates d_date
				FROM soins s
				INNER JOIN animal a
				ON s.idanimal = a.idanimal
				INNER JOIN proprietaire p
				ON a.idproprietaire = p.idproprietaire
				ORDER BY idsoins ASC';

		//RequÃªte READ sur la BDD.
		$rep = $bdd -> query($reqStringSql);

		$tabDernierSoin[0] = '';
		$compteur = 0;

		//Appel de la classe Proprietaire.
		include_once('DernierSoin.class.php');

		while ($donnees = $rep -> fetch()) {
			//RÃ©cupÃ©ration du rÃ©sultat de la requÃªte SELECT, avec controlle de la faille xss et de l'injection. dans la
			//classe DernierSoin.
			$dernierSoins = new DernierSoin($donnees['id_soin'], $donnees['id_animal'], $donnees['id_prop'], $donnees['nom_anim'],
					$donnees['nom_prop'], $donnees['d_date'], $strNumFacture, $diffPayer);
			//Affectation d'objets au tableau.
			$tabDernierSoin[0] = $dernierSoins;

		}

		$rep -> closeCursor();

		if ($tabDernierSoin[0] != ''){
			$encoderjson = new JsonHandler();
			print $encoderjson -> encode(array("success" => true, "derniersoin" => $tabDernierSoin), 0);
			$_SESSION['timeout'] = time();
		}else{
			print json_encode(array("success" => false , "msgjson" => "Aucun soin trouv&eacute; en ce jour pour cet animal."));
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

