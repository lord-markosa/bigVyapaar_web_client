import React, { useState, useEffect } from "react";
import "./AddressForm.scss"; // Import the SCSS file
import { getAddress, setAddress as setAddressLocally } from "../utils/address";

const AddressForm = ({ address, setAddress }) => {
    const [saveEnabled, setSaveEnabled] = useState(false);

    useEffect(() => {
        // Retrieve address from localStorage when the component mounts
        const storedAddress = getAddress();
        if (storedAddress) {
            setAddress(storedAddress);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
        setSaveEnabled(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Store address in localStorage
        setAddressLocally(address);
        setSaveEnabled(false);
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <label>City</label>
            <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleChange}
                placeholder="Delhi"
            />
            <label>State</label>
            <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleChange}
                placeholder="CA"
            />
            <label>ZIP Code</label>
            <input
                type="text"
                name="zip"
                value={address.zip}
                onChange={handleChange}
                placeholder="12345"
            />
            <div className="button-container">
                <button type="submit" disabled={!saveEnabled}>
                    Save Address
                </button>
            </div>
        </form>
    );
};

export default AddressForm;
