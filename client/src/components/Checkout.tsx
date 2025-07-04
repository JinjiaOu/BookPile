import React, { FormEvent, ChangeEvent, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { CartTypes } from '../reducers/CartReducer';
import { CustomerForm, OrderDetails, months, years } from '../types';
import { isCreditCard, isMobilePhone, isvalidEmail } from '../utils';
import { OrderDetailsStore } from '../contexts/OrderDetailContext';
import axios from 'axios';
import type { AxiosError } from 'axios';

function Checkout() {
    const navigate = useNavigate();
    const { cart, dispatch: cartDispatch } = useCart();
    const { dispatch: orderDispatch } = useContext(OrderDetailsStore);
    const TAX_RATE = 0.08;

    const [formData, setFormData] = useState<CustomerForm>({
        name: '',
        address: '',
        phone: '',
        email: '',
        ccNumber: '',
        ccExpiryMonth: new Date().getMonth() + 1,
        ccExpiryYear: new Date().getFullYear()
    });

    const [errors, setErrors] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        ccNumber: ''
    });

    const [checkoutStatus, setCheckoutStatus] = useState('');

    // Your existing validation methods...
    const isValidForm = () => {
        const newErrors = {
            name: validateField('name', formData.name),
            address: validateField('address', formData.address),
            phone: validateField('phone', formData.phone),
            email: validateField('email', formData.email),
            ccNumber: validateField('ccNumber', formData.ccNumber)
        };

        setErrors(newErrors);
        return Object.values(newErrors).every(error => !error);
    };

    const validateField = (name: string, value: string) => {
        switch (name) {
            case 'name':
                if (!value) return 'Name is required';
                if (value.length < 4 || value.length > 45) {
                    return 'Name must be between 4 and 45 characters';
                }
                break;
            case 'address':
                if (!value) return 'Address is required';
                if (value.length < 4 || value.length > 45) {
                    return 'Address must be between 4 and 45 characters';
                }
                break;
            case 'phone':
                if (!value) return 'Phone is required';
                if (!isMobilePhone(value)) {
                    return 'Please enter a valid phone number';
                }
                break;
            case 'email':
                if (!value) return 'Email is required';
                if (!isvalidEmail(value)) {
                    return 'Please enter a valid email address';
                }
                break;
            case 'ccNumber':
                if (!value) return 'Credit card number is required';
                if (!isCreditCard(value)) {
                    return 'Please enter a valid credit card number';
                }
                break;
            default:
                return '';
        }
        return '';
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name in errors) {
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + (item.book.price * item.quantity), 0);
    };

    const calculateTax = () => {
        return calculateSubtotal() * TAX_RATE;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax();
    };

    const placeOrder = async (customerForm: CustomerForm) => {
        console.log('Original cart:', cart);

        const transformedCart = {
            itemArray: cart.map(item => ({
                id: item.book.bookId,
                quantity: item.quantity,
                book: {
                    bookId: item.book.bookId,
                    title: item.book.title,
                    author: item.book.author,
                    price: item.book.price,
                    isPublic: true,
                    categoryId: item.book.categoryId
                }
            }))
        };

        const order = {
            customerForm: {
                name: customerForm.name,
                address: customerForm.address,
                phone: customerForm.phone.replace(/\D/g, ''),
                email: customerForm.email,
                ccNumber: customerForm.ccNumber.replace(/\D/g, ''),
                ccExpiryMonth: customerForm.ccExpiryMonth,
                ccExpiryYear: customerForm.ccExpiryYear
            },
            cart: transformedCart
        };

        console.log('Final order payload:', order);

        try {
            const response = await axios.post<OrderDetails>('/JinjiaBookstoreReactTransact/api/orders', order, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            // Clear the cart
            cartDispatch({
                type: CartTypes.CLEAR,
                book: {
                    bookId: 0,
                    title: '',
                    author: '',
                    price: 0,
                    isPublic: false,
                    categoryId: 0
                }
            });

            return response.data;
        } catch (err: unknown) {
            const error = err as AxiosError;
            console.error('Order submission error:', error);
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error('Error response:', error.response.data);
                    console.error('Error status:', error.response.status);
                }
            }
            return null;
        }
    };

    const submitOrder = async (event: FormEvent) => {
        event.preventDefault();
        console.log("Submit order");
        const isFormCorrect = isValidForm();
        console.log(isFormCorrect);

        if (!isFormCorrect) {
            setCheckoutStatus("ERROR");
        } else {
            setCheckoutStatus("PENDING");
            const orderDetails = await placeOrder({
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                ccNumber: formData.ccNumber,
                ccExpiryMonth: formData.ccExpiryMonth,
                ccExpiryYear: formData.ccExpiryYear,
            });

            if (orderDetails) {
                setCheckoutStatus("OK");
                // Save order details to context
                orderDispatch({ type: 'UPDATE', payload: orderDetails });
                navigate('/confirmation');
            } else {
                console.log("Error placing order");
                setCheckoutStatus("ERROR");
            }
        }
    };

    if (cart.length === 0) {
        return (
            <div className="co-container">
                <h1>Checkout</h1>
                <div className="co-empty-cart">
                    <p>Your cart is empty. Please add items before checking out.</p>
                    <button className="co-btn secondary" onClick={() => navigate('/')}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="co-container">
            <h1>Checkout</h1>
            <div className="co-content">
                <form onSubmit={submitOrder} className="co-form" method="post">
                    <div className="co-form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        {errors.name && <span className="co-error">{errors.name}</span>}
                    </div>

                    <div className="co-form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                        {errors.address && <span className="co-error">{errors.address}</span>}
                    </div>

                    <div className="co-form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                        {errors.phone && <span className="co-error">{errors.phone}</span>}
                    </div>

                    <div className="co-form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <span className="co-error">{errors.email}</span>}
                    </div>

                    <div className="co-form-group">
                        <label htmlFor="ccNumber">Credit Card Number</label>
                        <input
                            id="ccNumber"
                            name="ccNumber"
                            type="text"
                            value={formData.ccNumber}
                            onChange={handleInputChange}
                        />
                        {errors.ccNumber && <span className="co-error">{errors.ccNumber}</span>}
                    </div>

                    <div className="co-form-group">
                        <label>Exp. Date</label>
                        <div className="co-expiry-inputs">
                            <select
                                name="ccExpiryMonth"
                                value={formData.ccExpiryMonth}
                                onChange={handleInputChange}
                            >
                                {months.map((month, i) => (
                                    <option key={i} value={i + 1}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                            <select
                                name="ccExpiryYear"
                                value={formData.ccExpiryYear}
                                onChange={handleInputChange}
                            >
                                {years.map((year) => (
                                    <option key={year} value={new Date().getFullYear() + year}>
                                        {new Date().getFullYear() + year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </form>

                <div className="co-order-summary">
                    <h2>Order Summary</h2>
                    <div className="co-cart-items">
                        {cart.map((item) => (
                            <div key={item.id} className="co-cart-item">
                                <div className="co-item-info">
                                    <span>{item.book.title}</span>
                                    <span className="co-quantity-price">
                                        <span className="co-quantity">{item.quantity}</span>
                                        <span className="co-multiply">×</span>
                                        <span className="co-price">${item.book.price.toFixed(2)}</span>
                                    </span>
                                </div>
                                <div className="co-item-total">
                                    ${(item.book.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="co-order-totals">
                        <div className="co-subtotal">
                            <span>Subtotal</span>
                            <span>${calculateSubtotal().toFixed(2)}</span>
                        </div>
                        <div className="co-tax">
                            <span>Tax (8%)</span>
                            <span>${calculateTax().toFixed(2)}</span>
                        </div>
                        <div className="co-surcharge">
                            <span>Surcharge</span>
                            <span>$5.00</span>
                        </div>
                        <div className="co-total">
                            <span>Total</span>
                            <span>${(calculateTotal() + 5).toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="co-btn"
                        onClick={submitOrder}
                        disabled={checkoutStatus === 'PENDING'}
                    >
                        {checkoutStatus === 'PENDING' ? 'Processing...' : 'Complete Purchase'}
                    </button>

                    {checkoutStatus === 'ERROR' && (
                        <div className="co-error-message">
                            Please fix the problems above and try again.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Checkout;