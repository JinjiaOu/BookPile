import { ShoppingCartItem, BookItem } from "../types";

export const CartTypes = {
    ADD: 'ADD' as const,
    REMOVE: 'REMOVE' as const,
    CLEAR: 'CLEAR' as const
} as const;

type CartActionType = typeof CartTypes[keyof typeof CartTypes];

export type CartAction = {
    type: CartActionType;
    book: BookItem;
}

export const initialCartState: ShoppingCartItem[] = [];

export const cartReducer = (state: ShoppingCartItem[], action: CartAction) => {
    console.log('CartReducer - Current state:', state);
    console.log('CartReducer - Action:', action);

    switch (action.type) {
        case CartTypes.ADD: {
            const existingItemIndex = state.findIndex(
                cartItem => cartItem.id === action.book.bookId
            );

            if (existingItemIndex >= 0) {
                // Item exists, increment quantity
                const newState = [...state];
                newState[existingItemIndex] = {
                    ...newState[existingItemIndex],
                    quantity: newState[existingItemIndex].quantity + 1
                };
                console.log('Updated state (existing item):', newState);
                return newState;
            } else {
                // Create new item
                const newItem = new ShoppingCartItem(action.book);
                console.log('New item created:', newItem);
                return [...state, newItem];
            }
        }

        case CartTypes.REMOVE: {
            const existingItemIndex = state.findIndex(
                cartItem => cartItem.id === action.book.bookId
            );

            if (existingItemIndex >= 0) {
                const existingItem = state[existingItemIndex];

                if (existingItem.quantity > 1) {
                    // If quantity > 1, decrement quantity
                    const newState = [...state];
                    newState[existingItemIndex] = {
                        ...existingItem,
                        quantity: existingItem.quantity - 1
                    };
                    console.log('Updated state (decremented quantity):', newState);
                    return newState;
                } else {
                    // If quantity is 1, remove the item completely
                    const newState = state.filter(item => item.id !== action.book.bookId);
                    console.log('Updated state (removed item):', newState);
                    return newState;
                }
            }
            // If item not found, return state unchanged
            return state;
        }

        case CartTypes.CLEAR: {
            console.log('Clearing cart');
            return [];
        }

        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};