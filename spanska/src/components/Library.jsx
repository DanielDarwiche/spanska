import React from 'react';

const Library = ({ showLibrary, seenWords, closeModal }) => {
    const wordsToShow = seenWords.slice(0, -1);  

    return (
        <div className={`library-container ${showLibrary ? 'show' : ''}`} style={{ display: showLibrary ? 'flex' : 'none' }}>
            <div className="library-content">
                <h2>Dina ord</h2>
                {wordsToShow.length === 0 ? (  
                    <p style={{ fontSize: '2rem' }}>
      När du har klarat ett ord så kan du se det här..
    </p>
                ) : (
                    <ul>
                        {wordsToShow.map((word, index) => (
                            <li key={index}>{word}</li>
                        ))}
                    </ul>
                )}
                <button onClick={closeModal}>Stäng</button>
            </div>
        </div>
    );
};

export default Library;