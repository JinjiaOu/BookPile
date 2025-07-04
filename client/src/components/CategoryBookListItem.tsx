import React from 'react';
import { useCart } from '../contexts/CartContext';
import { CartTypes } from '../reducers/CartReducer';
import { BookItem } from '../types';
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

interface CategoryBookListItemProps {
    book: {
        bookId: number;
        title: string;
        author: string;
        description: string | null;
        price: number;
        rating: number;
        is_public: boolean;
        is_featured: boolean;
        category_id: number;
    };
}

function CategoryBookListItem({ book }: CategoryBookListItemProps) {
    const { dispatch } = useCart();

    const addBookToCart = () => {
        console.log('Original book from database:', book);

        // Create a categories map based on your database
        const bookCategoryMap: { [key: string]: number } = {
            // Science Fiction (1001)
            "Rita Hayworth and Shawshank Redemption ": 1001,
            "Death by Fountain": 1001,
            "Fahrenheit 451": 1001,
            "Jurassic Park": 1001,
            "The Ballad of Songbirds and Snakes": 1001,
            "All Systems Red": 1001,
            "The Road": 1001,
            "Cat's Cradle": 1001,
            "Star Wars Jedi: Battle Scars": 1001,
            "House of Sky and Breath": 1001,

            // Romance (1002)
            "Who Could Ever Love You": 1002,
            "The Seven Husbands of Evelyn Hugo": 1002,
            "Emma": 1002,
            "Flatland": 1002,
            "House of Leaves": 1002,
            "The Remains of the Day": 1002,
            "East of Eden": 1002,
            "The Scarlet Letter": 1002,
            "The Sun Also Rises": 1002,

            // Fantasy (1003)
            "Harry Potter and the Sorcerer's Stone": 1003,
            "The Housemaid's Secret": 1003,
            "The Perfect Couple": 1003,
            "The Hobbit": 1003,
            "A Game of Thrones": 1003,
            "The Name of the Wind": 1003,
            "Mistborn: The Final Empire": 1003,
            "Eragon": 1003,
            "The Way of Kings": 1003,

            // Non-fiction (1004)
            "Learn, Improve, Master": 1004,
            "Sapiens: A Brief History of Humankind": 1004,
            "Educated": 1004,
            "Atomic Habits": 1004,
            "The Power of Habit": 1004,
            "Becoming": 1004,
            "Outliers: The Story of Success": 1004,
            "The Subtle Art of Not Giving a F*ck": 1004,

            // Historical (1005)
            "The Diary of a Young Girl": 1005,
            "The Wright Brothers": 1005,
            "Team of Rivals: The Political Genius of Abraham Lincoln": 1005,
            "1776": 1005,
            "The Guns of August": 1005,
            "Alexander Hamilton": 1005,
            "The Silk Roads: A New History of the World": 1005
        };

        // Map the database fields to BookItem interface
        const bookItem: BookItem = {
            bookId: book.bookId,
            title: book.title,
            author: book.author,
            price: book.price,
            isPublic: book.is_public,
            categoryId: book.category_id || bookCategoryMap[book.title] || 0
        };

        console.log('Mapped book item:', bookItem);

        // Validate before dispatch
        if (!bookItem.categoryId) {
            console.error('Warning: Missing categoryId for book:', book.title);
            // Use the backup mapping if category_id is missing
            bookItem.categoryId = bookCategoryMap[book.title];
            console.log('Applied backup category:', bookItem.categoryId);
        }

        dispatch({ type: CartTypes.ADD, book: bookItem });
    };

    // Create image mapping with exact database titles
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

    const getBookImage = () => {
        // Log available image mappings
        console.log('Available image mappings:', Object.keys(bookImages));

        // Try to find the image
        const image = bookImages[book.title];
        console.log('Found image:', image);

        return image || '/placeholder.jpg';
    };

    // Format price display
    const formatPrice = (price: number) => {
        if (price === 0) return "Free";
        return `$${price.toFixed(2)}`;
    };

    return (
        <div className="book-item">
            <img
                src={getBookImage()}
                alt={book.title}
                onError={(e) => {
                    console.error('Image failed to load for:', book.title);
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/placeholder.jpg';
                }}
                className="book-image"
            />
            <h3>{book.title}</h3>
            <p className="author">by {book.author}</p>
            <p className="price">{formatPrice(book.price)}</p>
            <button className="button shop-now-button">Shop Now</button>
            <button className="button add-to-cart-button" onClick={addBookToCart}>Add to Cart</button>
            {book.price === 0 && (
                <button className="button read-now-button">Read Now</button>
            )}
        </div>
    );
}

export default CategoryBookListItem;