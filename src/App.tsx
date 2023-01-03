import React from "react";
import { useEffect, useState } from "react";
import "./App.css";

interface UserData {
  name: {
    title: string;
    first: string;
    last: string;
  };
  dob: {
    age: string;
  };
  location: {
    city: string;
    street: {
      number: number;
      name: string;
    };
    country: string;
    postcode: number;
  };
  picture:{
    large: string;
    medium: string;
    thumbnail: string;
  }
}

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(userData?.name.first);
  useEffect(() => {
    fetchUserData().then((data) => {
      setUserData(data);
    });
  }, []);

  useEffect(() => {
    setFirstName(userData?.name.first);
  },[userData]);

  const fetchUserData = async () => {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    console.log(data.results[0]);
    return data.results[0];
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
  }

  const updateUser = () => {
    fetchUserData().then((data) => {
      setUserData(data);
    });
    setIsEditing(false);
  };


  return (
    <>
      <header className="App-header">Random User</header>
      <main className="App">
        <section className="App--image-container">
          <img src={userData?.picture.large} alt="" />
        </section>
        <section className="App--info-container">
        <form 
        onSubmit={(e) => handleSubmit(e)} 
        >
          {'Name: '}
          <input 
          type="text" 
          onClick={() => setIsEditing(true)}
          onChange={(e) => setFirstName(e.target.value)}
          readOnly={!isEditing}
          value={firstName}
          />
          <button 
          type="submit"
          hidden={!isEditing}
          >
            Save
          </button>
        </form>
        <div>
          Age: {userData?.dob.age}
        </div>
        <div>
          <div>Address: </div>
          <span> {userData?.location.street.number} </span>
          <span>{userData?.location.street.name}</span>
          <div>{userData?.location.postcode}</div>
          <div>{userData?.location.city}</div>
          <div>{userData?.location.country}</div>
        </div>
        </section>
         <button className="btn--new-user" onClick={() => updateUser()}>New User</button>

      </main>
    </>
  );
}

export default App;
