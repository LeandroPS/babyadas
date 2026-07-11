# Babyadas — Placar

Placar remoto para a competição Babyadas (chá de bebê). Suporta placares ilimitados — cada um com um ID único na URL.

## URLs

| Rota | Uso |
|------|-----|
| `/` | Criar um novo placar (gera ID aleatório) |
| `/:id` | **Display** — TV/projetor (placar + logo + confetes com `W` + QR code) |
| `/:id/control` | **Controle remoto** — celular para atualizar o placar |

Exemplo: `/a1b2c3d4` e `/a1b2c3d4/control`

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
    "boards": {
      "$id": {
        "score": { ".read": true, ".write": true },
        "celebrate": { "active": { ".read": true, ".write": true } },
        "history": { ".read": true, ".write": true },
        "theme": { ".read": true, ".write": true }
      }
    }
  }
}
```

> Compartilhe só o link `/:id/control` (ou o QR code no display). As regras acima permitem leitura/escrita pública por placar.

### Estrutura dos dados

```json
{
  "boards": {
    "a1b2c3d4": {
      "score": {
        "left": 0,
        "right": 0,
        "updatedAt": 1718123456789
      },
      "celebrate": {
        "active": false
      },
      "history": {
        "pushId1": {
          "left": 3,
          "right": 7,
          "at": 1718123456789,
          "action": "left +1"
        }
      },
      "theme": {
        "leftScoreColor": "#2e7d4f",
        "rightScoreColor": "#c0392b",
        "backgroundColor": "#f5ebe1",
        "leftTeamName": "Time verde",
        "rightTeamName": "Time vermelho",
        "showTeamNames": false
      }
    }
  }
}
```

## Deploy na Netlify

1. Conecte o repositório Git
2. **Site settings → Environment variables** — adicione todas as variáveis `VITE_*` do `.env.example`
3. Deploy (build: `npm run build`, publish: `dist`)

O `netlify.toml` já inclui redirect SPA para rotas dinâmicas funcionarem.

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
