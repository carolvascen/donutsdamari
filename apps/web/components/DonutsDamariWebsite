'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingCart, Home, LogOut, Heart, User, Plus, Minus, X, MessageCircle } from 'lucide-react';

export default function DonutsDamariWebsite() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [activeView, setActiveView] = useState('home');
  const [tokens, setTokens] = useState(0);
  
  // Login form
  const [loginForm, setLoginForm] = useState({ email: '', password: '', name: '' });
  const [isNewUser, setIsNewUser] = useState(false);

  // Bomb Escrita
  const [bombPhrase, setBombPhrase] = useState('');
  const [bombFilling, setBombFilling] = useState('brigadeiro');
  const [bombColor, setBombColor] = useState('branca');
  const [bombDecoration, setBombDecoration] = useState('risquinhos');

  const WHATSAPP = '5511934491268';
  const STORE_ADDRESS = 'Rua Dr Virgílio de Carvalho Pinto, 96 - Pinheiros, São Paulo';
  const STORE_EMAIL = 'contato@donutsdamari.com';

  // Dados de produtos
  const products = {
    entregaHoje: {
      tradicionais: [
        { id: 't1', name: 'Homer', price: 17, type: 'Tradicional', image: '🍩' },
        { id: 't2', name: 'Açúcar e Canela', price: 17, type: 'Tradicional', image: '🍩' },
        { id: 't3', name: 'Oreo', price: 17, type: 'Tradicional', image: '🍩' },
        { id: 't4', name: 'Maracujá com Oreo', price: 17, type: 'Tradicional', image: '🍩' },
        { id: 't5', name: 'Brigadeiro', price: 17, type: 'Tradicional', image: '🍩' },
        { id: 't6', name: 'Chocolate ao Leite', price: 17, type: 'Tradicional', image: '🍩' },
        { id: 't7', name: 'Nutella', price: 18, type: 'Tradicional', image: '🍩' },
        { id: 't8', name: 'Doce de Leite', price: 17, type: 'Tradicional', image: '🍩' },
      ],
      especiais: [
        { id: 'e1', name: 'Kinder Bueno', price: 32, type: 'Especial', image: '🍫' },
        { id: 'e2', name: 'Matilda', price: 32, type: 'Especial', image: '🍫' },
        { id: 'e3', name: 'Florella', price: 32, type: 'Especial', image: '🍫' },
        { id: 'e4', name: 'Boston Cream', price: 25, type: 'Especial', image: '🍫' },
        { id: 'e5', name: '4 Leches', price: 22, type: 'Especial', image: '🍫' },
        { id: 'e6', name: 'Cavi', price: 25, type: 'Especial', image: '🍫' },
        { id: 'e7', name: 'BCM', price: 28, type: 'Especial', image: '🍫' },
        { id: 'e8', name: 'BBM', price: 25, type: 'Especial', image: '🍫' },
        { id: 'e9', name: 'Nuni', price: 30, type: 'Especial', image: '🍫' },
      ],
      classicos: [
        { id: 'c1', name: 'Clássico Nutella', price: 30, type: 'Clássico', image: '🍩' },
        { id: 'c2', name: 'Clássico LeJelly', price: 28, type: 'Clássico', image: '🍩' },
        { id: 'c3', name: 'Clássico Brigadeiro', price: 24, type: 'Clássico', image: '🍩' },
        { id: 'c4', name: 'Clássico Creme', price: 24, type: 'Clássico', image: '🍩' },
        { id: 'c5', name: 'Clássico Doce de Leite', price: 25, type: 'Clássico', image: '🍩' },
      ],
      ddholes: [
        { id: 'd1', name: 'DDholes Glazed (30un)', price: 50, type: 'DDholes', image: '⭕' },
        { id: 'd2', name: 'DDholes Açúcar e Canela (30un)', price: 50, type: 'DDholes', image: '⭕' },
        { id: 'd3', name: 'DDholes Churros (30un)', price: 60, type: 'DDholes', image: '⭕' },
        { id: 'd4', name: 'DDholes M.P. Glazed (15un)', price: 30, type: 'DDholes', image: '⭕' },
        { id: 'd5', name: 'DDholes M.P. Açúcar e Canela (15un)', price: 30, type: 'DDholes', image: '⭕' },
      ],
      cremebrulee: [
        { id: 'cb1', name: 'Creme Brûlée', price: 32, type: 'Premium', image: '✨' },
      ]
    },
    encomendas: {
      medios: [
        { id: 'med1', name: 'Donuts Médios - Nutella', price: 13, type: 'Médio', minDays: 1, image: '🍩' },
        { id: 'med2', name: 'Donuts Médios - Homer', price: 12, type: 'Médio', minDays: 1, image: '🍩' },
        { id: 'med3', name: 'Donuts Médios - Açúcar e Canela', price: 12, type: 'Médio', minDays: 1, image: '🍩' },
      ],
      bombEscrita: [
        { id: 'bomb1', name: 'Bomb Escrita Personalizada', basePrice: 32, type: 'Bomb Escrita', image: '💌' },
      ],
      letras: [
        { id: 'let1', name: 'Donut com Letra/Número', basePrice: 12, type: 'Letra', image: '🔤' },
      ],
      caixaDegustacao: [
        { id: 'caixa1', name: 'Degustação Especiais Março (9 donuts)', price: 130, type: 'Caixa', image: '📦' },
        { id: 'caixa2', name: 'Degustação Damari sem Recheio (9 donuts)', price: 130, type: 'Caixa', image: '📦' },
        { id: 'caixa3', name: 'Degustação Damari com Recheio (9 donuts)', price: 140, type: 'Caixa', image: '📦' },
      ],
      personalizados: [
        { id: 'pers1', name: 'Donut Médio Personalizado', price: 20, type: 'Personalizado', minDays: 3, image: '🎨' },
        { id: 'pers2', name: 'Mini Donut Cobertura Simples (6cm)', price: 10, type: 'Personalizado', image: '🎨' },
      ]
    }
  };

  // Calcular bombas necessárias
  const calculateBombs = (phrase) => {
    return Math.ceil(phrase.length / 5);
  };

  // Calcular preço bomb escrita
  const calculateBombPrice = (phrase, filling) => {
    const bombs = calculateBombs(phrase);
    let basePrice = 32;
    
    const specialFillings = ['pistache', 'nutella'];
    if (specialFillings.includes(filling)) {
      basePrice = 35;
    }
    
    return bombs * basePrice;
  };

  // Visualização da bomb escrita
  const visualizeBomb = (phrase) => {
    if (!phrase) return '';
    
    const words = phrase.split(' ');
    const bombs = [];
    let currentBomb = '';
    
    for (let word of words) {
      for (let char of word) {
        if (currentBomb.length < 5) {
          currentBomb += char;
        } else {
          bombs.push(currentBomb);
          currentBomb = char;
        }
      }
      if (currentBomb.length < 5) currentBomb += ' ';
    }
    
    if (currentBomb.trim()) bombs.push(currentBomb.trim());
    return bombs;
  };

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (isNewUser && loginForm.name && loginForm.email && loginForm.password) {
      setCurrentUser({ name: loginForm.name, email: loginForm.email, id: Math.random() });
      setTokens(0);
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginForm({ email: '', password: '', name: '' });
      setIsNewUser(false);
    } else if (!isNewUser && loginForm.email && loginForm.password) {
      setCurrentUser({ name: 'Cliente', email: loginForm.email, id: Math.random() });
      setTokens(Math.floor(Math.random() * 5));
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginForm({ email: '', password: '', name: '' });
    }
  };

  // Add to cart
  const addToCart = (product, quantity = 1, customizations = {}) => {
    const newItem = {
      id: `${product.id}-${Date.now()}`,
      ...product,
      quantity,
      customizations
    };
    setCart([...cart, newItem]);
  };

  // Calculate cart total
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  // Check token discount
  const tokenDiscount = tokens >= 5 ? Math.min(cartTotal * 0.1, 10) : 0;

  // Login Modal
  if (showLoginModal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
                
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border-4 border-red-300">
          <div className="text-center mb-8">
            <h1 className="display-font text-4xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              Donuts Damari
            </h1>
            <p className="text-gray-600 mt-2">🍩 Bem-vindo!</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {isNewUser && (
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:border-red-500"
                value={loginForm.name}
                onChange={(e) => setLoginForm({...loginForm, name: e.target.value})}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:border-red-500"
              value={loginForm.email}
              onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:border-red-500"
              value={loginForm.password}
              onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition"
            >
              {isNewUser ? 'Criar Conta' : 'Entrar'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsNewUser(!isNewUser)}
              className="text-red-500 hover:text-pink-500 font-semibold text-sm"
            >
              {isNewUser ? 'Já tenho conta' : 'Criar nova conta'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main app
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex flex-col items-center justify-center p-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Outfit:wght@300;400;600&display=swap');
          body { font-family: 'Outfit', sans-serif; }
          .display-font { font-family: 'Fredoka', sans-serif; }
        `}</style>
        
        <div className="text-center">
          <h1 className="display-font text-6xl font-bold mb-4 animate-bounce">🍩</h1>
          <h2 className="display-font text-4xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-4">
            Donuts Damari
          </h2>
          <p className="text-gray-600 text-lg mb-8">Donuts artesanais que você vai amar 💕</p>
          
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-4 px-8 rounded-full text-lg hover:shadow-xl transform hover:scale-110 transition"
          >
            Começar 🎉
          </button>
        </div>
      </div>
    );
  }

  // Home view
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Outfit:wght@300;400;600&display=swap');
        body { font-family: 'Outfit', sans-serif; }
        .display-font { font-family: 'Fredoka', sans-serif; }
        
        .tag-entrega {
          position: absolute;
          top: 8px;
          right: 8px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 4px 8px;
          border-radius: 50%;
          font-size: 10px;
          font-weight: bold;
          text-align: center;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        
        .tag-encomenda {
          position: absolute;
          top: 8px;
          right: 8px;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
          padding: 4px 8px;
          border-radius: 50%;
          font-size: 10px;
          font-weight: bold;
          text-align: center;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .product-card {
          background: white;
          border: 2px solid #fce7f3;
          border-radius: 20px;
          padding: 16px;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          cursor: pointer;
        }

        .product-card:hover {
          transform: translateY(-8px);
          border-color: #ec4899;
          box-shadow: 0 10px 30px rgba(236, 72, 153, 0.2);
        }

        .bomb-visualization {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
          gap: 8px;
          margin: 16px 0;
        }

        .bomb-item {
          background: linear-gradient(135deg, #fca5a5 0%, #fbcfe8 100%);
          border: 2px solid #f43f5e;
          border-radius: 12px;
          padding: 12px 8px;
          text-center;
          font-weight: bold;
          color: #be123c;
          font-size: 14px;
          box-shadow: 0 4px 12px rgba(244, 63, 94, 0.2);
        }
      `}</style>

      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-red-300 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="display-font text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            🍩 Donuts Damari
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-700">
              <span className="font-bold text-red-500">{tokens}</span> tokens
            </div>
            
            <button
              onClick={() => setShowCart(true)}
              className="relative bg-gradient-to-r from-red-500 to-pink-500 text-white p-3 rounded-full hover:shadow-lg transition"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {cart.length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setIsLoggedIn(false);
                setCurrentUser(null);
              }}
              className="text-gray-600 hover:text-red-500 transition"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        <div className="bg-red-50 px-4 py-2 text-sm text-gray-700 text-center border-t border-red-200">
          👋 Bem-vindo, {currentUser?.name}! | 📍 {STORE_ADDRESS} | ⏰ Seg-Quinta: até 18:30 | Sex-Dom: até 23:30
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Entrega Hoje */}
        <section className="mb-12">
          <div className="display-font text-3xl font-bold mb-6 text-red-600 flex items-center gap-3">
            ⚡ Entrega Hoje
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Object.entries(products.entregaHoje).map(([category, items]) =>
              items.map(product => (
                <div
                  key={product.id}
                  className="product-card"
                  onClick={() => {
                    const quantity = parseInt(prompt('Quantidade:', '1')) || 1;
                    addToCart(product, quantity);
                    alert('Adicionado ao carrinho! 🎉');
                  }}
                >
                  <div className="tag-entrega">HOJE</div>
                  <div className="text-5xl mb-3">{product.image}</div>
                  <h3 className="display-font font-bold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.type}</p>
                  <p className="display-font text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                    R$ {product.price.toFixed(2)}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Bomb Escrita Especial */}
        <section className="mb-12 bg-gradient-to-r from-red-100 to-pink-100 rounded-3xl p-8 border-4 border-red-300">
          <div className="display-font text-3xl font-bold mb-6 text-red-700">
            💌 Bomb Escrita Personalizada
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Sua Mensagem:</label>
              <input
                type="text"
                maxLength="50"
                placeholder="Ex: PARABÉNS CAROL (máx 5 letras por bomb)"
                value={bombPhrase}
                onChange={(e) => setBombPhrase(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:outline-none focus:border-red-500 mb-4"
              />

              <label className="block text-gray-700 font-bold mb-2">Recheio:</label>
              <select
                value={bombFilling}
                onChange={(e) => setBombFilling(e.target.value)}
                className="w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:outline-none focus:border-red-500 mb-4"
              >
                <option value="brigadeiro">Brigadeiro - R$ 32,00</option>
                <option value="creme">Creme - R$ 32,00</option>
                <option value="doceleite">Doce de Leite - R$ 32,00</option>
                <option value="4leches">4 Leches - R$ 32,00</option>
                <option value="pistache">Pistache - R$ 35,00</option>
                <option value="nutella">Nutella - R$ 35,00</option>
                <option value="funfetti">Funfetti - R$ 33,00</option>
              </select>

              <label className="block text-gray-700 font-bold mb-2">Cor da Cobertura:</label>
              <select
                value={bombColor}
                onChange={(e) => setBombColor(e.target.value)}
                className="w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:outline-none focus:border-red-500 mb-4"
              >
                <option value="branca">Branca</option>
                <option value="rosa">Rosa</option>
                <option value="vermelha">Vermelha</option>
                <option value="azul">Azul</option>
                <option value="amarela">Amarela</option>
                <option value="verde">Verde</option>
              </select>

              <label className="block text-gray-700 font-bold mb-2">Decoração:</label>
              <select
                value={bombDecoration}
                onChange={(e) => setBombDecoration(e.target.value)}
                className="w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:outline-none focus:border-red-500"
              >
                <option value="risquinhos">Risquinhos</option>
                <option value="pó-dourado">Pó Dourado</option>
                <option value="flores">Flores</option>
                <option value="corações">Corações</option>
              </select>
            </div>

            <div className="flex flex-col justify-center">
              {bombPhrase && (
                <>
                  <h4 className="text-gray-700 font-bold mb-4">Visualização:</h4>
                  <div className="bomb-visualization">
                    {visualizeBomb(bombPhrase).map((bomb, idx) => (
                      <div key={idx} className="bomb-item">
                        {bomb}
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="mt-auto pt-6 border-t-2 border-red-300">
                <p className="text-gray-700 mb-2">
                  <strong>Bombs necessárias:</strong> {bombPhrase ? calculateBombs(bombPhrase) : 0}
                </p>
                <p className="display-font text-3xl font-bold text-red-600 mb-4">
                  R$ {bombPhrase ? calculateBombPrice(bombPhrase, bombFilling).toFixed(2) : '0,00'}
                </p>

                {bombPhrase && (
                  <button
                    onClick={() => {
                      addToCart(
                        {
                          id: 'bomb-' + Date.now(),
                          name: `Bomb: ${bombPhrase}`,
                          price: calculateBombPrice(bombPhrase, bombFilling),
                          type: 'Bomb Escrita'
                        },
                        1,
                        { phrase: bombPhrase, filling: bombFilling, color: bombColor, decoration: bombDecoration }
                      );
                      alert('Bomb adicionada ao carrinho! 💌');
                      setBombPhrase('');
                    }}
                    className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transition"
                  >
                    Adicionar ao Carrinho
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Encomendas */}
        <section className="mb-12">
          <div className="display-font text-3xl font-bold mb-6 text-amber-600 flex items-center gap-3">
            📦 Encomendas (Sob Encomenda)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(products.encomendas).map(([category, items]) =>
              items.map(product => (
                <div
                  key={product.id}
                  className="product-card"
                  onClick={() => {
                    const quantity = parseInt(prompt('Quantidade:', '1')) || 1;
                    addToCart(product, quantity);
                    alert('Adicionado ao carrinho! 🎉');
                  }}
                >
                  <div className="tag-encomenda">ENCOMENDA</div>
                  <div className="text-5xl mb-3">{product.image}</div>
                  <h3 className="display-font font-bold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.type}</p>
                  <p className="display-font text-2xl font-bold bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">
                    R$ {product.price.toFixed(2)}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Informações */}
        <section className="bg-white rounded-3xl p-8 border-4 border-gray-200">
          <h2 className="display-font text-2xl font-bold mb-6 text-gray-800">ℹ️ Informações</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-red-600 mb-2">📍 Endereço:</h3>
              <p className="text-gray-700">{STORE_ADDRESS}</p>
            </div>
            <div>
              <h3 className="font-bold text-red-600 mb-2">📞 WhatsApp:</h3>
              <p className="text-gray-700">{WHATSAPP}</p>
            </div>
            <div>
              <h3 className="font-bold text-red-600 mb-2">⏰ Horários:</h3>
              <p className="text-gray-700">Seg-Quinta: 12:30 - 18:30</p>
              <p className="text-gray-700">Sex-Dom: 12:30 - 23:30</p>
            </div>
            <div>
              <h3 className="font-bold text-red-600 mb-2">🎁 Programa de Fidelidade:</h3>
              <p className="text-gray-700">Cada compra = 1 token</p>
              <p className="text-gray-700">5 tokens = 10% OFF (máx R$10)</p>
            </div>
          </div>
        </section>
      </main>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 flex justify-between items-center sticky top-0">
              <h2 className="display-font text-2xl font-bold">🛒 Seu Carrinho</h2>
              <button onClick={() => setShowCart(false)} className="hover:bg-red-600 p-2 rounded-full transition">
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {cart.length === 0 ? (
                <p className="text-gray-600 text-center py-8">Seu carrinho está vazio 😢</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item, idx) => (
                      <div key={idx} className="border-2 border-pink-200 rounded-xl p-4 flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-gray-800">{item.name}</h4>
                          <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
                          {item.customizations?.phrase && (
                            <p className="text-xs text-red-600">Msg: {item.customizations.phrase}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="display-font font-bold text-red-600">R$ {(item.price * item.quantity).toFixed(2)}</p>
                          <button
                            onClick={() => setCart(cart.filter((_, i) => i !== idx))}
                            className="text-red-500 hover:text-red-700 text-sm mt-1"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 border-gray-300 pt-4 space-y-2">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal:</span>
                      <span className="font-bold">R$ {cartTotal.toFixed(2)}</span>
                    </div>
                    {tokenDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Desconto (tokens):</span>
                        <span className="font-bold">-R$ {tokenDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xl font-bold text-red-600 pt-2 border-t border-gray-300">
                      <span>Total:</span>
                      <span>R$ {(cartTotal - tokenDiscount).toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const message = `Olá! Gostaria de fazer um pedido no site:\n\n${cart.map(item => `${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}`).join('\n')}\n\nTotal: R$ ${(cartTotal - tokenDiscount).toFixed(2)}`;
                      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                    className="w-full mt-6 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:shadow-lg transition text-lg"
                  >
                    💳 Pagar com PagSeguro
                  </button>

                  <button
                    onClick={() => {
                      const message = `Olá! Gostaria de fazer um pedido:\n\n${cart.map(item => `${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}`).join('\n')}\n\nTotal: R$ ${(cartTotal - tokenDiscount).toFixed(2)}`;
                      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                    className="w-full mt-3 bg-green-500 text-white font-bold py-4 rounded-xl hover:shadow-lg transition text-lg"
                  >
                    💬 Confirmar via WhatsApp
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
