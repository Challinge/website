<?php
class StudentManager_MySQLi extends StudentManager
{
  /**
   * Attribut contenant l'instance représentant la BDD.
   * @type MySQLi
   */
  protected $db;
  
  /**
   * Constructeur étant chargé d'enregistrer l'instance de MySQLi dans l'attribut $db.
   * @param $db MySQLi Le DAO
   * @return void
   */
  public function __construct(MySQLi $db)
  {
    $this->db = $db;
  }
  
  /**
   * @see StudentManager::add()
   */
  protected function add(Student $student)
  {
    
    $requete = $this->db->prepare('INSERT INTO student(name, classe, age, phone, address,dateAjout, dateModif) VALUES(?,?,?,?,?,Now(),Now())');
    
    $requete->bind_param('sssss', $name, $classe, $age, $phone, $address);
    $name=$student->name();
    $classe=$student->classe();
    $age=$student->age();
    $phone=$student->phone();
    $address=$student->address();
    $requete->execute();
  }
  
  /**
   * @see StudentManager::count()
   */
  public function count()
  {
    return $this->db->query('SELECT id FROM student')->num_rows;
  }
  
  /**
   * @see StudentManager::delete()
   */
  public function delete($id)
  {
    $id = (int) $id;
    
    $requete = $this->db->prepare('DELETE FROM student WHERE id = ?');
    
    $requete->bind_param('i', $id);
    
    $requete->execute();
  }
  
  /**
   * @see StudentManager::getList()
   */
  public function getList($debut = -1, $limite = -1)
  {
    $listeStudent = array();
    
    $sql = 'SELECT id, name, classe, age, phone, address, DATE_FORMAT (dateAjout, \'le %d/%m/%Y à %Hh%i\') AS dateAjout, DATE_FORMAT (dateModif, \'le %d/%m/%Y à %Hh%i\') AS dateModif FROM student ORDER BY id DESC';
    
    // On vérifie l'intégrité des paramètres fournis.
    if ($debut != -1 || $limite != -1)
    {
      $sql .= ' LIMIT '.(int) $limite.' OFFSET '.(int) $debut;
    }
    
    $requete = $this->db->query($sql);
    
    while ($student = $requete->fetch_object('Student'))
    {
      $listeStudent[] = $student;
    }
    
    return $listeStudent;
  }
  
  /**
   * @see StudentManager::getUnique()
   */
  public function getUnique($id)
  {
    $id = (int) $id;
    
    $requete = $this->db->prepare('SELECT id, name, classe, age, phone, address, DATE_FORMAT (dateAjout, \'le %d/%m/%Y à %Hh%i\') AS dateAjout, DATE_FORMAT (dateModif, \'le %d/%m/%Y à %Hh%i\') AS dateModif FROM student WHERE id = ?');
    $requete->bind_param('i', $id);
    $requete->execute();
    
    $requete->bind_result($id, $name, $classe, $age, $phone, $address, $dateAjout, $dateModif);
    
    $requete->fetch();
    
    return new Student(array(
      'id' => $id,
      'name' => $name,
      'classe' => $classe,
      'age' => $age,
      'phone' => $phone,
      'address' => $address,
      'dateAjout' => $dateAjout,
      'dateModif' => $dateModif
    ));
  }
  
  /**
   * @see StudentManager::update()
   */
  protected function update(Student $student)
  {
    $requete = $this->db->prepare('UPDATE student SET name = ?, classe = ?, age = ?, phone = ?, address = ?, dateModif = NOW() WHERE id = ?');
    
    $requete->bind_param('sssss', $student->name(), $student->classe(), $student->age(), $student->phone(),$student->address());
    
    $requete->execute();
  }
}