# 開発・確認ルール

## ブランチ運用

```
main
 └── develop
      └── feature/XX_task_name
```

1. `develop` ブランチを開発のベースとする
2. 各タスクは `feature/XX_task_name` ブランチを `develop` から切って実装する
3. 実装完了後、人の目で確認してOKなら git commit
4. commit 後、`develop` にマージする
5. マージ後、次のタスクの feature ブランチを切る

## 実装 → 確認 → マージ の流れ

1. `develop` から `feature/XX_task_name` ブランチを作成
2. タスク（`doc/tasks/XX_*.md`）の内容に沿って実装
3. 確認用にデスクトップへコピー（後述）
4. ブラウザで確認してもらう
5. OKなら git commit → `develop` にマージ
6. 修正があれば同じ feature ブランチ上で修正 → 再確認

## 確認用コピー

WSL 上で開発しているため、ブラウザ確認時は Windows デスクトップにコピーする。

```bash
# デスクトップの old-twitter を最新に同期
rm -rf /mnt/c/Users/hatano.takuma/Desktop/old-twitter
cp -r /home/hatano/works/old-twitter /mnt/c/Users/hatano.takuma/Desktop/old-twitter
```

確認タイミング: 各タスクの実装完了後

## タスク管理

- タスク定義: `doc/tasks/XX_task_name.md`
- 番号順に進行（01 → 02 → ... → 13）
- 各タスクファイルにゴール・成果物・完了条件を記載済み
