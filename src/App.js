import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
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

  const [fade_header, setFadeInHeader] = useState(false); // states for rendering with a fade animation
  const [fade_text, setFadeInTextInput] = useState(false);
  const [fade_img, setFadeInImage] = useState(false);

  useEffect(() => { // stagger the fades - unmountOnExit prop is needed in the transition to prevent initial rendering
    setTimeout(() => {setFadeInHeader(true);}, 625);
    setTimeout(() => {setFadeInTextInput(true);}, 1250);
    setTimeout(() => {setFadeInImage(true);}, 1875);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <CSSTransition in={fade_header} timeout={1250} classNames="fade" unmountOnExit>
          <h1 className="Headers">Gimme some words. I will count them and stuff.</h1></CSSTransition>
        <CSSTransition in={fade_text} timeout={1250} classNames="fade" unmountOnExit>
          <TextInput className="Text_Submit" onSubmit={handle_entry} /></CSSTransition>
        <CSSTransition in={fade_img} timeout={1250} classNames="fade" unmountOnExit>
          <a href="https://github.com/lachesis17/react-wordcount" className="git-link"><img id="git" src="/gitLogo.png" alt="" width="200px" height="200px" /></a></CSSTransition>
      </header>
    </div>
  );
}

export default App;