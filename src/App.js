import React, { useState } from 'react';
import './App.css';
import TextInput from './TextInput';

function App() {
  const return_results = useState(null);

  const handle_entry = async (text) => {
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
        return_results(data);
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
      </header>
    </div>
  );
}

export default App;