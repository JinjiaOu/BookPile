import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CategoryBookListItem from './CategoryBookListItem';
import { useCategories } from '../contexts/CategoryContext';

interface Book {
    bookId: number;
    title: string;
    author: string;
    description: string | null;
    price: number;
    rating: number;
    is_public: boolean;
    is_featured: boolean;
    category_id: number;
}

function CategoryBookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const { id } = useParams();
    const { categories } = useCategories();

    useEffect(() => {
        if (id) {
            localStorage.setItem('lastVisitedCategory', id);
            const categoryName = id.replace(/\s+/g, '');
            console.log('Fetching books for category:', categoryName);

            axios.get(`/JinjiaBookstoreReactTransact/api/categories/name/${categoryName}/books`)
                .then((result) => {
                    console.log('Raw API response:', result.data);
                    setBooks(result.data);
                })
                .catch((error) => {
                    console.error('Error fetching books:', error);
                });
        }
    }, [id]);

    return (
        <main className="category-section">
            <h1 style={{ textAlign: 'center' }}>{id} Books</h1>
            <div className="book-grid">
                {books.map((book) => (
                    <CategoryBookListItem
                        key={book.bookId}
                        book={book}
                    />
                ))}
            </div>
        </main>
    );
}

export default CategoryBookList;