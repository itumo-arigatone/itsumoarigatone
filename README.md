## Getting Started

First, run the development server:
```sh
docker compose up

# DBのマイグレーション
docker compose run --rm app npm run db_migrate
```

`.env`ファイルは管理者が管理
なんなら、開発では自力で作れると思う。

権限不足で保存できないとき
```bash
sudo chown -R username ./ 
```
