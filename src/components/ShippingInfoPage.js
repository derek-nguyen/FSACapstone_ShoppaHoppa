import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const ShippingInfoPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [company, setCompany] = useState('');
    const [emailMe, setEmailMe] = useState(false);
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [shippingOption, setShippingOption] = useState('');
    const [sameAsShipping, setSameAsShipping] = useState(false);
    const [billingFirstName, setBillingFirstName] = useState('');
    const [billingLastName, setBillingLastName] = useState('');
    const [billingAddressLine1, setBillingAddressLine1] = useState('');
    const [billingAddressLine2, setBillingAddressLine2] = useState('');
    const [billingCity, setBillingCity] = useState('');
    const [billingState, setBillingState] = useState('');
    const [billingZipCode, setBillingZipCode] = useState('');

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            addressLine1,
            addressLine2,
            city,
            state,
            zipCode,
            country,
            region,
        };
        console.log(formData);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setAddressLine1('');
        setAddressLine2('');
        setCity('');
        setState('');
        setZipCode('');
        setCompany('');
        setCountry('');
        setRegion('');
    };

    const stateOptions = [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming',
    ];

    const countryOptions = ['United States', 'US Outlying Territories', 'Canada'];

    const handleShippingOptionClick = (option) => {
        setShippingOption(option);
    };

    const handleSameAsShippingChange = (event) => {
        setSameAsShipping(event.target.checked);
        if (event.target.checked) {
            setBillingFirstName(firstName);
            setBillingLastName(lastName);
            setBillingAddressLine1(addressLine1);
            setBillingAddressLine2(addressLine2);
            setBillingCity(city);
            setBillingState(state);
            setBillingZipCode(zipCode);
        } else {
            setBillingFirstName('');
            setBillingLastName('');
            setBillingAddressLine1('');
            setBillingAddressLine2('');
            setBillingCity('');
            setBillingState('');
            setBillingZipCode('');
        }
    };

    return (
        <div className="shipping-info-container">
            <h1 className="shipping-centered-heading">Shipping Information</h1>
            <form className="shipping-info-form" onSubmit={handleSubmit}>
                <div>
                    <h2>Contact:</h2>
                </div>
                <div className="shipping-form-group">
                    <input
                        type="email"
                        id="email"
                        className="email-form-input"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                    />
                </div>
                <div className="shipping-form-group">
                    <input
                        type="checkbox"
                        id="emailMe"
                        className="email-checkbox-input"
                        checked={emailMe}
                        onChange={(e) => setEmailMe(e.target.checked)}
                    />
                    <label htmlFor="emailMe" className="checkbox-label">
                        Email me with news and products
                    </label>
                </div>
                <div>
                    <h2>Shipping Address:</h2>
                </div>
                <div className="shipping-form-group">
                    <select
                        id="country"
                        className="country-form-input country-input"
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        <option value="">Select Country/Region</option>
                        {countryOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="name-grid-container">
                    <div className="shipping-grid-item-left">
                        <div className="shipping-form-group">
                            <input
                                type="text"
                                id="firstName"
                                className="firstNam-form-input"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First Name"
                            />
                        </div>
                    </div>
                    <div className="shipping-grid-item-right">
                        <div className="shipping-form-group">
                            <input
                                type="text"
                                id="lastName"
                                className="lastName-form-input"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name"
                            />
                        </div>
                    </div>
                </div>
                <div className="shipping-form-group">
                    <input
                        type="text"
                        id="addressLine1"
                        className="add1-form-input"
                        required
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        placeholder="Address Line 1"
                    />
                </div>
                <div className="shipping-form-group">
                    <input
                        type="text"
                        id="addressLine2"
                        className="add2-form-input"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        placeholder="APT, Unit, Suite #"
                    />
                </div>
                <div className="location-grid-container">
                    <div className="shipping-form-group">
                        <input
                            type="text"
                            id="city"
                            className="city-form-input city-input"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="City"
                        />
                    </div>
                    <div className="shipping-form-group">
                        <select
                            id="state"
                            className="state-form-input state-input"
                            required
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        >
                            <option value="">Select State</option>
                            {stateOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="shipping-form-group">
                        <input
                            type="text"
                            id="zipCode"
                            className="zip-form-input zip-input"
                            required
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            placeholder="ZIP Code"
                        />
                    </div>
                </div>
                <div className="shipping-form-group">
                    <input
                        type="tel"
                        id="phoneNumber"
                        className="phoneNumber-form-input"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone Number"
                    />
                </div>


                <div>
                    <h2>Billing Address:</h2>
                </div>
                <div className="shipping-form-group">
                    <input
                        type="checkbox"
                        id="sameAsShipping"
                        className="billing-checkbox-input"
                        checked={sameAsShipping}
                        onChange={handleSameAsShippingChange}
                    />
                    <label htmlFor="sameAsShipping" className="checkbox-label">
                        Same as Shipping Address
                    </label>
                </div>
                {!sameAsShipping && (
                    <div>
                        <div className="shipping-form-group">
                            <input
                                type="text"
                                id="billingFirstName"
                                className="billing-form-input"
                                required
                                value={billingFirstName}
                                onChange={(e) => setBillingFirstName(e.target.value)}
                                placeholder="First Name"
                            />
                        </div>
                        <div className="shipping-form-group">
                            <input
                                type="text"
                                id="billingLastName"
                                className="billing-form-input"
                                required
                                value={billingLastName}
                                onChange={(e) => setBillingLastName(e.target.value)}
                                placeholder="Last Name"
                            />
                        </div>
                        <div className="shipping-form-group">
                            <input
                                type="text"
                                id="billingAddressLine1"
                                className="billing-form-input"
                                required
                                value={billingAddressLine1}
                                onChange={(e) => setBillingAddressLine1(e.target.value)}
                                placeholder="Address Line 1"
                            />
                        </div>
                        <div className="shipping-form-group">
                            <input
                                type="text"
                                id="billingAddressLine2"
                                className="billing-form-input"
                                value={billingAddressLine2}
                                onChange={(e) => setBillingAddressLine2(e.target.value)}
                                placeholder="APT, Unit, Suite #"
                            />
                        </div>
                        <div className="location-grid-container">
                            <div className="shipping-form-group">
                                <input
                                    type="text"
                                    id="billingCity"
                                    className="billing-form-input"
                                    required
                                    value={billingCity}
                                    onChange={(e) => setBillingCity(e.target.value)}
                                    placeholder="City"
                                />
                            </div>
                            <div className="shipping-form-group">
                                <select
                                    id="billingState"
                                    className="state-input"
                                    required
                                    value={billingState}
                                    onChange={(e) => setBillingState(e.target.value)}
                                >
                                    <option value="">Select State</option>
                                    {stateOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="shipping-form-group">
                                <input
                                    type="text"
                                    id="billingZipCode"
                                    className="billing-form-input"
                                    required
                                    value={billingZipCode}
                                    onChange={(e) => setBillingZipCode(e.target.value)}
                                    placeholder="ZIP Code"
                                />
                            </div>
                        </div>
                    </div>
                )}
                <div className="shipping-option-container">
                    <div className="shipping-option" onClick={() => handleShippingOptionClick('ground')}>
                        <label htmlFor="groundOption">
                            <span>Ground (Free)</span>
                            <input
                                type="checkbox"
                                id="groundOption"
                                className="shipping-checkbox-input"
                                checked={shippingOption === 'ground'}
                                onChange={() => handleShippingOptionClick('ground')}
                            />
                        </label>
                    </div>
                    <div className="shipping-option" onClick={() => handleShippingOptionClick('2ndDay')}>
                        <label htmlFor="secondDayOption">
                            <span>2nd Day ($15)</span>
                            <input
                                type="checkbox"
                                id="secondDayOption"
                                className="shipping-checkbox-input"
                                checked={shippingOption === '2ndDay'}
                                onChange={() => handleShippingOptionClick('2ndDay')}
                            />
                        </label>
                    </div>
                    <div className="shipping-option" onClick={() => handleShippingOptionClick('overnight')}>
                        <label htmlFor="overnightOption">
                            <span>Overnight ($25)</span>
                            <input
                                type="checkbox"
                                id="overnightOption"
                                className="shipping-checkbox-input"
                                checked={shippingOption === 'overnight'}
                                onChange={() => handleShippingOptionClick('overnight')}
                            />
                        </label>
                    </div>
                </div>
            </form>
            <button className="billing-button" type="submit" onClick={() => history.push('/checkout/payment')}>
                Proceed to payment
            </button>

        </div>
    );
};

export default ShippingInfoPage;
