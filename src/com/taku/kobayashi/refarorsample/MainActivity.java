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

		// ディープリンクで起動された場合じゃない時はこのデフォルトの文言が使われる
		String message = getString(R.string.standard_message);

		// ディープリンクから起動されたことを取得する
		Intent intent = getIntent();
		String action = intent.getAction();
		if (Intent.ACTION_VIEW.equals(action)){
			// 呼び出されたディープリンクのURLを取得する
			Uri uri = intent.getData();
			message = getString(R.string.deeplink_received_params);
			// URLの中に含まれているパラメータ(URLクエリ)の情報を取得して表示する
			for(String name : uri.getQueryParameterNames()){
				message += name + ":" + uri.getQueryParameter(name) + "\n";
			}
		}
		TextView text = (TextView) findViewById(R.id.RecievedParams);
		text.setText(message);
	}
}
