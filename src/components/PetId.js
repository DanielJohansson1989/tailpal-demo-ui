import React, { useState, useContext } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useLocation } from 'react-router-dom';
import { PetContext } from './PetContext'; // Import the PetContext
import '../css/PetId.css';

function PetId() {
  const { petData } = useContext(PetContext); // Get petData from the context
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
      <main>
        <div className="animal-info">
          {currentAnimal ? (
            <>
              <div className={`title ${animationClass}`}>
                <h2>{currentAnimal.petName}</h2> {/* Adjusted to use petName */}
                <div className='col-md-5 align-left'>
                                <img className='pet-pic' src="https://hundarlangtarhem.se/wp-content/uploads/2022/11/SIXTEN.jpg" alt="Pet Photo" />
                </div>
                <div className='col-md-7' style={{marginTop: '10px'}}>
                                <ul className='list-unstyled d-flex flex-column align-items-start justify-content-between'>
                                    <li>Chip Id:&nbsp;<strong>{currentAnimal.petName}</strong></li>
                                    <li>Date of Chip:&nbsp;<strong>{currentAnimal.dateOfChip.slice(0,-9)}</strong></li>
                                    <li>Chip Location:&nbsp;<strong>{currentAnimal.chipLoc}</strong></li>
                                </ul>
                            </div>
              </div>
              <div className={`info-content ${animationClass}`}>
                <div>
                  {showVaccineCard ? currentAnimal.vaccineCard : currentAnimal.idView} {/* Ensure these properties exist in petData */}
                  
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

        <div>
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
      </main>
    </div>
  );
}

export default PetId;
