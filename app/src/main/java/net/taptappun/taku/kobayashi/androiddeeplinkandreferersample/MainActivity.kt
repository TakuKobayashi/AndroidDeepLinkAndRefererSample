package net.taptappun.taku.kobayashi.androiddeeplinkandreferersample

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.widget.TextView

class MainActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // ディープリンクで起動された場合じゃない時はこのデフォルトの文言が使われる
        var message = getString(R.string.standard_message)

        // ディープリンクから起動されたことを取得する
        val intent = intent
        val action = intent.action
        if (Intent.ACTION_VIEW == action) {
            // 呼び出されたディープリンクのURLを取得する
            val uri = intent.data
            if(uri != null){
                message = getString(R.string.deeplink_received_params)
                // URLの中に含まれているパラメータ(URLクエリ)の情報を取得して表示する
                val urlQuery = uri.query
                for (name in uri.queryParameterNames) {
                    message += name + ":" + uri.getQueryParameter(name) + "\n"
                }
            }
        }
        val text = findViewById(R.id.RecievedParams) as TextView
        text.text = message
    }
}
