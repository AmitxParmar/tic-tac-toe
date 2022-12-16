import React, { SetStateAction, useEffect, useState } from 'react'
import Square from '../components/Square';
type Player = "X" | "O" | null;

function calculateWinner(squares: Player[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
}
function Board() {
    const square: any = Array(9).fill(null)
    const player = Math.round(Math.random() * 1) === 1 ? "X" : "O";

    const [squares, setSquares] = useState(square);
    const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(player);

    const [winner, setWinner] = useState<any>(null);

    function reset() {
        setSquares(square)
        setWinner(null);
        setCurrentPlayer(player)
    }

    function setSquareValue(index: number) {
        const newData = squares.map((val: any, i: number) => {
            if (i === index) {
                return currentPlayer;
            }
            return val;
        });
        setSquares(newData)
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }

    useEffect(() => {
        const w = calculateWinner(squares)
        if (w) {
            setWinner(w)
        }
        if (!w && !squares.filter((square: number) => !square).length) {
            setWinner("BOTH")
        }

    })

    return (<>
        <div>
            {!winner && <p>Hey {currentPlayer}, its your turn</p>}
            {winner && winner !== "BOTH" && <p> Congratulations, The winner is {winner} </p>}
            {winner && winner === 'BOTH' && <p> Congratulations you_re both winners</p>}
            <div className='grid'>
                {
                    Array(9)
                        .fill(null)
                        .map((_, i) => {
                            return <Square
                                winner={winner}
                                key={i}
                                onClick={() => setSquareValue(i)}
                                value={squares[i]}
                            />
                        })
                }
            </div >
            <button className='reset' onClick={reset}>RESET</button>
        </div >
    </>)
}

export default Board