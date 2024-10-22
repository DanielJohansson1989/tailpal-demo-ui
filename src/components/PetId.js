import React, { useState, useContext } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useLocation } from 'react-router-dom';
import { PetContext } from './PetContext'; // Import the PetContext
import '../css/PetId.css';
import '../css/VaccinationsList.css';

function PetId() {
  const { petData, dateTime } = useContext(PetContext); // Get petData from the context
  const { vaccinationData } = useContext(PetContext);
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [showVaccineCard, setShowVaccineCard] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [swiping, setSwiping] = useState(false);
  const location = useLocation();
  const selectedPets = location.state?.selectedPets || []; 

  // Filter the petData based on selectedPets
  const filteredAnimals = petData.flatMap(owner => owner.pets).filter(pet => selectedPets.includes(pet.chipId));
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
                <div className='box-pet-name'>
                  <strong>{currentAnimal.petName} - {currentAnimal.species}</strong>
                </div>
              </div>
                <div>
                
                
              </div>

              <div className={`info-content ${animationClass}`}>
                <div>
                  {showVaccineCard ? (
                    <div>
                    <div className='box'><span className='opacity-title'>Chip Id:</span> {currentAnimal.chipId}</div>
                    <div className="vaccination-list">
                      <div className="card">
                        <div className="card-header">
                          <h3>Vaccinations</h3>
                        </div>
                        <div className="card-content">
                          {vaccinationData.map((vaccination) => (
                          <div key={vaccination.vaccinationId} className="vaccination-row">
                            <div className="info-column">
                              <h4><i className="fas fa-syringe"></i> Vaccination</h4>
                              <p>{vaccination.vaccineName || 'Error 404'}</p>
                            </div>
                            <div className="info-column">
                              <h4><i className="fas fa-calendar-alt"></i> Date</h4>
                              <p>
                                {vaccination.dateOfVaccination ? 
                                  `From: ${new Date(vaccination.dateOfVaccination).toLocaleDateString()}` : 
                                  'Error 404'}<br />
                                  {vaccination.validUntil ? 
                                  `To: ${new Date(vaccination.validUntil).toLocaleDateString()}` : 
                                  'Error 404'}
                              </p>
                            </div>
                            <div className="info-column">
                              <h4><i className="fas fa-hospital"></i>Veterarian</h4>
                              <p>
                                {vaccination.vetLoc || 'Error 404'}<br />
                                {vaccination.vetName || 'Error 404'}
                              </p>
                            </div>
                            <div className="info-column">
                              <h4><i className="fas fa-vial"></i> Batch</h4>
                              <p>{vaccination.batch || 'Error 404'}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  </div>
                  ) : (
                    <div className='pet-info'>
                      <div className='first-row'>
                        <div>
                          <img className='pet-pic' src="https://hamiltonmillvet.com/wp-content/uploads/sites/185/2022/07/Placeholder-1.png" alt="Pet Photo" />
                        </div>
                        <div>
                          <div className='box'>
                            <span className='opacity-title'>Chip Id:</span> {currentAnimal.chipId} - {currentAnimal.dateOfChip.slice(0,-9)}</div>
                          <div className='box'>
                          <span className='opacity-title'>Chip Location:</span> {currentAnimal.chipLoc}</div>
                        </div>
                      </div>
                      <div className='second-box'>
                          <div className='second-row'>
                            <div className='box birthdate'>
                            <span className='opacity-title'>DOB:</span> {currentAnimal.dateOfBirth.slice(0,-9)}</div>
                            <div className='box birthdate'><span className='opacity-title'>Sex:</span> {currentAnimal.sex}</div>
                          </div>
                          <div className='box'><span className='opacity-title'>Breed:</span> {currentAnimal.breed}</div>
                          <div className='box'><span className='opacity-title'>Color:</span> {currentAnimal.color}</div>
                      </div>
                      <div className='box'>
                        <h5>Owner</h5>
                          {petData.map( (owner) => (
                          <ul className='list-unstyled d-flex flex-column align-items-start'>
                            <li><span className='opacity-title'>First Name: </span> {owner.firstName}</li>
                            <li><span className='opacity-title'>Last Name: </span>{owner.lastName}</li>
                            <li><span className='opacity-title'>Address: </span>{owner.address}</li>
                            <li><span className='opacity-title'>Postal Code: </span>{owner.postCode}</li>
                            <li><span className='opacity-title'>City: </span>{owner.city}</li>
                            <li><span className='opacity-title'>Country: </span>{owner.country}</li>
                            <li><span className='opacity-title'>Phone Number: </span>{owner.phoneNumber}</li>
                          </ul>
                          ))}
                      </div>
                  </div>
                )}
                </div>
              </div>
            </>
          ) : (
            <p>No animal selected.</p>
          )}
        </div>

        <footer className='nav-buttons'>
        <div className="page-indicator">
          {filteredAnimals.map((animal, index) => (
            <span
              key={animal.chipId}
              className={`dot ${index === currentAnimalIndex ? 'active' : ''}`}
            ></span>
          ))}
        </div>

        
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
        
        <p className='timeStamp'>{dateTime.date} {dateTime.time}</p>
        </footer>
    </div>
  );
}

export default PetId;
