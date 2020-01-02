import React, { useState, useEffect } from 'react';
import './Board.css';
import Tile from '../tile/Tile';

function Board() {
    let [board, setBoard] = useState(['','','','','','','','','']);
    let [user, setUser] = useState('X');
    let [winner, setWinner] = useState(undefined);
    let [gameIsOver, setGameIsOver] = useState(false);
    let [numMoves, setNumMoves] = useState(0);

    useEffect(() => {
        document.title = makeGameStatus(gameIsOver, winner, user);
    });

    function isWinningMove(board, lastMove) {
        var winLines = [
            [[1, 2], [4, 8], [3, 6]],
            [[0, 2], [4, 7]],
            [[0, 1], [4, 6], [5, 8]],
            [[4, 5], [0, 6]],
            [[3, 5], [0, 8], [2, 6], [1, 7]],
            [[3, 4], [2, 8]],
            [[7, 8], [2, 4], [0, 3]],
            [[6, 8], [1, 4]],
            [[6, 7], [0, 4], [2, 5]]
        ];

        var player = board[lastMove];
        for (var i = 0; i < winLines[lastMove].length; i++) {
            var line = winLines[lastMove][i];
            if(player === board[line[0]] && player === board[line[1]]) {
                
                return true;
            }
        }

        return false;
    }

    function makeGameStatus(gameIsOver, winner, user) {
        return !gameIsOver ? `${user}'s turn` :
                    winner !== undefined ? `User ${winner} Won!` : `Game Over`;
    }

    function resetGame() {
        setBoard(['','','','','','','','','']);
        setUser('X');
        setWinner(undefined);
        setGameIsOver(false);
        setNumMoves(0);
    }

    function isBoardFull() {
        return numMoves === 8;
    }

    const makeMove = (index) => e => {
        
        let newBoard = [...board];
        newBoard[index] = user;
        setBoard(newBoard);

        if(isWinningMove(newBoard, index)) {
            setWinner(user);
            setGameIsOver(true);
        }
        else {
            if (isBoardFull()) {
                setGameIsOver(true);
            }
            else {
                setUser(user === 'X' ? 'O' : 'X');
                setNumMoves(numMoves + 1);
            }   
        }
    }

    const tiles = [];
    for (const [index, value] of board.entries()) {
        tiles.push(<Tile className={'tile-' + index} key={index} value={value} onTileClick={(gameIsOver || value !== '') ? () => {} : makeMove(index)}></Tile>)
    }

    return (
        <div>
            <h1>{makeGameStatus(gameIsOver, winner, user)}</h1>
            <div className='board'>
                {tiles}
            </div>

            {
                gameIsOver ?
                <button onClick={resetGame}>Play Again</button> :
                ''
            }
        </div>
        
    );
}

export default Board;