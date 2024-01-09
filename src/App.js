import React, { useState } from 'react';
import './App.css';
import TextInput from './TextInput';

function format_result(result) {
  const result_formatted = [
    `Word count: ${result['Word count']},`,
    `Average word length: ${result['Average word length']},`,
    'Number of words of length:',
  ];

  for (const [key, value] of Object.entries(result['Number of words of length'])) {
    result_formatted.push(`  - "${key}": ${value}`);
  }

  const most_freq_lengths = Object.keys(result).find((key) =>
    key.startsWith('The most frequently occurring word length is')
  );
  result_formatted.push(`${most_freq_lengths}: ${result[most_freq_lengths]}`);

  return result_formatted.join('\n');
}

function App() {
  // eslint-disable-next-line
  const [result, return_results] = useState(null);

  const handle_entry = async (text) => {
    try {
      const response = await fetch('https://react-wordcount-kappa.vercel.app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file: text }),
      });

      if (response.ok) {
        const data = await response.json();
        const result_formatted = format_result(data);
        return_results(result_formatted);
      } else {
        console.error('Server returned an error');
      }
    } catch (error) {
      console.error('Error occurred during fetch:', error);
    }
  };

  // eslint-disable-next-line
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