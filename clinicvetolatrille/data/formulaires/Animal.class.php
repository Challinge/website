<?php
class Animal {
	public $idanimal = 0;
	public $idproprietaire = 0;
	public $nomanimal = "";
	public $race = "";
	public $robe = "";
	public $datedenaissance = "";
	public $sexe = "";
	public $poids = 0;
	
	
	//Constructeur de la classe Proprietaire.
	public function __construct($idanim, $idprop, $nmanim, $race, $robe, $datedenai, $sexe, $poids) {
		$this -> idanimal =$idanim;
		$this -> idproprietaire =$idprop;
		$this -> nomanimal = $nmanim;
		$this -> race = $race;
		$this -> robe = $robe;
		$this -> datedenaissance = $datedenai;
		$this -> sexe = $sexe;
		$this -> poids = $poids;
		$this -> controlFailleString();
	}

	//Controlle des variables contre la faille xss et de l'injection
	private function controlFailleString() {
		
		//Appelle de la classe de controlle qu'il n'y a pas d'injection ou de faille xss.
		include_once('ProtectionContreFailles.class.php');
		$controlFailleString = new ProtectionContreFailles();
		
		$controlFailleString -> setIntFaille($this -> idanimal);
		$this -> idanimal = $controlFailleString -> getIntFaille();
		
		$controlFailleString -> setIntFaille($this -> idproprietaire);
		$this -> idproprietaire = $controlFailleString -> getIntFaille();

		$controlFailleString -> setStringFaille($this -> nomanimal);
		$this -> nomanimal = $controlFailleString -> getStringFaille();

		$controlFailleString -> setStringFaille($this -> race);
		$this -> race = $controlFailleString -> getStringFaille();

		$controlFailleString -> setStringFaille($this -> robe);
		$this -> robe = $controlFailleString -> getStringFaille();

		
		$controlFailleString -> setStringFaille($this -> datedenaissance);
		$this -> datedenaissance = $controlFailleString -> getStringFaille();
		$recupAnnee = substr($this -> datedenaissance, 0, 4);
		$recupMois = substr($this -> datedenaissance, 6, 3);
		$recupJour = substr($this -> datedenaissance, 11, 3);
		$this -> datedenaissance = $recupAnnee . $recupMois . $recupJour;

		$controlFailleString -> setStringFaille($this -> sexe);
		$this -> sexe = $sexe = $controlFailleString -> getStringFaille();

		$controlFailleString -> setIntFaille($this -> poids);
		$this -> poids = $controlFailleString -> getIntFaille();

	}
}