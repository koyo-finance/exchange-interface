import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Disclosure } from '@headlessui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import BaseLink from 'components/Links/BaseLink';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import PageSelectedOverlay from './Desktop/PageSelectedOverlay';

const MobileNav = dynamic(() => import('components/Navbar/Mobile/MobileNav'));

const Navbar: React.FC = () => {
	const router = useRouter();

	const [exchangeOpen, setExchangeOpen] = useState(false);
	const [kyoOpen, setKyoOpen] = useState(false);

	return (
		<header className="fixed left-0 top-0 z-20 w-full transform-gpu bg-darks-500 py-1">
			<Disclosure as="nav" className="border-b-2 border-darks-500 bg-transparent font-semibold text-black">
				{({ open }) => (
					<>
						<div className=" mx-auto px-4 py-2 md:px-6 xl:px-32">
							<div className="relative flex h-12 items-center justify-between">
								{/* Left */}
								<div className="z-40 flex items-stretch justify-start pl-0">
									<div className="flex items-center">
										<BaseLink href="/">
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img src="wide-dark.svg" alt="Koyo logo" className="max-h-12 cursor-pointer " />
										</BaseLink>
									</div>
								</div>

								{/* Center */}
								<div
									className={`absolute z-0 flex w-full transform-gpu flex-row items-center justify-center duration-100 ${
										router.pathname === '/' ? 'opacity-0' : 'opacity-100'
									}`}
								>
									<div className="relative hidden flex-row items-center rounded-2xl bg-black bg-opacity-50 p-0 text-center text-white md:w-1/3 lg:flex xl:w-1/4">
										<div className="group relative z-10 w-1/2">
											<div
												className={`z-10 flex w-full cursor-pointer flex-row items-center justify-center gap-1 rounded-2xl py-2`}
											>
												<div>Exchange</div>
												<div>
													<RiArrowDownSLine className=" text-xl " />
												</div>
											</div>
											<div className=" absolute top-10 hidden w-full flex-col items-center justify-center gap-3 rounded-xl bg-black bg-opacity-90 py-2 text-xl hover:flex group-hover:flex">
												<BaseLink href="/swap">
													<div className=" transform-gpu cursor-pointer duration-150 hover:text-darks-200">Swap</div>
												</BaseLink>
												<BaseLink href="/deposit">
													<div className=" transform-gpu cursor-pointer duration-150 hover:text-darks-200">Deposit</div>
												</BaseLink>
												<BaseLink href="/withdraw">
													<div className=" transform-gpu cursor-pointer duration-150 hover:text-darks-200">Withdraw</div>
												</BaseLink>
											</div>
										</div>
										<div className="group relative z-10 w-1/2">
											<div
												className={`z-10 flex w-full cursor-pointer flex-row items-center justify-center gap-1 rounded-2xl py-2`}
											>
												<div>KYO</div>
												<div>
													<RiArrowDownSLine className=" text-xl " />
												</div>
											</div>
											<div className=" absolute top-10 hidden w-full flex-col items-center justify-center gap-3 rounded-xl bg-black bg-opacity-90 py-2 text-xl hover:flex group-hover:flex">
												<BaseLink href="/kyo/lock">
													<div className=" transform-gpu cursor-pointer duration-150 hover:text-darks-200">Lock</div>
												</BaseLink>
												<BaseLink href="/kyo/gauges">
													<div className=" transform-gpu cursor-pointer duration-150 hover:text-darks-200">Vote</div>
												</BaseLink>
												<BaseLink href="/kyo/farms">
													<div className=" transform-gpu cursor-pointer duration-150 hover:text-darks-200">Farms</div>
												</BaseLink>
											</div>
										</div>
										<PageSelectedOverlay />
									</div>
								</div>

								{/* Right */}
								<div
									className={`static right-0 z-40 flex transform-gpu items-center pr-0 duration-100 ${
										router.pathname === '/' ? 'hidden' : 'flex'
									}`}
								>
									<div className="ml-6 block w-full content-center">
										<div className="hidden lg:block">
											<div className=" flex justify-end space-x-4">
												<ConnectButton />
											</div>
										</div>
									</div>
									<div className="block lg:hidden">
										<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white focus:outline-none ">
											<span className="sr-only">Open main menu</span>
											{open ? (
												<FontAwesomeIcon
													/* @ts-expect-error This is quite odd */
													icon={faTimes}
													className="block h-6 w-6"
													aria-hidden="true"
													onClick={() => {
														setExchangeOpen(false);
														setKyoOpen(false);
													}}
												/>
											) : (
												/* @ts-expect-error This is quite odd */
												<FontAwesomeIcon icon={faBars} className="block h-6 w-6" aria-hidden="true" />
											)}
										</Disclosure.Button>
									</div>
								</div>
								{router.pathname === '/' && (
									<BaseLink href="/swap">
										<button className=" btn m-0 transform-gpu bg-lights-400 px-2 text-black duration-100 hover:bg-lights-300 active:bg-lights-200 lg:btn-md">
											Launch App
										</button>
									</BaseLink>
								)}
							</div>
						</div>

						{router.pathname !== '/' && (
							<MobileNav exchangeOpen={exchangeOpen} setExchangeOpen={setExchangeOpen} kyoOpen={kyoOpen} setKyoOpen={setKyoOpen} />
						)}
					</>
				)}
			</Disclosure>
		</header>
	);
};

export default Navbar;
