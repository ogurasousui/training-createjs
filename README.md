# training-createjs

https://ogurasousui.github.io/training-createjs/

## セットアップ

```
npm update
typings update
```

### docker

```
cd docker
docker build -t app .
```
appの箇所は好きな名前でいいです

起動
```
docker run --name app -e "TZ=Asia/Tokyo" -d -i -v /xxx/training-createjs/docs:/var/www/html -p 80:80 -t app:latest
```
xxxは自分のtraining-createjsまでのパス
--nameは好きな名前で。app:latestもbuild時に名前変えているならそれにする

確認
http://localhostにアクセス



## タスク

ビルド

```gulp webpack```

watch

```gulp watch```

## その他

ローカルでも見ることはできるが、crossoriginの関係上、画像のフィルタが効かない
正しいものを確認したい場合はdockerでやったほうが良い

typingsをインストールする場合の例
```
typings install --save dt~box2d --global
```