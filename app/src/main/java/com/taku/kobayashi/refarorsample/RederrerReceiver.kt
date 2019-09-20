package com.taku.kobayashi.refarorsample

import android.app.Notification
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log

class ReferrerReceiver : BroadcastReceiver() {
    private val TAG = "DeeplinkAndReferrer"

    // Referrerを受け取るとここが呼ばれる
    override fun onReceive(context: Context, intent: Intent) {
        //どんなものをおけとったかわかるようにKeyとValueの値の一覧をLogに吐き出す。
        val bundle = intent.extras
        if(bundle != null){
            for (key in bundle.keySet()) {
                Log.d(TAG, key + ":" + bundle.get(key).toString())
            }
        }

        // Referrerを取得
        val referrer = intent.getStringExtra("referrer")
        //sendNotification(context, referrer)
    }

    /*
    // 受け取ったReferrerをNotificationとして通知する処理
    private fun sendNotification(context: Context, message: String?) {
        val builder = Notification.Builder(context.applicationContext)
        builder.setTicker(context.getString(R.string.referer_ticker))
        builder.setContentTitle(context.getString(R.string.referer_title))
        builder.setContentText(message)
        builder.setSmallIcon(android.R.drawable.ic_dialog_info)
        val notification = builder.build()

        val manager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        manager.notify(0, notification)
    }
    */
}
