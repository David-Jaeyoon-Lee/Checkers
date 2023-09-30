import React from 'react';
import Piece from './Piece';
import '../css/Square.css';
import { useDrop } from 'react-dnd';

const Square = ({className, row, col, pieceColor, handleSquareClick, handleSquareDrop}) => { 
    const [{ isOver }, drop] = useDrop({
        accept: 'PIECE',
        drop: (item) => {
            handleSquareDrop(item.row, item.col, row, col);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
        canDrop: () => ((row + col) % 2 === 1),
    });

    return (
        <div 
            className = {`square ${className}`}
            ref = {(node) => drop(node)}
            onClick = {() => handleSquareClick(row, col)}
        >
            {pieceColor && <Piece color = {pieceColor} row = {row} col = {col}/>}
        </div>
    );
}

export default Square;
