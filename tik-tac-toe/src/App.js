function Square({value}) {
	return (<>
		<button className="square">{value}</button>
	</>);
}

function BoardRow({value1, value2, value3}) {
	return (<>
		<div className="board-row">
			<Square value={value1} />
			<Square value={value2} />
			<Square value={value3} />
		</div>
	</>);
}

function Board() {
	return(<>
		<BoardRow value1={1} value2={2} value3={3} />
		<BoardRow value1={4} value2={5} value3={6} />
		<BoardRow value1={7} value2={8} value3={9} />
		<BoardRow value1={7} value2={8} value3={9} />
	</>);
}

export default function Game() {
	return (<>
		<Board />
	</>);
}