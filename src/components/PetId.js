import React, { useState, useContext } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useLocation } from 'react-router-dom';
import { PetContext } from './PetContext'; // Import the PetContext
import '../css/PetId.css';
import '../css/VaccinationsList.css';

function PetId() {
  const { petData } = useContext(PetContext); // Get petData from the context
  const { vaccinationData } = useContext(PetContext);
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [showVaccineCard, setShowVaccineCard] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [swiping, setSwiping] = useState(false);
  const location = useLocation();
  const selectedPets = location.state?.selectedPets || []; 

  // Filter the petData based on selectedPets
  const filteredAnimals = petData.filter(pet => selectedPets.includes(pet.chipId));
  const currentAnimal = filteredAnimals.length > 0 ? filteredAnimals[currentAnimalIndex] : null;

  // Swipe Handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentAnimalIndex < filteredAnimals.length - 1 && !swiping) {
        setSwiping(true);
        setAnimationClass('slide-left');
        setCurrentAnimalIndex(currentAnimalIndex + 1);

        setTimeout(() => {
          setAnimationClass('');
        }, 500);
      }
    },
    onSwipedRight: () => {
      if (currentAnimalIndex > 0 && !swiping) {
        setSwiping(true);
        setAnimationClass('slide-right');
        setCurrentAnimalIndex(currentAnimalIndex - 1);

        setTimeout(() => {
          setAnimationClass('');
        }, 500);
      }
    },
    onSwiped: () => {
      setTimeout(() => setSwiping(false), 500);
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const toggleView = () => setShowVaccineCard(!showVaccineCard);

  return (
    <div {...handlers} className="swipe-container">
        <div className="animal-info">
          {currentAnimal ? (
            <>
              <div className={`title ${animationClass}`}>
                {/* <h2>{currentAnimal.petName}</h2>  Adjusted to use petName */}
                <div className='first-row'>
                  <div>
                    <img className='pet-pic' src="https://hundarlangtarhem.se/wp-content/uploads/2022/11/SIXTEN.jpg" alt="Pet Photo" />
                  </div>
                    <div className='box'>
                      <ul className='list-unstyled d-flex flex-column align-items-start'>
                        <li>Chip Id:&nbsp;<strong>{currentAnimal.chipId}</strong></li>
                        <li>Date of Chip:&nbsp;<strong>{currentAnimal.dateOfChip.slice(0,-9)}</strong></li>
                        <li>Chip Location:&nbsp;<strong>{currentAnimal.chipLoc}</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
              <div className={`info-content ${animationClass}`}>
                <div>
                  {showVaccineCard ? (
                    <div className="vaccination-list">
                      <div className="card">
                        <div className="card-header">
                          <h3>Vaccinationer</h3>
                        </div>
                        <div className="card-content">
                          {vaccinationData.map((vaccination) => (
                          <div key={vaccinationData.vaccinationId} className="vaccination-row">
                            <div className="info-column">
                              <h4><i className="fas fa-syringe"></i> Vaccination</h4>
                              <p>{vaccinationData.vaccineName || 'Ingen typ'}</p>
                            </div>
                            <div className="info-column">
                              <h4><i className="fas fa-calendar-alt"></i> Datum</h4>
                              <p>
                                {vaccinationData.dateOfVaccination ? 
                                  `Från: ${new Date(vaccination.dateOfVaccination).toLocaleDateString()}` : 
                                  'Ingen datum'}<br />
                                  {vaccinationData.validUntil ? 
                                  `Till: ${new Date(vaccination.validUntil).toLocaleDateString()}` : 
                                  'Inget slutdatum'}
                              </p>
                            </div>
                            <div className="info-column">
                              <h4><i className="fas fa-hospital"></i> Klinik och Veterinär</h4>
                              <p>
                                {vaccinationData.vetLoc || 'Ingen klinik'}<br />
                                {vaccinationData.vetName || 'Ingen veterinär'}
                              </p>
                            </div>
                            <div className="info-column">
                              <h4><i className="fas fa-vial"></i> Batch</h4>
                              <p>{vaccinationData.batch || 'Ingen batch'}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  ) : (
                    <div className='pet-info'>
                      <div className='box'>
                        <ul className='list-unstyled d-flex flex-column align-items-start'>
                          <li>Pet Name:&nbsp;<strong>{currentAnimal.petName}</strong></li>
                          <li>Species:&nbsp;<strong>{currentAnimal.species}</strong></li>
                          <li>Breed:&nbsp;<strong>{currentAnimal.breed}</strong></li>
                          <li>Sex:&nbsp;<strong>{currentAnimal.sex}</strong></li>
                          <li>Date of Birth:&nbsp;<strong>{currentAnimal.dateOfBirth.slice(0,-9)}</strong></li>
                          <li>Color:&nbsp;<strong>{currentAnimal.color}</strong></li>
                        </ul>
                      </div>
                      <div className='box'>
                        <h5>Owner</h5>
                      </div>
                  </div>
                )} {/* Ensure these properties exist in petData */}
                </div>
              </div>
            </>
          ) : (
            <p>No animal selected.</p>
          )}
        </div>

        <div className="page-indicator">
          {filteredAnimals.map((animal, index) => (
            <span
              key={animal.chipId}
              className={`dot ${index === currentAnimalIndex ? 'active' : ''}`}
            ></span>
          ))}
        </div>

        <div className='toggleButtonWrapper'>
          <input
            type="checkbox"
            id="toggle"
            className="toggleCheckbox"
            checked={showVaccineCard}
            onChange={toggleView}
          />
          <label htmlFor="toggle" className="toggleContainer">
            <div>ID</div>
            <div>Vaccination</div>
          </label>
        </div>
    </div>
  );
}

export default PetId;
