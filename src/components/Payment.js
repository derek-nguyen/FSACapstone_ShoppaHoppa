import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CheckoutButton } from '../components';

const Payment = (props) => {
    const {user,product, setProducts, sessionId} = props;
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCVV] = useState('');

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Perform payment processing or validation here
        // You can access the card information from the state variables

        // Redirect to the confirmation page after successful payment
        history.push('/confirmation');
    };

    return (
        <div className="payment-container">
            <h1>Payment Information</h1>
            <form className="payment-form" onSubmit={handleSubmit}>
                <div className="payment-form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                        type="text"
                        id="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="Card Number"
                        disabled
                    />
                </div>
                <div className="payment-form-group">
                    <label htmlFor="cardHolder">Card Holder</label>
                    <input
                        type="text"
                        id="cardHolder"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="Enter card holder name"
                        disabled
                    />
                </div>
                <div className="payment-form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                        type="text"
                        id="expiryDate"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="MM/YYYY"
                        disabled
                    />
                </div>
                <div className="payment-form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                        type="text"
                        id="cvv"
                        value={cvv}
                        onChange={(e) => setCVV(e.target.value)}
                        placeholder="Enter CVV"
                        disabled
                    />
                </div>
                {/* <CheckoutButton /> */}
                <CheckoutButton user={user} product={product} setProducts={setProducts} sessionId={sessionId}  />
                {/* <button className='last-checkout-button'>Submit</button> */}

            </form>
        </div>
    );
};
 
export default Payment;
