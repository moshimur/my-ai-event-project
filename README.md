# 初心者のためのAI用語辞書

AI（人工知能）に関する基本的な用語をわかりやすく解説するWebアプリケーションです。AI初心者でも理解しやすいように、各用語を丁寧に説明しています。

## デモ

https://moshimur.github.io/my-ai-event-project/

## 主な機能

### 1. AI用語の検索機能
- Wikipedia APIを使用して、ユーザーが入力したAI用語を検索
- 検索結果を初心者向けにわかりやすく整形して表示
- 重要な専門用語を自動的に強調表示
- 画像やリンクを含む見やすいカード形式で表示

### 2. よく検索される用語の解説
アコーディオン形式で以下の15項目のAI用語を詳しく解説：
- AI（人工知能）
- 機械学習（Machine Learning）
- ディープラーニング（Deep Learning）
- LLM（大規模言語モデル）
- プロンプト（Prompt）
- トークン（Token）
- RAG（検索拡張生成）
- ファインチューニング（Fine-tuning）
- エンベディング（Embedding）
- Transformer（トランスフォーマー）
- ハルシネーション（幻覚・Hallucination）
- Few-shot学習（フューショット学習）
- ゼロショット学習（Zero-shot学習）
- 教師あり学習（Supervised Learning）
- 教師なし学習（Unsupervised Learning）

### 3. アクセシビリティ対応
- キーボード操作に対応（Enter/Spaceキーでアコーディオンの開閉）
- スクリーンリーダー対応（ARIA属性の実装）
- レスポンシブデザインで様々なデバイスに対応

## 技術スタック

- **HTML5**: セマンティックなマークアップ
- **CSS3**: モダンなスタイリングとアニメーション
- **JavaScript (ES6+)**: Vanilla JSで実装
- **Wikipedia REST API**: 用語情報の取得
- **Wikipedia OpenSearch API**: 検索候補の取得

## プロジェクト構成

```
my-ai-event-project/
├── index.html      # メインHTMLファイル
├── style.css       # スタイルシート
├── script.js       # JavaScriptファイル（アコーディオン機能、Wikipedia検索機能）
└── README.md       # このファイル
```

## 使い方

### ローカルで動かす場合

1. リポジトリをクローン
```bash
git clone https://github.com/moshimur/my-ai-event-project.git
cd my-ai-event-project
```

2. ブラウザで `index.html` を開く
```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

### GitHub Pagesで公開する場合

1. GitHubリポジトリの Settings > Pages に移動
2. Source を `main` ブランチに設定
3. 数分後に https://[ユーザー名].github.io/my-ai-event-project/ でアクセス可能

## 特徴

- **外部ライブラリ不要**: Vanilla JavaScriptで実装されており、依存関係がありません
- **高速**: 軽量な設計で素早く動作します
- **教育的**: 各用語に具体例や活用例を含め、理解しやすい構成
- **インタラクティブ**: アコーディオン機能とリアルタイム検索で使いやすいUI

## ブラウザ対応

- Chrome（推奨）
- Firefox
- Safari
- Edge

## ライセンス

このプロジェクトはオープンソースです。

## 貢献

バグ報告や機能提案は、Issuesまでお願いします。

---

このAI用語辞書が、AIを学び始める方々の助けになれば幸いです。
