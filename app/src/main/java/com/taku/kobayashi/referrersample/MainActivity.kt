package com.taku.kobayashi.referrersample

import android.app.Activity
import android.content.DialogInterface
import android.content.Intent
import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AlertDialog
import com.google.android.play.core.review.ReviewManagerFactory

class MainActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val messagesList = ArrayList<String>()
        // ディープリンクから起動されたことを取得する
        val intent = intent
        val action = intent.action
        if (Intent.ACTION_VIEW == action) {
            // 呼び出されたディープリンクのURLを取得する
            val uri = intent.data
            messagesList.add("url:${uri.toString()}")
            if(uri != null){
                messagesList.add(getString(R.string.deeplink_received_params))
                // URLの中に含まれているパラメータ(URLクエリ)の情報を取得して表示する
                val urlQuery = uri.query
                messagesList.add("urlQuery:$urlQuery")
                for (name in uri.queryParameterNames) {
                    messagesList.add(name + ":" + uri.getQueryParameter(name))
                }
                showStoreReview()
            }
        }else{
            // ディープリンクで起動された場合じゃない時はこのデフォルトの文言が使われる
            messagesList.add(getString(R.string.standard_message))
        }
        val textView = findViewById<TextView>(R.id.RecievedParams)
        textView.text = messagesList.joinToString("\n")
    }

    private fun showStoreReview(){
        val reviewMessagesList = ArrayList<String>()
        reviewMessagesList.add("ReviewRequest")
        val manager = ReviewManagerFactory.create(this)
        val request = manager.requestReviewFlow()
        request.addOnCompleteListener { task ->
            reviewMessagesList.add("requestReviewFlow")
            reviewMessagesList.add(arrayOf("isComplete", task.isComplete.toString(), "isSuccessful", task.isSuccessful.toString()).joinToString(":"))
            if (task.isSuccessful) {
                val reviewInfo = task.result
                reviewMessagesList.add("requestReviewFlowResult:${reviewInfo.toString()}")
                reviewMessagesList.add("describeContents:${reviewInfo.describeContents()}")
                val flow = manager.launchReviewFlow(this, reviewInfo)
                flow.addOnCompleteListener {
                    reviewMessagesList.add("launchReviewFlow:${reviewInfo.toString()}")
                    reviewMessagesList.add(arrayOf("isComplete", flow.isComplete.toString(), "isSuccessful", flow.isSuccessful.toString()).joinToString(":"))
                    reviewMessagesList.add(arrayOf("flowResult", flow.result).joinToString(":"))
                    showAlertDialog("StoreReview Result Success", reviewMessagesList.joinToString("\n"))
                }
            } else {
                val exception = task.exception
                reviewMessagesList.add("message:" + exception?.message)
                reviewMessagesList.add("localizedMessage:" + exception?.localizedMessage)
                reviewMessagesList.add("stackTraceToString:" + exception?.stackTraceToString())
                showAlertDialog("StoreReview Result Error", reviewMessagesList.joinToString("\n"))
            }
        }
    }

    private fun showAlertDialog(title: String, message: String = "", onClick: DialogInterface.OnClickListener? = null){
        AlertDialog.Builder(this) // FragmentではActivityを取得して生成
                .setTitle(title)
                .setMessage(message)
                .setPositiveButton("OK", onClick)
                .show()
    }
}
