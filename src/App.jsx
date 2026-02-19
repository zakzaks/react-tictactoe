import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./components/WinningCombination";

const PLAYERS = {
	X: "Player 1",
	O: "Player 2",
};

const INITIAL_GAME_BOARD = [
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

function deriveWinner(board, players) {
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
			winner = players[firstSquareSymbol];
			break;
		}
	}

	return winner;
}

function deriveGameBoard(gameTurn) {
	const board = [...INITIAL_GAME_BOARD.map((array) => [...array])];

	for (const turn of gameTurn) {
		const { square, player } = turn;
		const { row, col } = square;

		board[row][col] = player;
	}
	return board;
}

function App() {
	const [players, setPlayers] = useState(PLAYERS);
	const [gameTurn, setGameTurn] = useState([]);
	const activePlayer = derivedActivePlayer(gameTurn);
	const board = deriveGameBoard(gameTurn);
	const winner = deriveWinner(board, players);
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

	function handlePlayerNameChange(playerSymbol, newName) {
		setPlayers((prevPlayers) => {
			return {
				...prevPlayers,
				[playerSymbol]: newName,
			};
		});
	}

	return (
		<main>
			<div id="game-container">
				<ol id="players" className="highlight-player">
					<Player
						initialName={PLAYERS.X}
						symbol="X"
						activePlayer={activePlayer === "X"}
						onChangeName={handlePlayerNameChange}
					/>
					<Player
						initialName={PLAYERS.O}
						symbol="O"
						activePlayer={activePlayer === "O"}
						onChangeName={handlePlayerNameChange}
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
