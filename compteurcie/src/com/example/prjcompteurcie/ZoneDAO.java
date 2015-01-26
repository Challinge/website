package com.example.prjcompteurcie;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;

/*
 * Une classe contrôleur, le DAO pour ainsi dire, qui effectuera les opérations sur la base.
 * On doit y inclure au moins les méthodes CRUD, autrement dit les méthodes qui permettent l'ajout d'entrées 
 * dans la base, la récupération d'entrées, la mise à jour d'enregistrements ou encore la suppression de tuples. 
 * Bien entendu, ces méthodes sont à adapter en fonction du contexte et du métier.
 * Dans la pratique on essaie de s'adapter au contexte quand même, là je n'ai mis que des méthodes génériques.
 * */

public class ZoneDAO extends DAOBase { // Ainsi, pour pouvoir utiliser les
										// méthodes de la classe DAOBase.

	public static final String TABLE_NAME = "zone";
	public static final String KEYZONE = "idzone";
	public static final String LIBELLEZONE = "libellezone";
	public static final String TRAITE = "traite";
	public static final String TOTAL = "total";
	public static final String RECU = "recu";

	public static final String TABLE_CREATE = "CREATE TABLE " + TABLE_NAME
			+ " (" + KEYZONE + " INTEGER PRIMARY KEY, " + LIBELLEZONE
			+ " TEXT, " + TRAITE + " INTEGER, " + TOTAL 
			+ " INTEGER, " + RECU + " VARCHAR(3));";

	public static final String TABLE_DROP = "DROP TABLE IF EXISTS "
			+ TABLE_NAME + ";";

	/**
	 * @param m
	 *            le métier à ajouter à la base
	 */

