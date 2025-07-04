import React, { createContext, Dispatch, useReducer, useContext, useEffect } from "react";
import { cartReducer, CartAction, initialCartState } from "../reducers/CartReducer";
import { ShoppingCartItem } from "../types";

type CartContextType = {
    cart: ShoppingCartItem[];
    dispatch: Dispatch<CartAction>;
}

const storageKey = 'cart';

export const CartStore = createContext<CartContextType>({
    cart: initialCartState,
    dispatch: () => null
});

CartStore.displayName = 'CartContext';

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, dispatch] = useReducer(
        cartReducer,
        initialCartState,
        (initialState) => {
            try {
                const storedCart = JSON.parse(localStorage.getItem(storageKey) || '[]');
                return storedCart as ShoppingCartItem[] || initialState;
            } catch (error) {
                console.log('Error parsing cart', error);
                return initialState;
            }
        }
    );

    // Update localStorage whenever cart changes
    useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(cart));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }, [cart]);

    return (
        <CartStore.Provider value={{ cart, dispatch }}>
            {children}
        </CartStore.Provider>
    );
}

export const useCart = () => useContext(CartStore);