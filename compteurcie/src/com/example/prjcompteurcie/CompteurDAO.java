package com.example.prjcompteurcie;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.util.Log;

/*
 * Une classe contrôleur, le DAO pour ainsi dire, qui effectuera les opérations sur la base.
 * On doit y inclure au moins les méthodes CRUD, autrement dit les méthodes qui permettent l'ajout d'entrées 
 * dans la base, la récupération d'entrées, la mise à jour d'enregistrements ou encore la suppression de tuples. 
 * Bien entendu, ces méthodes sont à adapter en fonction du contexte et du métier.
 * Dans la pratique on essaie de s'adapter au contexte quand même, là je n'ai mis que des méthodes génériques.
 * */

public class CompteurDAO extends DAOBase { // Ainsi, pour pouvoir utiliser les
										// méthodes de la classe DAOBase.

	public static final String TABLE_NAME = "compteur";
	public static final String KEYCOMPTEUR = "idcompteur";
	public static final String NUMCOMPTEUR = "numcompteur";
	public static final String ANINDEX = "ancienindex";
	public static final String NOINDEX = "nouvelindex";
	public static final String RELEVE = "cptreleve";
	public static final String RECU = "recu";
	public static final String DATEREL = "datereleve";
	public static final String SCDKEYZONE = "idzone";

	public static final String TABLE_CREATE = "CREATE TABLE " + TABLE_NAME
			+ " (" + KEYCOMPTEUR + " INTEGER PRIMARY KEY, " + NUMCOMPTEUR
			+ " TEXT, " + ANINDEX + " INTEGER, " + NOINDEX + " INTEGER, "
			+ RELEVE + " VARCHAR(3), " + RECU + " VARCHAR(3), "
			+ DATEREL + " VARCHAR(10), " + SCDKEYZONE + " INTEGER);";

	public static final String TABLE_DROP = "DROP TABLE IF EXISTS "
			+ TABLE_NAME + ";";

	/**
	 * @param m
	 *            le métier à ajouter à la base
	 */

	public CompteurDAO(Context pContext) {
		super(pContext);
		// TODO Auto-generated constructor stub
	}

	// Les ContentValues sont utilisés pour insérer des données dans la base.
	// Ainsi, on peut dire
	// qu'ils fonctionnent un peu comme les Bundle par exemple, puisqu'on peut y
	// insérer des couples
	// identifiant-valeur, qui représenteront les attributs des objets à insérer
	// dans la base.
	// L’identifiant du couple doit être une chaîne de caractères qui représente
	// une des colonnes de la table visée.
	// Le insert, long insert(String table, String nullColumnHack, ContentValues
	// values) :
	// table est l'identifiant de la table dans laquelle insérer l'entrée.
	// nullColumnHack est le nom d'une colonne à utiliser au cas où vous
	// souhaiteriez insérer une entrée vide.
	// values est un objet qui représente l'entrée à insérer.
	public void ajouter(Compteur c) {
		ContentValues value = new ContentValues();
		value.put(CompteurDAO.KEYCOMPTEUR, c.getIdcompteur());
		value.put(CompteurDAO.NUMCOMPTEUR, c.getNumcompteur());
		value.put(CompteurDAO.ANINDEX, c.getAncienindex());
		value.put(CompteurDAO.NOINDEX, c.getNouvelindex());
		value.put(CompteurDAO.RELEVE, c.getReleve());
		value.put(CompteurDAO.RECU, c.getRecu());
		value.put(CompteurDAO.DATEREL, c.getDaterel());
		value.put(CompteurDAO.SCDKEYZONE, c.getIdzone());
		
		Log.d("fonctionne", "fonctionne");
		mDb.insert(CompteurDAO.TABLE_NAME, null, value);
		Log.d("fonctionne", "fonctionne après insert");
	}

