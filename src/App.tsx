import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';

interface UserData {
  name: {
    title: string;
    first: string;
    last: string;
  }
  dob: {
    age: string
  }
  location: {
    city: string;
    street: {
      number: number;
      name: string;
    };
    country: string;
    postcode: number;
  }
};

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    fetchUserData().then((data) => {
      setUserData(data);
    });
  }, []);

  const fetchUserData = async () => {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    console.log(data.results[0]);
    return data.results[0];
  };

  return (
    <main className="App">
      <header>
        Random User
      </header>
      <div>
        <span>Name: {userData?.name.first}</span>
      </div>
      <div>
        <span>Age: {userData?.dob.age}</span>
      </div>
      <div>
        <span>Address :{userData?.location.city}</span>
      </div>
    </main>
  );
}

export default App;
