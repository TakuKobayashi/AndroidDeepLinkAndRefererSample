package com.taku.kobayashi.refarorsample;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.widget.TextView;

public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		String message = getString(R.string.standard_message);

	    Intent intent = getIntent();
	    String action = intent.getAction();
	    if (Intent.ACTION_VIEW.equals(action)){
	      Uri uri = intent.getData();
		  message = getString(R.string.deeplink_received_params) + uri.toString();
	    }
		TextView text = (TextView) findViewById(R.id.RecievedParams);
		text.setText(message);
	}
}
