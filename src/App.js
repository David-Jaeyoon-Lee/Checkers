import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [currentPlayer, setCurrentPlayer] = useState(true);
  const [ai, setAI] = useState(false);

  const toggleTurn = () => {
    setCurrentPlayer(prev => !prev);
  };

  return (
    <div className="App">
      <h1 className='title'>Checkers Game</h1>
      <DndProvider backend={HTML5Backend}>
        <Board ai = {ai} currentPlayer = {currentPlayer} toggleTurn = {toggleTurn}/>
      </DndProvider>
    </div>
  );
}

export default App;
