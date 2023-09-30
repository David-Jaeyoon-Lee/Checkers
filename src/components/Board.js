import React, { useState, useEffect } from 'react';
import Square from './Square';
import '../css/Board.css';

const Board = ({ai, currentPlayer, toggleTurn}) => {
    const [selectedSquare, setSelectedSquare] = useState(null);
    const [winner, setWinner] = useState(null);
    const [numBlackPieces, setNumBlackPieces] = useState(12);
    const [numRedPieces, setNumRedPieces] = useState(12);
    const [hoverSquare, setHoverSquare] = useState([]);
    const [validMoves, setValidMoves] = useState([]);
    const [validCaptureMoves, setValidCaptureMoves] = useState({});
    const [currentPlayerValidMoves, setCurrentPlayerValidMoves] = useState({temp: 0});
    const [noMoreMoves, setNoMoreMoves] = useState(false);

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
        let promote = "";

        switch (newBoardState[fromRow][fromCol]) {
            case 'black':
                rowDelta = fromRow - toRow;
                if(toRow === 0){
                    promote = "-king";
                }
                break;
            case 'red':
                rowDelta = toRow - fromRow;
                if(toRow === 7){
                    promote = "-king";
                }
                break;
            default:
                rowDelta = Math.abs(fromRow - toRow);
        }

        // If there is a piece on toSquare, its not a valid move.
        if (newBoardState[toRow][toCol] !== null) {
            return null;
        }

        // Check if it is a valid piece move or capture. Modify board accordingly.
        if (Object.keys(validCaptureMoves).length === 0 && rowDelta === 1 && Math.abs(fromCol - toCol) === 1) {
            newBoardState[toRow][toCol] = newBoardState[fromRow][fromCol] + promote;
            newBoardState[fromRow][fromCol] = null;

            return newBoardState;
        } else if (rowDelta === 2 && Math.abs(fromCol - toCol) === 2) {
            const opponentRow = (fromRow + toRow) / 2;
            const opponentCol = (fromCol + toCol) / 2;
            const opponentColor = currentPlayer ? 'red' : 'black';

            if (newBoardState[opponentRow][opponentCol] !== null && newBoardState[opponentRow][opponentCol].includes(opponentColor)) {
                if(opponentColor === 'black'){
                    setNumBlackPieces(numBlackPieces - 1);
                } else {
                    setNumRedPieces(numRedPieces - 1);
                }

                newBoardState[toRow][toCol] = newBoardState[fromRow][fromCol] + promote;
                newBoardState[fromRow][fromCol] = null;
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
            setValidMoves([]);
            setHoverSquare([]);
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
        setValidMoves([]);
        setHoverSquare([]);
    };

    /* Executes when hovering over pieces or when getting a player's valid move set: 
        For a specific row and col, return the valid moves for that square */ 
    const calculateValidMoves = (row, col) => {
        let validMoves = [], validCaptures = [];
        let rowDelta = [(currentPlayer ? -1 : 1)]
        const opponentColor = (currentPlayer ? 'red' : 'black');

        if(boardState[row][col].includes('king')){
            rowDelta.push((currentPlayer ? 1: -1));
        }

        for(const y of rowDelta){
            for(const x of [-1, 1]){
                if(!inBoardBound(row + y, col + x)){
                    continue;
                }
                if(boardState[row + y][col + x] === null){
                    validMoves.push({row: row + y, col: col + x});
                } else if(boardState[row + y][col + x].includes(opponentColor)) {
                    if(inBoardBound(row + y*2, col + x*2) && boardState[row + y*2][col + x*2] === null){
                        validCaptures.push({row: row + y*2, col: col + x*2});
                    }
                }
            }
        }

        return {validMoves, validCaptures};
    };

    /* Check if row and col are within boundaries */
    const inBoardBound = (row, col) => {
        return row >=0 && row < 8 && col >= 0 && col < 8;
    }

    /* Executes when mouse enters piece (hovers onto): 
        Set valid moves to the valid moves that piece can make.
        Set the square the piece is on as hover square */ 
    const handleMouseEnter = (row, col) => {
        if(selectedSquare === null){
            const {validMoves, validCaptures} = calculateValidMoves(row, col);
            if(Object.keys(validCaptureMoves).length > 0){
                setValidMoves(validCaptures);
            } else {
                setValidMoves(validMoves);
            }
            setHoverSquare([{row, col}]);
        }
    };

    /* Executes when mouse leaves piece (hovers out): 
        Reset valid moves and hover square */ 
    const handleMouseLeave = () => {
        if(selectedSquare === null){
            setValidMoves([]);
            setHoverSquare([]);
        }
    }

    /* Executes whenever current player changes: 
        Calculates the possible moves for the current player. */ 
    const addCurrentPlayerValidMoves = (player) => {
        const currentPlayerColor = player ? 'black' : 'red';
        let newCurrentPlayerValidMoves = {};
        let newCurrentPlayerValidCaptureMoves = {};

        for(let r = 0; r <boardState.length; r++){
            for(let c = 0; c <boardState[0].length; c++){
                if(boardState[r][c] !== null && boardState[r][c].includes(currentPlayerColor)){
                    const {validMoves, validCaptures} = calculateValidMoves(r, c);
                    if(validMoves.length > 0){
                        newCurrentPlayerValidMoves[r*10 + c] = validMoves;
                    }

                    if(validCaptures.length > 0){
                        newCurrentPlayerValidCaptureMoves[r*10 + c] = validCaptures;
                    }
                }
            }
        }

        if(Object.keys(newCurrentPlayerValidCaptureMoves).length > 0){
            newCurrentPlayerValidMoves = newCurrentPlayerValidCaptureMoves
        }

        setValidCaptureMoves(newCurrentPlayerValidCaptureMoves);
        setCurrentPlayerValidMoves(newCurrentPlayerValidMoves);
    };

    /* Executes a piece is taken:
        Sets winner if the game is won. */
    useEffect( () => {
        if (numRedPieces === 0 || numBlackPieces === 0){
            setWinner(numRedPieces === 0 ? 'Black' : 'Red');
        } else if(noMoreMoves){
            setWinner('Draw');
        }
    }, [noMoreMoves, numBlackPieces, numRedPieces]);

    /* Calls addCurrentPlayerValidMoves everytime current player changes */
    useEffect( () => {
        addCurrentPlayerValidMoves(currentPlayer);
    }, [currentPlayer]);

    /* Executes everytime we calculate a player's valid moves (aka whenever we switch players):
        If our AI flag is on then we will make a basic random move as red. */
    useEffect( () => {
        if(Object.keys(currentPlayerValidMoves).length === 0){
            setNoMoreMoves(true);
        }else if(currentPlayer === false && ai === true){
            let index = Math.floor(Math.random() * Object.keys(currentPlayerValidMoves).length);
            let key = Object.keys(currentPlayerValidMoves).at(index);
            let moves = currentPlayerValidMoves[key];
            index = Math.floor(Math.random() * moves.length);
            let toMove = moves[index];
            handleSquareDrop(Math.floor(key/10), key%10, toMove.row, toMove.col);
        }
    }, [currentPlayerValidMoves]);

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
                                    validMove={false}
                                    hoverSquare={false}
                                /> : 
                                <Square
                                    className = "active"
                                    key = {colIndex}
                                    row = {rowIndex}
                                    col = {colIndex}
                                    pieceColor = {pieceColor}
                                    currentPlayer = {currentPlayer}
                                    handleSquareClick = {handleSquareClick}
                                    handleSquareDrop = {handleSquareDrop}
                                    validMove={validMoves.some(move => move.row === rowIndex && move.col === colIndex)}
                                    hoverSquare={hoverSquare.some(move => move.row === rowIndex && move.col === colIndex)}
                                    handleMouseEnter={handleMouseEnter}
                                    handleMouseLeave = {handleMouseLeave}
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
