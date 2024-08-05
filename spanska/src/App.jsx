import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import WordHandler from './components/WordHandler';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { showNotification as show, checkWin } from './helpers/helpers';
import WordFetcher from './components/WordFetcher';
import './App.css';

const words = WordFetcher();
let selectedWordPair = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const processLetter = (letter) => {
    if (selectedWordPair.spanish.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        setCorrectLetters(currentLetters => [...currentLetters, letter]);
      } else {
        show(setShowNotification);
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        setWrongLetters(currentLetters => [...currentLetters, letter]);
      } else {
        show(setShowNotification);
      }
    }
  };

  const handleButtonClick = (letter) => {
    if (playable) {
      processLetter(letter.toLowerCase());
    }
  };

  function playAgain() {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWordPair = words[random];
  }

  const alphabet = 'abcdefghijklmnñopqrstuvwxyz'.split('');

  return (
    <>
      <Header />
      <div className="word-to-guess">
        <h2> Gissa det spanska ordet för:<br/><span>{selectedWordPair.swedish.toUpperCase()}</span></h2>
      </div>
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <WordHandler selectedWord={selectedWordPair.spanish} correctLetters={correctLetters} />
      </div>
      <div className="keyboard">
        {alphabet.map(letter => (
          <button key={letter} onClick={() => handleButtonClick(letter)}>{letter.toUpperCase()}</button>
        ))}
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWordPair.spanish} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;