import React from 'react';
import Piece from './Piece';
import '../css/Square.css';
import { useDrop } from 'react-dnd';

const Square = ({className, row, col, pieceColor, handleSquareClick, handleSquareDrop, currentPlayer, hoverSquare, validMove, handleMouseEnter, handleMouseLeave}) => { 
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
            className={`square ${className} ${hoverSquare ? 'hover-square' : ''} ${validMove ? 'valid-move' : ''}`}
            ref = {(node) => drop(node)}
            onClick = {() => handleSquareClick(row, col)}
        >
            {pieceColor && <Piece color = {pieceColor} row = {row} col = {col} currentPlayer = {currentPlayer} handleMouseEnter = {(r, c)=>handleMouseEnter(r,c)}  handleMouseLeave = {()=>handleMouseLeave()}/>}
        </div>
    );
}

export default Square;
