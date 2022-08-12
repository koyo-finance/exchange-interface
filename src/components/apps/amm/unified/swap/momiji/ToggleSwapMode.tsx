import React from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import { selectMomijiUsage, setMomijiUsage } from 'state/reducers/swap';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state/hooks';

export interface ToggleSwapModeProps {
	className?: string;
}

const ToggleSwapMode: React.FC<ToggleSwapModeProps> = ({ className }) => {
	const dispatch = useAppDispatch();

	const momijiEnabled = useSelector(selectMomijiUsage);

	return (
		<div className={`flex items-center gap-2 ${className || ''}`}>
			<HeadlessSwitch
				checked={momijiEnabled}
				onChange={(e) => dispatch(setMomijiUsage(e))}
				className={`${
					momijiEnabled ? 'bg-lights-400' : 'bg-darks-200'
				} relative inline-flex h-[2.4rem] w-[4.6rem] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
			>
				<span className="sr-only">Use Momiji</span>
				<span
					aria-hidden="true"
					className={`${
						momijiEnabled ? 'translate-x-9' : 'translate-x-0'
					} pointer-events-none inline-block h-[2.125rem] w-[2.125rem] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
				/>
			</HeadlessSwitch>
			<span className={`${momijiEnabled ? 'text-lights-400' : 'text-darks-200'} inline-block align-middle text-sm`}>
				{momijiEnabled ? 'Trade gasless by signature' : 'Trade with a gas fee'}
			</span>
		</div>
	);
};

export default ToggleSwapMode;
