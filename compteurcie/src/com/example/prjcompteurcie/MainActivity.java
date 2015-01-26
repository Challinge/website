package com.example.prjcompteurcie;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.widget.ProgressBar;

public class MainActivity extends Activity {

	private Handler mHandler = new Handler();

	private ProgressBar mProgress;
	private int mProgressStatus = 0;

	private int mProgression = 0;

	private FileOutputStream output = null;
	private File mFileUser = null;
	private File mFileMdp = null;
	private String userName = "test";
	private String userPass = "test";
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		mProgress = (ProgressBar) findViewById(R.id.progressBarSplahScreen);

		// On crée un fichier qui correspond à l'emplacement extérieur
		mFileUser = new File(Environment.getExternalStorageDirectory().getPath()
				+ "/android/" + "user.txt");
		// On crée un fichier qui correspond à l'emplacement extérieur
		mFileMdp = new File(Environment.getExternalStorageDirectory().getPath()
						+ "/android/" + "mdp.txt");

		new Thread(new Runnable() {
			public void run() {
				while (mProgressStatus < 50) {
					mProgressStatus = doWork();
					try {
						Thread.sleep(100);
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					// Update the progress bar
					mHandler.post(new Runnable() {
						public void run() {
							mProgress.setProgress(mProgressStatus);
						}
					});
				}
				// Le fichier a été téléchargé
				if (mProgression >= 50) {
					runOnUiThread(new Runnable() {
						@Override
						public void run() {
							// Si le fichier est lisible et qu'on peut écrire dedans
							if (Environment.MEDIA_MOUNTED.equals(Environment
									.getExternalStorageState())
									&& !Environment.MEDIA_MOUNTED_READ_ONLY
											.equals(Environment
													.getExternalStorageState())) {
								
								
								//hashage de User.
								MessageDigest md = null;
								try {
									md = MessageDigest.getInstance("SHA-512");
								} catch (NoSuchAlgorithmException e1) {
									// TODO Auto-generated catch block
									e1.printStackTrace();
								}
								
								try {
									md.update(userName.getBytes("UTF-8"));
								} catch (UnsupportedEncodingException e1) {
									// TODO Auto-generated catch block
									e1.printStackTrace();
								} // Change this to "UTF-16" if needed
								byte[] digest = md.digest();
								
								//convert the byte to hex format method 1
						        StringBuffer sb = new StringBuffer();
						        for (int i = 0; i < digest.length; i++) {
						          sb.append(Integer.toString((digest[i] & 0xff) + 0x100, 16).substring(1));
						        }
								
								// On crée un nouveau fichier. Si le fichier existe
								// déjà, il ne sera pas créé
								try {
									mFileUser.createNewFile();
								} catch (IOException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								}
								try {
									output = new FileOutputStream(mFileUser);
								} catch (FileNotFoundException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								}
								try {
									output.write(sb.toString().getBytes());
								} catch (IOException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								}
								if (output != null) {
									try {
										output.close();
									} catch (IOException e) {
										// TODO Auto-generated catch block
										e.printStackTrace();
									}
									
								}
							}
							// Si le fichier est lisible et qu'on peut écrire dedans
							if (Environment.MEDIA_MOUNTED.equals(Environment
									.getExternalStorageState())
									&& !Environment.MEDIA_MOUNTED_READ_ONLY
											.equals(Environment
													.getExternalStorageState())) {
								
								//hashage de Mot de passe.
								MessageDigest md = null;
								try {
									md = MessageDigest.getInstance("SHA-512");
								} catch (NoSuchAlgorithmException e1) {
									// TODO Auto-generated catch block
									e1.printStackTrace();
								}
								
								try {
									md.update(userPass.getBytes("UTF-8"));
								} catch (UnsupportedEncodingException e1) {
									// TODO Auto-generated catch block
									e1.printStackTrace();
								} // Change this to "UTF-16" if needed
								byte[] digest = md.digest();
								
								//convert the byte to hex format method 1
						        StringBuffer sb = new StringBuffer();
						        for (int i = 0; i < digest.length; i++) {
						          sb.append(Integer.toString((digest[i] & 0xff) + 0x100, 16).substring(1));
						        }
						        
						        
								// On crée un nouveau fichier. Si le fichier existe
								// déjà, il ne sera pas créé
								try {
									mFileMdp.createNewFile();
								} catch (IOException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								}
								try {
									output = new FileOutputStream(mFileMdp);
								} catch (FileNotFoundException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								}
								try {
									output.write(sb.toString().getBytes());
								} catch (IOException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								}
								if (output != null) {
									try {
										output.close();
									} catch (IOException e) {
										// TODO Auto-generated catch block
										e.printStackTrace();
									}
									
								}
							}
							// Le premier paramètre est le nom de l'activité
							// actuelle
							// Le second est le nom de l'activité de destination
							Intent activiteConnexion = new Intent(
									MainActivity.this, IntentConnexion.class);

							// Puis on lance l'intent !
							startActivity(activiteConnexion);
						}
					});

				}
			}
		}).start();

	}

	// Simulation du chargement.
	public int doWork() {
		if (mProgression <= 50) {
			mProgression++;
			return mProgression;
		}
		return 50;
	}

}
