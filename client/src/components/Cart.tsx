import React from 'react';
import { useNavigate } from 'react-router-dom';
import CartTable from './CartTable';
import { useCart } from '../contexts/CartContext';
import { CartTypes } from '../reducers/CartReducer';
import { BookItem } from '../types';

function Cart() {
    const navigate = useNavigate();
    const { cart, dispatch } = useCart();

    const handleClearCart = () => {
        dispatch({ type: CartTypes.CLEAR, book: {} as BookItem });
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const handleContinueShopping = () => {
        // Get the last visited category from localStorage
        const lastCategory = localStorage.getItem('lastVisitedCategory');
        if (lastCategory) {
            navigate(`/categories/${lastCategory}`);
        } else {
            // If no last category, go to home page
            navigate('/');
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.book.price * item.quantity), 0);
    };

    const calculateTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    if (cart.length === 0) {
        return (
            <div className="container">
                <h1>Shopping Cart (0 books)</h1>
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <button
                        className="cart-btn secondary"
                        onClick={handleContinueShopping}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Shopping Cart ({calculateTotalItems()} {calculateTotalItems() === 1 ? 'book' : 'books'})</h1>
            <CartTable />
            <div className="cart-summary">
                <div className="cart-total">
                    <span>Total ({calculateTotalItems()} {calculateTotalItems() === 1 ? 'item' : 'items'}):</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="cart-main-actions">
                    <button
                        className="cart-btn secondary"
                        onClick={handleContinueShopping}
                    >
                        Continue Shopping
                    </button>
                    <button
                        className="cart-btn checkout"
                        onClick={handleCheckout}
                    >
                        Proceed to Checkout
                    </button>
                </div>
                <div className="cart-secondary-actions">
                    <button
                        className="clear-cart"
                        onClick={handleClearCart}
                    >
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;