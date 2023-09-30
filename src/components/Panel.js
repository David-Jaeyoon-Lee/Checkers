import React from 'react';
import '../css/Panel.css';

const Panel = ({ai, playAI, playHuman, currentPlayer, restartGame }) => {
    return (
        <div className="panel">
            <div className="text">
                Playing: {ai ? 'AI' : 'Human'}
            </div>
            <div className="text">
                Current Turn: <span className={`${currentPlayer ? "black" : "red"}`}>{currentPlayer ? 'Player 1 Black' : 'Player 2 Red'}</span>
            </div>
            <div>
                <button className = "panelButton" onClick={restartGame}>
                    Restart Game
                </button>
            </div>
            <div>
                <button className = "panelButton" onClick={playAI}>
                    Player vs. AI
                </button>
            </div>
            <div>
                <button className = "panelButton" onClick={playHuman}>
                    Player vs Player
                </button>
            </div>
        </div>
    );
}

export default Panel;
