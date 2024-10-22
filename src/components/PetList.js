import React, { useContext, useState } from 'react';
import '../css/PetList.css';
import '../App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { PetContext } from './PetContext'; // Import the context

function PetList() {
  const { petData, vaccinationData, loading, dateTime } = useContext(PetContext); // Access global data from context
  const [selectedPets, setSelectedPets] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

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
    navigate('/petid', { state: { selectedPets } }); // Pass selectedPets to PetId 
  }

  return (
    <div className="owners-list">
      <h2>Välj djur att visa:</h2>
      <div className="list-container">
        {/* Display saved petData */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          petData && petData.length > 0 ? (
            petData.flatMap(owner => owner.pets).map(pet => (
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
          ) : (
            <p>No pets data available. Please click Update to fetch the data.</p>
          )
        )}
      </div>


      <footer style={{ position: 'absolute', bottom: '0', left: '0', right: '0' }} className="footer">
        <div className='button-container'>
        <button onClick={handleUpdateClick} className="update-button">Update</button>
        <button onClick={handleConfirmClick} className="update-button">Confirm</button>
        </div>
        <p>{dateTime.date} {dateTime.time}</p>
      </footer>
    </div>
  );
}

export default PetList;