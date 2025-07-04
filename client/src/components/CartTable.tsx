import React from 'react';
import { useCart } from '../contexts/CartContext';
import { CartTypes } from '../reducers/CartReducer';
import { BookItem } from '../types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import "../assets/css/CartTable.css";

// Import all book images
import shawshankImg from '../assets/images/books/shawshank.jpg';
import deathByFountainImg from '../assets/images/books/death-by-fountain.jpg';
import fahrenheit451Img from '../assets/images/books/Fahrenheit-451.jpg';
import jurassicParkImg from '../assets/images/books/Jurassic-Park.jpg';
import balladImg from '../assets/images/books/The-Ballad-of-Songbirds-and-Snakes.jpg';
import allSystemsRedImg from '../assets/images/books/All-Systems-Red.jpg';
import theRoadImg from '../assets/images/books/The-Road.jpg';
import starWarsImg from '../assets/images/books/Star-Wars-Jedi-Battle-Scars.jpg';
import catsCradleImg from '../assets/images/books/Cat\'s-Cradle.jpg';
import houceofImg from '../assets/images/books/House-of-Sky-and-Breath.jpg';
import whocouldImg from '../assets/images/books/Who-Could-Ever-Love-You-A-Family-Memoir.jpg';
import sevenhusImg from '../assets/images/books/The-Seven-Husbands-of-Evelyn-Hugo.jpg';
import emmaImg from '../assets/images/books/emma.jpg';
import flatImg from '../assets/images/books/Flatland.jpg';
import houseofleaveImg from '../assets/images/books/House-of-Leaves.jpg';
import remainImg from '../assets/images/books/The-Remains-of-the-Day.jpg';
import esatImg from '../assets/images/books/East-of-Eden.jpg';
import scarletImg from '../assets/images/books/The-Scarlet-Letter.jpg';
import thesunImg from '../assets/images/books/The-Sun-Also-Rises.jpg';
import harryImg from '../assets/images/books/harry-potter.jpg';
import housemaidImg from '../assets/images/books/The-Housemaid\'s-Secret.jpg';
import perfectImg from '../assets/images/books/The-Perfect-Couple.jpg';
import hobbitImg from '../assets/images/books/The-Hobbit.jpg';
import gameofthronesImg from '../assets/images/books/A-Game-of-Thrones.jpg';
import thenameImg from '../assets/images/books/The-Name-of-the-Wind.jpg';
import MistbornImg from '../assets/images/books/Mistborn-The-Final-Empire.jpg';
import EragonImg from '../assets/images/books/Eragon.jpg';
import thewayImg from '../assets/images/books/The-Way-of-Kings.jpg';
import learnimproveImg from '../assets/images/books/learn-improve.jpg';
import SapiensImg from '../assets/images/books/Sapiens-A-Brief-History-of-Humankind.jpg';
import EducatedImg from '../assets/images/books/Educated.jpg';
import AtomicImg from '../assets/images/books/Atomic-Habits.jpg';
import thepowerImg from '../assets/images/books/The-Power-of-Habit.jpg';
import BecomingImg from '../assets/images/books/Becoming.jpg';
import OutliersImg from '../assets/images/books/Outliers-The-Story-of-Success.jpg';
import TheSubtleImg from '../assets/images/books/The-Subtle-Art-of-Not-Giving-a-Fuck.jpg';
import TheDiaryImg from '../assets/images/books/The-Diary-of-a-Young-Girl.jpg';
import TheWrightImg from '../assets/images/books/The-Wright-Brothers.jpg';
import teamofRivalsImg from '../assets/images/books/Team-of-Rivals-The-Political-Genius-of-Abraham-Lincoln.jpg';
import onesevenImg from '../assets/images/books/1776.jpg';
import TheGunsImg from '../assets/images/books/The-Guns-of-August.jpg';
import AlexanderImg from '../assets/images/books/Alexander-Hamilton.jpg';
import TheSilkImg from '../assets/images/books/The-Silk-Roads-A-New-History-of-the-World.jpg';

