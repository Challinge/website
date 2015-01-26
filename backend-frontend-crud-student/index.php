<?php
require 'lib/autoload.inc.php';

$db = DBFactory::getMysqlConnexionWithMySQLi();
$manager = new StudentManager_MySQLi($db);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr">
  <head>
    <title>Accueil du site</title>
    <meta http-equiv="Content-type" content="text/html; charset=iso-8859-1" />
  </head>
  
  <body>
    <p><a href="admin.php">Access to the admin page</a></p>
<?php
if (isset($_GET['id']))
{
  $student = $manager->getUnique((int) $_GET['id']);
  
  echo '<p><em>', $student->name(), '</em>, ', $student->classe(), '</p>', "\n",
       '<h2>', $student->phone(), '</h2>', "\n",
       '<p>', nl2br($student->address()), '</p>', "\n";
  
  if ($student->dateAjout() != $student->dateModif())
  {
    echo '<p style="text-align: right;"><small><em>Updated ', $student->dateModif(), '</em></small></p>';
  }
}

else
{
  echo '<h2 style="text-align:center">Liste of students</h2>';
  
  foreach ($manager->getList(0, 100) as $student)
  {
    if (strlen($student->address()) <= 400)
    {
      $address = $student->address();
    }
    
    else
    {
      $debut = substr($student->adress(), 0, 200);
      $debut = substr($debut, 0, strrpos($debut, ' ')) . '...';
      
      $contenu = $debut;
    }
    
    echo '<h4><a href="?id=', $student->id(), '">', $student->name(), '</a></h4>', "\n",
         '<p>', nl2br ($student->address()), '</p>';
  }
}
?>
  </body>
</html>