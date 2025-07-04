import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../contexts/CategoryContext';

function CTASection() {
    const navigate = useNavigate();
    const { categories } = useCategories();

    const handleShopNowClick = () => {
        if (categories.length > 0) {
            navigate(`/categories/${categories[0].name}`);
        }
    };

    return (
        <section className="cta-section">
            <div className="cta-container">
                <h1>Welcome to Book Pile</h1>
                <p>Your favorite place for books!</p>
                <button className="cta-button" onClick={handleShopNowClick}>
                    Shop Now
                </button>
            </div>
        </section>
    );
}

export default CTASection;