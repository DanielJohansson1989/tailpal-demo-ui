const OWNER_API_URL = 'https://localhost:7254/owners';
const VACCINATION_API_URL = 'https://localhost:7154/vaccinations';

export const getAllOwners = async () => {
    const response = await fetch(OWNER_API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch owners');
    }
    const data = await response.json();
    return data;
};

export const getAllVaccinations = async () => {
    const response = await fetch(VACCINATION_API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch vaccinations');
    }
    const data = await response.json();
    return data;
};