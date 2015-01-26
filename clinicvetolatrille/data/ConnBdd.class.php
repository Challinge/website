<?php
class ConnBdd {
	private $host, $dbname, $user, $pssword, $bdd;

	public function getBdd() {
		return $this -> bdd;
	}
	private function setBdd($db) {
		$this -> bdd = $db;
	}
	
	public function __construct($dbname) {
		$this -> host = 'localhost';
		$this -> dbname = $dbname;
		$this -> user = 'root';
		$this -> pssword = 'jaP9DXP5eDy8GJEM';
		$this -> connect();
	}

	private function connect() {
		try {
			$bdd = new PDO('mysql:host='.$this -> host. ';dbname='. $this -> dbname , $this -> user, $this -> pssword);
		} catch(Exception $e) {
			die('Erreur : ' . $e -> getMessage());
		}
		$this -> setBdd($bdd);
		
	}

}
