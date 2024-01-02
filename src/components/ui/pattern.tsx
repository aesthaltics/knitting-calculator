import { useState } from "react";

type pattern_props = {
	showPattern: boolean;
	simplestPattern: number[];
};

const Pattern = ({ showPattern, simplestPattern }: pattern_props) => {
	const patternToSquares = (pattern: number[]) => {
		let squares: { [index: string]: boolean } = {};
		let current_index = 0;
		for (let distance of pattern) {
			for (let i = 0; i < distance; i++) {
				if (i === 0) {
					squares[current_index.toString()] = true;
				} else {
					squares[current_index.toString()] = false;
				}
				current_index++;
			}
		}
		console.log(squares);
		return squares;
	};

	return (
		<div className="flex flex-col w-full items-center px-2">
			<p className="text-3xl">{`Det enkleste mønsteret er ${simplestPattern}`}</p>
			<div className="flex flex-row gap-2 w-full ">
				{Object.entries(patternToSquares(simplestPattern)).map(
					([key, val], i, array) => (
						<Pattern_square
							num={key}
							isActive={val}
							showPattern={showPattern}
							key={i}
							totalAmount={array.length}
						/>
					)
				)}
			</div>
		</div>
	);
};
export default Pattern;

type pattern_square_props = {
	num: string;
	isActive: boolean;
	showPattern: boolean;
	totalAmount: number;
};

const Pattern_square = ({
	num,
	isActive,
	showPattern,
	totalAmount,
}: pattern_square_props) => {
	const cellWidthPercentage = 100 / totalAmount;
	const height =
		Math.floor((window.innerWidth * cellWidthPercentage) / 100) * 0.7;
	console.log(`height ${height}`);
	return (
		<div
			style={{'width': `${cellWidthPercentage}%` }}
			className={`${
				showPattern && isActive ? "bg-blue-600" : "bg-gray-200"
			} aspect-square rounded opacity-100`}
		>
			{!showPattern && (
				<div
					style={{ fontSize: `${height}px` }}
					className="flex bg-gradient-to-br from-[#002446] to-[#08ece5] h-full w-full items-center justify-center bg-clip-text"
				>
					<p
						className={`font-extrabold object-fill ${
							isActive && "text-transparent"
						}`}
					>
						{num}
					</p>
				</div>
			)}
		</div>
	);
};
