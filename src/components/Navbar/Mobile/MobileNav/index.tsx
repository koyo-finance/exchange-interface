import { Disclosure } from '@headlessui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import BaseLink from 'components/Links/BaseLink';
import React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

export interface MobileNavProps {
	exchangeOpen: boolean;
	setExchangeOpen: (state: boolean) => void;
	kyoOpen: boolean;
	setKyoOpen: (state: boolean) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ exchangeOpen, setExchangeOpen, kyoOpen, setKyoOpen }) => {
	return (
		<Disclosure.Panel className="lg:hidden">
			<div className="w-full space-y-1 px-2 pt-4 pb-3 shadow-lg">
				<div className=" flex w-full justify-center">
					<div className=" flex flex-col gap-y-6 text-center text-white">
						<div className={`relative z-20 w-full ${exchangeOpen ? ' mb-44' : ''} transform-gpu duration-150`}>
							<div className=" flex w-full flex-row justify-center gap-1" onClick={() => setExchangeOpen(!exchangeOpen)}>
								<div>Exchange</div>
								<div>
									<RiArrowDownSLine
										className={` ${exchangeOpen ? 'rotate-180' : 'rotate-0'} transform-gpu text-xl duration-150 `}
									/>
								</div>
							</div>
							<div
								className={` ${
									exchangeOpen ? '' : 'hidden opacity-0'
								} absolute top-8 left-0 flex w-full transform-gpu flex-col gap-y-4 duration-150`}
							>
								<div className="z-20 w-full rounded-2xl py-2">
									<BaseLink href="/swap">
										<span className="transform-gpu cursor-pointer px-4 duration-200 hover:text-lights-400">Swap</span>
									</BaseLink>
								</div>
								<div className="z-20 w-full rounded-2xl py-2">
									<BaseLink href="/deposit">
										<span className="cursor-pointer px-4 duration-200 hover:text-lights-400">Deposit</span>
									</BaseLink>
								</div>
								<div className="z-20 w-full rounded-2xl py-2">
									<BaseLink href="/withdraw">
										<span className="cursor-pointer px-4 duration-200 hover:text-lights-400">Withdraw</span>
									</BaseLink>
								</div>
								<hr className=" w-full bg-white" />
							</div>
						</div>
						<div className={`relative z-20 w-full ${kyoOpen ? ' mb-40' : ''} transform-gpu duration-150`}>
							<div className=" flex w-full flex-row justify-center gap-1" onClick={() => setKyoOpen(!kyoOpen)}>
								<div>KYO</div>
								<div>
									<RiArrowDownSLine className={` ${kyoOpen ? 'rotate-180' : 'rotate-0'} transform-gpu text-xl duration-150 `} />
								</div>
							</div>
							<div
								className={` ${
									kyoOpen ? '' : ' hidden opacity-0'
								} absolute top-10 left-0 flex w-full transform-gpu flex-col gap-y-4 duration-150`}
							>
								<div className="z-20 w-full rounded-2xl py-2">
									<BaseLink href="/kyo/lock">
										<div className=" transform-gpu cursor-pointer px-4 duration-200 hover:text-lights-400">Lock</div>
									</BaseLink>
								</div>
								<div className="z-20 w-full rounded-2xl py-2">
									<BaseLink href="/kyo/gauges">
										<div className=" transform-gpu cursor-pointer px-4 duration-200 hover:text-lights-400">Vote</div>
									</BaseLink>
								</div>
								<div className="z-20 w-full rounded-2xl py-2">
									<BaseLink href="/kyo/farms">
										<div className=" transform-gpu cursor-pointer px-4 duration-200 hover:text-lights-400">Farms</div>
									</BaseLink>
								</div>
							</div>
						</div>
						<ConnectButton />
					</div>
				</div>
			</div>
		</Disclosure.Panel>
	);
};

export default MobileNav;
