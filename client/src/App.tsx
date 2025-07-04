import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';
import Header from './components/Header';
import CTASection from './components/CTASection';
import BooksSection from './components/BooksSection';
import CategoryBookList from './components/CategoryBookList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import ConfirmationPage from './components/ConfirmationPage';
import { OrderDetailsProvider } from './contexts/OrderDetailContext';
import './assets/css/global.css';
import './assets/css/header.css';
import './assets/css/footer.css';
import './assets/css/content.css';
import './assets/css/responsive.css';
import './assets/css/checkout.css';

function App() {
    return (
        <OrderDetailsProvider>
            <Router
                basename="/JinjiaBookstoreReactTransact"
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            >
                <div className="wrapper">
                    <Header />
                    <Routes>
                        <Route path="/" element={
                            <>
                                <CTASection />
                                <BooksSection />
                            </>
                        } />

                        <Route path="categories">
                            <Route index element={<CategoryBookList />} />
                            <Route path=":id" element={<CategoryBookList />} />
                        </Route>

                        <Route path="cart" element={<Cart />} />
                        <Route path="checkout" element={<Checkout />} />
                        <Route path="confirmation" element={<ConfirmationPage />} />
                        <Route path="*" element={<div>Page Not Found</div>} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </OrderDetailsProvider>
    );
}

export default App;