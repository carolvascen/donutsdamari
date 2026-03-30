// packages/firebase/services.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { auth, db } from './config';

// ============================================
// AUTENTICAÇÃO
// ============================================

export const createUser = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Criar documento de usuário no Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: email,
      name: name,
      tokens: 0,
      createdAt: new Date(),
      cart: [],
      orders: [],
    });

    return user;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw error;
  }
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// ============================================
// DADOS DO USUÁRIO
// ============================================

export const getUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    throw error;
  }
};

export const updateUserData = async (uid, data) => {
  try {
    await updateDoc(doc(db, 'users', uid), data);
  } catch (error) {
    console.error('Erro ao atualizar dados do usuário:', error);
    throw error;
  }
};

// ============================================
// CARRINHO
// ============================================

export const addToCart = async (uid, item) => {
  try {
    const cartItem = {
      id: `${item.id}-${Date.now()}`,
      ...item,
      addedAt: new Date(),
    };

    await updateDoc(doc(db, 'users', uid), {
      cart: arrayUnion(cartItem),
    });

    return cartItem;
  } catch (error) {
    console.error('Erro ao adicionar ao carrinho:', error);
    throw error;
  }
};

export const removeFromCart = async (uid, itemId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    const cart = userDoc.data().cart || [];
    const itemToRemove = cart.find((item) => item.id === itemId);

    if (itemToRemove) {
      await updateDoc(doc(db, 'users', uid), {
        cart: arrayRemove(itemToRemove),
      });
    }
  } catch (error) {
    console.error('Erro ao remover do carrinho:', error);
    throw error;
  }
};

export const clearCart = async (uid) => {
  try {
    await updateDoc(doc(db, 'users', uid), {
      cart: [],
    });
  } catch (error) {
    console.error('Erro ao limpar carrinho:', error);
    throw error;
  }
};

export const getCart = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.data()?.cart || [];
  } catch (error) {
    console.error('Erro ao buscar carrinho:', error);
    throw error;
  }
};

// ============================================
// TOKENS / FIDELIDADE
// ============================================

export const addTokens = async (uid, amount) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    const currentTokens = userDoc.data()?.tokens || 0;

    await updateDoc(doc(db, 'users', uid), {
      tokens: currentTokens + amount,
    });
  } catch (error) {
    console.error('Erro ao adicionar tokens:', error);
    throw error;
  }
};

export const useTokens = async (uid, amount) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    const currentTokens = userDoc.data()?.tokens || 0;

    if (currentTokens >= amount) {
      await updateDoc(doc(db, 'users', uid), {
        tokens: currentTokens - amount,
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao usar tokens:', error);
    throw error;
  }
};

export const getTokens = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.data()?.tokens || 0;
  } catch (error) {
    console.error('Erro ao buscar tokens:', error);
    throw error;
  }
};

// ============================================
// PEDIDOS
// ============================================

export const createOrder = async (uid, orderData) => {
  try {
    const orderId = `order-${Date.now()}`;
    const order = {
      id: orderId,
      uid: uid,
      ...orderData,
      status: 'pendente',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Salvar pedido na coleção orders
    await setDoc(doc(db, 'orders', orderId), order);

    // Adicionar referência ao usuário
    await updateDoc(doc(db, 'users', uid), {
      orders: arrayUnion(orderId),
    });

    // Adicionar tokens (1 token por real gasto)
    const totalSpent = orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await addTokens(uid, Math.floor(totalSpent / 1));

    return order;
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    throw error;
  }
};

export const getOrders = async (uid) => {
  try {
    const q = query(collection(db, 'orders'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    await updateDoc(doc(db, 'orders', orderId), {
      status: status,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Erro ao atualizar status do pedido:', error);
    throw error;
  }
};

// ============================================
// PRODUTOS (Catálogo)
// ============================================

export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const q = query(collection(db, 'products'), where('category', '==', category));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Erro ao buscar produtos por categoria:', error);
    throw error;
  }
};

// ============================================
// ANALYTICS / RASTREAMENTO
// ============================================

export const trackEvent = async (event, data) => {
  try {
    await setDoc(doc(db, 'analytics', `${event}-${Date.now()}`), {
      event,
      ...data,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Erro ao rastrear evento:', error);
  }
};
