<?php
if(isset($_SESSION['id']) AND isset($_SESSION['logged'])){
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
	if (trim($resultat['validiteutilisateur']) == 'valide' AND trim($resultat['connectutilisateur']) == 'disconnected'){
		
		
		if (isset($_POST['login']) AND isset($_POST['pass']) )
		{
			//Protection contre faille XSS.
			$pseudo = htmlentities(strip_tags($_POST['login']), ENT_QUOTES, 'ISO-8859-1');
			$pass = htmlentities(strip_tags($_POST['pass']), ENT_QUOTES, 'ISO-8859-1');
		
			include_once('ConnBdd.class.php');
			$bd = new ConnBdd('vetolatrilledb');
			$bdd = $bd -> getBdd();
			// Hachage du mot de passe
			//$pass_hache = sha1('gzioploiu', $_POST['pass']);
			$reqStringSql = 'SELECT validiteutilisateur, idutilisateur, loginutilisateur, connectutilisateur
			FROM utilisateur WHERE loginutilisateur = :pseudo
			AND mdputilisateur = :pass';
			// Vérification des identifiants
			$req = $bdd->prepare($reqStringSql);
			$req->execute(array(
					'pseudo' => $pseudo,
					'pass' => $pass));
			$resultat = $req->fetch();
			if (!$resultat)
			{
				print '{"success": true, "msg":"Login ou mot de passe incorrecte."}';
			}
			else
			{
				if (trim($resultat['validiteutilisateur']) == 'valide'){
		
					$validetilisateur = 'true;';
					
					$_SESSION['id'] = $resultat['idutilisateur'];
					$_SESSION['logged'] = $pseudo;
					$_SESSION['serveur'] = 'localhost';
		
					if (trim($resultat['connectutilisateur']) == 'disconnected'){
						include_once('ConnBdd.class.php');
						$bd = new ConnBdd('vetolatrilledb');
						$bdd = $bd -> getBdd();
		
						//RequÃªte UPDATE sur la BDD.
						$req = $bdd->prepare('UPDATE utilisateur SET connectutilisateur = :connectutilisateur
						WHERE idutilisateur = :idutilisateur  AND loginutilisateur = :loginutilisateur');
						$req->execute(array(
								'idutilisateur' => $resultat['idutilisateur'],
								'loginutilisateur' => $pseudo,
								'connectutilisateur'=> 'connected'
						));
		
						$_SESSION['timeout'] = time();
		
						$connectUtilisateur = 'false';
						print '{"success": true, "msg":"'.$validetilisateur.$connectUtilisateur.'"}';
					}else{//L'utilisateur est connecté.
						$connectUtilisateur = 'true';
						print '{"success": true, "msg":"'.$validetilisateur.$connectUtilisateur.'"}';
					}
				}
			}
		}else // On n'a pas encore rempli le formulaire
		{
			print '{"success": true, "msg":"Connectez-vous en sp&eacute;cifiant les champs Login et Mot de passe."}';
		}
		
	}else{
		$validetilisateur = 'true;';
		$connectUtilisateur = 'false';
		//print '{"success": true, "msg":"'.$validetilisateur.$connectUtilisateur.'"}';
	}
}else{

		if (isset($_POST['login']) AND isset($_POST['pass']) )
		{
			//Protection contre faille XSS.
			$pseudo = htmlentities(strip_tags($_POST['login']), ENT_QUOTES, 'ISO-8859-1');
			$pass = htmlentities(strip_tags($_POST['pass']), ENT_QUOTES, 'ISO-8859-1');
		
			include_once('ConnBdd.class.php');
			$bd = new ConnBdd('vetolatrilledb');
			$bdd = $bd -> getBdd();
			// Hachage du mot de passe
			//$pass_hache = sha1('gzioploiu', $_POST['pass']);
			$reqStringSql = 'SELECT validiteutilisateur, idutilisateur, loginutilisateur, connectutilisateur
			FROM utilisateur WHERE loginutilisateur = :pseudo
			AND mdputilisateur = :pass';
			// Vérification des identifiants
			$req = $bdd->prepare($reqStringSql);
			$req->execute(array(
					'pseudo' => $pseudo,
					'pass' => $pass));
			$resultat = $req->fetch();
			if (!$resultat)
			{
				print '{"success": true, "msg":"Login ou mot de passe incorrecte."}';
			}
			else
			{
				if (trim($resultat['validiteutilisateur']) == 'valide'){
		
					$validetilisateur = 'true;';
					session_start();
					$_SESSION['id'] = $resultat['idutilisateur'];
					$_SESSION['logged'] = $pseudo;
					$_SESSION['serveur'] = 'localhost';
		
					if (trim($resultat['connectutilisateur']) == 'disconnected'){
						include_once('ConnBdd.class.php');
						$bd = new ConnBdd('vetolatrilledb');
						$bdd = $bd -> getBdd();
		
						//RequÃªte UPDATE sur la BDD.
						$req = $bdd->prepare('UPDATE utilisateur SET connectutilisateur = :connectutilisateur
						WHERE idutilisateur = :idutilisateur  AND loginutilisateur = :loginutilisateur');
						$req->execute(array(
								'idutilisateur' => $resultat['idutilisateur'],
								'loginutilisateur' => $pseudo,
								'connectutilisateur'=> 'connected'
						));
		
						$_SESSION['timeout'] = time();
		
						$connectUtilisateur = 'false';
						print '{"success": true, "msg":"'.$validetilisateur.$connectUtilisateur.'"}';
					}else{//L'utilisateur est connecté.
						$connectUtilisateur = 'true';
						print '{"success": true, "msg":"'.$validetilisateur.$connectUtilisateur.'"}';
					}
				}
			}
		}else // On n'a pas encore rempli le formulaire
		{
			print '{"success": true, "msg":"Connectez-vous en sp&eacute;cifiant les champs Login et Mot de passe."}';
		}
}
