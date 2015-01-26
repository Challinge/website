package com.example.prjcompteurcie;

/*
 * Une classe (Metier) qui représente les informations et qui peut contenir un enregistrement d'une table. 
 * Par exemple, on aura cette classe pour symboliser les différentes professions qui peuvent peupler cette table.
 * */
public class Compteur {
	// Notez que l'identifiant est un long
	private long idcompteur;
	private String numcompteur;
	private int ancienindex;
	private int nouvelindex;
	private String releve;
	private String recu = "";
	private String daterel = "";
	private int idzone;

	public Compteur(long cid, String cnumc, int cani, int cnoi, String rel, String rcu, String dterel, int zid) {
		super();
		this.setIdcompteur(cid);
		this.setNumcompteur(cnumc);
		this.setAncienindex(cani);
		this.setNouvelindex(cnoi);
		this.setReleve(rel);
		this.setRecu(rcu);
		this.setIdzone(zid);
		this.setDaterel(dterel);
		
	}

	public long getIdcompteur() {
		return idcompteur;
	}

	public void setIdcompteur(long idcompteur) {
		this.idcompteur = idcompteur;
	}

	public String getNumcompteur() {
		return numcompteur;
	}

	public void setNumcompteur(String numcompteur) {
		this.numcompteur = numcompteur;
	}

	public int getAncienindex() {
		return ancienindex;
	}

	public void setAncienindex(int ancienindex) {
		this.ancienindex = ancienindex;
	}

	public int getNouvelindex() {
		return nouvelindex;
	}

	public void setNouvelindex(int nouvelindex) {
		this.nouvelindex = nouvelindex;
	}

	public int getIdzone() {
		return idzone;
	}

	public void setIdzone(int idzone) {
		this.idzone = idzone;
	}

	public String getReleve() {
		return releve;
	}

	public void setReleve(String releve) {
		this.releve = releve;
	}

	public String getRecu() {
		return recu;
	}

	public void setRecu(String recu) {
		this.recu = recu;
	}

	public String getDaterel() {
		return daterel;
	}

	public void setDaterel(String daterel) {
		this.daterel = daterel;
	}

}
