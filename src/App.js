import React, { useState } from 'react';
import './App.css';
import './components/OwnersList.css';

function App() {
    const [owners, setOwners] = useState([]);
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchOwners = () => {
        setLoading(true);
        fetch('https://localhost:7254/owners')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setOwners(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Det uppstod ett fel vid hämtning av ägarna!", error);
                setLoading(false);
            });
    };

    const handleOwnerClick = (ownerId) => {
        setSelectedOwner(ownerId);
    };

    const handleUpdateClick = () => {
        fetchOwners();
    };

    return (
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
            <main>
                <div className="owners-list">
                    <h2>Välj pass att visa:</h2>
                    <div className="list-container">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            owners.map(owner => (
                                <div 
                                    key={owner.ownerId}
                                    className={`owner-item ${selectedOwner === owner.ownerId ? 'selected' : ''}`} 
                                    onClick={() => handleOwnerClick(owner.ownerId)}
                                >
                                    <input 
                                        type="radio" 
                                        name="owner" 
                                        checked={selectedOwner === owner.ownerId} 
                                        readOnly 
                                    />
                                    <label>
                                        {owner.firstName} {owner.lastName}
                                    </label>
                                    <ul>
                                        {owner.pets.map(pet => (
                                            <li key={pet.chipId}>
                                                {pet.petName} (Chip ID: {pet.chipId})
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <footer className="footer">
                    <button onClick={handleUpdateClick} className="update-button">Update</button>
                    <p>{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
                </footer>
            </main>
        </div>
    );
}

export default App;

