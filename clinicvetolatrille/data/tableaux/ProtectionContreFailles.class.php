<?php
class ProtectionContreFailles {
	private $stringFaille, $intFaille;

	public function getStringFaille() {
		return $this -> stringFaille;
		
	}
	public function setStringFaille($stringFaille) {
		$this -> stringFaille = $this -> failleXssEtInjectionString($stringFaille);
	}
	
	public function getIntFaille() {
		return $this -> intFaille;
	
	}
	
	public function setIntFaille($intFaille) {
		$this -> intFaille = $this -> failleXssEtInjectionInt($intFaille);
	}
	
	
	//Encodage et prevention contre la faille xss et injections String.
	private function failleXssEtInjectionString($string)
	{
		$verifEffectString = htmlentities($string, ENT_QUOTES, 'ISO-8859-1');
		$verifEffectString = mysql_real_escape_string($verifEffectString);
		$verifEffectString = preg_quote($verifEffectString, '/');
		$verifEffectString = escapeshellarg($verifEffectString);
		$verifEffectString = escapeshellcmd($verifEffectString);
		$verifEffectString = substr($verifEffectString, 2, strlen($verifEffectString) - 4);
		return $verifEffectString;
	}
	
	//Encodage et prevention contre la faille xss et injections String.
	function failleXssEtInjectionInt($int)
	{
		$verifEffectString = intval($int);
		$verifEffectString = mysql_real_escape_string($verifEffectString);
		$verifEffectString = preg_quote($verifEffectString, '/');
		$verifEffectString = escapeshellarg($verifEffectString);
		$verifEffectString = escapeshellcmd($verifEffectString);
		$verifEffectString = substr($verifEffectString, 2, strlen($verifEffectString) - 4);
		$verifEffectString = (int) $verifEffectString;
	
		return $verifEffectString;
	}

}
