import { useState, useEffect } from 'react';

const useUserData = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
    });

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData')) || {};
        setUserData(storedData);
    }, []);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const saveData = async () => {
        try {
            const response = await fetch('http://localhost:5174/api/userData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            localStorage.setItem('userData', JSON.stringify(userData));
            return true;
        } catch (error) {
            console.error('Error saving user data:', error);
            return false;
        }
    };

    return { userData, handleChange, saveData };
};

export default useUserData;
