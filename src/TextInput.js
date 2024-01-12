import React, {useState} from 'react';
import axios from 'axios';

const TextInput = ({onSubmit, className}) => {
  const [text, update_text] = useState(''); // local state to update when text is changed
  const [result, return_results] = useState(null); // local state to update/render after responding to events

  const return_result = () => {
    if (!result || text.trim() === '') { // clear the response below if the text component is empty
      return null;
    }

    const word_lens_counts = result['Number of words of length'];
    const most_freq_lengths = Object.keys(word_lens_counts).filter(
      (length) => word_lens_counts[length] === Math.max(...Object.values(word_lens_counts))
    );
  
    return ( // make the response pretty instead of JSON
      <div id='ResultContainer'>
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
    update_text(newText); // when text changed event is triggered, update the local state
    try {
        const response = await axios.post('/api/count-words', newText, { // make a promise via axios sending a POST req to server
        //const response = await axios.post('http://localhost:5000/api/count-words', newText, {
          headers: {
              'Content-Type': 'text/plain',
          },
      });
        return_results(response.data); // update the state
        onSubmit(response.data); // use the response to pass this back to the parent component as a handle_entry() arg
    } catch (error) {
        console.error('Error counting words:', error);
    }
};

  const drop_event = async (event) => { // handle drag & drop to parse the file instead of expecting a string
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
        onChange={(e) => realtime_response(e.target.value)}  // listens for event on any change to the text to update the text
        placeholder="Feed me words... with your keyboard... or throw your .txt file at me..."
        className={className}
      />
      <br />

      {result && return_result()}
    </div>
  ); // update the result state on a drag or change event and format it on update
};

export default TextInput;