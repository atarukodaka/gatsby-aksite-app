---
title: Android機からlocalhostへUSB接続で実機テスト
date: 2021-02-28
image: portfowarding.png
---

## やりかた
下手に wifi経由でやろうとするとファイアウォールの設定やらいろいろ面倒なので、素直にusbで繋ぐ。android。

まずデバッグを有効にするアレをしとく。
んで繋いだら chrome://inspect/#devicesにアクセスし、

<div style="max-width: 300px">
<Image filename="portfowarding.png"/>
</div>

"Porf fowarding" で port: 8000, IPaddress and port: localhost:8000 と設定し、Enable port forwarding のチェックを入れる。

<div style="max-width: 300px">
<Image filename="portfowarding2.png"/>
</div>

実機から localhost:8000 にアクセスすれば見られるはず。

## 参考サイト
[Chrome DevToolsを用いて実機のAndroidスマホでデバッグする \| mktia's note](https://blog.mktia.com/how-to-debug-websites-on-android-with-chrome-devtools/)