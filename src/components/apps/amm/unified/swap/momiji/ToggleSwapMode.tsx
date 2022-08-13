import React from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import { selectMomijiUsage, setMomijiUsage } from 'state/reducers/swap';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state/hooks';
import { config } from 'core/config';

export interface ToggleSwapModeProps {
	className?: string;
}

const ToggleSwapMode: React.FC<ToggleSwapModeProps> = ({ className }) => {
	const dispatch = useAppDispatch();

	const momijiEnabled = useSelector(selectMomijiUsage);

	if (!config.momijiEnable) return null;

	return (
		<div className={`flex items-center gap-2 ${className || ''}`}>
			<span className={`${momijiEnabled ? 'text-lights-400' : 'text-darks-200'} inline-block align-middle text-sm`}>
				{momijiEnabled ? 'Gasless swapping' : 'Gas fee / normal'}
			</span>
			<HeadlessSwitch
				checked={momijiEnabled}
				onChange={(e) => dispatch(setMomijiUsage(e))}
				className={`${
					momijiEnabled ? 'bg-lights-400' : 'bg-darks-200'
				} relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
			>
				<span className="sr-only">Use Momiji</span>
				<span
					aria-hidden="true"
					className={`${
						momijiEnabled ? 'translate-x-6' : 'translate-x-0'
					} pointer-events-none mt-[1px] inline-block h-[1.2rem] w-[1.2rem] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
				/>
			</HeadlessSwitch>
		</div>
	);
};

export default ToggleSwapMode;
