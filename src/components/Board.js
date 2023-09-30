import React, { useState, useEffect } from 'react';
import Square from './Square';
import '../css/Board.css';

const Board = ({currentPlayer, toggleTurn}) => {
    const [selectedSquare, setSelectedSquare] = useState(null);
    const [winner, setWinner] = useState(null);
    const [numBlackPieces, setNumBlackPieces] = useState(12);
    const [numRedPieces, setNumRedPieces] = useState(12);

    const [boardState, setBoardState] = useState([
        [null, 'red', null, 'red', null, 'red', null, 'red'],
        ['red', null, 'red', null, 'red', null, 'red', null],
        [null, 'red', null, 'red', null, 'red', null, 'red'],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ['black', null, 'black', null, 'black', null, 'black', null],
        [null, 'black', null, 'black', null, 'black', null, 'black'],
        ['black', null, 'black', null, 'black', null, 'black', null]
    ]);

    /* Called from handleSquareClick & handleSquareDrop:
        Handles the move and returns the resulting board state 
        (on success) or null (on fail). */
    const handleMove = (fromSquare, toSquare, boardState) => {
        const { row: fromRow, col: fromCol } = fromSquare;
        const { row: toRow, col: toCol } = toSquare;
        const newBoardState = [...boardState];
        let rowDelta = 0;

        switch (newBoardState[fromRow][fromCol]) {
            case 'black':
                rowDelta = fromRow - toRow;
                break;
            case 'red':
                rowDelta = toRow - fromRow;
                break;
            default:
                rowDelta = Math.abs(fromRow - toRow);
        }

        // If there is a piece on toSquare, its not a valid move.
        if (newBoardState[toRow][toCol] !== null) {
            return null;
        }

        // Check if it is a valid piece move or capture. Modify board accordingly.
        if (rowDelta === 1 && Math.abs(fromCol - toCol) === 1) {
            newBoardState[toRow][toCol] = newBoardState[fromRow][fromCol];
            newBoardState[fromRow][fromCol] = null;
            
            return newBoardState;
        } else if (rowDelta === 2 && Math.abs(fromCol - toCol) === 2) {
            const opponentRow = (fromRow + toRow) / 2;
            const opponentCol = (fromCol + toCol) / 2;
            const opponentColor = currentPlayer ? 'red' : 'black';

            if (newBoardState[opponentRow][opponentCol] !== null && newBoardState[opponentRow][opponentCol].includes(opponentColor)) {
                if(opponentColor == 'black'){
                    setNumBlackPieces(numBlackPieces - 1);
                } else {
                    setNumRedPieces(numRedPieces - 1);
                }

                newBoardState[opponentRow][opponentCol] = null;
                newBoardState[toRow][toCol] = newBoardState[fromRow][fromCol];
                newBoardState[fromRow][fromCol] = null;
        
                return newBoardState;
            }
        }

        return null;
      };

    /* Executes when Square is clicked: 
        Selects a square or tries to executes a move if a square 
        is already selected. */
    const handleSquareClick = (row, col) => {
        if (selectedSquare === null) {
            if (boardState[row][col] !== null && boardState[row][col].includes((currentPlayer ? 'black' : 'red'))) {
                setSelectedSquare({row, col});
            }
        } else {
            const newBoardState = handleMove(selectedSquare, {row, col}, boardState);
            if (newBoardState !== null) {
                setBoardState(newBoardState);
                toggleTurn();
            }
            setSelectedSquare(null);
        }
    };

    /* Executes when piece is dropped onto a square: 
        Behaves simiarly to handleSquareClick, but no square 
        selections and just uses piece's origin square as selected square. */ 
    const handleSquareDrop = (fromRow, fromCol, toRow, toCol) => {
        const newBoardState = handleMove({row: fromRow, col: fromCol}, {row: toRow, col: toCol}, boardState);
        if (newBoardState !== null) {
            setBoardState(newBoardState);
            toggleTurn();
        }
        setSelectedSquare(null);
    };

    /* Executes a piece is taken:
        Sets winner if the game is won. */
    useEffect( () => {
        if (numRedPieces === 0 || numBlackPieces === 0){
            setWinner(numRedPieces === 0 ? 'Black' : 'Red');
        }
    }, [numBlackPieces, numRedPieces]);

    return (
        <div className="board">
            {((winner === null) ? 
                boardState.map((row, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {row.map((pieceColor, colIndex) => (
                            (((rowIndex + colIndex) % 2 === 0) ?
                                <Square
                                    className = "inactive"
                                    key = {colIndex}
                                    row = {rowIndex}
                                    col = {colIndex}
                                    handleSquareClick = {() => {}}
                                /> : 
                                <Square
                                    className = "active"
                                    key = {colIndex}
                                    row = {rowIndex}
                                    col = {colIndex}
                                    pieceColor = {pieceColor}
                                    handleSquareClick = {handleSquareClick}
                                    handleSquareDrop = {handleSquareDrop}
                                    currentPlayer = {currentPlayer}
                                />
                            )
                        ))}
                    </div>
                )) :
                <div className = "game-won-screen">
                    <h1 className = {winner === 'red' ? 'red-text' : 'black-text'}>
                        {['Red', 'Black'].includes(winner) ? winner +'  Player Won!' : "Stalemate! It's a tie!" }
                    </h1>
                </div>
            )}
        </div>
    );
}

export default Board;
