"use client";
import { useState, useRef, RefObject } from "react";
import SlidingWindow, { WindowElement } from "./sliding-window";
import { Button } from "./button";

type pattern_props = {
	showPattern: boolean;
	simplestPattern: number[];
};

const Pattern = ({ showPattern, simplestPattern }: pattern_props) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [autoId, setAutoId] = useState<number | undefined>(undefined);
	const activeCellRef = useRef<HTMLDivElement>(null);
	const window_ref = useRef<HTMLDivElement>(null);

	const pattern_length = simplestPattern.reduce((acc, cur) => acc + cur, 0);

	const cellWidth = Math.max(
		35,
		(window_ref.current?.clientWidth ?? 0) / pattern_length
	);

	const toggleAuto = () => {
		if (autoId) {
			window.clearInterval(autoId);
			setAutoId(undefined);
			return;
		}

		let newAutoId = window.setInterval(() => {
			setCurrentIndex(
				(currentIndex) => (currentIndex + 1) % pattern_length
			);
		}, 1000);
		setAutoId(newAutoId);
		return;
	};

	const scollToView = (ref: Element | null, index: number) => {
		if (ref === null) {
			return;
		}
		ref.scrollIntoView({
			behavior: index === 0 ? "instant" : "smooth",
			inline: index === 0 ? "start" : "center",
		});
	};
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
		return squares;
	};

	return (
		<div
			className="flex flex-col w-full items-center px-4 gap-4"
			ref={window_ref}
		>
			{/* <div className="flex flex-row gap-2 w-full "> */}
			{simplestPattern.length > 0 && (
				<div className="flex flex-col text-3xl w-full items-center justify-center">
					<p>Det enkleste mønsteret er </p>
					<div className="flex flex-wrap">
						[
						{simplestPattern.map((num, index) => (
							<p key={`pattern text ${index}`}>{num}</p>
						))}
						]
					</div>
				</div>
			)}
			<SlidingWindow>
				{Object.entries(patternToSquares(simplestPattern)).map(
					([key, val], i, array) => (
						<WindowElement
							current_index={currentIndex}
							index={i}
							key={`window element${i}`}
							ref={activeCellRef}
							marker_width={cellWidth / 3}
							scroll={scollToView}
						>
							<Pattern_square
								num={(1 + +key).toString()}
								isActive={val}
								showPattern={showPattern}
								totalAmount={array.length}
								cellWidth={cellWidth}
							/>
						</WindowElement>
					)
				)}
			</SlidingWindow>
			<div className="flex gap-5">
				<Button
					onClick={() =>
						setCurrentIndex(
							(currentIndex) =>
								(currentIndex + 1) % pattern_length
						)
					}
				>
					Neste
				</Button>
				<Button onClick={toggleAuto}>{autoId ? "Stop" : "Auto"}</Button>
			</div>

			{/* </div> */}
		</div>
	);
};
export default Pattern;

type pattern_square_props = {
	num: string;
	isActive: boolean;
	showPattern: boolean;
	totalAmount: number;
	cellWidth: number;
};

const Pattern_square = ({
	num,
	isActive,
	showPattern,
	totalAmount,
	cellWidth,
}: pattern_square_props) => {
	return (
		<div
			style={{ width: `${cellWidth}px` }}
			className={`${
				showPattern && isActive ? "bg-blue-600" : "bg-gray-200"
			} aspect-square rounded opacity-100`}
		>
			{!showPattern && (
				<div
					style={{ fontSize: `${cellWidth * 0.6}px` }}
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
