import React, { createContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Create the context
const PetContext = createContext();

// Create a provider component
const PetProvider = ({ children }) => {
  const [petData, setPetData] = useState([]);
  const [vaccinationData, setVaccinationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateTime, setDateTime] = useState({ date: '', time: '' }); // State for date and time
  const location = useLocation(); // Correctly call useLocation to get the location object

  const fetchPets = async () => {
    try {
      const petsResponse = await fetch('https://localhost:7254/owners');
      const petsData = await petsResponse.json();
      setPetData(petsData);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  const fetchVaccinations = async () => {
    try {
      const vaccineResponse = await fetch('https://localhost:7154/vaccinations');
      const vaccineData = await vaccineResponse.json();
      setVaccinationData(vaccineData);
    } catch (error) {
      console.error("Error fetching vaccinations:", error);
    }
  };

  const updateData = async () => {
    // Fetch both pets and vaccinations, and update the date and time on mount
    try {
      setLoading(true);
      await Promise.all([fetchPets(), fetchVaccinations()]);
      setDateTime({
        date: new Date().toLocaleDateString(), // Set current date
        time: new Date().toLocaleTimeString(), // Set current time
      });
      setLoading(false);
    } catch (error) {
      console.error("Error during fetching process", error);
      setLoading(false);
    }
  };

  return (
    <PetContext.Provider
      value={{
        petData,
        vaccinationData,
        setPetData,
        setVaccinationData,
        loading,
        updateData,
        dateTime, // Make dateTime available in context
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export { PetContext, PetProvider };
