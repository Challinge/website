<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" >
	<head>
		<meta charset="ISO-8859-1">
		<title>Clinique Veterinaire</title>

		<link rel="stylesheet" type="text/css" href="ext-4.0/resources/css/ext-all.css">
		<link rel="stylesheet" type="text/css" href="css/layout-browser.css">
		<link rel="stylesheet" type="text/css" href="css/veto.css">
		
		
	</head>
	<body>
		
		<script type="text/javascript" src="ext-4.0/ext.js"></script>
		<?php
			//Affichage de la page de connexion en cas de non connexion de l'utilisateur.
			if (($validetilisateur == 'false;' AND $connectUtilisateur == 'false') 
				OR ($validetilisateur == 'true;' AND $connectUtilisateur == 'false'))
			{
				
		?>
				<div id="div-1" align="center"></div>
				<script type="text/javascript" src="app.js"></script>
				<script type="text/javascript" src="variablesglobales.js"></script>
		<?php
			}
			else if ($validetilisateur == 'true;' AND $connectUtilisateur == 'true')
			{
		?>
				<script type="text/javascript" src="appp.js"></script>
				<script type="text/javascript" src="variablesglobales.js"></script>
		<?php
			}				
		?>
		
	</body>
</html>