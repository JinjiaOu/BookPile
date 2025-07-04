
import React, { createContext, useReducer, Dispatch } from 'react';
import { OrderDetails, ContextProps } from '../types';

type OrderDetailAction =
    | { type: 'UPDATE'; payload: OrderDetails }
    | { type: 'CLEAR' };

type OrderDetailContextType = {
    orderDetails: OrderDetails | null;
    dispatch: Dispatch<OrderDetailAction>;
};

const initialState: OrderDetails | null = null;

export const OrderDetailsStore = createContext<OrderDetailContextType>({
    orderDetails: null,
    dispatch: () => null,
});

function orderDetailReducer(state: OrderDetails | null, action: OrderDetailAction): OrderDetails | null {
    switch (action.type) {
        case 'UPDATE':
            return action.payload;
        case 'CLEAR':
            return null;
        default:
            return state;
    }
}

export function OrderDetailsProvider({ children }: ContextProps) {
    const [orderDetails, dispatch] = useReducer(orderDetailReducer, initialState);

    return (
        <OrderDetailsStore.Provider value={{ orderDetails, dispatch }}>
            {children}
        </OrderDetailsStore.Provider>
    );
}