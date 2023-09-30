import React, { useState } from 'react';
import Square from './Square';
import '../css/Board.css';

const Board = () => {
    const [selectedSquare, setSelectedSquare] = useState(null);

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
                
        // If there is a piece on toSquare, its not a valid move.
        if (newBoardState[toRow][toCol] !== null) {
            return null;
        }

        // Move the piece from fromSqure to toSquare.
        newBoardState[toRow][toCol] = newBoardState[fromRow][fromCol];
        newBoardState[fromRow][fromCol] = null;

        // Check if it is a valid piece move or capture. Modify board accordingly.
        if (Math.abs(fromRow - toRow) === 1 && Math.abs(fromCol - toCol) === 1) {
            return newBoardState;
        } else if (Math.abs(fromRow - toRow) === 2 && Math.abs(fromCol - toCol) === 2) {
            const opponentRow = (fromRow + toRow) / 2;
            const opponentCol = (fromCol + toCol) / 2;

            if (newBoardState[opponentRow][opponentCol] !== null) {
                newBoardState[opponentRow][opponentCol] = null;
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
            if (boardState[row][col] !== null) {
                setSelectedSquare({row, col});
            }
        } else {
            const newBoardState = handleMove(selectedSquare, {row, col}, boardState);
            if (newBoardState !== null) {
                setBoardState(newBoardState);
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
        }
        setSelectedSquare(null);
    };

    return (
        <div className="board">
            {boardState.map((row, rowIndex) => (
                <div className="row" key={rowIndex}>
                    {row.map((pieceColor, colIndex) => (
                        (((rowIndex + colIndex) % 2 === 0) ?
                            <Square
                                className = "inactive"
                            /> : 
                            <Square
                                className = "active"
                                key = {colIndex}
                                row = {rowIndex}
                                col = {colIndex}
                                pieceColor = {pieceColor}
                                handleSquareClick = {handleSquareClick}
                                handleSquareDrop = {handleSquareDrop}
                            />
                        )
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;
