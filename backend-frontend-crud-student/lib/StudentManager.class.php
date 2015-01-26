<?php
abstract class StudentManager
{
  /**
   * Méthode permettant d'ajouter une student.
   * @param $étudiant Student L'étudiant à ajouter
   * @return void
   */
  abstract protected function add(Student $student);
  
  /**
   * Méthode renvoyant le nombre d'étudiants total.
   * @return int
   */
  abstract public function count();
  
  /**
   * Méthode permettant de supprimer un étudiant.
   * @param $id int L'identifiant de la étudiant à supprimer
   * @return void
   */
  abstract public function delete($id);
  
  /**
   * Méthode retournant une liste de étudiant demandée.
   * @param $debut int La première étudiant à sélectionner
   * @param $limite int Le nombre de étudiant à sélectionner
   * @return array La liste des étudiant. Chaque entrée est une instance de étudiant.
   */
  abstract public function getList($debut = -1, $limite = -1);
  
  /**
   * Méthode retournant une étudiant précise.
   * @param $id int L'identifiant de la étudiant à récupérer
   * @return étudiant La étudiant demandée
   */
  abstract public function getUnique($id);
  
  /**
   * Méthode permettant d'enregistrer une étudiant.
   * @param $étudiant étudiant la étudiant à enregistrer
   * @see self::add()
   * @see self::modify()
   * @return void
   */
  public function save(Student $student)
  {
    if ($student->isValid())
    {
      $student->isNew() ? $this->add($student) : $this->update($student);
    }
    
    else
    {
      throw new RuntimeException('The student should be validated before registering');
    }
  }
  
  /**
   * Méthode permettant de modifier un étudiant.
   * @param $student étudiant la étudiant à modifier
   * @return void
   */
  abstract protected function update(Student $student);
}