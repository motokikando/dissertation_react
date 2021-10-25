## Research Share
<img width="1394" alt="スクリーンショット 2021-10-08 23 04 28" src="https://user-images.githubusercontent.com/81904192/136570954-5a6e816b-a67e-4a1a-a53a-17547de92c6c.png">



## 概要
大学院で論文を紹介する機会がありゼミやグループで論文を共有・紹介できるサイトが欲しいと思い今回ポートフォリオを作成しました。





## 機能一覧
<img width="881" alt="スクリーンショット 2021-10-08 23 09 16" src="https://user-images.githubusercontent.com/81904192/136571896-07d5e85b-2143-4c44-b593-6f49e0cebdab.png">
<img width="734" alt="スクリーンショット 2021-10-08 23 09 35" src="https://user-images.githubusercontent.com/81904192/136575848-ae4cd339-aac2-47c8-8e46-d69439669916.png">

- ユーザープロフィール(Avatar画像)
- 認証機能（ログイン+新規アカウント)
- 読んだ論文(Dissertation)の作成、閲覧、更新、削除
- 論文(Dissertation)一覧のソーティング
- ログインユーザーによる論文(Dissertation)更新・削除制限




## 使用技術
- TypeScript - 開発言語(フロントエンド)、静的型付け
- React - SPA構築ライブラリ
- React Router Dom - ルーティング
- Redux Toolkit - 状態管理 (Redux簡便化ツール)
- Material-UI - UIデザインツール
- Axios - HTTPクライアント
- Python - 開発言語(バックエンド)
- Django - Webアプリケーションフレームワーク

バックエンドリポジトリ
https://github.com/motokikando/dissertation_api






## 工夫した点
バックエンドはDjangoを用いてAPI構築、フロントエンドではTypeScript、Reactを用いてSPA化を心がけました。機能としては認証機能（ログイン+新規アカウント)、 読んだ論文(Dissertation)の作成、閲覧、更新、削除、論文(Dissertation)一覧のソーティングなどを実装しました。
