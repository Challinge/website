package com.example.prjcompteurcie;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;

/*
 *  Comme les opérations de la classe MetierDAO se déroulent sur la base, nous avons besoin d'un accès à la base.
 *  il suffit de construire une instance de votre SQLiteOpenHelper avec le constructeur SQLiteOpenHelper
 *  (Context context, String name, SQLiteDatabase.CursorFactory factory, int version), où name est le nom de la base, 
 *  factory est un paramètre qu'on va oublier pour l'instant — qui accepte très bien les null — et version la version 
 *  voulue de la base de données.
 * */

public abstract class DAOBase {
	// Nous sommes à la première version de la base
	// Si je décide de la mettre à jour, il faudra changer cet attribut
	protected final static int VERSION = 17;
	// Le nom du fichier qui représente ma base
	protected final static String NOM = "compteur.db";
	protected SQLiteDatabase mDb = null;
	protected DatabaseHandler mHandler = null; // Pour accéder à la base.

	public DAOBase(Context pContext) {
		this.mHandler = new DatabaseHandler(pContext, NOM, null, VERSION);
		
	}

	public SQLiteDatabase open() {
		// Pas besoin de fermer la dernière base puisque getWritableDatabase
		// s'en charge
		mDb = mHandler.getWritableDatabase();
		return mDb;
	}

	public void close() {
		mDb.close();
	}

	public SQLiteDatabase getDb() {
		return mDb;
	}
}