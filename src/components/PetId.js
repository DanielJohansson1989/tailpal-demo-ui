import React, { useEffect, useState } from 'react';
import '../App.css'
import './PetId.css'

function PetId() {
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOn, setIsOn] = useState(false);

    const toggleButton = () => {
        setIsOn(!isOn);
    };
    useEffect(() => {
        // Fetch data from the .NET minimal API
        fetch('https://localhost:7254/owners')
            .then(response => response.json())
            .then(data => {
                setOwners(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching owners:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container">
            {!isOn ? (
                owners.map(owner => (
                    <div key={owner.id}>
                        <div className='row'>
                            <div className='col-md-5 align-left'>
                                <img style={ {width: '100px', height: 'auto' } } src="https://hundarlangtarhem.se/wp-content/uploads/2022/11/SIXTEN.jpg" alt="Pet Photo" />
                            </div>
                            <div className='col-md-7'>
                                <ul className='list-unstyled d-flex flex-column align-items-start'>
                                    <li>Chip Id:&nbsp;<strong>{owner.pets[0]?.chipId}</strong></li>
                                    <li>Date of Chip:&nbsp;<strong>{owner.pets[0]?.dateOfChip.slice(0,-9)}</strong></li>
                                    <li>Chip Location:&nbsp;<strong>{owner.pets[0]?.chipLoc}</strong></li>
                                </ul>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-12'>
                                <ul className='list-unstyled d-flex flex-column align-items-start'>
                                    <li>Pet Name:&nbsp;<strong>{owner.pets[0]?.petName}</strong></li>
                                    <li>Species:&nbsp;<strong>{owner.pets[0]?.species}</strong></li>
                                    <li>Breed:&nbsp;<strong>{owner.pets[0]?.breed}</strong></li>
                                    <li>Sex:&nbsp;<strong>{owner.pets[0]?.sex}</strong></li>
                                    <li>Date of Birth:&nbsp;<strong>{owner.pets[0]?.dateOfBirth.slice(0,-9)}</strong></li>
                                    <li>Color:&nbsp;<strong>{owner.pets[0]?.color}</strong></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row card">
                            <h5>Owner</h5>
                            <div className='col-md-12'>
                                <ul className='list-unstyled d-flex flex-column align-items-start'>
                                    <li>First Name:&nbsp;<strong> {owner.firstName} </strong></li>
                                    <li>Last Name:&nbsp;<strong>{owner.lastName}</strong></li>
                                    <li>Address:&nbsp;<strong>{owner.address}</strong></li>
                                    <li>Post Code:&nbsp;<strong>{owner.postCode}</strong></li>
                                    <li>City:&nbsp;<strong>{owner.city}</strong></li>
                                    <li>Country:&nbsp;<strong>{owner.country}</strong></li>
                                    <li>Phone Number:&nbsp;<strong>{owner.phoneNumber}</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div>
                    <h3>Vaccination</h3>
                </div>
            )}

            <div className='toggle-container'>
                <input type='checkbox' id='id-vaccine-toggle' checked={isOn} onChange={toggleButton} ></input>
                <label htmlFor='id-vaccine-toggle'></label>
            </div>
        </div>
    );
}

export default PetId;
