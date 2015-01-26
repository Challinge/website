package com.example.prjcompteurcie;
/*
 * Une classe (Metier) qui représente les informations et qui peut contenir un enregistrement d'une table. 
 * Par exemple, on aura cette classe pour symboliser les différentes professions qui peuvent peupler cette table.
 * */
public class Zone {
	 // Notez que l'identifiant est un long
	  private long idzone = 0;
	  private String libellezone = "";
	  private int traite = 0;
	  private int total = 0;
	  private String recu = "";
	  
	  public Zone(long zid, String zlibelle, int ztraite, int ztotal, String rcu) {
	    super();
	    this.setIdZone(zid);
	    this.setLibelleZone(zlibelle);
	    this.setTraite(ztraite);
	    this.setTotal(ztotal);
	    this.setRecu(rcu);
	  }

	  public long getIdZone() {
	    return idzone;
	  }

	  public void setIdZone(long id) {
	    this.idzone = id;
	  }

	public String getLibelleZone() {
		return libellezone;
	}

	public void setLibelleZone(String libellezone) {
		this.libellezone = libellezone;
	}

	public int getTraite() {
		return traite;
	}

	public void setTraite(int traite) {
		this.traite = traite;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public String getRecu() {
		return recu;
	}

	public void setRecu(String recu) {
		this.recu = recu;
	}

}
