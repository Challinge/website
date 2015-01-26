<?php
class ConversionEnDate {
	private $recupAnnee = "";
	private $recupMois = "";
	private $recupJour = "";
	public $recupDate = "";
	public $resultRecupDate = null;

	//Constructeur de la classeConversionEnDate.
	public function __construct($rcpDate) {
		$this -> recupDate = $rcpDate;
		$this -> conversionEnDate($this -> recupDate);
	}

	//Controlle des variables contre la faille xss et de l'injection
	private function conversionEnDate($rcpDate) {
		$this -> recupDate = preg_replace('#/#', '-$1', $rcpDate);
		$this -> recupJour = substr($this -> recupDate, 0, 2);
		$this -> recupMois = substr($this -> recupDate, 3, 2);
		$this -> recupAnnee = substr($this -> recupDate, 6, 4);
		$this -> recupDate = $this -> recupAnnee .'-'. $this -> recupMois . '-'. $this -> recupJour;
		$format = 'Y-m-d';
		$date = DateTime::createFromFormat($format, $this -> recupDate);
		$this -> resultRecupDate = $date->format('Y-m-d H:i:s');
		
	}
}