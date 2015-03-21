package com.taku.kobayashi.refarorsample;

import android.app.Notification;
import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class ReferrerReceiver extends BroadcastReceiver {

	@Override
	public void onReceive(Context context, Intent intent) {
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
