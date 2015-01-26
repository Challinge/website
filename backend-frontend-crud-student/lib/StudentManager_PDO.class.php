<?php
class StudentManager_PDO extends StudentManager
{
  /**
   * Attribut contenant l'instance représentant la BDD.
   * @type PDO
   */
  protected $db;
  
  /**
   * Constructeur étant chargé d'enregistrer l'instance de PDO dans l'attribut $db.
   * @param $db PDO Le DAO
   * @return void
   */
  public function __construct(PDO $db)
  {
    $this->db = $db;
  }
  
  /**
   * @see StudentManager::add()
   */
  protected function add(Student $student)
  {
    $requete = $this->db->prepare('INSERT INTO student SET name = :name, calsse = :classe, age = :age, phone = :phone, adress = :adress, dateAjout = NOW(), dateModif = NOW()');
    
    $requete->bindValue(':name', $student->name());
    $requete->bindValue(':classe', $student->auclasseteur());
    $requete->bindValue(':age', $student->age());
    $requete->bindValue(':phone', $student->phone());
    $requete->bindValue(':address', $student->address());

    $requete->execute();
  }
  
  /**
   * @see StudentManager::count()
   */
  public function count()
  {
    return $this->db->query('SELECT COUNT(*) FROM student')->fetchColumn();
  }
  
  /**
   * @see StudentManager::delete()
   */
  public function delete($id)
  {
    $this->db->exec('DELETE FROM student WHERE id = '.(int) $id);
  }
  
  /**
   * @see StudentManager::getList()
   */
  public function getList($debut = -1, $limite = -1)
  {
    $sql = 'SELECT id, name, classe, age, phone, address, DATE_FORMAT (dateAjout, \'le %d/%m/%Y à %Hh%i\') AS dateAjout, DATE_FORMAT (dateModif, \'le %d/%m/%Y à %Hh%i\') AS dateModif FROM student ORDER BY id DESC';
    
    // On vérifie l'intégrité des paramètres fournis.
    if ($debut != -1 || $limite != -1)
    {
      $sql .= ' LIMIT '.(int) $limite.' OFFSET '.(int) $debut;
    }
    
    $requete = $this->db->query($sql);
    $requete->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'Student');
    
    $listeNews = $requete->fetchAll();
    
    $requete->closeCursor();
    
    return $listeNews;
  }
  
  /**
   * @see StudentManager::getUnique()
   */
  public function getUnique($id)
  {
    $requete = $this->db->prepare('SELECT id, name, classe, age, phone, address,u, DATE_FORMAT (dateAjout, \'le %d/%m/%Y à %Hh%i\') AS dateAjout, DATE_FORMAT (dateModif, \'le %d/%m/%Y à %Hh%i\') AS dateModif FROM student WHERE id = :id');
    $requete->bindValue(':id', (int) $id, PDO::PARAM_INT);
    $requete->execute();
    
    $requete->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'Student');
    
    return $requete->fetch();
  }
  
  /**
   * @see StudentManager::update()
   */
  protected function update(News $news)
  {
    $requete = $this->db->prepare('UPDATE news SET name = :name, calsse = :classe, age = :age, phone = :phone, adress = :adress, dateModif = NOW() WHERE id = :id');
    
    $requete->bindValue(':name', $student->name());
    $requete->bindValue(':classe', $student->auclasseteur());
    $requete->bindValue(':age', $student->age());
    $requete->bindValue(':phone', $student->phone());
    $requete->bindValue(':address', $student->address());
    $requete->bindValue(':id', $news->id(), PDO::PARAM_INT);
    
    $requete->execute();
  }
}