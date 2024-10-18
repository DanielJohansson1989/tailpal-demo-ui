import React, { useContext } from 'react';
import '../css/BankId.css'
import { useNavigate } from 'react-router-dom';
import { PetContext } from './PetContext'; // Import the context



const BankID = () => {
    const {updateData} = useContext(PetContext);
    const navigate = useNavigate();
    const handleLegitimation = () => {
        updateData();
        navigate('/petlist', { state: { fromBankID: true } });
    };

    return (
        <div className="bank-id-container">
            <img 
                src="https://www.bankid.com/assets/bankid/logo/BankID_logo.png" 
                alt="Bank-ID Logo" 
                style={{ width: '300px', marginBottom: '20px' }} 
            />

            <p>Skydda ditt BankID
                <br />
            Använd aldrig ditt BankID på uppmaning av <br /> någon som kontaktar dig.</p>
            <button onClick={handleLegitimation}>Legitimera dig</button>
        </div>
    );
};

export default BankID;