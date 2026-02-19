import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./components/WinningCombination";

const initialBoard = [
	["", "", ""],
	["", "", ""],
	["", "", ""],
];

function derivedActivePlayer(gameTurn) {
	let currentPlayer = "X";

	if (gameTurn.length > 0 && gameTurn[0].player === "X") {
		currentPlayer = "O";
	}
	return currentPlayer;
}

function App() {
	const [gameTurn, setGameTurn] = useState([]);
	const activePlayer = derivedActivePlayer(gameTurn);

	const board = [...initialBoard.map((array) => [...array])];

	for (const turn of gameTurn) {
		const { square, player } = turn;
		const { row, col } = square;

		board[row][col] = player;
	}

	let winner;

	for (const combination of WINNING_COMBINATIONS) {
		const firstSquareSymbol = board[combination[0].row][combination[0].column];
		const secondSquareSymbol = board[combination[1].row][combination[1].column];
		const thirdSquareSymbol = board[combination[2].row][combination[2].column];

		if (
			firstSquareSymbol &&
			firstSquareSymbol === secondSquareSymbol &&
			firstSquareSymbol === thirdSquareSymbol
		) {
			winner = firstSquareSymbol;
			break;
		}
	}

	const hasDraw = gameTurn.length === 9 && !winner;

	function handleSelectBoardCell(rowIndex, colIndex) {
		setGameTurn((prevTurn) => {
			const activePlayer = derivedActivePlayer(prevTurn);

			const updatedTurn = [
				{ square: { row: rowIndex, col: colIndex }, player: activePlayer },
				...prevTurn,
			];

			return updatedTurn;
		});
	}

	function handleRestart() {
		setGameTurn([]);
	}

	return (
		<main>
			<div id="game-container">
				<ol id="players" className="highlight-player">
					<Player
						initialName="Alice"
						symbol="X"
						activePlayer={activePlayer === "X"}
					/>
					<Player
						initialName="Bob"
						symbol="O"
						activePlayer={activePlayer === "O"}
					/>
				</ol>
				{(winner || hasDraw) && (
					<GameOver winner={winner} onRestart={handleRestart} />
				)}
				<GameBoard onCellClick={handleSelectBoardCell} board={board} />
			</div>
			<Log turns={gameTurn} />
		</main>
	);
}

export default App;
