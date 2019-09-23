package com.taku.kobayashi.refarorsample

import android.app.Notification
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import com.allyants.notifyme.NotifyMe

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
        sendNotification(context, referrer)
    }

    // 受け取ったReferrerをNotificationとして通知する処理
    private fun sendNotification(context: Context, message: String?) {
        val builder = NotifyMe.Builder(context);
        builder.title(context.getString(R.string.referer_title))
        builder.content(message)
        builder.small_icon(android.R.drawable.ic_dialog_info)
        builder.build();
    }
}
