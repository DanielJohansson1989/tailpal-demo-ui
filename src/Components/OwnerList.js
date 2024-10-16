import React, { useEffect, useState } from 'react';
import { getAllOwners } from '../Services/service';

const OwnerList = () => {
    const [owners, setOwners] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOwners = async () => {
            try {
                const data = await getAllOwners();
                setOwners(data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchOwners();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Djur</h2>
            <ul>
                {owners.map((owner) => (
                    <li key={owner.id}> {/* Se till att 'owner.id' är unikt */}
                        {owner.firstName} {owner.lastName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OwnerList;