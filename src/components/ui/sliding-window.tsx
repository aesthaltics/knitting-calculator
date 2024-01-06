import React, { ReactNode, useRef } from "react";
type SlidingWindowProps = {
	children: ReactNode;
};
const SlidingWindow = ({ children }: SlidingWindowProps) => {
	return (
		<div className="flex w-full max-w-full justify-center">
			<div className="flex overflow-scroll gap-1 hide-scrollbar">
				{children}
			</div>
		</div>
	);
};

type WindowElementProps = {
	children: ReactNode;
	index: number;
	current_index: number;
	marker_width: number;
	scroll: (e: Element | null, index: number) => void;
};
export const WindowElement = (props: WindowElementProps) => {
	const { children, index, current_index, marker_width, scroll } = props;

	const internalRef = useRef<HTMLDivElement>(null);

	if (index === current_index) {
		scroll(internalRef.current, index);
	}
	return (
		<div
			className="flex flex-col items-center justify-center gap-2"
			ref={internalRef}
		>
			<div
				style={{ width: `${Math.max(marker_width, 10)}px` }}
				className={`aspect-square rounded-full ${
					index === current_index ? "bg-blue-500" : "bg-gray-400"
				}`}
			></div>
			{children}
		</div>
	);
};

export default SlidingWindow;
