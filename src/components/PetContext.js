import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

   // Create the context
   const PetContext = createContext();

   // Create a provider component
   const PetProvider = ({ children }) => {
     const [petData, setPetData] = useState([]);
     const [vaccinationData, setVaccinationData] = useState([]);
     const [loading, setLoading] = useState(false);
    const location = useLocation();  // Correctly call useLocation to get the location object

     const fetchPets = async () => {
       try {
         const petsResponse = await fetch('https://localhost:7254/pets');
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
       // Fetch both pets and vaccinations on mount
       
           setLoading(true);
           Promise.all([fetchPets(), fetchVaccinations()])
             .then(() => setLoading(false))
             .catch(error => {
               console.error("Error during fetching process", error);
               setLoading(false);
             });
            }

     return (
       <PetContext.Provider value={{ petData, vaccinationData, setPetData, setVaccinationData, loading, updateData }}>
         {children}
       </PetContext.Provider>
     );
   };

   export { PetContext, PetProvider };
