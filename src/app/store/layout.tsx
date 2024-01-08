import React, { ReactNode } from "react";

type RootLayoutProps = {
	children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
	return (
		<div className="w-full h-full py-5 px-3">
			{children}
		</div>
	);
};


export default RootLayout