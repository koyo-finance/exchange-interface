import React from 'react';

const WEEK_MS = 604800000;

export interface LockTimeSetButtonProps {
	onClick: (date: Date) => void;
	modifier?: number;
	startMs?: number;
	baseMs?: number;
}

const LockTimeSetButton: React.FC<LockTimeSetButtonProps> = ({
	onClick,
	modifier = 1, //
	startMs = new Date().getTime(),
	baseMs = WEEK_MS,
	children
}) => {
	return (
		<button
			type="button"
			onClick={() => onClick(new Date(startMs + baseMs * modifier))}
			className="btn border border-black bg-transparent text-base font-normal lowercase text-black hover:border-lights-300 hover:bg-transparent"
		>
			{children}
		</button>
	);
};

export default LockTimeSetButton;
