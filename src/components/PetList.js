import React, { useState } from 'react';
import './PetList.css';

function PetList() {
    const [pets, setPets] = useState([]);
    const [selectedPets, setSelectedPets] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPets = () => {
        setLoading(true);
        fetch('https://localhost:7254/pets')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setPets(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Det uppstod ett fel vid hämtning av djuren!", error);
                setLoading(false);
            });
    };

    const handlePetClick = (chipId) => {
        setSelectedPets(prevSelected => {
            if (prevSelected.includes(chipId)) {
                return prevSelected.filter(id => id !== chipId);
            } else {
                return [...prevSelected, chipId];
            }
        });
    };

    const handleUpdateClick = () => {
        fetchPets();
    };

    return (
        <div className="owners-list">
            <h2>Välj djur att visa:</h2>
            <div className="list-container">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    pets.map(pet => (
                        <div 
                            key={pet.chipId}
                            className={`owner-item ${selectedPets.includes(pet.chipId) ? 'selected' : ''}`}
                        >
                            <button 
                                className={`pet-toggle-button ${selectedPets.includes(pet.chipId) ? 'active' : ''}`} 
                                onClick={() => handlePetClick(pet.chipId)}
                            >
                                {pet.petName} (Chip ID: {pet.chipId})
                            </button>
                        </div>
                    ))
                )}
            </div>
            <footer style={{ position: 'absolute', bottom: '0', left: '0', right: '0' }} className="footer">
                <button onClick={handleUpdateClick} className="update-button">Update</button>
                <p>{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
            </footer>
        </div>
    );
}

export default PetList;
