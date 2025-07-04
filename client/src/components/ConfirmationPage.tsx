import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { OrderDetailsStore } from "../contexts/OrderDetailContext";
import ConfirmationTable from "./ConfirmationTable";
import '../assets/css/confirmation.css';

function ConfirmationPage() {
    const { orderDetails } = useContext(OrderDetailsStore);
    const navigate = useNavigate();

    if (!orderDetails) {
        return (
            <div className="confirmationView">
                <h1>Order Confirmation</h1>
                <p>No order details found.</p>
                <button
                    onClick={() => navigate('/')}
                    className="continue-shopping"
                >
                    Return to Homepage
                </button>
            </div>
        );
    }

    return (
        <div className="confirmationView">
            <h1>Order Confirmation</h1>
            <ul>
                <li>Confirmation Number: {orderDetails.order.confirmationNumber}</li>
                <li>Order Date: {new Date(orderDetails.order.dateCreated).toLocaleString()}</li>
            </ul>

            <ConfirmationTable orderDetails={orderDetails} />

            <div className="customer-info">
                <h2>Customer Information</h2>
                <ul>
                    <li><b>Name:</b> {orderDetails.customer.customerName}</li>
                    <li><b>Address:</b> {orderDetails.customer.address}</li>
                    <li><b>Email:</b> {orderDetails.customer.email}</li>
                    <li><b>Phone:</b> {orderDetails.customer.phone}</li>
                    <li><b>Credit Card:</b> ****-****-****-{orderDetails.customer.ccNumber.slice(-4)}</li>
                </ul>
            </div>

            <button
                onClick={() => navigate('/')}
                className="continue-shopping"
            >
                Continue Shopping
            </button>
        </div>
    );
}

export default ConfirmationPage;