# Docker deployment

The web app is built as a multi-stage image and runs from Next.js standalone output. PostgreSQL uses the `pgvector` image because the schema declares that extension.

## Files

- `web/Dockerfile` — `deps`, `builder`, `migrator`, and `runner` targets.
- `docker-compose.yml` — PostgreSQL, a one-shot migration job, and the app.
- `.env.docker.example` — copy to `.env` and edit before starting.

## Run

```bash
cp .env.docker.example .env
docker compose build
docker compose up -d
docker compose ps
curl -f http://localhost:3000/api/health
```

`/api/health` runs `SELECT 1` and returns `200` with `{"status":"ok"}` or `503` when the database is unreachable. The image `HEALTHCHECK` uses the same endpoint.

Migrations run in the `migrate` service with `prisma migrate deploy`; `web` starts only after that job succeeds. The runtime image does not include the Prisma CLI.

Rebuild after code changes:

```bash
docker compose up -d --build
```

Stop and keep data:

```bash
docker compose down
```

Remove the database volume as well (destructive):

```bash
docker compose down -v
```

## Production requirements

The container runs with `NODE_ENV=production`, so two integrations are mandatory in practice:

- **Image storage**: local disk storage is disabled in production. Without `STORAGE_UPLOAD_ENDPOINT`, item image uploads fail. Mounting a volume over `public/uploads` does not change this behaviour.
- **SMS**: without `SMS_PROVIDER_ENDPOINT` and `SMS_PROVIDER_TOKEN`, OTP login fails because codes are only returned in development.

Because uploads are served from the app's own `public/` directory only in development, production deployments should place uploaded files behind the remote storage/CDN endpoint.

## Notes and limits

- The Dockerfile is not built in this workspace: Docker is unavailable and heavy builds are disallowed here. The image build is validated by the `docker` CI job.
- The app does not set `HOSTNAME` per environment; the container binds `0.0.0.0:3000` and exposes that port.
- Reverse proxy, TLS, backups, and log shipping are outside this compose file.
