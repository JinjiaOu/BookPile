import { OrderDetails } from '../types';
import '../assets/css/ConfirmationTable.css';

interface ConfirmationTableProps {
    orderDetails: OrderDetails;
}

function ConfirmationTable({ orderDetails }: ConfirmationTableProps) {
    const calculateSubtotal = () => {
        return orderDetails.lineItems.reduce((total, item) => {
            const book = orderDetails.books.find(b => b.bookId === item.bookId);
            return total + (book?.price ?? 0) * item.quantity;
        }, 0);
    };

    const subtotal = calculateSubtotal();
    const tax = subtotal * 0.08; // 8% tax
    const surcharge = 5.00; // $5.00 fixed surcharge
    const total = subtotal + tax + surcharge;

    return (
        <table className="confirmation_table">
            <thead>
            <tr className="confirmation_tr">
                <th className="confirmation_td">Book</th>
                <th className="confirmation_td">Author</th>
                <th className="confirmation_td">Quantity</th>
                <th className="confirmation_td">Price</th>
            </tr>
            </thead>
            <tbody>
            {orderDetails.lineItems.map((item) => {
                const book = orderDetails.books.find(b => b.bookId === item.bookId);
                if (!book) return null;

                return (
                    <tr className="confirmation_tr" key={item.bookId}>
                        <td className="confirmation_td">{book.title}</td>
                        <td className="confirmation_td">{book.author}</td>
                        <td className="confirmation_td">{item.quantity}</td>
                        <td className="confirmation_td">${(book.price * item.quantity).toFixed(2)}</td>
                    </tr>
                );
            })}
            <tr className="confirmation_tr">
                <td className="confirmation_td" colSpan={3}><b>Subtotal:</b></td>
                <td className="confirmation_td">${subtotal.toFixed(2)}</td>
            </tr>
            <tr className="confirmation_tr">
                <td className="confirmation_td" colSpan={3}><b>Tax (8%):</b></td>
                <td className="confirmation_td">${tax.toFixed(2)}</td>
            </tr>
            <tr className="confirmation_tr">
                <td className="confirmation_td" colSpan={3}><b>Surcharge:</b></td>
                <td className="confirmation_td">${surcharge.toFixed(2)}</td>
            </tr>
            <tr className="confirmation_tr total-row">
                <td className="confirmation_td" colSpan={3}><b>Total:</b></td>
                <td className="confirmation_td">${total.toFixed(2)}</td>
            </tr>
            </tbody>
        </table>
    );
}

export default ConfirmationTable;