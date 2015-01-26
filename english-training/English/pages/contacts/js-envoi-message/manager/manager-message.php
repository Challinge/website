<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Martial Gohoré Bi
 * Date: 12/12/13
 * Time: 06:33
 * To change this template use File | Settings | File Templates.
 */

require_once'dbConnect.php';

 class MgerMsg extends cnxMsg{

     public function __construct(){

         $this->cnx= parent::__construct();

     }

     
	 public function addMsg($nomCplte, $sujetMsg, $corpsMsg, $varDate){
			
            $sql="call addMsg (?, ?, ?, ?)";

            try{

                $this->cnx->beginTransaction();

                    $p=$this->cnx->prepare($sql);
                    
                    $p->bindValue(1, $nomCplte,PDO::PARAM_STR);
					
					$p->bindValue(2, $sujetMsg,PDO::PARAM_STR);
					
					$p->bindValue(3, $corpsMsg,PDO::PARAM_STR);
					
					$p->bindValue(4, $varDate,PDO::PARAM_STR);
					
                    $p->execute();   

                    $p->closeCursor();

                   $this->cnx->commit();

                    return 2;

            }catch(PDOException $e){

                $this->cnx->rollBack();
					
				return $e->getMessage();
            }

        }
	  
 }