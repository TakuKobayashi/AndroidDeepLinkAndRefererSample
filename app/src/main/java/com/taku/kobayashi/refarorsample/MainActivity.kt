package com.taku.kobayashi.refarorsample

import android.app.Activity
import android.content.DialogInterface
import android.content.Intent
import android.os.Bundle
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import com.android.installreferrer.api.InstallReferrerClient
import com.android.installreferrer.api.InstallReferrerStateListener
import com.android.installreferrer.api.ReferrerDetails
import com.google.android.play.core.review.ReviewManagerFactory

class MainActivity : Activity() {
    private var renderTextViewMessage: String = ""

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
        renderTextViewMessage = renderTextView(messagesList.joinToString("\n"))
        startInstallReferrerService()
    }

    private fun renderTextView(message: String): String {
        val textView = findViewById<TextView>(R.id.RecievedParams)
        textView.text = message
        return textView.text.toString()
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
                    showToast(reviewMessagesList.joinToString("\n"))
                }
            } else {
                val exception = task.exception
                reviewMessagesList.add("message:" + exception?.message)
                reviewMessagesList.add("localizedMessage:" + exception?.localizedMessage)
                reviewMessagesList.add("stackTraceToString:" + exception?.stackTraceToString())
                showToast(reviewMessagesList.joinToString("\n"))
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

    private fun showToast(message: String = ""){
        Toast.makeText(this.applicationContext, message, Toast.LENGTH_LONG).show()
    }

    private fun startInstallReferrerService(){
        val referrerClient = InstallReferrerClient.newBuilder(this).build()
        referrerClient.startConnection(object : InstallReferrerStateListener {
            override fun onInstallReferrerSetupFinished(responseCode: Int) {
                when (responseCode) {
                    InstallReferrerClient.InstallReferrerResponse.OK -> {
                        // Connection established.
                        showInstallReferrer(referrerClient)
                    }
                    InstallReferrerClient.InstallReferrerResponse.FEATURE_NOT_SUPPORTED -> {
                        // API not available on the current Play Store app.
                        showToast("API not available on the current Play Store app.")
                    }
                    InstallReferrerClient.InstallReferrerResponse.SERVICE_UNAVAILABLE -> {
                        // Connection couldn't be established.
                        showToast("service unavailable.")
                    }
                    InstallReferrerClient.InstallReferrerResponse.PERMISSION_ERROR -> {
                        // Connection couldn't be established.
                        showToast("permission error")
                    }
                    InstallReferrerClient.InstallReferrerResponse.SERVICE_DISCONNECTED -> {
                        // Connection couldn't be established.
                        showToast("service disconnected")
                    }
                    InstallReferrerClient.InstallReferrerResponse.DEVELOPER_ERROR -> {
                        // Connection couldn't be established.
                        showToast("developer error")
                    }
                }
                referrerClient.endConnection()
            }

            override fun onInstallReferrerServiceDisconnected() {
                // Try to restart the connection on the next request to
                // Google Play by calling the startConnection() method.
                showToast("InstallReferrerServiceDisconnected")
            }
        })
    }

    private fun showInstallReferrer(referrerClient: InstallReferrerClient){
        val response: ReferrerDetails = referrerClient.installReferrer
        val referrerUrl: String = response.installReferrer
        val referrerClickTime: Long = response.referrerClickTimestampSeconds
        val appInstallTime: Long = response.installBeginTimestampSeconds
        val instantExperienceLaunched: Boolean = response.googlePlayInstantParam
        val installBeginTimestampServerSeconds: Long = response.installBeginTimestampServerSeconds
        val referrerClickTimestampServerSeconds: Long = response.referrerClickTimestampServerSeconds
        val installVersion: String = response.installVersion

        val referrerMessagesList = ArrayList<String>()
        referrerMessagesList.add(renderTextViewMessage)
        referrerMessagesList.add("referrerUrl:$referrerUrl")
        referrerMessagesList.add("referrerClickTime:$referrerClickTime")
        referrerMessagesList.add("appInstallTime:$appInstallTime")
        referrerMessagesList.add("instantExperienceLaunched:$instantExperienceLaunched")
        referrerMessagesList.add("installBeginTimestampServerSeconds:$installBeginTimestampServerSeconds")
        referrerMessagesList.add("referrerClickTimestampServerSeconds:$referrerClickTimestampServerSeconds")
        referrerMessagesList.add("installVersion:$installVersion")
        showToast(referrerMessagesList.joinToString("\n"))
        if(!isFinishing){
            runOnUiThread {
                renderTextView(referrerMessagesList.joinToString("\n"))
            }
        }
    }
}
