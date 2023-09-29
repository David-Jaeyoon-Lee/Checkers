import React from 'react';
import Piece from './Piece';
import '../css/Square.css';

const Square = ({className, row, col, pieceColor}) => {
    return (
        <div className={`square ${className}`}>
            {pieceColor && <Piece color={pieceColor} row = {row} col = {col}/>}
        </div>
    );
}

export default Square;
