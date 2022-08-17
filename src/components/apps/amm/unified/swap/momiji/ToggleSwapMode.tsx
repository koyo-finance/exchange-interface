import React from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import { selectMomijiUsage, setMomijiUsage } from 'state/reducers/swap';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state/hooks';
import { config } from 'core/config';
import { useFlags } from 'flagsmith/react';
import { FaGasPump } from 'react-icons/fa';
import { VscCircleSlash } from 'react-icons/vsc';

export interface ToggleSwapModeProps {
	className?: string;
}

const ToggleSwapMode: React.FC<ToggleSwapModeProps> = ({ className }) => {
	const flags = useFlags(['momiji']);
	const dispatch = useAppDispatch();

	const momijiEnabled = useSelector(selectMomijiUsage);

	if (!config.momijiEnable || !flags.momiji.enabled) return null;

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
				} relative inline-flex h-[30px] w-[54px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
			>
				<span className="sr-only">Use Momiji</span>
				<span
					aria-hidden="true"
					className={`${
						momijiEnabled ? 'translate-x-6' : 'translate-x-0'
					} pointer-events-none mt-[1px] ml-[1px] inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
				>
					<FaGasPump className={`mt-[5px] ml-[5px] h-[14px] w-[14px]  ${momijiEnabled ? 'text-red-500' : 'text-green-500'}`} />
					{momijiEnabled && <VscCircleSlash className="h-[26px] w-[26px] -translate-y-5 -translate-x-[1px] text-red-500" />}
					{/* <RiForbid2Line className="h-5 w-5 -translate-y-4 text-black" /> */}
				</span>
			</HeadlessSwitch>
		</div>
	);
};

export default ToggleSwapMode;
