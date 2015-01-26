package com.example.prjcompteurcie;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;

/*
 * Une classe contr�leur, le DAO pour ainsi dire, qui effectuera les op�rations sur la base.
 * On doit y inclure au moins les m�thodes CRUD, autrement dit les m�thodes qui permettent l'ajout d'entr�es 
 * dans la base, la r�cup�ration d'entr�es, la mise � jour d'enregistrements ou encore la suppression de tuples. 
 * Bien entendu, ces m�thodes sont � adapter en fonction du contexte et du m�tier.
 * Dans la pratique on essaie de s'adapter au contexte quand m�me, l� je n'ai mis que des m�thodes g�n�riques.
 * */

public class ZoneDAO extends DAOBase { // Ainsi, pour pouvoir utiliser les
										// m�thodes de la classe DAOBase.

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
	 *            le m�tier � ajouter � la base
	 */

	public ZoneDAO(Context pContext) {
		super(pContext);
		// TODO Auto-generated constructor stub
	}

	// Les ContentValues sont utilis�s pour ins�rer des donn�es dans la base.
	// Ainsi, on peut dire
	// qu'ils fonctionnent un peu comme les Bundle par exemple, puisqu'on peut y
	// ins�rer des couples
	// identifiant-valeur, qui repr�senteront les attributs des objets � ins�rer
	// dans la base.
	// L�identifiant du couple doit �tre une cha�ne de caract�res qui repr�sente
	// une des colonnes de la table vis�e.
	// Le insert, long insert(String table, String nullColumnHack, ContentValues
	// values) :
	// table est l'identifiant de la table dans laquelle ins�rer l'entr�e.
	// nullColumnHack est le nom d'une colonne � utiliser au cas o� vous
	// souhaiteriez ins�rer une entr�e vide.
	// values est un objet qui repr�sente l'entr�e � ins�rer.
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
	 *            l'identifiant du m�tier � supprimer
	 */
	// le delete, int delete(String table, String whereClause, String[]
	// whereArgs) :
	// table est l'identifiant de la table.
	// whereClause correspond au WHERE en SQL. Par exemple, pour s�lectionner la
	// premi�re valeur dans
	// la table Metier, on mettra pour whereClause la cha�ne � id = 1 �. En
	// pratique, on pr�f�rera
	// utiliser la cha�ne � id = ? � et je vais vous expliquer pourquoi tout de
	// suite.
	// whereArgs est un tableau des valeurs qui remplaceront les � ? � dans
	// whereClause. Ainsi,
	// si whereClause vaut � LIKE ? AND salaire > ? � et qu'on cherche les
	// m�tiers qui ressemblent
	// � � ing�nieur avec un salaire sup�rieur � 1000 � �, il suffit d'ins�rer
	// dans whereArgs un String[]
	// du genre {"ingenieur", "1000"}.
	public void supprimer(long id) {
		mDb.delete(TABLE_NAME, KEYZONE + " = ?",
				new String[] { String.valueOf(id) });
	}

	/**
	 * @param m
	 *            le m�tier modifi�
	 */
	// le update, int delete(String table, String whereClause, String[]
	// whereArgs) :
	// table est l'identifiant de la table.
	// whereClause correspond au WHERE en SQL. Par exemple, pour s�lectionner la
	// premi�re valeur dans
	// la table Metier, on mettra pour whereClause la cha�ne � id = 1 �. En
	// pratique, on pr�f�rera
	// utiliser la cha�ne � id = ? � et je vais vous expliquer pourquoi tout de
	// suite.
	// whereArgs est un tableau des valeurs qui remplaceront les � ? � dans
	// whereClause. Ainsi,
	// si whereClause vaut � LIKE ? AND salaire > ? � et qu'on cherche les
	// m�tiers qui ressemblent
	// � � ing�nieur avec un salaire sup�rieur � 1000 � �, il suffit d'ins�rer
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
	// je pr�f�re utiliser Cursor rawQuery(String sql, String[] selectionArgs)
	// o� je
	// peux �crire la requ�te que je veux dans sql et remplacer les � ? � dans
	// selectionArgs
	public String[] selectionnerLibZone(int nbreZone) {

		// Les curseurs sont des objets qui contiennent les r�sultats d'une
		// recherche dans une base de donn�es.
		// Ce sont en fait des objets qui fonctionnent comme les tableaux que
		// nous avons vus pr�c�demment,
		// ils contiennent les colonnes et lignes qui ont �t� renvoy�es par la
		// requ�te.
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

		// Les curseurs sont des objets qui contiennent les r�sultats d'une
		// recherche dans une base de donn�es.
		// Ce sont en fait des objets qui fonctionnent comme les tableaux que
		// nous avons vus pr�c�demment,
		// ils contiennent les colonnes et lignes qui ont �t� renvoy�es par la
		// requ�te.
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
		// Les curseurs sont des objets qui contiennent les r�sultats d'une
		// recherche dans une base de donn�es.
		// Ce sont en fait des objets qui fonctionnent comme les tableaux que
		// nous avons vus pr�c�demment,
		// ils contiennent les colonnes et lignes qui ont �t� renvoy�es par la
		// requ�te.
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
		// Les curseurs sont des objets qui contiennent les r�sultats d'une
		// recherche dans une base de donn�es.
		// Ce sont en fait des objets qui fonctionnent comme les tableaux que
		// nous avons vus pr�c�demment,
		// ils contiennent les colonnes et lignes qui ont �t� renvoy�es par la
		// requ�te.
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

		// Les curseurs sont des objets qui contiennent les r�sultats d'une
		// recherche dans une base de donn�es.
		// Ce sont en fait des objets qui fonctionnent comme les tableaux que
		// nous avons vus pr�c�demment,
		// ils contiennent les colonnes et lignes qui ont �t� renvoy�es par la
		// requ�te.
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

		// Les curseurs sont des objets qui contiennent les r�sultats d'une
		// recherche dans une base de donn�es.
		// Ce sont en fait des objets qui fonctionnent comme les tableaux que
		// nous avons vus pr�c�demment,
		// ils contiennent les colonnes et lignes qui ont �t� renvoy�es par la
		// requ�te.
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
