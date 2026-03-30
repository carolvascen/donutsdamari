# 🍩 Donuts Damari - Monorepo Integrado (Turbo + Firebase + Vercel + Expo)

## 📁 Estrutura do Projeto

```
donuts-damari/
│
├── 📦 packages/
│   ├── firebase/
│   │   ├── config.js          # Configuração Firebase
│   │   ├── services.js        # Serviços compartilhados
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── shared/
│   │   ├── constants.js       # Constantes (WHATSAPP, HORÁRIOS, etc)
│   │   ├── utils.js           # Funções utilitárias
│   │   ├── styles/            # Temas compartilhados
│   │   ├── types.ts           # TypeScript types
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── ui/
│       ├── components/
│       │   ├── ProductCard.jsx
│       │   ├── BombCalculator.jsx
│       │   ├── CartModal.jsx
│       │   └── ...
│       ├── package.json
│       └── README.md
│
├── 📱 apps/
│   ├── mobile/
│   │   ├── app.json           # Configuração Expo
│   │   ├── App.js
│   │   ├── screens/
│   │   │   ├── HomeScreen.js
│   │   │   ├── BombScreen.js
│   │   │   └── ...
│   │   ├── navigation/
│   │   ├── package.json
│   │   └── .env.local
│   │
│   └── web/
│       ├── pages/
│       │   ├── index.js       # Home
│       │   ├── _app.js        # Layout
│       │   ├── cart.js
│       │   └── ...
│       ├── styles/
│       ├── components/
│       ├── public/
│       ├── next.config.js
│       ├── package.json
│       └── .env.local
│
├── turbo.json                 # Configuração Turbo
├── package.json              # Root package.json
├── pnpm-workspace.yaml       # (ou yarn workspaces)
├── .env.local               # Variáveis de ambiente compartilhadas
└── README.md

```

---

## 🚀 Setup Inicial

### 1. Clone e Configure

```bash
# Clone o projeto
git clone https://github.com/seu-usuario/donuts-damari.git
cd donuts-damari

# Instale dependências
npm install
# ou
pnpm install

# Configure variáveis de ambiente
cp .env.example .env.local
```

### 2. Arquivo `.env.local` (raiz)

```env
# Firebase
REACT_APP_FIREBASE_API_KEY=seu_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=seu_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=seu_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
REACT_APP_FIREBASE_APP_ID=seu_app_id

# Loja
NEXT_PUBLIC_WHATSAPP=5511934491268
NEXT_PUBLIC_STORE_ADDRESS=Rua Dr Virgílio de Carvalho Pinto, 96 - Pinheiros, São Paulo
NEXT_PUBLIC_STORE_EMAIL=contato@donutsdamari.com

# PagSeguro (futuro)
NEXT_PUBLIC_PAGSEGURO_TOKEN=seu_token

# Vercel
VERCEL_ENV=production
```

### 3. Inicie o Desenvolvimento

```bash
# Rodar site + app simultaneamente
npm run dev

# Ou separadamente:
# Terminal 1 - Site (Vercel)
cd apps/web
npm run dev

# Terminal 2 - App (Expo)
cd apps/mobile
npm start
```

---

## 🔗 Como o Firebase Sincroniza TUDO

### **Usuário faz login no APP:**
1. App envia email + senha → Firebase Auth
2. Firebase cria usuario_id único
3. Firestore salva dados do usuário (tokens, carrinho, histórico)
4. App salva token JWT localmente

### **Mesmo usuário acessa o SITE:**
1. Site detecta login com mesmo email
2. Usa mesmo usuario_id do Firebase
3. Busca tokens, carrinho, histórico do Firestore
4. Tudo sincronizado automaticamente! ✨

### **Usuário adiciona item no carrinho no APP:**
1. App chama `addToCart(uid, item)`
2. Firebase atualiza `users/{uid}/cart`
3. Site atualiza em tempo real (via Firestore listener)
4. **Carrinho aparece no site instantaneamente!**

### **Usuário faz pedido no SITE:**
1. Site cria documento em `orders/{orderId}`
2. Firebase adiciona tokens baseado no valor gasto
3. App recebe notificação (futuro)
4. Tokens aparecem no app instantaneamente!

---

## 📊 Estrutura Firestore

