// PawPrints.js
import { useEffect, useRef } from 'react';
import './App.css'; // Ensure this contains the .paw-print CSS

function PawPrints() {
  // Predefined paths for the paw prints to "walk" across the screen
  const paths = [
    { // Path 1
      positions: [
        { top: '10%', left: '10%' },
        { top: '20%', left: '20%' },
        { top: '30%', left: '10%' },
        { top: '40%', left: '20%' },
        { top: '50%', left: '30%' },
        { top: '60%', left: '20%' },
        { top: '70%', left: '10%' },
        { top: '80%', left: '20%' },
        { top: '90%', left: '10%' },
      ],
      angle: 180 // Fixed angle for Path 1
    },
    { // Path 2
      positions: [
        { top: '5%', left: '90%' },
        { top: '15%', left: '70%' },
        { top: '25%', left: '80%' },
        { top: '35%', left: '90%' },
        { top: '45%', left: '80%' },
        { top: '55%', left: '70%' },
        { top: '65%', left: '60%' },
        { top: '75%', left: '50%' },
        { top: '85%', left: '40%' },
      ],
      angle: 180 // Fixed angle for Path 2
    },
    { // Path 3
      positions: [
        { top: '90%', left: '5%' },
        { top: '80%', left: '15%' },
        { top: '70%', left: '5%' },
        { top: '60%', left: '15%' },
        { top: '50%', left: '5%' },
        { top: '40%', left: '15%' },
        { top: '30%', left: '5%' },
        { top: '20%', left: '15%' },
        { top: '10%', left: '5%' },
      ],
      angle: 0 // Fixed angle for Path 3
    }
  ];

  const currentPathIndex = useRef(-1); // Current path index, initialized to -1
  const currentIndex = useRef(0); // Current position index
  const appContainerRef = useRef(null); // Ref to the .App container

  // Function to create paw prints that follow the defined path
  function createPawPrints() {
    const pawPrint = document.createElement('div');
    pawPrint.className = 'paw-print';

    // Get the current path and position
    const path = paths[currentPathIndex.current];
    const currentPos = path.positions[currentIndex.current];

    // Set the angle based on the current path
    const angle = path.angle;
    pawPrint.style.transform = `rotate(${angle}deg)`; // Apply rotation directly

    // Set the position of the paw print
    pawPrint.style.top = currentPos.top;
    pawPrint.style.left = currentPos.left;

    // Append to the .App container
    const appContainer = appContainerRef.current;
    if (appContainer) {
      appContainer.appendChild(pawPrint);
    }

    // Trigger fade-out and remove after a delay
    setTimeout(() => {
      pawPrint.classList.add('fade-out'); // Add fade-out class
      setTimeout(() => {
        pawPrint.remove(); // Remove element after fade-out transition
      }, 1000); // Match this duration with the CSS transition duration
    }, 8000); // Start fade-out after 8 seconds

    // Move to the next position
    currentIndex.current++;

    // Check if we've completed the current path
    if (currentIndex.current >= path.positions.length) {
      let newPathIndex;

      // Randomly select a new path that is not the same as the last one
      do {
        newPathIndex = Math.floor(Math.random() * paths.length);
      } while (newPathIndex === currentPathIndex.current); // Ensure it's different

      currentPathIndex.current = newPathIndex; // Update to the new path index
      currentIndex.current = 0; // Reset to the start of the new path
    }
  }

  // useEffect to generate paw prints at intervals
  useEffect(() => {
    appContainerRef.current = document.querySelector('.App'); // Set the reference to the .App container

    // Randomly select the first path index
    currentPathIndex.current = Math.floor(Math.random() * paths.length);
    
    const interval = setInterval(() => {
      createPawPrints();
    }, 1000); // Creates a new paw print every second

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return null; // No visible JSX needed
}

export default PawPrints;
