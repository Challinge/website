<?php
class Proprietaire {
	public $idproprietaire = 0;
	public $nomproprietaire = "";
	public $profession = "";
	public $adressegeograph = "";
	public $adressepostale = "";
	public $telbureau = 0;
	public $teldomicile = 0;
	public $telportable = 0;
	
	
	//Constructeur de la classe Proprietaire.
	public function __construct($idprop, $nmprop, $nmprof, $addgeo, $addpost, $telbur, $teldom, $telport) {
		$this -> idproprietaire = $idprop;
		$this -> nomproprietaire = $nmprop;
		$this -> profession = $nmprof;
		$this -> adressegeograph = $addgeo;
		$this -> adressepostale = $addpost;
		$this -> telbureau = $telbur;
		$this -> teldomicile = $teldom;
		$this -> telportable = $telport;
		$this -> controlFailleString();
	}

	//Controlle des variables contre la faille xss et de l'injection
	private function controlFailleString() {
		
		//Appelle de la classe de controlle qu'il n'y a pas d'injection ou de faille xss.
		include_once('ProtectionContreFailles.class.php');
		$controlFailleString = new ProtectionContreFailles();
		
		$controlFailleString -> setIntFaille($this -> idproprietaire);
		$this -> idproprietaire = $controlFailleString -> getIntFaille();

		$controlFailleString -> setStringFaille($this -> nomproprietaire);
		$this -> nomproprietaire = $controlFailleString -> getStringFaille();

		$controlFailleString -> setStringFaille($this -> profession);
		$this -> profession = $controlFailleString -> getStringFaille();

		$controlFailleString -> setStringFaille($this -> adressegeograph);
		$this -> adressegeograph = $controlFailleString -> getStringFaille();

		$controlFailleString -> setStringFaille($this -> adressepostale);
		$this -> adressepostale = $controlFailleString -> getStringFaille();

		$controlFailleString -> setIntFaille($this -> telbureau);
		$this -> telbureau = $controlFailleString -> getIntFaille();

		$controlFailleString -> setIntFaille($this -> teldomicile);
		$this -> teldomicile = $controlFailleString -> getIntFaille();

		$controlFailleString -> setIntFaille($this -> telportable);
		$this -> telportable = $controlFailleString -> getIntFaille();

	}
}