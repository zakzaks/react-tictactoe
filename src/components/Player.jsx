import { useState } from "react";

export default function Player({ initialName, symbol, activePlayer }) {
	const [playerName, setPlayerName] = useState(initialName);
	const [isEditing, setIsEditing] = useState(false);

	function handleEditClick() {
		setIsEditing((editing) => !editing);
	}

	function handleChange(event) {
		setPlayerName(event.target.value);
	}

	let editablePlayerName = <span className="player-name">{playerName}</span>;
	let btnCapton = "Edit";

	if (isEditing) {
		editablePlayerName = (
			<input type="text" defaultValue={playerName} onChange={handleChange} />
		);
		btnCapton = "Save";
	}

	return (
		<li className={activePlayer ? "active" : ""}>
			<span className="player">
				{editablePlayerName}
				<span className="player-symbol">{symbol}</span>
			</span>
			<button onClick={handleEditClick}>{btnCapton}</button>
		</li>
	);
}
