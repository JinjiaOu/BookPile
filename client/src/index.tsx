import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CategoryProvider } from './contexts/CategoryContext';
import { CartProvider } from './contexts/CartContext';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <CategoryProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </CategoryProvider>
    </React.StrictMode>
);

reportWebVitals();