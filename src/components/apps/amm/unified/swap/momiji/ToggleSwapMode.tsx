import React from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import { selectMomijiUsage, setMomijiUsage } from 'state/reducers/swap';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state/hooks';
import { config } from 'core/config';
import { useFlags } from 'flagsmith/react';
import { Toggle } from '@koyofinance/koyo-ui';

export interface ToggleSwapModeProps {
	className?: string;
}

const ToggleSwapMode: React.FC<ToggleSwapModeProps> = ({ className }) => {
	const flags = useFlags(['momiji']);
	const dispatch = useAppDispatch();

	const momijiEnabled = useSelector(selectMomijiUsage);

	if (!config.momijiEnable || !flags.momiji.enabled) return null;

	return <Toggle checked={momijiEnabled} onChange={(e) => dispatch(setMomijiUsage(e))} icon="gasPump" />;
};

export default ToggleSwapMode;
