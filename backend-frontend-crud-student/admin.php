<?php
require 'lib/autoload.inc.php';

$db = DBFactory::getMysqlConnexionWithMySQLi();
$manager = new StudentManager_MySQLi($db);

if (isset($_GET['modifier']))
{
  $student = $manager->getUnique ((int) $_GET['modifier']);
}

if (isset($_GET['supprimer']))
{
  $manager->delete((int) $_GET['supprimer']);
  $message = 'This student has been deleted !';
}

if (isset($_POST['name']))
{
    
  $student = new student(
    array(
      'name' => $_POST['name'],
      'classe' => $_POST['classe'],
      'age' => $_POST['age'],
      'phone' => $_POST['phone'],
      'address' => $_POST['address']

    )
  );
  
  if (isset($_POST['id']))
  {
    $student->setId($_POST['id']);
  }
  
  if ($student->isValid())
  {
    
    $manager->save($student);
    
    $message = $student->isNew() ? 'The student has been added !' : 'The student has been updated !';
 }
  
  else
  {
    $erreurs = $student->erreurs();
  }
  
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr">
  <head>
    <title>Administration</title>
    <meta http-equiv="Content-type" content="text/html; charset=iso-8859-1" />
    
    <style type="text/css">
      input {
            margin: 2px;
        }
      table, td {
        border: 1px solid black;
      }
      
      table {
        margin:auto;
        text-align: center;
        border-collapse: collapse;
      }
      
      td {
        padding: 3px;
      }
    </style>
  </head>
  
  <body>
    <p><a href=".">Welcome to the backend</a></p>
    
    <form action="admin.php" method="post">
      <p style="text-align: center">
<?php
if (isset($message))
{
  echo $message, '<br />';
}
?>
        <?php if (isset($erreurs) && in_array(Student::NAME_INVALID, $erreurs)) echo 'The name is invalid.<br />'; ?>
        Name : <input type="text" name="name" value="<?php if (isset($student)) echo $student->name(); ?>" /><br />
        
        <?php if (isset($erreurs) && in_array(Student::CLASSE_INVALID, $erreurs)) echo 'The class is invalid.<br />'; ?>
        Class : <input type="text" name="classe" value="<?php if (isset($student)) echo $student->classe(); ?>" /><br />

        <?php if (isset($erreurs) && in_array(Student::AGE_INVALID, $erreurs)) echo 'The age is invalid.<br />'; ?>
        Age : <input type="text" name="age" value="<?php if (isset($student)) echo $student->age(); ?>" /><br />

        <?php if (isset($erreurs) && in_array(Student::PHONE_INVALID, $erreurs)) echo 'The phone is invalid.<br />'; ?>
        Phone : <input type="text" name="phone" value="<?php if (isset($student)) echo $student->phone(); ?>" /><br />
        
        <?php if (isset($erreurs) && in_array(Student::ADDRESS_INVALID, $erreurs)) echo 'The address is invalid.<br />'; ?>
        Address :<br /><textarea rows="8" cols="60" name="address"><?php if (isset($student)) echo $student->address(); ?></textarea><br />
<?php
if(isset($student) && !$student->isNew())
{
?>
        <input type="hidden" name="id" value="<?php echo $student->id(); ?>" />
        <input type="submit" value="Update" name="modifier" />
<?php
}
else
{
?>
        <input type="submit" value="Add" />
<?php
}
?>
      </p>
    </form>
    
    <p style="text-align: center">There are <?php echo $manager->count(); ?> students. This the list :</p>
    
    <table>
      <tr><th>Name</th><th>Classe</th><th>Age</th><th>Phone</th><th>Address</th><th>Added Date</th><th>Last Updated</th><th>Action</th></tr>
<?php
foreach ($manager->getList() as $student)
{
  echo '<tr><td>', $student->name(), '</td><td>', $student->classe(), '</td><td>', $student->age(), '</td><td>', $student->phone(), '</td><td>', $student->address(), '</td><td>', $student->dateAjout(), '</td><td>', $student->dateModif(), '</td><td>', ($student->dateAjout() == $student->dateModif() ? '-' : $student->dateModif()), '</td><td><a href="?modifier=', $student->id(), '">Update</a> | <a href="?supprimer=', $student->id(), '">Delete</a></td></tr>', "\n";
}
?>
    </table>
  </body>
</html>