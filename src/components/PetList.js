import React, { useState, useEffect } from 'react';
import '../css/PetList.css';
import '../App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import App from '../App';

function PetList({ petData, setPetData }) {
    const [pets, setPets] = useState([]);
    const [selectedPets, setSelectedPets] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

      
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
    
    
    useEffect(() => {
        if (location.state?.fromBankID) {
            if (!petData) {
                fetchPets(); // Only fetch if no data exists
            }
        }
    }, [petData],[location.state]);

    const handlePetClick = (chipId) => {
        setSelectedPets(prevSelected => {
            if (prevSelected.includes(chipId)) {
                return prevSelected.filter(id => id !== chipId);
            } else {
                return [...prevSelected, chipId];
            }
        });
    };

    const navigate = useNavigate();

    const handleUpdateClick = () => {
        
            navigate('/bankid');
    };

    // const onConfirm = () {
    //     navigate('/')
    // }

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
                <button onClick={handleUpdateClick} className="update-button">Confirm</button>
                <p>{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
            </footer>
        </div>
    );
}

export default PetList;