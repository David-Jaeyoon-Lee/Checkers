import React from 'react';
import '../css/Piece.css';
import redPieceImg from '../images/red-piece.png';
import blackPieceImg from '../images/black-piece.png';
import kingRedPieceImg from '../images/king-red-piece.png';
import kingBlackPieceImg from '../images/king-black-piece.png';


const Piece = ({color, row, col}) => {
    var pieceColor = "";
    var pieceImage = null;

    switch (color) {
        case 'black':
            pieceColor = 'black';
            pieceImage = blackPieceImg;
            break;
        case 'red':
            pieceColor = 'red';
            pieceImage = redPieceImg;
            break;
        case 'red-king':
            pieceColor = 'red-king';
            pieceImage = kingRedPieceImg;
            break;
        default:
            pieceColor = 'black-king';
            pieceImage = kingBlackPieceImg;
            break;
    }

    return (
        <img 
            className="piece"
            src={pieceImage}
            alt={pieceColor + ' piece'}
        />
    );
}

export default Piece;
