import React, { useEffect, useState } from 'react';
import { getAllVaccinations } from '../Services/service';
import '../VaccinationsList.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importera Font Awesome

const VaccinationList = () => {
    const [vaccinations, setVaccinations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVaccinations = async () => {
            try {
                const data = await getAllVaccinations();
                console.log(data);
                setVaccinations(data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchVaccinations();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="vaccination-list">
            <div className="card">
                <div className="card-header">
                    <h3>Vaccinationer</h3>
                </div>
                <div className="card-content">
                    {vaccinations.map((vaccination) => (
                        <div key={vaccination.vaccinationId} className="vaccination-row">
                            <div className="info-column">
                                <h4><i className="fas fa-syringe"></i> Vaccination</h4>
                                <p>{vaccination.vaccineName || 'Ingen typ'}</p>
                            </div>
                            <div className="info-column">
                                <h4><i className="fas fa-calendar-alt"></i> Datum</h4>
                                <p>
                                    {vaccination.dateOfVaccination ? 
                                    `Från: ${new Date(vaccination.dateOfVaccination).toLocaleDateString()}` : 
                                    'Ingen datum'}<br />
                                    {vaccination.validUntil ? 
                                    `Till: ${new Date(vaccination.validUntil).toLocaleDateString()}` : 
                                    'Inget slutdatum'}
                                </p>
                            </div>
                            <div className="info-column">
                                <h4><i className="fas fa-hospital"></i> Klinik och Veterinär</h4>
                                <p>{vaccination.vetLoc || 'Ingen klinik'}<br />
                                {vaccination.vetName || 'Ingen veterinär'}
                                </p>
                            </div>
                            <div className="info-column">
                                <h4><i className="fas fa-vial"></i> Batch</h4>
                                <p>{vaccination.batch || 'Ingen batch'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VaccinationList;