const initialBoard = [
	["", "", ""],
	["", "", ""],
	["", "", ""],
];

export default function GameBoard({ onCellClick, turns }) {
	const board = initialBoard;

	for (const turn of turns) {
		const { square, player } = turn;
		const { row, col } = square;

		board[row][col] = player;
	}

	return (
		<ol id="game-board">
			{board.map((row, rowIndex) => (
				<li key={rowIndex}>
					<ol>
						{row.map((playerSymbol, colIndex) => (
							<li key={colIndex}>
								<button
									onClick={() => onCellClick(rowIndex, colIndex)}
									disabled={playerSymbol !== ""}
								>
									{playerSymbol}
								</button>
							</li>
						))}
					</ol>
				</li>
			))}
		</ol>
	);
}
