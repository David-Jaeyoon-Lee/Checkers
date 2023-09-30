import React from 'react';
import Piece from './Piece';
import '../css/Square.css';

const Square = ({className, row, col, pieceColor, handleSquareClick}) => { 
    return (
        <div 
            className={`square ${className}`}
            onClick={() => handleSquareClick(row, col)}
        >
            {pieceColor && <Piece color={pieceColor} row = {row} col = {col}/>}
        </div>
    );
}

export default Square;