	/**
	 * @param id
	 *            l'identifiant du métier à supprimer
	 */
	// le delete, int delete(String table, String whereClause, String[]
	// whereArgs) :
	// table est l'identifiant de la table.
	// whereClause correspond au WHERE en SQL. Par exemple, pour sélectionner la
	// première valeur dans
	// la table Metier, on mettra pour whereClause la chaîne « id = 1 ». En
	// pratique, on préférera
	// utiliser la chaîne « id = ? » et je vais vous expliquer pourquoi tout de
	// suite.
	// whereArgs est un tableau des valeurs qui remplaceront les « ? » dans
	// whereClause. Ainsi,
	// si whereClause vaut « LIKE ? AND salaire > ? » et qu'on cherche les
	// métiers qui ressemblent
	// à « ingénieur avec un salaire supérieur à 1000 € », il suffit d'insérer
	// dans whereArgs un String[]
	// du genre {"ingenieur", "1000"}.
	public void supprimer(long id) {
		mDb.delete(TABLE_NAME, KEYCOMPTEUR + " = ?",
				new String[] { String.valueOf(id) });
	}

	/**
	 * @param m
	 *            le métier modifié
	 */
	// le update, int delete(String table, String whereClause, String[]
	// whereArgs) :
	// table est l'identifiant de la table.
	// whereClause correspond au WHERE en SQL. Par exemple, pour sélectionner la
	// première valeur dans
	// la table Metier, on mettra pour whereClause la chaîne « id = 1 ». En
	// pratique, on préférera
	// utiliser la chaîne « id = ? » et je vais vous expliquer pourquoi tout de
	// suite.
	// whereArgs est un tableau des valeurs qui remplaceront les « ? » dans
	// whereClause. Ainsi,
	// si whereClause vaut « LIKE ? AND salaire > ? » et qu'on cherche les
	// métiers qui ressemblent
	// à « ingénieur avec un salaire supérieur à 1000 € », il suffit d'insérer
	// dans whereArgs un String[]
	// du genre {"ingenieur", "1000"}.
	public void modifierCpt(int idz, String numcpt, String nouvind, String dterel, String rel) {
		ContentValues value = new ContentValues();
		value.put(NOINDEX, Integer.valueOf(nouvind));
		value.put(DATEREL, dterel);
		value.put(RELEVE, rel);
				
		mDb.update(TABLE_NAME, value, NUMCOMPTEUR + " = ? and " + SCDKEYZONE + " = ?",
				new String[] { numcpt.trim(), String.valueOf(idz) });
		
	}
	
	public void modifierRecu(int idz, String numcpt, String recu) {
		ContentValues value = new ContentValues();
		value.put(RECU, recu);
		
		mDb.update(TABLE_NAME, value, NUMCOMPTEUR + " = ? and " + SCDKEYZONE + " = ?",
				new String[] { numcpt.trim(), String.valueOf(idz) });
		
	}
	
	public int selectionnerCountCompteur() {

		int nbreCpt = 0;
		// Les curseurs sont des objets qui contiennent les résultats d'une
		// recherche dans une base de données.
		// Ce sont en fait des objets qui fonctionnent comme les tableaux que
		// nous avons vus précédemment,
		// ils contiennent les colonnes et lignes qui ont été renvoyées par la
		// requête.
		Cursor c = mDb.rawQuery("select COUNT(*) as nbrecpts from "
				+ TABLE_NAME, null);
		// Pour naviguer entre les lignes du curseur
		while (c.moveToNext()) {
			nbreCpt = c.getInt(0);

		}
		c.close();

		return nbreCpt;
	}
	
	public int selectionnerCountCompteurNonAjour() {

		int nbreCptNonAJour = 0;
		// Les curseurs sont des objets qui contiennent les résultats d'une
		// recherche dans une base de données.
		// Ce sont en fait des objets qui fonctionnent comme les tableaux que
		// nous avons vus précédemment,
		// ils contiennent les colonnes et lignes qui ont été renvoyées par la
		// requête.
		Cursor c = mDb.rawQuery("select COUNT(*) as nbrecpts from "
				+ TABLE_NAME+ " where nouvelindex > ancienindex and recu = ?", new String[] { "non" });
		// Pour naviguer entre les lignes du curseur
		while (c.moveToNext()) {
			nbreCptNonAJour = c.getInt(0);
			
		}
		c.close();
		
		return nbreCptNonAJour;
	}
	
