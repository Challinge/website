<?php
 if (isset($_POST['mail']) and isset($_POST['mot_de_passe'])){
     if (($_POST['mail']=='rien@rien.net') and ($_POST['mot_de_passe']=='')){
         header('https://iformat-institute.net:2096/cpsess746290829/3rdparty/squirrelmail/src/webmail.php');
     }

     if (($_POST['mail']=='rien@rein.net') and ($_POST['mot_de_passe']=='')){
         header('Location:https://iformat-institute.net:2096/cpsess3871875653/3rdparty/squirrelmail/src/webmail.php');
     }

     if (($_POST['mail']=='rien@rien.net') and ($_POST['mot_de_passe']=='')){
         header('Location:https://iformat-institute.net:2096/cpsess6459579568/3rdparty/squirrelmail/src/webmail.php');
     }
 }
?>


