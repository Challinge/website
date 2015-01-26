package com.example.prjcompteurcie;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteDatabase.CursorFactory;
import android.database.sqlite.SQLiteOpenHelper;

/*
 * La cr�ation d'une base de donn�es en tant que collection d'un ensemble d'informations, se fait avec SQLiteOpenHelper. 
 * La solution la plus �vidente est d'utiliser une classe qui nous aidera � ma�triser toutes les relations 
 * avec la base de donn�es. Cette classe d�rivera de SQLiteOpenHelper. Au moment de la cr�ation de la base de donn�es, 
 * la m�thode de callback void onCreate(SQLiteDatabase db) est automatiquement appel�e, avec le param�tre db qui 
 * repr�sentera la base. C'est dans cette m�thode que vous devrez lancer les instructions pour cr�er les diff�rentes 
 * tables et �ventuellement les remplir avec des donn�es initiales.
 * */
public class DatabaseHandler extends SQLiteOpenHelper {
	
	/*
	 * Une pratique courante avec la manipulation des bases de donn�es est d'enregistrer les attributs, tables 
	 * et requ�tes dans des constantes de fa�on � les retrouver et les modifier plus facilement. Tous ces attributs 
	 * sont public puisqu'il est possible qu'on manipule la base en dehors de cette classe.
	 * */
	/*********DECLARATION DE LA TABLE ZONE***********/
	public static final String ZONE_TABLE_NAME = "zone";
	public static final String ZONE_KEYZONE = "idzone";
	public static final String ZONE_LIBELLEZONE = "libellezone";
	public static final String ZONE_TRAITE = "traite";
	public static final String ZONE_TOTAL = "total";
	public static final String ZONE_RECU = "recu";

	public static final String ZONE_TABLE_CREATE = "CREATE TABLE " + ZONE_TABLE_NAME
			+ " (" + ZONE_KEYZONE + " INTEGER PRIMARY KEY AUTOINCREMENT, " + ZONE_LIBELLEZONE
			+ " TEXT, " + ZONE_TRAITE
			+ " INTEGER, " + ZONE_TOTAL + " INTEGER," + ZONE_RECU + " VARCHAR(3));";
	public static final String ZONE_TABLE_DROP = "DROP TABLE IF EXISTS " + ZONE_TABLE_NAME + ";";
	
	/*********DECLARATION DE LA TABLE COMPTEUR***********/
	public static final String COMPTEUR_TABLE_NAME = "compteur";
	public static final String COMPTEUR_KEYCOMPTEUR = "idcompteur";
	public static final String COMPTEUR_NUMCOMPTEUR = "numcompteur";
	public static final String COMPTEUR_ANINDEX = "ancienindex";
	public static final String COMPTEUR_NOINDEX = "nouvelindex";
	public static final String COMPTEUR_RELEVE = "cptreleve";
	public static final String COMPTEUR_RECU = "recu";
	public static final String COMPTEUR_DATEREL = "datereleve";
	public static final String COMPTEUR_SCDKEYZONE = "idzone";

	public static final String COMPTEUR_TABLE_CREATE = "CREATE TABLE " + COMPTEUR_TABLE_NAME
			+ " (" + COMPTEUR_KEYCOMPTEUR + " INTEGER PRIMARY KEY, " + COMPTEUR_NUMCOMPTEUR
			+ " TEXT, " + COMPTEUR_ANINDEX + " INTEGER, " + COMPTEUR_NOINDEX + " INTEGER, "
			+ COMPTEUR_RELEVE + " VARCHAR(3), " + COMPTEUR_RECU + " VARCHAR(3), " 
			+ COMPTEUR_DATEREL + " VARCHAR(10), " + COMPTEUR_SCDKEYZONE + " INTEGER);";
	
	public static final String COMPTEUR_TABLE_DROP = "DROP TABLE IF EXISTS " + COMPTEUR_TABLE_NAME + ";";

	public DatabaseHandler(Context context, String name, CursorFactory factory,
			int version) {
		super(context, name, factory, version);
	}

	//Au moment de l'instanciation de cette classe � partir de la classe DAOBase,
	//la m�thode de callback void onCreate(SQLiteDatabase db) est automatiquement appel�e.
	@Override
	public void onCreate(SQLiteDatabase db) {
		db.execSQL(ZONE_TABLE_CREATE);
		db.execSQL(COMPTEUR_TABLE_CREATE);
	}

	//Au cas o�, la base de donn�es est une version sup�rieure � l'ancienne pour son utlisation dans l'application.
	@Override
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
		db.execSQL(ZONE_TABLE_DROP);
		db.execSQL(COMPTEUR_TABLE_DROP);
		onCreate(db);

	}
}
