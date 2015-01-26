<?php
class DernierSoin {
	public $id_soin = 0;
	public $id_animal = 0;
	public $id_prop = 0;
	public $nom_anim = "";
	public $nom_prop = "";
	public $d_date = "";
	public $num_factu = "";
	public $doit = 0;
	
	//Constructeur de la classe Proprietaire.
	public function __construct($idsoi, $idanim, $idprop, $nmanim, $nmprop, $ddat, $numfact, $doit) {
		$this ->  id_soin = $idsoi;
		$this ->  id_animal = $idanim;
		$this ->  id_prop = $idprop;
		$this ->  nom_anim = $nmanim;
		$this ->  nom_prop = $nmprop;
		$this ->  d_date = $ddat;
		$this ->  num_factu = $numfact;
		$this ->  doit = $doit;
		$this -> controlFailleString();
	}

	//Controlle des variables contre la faille xss et de l'injection
	private function controlFailleString() {
		
		//Appelle de la classe de controlle qu'il n'y a pas d'injection ou de faille xss.
		include_once('ProtectionContreFailles.class.php');
		$controlFailleString = new ProtectionContreFailles();
		
		$controlFailleString -> setIntFaille($this ->  id_soin);
		$this ->  id_soin = $controlFailleString -> getIntFaille();
		
		$controlFailleString -> setIntFaille($this ->  id_animal);
		$this ->  id_animal = $controlFailleString -> getIntFaille();
		
		$controlFailleString -> setIntFaille($this ->  id_prop);
		$this ->  id_prop = $controlFailleString -> getIntFaille();

		$controlFailleString -> setStringFaille($this ->  nom_anim);
		$this ->  nom_anim = $controlFailleString -> getStringFaille();

		$controlFailleString -> setStringFaille($this ->  nom_prop);
		$this ->  nom_prop = $controlFailleString -> getStringFaille();

		$controlFailleString -> setStringFaille($this ->  d_date);
		$this ->  d_date = $controlFailleString -> getStringFaille();
		$recupAnnee = substr($this ->  d_date, 0, 4);
		$recupMois = substr($this ->  d_date, 6, 3);
		$recupJour = substr($this ->  d_date, 11, 3);
		$this ->  d_date = $recupAnnee . $recupMois . $recupJour;
		
	}
}