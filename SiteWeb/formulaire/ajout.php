<!DOCTYPE html>
<html>

<head>
	<title>Ajout des lieux d'intérêts</title>
	<meta http-equiv="refresh" content="10; URL=https://professeurcot.net/tourisme/formulaire">
	<meta name="Author" content="Martin Couture" /> 
	<meta charset="utf-8" />  
</head>

<body>
	<?php

	//Récupération des données dans le fichier ini pour une meilleure sécurité. 
	//Aide en ligne: https://sqlpey.com/php/securely-store-database-credentials-php/
	$configPath = __DIR__ . '/../../fichiersconfigurationsPHP/db_config_tourisme.ini';
	if (!file_exists($configPath)) {
		die("Fichier de configuration pas trouvé.");
	}

	$dbSettings = parse_ini_file($configPath, true);
	//Lecture du fichier de configuration
	if (!$dbSettings) {
		die("Impossible de lire le fichier de configuration.");
	}

	$dbHost = $dbSettings['database']['host'];
	$dbName = $dbSettings['database']['dbname'];
	$dbUser = $dbSettings['database']['username'];
	$dbPass = $dbSettings['database']['password'];
	$formPass = $dbSettings['database']['formpassword'];
	//Fin de la récupération


	$fNom = utf8_decode($_POST['fnom']);
	$fCoordX = $_POST['fcoordx'];
	$fCoordY = $_POST['fcoordy'];
	$fUrl = $_POST['furl'];
	$fInfo = utf8_decode($_POST['finfo']);
	$motpasse = $_POST['fmotpasse'];

	//Vérification du mot de passe du formulaire
	if ($motpasse == $formPass) {


		//Vérification du formulaire
		if ($fNom == "" || $fCoordX == "" || $fCoordY == "" || $fUrl == "" || $fInfo == "") {
				echo "<H2>Erreur</H2><H2>Formulaire incomplet!</H2>";
			} else {

				//Tentative de connexion
				$mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);  // Connexion a MySQL


				if ($mysqli->connect_error) {
					die("Problème de connexion: " . $mysqli->connect_error);
				}

				$fInfoSlahes = addslashes($fInfo); //Pour les apostrophes
				$fNomSlahes= addslashes($fNom);

				$sql = "INSERT INTO `poi` (`id`, `nom`, `coordx`, `coordy`, `url`, `info`) VALUES (NULL,'$fNomSlahes', '$fCoordX', '$fCoordY', '$fUrl','$fInfoSlahes' )";
				//echo $sql; Au cas pour tester la requête
				if ($mysqli->query($sql) === TRUE) {
					echo "<h3>Merci d'avoir entré un enregistrement $fNom<h3>";
				} else {
					echo "Erreur: " . $sql . "<br>" . $mysqli->error;
				}

				$mysqli->close();
			}
	} else {

		echo "Erreur de mot de passe!";
	}


	?>

</body>

</html>