	public ZoneDAO(Context pContext) {
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
	public void ajouter(Zone z) {
		ContentValues value = new ContentValues();
		value.put(ZoneDAO.KEYZONE, z.getIdZone());
		value.put(ZoneDAO.LIBELLEZONE, z.getLibelleZone());
		value.put(ZoneDAO.TRAITE, z.getTraite());
		value.put(ZoneDAO.TOTAL, z.getTotal());
		value.put(ZoneDAO.RECU, z.getRecu());
		mDb.insert(ZoneDAO.TABLE_NAME, null, value);
		
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
		mDb.delete(TABLE_NAME, KEYZONE + " = ?",
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
	public void modifierTraite(int tr, int idz) {
		ContentValues value = new ContentValues();
		value.put(TRAITE, tr);
		mDb.update(TABLE_NAME, value, KEYZONE + " = ?",
				new String[] { String.valueOf(idz) });
	}
	
	public void modifierRecu(long idz, String recu) {
		ContentValues value = new ContentValues();
		value.put(RECU, recu);
		
		mDb.update(TABLE_NAME, value, KEYZONE + " = ?",
				new String[] { String.valueOf(idz) });
		
	}

	/**
	 * @param nbreZone
	 *            Le nombre de zone
	 */
	// je préfère utiliser Cursor rawQuery(String sql, String[] selectionArgs)
	// où je
	// peux écrire la requête que je veux dans sql et remplacer les « ? » dans
	// selectionArgs
	public String[] selectionnerLibZone(int nbreZone) {

		// Les curseurs sont des objets qui contiennent les résultats d'une
		// recherche dans une base de données.
		// Ce sont en fait des objets qui fonctionnent comme les tableaux que
		// nous avons vus précédemment,
		// ils contiennent les colonnes et lignes qui ont été renvoyées par la
		// requête.
		Cursor c = mDb.rawQuery(
				"select " + LIBELLEZONE + " from " + TABLE_NAME, null);
		// Pour naviguer entre les lignes du curseur
		String[] tabZones = new String[nbreZone];
		int compteurZone = 0;
		while (c.moveToNext()) {
			String lzone = c.getString(0);
			tabZones[compteurZone] = lzone;
			compteurZone++;
		}
		c.close();

		return tabZones;
	}
	
	public int[] selectionnerIdZoneNonAJour(int nbreZoneNonAJour) {

		// Les curseurs sont des objets qui contiennent les résultats d'une
		// recherche dans une base de données.
		// Ce sont en fait des objets qui fonctionnent comme les tableaux que
		// nous avons vus précédemment,
		// ils contiennent les colonnes et lignes qui ont été renvoyées par la
		// requête.
		Cursor z = mDb.rawQuery(
				"select " + KEYZONE + " from " + TABLE_NAME + " where recu = ?", new String[] { "non" });
		// Pour naviguer entre les lignes du curseur
		int[] tabIdZonesNonAJour = new int[nbreZoneNonAJour];
		int compteurIdZone = 0;
		while (z.moveToNext()) {
			int idz = z.getInt(0);
			tabIdZonesNonAJour[compteurIdZone] = idz;
			compteurIdZone++;
		}
		z.close();

		return tabIdZonesNonAJour;
	}

	public int selectionnerCountZone() {

		int nbreZone = 0;
		// Les curseurs sont des objets qui contiennent les résultats d'une
		// recherche dans une base de données.
		// Ce sont en fait des objets qui fonctionnent comme les tableaux que
		// nous avons vus précédemment,
		// ils contiennent les colonnes et lignes qui ont été renvoyées par la
		// requête.
		Cursor c = mDb.rawQuery("select COUNT(*) as nbrezones from "
				+ TABLE_NAME, null);
		// Pour naviguer entre les lignes du curseur
		while (c.moveToNext()) {
			nbreZone = c.getInt(0);

		}
		c.close();

		return nbreZone;
	}
	
	public int selectionnerCountZoneNonAJour() {

		int nbreZoneNonAJour = 0;
		// Les curseurs sont des objets qui contiennent les résultats d'une
		// recherche dans une base de données.
		// Ce sont en fait des objets qui fonctionnent comme les tableaux que
		// nous avons vus précédemment,
		// ils contiennent les colonnes et lignes qui ont été renvoyées par la
		// requête.
		Cursor c = mDb.rawQuery("select COUNT(*) as nbrezones from "
				+ TABLE_NAME + " where recu = ?", new String[] { "non" });
		// Pour naviguer entre les lignes du curseur
		while (c.moveToNext()) {
			nbreZoneNonAJour = c.getInt(0);

		}
		c.close();

		return nbreZoneNonAJour;
	}

	public Zone selectionnerInfoZone(String libZone) {

		// Les curseurs sont des objets qui contiennent les résultats d'une
		// recherche dans une base de données.
		// Ce sont en fait des objets qui fonctionnent comme les tableaux que
		// nous avons vus précédemment,
		// ils contiennent les colonnes et lignes qui ont été renvoyées par la
		// requête.
		Cursor cu = mDb.rawQuery("select " + KEYZONE + "," + LIBELLEZONE + ","
				+ TRAITE + "," + TOTAL + "," + RECU + " from " + TABLE_NAME
				+ " where libellezone = ?", new String[] { libZone });
		Zone z = null;
		if (cu.getCount() > 0) {
			// Pour naviguer entre les lignes du curseur
			while (cu.moveToNext()) {
				long id = cu.getInt(0);
				String libellezone = cu.getString(1);
				int traite = cu.getInt(2);
				int total = cu.getInt(3);
				String recu = cu.getString(4);
				z = new Zone(id, libellezone, traite, total, recu);

			}
		}
		else{
			z = new Zone(0, "", 0, 0,"");
		}
		cu.close();

		return z;
	}
	
	public Zone selectionnerInfoZone(int idZone) {

		// Les curseurs sont des objets qui contiennent les résultats d'une
		// recherche dans une base de données.
		// Ce sont en fait des objets qui fonctionnent comme les tableaux que
		// nous avons vus précédemment,
		// ils contiennent les colonnes et lignes qui ont été renvoyées par la
		// requête.
		Cursor cu = mDb.rawQuery("select " + KEYZONE + "," + LIBELLEZONE + ","
				+ TRAITE + "," + TOTAL + "," + RECU + " from " + TABLE_NAME
				+ " where idzone = ?", new String[] { String.valueOf(idZone) });
		Zone z = null;
		if (cu.getCount() > 0) {
			// Pour naviguer entre les lignes du curseur
			while (cu.moveToNext()) {
				long id = cu.getInt(0);
				String libellezone = cu.getString(1);
				int traite = cu.getInt(2);
				int total = cu.getInt(3);
				String recu = cu.getString(4);
				z = new Zone(id, libellezone, traite, total, recu);

			}
		}
		else{
			z = new Zone(0, "", 0, 0,"");
		}
		cu.close();

		return z;
	}

}
