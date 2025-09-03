import React, { useState } from 'react';
import './FoodOrderingSystem.css';

const FoodOrderingSystem = () => {
  // Sample food data
  const foodItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Classic pizza with tomato sauce, mozzarella, and fresh basil",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      name: "Burger & Fries",
      description: "Juicy beef patty with lettuce, tomato, and crispy fries",
      price: 10.99,
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      name: "Caesar Salad",
      description: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      name: "Sushi Platter",
      description: "Assorted sushi with salmon, tuna, and California rolls",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 5,
      name: "Chocolate Brownie",
      description: "Rich chocolate brownie with vanilla ice cream",
      price: 6.99,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 6,
      name: "Grilled Salmon",
      description: "Fresh grilled salmon with steamed vegetables and rice",
      price: 16.99,
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    }
  ];

  // State for cart items
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem.quantity === 1) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => 
        item.id === id 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ));
    }
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="container">
      <header>
        <h1 className="app-title">FoodExpress</h1>
        <p className="app-subtitle">Delicious food delivered to your door</p>
      </header>
      
      <div className="content">
        <section className="menu-section">
          <h2 className="section-title">Our Menu</h2>
          <div className="food-grid">
            {foodItems.map(item => (
              <div key={item.id} className="food-card">
                <img src={item.image} alt={item.name} className="food-image" />
                <div className="food-info">
                  <h3 className="food-name">{item.name}</h3>
                  <p className="food-description">{item.description}</p>
                  <p className="food-price">${item.price.toFixed(2)}</p>
                  <button 
                    className="add-button"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="cart-section">
          <h2 className="section-title">Your Order</h2>
          <div className="cart-container">
            <div className="cart-title">
              <i className="fas fa-shopping-cart cart-icon"></i>
              <span>Cart ({cart.reduce((total, item) => total + item.quantity, 0)} items)</span>
            </div>
            
            <div className="cart-items">
              {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty. Add some delicious food!</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-details">
                      <div className="item-name">{item.name}</div>
                      <div className="item-price">${item.price.toFixed(2)} × {item.quantity}</div>
                    </div>
                    <div className="item-quantity">
                      <button 
                        className="quantity-btn"
                        onClick={() => removeFromCart(item.id)}
                      >-</button>
                      <span>{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => addToCart(item)}
                      >+</button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {cart.length > 0 && (
              <>
                <div className="cart-total">
                  <span className="total-label">Total:</span>
                  <span className="total-amount">${totalPrice.toFixed(2)}</span>
                </div>
                <button className="checkout-btn">Proceed to Checkout</button>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FoodOrderingSystem;