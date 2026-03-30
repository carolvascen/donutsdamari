# 🍩 Donuts Damari - Monorepo Completo

Bem-vindo! Este é seu **site + app integrados com Firebase**!

---

## 🚀 Começar em 3 passos:

### **PASSO 1: Configure o .env.local**

1. Abra a pasta do projeto
2. Encontre o arquivo `.env.example`
3. Renomeie para `.env.local`
4. Abra e preencha com suas credenciais Firebase:

```env
REACT_APP_FIREBASE_API_KEY=AIzaSyAXNBL5K4GHRh9Iq5yOmgX-M1_-OuQuLj4
REACT_APP_FIREBASE_AUTH_DOMAIN=donuts-damari.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=donuts-damari
REACT_APP_FIREBASE_STORAGE_BUCKET=donuts-damari.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=1036744249984
REACT_APP_FIREBASE_APP_ID=1:1036744249984:web:262156c4c6cfb849520c65
```

### **PASSO 2: Instalar dependências**

Abra o terminal na pasta do projeto e digite:

```bash
npm install
```

### **PASSO 3: Rodar tudo**

```bash
npm run dev
```

Vai abrir:
- 🌐 **Site**: http://localhost:3000
- 📱 **App**: http://localhost:19000

---

## 📂 Estrutura do Projeto

```
donuts-damari/
├── apps/
│   ├── web/          ← Site (Next.js)
│   └── mobile/       ← App (React Native)
├── packages/
│   ├── firebase/     ← Autenticação + banco de dados
│   └── shared/       ← Código compartilhado
├── turbo.json        ← Configuração Turbo
├── package.json      ← Dependências
└── .env.local        ← Suas credenciais (NÃO versione!)
```

---

## 🔥 O que você pode fazer agora:

✅ Usuários fazem login no app e no site com mesma conta
✅ Carrinho sincronizado entre app e site
✅ Tokens/pontos aparecem em ambas plataformas
✅ Pedidos salvos no Firestore
✅ Tudo integrado automaticamente!

---

## 🚀 Deploy (Depois)

### **Web no Vercel:**
```bash
npm install -g vercel
vercel --prod
```

### **App no Expo:**
```bash
cd apps/mobile
eas build --platform ios
eas submit --platform ios
```

---

## 📞 Suporte

Qualquer dúvida:
- WhatsApp: (11) 93449-1268
- Instagram: @donutsdamari

---

## ✨ Pronto para começar!

Leia o MONOREPO_GUIDE.md para mais detalhes técnicos.

Bom desenvolvimento! 🍩
