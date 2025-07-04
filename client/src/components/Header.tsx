import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../contexts/CategoryContext';
import { useCart } from '../contexts/CartContext';
import logoImage from '../assets/images/Logo.jpg';
import cartImage from '../assets/images/cart.jpg';

function Header() {
    const { categories, formatDisplayName } = useCategories();
    const { cart } = useCart();

    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    console.log('Header - Current cart:', cart);
    console.log('Header - Cart quantity:', cartQuantity);

    return (
        <>
            <header className="header">
                <div className="main-nav">
                    <div className="logo">
                        <Link to="/">
                            <img src={logoImage} alt="Book Pile Logo" />
                            <h1 className="site-name">Book Pile</h1>
                        </Link>
                    </div>

                    <div className="search-bar">
                        <input type="text" placeholder="Search" />
                        <i className="fas fa-search"></i>
                    </div>

                    <div className="nav-links">
                        <div className="user-dropdown">
                            <button className="user-button">Account</button>
                            <ul className="dropdown-menu">
                                <li><Link to="#">Register</Link></li>
                                <li><Link to="#">Login</Link></li>
                            </ul>
                        </div>

                        <div className="category-dropdown">
                            <button className="category-button">Category</button>
                            <ul className="category-dropdown-menu">
                                {categories.map((category) => (
                                    <li key={category.categoryId}>
                                        <Link to={`/categories/${category.name}`}>
                                            {formatDisplayName(category.name)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link to="/cart" style={{ textDecoration: 'none' }}>
                            <button className="cart-button">
                                <img src={cartImage} alt="Shopping Cart" className="cart-logo" />
                                <span className="cart-count">{cartQuantity}</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </header>

            <nav className="category-nav">
                {categories.map((category) => (
                    <Link
                        key={category.categoryId}
                        to={`/categories/${category.name}`}
                        className="category-link"
                    >
                        {formatDisplayName(category.name)}
                    </Link>
                ))}
            </nav>
        </>
    );
}

export default Header;