	public int[] selectionnerIdCptNonAJour(int nbreCptNonAJour) {

		// Les curseurs sont des objets qui contiennent les résultats d'une
		// recherche dans une base de données.
		// Ce sont en fait des objets qui fonctionnent comme les tableaux que
		// nous avons vus précédemment,
		// ils contiennent les colonnes et lignes qui ont été renvoyées par la
		// requête.
		Cursor c = mDb.rawQuery(
				"select " + KEYCOMPTEUR + " from " + TABLE_NAME 
				+ " where nouvelindex > ancienindex and recu = ?", new String[] { "non" });
		// Pour naviguer entre les lignes du curseur
		int[] tabIdCptNonAJour = new int[nbreCptNonAJour];
		int compteurIdZone = 0;
		while (c.moveToNext()) {
			int idc = c.getInt(0);
			
			tabIdCptNonAJour[compteurIdZone] = idc;
			
			
			compteurIdZone++;
		}
		c.close();
		//Log.d("IntentConnexion", "***//////////////////////////////////////***"+ String.valueOf(tabIdCptNonAJour.length));
		return tabIdCptNonAJour;
	}

	public Compteur selectionnerInfoCpt(String numCpt, int idzone) {

		// Les curseurs sont des objets qui contiennent les résultats d'une
		// recherche dans une base de données.
		// Ce sont en fait des objets qui fonctionnent comme les tableaux que
		// nous avons vus précédemment,
		// ils contiennent les colonnes et lignes qui ont été renvoyées par la
		// requête.
		Cursor cu = mDb.rawQuery("select " + KEYCOMPTEUR + "," + NUMCOMPTEUR + ","
				+ ANINDEX + "," + NOINDEX + "," + RELEVE + "," + RECU + "," + DATEREL + "," + SCDKEYZONE + " from " + TABLE_NAME
				+ " where numcompteur = ? and idzone = ?", new String[] { numCpt, String.valueOf(idzone) });
		Compteur c = null;
		if (cu.getCount() > 0) {
			// Pour naviguer entre les lignes du curseur
			while (cu.moveToNext()) {
				long id = cu.getInt(0);
				String numcpt = cu.getString(1);
				int anind = cu.getInt(2);
				int noind = cu.getInt(3);
				String releve = cu.getString(4);
				String recu = cu.getString(5);
				String dterel = cu.getString(6);
				int idz = cu.getInt(6);
				
				c = new  Compteur(id, numcpt, anind, noind, releve, recu, dterel, idz);

			}
		}
		else{
			c = new Compteur(0, "", 0, 0, "", "", "", 0);
		}
		cu.close();

		return c;
	}
	
	public Compteur selectionnerInfoCpt(int indiceCpt) {
		
		indiceCpt = indiceCpt + 1;
		
		// Les curseurs sont des objets qui contiennent les résultats d'une
		// recherche dans une base de données.
		// Ce sont en fait des objets qui fonctionnent comme les tableaux que
		// nous avons vus précédemment,
		// ils contiennent les colonnes et lignes qui ont été renvoyées par la
		// requête.
		Cursor cu = mDb.rawQuery("select " + KEYCOMPTEUR + "," + NUMCOMPTEUR + ","
				+ ANINDEX + "," + NOINDEX + "," + RELEVE + "," + RECU + "," + DATEREL + "," + SCDKEYZONE + " from " + TABLE_NAME
				+ " where idcompteur = ?", new String[] { String.valueOf(indiceCpt) });
		Compteur c = null;
		if (cu.getCount() > 0) {
			// Pour naviguer entre les lignes du curseur
			while (cu.moveToNext()) {
				long id = cu.getInt(0);
				String numcpt = cu.getString(1);
				int anind = cu.getInt(2);
				int noind = cu.getInt(3);
				String releve = cu.getString(4);
				String recu = cu.getString(5);
				String dterel = cu.getString(6);
				int idz = cu.getInt(7);
				
				c = new Compteur(id, numcpt, anind, noind, releve, recu, dterel, idz);

			}
		}
		else{
			c = new Compteur(0, "", 0, 0, "", "", "", 0);
		}
		cu.close();

		return c;
	}

}
