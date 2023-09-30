import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import Panel from './components/Panel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [currentPlayer, setCurrentPlayer] = useState(true);
  const [ai, setAI] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  const restartGame = () => {
    setGameKey(gameKey + 1);
    setCurrentPlayer(true);
  }

  const toggleTurn = () => {
    setCurrentPlayer(prev => !prev);
  };

  const playAI = () => {
    setAI(true);
    restartGame();
  }

  const playHuman = () => {
    setAI(false);
    restartGame();
  }

  return (
    <div className="App">
      <h1 className='title'>Checkers Game</h1>
      <DndProvider backend={HTML5Backend}>
        <Board key={gameKey} ai = {ai} currentPlayer = {currentPlayer} toggleTurn = {toggleTurn}/>
      </DndProvider>
      <Panel ai = {ai} playAI = {playAI} playHuman = {playHuman} currentPlayer = {currentPlayer} restartGame = {restartGame} />
    </div>
  );
}

export default App;
