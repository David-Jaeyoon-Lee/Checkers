# Tesla Take-Home Checkers Technical Challenge
This project was completed by David Jaeyoon Lee as a part of his interview process for Tesla.

## Requirements
<u>Checkers take-home challenge:</u> \
The goal of this exercise is to write a simple checkers game app, preferably using ReactJS. \

The minimal requirements are:
* Implement basic game mechanics: taking turns, basic moves and jumps over the enemy checkers.
* Players should be able to drag-n-drop checkers using a mouse. Additional ways to control the game are up to you.
* On mouse over checker, please highlight cells where a checker can possibly move to
* If there is an opportunity to capture an enemy checker - it should be the only valid move
* No-brain AI player: could make a move to any random valid cell
* Make sure that the app is stable across major browsers

The whole app should take less than 4 hours to complete. The primary areas to focus are code readability, state management, and overall user experience. You may use any state management approach on your choice. Try to minimize amount of external dependencies in your app. Ensure your app is documented. The quality of your submission should match what you would submit to your colleagues at work for code review and be comfortable to ship to production.\

Ways to stand out of the crowd:
* Unit tests
* TypeScript
* Restoring the game state in case if a page was reloaded
* Reverting last move
* Better game stats UI (game time, number of moves, victory banners etc.)
* King checkers mechanics (when a checker hits the last row and gets an ability to move backwards)
* Basic AI player (making moves that are not completely random)

You can submit this by emailing me your solution in a ZIP file, GitHub link, or One Drive link. Most employees at Tesla are not able to access Google docs so please be mindful of this when submitting.

## How to play the game
``` 
git clone https://github.com/David-Jaeyoon-Lee/Tesla-Technical-Challenge.git
cd Tesla-Technical-Challenge
npm start 
```

## Implementation
### Board
The Board component represents the checkers board and all the states that is required for the board to keep track of. It is comprised of 8 rows each with 8 Squares lined up horizontally, making a 8 x 8 checkers board.
#### useStates of Board
```
ex. Datatype: useStateName -> Description

String[][]: boardState -> Represents the pieces on the board.
dict<int,int>: selectedSquare -> Represents the square that has been clicked on
boolean: winner -> Winner of the game
integer: numBlackPieces -> Number of Black pieces
integer: numRedPieces -> Number of Red pieces
dict<int,int>: hoverSquare -> Square that mouse is hovering over
dict<int,int>[]: validMoves -> valid moves for the square we are hovering over
dict<dict<int,int>, dict<int,int>[]>: validCaptureMoves -> valid moves that capture an enemy piece for current player
dict<dict<int,int>, dict<int,int>[]>: currentPlayerValidMoves -> valid moves that capture an enemy piece for current player
boolean: noMoreMoves -> if there are no more moves 
```
#### functions of Board
Here is an outline of the functions in Board. The descriptions of functions can be found in Board.js. Board will basically pass these functions (or just use them) into Square/Piece such that when we click/hover/drag & drop/etc, it will alter the board's useStates and representation of the board. 

```
handleMove(fromSquare, toSquare, boardState) -> string[][]
handleSquareClick(row, col) -> void
handleSquareDrop(fromRow, fromCol, toRow, toCol) -> void
calculateValidMoves(row, col) -> dict<int,int>[]
inBoardBound(row, col) -> boolean
handleMouseEnter() -> void
handleMouseLeave() -> void
addCurrentPlayerValidMoves -> void
```
### Square
Square represents a location/position on the board and is notated with a row and column. It has some styling attributes and takes in parameters from the Board component that alter its state/appearance. Its appearance can be determined by if it is active/inactive (you can have a piece on it), if you hover over it, or if it is a valid move for the selected/hover square.

The Square also is the "drop" component where you can drop the Pieces onto it. 
### Piece
Piece represents piece that can move along the Squares of a Board. It is ultimately just an image that you can drag/move along depending on the state of the board and whose turn it is. 

### Panel
Panel is just an interface so that you can change the gamemode and restart the game! 

## Other
If you have any questions or have trouble understanding/starting up this project. Contact djlee1004@berkeley.edu
