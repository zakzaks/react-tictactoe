import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

const WINNING_COMBINATIONS = [
	[
		{ row: 0, col: 0 },
		{ row: 0, col: 1 },
		{ row: 0, col: 2 },
	],
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
				<GameBoard onCellClick={handleSelectBoardCell} turns={gameTurn} />
			</div>
			<Log turns={gameTurn} />
		</main>
	);
}

export default App;
