import React, {useState} from 'react';
import Square from './Square';
import '../css/Board.css';


const Board = () => {
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
                                key={colIndex}
                                row={rowIndex}
                                col={colIndex}
                                pieceColor={pieceColor}
                            />
                        )
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;
