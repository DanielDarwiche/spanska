import React, { useEffect } from 'react';
import { checkWin } from '../helpers/helpers';

const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playAgain }) => {
    let finalMessage = '';
    let finalMessageRevealWord = `Det rätta ordet är: "${selectedWord.toUpperCase()}"`;

    let playable = true;

    if (checkWin(correctLetters, wrongLetters, selectedWord) === 'win') {
        finalMessage = '✅ Korrekt! ✅';
        playable = false;
    } else if (checkWin(correctLetters, wrongLetters, selectedWord) === 'lose') {
        finalMessage = '❌ Inkorrekt... ❌';
        playable = false;
    }

    useEffect(() => {
        setPlayable(playable);
    });

    return (
        <div className="popup-container" style={finalMessage !== '' ? { display: 'flex' } : {}}>
            <div className="popup">
                <h2>{finalMessage}</h2>
                <h3>{finalMessageRevealWord}</h3>
                <button onClick={playAgain}>Spela igen</button>
            </div>
        </div>
    );
}

export default Popup;
