<?php
/**
 * Classe représentant un étudiant
 * @author ADOUKO Franck.
 * @version 1.0
 */
class Student
{
  protected $erreurs = array(),
            $id,
            $name,
            $classe,
            $age,
            $phone,
            $address,
            $dateAjout,
            $dateModif;
  
  /**
   * Constantes relatives aux erreurs possibles rencontrées lors de l'exécution de la méthode.
   */
  const NAME_INVALID = 1;
  const CLASSE_INVALID = 2;
  const AGE_INVALID = 3;
  const PHONE_INVALID = 4;
  const ADDRESS_INVALID = 5;
  
  
  /**
   * Constructeur de la classe qui assigne les données spécifiées en paramètre aux attributs correspondants.
   * @param $valeurs array Les valeurs à assigner
   * @return void
   */
  public function __construct($valeurs = array())
  {
    if (!empty($valeurs)) // Si on a spécifié des valeurs, alors on hydrate l'objet.
    {
      $this->hydrate($valeurs);
    }
  }
  
  /**
   * Méthode assignant les valeurs spécifiées aux attributs correspondant.
   * @param $donnees array Les données à assigner
   * @return void
   */
  public function hydrate($donnees)
  {
    foreach ($donnees as $attribut => $valeur)
    {
      $methode = 'set'.ucfirst($attribut);
      
      if (is_callable(array($this, $methode)))
      {
        $this->$methode($valeur);
      }
    }
  }
  
  /**
   * Méthode permettant de savoir si l' étudiant est nouveau.
   * @return bool
   */
  public function isNew()
  {
    return empty($this->id);
  }
  
  /**
   * Méthode permettant de savoir si l'étudiant est valide.
   * @return bool1
   */
  public function isValid()
  {
    return !(empty($this->name) || empty($this->classe) || empty($this->age) || empty($this->phone) || empty($this->address));
  }
  
  
  // SETTERS //
  
  public function setId($id)
  {
    $this->id = (int) $id;
  }
  
  public function setName($name)
  {
    if (!is_string($name) || empty($name))
    {
      $this->erreurs[] = self::NAME_INVALID;
    }
    else
    {
      $this->name = $name;
    }
  }

  public function setClasse($classe)
  {
    if (!is_string($classe) || empty($classe))
    {
      $this->erreurs[] = self::CLASSE_INVALID;
    }
    else
    {
      $this->classe = $classe;
    }
  }
  
  public function setAge($age)
  {
    if (!is_string($age) || empty($age))
    {
      $this->erreurs[] = self::AGE_INVALID;
    }
    else
    {
      $this->age = $age;
    }
  }

  public function setPhone($phone)
  {
    if (!is_string($phone) || empty($phone))
    {
      $this->erreurs[] = self::PHONE_INVALID;
    }
    else
    {
      $this->phone = $phone;
    }
  }

  public function setAddress($address)
  {
    if (!is_string($address) || empty($address))
    {
      $this->erreurs[] = self::ADDRESS_INVALID;
    }
    else
    {
      $this->address = $address;
    }
  }
  
  public function setDateAjout($dateAjout)
  {
    if (is_string($dateAjout) && preg_match('`The [0-9]{2}/[0-9]{2}/[0-9]{4} at [0-9]{2}h[0-9]{2}`', $dateAjout))
    {
      $this->dateAjout = Now();
    }
  }
  
  public function setDateModif($dateModif)
  {
    if (is_string($dateModif) && preg_match('`The [0-9]{2}/[0-9]{2}/[0-9]{4} at [0-9]{2}h[0-9]{2}`', $dateModif))
    {
      $this->dateModif = Now();
    }
  }
  
  // GETTERS //
  
  public function erreurs()
  {
    return $this->erreurs;
  }
  
  public function id()
  {
    return $this->id;
  }
  
  public function name()
  {
    return $this->name;
  }
  
  public function classe()
  {
    return $this->classe;
  }
  
  public function age()
  {
    return $this->age;
  }

  public function phone()
  {
    return $this->phone;
  }

  public function address()
  {
    return $this->address;
  }

  public function dateAjout()
  {
    return $this->dateAjout;
  }
  
  public function dateModif()
  {
    return $this->dateModif;
  }
}