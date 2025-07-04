import React from 'react';
// Import all book images
import harryPotterImg from '../assets/images/books/harry-potter.jpg';
import learnImproveImg from '../assets/images/books/learn-improve.jpg';
import shawshankImg from '../assets/images/books/shawshank.jpg';
import deathByFountainImg from '../assets/images/books/death-by-fountain.jpg';
import housemaidSecretImg from '../assets/images/books/The-Housemaid\'s-Secret.jpg';
import whoCouldEverLoveYouImg from '../assets/images/books/Who-Could-Ever-Love-You-A-Family-Memoir.jpg';
import sevenHusbandsImg from '../assets/images/books/The-Seven-Husbands-of-Evelyn-Hugo.jpg';
import perfectCoupleImg from '../assets/images/books/The-Perfect-Couple.jpg';

interface HomePageBook {
    id: number;
    img: string;
    title: string;
    author: string;
    price: number;
    is_public: boolean;
}

function BooksSection() {
    // Static list of featured books
    const books: HomePageBook[] = [
        {
            id: 1,
            img: harryPotterImg,
            title: "Harry Potter and the Sorcerer's Stone",
            author: "J. K. Rowling",
            price: 9.99,
            is_public: true
        },
        {
            id: 2,
            img: learnImproveImg,
            title: "Learn, Improve, Master",
            author: "Nick Velasquez",
            price: 0.99,
            is_public: true
        },
        {
            id: 3,
            img: shawshankImg,
            title: "Rita Hayworth and Shawshank Redemption",
            author: "Stephen King",
            price: 5.99,
            is_public: true
        },
        {
            id: 4,
            img: deathByFountainImg,
            title: "Death by Fountain",
            author: "Jennifer S. Alderson",
            price: 4.99,
            is_public: true
        },
        {
            id: 5,
            img: housemaidSecretImg,
            title: "The Housemaid's Secret",
            author: "Freida McFadden",
            price: 0,
            is_public: true
        },
        {
            id: 6,
            img: whoCouldEverLoveYouImg,
            title: "Who Could Ever Love You",
            author: "Mary L. Trump",
            price: 13.56,
            is_public: true
        },
        {
            id: 7,
            img: sevenHusbandsImg,
            title: "The Seven Husbands of Evelyn Hugo",
            author: "Taylor Jenkins Reid",
            price: 19.99,
            is_public: true
        },
        {
            id: 8,
            img: perfectCoupleImg,
            title: "The Perfect Couple",
            author: "Elin Hilderbrand",
            price: 6.54,
            is_public: true
        },
    ];

    return (
        <section className="books-section">
            <h2>Top Of the Day</h2>
            <div className="book-grid">
                {books.map(book => (
                    <div key={book.id} className="book-item">
                        <img
                            src={book.img}
                            alt={book.title}
                            className="book-image"
                        />
                        <h3>{book.title}</h3>
                        <p className="author">by {book.author}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default BooksSection;