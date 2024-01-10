import React, {useState} from 'react';
import axios from 'axios';

const TextInput = ({onSubmit, className}) => {
  const [text, update_text] = useState('');
  const [result, return_results] = useState(null);

  const return_result = () => {
    if (!result || text.trim() === '') {
      return null;
    }

    const word_lens_counts = result['Number of words of length'];
    const most_freq_lengths = Object.keys(word_lens_counts).filter(
      (length) => word_lens_counts[length] === Math.max(...Object.values(word_lens_counts))
    );
  
    return (
      <div>
        <h2 className='Headers'>Word Count Results:</h2>
        <p className='Results'>Word count: {result['Word count']}</p>
        <p className='Results'>Average word length: {result['Average word length']}</p>
        <p className='Results'>Number of words of length:</p>
        <ul className='Results_List'>
          {Object.entries(word_lens_counts).map(([key, value]) => (
            <li key={key}>{`${key}: ${value}`}</li>
          ))}
        </ul>
        <p className='Results'>
          The most frequently occurring word length is ({most_freq_lengths.length}) for word lengths of:{' '}
          ({most_freq_lengths.map((length) => length.replace(/\D/g, '')).join(' & ')})
        </p>
      </div>
    );
  };

  const realtime_response = async (newText) => {
    update_text(newText);
    try {
        const response = await axios.post('/api/count-words', newText, {
        //const response = await axios.post('http://localhost:5000/api/count-words', newText, {
          headers: {
              'Content-Type': 'text/plain',
          },
      });
        return_results(response.data);
        onSubmit(response.data);
    } catch (error) {
        console.error('Error counting words:', error);
    }
};

  const drop_event = async (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target.result;
        update_text(contents);
        realtime_response(contents);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div onDrop={drop_event} onDragOver={(e) => e.preventDefault()}>
      <textarea
        value={text}
        onChange={(e) => realtime_response(e.target.value)}
        placeholder="Feed me words... with your keyboard... or throw your .txt file at me..."
        className={className}
      />
      <br />

      {result && return_result()}
    </div>
  );
};

export default TextInput;