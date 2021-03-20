import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [bloodWorks, setBloodWorks] = useState([])

  //get the bloodwork results from database and set in state
  useEffect(() => {
    axios.get('http://localhost:5000/api/bloodworks').then(response => {
      console.log(response);
      setBloodWorks(response.data)
    })
  }, []) //only run once

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {bloodWorks.map((bloodWork: any) => ( //TODO: replace with proper typing
            <li key={bloodWork.id}>
              {bloodWork.title}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
