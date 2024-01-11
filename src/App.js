import React, { useState } from 'react';
import './App.css';
import TextInput from './TextInput';

function App() {
  const return_results = useState(null);

  const handle_entry = async (text) => { // hooked up to the onSubmit below, and the response triggered by the component
    try {
      const response = await fetch('reactnodejs-wordcount.vercel.app/count-words', {
      //const response = await fetch('http://localhost:5000/api/count-words', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: text,
      });

      if (response.ok) {
        const data = await response.json();
        return_results(data); // update the app state with the server response to refresh ui
      } else {
        console.error('Server returned an error');
      }
    } catch (error) {
      console.error('Error occurred during fetch:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='Headers'>Gimme some words. I will count them and stuff.</h1>
        <TextInput className='Text_Submit' onSubmit={handle_entry} />
        <br></br>
        <a href="https://github.com/lachesis17/react-wordcount">
        <img id="git" src="/gitLogo.png" alt="" width="200px" height="200px" />
        </a>
      </header>
    </div>
  );
}

export default App;