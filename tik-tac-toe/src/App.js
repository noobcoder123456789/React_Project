import { useState } from 'react';

function Square({ value, handleClick }) {
	return (<>
		<button className='square' onClick={handleClick}>
			{value}
		</button>
	</>);
}

function getWinner(boards) {
	const lists = [
		[0, 1, 2],
		[3, 4, 5], 
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	for(let i = 0; i < lists.length; i++) {
		const [a, b, c] = lists[i];
		console.log(`${a} ${b} ${c}`);
		console.log(`${boards}`);
		if(boards[a] && boards[a] === boards[b] && boards[a] === boards[c]) {
			return boards[a];
		}
	}

	return null;
}

function Board({ xIsnext, currentBoard, handlePlay }) {
	function handleClick(i) {
		if(getWinner(currentBoard) || currentBoard[i]) return;
		const tempBoard = currentBoard.slice();
		tempBoard[i] = xIsnext ? "X" : "O";		
		handlePlay(tempBoard);
	}

	let winner = getWinner(currentBoard);
	let status = winner === null ? "Next Player: " + (xIsnext ? "X" : "O") : "Winner: " + winner;

	return (<>
		<div className='status'>{status}</div>

		<div className='board-row'>
			<Square value={currentBoard[0]} handleClick={() => handleClick(0)} />
			<Square value={currentBoard[1]} handleClick={() => handleClick(1)} />
			<Square value={currentBoard[2]} handleClick={() => handleClick(2)} />
		</div>

		<div className='board-row'>
			<Square value={currentBoard[3]} handleClick={() => handleClick(3)} />
			<Square value={currentBoard[4]} handleClick={() => handleClick(4)} />
			<Square value={currentBoard[5]} handleClick={() => handleClick(5)} />
		</div>

		<div className='board-row'>
			<Square value={currentBoard[6]} handleClick={() => handleClick(6)} />
			<Square value={currentBoard[7]} handleClick={() => handleClick(7)} />
			<Square value={currentBoard[8]} handleClick={() => handleClick(8)} />
		</div>
	</>);
}

export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(false)]);
	const [currentBoard, setCurrentBoard] = useState(history[0]);
	const [currentMoveCount, setCurrentMoveCount] = useState(0);

	function handlePlay(board) {		
		const tempHistory = [...history.slice(0, currentMoveCount + 1), board];
		setHistory(tempHistory);
		setCurrentMoveCount(currentMoveCount + 1);
		setCurrentBoard(board);
	}

	function jumpTo(i) {
		setCurrentMoveCount(i);
		setCurrentBoard(history[i]);
	}

	const moves = history.map((boards, move) => {
		let description = move == 0 ? "Go to game start" : "Go to move #" + (move);
		return (<>
			<li key={move}>
				<button onClick={() => jumpTo(move)}>
					{description}
				</button>
			</li>
		</>);
	});

	return (<>
		<div className='game'>
			<div className='game-board'>
				<Board xIsnext={currentMoveCount % 2 === 0 ? true : false} currentBoard={currentBoard} handlePlay={handlePlay} />
			</div>

			<div className='game-info'>
				<ol>{moves}</ol>
			</div>
		</div>		
	</>);
}