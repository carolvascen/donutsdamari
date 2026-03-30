import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  Alert,
  Image,
  SafeAreaView,
  FlatList,
  Dimensions,
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

const { width } = Dimensions.get('window');

const WHATSAPP = '5511934491268';
const STORE_ADDRESS = 'Rua Dr Virgílio de Carvalho Pinto, 96 - Pinheiros, São Paulo';

export default function DonutsDamariApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [tokens, setTokens] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  
  // Login form
  const [loginForm, setLoginForm] = useState({ email: '', password: '', name: '' });
  const [isNewUser, setIsNewUser] = useState(false);

  // Bomb Escrita
  const [bombPhrase, setBombPhrase] = useState('');
  const [bombFilling, setBombFilling] = useState('brigadeiro');
  const [bombColor, setBombColor] = useState('branca');
  const [bombDecoration, setBombDecoration] = useState('risquinhos');
  const [showBombModal, setShowBombModal] = useState(false);

  // Produtos
  const products = {
    entregaHoje: {
      tradicionais: [
        { id: 't1', name: 'Homer', price: 17, type: 'Tradicional', emoji: '🍩' },
        { id: 't2', name: 'Açúcar e Canela', price: 17, type: 'Tradicional', emoji: '🍩' },
        { id: 't3', name: 'Oreo', price: 17, type: 'Tradicional', emoji: '🍩' },
        { id: 't4', name: 'Maracujá com Oreo', price: 17, type: 'Tradicional', emoji: '🍩' },
        { id: 't5', name: 'Brigadeiro', price: 17, type: 'Tradicional', emoji: '🍩' },
        { id: 't6', name: 'Chocolate ao Leite', price: 17, type: 'Tradicional', emoji: '🍩' },
        { id: 't7', name: 'Nutella', price: 18, type: 'Tradicional', emoji: '🍩' },
        { id: 't8', name: 'Doce de Leite', price: 17, type: 'Tradicional', emoji: '🍩' },
      ],
      especiais: [
        { id: 'e1', name: 'Kinder Bueno', price: 32, type: 'Especial', emoji: '🍫' },
        { id: 'e2', name: 'Matilda', price: 32, type: 'Especial', emoji: '🍫' },
        { id: 'e3', name: 'Florella', price: 32, type: 'Especial', emoji: '🍫' },
        { id: 'e4', name: 'Boston Cream', price: 25, type: 'Especial', emoji: '🍫' },
        { id: 'e5', name: '4 Leches', price: 22, type: 'Especial', emoji: '🍫' },
        { id: 'e6', name: 'Cavi', price: 25, type: 'Especial', emoji: '🍫' },
        { id: 'e7', name: 'BCM', price: 28, type: 'Especial', emoji: '🍫' },
        { id: 'e8', name: 'BBM', price: 25, type: 'Especial', emoji: '🍫' },
        { id: 'e9', name: 'Nuni', price: 30, type: 'Especial', emoji: '🍫' },
      ],
      classicos: [
        { id: 'c1', name: 'Clássico Nutella', price: 30, type: 'Clássico', emoji: '🍩' },
        { id: 'c2', name: 'Clássico LeJelly', price: 28, type: 'Clássico', emoji: '🍩' },
        { id: 'c3', name: 'Clássico Brigadeiro', price: 24, type: 'Clássico', emoji: '🍩' },
        { id: 'c4', name: 'Clássico Creme', price: 24, type: 'Clássico', emoji: '🍩' },
        { id: 'c5', name: 'Clássico Doce de Leite', price: 25, type: 'Clássico', emoji: '🍩' },
      ],
      ddholes: [
        { id: 'd1', name: 'DDholes Glazed (30un)', price: 50, type: 'DDholes', emoji: '⭕' },
        { id: 'd2', name: 'DDholes Açúcar e Canela (30un)', price: 50, type: 'DDholes', emoji: '⭕' },
        { id: 'd3', name: 'DDholes Churros (30un)', price: 60, type: 'DDholes', emoji: '⭕' },
        { id: 'd4', name: 'DDholes M.P. Glazed (15un)', price: 30, type: 'DDholes', emoji: '⭕' },
        { id: 'd5', name: 'DDholes M.P. Açúcar e Canela (15un)', price: 30, type: 'DDholes', emoji: '⭕' },
      ],
      cremebrulee: [
        { id: 'cb1', name: 'Creme Brûlée', price: 32, type: 'Premium', emoji: '✨' },
      ]
    },
    encomendas: {
      medios: [
        { id: 'med1', name: 'Donuts Médios - Nutella', price: 13, type: 'Médio', minDays: 1, emoji: '🍩' },
        { id: 'med2', name: 'Donuts Médios - Homer', price: 12, type: 'Médio', minDays: 1, emoji: '🍩' },
        { id: 'med3', name: 'Donuts Médios - Açúcar e Canela', price: 12, type: 'Médio', minDays: 1, emoji: '🍩' },
      ],
      bombEscrita: [
        { id: 'bomb1', name: 'Bomb Escrita Personalizada', basePrice: 32, type: 'Bomb Escrita', emoji: '💌' },
      ],
      letras: [
        { id: 'let1', name: 'Donut com Letra/Número', basePrice: 12, type: 'Letra', emoji: '🔤' },
      ],
      caixaDegustacao: [
        { id: 'caixa1', name: 'Degustação Especiais (9 donuts)', price: 130, type: 'Caixa', emoji: '📦' },
        { id: 'caixa2', name: 'Degustação sem Recheio (9 donuts)', price: 130, type: 'Caixa', emoji: '📦' },
        { id: 'caixa3', name: 'Degustação com Recheio (9 donuts)', price: 140, type: 'Caixa', emoji: '📦' },
      ],
      personalizados: [
        { id: 'pers1', name: 'Donut Médio Personalizado', price: 20, type: 'Personalizado', minDays: 3, emoji: '🎨' },
        { id: 'pers2', name: 'Mini Donut Cobertura Simples (6cm)', price: 10, type: 'Personalizado', emoji: '🎨' },
      ]
    }
  };

  // Login Handler
  const handleLogin = () => {
    if (isNewUser && loginForm.name && loginForm.email && loginForm.password) {
      setCurrentUser({ name: loginForm.name, email: loginForm.email });
      setTokens(0);
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginForm({ email: '', password: '', name: '' });
    } else if (!isNewUser && loginForm.email && loginForm.password) {
      setCurrentUser({ name: 'Cliente', email: loginForm.email });
      setTokens(Math.floor(Math.random() * 5));
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginForm({ email: '', password: '', name: '' });
    } else {
      Alert.alert('Erro', 'Preencha todos os campos');
    }
  };

  // Calcular bombas
  const calculateBombs = (phrase) => {
    return Math.ceil(phrase.length / 5);
  };

  // Calcular preço bomb
  const calculateBombPrice = (phrase, filling) => {
    const bombs = calculateBombs(phrase);
    let basePrice = 32;
    const specialFillings = ['pistache', 'nutella'];
    if (specialFillings.includes(filling)) {
      basePrice = 35;
    }
    return bombs * basePrice;
  };

  // Visualizar bombas
  const visualizeBomb = (phrase) => {
    if (!phrase) return [];
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

  // Adicionar ao carrinho
  const addToCart = (product, quantity = 1, customizations = {}) => {
    const newItem = {
      id: `${product.id}-${Date.now()}`,
      ...product,
      quantity,
      customizations
    };
    setCart([...cart, newItem]);
    Alert.alert('Sucesso', 'Adicionado ao carrinho! 🎉');
  };

  // Calcular total
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  const tokenDiscount = tokens >= 5 ? Math.min(cartTotal * 0.1, 10) : 0;

  // Login Modal
  if (!isLoggedIn && showLoginModal) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={styles.loginTitle}>🍩</Text>
          <Text style={styles.appTitle}>Donuts Damari</Text>
          <Text style={styles.subtitle}>Bem-vindo!</Text>

          {isNewUser && (
            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              value={loginForm.name}
              onChangeText={(text) => setLoginForm({...loginForm, name: text})}
              placeholderTextColor="#999"
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={loginForm.email}
            onChangeText={(text) => setLoginForm({...loginForm, email: text})}
            placeholderTextColor="#999"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={loginForm.password}
            onChangeText={(text) => setLoginForm({...loginForm, password: text})}
            placeholderTextColor="#999"
            secureTextEntry
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>
              {isNewUser ? 'Criar Conta' : 'Entrar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsNewUser(!isNewUser)}>
            <Text style={styles.toggleAuthText}>
              {isNewUser ? 'Já tenho conta' : 'Criar nova conta'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ProductCard Component
  const ProductCard = ({ product, isEncomenda = false }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => {
        Alert.prompt(
          'Quantidade',
          'Quantos você quer?',
          [
            {
              text: 'Cancelar',
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: 'Adicionar',
              onPress: (quantity) => {
                const qty = parseInt(quantity) || 1;
                addToCart(product, qty);
              },
            },
          ],
          'plain-text',
          '1'
        );
      }}
    >
      <View style={styles.tagContainer}>
        <Text style={[styles.tag, isEncomenda ? styles.tagEncomenda : styles.tagHoje]}>
          {isEncomenda ? 'ENCOMENDA' : 'HOJE'}
        </Text>
      </View>
      <Text style={styles.productEmoji}>{product.emoji}</Text>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productType}>{product.type}</Text>
      <Text style={styles.productPrice}>R$ {product.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  // Home Tab
  const renderHome = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Entrega Hoje */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚡ Entrega Hoje</Text>

        {/* Tradicionais */}
        <Text style={styles.categoryTitle}>Tradicionais</Text>
        <View style={styles.productGrid}>
          {products.entregaHoje.tradicionais.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>

        {/* Especiais */}
        <Text style={styles.categoryTitle}>Especiais</Text>
        <View style={styles.productGrid}>
          {products.entregaHoje.especiais.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>

        {/* Clássicos */}
        <Text style={styles.categoryTitle}>Clássicos</Text>
        <View style={styles.productGrid}>
          {products.entregaHoje.classicos.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>

        {/* DDholes */}
        <Text style={styles.categoryTitle}>DDholes</Text>
        <View style={styles.productGrid}>
          {products.entregaHoje.ddholes.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>

        {/* Premium */}
        <Text style={styles.categoryTitle}>Premium</Text>
        <View style={styles.productGrid}>
          {products.entregaHoje.cremebrulee.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      </View>

      {/* Encomendas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📦 Encomendas</Text>

        {Object.entries(products.encomendas).map(([category, items]) => (
          <View key={category}>
            <Text style={styles.categoryTitle}>
              {category === 'bombEscrita' ? 'Bomb Escrita' : 
               category === 'caixaDegustacao' ? 'Caixa Degustação' :
               category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
            <View style={styles.productGrid}>
              {items.map(product => (
                <ProductCard key={product.id} product={product} isEncomenda />
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );

  // Bomb Escrita Tab
  const renderBomb = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.bombSection}>
        <Text style={styles.bombTitle}>💌 Bomb Escrita Personalizada</Text>

        <View style={styles.bombForm}>
          <Text style={styles.label}>Sua Mensagem:</Text>
          <TextInput
            style={styles.bombInput}
            placeholder="Ex: PARABÉNS CAROL"
            value={bombPhrase}
            onChangeText={(text) => setBombPhrase(text.toUpperCase())}
            maxLength={50}
            placeholderTextColor="#999"
          />
          <Text style={styles.hint}>Máx 5 letras por bomb</Text>

          <Text style={styles.label}>Recheio:</Text>
          <View style={styles.pickerContainer}>
            {['Brigadeiro - R$ 32', 'Creme - R$ 32', 'Doce de Leite - R$ 32', 'Pistache - R$ 35', 'Nutella - R$ 35'].map((filling, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.pickerOption, bombFilling === filling.toLowerCase().split(' ')[0] && styles.pickerOptionActive]}
                onPress={() => setBombFilling(filling.toLowerCase().split(' ')[0])}
              >
                <Text style={styles.pickerOptionText}>{filling}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Cor da Cobertura:</Text>
          <View style={styles.colorGrid}>
            {['Branca', 'Rosa', 'Vermelha', 'Azul', 'Amarela', 'Verde'].map((color) => (
              <TouchableOpacity
                key={color}
                style={[styles.colorOption, bombColor === color.toLowerCase() && styles.colorOptionActive]}
                onPress={() => setBombColor(color.toLowerCase())}
              >
                <Text style={styles.colorText}>{color}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Decoração:</Text>
          <View style={styles.decorationGrid}>
            {['Risquinhos', 'Pó Dourado', 'Flores', 'Corações'].map((deco) => (
              <TouchableOpacity
                key={deco}
                style={[styles.decoOption, bombDecoration === deco.toLowerCase().replace(' ', '-') && styles.decoOptionActive]}
                onPress={() => setBombDecoration(deco.toLowerCase().replace(' ', '-'))}
              >
                <Text style={styles.decoText}>{deco}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {bombPhrase ? (
          <>
            <Text style={styles.visualizationTitle}>Visualização:</Text>
            <View style={styles.bombVisualization}>
              {visualizeBomb(bombPhrase).map((bomb, idx) => (
                <View key={idx} style={styles.bombItem}>
                  <Text style={styles.bombItemText}>{bomb}</Text>
                </View>
              ))}
            </View>

            <View style={styles.bombSummary}>
              <Text style={styles.summaryText}>
                Bombs necessárias: <Text style={styles.summaryNumber}>{calculateBombs(bombPhrase)}</Text>
              </Text>
              <Text style={styles.bombTotalPrice}>
                R$ {calculateBombPrice(bombPhrase, bombFilling).toFixed(2)}
              </Text>

              <TouchableOpacity
                style={styles.addBombButton}
                onPress={() => {
                  addToCart(
                    {
                      id: 'bomb-' + Date.now(),
                      name: `Bomb: ${bombPhrase}`,
                      price: calculateBombPrice(bombPhrase, bombFilling),
                      type: 'Bomb Escrita',
                      emoji: '💌'
                    },
                    1,
                    { phrase: bombPhrase, filling: bombFilling, color: bombColor, decoration: bombDecoration }
                  );
                  setBombPhrase('');
                }}
              >
                <Text style={styles.addBombButtonText}>Adicionar ao Carrinho</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.emptyBomb}>
            <Text style={styles.emptyBombText}>Digite uma mensagem para visualizar 👆</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );

  // Info Tab
  const renderInfo = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>📍</Text>
          <Text style={styles.infoTitle}>Endereço</Text>
          <Text style={styles.infoText}>{STORE_ADDRESS}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>📞</Text>
          <Text style={styles.infoTitle}>WhatsApp</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`whatsapp://send?phone=${WHATSAPP}`)}>
            <Text style={styles.infoText}>(11) 93449-1268</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>⏰</Text>
          <Text style={styles.infoTitle}>Horários</Text>
          <Text style={styles.infoText}>Seg-Quinta: 12:30 - 18:30</Text>
          <Text style={styles.infoText}>Sex-Dom: 12:30 - 23:30</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>🎁</Text>
          <Text style={styles.infoTitle}>Programa de Fidelidade</Text>
          <Text style={styles.infoText}>Cada compra = 1 token</Text>
          <Text style={styles.infoText}>5 tokens = 10% OFF (máx R$10)</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>📱</Text>
          <Text style={styles.infoTitle}>Redes Sociais</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com/donutsdamari')}>
            <Text style={[styles.infoText, { color: '#E4405F' }]}>@donutsdamari</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  // Cart Modal
  const renderCartModal = () => (
    <Modal
      visible={showCart}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowCart(false)}
    >
      <SafeAreaView style={styles.cartModalContainer}>
        <View style={styles.cartHeader}>
          <Text style={styles.cartTitle}>🛒 Seu Carrinho</Text>
          <TouchableOpacity onPress={() => setShowCart(false)}>
            <MaterialIcons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {cart.length === 0 ? (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyCartText}>Seu carrinho está vazio 😢</Text>
          </View>
        ) : (
          <>
            <ScrollView style={styles.cartItems}>
              {cart.map((item, idx) => (
                <View key={idx} style={styles.cartItem}>
                  <View style={styles.cartItemInfo}>
                    <Text style={styles.cartItemName}>{item.name}</Text>
                    <Text style={styles.cartItemQty}>Qtd: {item.quantity}</Text>
                    {item.customizations?.phrase && (
                      <Text style={styles.cartItemMsg}>Msg: {item.customizations.phrase}</Text>
                    )}
                  </View>
                  <View style={styles.cartItemRight}>
                    <Text style={styles.cartItemPrice}>
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setCart(cart.filter((_, i) => i !== idx))}
                      style={styles.removeButton}
                    >
                      <Text style={styles.removeButtonText}>Remover</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.cartSummary}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal:</Text>
                <Text style={styles.summaryValue}>R$ {cartTotal.toFixed(2)}</Text>
              </View>

              {tokenDiscount > 0 && (
                <View style={[styles.summaryRow, { borderTopWidth: 1, borderTopColor: '#ddd', marginTop: 8, paddingTop: 8 }]}>
                  <Text style={[styles.summaryLabel, { color: '#10b981' }]}>Desconto (tokens):</Text>
                  <Text style={[styles.summaryValue, { color: '#10b981' }]}>-R$ {tokenDiscount.toFixed(2)}</Text>
                </View>
              )}

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalValue}>R$ {(cartTotal - tokenDiscount).toFixed(2)}</Text>
              </View>

              <TouchableOpacity
                style={styles.paymentButton}
                onPress={() => {
                  const message = `Olá! Gostaria de fazer um pedido:\n\n${cart.map(item => `${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}`).join('\n')}\n\nTotal: R$ ${(cartTotal - tokenDiscount).toFixed(2)}`;
                  Linking.openURL(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`);
                }}
              >
                <Text style={styles.paymentButtonText}>💳 Confirmar via WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>🍩 Donuts Damari</Text>
          <Text style={styles.headerSubtitle}>Olá, {currentUser?.name}!</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.tokenBadge}>
            <Text style={styles.tokenText}>{tokens} tokens</Text>
          </View>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => setShowCart(true)}
          >
            <FontAwesome5 name="shopping-cart" size={18} color="white" />
            {cart.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cart.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      {activeTab === 'home' && renderHome()}
      {activeTab === 'bomb' && renderBomb()}
      {activeTab === 'info' && renderInfo()}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, activeTab === 'home' && styles.navItemActive]}
          onPress={() => setActiveTab('home')}
        >
          <MaterialIcons name="home" size={24} color={activeTab === 'home' ? '#ec4899' : '#999'} />
          <Text style={[styles.navLabel, activeTab === 'home' && styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'bomb' && styles.navItemActive]}
          onPress={() => setActiveTab('bomb')}
        >
          <MaterialIcons name="edit" size={24} color={activeTab === 'bomb' ? '#ec4899' : '#999'} />
          <Text style={[styles.navLabel, activeTab === 'bomb' && styles.navLabelActive]}>Bomb</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'info' && styles.navItemActive]}
          onPress={() => setActiveTab('info')}
        >
          <MaterialIcons name="info" size={24} color={activeTab === 'info' ? '#ec4899' : '#999'} />
          <Text style={[styles.navLabel, activeTab === 'info' && styles.navLabelActive]}>Info</Text>
        </TouchableOpacity>
      </View>

      {/* Cart Modal */}
      {renderCartModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 3,
    borderBottomColor: '#fecaca',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dc2626',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tokenBadge: {
    backgroundColor: '#fca5a5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tokenText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#dc2626',
  },
  cartButton: {
    position: 'relative',
    padding: 10,
    backgroundColor: '#ec4899',
    borderRadius: 12,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#fbbf24',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#dc2626',
  },
  tabContent: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#dc2626',
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
    color: '#666',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#fce7f3',
    alignItems: 'center',
  },
  tagContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  tag: {
    fontSize: 8,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    color: 'white',
  },
  tagHoje: {
    backgroundColor: '#10b981',
  },
  tagEncomenda: {
    backgroundColor: '#f59e0b',
  },
  productEmoji: {
    fontSize: 32,
    marginBottom: 6,
  },
  productName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  productType: {
    fontSize: 10,
    color: '#999',
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ec4899',
  },
  bombSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bombTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#dc2626',
  },
  bombForm: {
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#fecaca',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  bombInput: {
    borderWidth: 2,
    borderColor: '#fca5a5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 4,
  },
  hint: {
    fontSize: 10,
    color: '#999',
    marginBottom: 12,
  },
  pickerContainer: {
    marginBottom: 12,
  },
  pickerOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    marginBottom: 6,
  },
  pickerOptionActive: {
    borderColor: '#ec4899',
    backgroundColor: '#fce7f3',
  },
  pickerOptionText: {
    fontSize: 12,
    color: '#333',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  colorOption: {
    width: '32%',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  colorOptionActive: {
    borderColor: '#ec4899',
  },
  colorText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
  },
  decorationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  decoOption: {
    width: '48%',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  decoOptionActive: {
    borderColor: '#ec4899',
  },
  decoText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  visualizationTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  bombVisualization: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  bombItem: {
    backgroundColor: '#fca5a5',
    borderWidth: 2,
    borderColor: '#f43f5e',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  bombItemText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#be123c',
  },
  bombSummary: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#fce7f3',
  },
  summaryText: {
    fontSize: 12,
    color: '#333',
    marginBottom: 8,
  },
  summaryNumber: {
    fontWeight: 'bold',
    color: '#dc2626',
  },
  bombTotalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 12,
  },
  addBombButton: {
    backgroundColor: 'linear-gradient(135deg, #dc2626 0%, #ec4899 100%)',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 12,
  },
  addBombButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  emptyBomb: {
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginTop: 16,
  },
  emptyBombText: {
    color: '#999',
    fontSize: 14,
  },
  infoSection: {
    padding: 16,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#ec4899',
  },
  infoIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff5f7',
    paddingHorizontal: 20,
  },
  loginTitle: {
    fontSize: 60,
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#fca5a5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 14,
    backgroundColor: 'white',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#dc2626',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggleAuthText: {
    color: '#dc2626',
    fontWeight: '600',
    marginTop: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingBottom: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItemActive: {
    backgroundColor: '#fef2f2',
  },
  navLabel: {
    fontSize: 10,
    marginTop: 4,
    color: '#999',
  },
  navLabelActive: {
    color: '#ec4899',
    fontWeight: '600',
  },
  cartModalContainer: {
    flex: 1,
    backgroundColor: '#fff5f7',
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'linear-gradient(135deg, #dc2626 0%, #ec4899 100%)',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 14,
    color: '#999',
  },
  cartItems: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#fce7f3',
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  cartItemQty: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  cartItemMsg: {
    fontSize: 9,
    color: '#dc2626',
    marginTop: 2,
  },
  cartItemRight: {
    alignItems: 'flex-end',
  },
  cartItemPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ec4899',
  },
  removeButton: {
    marginTop: 6,
  },
  removeButtonText: {
    fontSize: 10,
    color: '#dc2626',
    fontWeight: '600',
  },
  cartSummary: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 2,
    borderTopColor: '#ddd',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: '#ddd',
    marginTop: 12,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dc2626',
  },
  paymentButton: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 12,
  },
  paymentButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});
