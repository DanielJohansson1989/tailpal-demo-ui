import React, { useState, useEffect } from 'react';
import '../css/PetList.css';
import '../App.css';
import { useNavigate, useLocation } from 'react-router-dom';

function PetList({ petData, setPetData, vaccinationData, setVaccinationData }) {
    const [vaccine, setVaccineData] = useState([]);
    const [pets, setPets] = useState([]);
    const [selectedPets, setSelectedPets] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const fetchVaccine = () => {
        setLoading(true);
        fetch('https://localhost:7154/vaccinations').then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            setVaccineData(data);
            setLoading(false);
        })
        .catch(error => {
            console.error("Det uppstod ett fel vid hämtning av djuren!", error);
            setLoading(false);
        });
    }

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
        // Fetch pets only if coming from BankID and petData is not already loaded
        if (location.state?.fromBankID && !petData) {
            fetchPets();
            fetchVaccine();
        } else if (location.state?.fromBankID || location.state?.fromDashBoard && petData) {
            setPets(petData); // If petData exists, use it
            setVaccineData(vaccinationData);
            console.log("Entering else if has petdata");
        }

    }, [location.state, petData]); // Combine dependencies into a single array

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
        navigate('/bankid');
    };

    const handleConfirmClick = () => {
        // Assuming you want to navigate to a confirmation or home page
        navigate('/'); // Change this to the desired path for confirmation
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
                <button onClick={handleConfirmClick} className="update-button">Confirm</button>
                <p>{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
            </footer>
        </div>
    );
}

export default PetList;