import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Dashboard.css';

<div className="App">
<header className="App-header">
    <span>        
        <img src="https://static.wixstatic.com/media/bb9651_c18982779dea4131bb1d1cd239a30924~mv2.png/v1/fill/w_80,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/TailPal_Black_green.png" className="tailpal-logo" alt="logo" />
    </span>
    <span className='timeContainer'>10:00</span>
    <span>
        <i className='fa-solid fa-bars' id='hamburgerIcon'></i>
    </span>
</header>
</div>




const Dashboard = () => {

    const navigate = useNavigate();
    const options = [
        { name: 'ID', icon: 'fa-regular fa-user', path: '/bankid' }, 
        { name: 'Hälsa', icon: 'fa-solid fa-heart-pulse' }, 
        { name: 'Meriter', icon: 'fa-solid fa-medal' }, 
        { name: 'Försäkring', icon: 'fa-regular fa-file-lines' }, 
        { name: 'Journal', icon: 'fa-solid fa-book-open' }, 
        { name: 'SOS', icon: 'fa-solid fa-truck-medical' } 
    ];

    const handleOptionClick = (path) => {
        if (path) {
            navigate(path);
        }
    }

    return (
        <div className="icon-container">
        {options.map((option, index) => (
            <div key={index} className="icon-item" onClick={() => handleOptionClick(option.path)}>
                <div className="icon-circle">
                    <i className={`fas ${option.icon}`} style={{ fontSize: '3em' }}></i>
                </div>
            <p>{option.name}</p>
            </div>
        ))}
        </div>
    );
};



export default Dashboard;