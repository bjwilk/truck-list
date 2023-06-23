import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MyTrucks = () => {
  const [trucks, setTrucks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchUserTrucks();
    checkLoggedInStatus();
  }, []);
  const fetchUserTrucks = async () => {
    try {
      const response = await fetch('http://localhost:3001/users/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jsonwebtoken')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error fetching user data: ' + response.statusText);
      }
      const user = await response.json();
  
      const userTrucksResponse = await fetch(`http://localhost:3001/userTrucks/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jsonwebtoken')}`,
        },
      });
      if (!userTrucksResponse.ok) {
        throw new Error('Error fetching user trucks: ' + userTrucksResponse.statusText);
      }
      const trucksData = await userTrucksResponse.json();
  
      setTrucks(trucksData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  
  const checkLoggedInStatus = () => {
    // Check if the user is logged in based on the presence of the JWT token
    const token = localStorage.getItem('jsonwebtoken');
    setIsLoggedIn(!!token);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <div>Please log in to view your trucks.</div>;
  }

  return (
    <div>
      <h2>My Trucks</h2>
      {trucks.length > 0 ? (
        <ul>
          {trucks.map((truck) => (
            <li key={truck._id}>
              {truck.make} {truck.model} {truck.year} {truck.cost} {truck.body}{" "}
              {truck.description}
              <img style={{ width: "50%" }} src={truck.url} alt={truck.image} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No trucks found.</p>
      )}
    </div>
  );
};

export default MyTrucks;
