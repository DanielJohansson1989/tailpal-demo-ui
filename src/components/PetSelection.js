import React, { useState } from 'react';
import './App.css';
import './components/OwnersList.css';

function PetSelection() {
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

    return(
        <>
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
                <footer style={{ position: 'absolute', bottom: '0', left: '0', right: '0' }} className="footer">
                    <button onClick={handleUpdateClick} className="update-button">Update</button>
                    <p>{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
                </footer>
        </>
    );
}

export default PetSelection;