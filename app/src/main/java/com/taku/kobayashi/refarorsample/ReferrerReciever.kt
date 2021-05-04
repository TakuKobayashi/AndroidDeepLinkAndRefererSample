package com.taku.kobayashi.refarorsample

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import io.karn.notify.Notify

class ReferrerReciever : BroadcastReceiver() {
    private val TAG = "DeeplinkAndReferrer"

    // Referrerを受け取るとここが呼ばれる
    override fun onReceive(context: Context, intent: Intent) {
        val messagesList = ArrayList<String>()
        messagesList.add("onReceiveIntent")
        //どんなものを受け取ったかわかるようにKeyとValueの値の一覧をLogに吐き出す。
        val bundle = intent.extras
        if(bundle != null){
            for (key in bundle.keySet()) {
                val kvm = key + ":" + bundle.get(key).toString()
                messagesList.add(kvm)
                Log.d(TAG, kvm)
            }
        }

        messagesList.add("")
        messagesList.add("referrerMessage")
        // Referrerを取得
        val referrer = intent.getStringExtra("referrer")
        messagesList.add(referrer.toString())
        sendNotification(context, messagesList.joinToString("\n"))
    }

    // 受け取ったReferrerをNotificationとして通知する処理
    private fun sendNotification(context: Context, message: String) {
        Notify.with(context).content {
            title = context.getString(R.string.referer_title)
            text = message
        }.show()
    }
}