```
users/
  {uid}/
    - email: string
    - name: string
    - tokens: number
    - cart: array
    - orders: array (IDs)
    - createdAt: timestamp
    - updatedAt: timestamp

orders/
  {orderId}/
    - uid: string
    - items: array
    - total: number
    - status: string (pendente/confirmado/pronto/entregue)
    - deliveryType: string (retirada/entrega)
    - address: string
    - createdAt: timestamp
    - updatedAt: timestamp

products/
  {productId}/
    - name: string
    - price: number
    - category: string (tradicionais/especiais/classicos/etc)
    - type: string (entregaHoje/encomenda)
    - description: string
    - emoji: string
    - createdAt: timestamp

analytics/
  {eventId}/
    - event: string
    - data: object
    - timestamp: timestamp
```

---

## 🎯 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Ambos web + mobile

# Build
npm run build            # Build para produção (web + app)

# Linting
npm run lint             # Lint em todos os packages

# Testing
npm run test             # Rodar testes

# Type checking
npm run type-check       # Verificar TypeScript

# Limpeza
npm run clean            # Remover node_modules e builds
```

---

## 📱 App Mobile (Expo)

```bash
cd apps/mobile

# Desenvolvimento
npm start

# Build iOS
eas build --platform ios

# Build Android
eas build --platform android

# Publicar na App Store
eas submit --platform ios

# Publicar no Google Play
eas submit --platform android
```

---

## 🌐 Site Web (Next.js)

```bash
cd apps/web

# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start
```

### Deploy no Vercel

```bash
# Instale Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy com alias de produção
vercel --prod
```

---

## 🔥 Funcionalidades Sincronizadas

| Funcionalidade | APP | SITE | Sincronizado |
|---|---|---|---|
| Login/Registro | ✅ | ✅ | Real-time |
| Carrinho | ✅ | ✅ | Real-time |
| Tokens | ✅ | ✅ | Real-time |
| Histórico de Pedidos | ✅ | ✅ | Real-time |
| Perfil do Usuário | ✅ | ✅ | Real-time |
| Catálogo de Produtos | ✅ | ✅ | Real-time |
| Bomb Escrita | ✅ | ✅ | Mesmo algoritmo |
| Notificações | ⏳ | ⏳ | Firebase Messaging |
| Rastreamento | ⏳ | ⏳ | Firebase Analytics |

---

## 🛡️ Segurança Firebase

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuários só podem ler/escrever seus próprios dados
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Pedidos só podem ser lidos pelo dono
    match /orders/{orderId} {
      allow read, write: if request.auth.uid == resource.data.uid;
      allow create: if request.auth.uid == request.resource.data.uid;
    }

    // Produtos são públicos para leitura
    match /products/{document=**} {
      allow read: if true;
    }

    // Admin só
    match /analytics/{document=**} {
      allow write: if request.auth.token.admin == true;
    }
  }
}
```

---

## 📈 Próximas Integrações

- [ ] **Notificações Push** - Firebase Cloud Messaging
- [ ] **Pagamento** - PagSeguro integrado
- [ ] **Analytics** - Firebase Analytics automático
- [ ] **Storage** - Fotos de produtos
- [ ] **Email** - SendGrid para confirmações
- [ ] **SMS** - Twilio para avisos
- [ ] **Rastreamento de Pedido** - Google Maps
- [ ] **Admin Dashboard** - Gerenciar pedidos

---

## 🤝 Contribuindo

1. Crie uma branch (`git checkout -b feature/amazing-feature`)
2. Commit suas mudanças (`git commit -m 'Add amazing feature'`)
3. Push para a branch (`git push origin feature/amazing-feature`)
4. Abra um Pull Request

---

## 📞 Suporte

- **WhatsApp**: (11) 93449-1268
- **Email**: contato@donutsdamari.com
- **Instagram**: @donutsdamari

---

## 📝 Licença

MIT License - veja LICENSE.md para detalhes

---

## 🎉 Checklist de Lançamento

- [ ] Firebase projeto criado e configurado
- [ ] Firestore regras de segurança implementadas
- [ ] App testado em iOS e Android
- [ ] Site testado em todos os navegadores
- [ ] Sincronização Firebase testada (login, carrinho, tokens)
- [ ] Variáveis de ambiente configuradas
- [ ] App publicado na App Store + Google Play
- [ ] Site publicado na Vercel
- [ ] Domínio customizado configurado
- [ ] SSL/HTTPS ativado
- [ ] Monitoramento Firebase ativo
- [ ] Backups automáticos ativados

---

**Pronto para começar! 🚀 Alguma dúvida?**
