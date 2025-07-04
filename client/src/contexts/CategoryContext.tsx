import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { CategoryItem } from '../types';

interface CategoryContextType {
    categories: CategoryItem[];
    formatDisplayName: (name: string) => string;
}

export const Category = createContext<CategoryContextType>({
    categories: [],
    formatDisplayName: (name: string) => name
});

Category.displayName = 'CategoryContext';

export function CategoryProvider({ children }: { children: React.ReactNode }) {
    const [categories, setCategories] = useState<CategoryItem[]>([]);

    const formatDisplayName = (name: string) => {
        switch(name) {
            case "ScienceFiction":
                return "Science Fiction";
            case "Non-fiction":
                return "Non-fiction";
            default:
                return name;
        }
    };

    useEffect(() => {
        axios.get('/JinjiaBookstoreReactTransact/api/categories')
            .then((result) => {
                console.log('Categories loaded:', result.data);
                setCategories(result.data);
            })
            .catch(error => {
                console.error('Error loading categories:', error);
            });
    }, []);

    return (
        <Category.Provider value={{ categories, formatDisplayName }}>
            {children}
        </Category.Provider>
    );
}

export const useCategories = () => {
    const context = useContext(Category);
    if (context === undefined) {
        throw new Error('useCategories must be used within a CategoryProvider');
    }
    return context;
};

export default Category;