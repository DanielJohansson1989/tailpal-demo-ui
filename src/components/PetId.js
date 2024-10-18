import React, { useState } from 'react';
import TimeDisplay from './TimeDisplay';
import '../css/PetId.css'
import { useSwipeable } from 'react-swipeable';

const animals = [
  { id: 1, name: 'Dog', idView: 'Dog ID info', vaccineCard: 'Dog Vaccination Card' },
  { id: 2, name: 'Cat', idView: 'Cat ID info', vaccineCard: 'Cat Vaccination Card' },
  { id: 3, name: 'Rabbit', idView: 'Rabbit ID info', vaccineCard: 'Rabbit Vaccination Card' },
  { id: 4, name: 'Bird', idView: 'Bird ID info', vaccineCard: 'Bird Vaccination Card' },
  { id: 5, name: 'Fish', idView: 'Fish ID info', vaccineCard: 'Fish Vaccination Card' },
];

function PetId() {
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [showVaccineCard, setShowVaccineCard] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [swiping, setSwiping] = useState(false);

  const currentAnimal = animals[currentAnimalIndex];

  // Swipe Handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentAnimalIndex < animals.length - 1 && !swiping) {
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
          <div className={`title ${animationClass}`}>
            <h2>{currentAnimal.name}</h2>
          </div>
          <div className={`info-content ${animationClass}`}>
            <div>
              {showVaccineCard ? currentAnimal.vaccineCard : currentAnimal.idView}
            </div>
          </div>
        </div>

        <div className="page-indicator">
          {animals.map((animal, index) => (
            <span
              key={animal.id}
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