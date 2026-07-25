		
		<?php
        header("Access-Control-Allow-Origin: *");

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
	//Fin de la récupération


        $mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName); 
        // Réaliser une requête SQL
        $sql = 'SELECT * FROM poi ORDER BY nom; ';
        $results = $mysqli->query($sql);
       
        //Si problème
        if (!$results = $mysqli->query($sql)) {
            //La requête a échoué. 
            echo "Désolé, la requête a échoué!";
        

            /* Pour le débug
            echo "Error: La requête a échoué lors de l'exécution et voici pourquoi :\n";
            echo "Query: " . $sql . "\n";
            echo "Errno: " . $mysqli->errno . "\n";
            echo "Error: " . $mysqli->error . "\n";
            exit;*/
        }
        //Si table vide
        if ($results->num_rows === 0) {
            echo "Aucune données!";
            exit;
        }
        
        function download_csv_results($results, $name = NULL)
        {
            if( ! $name)
            {   //Génération d'un nom de fichier
                $name = md5(uniqid() . microtime(TRUE) . mt_rand()). '.csv';
            }
            //Structure d'entête du fichier
            header('Content-Type: text/csv');
            header('Content-Disposition: attachment; filename='. $name);
            header('Content-Encoding: UTF-8');
            header('Content-Type: text/csv; charset=utf-8' );
            header('Content-Transfer-Encoding: binary');
            header('Expires: 0');
            header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
            header('Pragma: public');
            ob_end_clean();
            

  
            //Création du fichier      
            $outstream = fopen("php://output", "wb");
            //Entête du CSV
            fputcsv($outstream, ["id", "nom", "x", "y", "url", "description"], ',');  //Entête
            //Insertion des données
            while ($point = $results->fetch_assoc()){
                $ligne = [ $point['id'], utf8_encode($point['nom']), $point['coordx'] , $point['coordy'], $point['url'], utf8_encode($point['info'])];
                fputcsv($outstream, $ligne, ',');
            }
            
            fclose($outstream);
        }

        //Appel de la fonction
        download_csv_results($results, "poi.csv");
     exit();

        $result->free(); //Libération des résultats. 
        $mysqli->close(); //Fermeture de la requête
		?>

		
	