import React, { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';

// 自定义CartItem类型，不依赖于mockData中的Game类型
interface CartGame {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  discountPrice?: number;
  developer?: string;
  publisher?: string;
}

interface CartItem extends CartGame {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (game: CartGame) => void;
  removeFromCart: (gameId: string) => void;
  updateQuantity: (gameId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // 从本地存储加载购物车数据
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 计算总数量和总价格
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => {
    const price = item.discountPrice || item.price;
    return total + price * item.quantity;
  }, 0);

  // 当购物车变化时保存到本地存储
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 添加游戏到购物车
  const addToCart = (game: CartGame) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === game.id);
      
      if (existingItem) {
        // 如果游戏已在购物车中，增加数量
        message.success(`已将 ${game.title} 的数量增加到 ${existingItem.quantity + 1}`);
        return prevItems.map(item =>
          item.id === game.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // 如果游戏不在购物车中，添加新项
        message.success(`已将 ${game.title} 添加到购物车`);
        return [...prevItems, { ...game, quantity: 1 }];
      }
    });
  };

  // 从购物车移除游戏
  const removeFromCart = (gameId: string) => {
    setCartItems(prevItems => {
      const gameToRemove = prevItems.find(item => item.id === gameId);
      if (gameToRemove) {
        message.success(`已将 ${gameToRemove.title} 从购物车移除`);
      }
      return prevItems.filter(item => item.id !== gameId);
    });
  };

  // 更新游戏数量
  const updateQuantity = (gameId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(gameId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === gameId ? { ...item, quantity } : item
      )
    );
  };

  // 清空购物车
  const clearCart = () => {
    setCartItems([]);
    message.success('购物车已清空');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};