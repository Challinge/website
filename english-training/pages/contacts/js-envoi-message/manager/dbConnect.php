<?php


class cnxMsg {

    protected $cnx;

    private $con;

    public function __construct(){

        try{
			
            $strConnection = 'mysql:host=localhost;dbname=iformati_iforma_BD';
			 
            //encodage utf 8
            $arrExtraParam = array(PDO::MYSQL_ATTR_INIT_COMMAND =>"SET NAME utf8");
			
            $this -> con = new PDO($strConnection, 'iformati', 'Password123$');

            $this -> con ->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            //echo 'connexion ok';

            return $this -> con;
            }
            catch (PDOException $e){
			
                $Msg = 'ERREUR PDO dans ' . $e->getFile() . ' Ligne. ' . $e->getLine() . ' : ' . $e->getMessage();

                die($Msg);
        }

    }
}

?>
