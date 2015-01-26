package com.example.prjcompteurcie;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;

/*
 *  Comme les op�rations de la classe MetierDAO se d�roulent sur la base, nous avons besoin d'un acc�s � la base.
 *  il suffit de construire une instance de votre SQLiteOpenHelper avec le constructeur SQLiteOpenHelper
 *  (Context context, String name, SQLiteDatabase.CursorFactory factory, int version), o� name est le nom de la base, 
 *  factory est un param�tre qu'on va oublier pour l'instant � qui accepte tr�s bien les null � et version la version 
 *  voulue de la base de donn�es.
 * */

public abstract class DAOBase {
	// Nous sommes � la premi�re version de la base
	// Si je d�cide de la mettre � jour, il faudra changer cet attribut
	protected final static int VERSION = 17;
	// Le nom du fichier qui repr�sente ma base
	protected final static String NOM = "compteur.db";
	protected SQLiteDatabase mDb = null;
	protected DatabaseHandler mHandler = null; // Pour acc�der � la base.

	public DAOBase(Context pContext) {
		this.mHandler = new DatabaseHandler(pContext, NOM, null, VERSION);
		
	}

	public SQLiteDatabase open() {
		// Pas besoin de fermer la derni�re base puisque getWritableDatabase
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