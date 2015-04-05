package com.taku.kobayashi.refarorsample;

import java.util.ArrayList;
import java.util.Set;

import android.app.Notification;
import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

public class ReferrerReceiver extends BroadcastReceiver {
	private final String TAG = "AndroidDeepLinkAndRefererSample";

	@Override
	public void onReceive(Context context, Intent intent) {
	    Log.d(TAG, "receieve");
	    Log.d(TAG, intent.getPackage() + " " +intent.getAction() + " " + intent.getType());
		Bundle bundle = intent.getExtras();
	    for (String key : bundle.keySet()) {
	      Log.d(TAG, key + ":" + bundle.get(key).toString());
	    }

		String referrer = intent.getStringExtra("referrer");
		sendNotification(context, referrer);
	}

	private void sendNotification(Context context, String message) {
		Notification.Builder builder = new Notification.Builder(context.getApplicationContext());
		builder.setTicker(context.getString(R.string.referer_ticker));
		builder.setContentTitle(context.getString(R.string.referer_title));
		builder.setContentText(message);
		builder.setSmallIcon(android.R.drawable.ic_dialog_info);
		Notification notification = builder.build();
		 
		NotificationManager manager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
		manager.notify(0, notification);
	}
}