function CartTable() {
    const { cart, dispatch } = useCart();

    const handleIncrement = (book: BookItem) => {
        dispatch({ type: CartTypes.ADD, book });
    };

    const handleDecrement = (book: BookItem) => {
        dispatch({ type: CartTypes.REMOVE, book });
    };

    const handleRemove = (book: BookItem) => {
        const item = cart.find(item => item.id === book.bookId);
        if (item) {
            for (let i = 0; i < item.quantity; i++) {
                dispatch({ type: CartTypes.REMOVE, book });
            }
        }
    };

    const getBookImageUrl = (book: BookItem): string => {
        const bookImages: { [key: string]: string } = {
            // Science Fiction
            "Rita Hayworth and Shawshank Redemption ": shawshankImg,
            "Death by Fountain": deathByFountainImg,
            "Fahrenheit 451": fahrenheit451Img,
            "Jurassic Park": jurassicParkImg,
            "The Ballad of Songbirds and Snakes": balladImg,
            "All Systems Red": allSystemsRedImg,
            "The Road": theRoadImg,
            "Cat's Cradle": catsCradleImg,
            "Star Wars Jedi: Battle Scars": starWarsImg,
            "House of Sky and Breath": houceofImg,

            //Romance
            "Who Could Ever Love You": whocouldImg,
            "The Seven Husbands of Evelyn Hugo": sevenhusImg,
            "Emma": emmaImg,
            "Flatland": flatImg,
            "House of Leaves": houseofleaveImg,
            "The Remains of the Day": remainImg,
            "East of Eden": esatImg,
            "The Scarlet Letter": scarletImg,
            "The Sun Also Rises": thesunImg,

            //Fantasy
            "Harry Potter and the Sorcerer's Stone": harryImg,
            "The Housemaid's Secret": housemaidImg,
            "The Perfect Couple": perfectImg,
            "The Hobbit": hobbitImg,
            "A Game of Thrones": gameofthronesImg,
            "The Name of the Wind": thenameImg,
            "Mistborn: The Final Empire": MistbornImg,
            "Eragon": EragonImg,
            "The Way of Kings": thewayImg,

            //Non-fiction
            "Learn, Improve, Master": learnimproveImg,
            "Sapiens: A Brief History of Humankind": SapiensImg,
            "Educated": EducatedImg,
            "Atomic Habits": AtomicImg,
            "The Power of Habit": thepowerImg,
            "Becoming": BecomingImg,
            "Outliers: The Story of Success": OutliersImg,
            "The Subtle Art of Not Giving a F*ck": TheSubtleImg,

            //Historical
            "The Diary of a Young Girl": TheDiaryImg,
            "The Wright Brothers": TheWrightImg,
            "Team of Rivals: The Political Genius of Abraham Lincoln": teamofRivalsImg,
            "1776": onesevenImg,
            "The Guns of August": TheGunsImg,
            "Alexander Hamilton": AlexanderImg,
            "The Silk Roads: A New History of the World": TheSilkImg,
        };

        return bookImages[book.title] || harryImg;
    };

    return (
        <div className="cart-container">
            <div className="cart-header">
                <div className="header-book">Book</div>
                <div className="header-price" style={{ textAlign: 'right' }}>Price</div>
                <div className="header-quantity" style={{ textAlign: 'center' }}>Quantity</div>
                <div className="header-total" style={{ textAlign: 'right' }}>Total</div>
                <div className="header-actions"></div>
            </div>
            <div className="cart-items">
                {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                        <div className="item-book">
                            <img
                                src={getBookImageUrl(item.book)}
                                alt={item.book.title}
                                className="book-image"
                            />
                            <div className="book-info">
                                <h3 className="book-title">{item.book.title}</h3>
                                <p className="book-author">by {item.book.author}</p>
                            </div>
                        </div>
                        <div className="item-price" style={{ textAlign: 'right' }}>
                            ${item.book.price.toFixed(2)}
                        </div>
                        <div className="item-quantity" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <button
                                className="quantity-btn"
                                style={{ marginRight: '1rem' }}
                                aria-label="Decrease quantity"
                                onClick={() => handleDecrement(item.book)}
                            >
                                <FontAwesomeIcon icon={faMinusCircle} />
                            </button>
                            <span className="quantity-value" style={{ margin: '0 1rem' }}>{item.quantity}</span>
                            <button
                                className="quantity-btn"
                                style={{ marginLeft: '1rem' }}
                                aria-label="Increase quantity"
                                onClick={() => handleIncrement(item.book)}
                            >
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </button>
                        </div>
                        <div className="item-total" style={{ textAlign: 'right' }}>
                            ${(item.book.price * item.quantity).toFixed(2)}
                        </div>
                        <button
                            className="remove-item-btn"
                            onClick={() => handleRemove(item.book)}
                            aria-label="Remove item"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CartTable;