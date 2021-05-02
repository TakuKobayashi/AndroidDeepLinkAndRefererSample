# Androidでのディープリンクとリファラ

本プロジェクトはAndroidにおける、ディープリンクとリファラを取得するためのサンプルを記述したプロジェクトである。
なおアプリは以下のURLにてGoogle Playで公開されている。
[ReferrerSample](https://play.google.com/store/apps/details?id=com.taku.kobayashi.refarorsample)

## 説明

### ディープリンクとは?

* [ディープリンク](https://ja.wikipedia.org/wiki/%E3%83%87%E3%82%A3%E3%83%BC%E3%83%97%E3%83%AA%E3%83%B3%E3%82%AF)
  * スマートフォンにおけるディープリックとはつまり **アクセスすると、端末の中に入っているアプリが起動するリンク** のことをディープリンクという
  * 別称:**URLスキーマ**
  * 参考

### リファラとは?

* [リファラ](http://ja.wikipedia.org/wiki/HTTP%E3%83%AA%E3%83%95%E3%82%A1%E3%83%A9)
  * つまりAndroidでは **Google Playからインストールする時にInstall Referrerというパラメータを持たせることによって、そのパラメータをアプリ内で取得できるようにする機能** のこと
  この持たせるパラメータによって、例えばどこから(どのサイト、どの媒体)インストールされたかといった情報を取得する事ができるようになる。
  * なお同様のことをiOSで実現しようとした場合、iOS の広告識別子である Identification For Advertisers（IDFA）を使用して Web プロモーションの広告効果を計測することが一般的。(具体的な手法としては初回にブラウザが起動したりすること)
  * 参考
    * [ASIdentifierManager](https://developer.apple.com/documentation/adsupport/asidentifiermanager)

## 実装方法

本プロジェクト内のソースコードを参照のため省略

## 検証方法

<span style="color: #FF0000;">**※以下の検証は実機のAndroid端末にて検証を行ってください。**</span>

### ディープリンク

本アプリの場合、Androidのブラウザにて[こちら](referrersample://thisissample) にアクセスするとアプリがインストールされていれば、アプリが起動する。
リンクに使用したURLは以下の通り。

```
referrersample://thisissample
```

なお、アプリ内にパラメータを送る事もできる。送り方はURLのクエリと同様で以下のようなものになる。

```
referrersample://thisissample?test=hogehoge
```

この場合testというキーでhogehogeという値のパラメータがアプリに送られることとなる。

### リファラ

<span style="color: #FF0000;">**※ Google Playストアアプリがインストールされている、Android端末にてアクセスしてください**</span>

* リンクの形式では

```
http://play.google.com/store/apps/details?id=[アプリケーションID]&referrer=[パラメータ]
```

または

```
market://details?id=[アプリケーションID]&referrer=[パラメータ]
```

<span style="color: #FF0000;">**※ ブラウザから起動してアプリをインストールしても、リファラは取得できない。そのため、確実に取得したい場合は下の方のリンク(market://details?id=[アプリケーションID]&referrer=[パラメータ])を使用すべし。**</span>

* 本アプリでの場合

```
http://play.google.com/store/apps/details?id=com.taku.kobayashi.refarorsample&referrer=text
```

または

```
market://details?id=com.taku.kobayashi.refarorsample&referrer=text
```

この場合、リンク先からインストールしたら、textという値がアプリをインストールした時に取得できる。

* 参考