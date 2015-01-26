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

		// On cr�e un fichier qui correspond � l'emplacement ext�rieur
		mFileUser = new File(Environment.getExternalStorageDirectory().getPath()
				+ "/android/" + "user.txt");
		// On cr�e un fichier qui correspond � l'emplacement ext�rieur
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
				// Le fichier a �t� t�l�charg�
				if (mProgression >= 50) {
					runOnUiThread(new Runnable() {
						@Override
						public void run() {
							// Si le fichier est lisible et qu'on peut �crire dedans
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
								
								// On cr�e un nouveau fichier. Si le fichier existe
								// d�j�, il ne sera pas cr��
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
							// Si le fichier est lisible et qu'on peut �crire dedans
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
						        
						        
								// On cr�e un nouveau fichier. Si le fichier existe
								// d�j�, il ne sera pas cr��
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
							// Le premier param�tre est le nom de l'activit�
							// actuelle
							// Le second est le nom de l'activit� de destination
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
