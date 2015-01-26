<?php
class Soin {
	public $idsoins = 0;
	public $idanimal = 0;
	public $dates = "";
	public $symptomes = "";
	public $diagnostic = "";
	public $typesoin= "";
	public $traitements = "";
	
	//Constructeur de la classe Soin.
	public function __construct($idsoi, $idanim, $dat, $symp, $diag, $typsoi, $trait) {
		$this ->  idsoins = $idsoi;
		$this ->  idanimal = $idanim;
		$this ->  dates = $dat;
		$this ->  symptomes = $symp;
		$this ->  diagnostic = $diag;
		$this ->  typesoin = $typsoi;
		$this ->  traitements = $trait;
		$this -> controlFailleString();
	}

	//Controlle des variables contre la faille xss et de l'injection
	private function controlFailleString() {
		
		//Appelle de la classe de controlle qu'il n'y a pas d'injection ou de faille xss.
		include_once('ProtectionContreFailles.class.php');
		$controlFailleString = new ProtectionContreFailles();
		
		$controlFailleString -> setIntFaille($this ->  idsoins);
		$this ->  idsoins = $controlFailleString -> getIntFaille();
		
		$controlFailleString -> setIntFaille($this ->  idanimal);
		$this ->  idanimal = $controlFailleString -> getIntFaille();

		$controlFailleString -> setStringFaille($this ->  dates);
		$this ->  dates = $controlFailleString -> getStringFaille();
		$recupAnnee = substr($this -> dates, 0, 4);
		$recupMois = substr($this -> dates, 6, 3);
		$recupJour = substr($this -> dates, 11, 3);
		$this -> dates = $recupAnnee . $recupMois . $recupJour;

		$controlFailleString -> setStringFaille($this ->  symptomes);
		$this ->  symptomes = $controlFailleString -> getStringFaille();

		$controlFailleString -> setStringFaille($this ->  diagnostic);
		$this ->  diagnostic = $controlFailleString -> getStringFaille();

		$controlFailleString -> setStringFaille($this ->  typesoin);
		$this ->  typesoin = $controlFailleString -> getStringFaille();
		
		$controlFailleString -> setStringFaille($this ->  traitements);
		$this ->  traitements = $controlFailleString -> getStringFaille();
		
	}
}