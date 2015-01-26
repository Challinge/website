<?php
class Designation {
	public $designa = "";
	public $unite = 0;
	public $montant = 0;
	//Constructeur de la classe Proprietaire.
	public function __construct($designa, $unit, $mont) {
		$this ->  designa = $designa;
		$this ->  unite = $unit;
		$this ->  montant = $mont;
		$this -> controlFailleString();
	}

	//Controlle des variables contre la faille xss et de l'injection
	private function controlFailleString() {
		//Appelle de la classe de controlle qu'il n'y a pas d'injection ou de faille xss.
		include_once('ProtectionContreFailles.class.php');
		$controlFailleString = new ProtectionContreFailles();
		
		$controlFailleString -> setStringFaille($this ->  designa);
		$this ->  designa = $controlFailleString -> getStringFaille();
		
		$controlFailleString -> setIntFaille($this ->  unite);
		$this ->  unite = $controlFailleString -> getIntFaille();
		
		$controlFailleString -> setIntFaille($this ->  montant);
		$this ->  montant = $controlFailleString -> getIntFaille();
		
	}
}