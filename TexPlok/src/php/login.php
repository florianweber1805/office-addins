<?php
	header("Access-Control-Allow-Origin: *");
	
	//server kontaktieren
	function sconnect() {

		$host_name = 'db5000203908.hosting-data.io';
		$database = 'dbs198901';
		$user_name = 'dbu415268';
		$password = 'Lachenistgut2!';
		$connect = mysqli_connect($host_name, $user_name, $password, $database);
	
		if (mysqli_errno()) {
			die('<p>Verbindung zum MySQL Server fehlgeschlagen: '.mysqli_error().'</p>');
		} else {
			//echo '<p>Verbindung zum MySQL Server erfolgreich aufgebaut.</p >';
			return $connect;
		}

	}
?>