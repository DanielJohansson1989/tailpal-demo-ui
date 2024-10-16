import React from 'react';
import './bankId.css'



const BankID = () => {
    
    const handleLegitimation = () => {
        alert('Du har legitimerat dig!'); 
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