# Androidでのディープリンクとリファラ

本プロジェクトはAndroidにおける、ディープリンクとリファラを取得するためのサンプルを記述したプロジェクトである。<br>
なおアプリは以下のURLにてGoogle Playで公開されている。<br>
https://play.google.com/store/apps/details?id=com.taku.kobayashi.refarorsample

説明
----
### ディープリンクとは? ###
 * <a href="http://ja.wikipedia.org/wiki/%E3%83%87%E3%82%A3%E3%83%BC%E3%83%97%E3%83%AA%E3%83%B3%E3%82%AF">ディープリンク</a>
   * スマートフォンにおけるディープリックとはつまり、<b>アクセスすると、端末の中に入っているアプリが起動するリンク</b>のことをディープリンクという
   * 別称:<b>URLスキーマ</b>
   * 参考
     * http://deep-link.jp/2014/08/what-is-deeplink/

### リファラとは? ###
 * <a href="http://ja.wikipedia.org/wiki/HTTP%E3%83%AA%E3%83%95%E3%82%A1%E3%83%A9">リファラ</a>
   * つまり、Androidでは<b>Google Playからインストールする時にInstall Referrerというパラメータを持たせることによって、そのパラメータをアプリ内で取得できるようにする機能</b>のこと<br>この持たせるパラメータによって、例えばどこから(どのサイト、どの媒体)インストールされたかといった情報を取得する事ができるようになる。
   * なお同様のことをiOSで実現しようとした場合、iOS の広告識別子である Identification For Advertisers（IDFA）を使用して Web プロモーションの広告効果を計測することが一般的。(具体的な手法としては初回にブラウザが起動したりすること)
   * 参考
     * http://www.abe3.net/2013/05/google-play-referrer/
     * https://developer.android.com/reference/com/google/android/gms/analytics/CampaignTrackingReceiver.html
     * https://developer.apple.com/library/ios/documentation/AdSupport/Reference/ASIdentifierManager_Ref/index.html

実装方法
----
 本プロジェクト内のソースコードを参照のため省略


検証方法
---
<span style="color: #FF0000;"><b>※以下の検証は実機のAndroid端末にて検証を行ってください。</b></span>

### ディープリンク ###
本アプリの場合、Androidのブラウザにて<a href="referrersample://thisissample">こちら</a>にアクセスするとアプリがインストールされていれば、アプリが起動する。<br>
リンクに使用したURLは以下の通り。

<code><pre>referrersample://thisissample</pre></code>

なお、アプリ内にパラメータを送る事もできる。送り方はURLのクエリと同様で以下のようなものになる。

<code><pre>referrersample://thisissample?test=hogehoge</pre></code>

この場合testというキーでhogehogeという値のパラメータがアプリに送られることとなる。

### リファラ ###
<span style="color: #FF0000;"><b>※ Google Playストアアプリがインストールされている、Android端末にてアクセスしてください</b></span>

 * 形式
   リンクの形式では
   <code><pre>http://play.google.com/store/apps/details?id=[アプリケーションID]&referrer=[パラメータ]</pre></code>
   または
   <code><pre>market://details?id=[アプリケーションID]&referrer=[パラメータ]</pre></code>
   <span style="color: #FF0000;"><b>※ ブラウザから起動してアプリをインストールしても、リファラは取得できない。そのため、確実に取得したい場合は下の方のリンク(market://details?id=[アプリケーションID]&referrer=[パラメータ])を使用すべし。</b></span>
 * 本アプリでの場合
   <code><pre>http://play.google.com/store/apps/details?id=com.taku.kobayashi.refarorsample&referrer=text</pre></code>
   または
   <code><pre>market://details?id=com.taku.kobayashi.refarorsample&referrer=text</pre></code>
   この場合、リンク先からインストールしたら、textという値がアプリをインストールした時に取得できる。
  * 参考
    * http://www.abe3.net/2013/05/google-play-referrer/
