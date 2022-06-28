import React, { useRef } from 'react';

let uniqueId = 0;
const getUniqueId = () => uniqueId++;

export interface SwapCardRouterIconProps {
	className?: string;
	id?: string;
}

const SwapCardRouterIcon: React.FC<SwapCardRouterIconProps> = ({ className, id }) => {
	const componentIdRef = useRef(id ?? getUniqueId());
	const componentId = `AutoRouterIconGradient${componentIdRef.current}`;

	return (
		<svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
			<defs>
				<linearGradient id={componentId} x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(95)">
					<stop id="stop1" offset="0" stopColor="#D58A9F" />
					<stop id="stop1" offset="0.5" stopColor="#D58A9F" />
					<stop id="stop2" offset="1" stopColor="#F0932C" />
				</linearGradient>
			</defs>
			<path
				d="M16 16C10 16 9 10 5 10M16 16C16 17.6569 17.3431 19 19 19C20.6569 19 22 17.6569 22 16C22 14.3431 20.6569 13 19 13C17.3431 13 16 14.3431 16 16ZM5 10C9 10 10 4 16 4M5 10H1.5M16 4C16 5.65685 17.3431 7 19 7C20.6569 7 22 5.65685 22 4C22 2.34315 20.6569 1 19 1C17.3431 1 16 2.34315 16 4Z"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				stroke={`url(#${componentId})`}
			/>
		</svg>
	);
};

export default SwapCardRouterIcon;
