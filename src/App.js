import React, { useState } from 'react';
import './App.css';
import TimeDisplay from './TimeDisplay';
import PawPrints from './PawPrints';
import { useSwipeable } from 'react-swipeable';

const animals = [
  { id: 1, name: 'Dog', idView: 'Dog ID info', vaccineCard: 'Dog Vaccination Card' },
  { id: 2, name: 'Cat', idView: 'Cat ID info', vaccineCard: 'Cat Vaccination Card' },
  { id: 3, name: 'Rabbit', idView: 'Rabbit ID info', vaccineCard: 'Rabbit Vaccination Card' },
  { id: 4, name: 'Bird', idView: 'Bird ID info', vaccineCard: 'Bird Vaccination Card' },
  { id: 5, name: 'Fish', idView: 'Fish ID info', vaccineCard: 'Fish Vaccination Card' },
];

function App() {
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0); // Current animal
  const [showVaccineCard, setShowVaccineCard] = useState(false); // Toggle between ID and vaccination card
  const [animationClass, setAnimationClass] = useState(''); // Class for swipe animation
  const [swiping, setSwiping] = useState(false); // Track if swiping is happening

  const currentAnimal = animals[currentAnimalIndex];

  // Swipe Handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentAnimalIndex < animals.length - 1 && !swiping) {
        setSwiping(true);
        setAnimationClass('slide-left');

        // Update the current animal index immediately
        setCurrentAnimalIndex(currentAnimalIndex + 1);
        
        setTimeout(() => {
          setAnimationClass(''); // Reset animation class
        }, 500); // Match animation duration
      }
    },
    onSwipedRight: () => {
      if (currentAnimalIndex > 0 && !swiping) {
        setSwiping(true);
        setAnimationClass('slide-right');

        // Update the current animal index immediately
        setCurrentAnimalIndex(currentAnimalIndex - 1);
        
        setTimeout(() => {
          setAnimationClass(''); // Reset animation class
        }, 500); // Match animation duration
      }
    },
    onSwiped: () => {
      setTimeout(() => setSwiping(false), 500);
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  // Toggle between ID and vaccination card
  const toggleView = () => setShowVaccineCard(!showVaccineCard);

  return (
    <div className="App" {...handlers}>
      <header className="App-header">
        <span>
          <img
            src="https://static.wixstatic.com/media/bb9651_c18982779dea4131bb1d1cd239a30924~mv2.png/v1/fill/w_80,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/TailPal_Black_green.png"
            className="tailpal-logo"
            alt="logo"
          />
        </span>
        <TimeDisplay />
        <span>
          <i className="fa-solid fa-bars" id="hamburgerIcon"></i>
        </span>
      </header>

      <main>
        <PawPrints />

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

        <div className="toggle-container">
          <button onClick={toggleView}>
            {showVaccineCard ? 'Show ID' : 'Show Vaccination Card'}
          </button>
        </div>

        {/* Page Indicator (dots) */}
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

        <footer>
          <p>Swipe or drag left/right to switch between animals</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
