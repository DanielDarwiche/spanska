import React, { useEffect, useState } from 'react';
import { checkWin } from '../helpers/helpers';

const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playAgain }) => {
    const [winstreak, setWinstreak] = useState(0);
    const [sessionWins, setSessionWins] = useState(0);
    const [finalMessage, setFinalMessage] = useState('');
    const [playable, setPlayableState] = useState(true);

    useEffect(() => {
        const gameStatus = checkWin(correctLetters, wrongLetters, selectedWord);
        if (gameStatus === 'win') {
            setFinalMessage('✅ Korrekt! ✅');
            setWinstreak(prevWinstreak => prevWinstreak + 1);
            setSessionWins(prevSessionWins => prevSessionWins + 1);
            setPlayableState(false);
        } else if (gameStatus === 'lose') {
            setFinalMessage('❌ Inkorrekt... ❌');
            setWinstreak(0);
            setPlayableState(false);
        } else {
            setFinalMessage('');
            setPlayableState(true);
        }
    }, [correctLetters, wrongLetters, selectedWord]);

    useEffect(() => {
        setPlayable(playable);
    }, [playable, setPlayable]);

    const handlePlayAgain = () => {
        if (finalMessage.includes('Inkorrekt')) {
            setSessionWins(0);
        }
        setPlayable(true);
        playAgain();
    };
 
    return (
        <div>
            <h2 className='winstreak'>{winstreak}</h2>
            <div className="popup-container" style={finalMessage !== '' ? { display: 'flex' } : {}}>
                <div className="popup">
                    <h2>{finalMessage}</h2>
                    <h3>Det rätta ordet är: <span className="displayed-correct-word">{selectedWord.toUpperCase()}</span>
                    </h3>{finalMessage.includes('Inkorrekt') && (
                        <p>Du vann totalt <span className="totaltsiffra">{sessionWins}</span> gånger innan du förlorade.</p>
                    )}
                    <button onClick={handlePlayAgain}>Spela igen</button>
                </div>
            </div>
        </div>
    );
}

export default Popup;
