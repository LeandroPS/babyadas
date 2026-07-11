# Babyadas — Placar

Placar remoto para a competição Babyadas (chá de bebê).

## URLs

| Rota | Uso |
|------|-----|
| `/` | **Display** — TV/projetor (placar + logo + confetes com `W`) |
| `/control` | **Controle remoto** — celular para atualizar o placar |

## Desenvolvimento local

```bash
cp .env.example .env   # preencha com as credenciais Firebase
npm install
npm run dev
```

## Firebase — Realtime Database

1. No [Firebase Console](https://console.firebase.google.com) → projeto **babyadas**
2. **Build → Realtime Database → Create Database**
3. Copie a **Database URL** (ex.: `https://babyadas-default-rtdb.firebaseio.com`) para `VITE_FIREBASE_DATABASE_URL` no `.env`
4. Em **Rules**, publique as regras de `database.rules.json`:

```json
{
  "rules": {
    "score": {
      ".read": true,
      ".write": true
    },
    "celebrate": {
      ".read": true,
      ".write": true
    }
  }
}
```

> Para um evento privado, compartilhe só o link `/control`. As regras acima permitem leitura/escrita pública — suficiente para um chá de bebê; adicione auth ou PIN depois se quiser restringir.

### Estrutura dos dados

```json
{
  "score": {
    "left": 0,
    "right": 0,
    "updatedAt": 1718123456789
  },
  "celebrate": {
    "active": false
  }
}
```

## Deploy na Netlify

1. Conecte o repositório Git
2. **Site settings → Environment variables** — adicione todas as variáveis `VITE_*` do `.env.example`
3. Deploy (build: `npm run build`, publish: `dist`)

O `netlify.toml` já inclui redirect SPA para `/control` funcionar.

## Variáveis de ambiente

| Variável | Descrição |
|----------|-----------|
| `VITE_FIREBASE_API_KEY` | Web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | `babyadas.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `babyadas` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Sender ID |
| `VITE_FIREBASE_APP_ID` | App ID |
| `VITE_FIREBASE_DATABASE_URL` | URL do Realtime Database |
