
# Book Tracker (AIDD Training)

AIエージェント **AntiGravity (AG)** を活用した、AI駆動開発（AIDD）の習得と検証を目的としたプロジェクト。

## 🎯 研修の目的

* **AI駆動開発の実践**: AIエージェントとの対話による設計・実装・テストの自動化。
* **最新技術の習得**: Next.js 16 / Tailwind CSS 4 等の最新スタックの迅速な実装。
* **環境構築スキルの向上**: Docker (Dev Containers) 環境下でのトラブルシューティング。

## 🛠 技術スタック

* **Framework**: Next.js 16 (App Router)
* **Styling**: Tailwind CSS 4 / Framer Motion
* **State**: Zustand (Persistence)
* **Testing**: Vitest
* **Environment**: Docker / AntiGravity (AI Agent)

## 🚀 AIDDプロセスの要点

1. **自律実装**: 自然言語の指示から、AGによるディレクトリ構造の構築、コンポーネント実装、依存関係の解決までを自動化。
2. **型安全と検証**: AGによる TypeScript 型エラーの自己修復、および `npm run build` によるビルドチェックの完遂。
3. **効率的なデバッグ**: Docker環境特有の権限問題（Permission Denied）等を、AIとの対話によって論理的に解消。

## 📝 主な実装機能

* **Dashboard**: Rechartsを用いた読書データの統計可視化。
* **Book Management**: 無限スクロール、リアルタイム検索、CRUD操作。
* **Persistence**: LocalStorage を利用したデータの永続化。
* **Validation**: Zod を用いた厳格なフォームバリデーション。
