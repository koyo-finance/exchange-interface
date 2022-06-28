import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Disclosure } from '@headlessui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import PageSelectedOverlay from './Desktop/PageSelectedOverlay';

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
										<Link href="/">
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img src="/wide-dark.svg" alt="Koyo logo" className="max-h-12 cursor-pointer " />
										</Link>
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
												<Link href="/swap">
													<div className=" transform-gpu cursor-pointer duration-150 hover:text-darks-200">Swap</div>
												</Link>
												<Link href="/deposit">
													<div className=" transform-gpu cursor-pointer duration-150 hover:text-darks-200">Deposit</div>
												</Link>
												<Link href="/withdraw">
													<div className=" transform-gpu cursor-pointer duration-150 hover:text-darks-200">Withdraw</div>
												</Link>
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
												<Link href="/kyo/lock">
													<div className=" transform-gpu cursor-pointer duration-150 hover:text-darks-200">Lock</div>
												</Link>
												<Link href="/kyo/gauges">
													<div className=" transform-gpu cursor-pointer duration-150 hover:text-darks-200">Vote</div>
												</Link>
												<Link href="/kyo/farms">
													<div className=" transform-gpu cursor-pointer duration-150 hover:text-darks-200">Farms</div>
												</Link>
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
									<Link href="/swap">
										<button className=" btn m-0 transform-gpu bg-lights-400 px-2 text-black duration-100 hover:bg-lights-300 active:bg-lights-200 lg:btn-md">
											Launch App
										</button>
									</Link>
								)}
							</div>
						</div>

						{router.pathname !== '/' && (
							<Disclosure.Panel className=" lg:hidden">
								<div className="w-full space-y-1 px-2 pt-4 pb-3 shadow-lg">
									<div className=" flex w-full justify-center">
										<div className=" flex flex-col gap-y-6 text-center text-white">
											<div className={`relative z-20 w-full ${exchangeOpen ? ' mb-44' : ''} transform-gpu duration-150`}>
												<div
													className=" flex w-full flex-row justify-center gap-1"
													onClick={() => setExchangeOpen(!exchangeOpen)}
												>
													<div>Exchange</div>
													<div>
														<RiArrowDownSLine
															className={` ${
																exchangeOpen ? 'rotate-180' : 'rotate-0'
															} transform-gpu text-xl duration-150 `}
														/>
													</div>
												</div>
												<div
													className={` ${
														exchangeOpen ? '' : 'hidden opacity-0'
													} absolute top-8 left-0 flex w-full transform-gpu flex-col gap-y-4 duration-150`}
												>
													<div className="z-20 w-full rounded-2xl py-2">
														<Link href="/swap">
															<span className="transform-gpu cursor-pointer px-4 duration-200 hover:text-lights-400">
																Swap
															</span>
														</Link>
													</div>
													<div className="z-20 w-full rounded-2xl py-2">
														<Link href="/deposit">
															<span className="cursor-pointer px-4 duration-200 hover:text-lights-400">Deposit</span>
														</Link>
													</div>
													<div className="z-20 w-full rounded-2xl py-2">
														<Link href="/withdraw">
															<span className="cursor-pointer px-4 duration-200 hover:text-lights-400">Withdraw</span>
														</Link>
													</div>
													<hr className=" w-full bg-white" />
												</div>
											</div>
											<div className={`relative z-20 w-full ${kyoOpen ? ' mb-40' : ''} transform-gpu duration-150`}>
												<div className=" flex w-full flex-row justify-center gap-1" onClick={() => setKyoOpen(!kyoOpen)}>
													<div>KYO</div>
													<div>
														<RiArrowDownSLine
															className={` ${kyoOpen ? 'rotate-180' : 'rotate-0'} transform-gpu text-xl duration-150 `}
														/>
													</div>
												</div>
												<div
													className={` ${
														kyoOpen ? '' : ' hidden opacity-0'
													} absolute top-10 left-0 flex w-full transform-gpu flex-col gap-y-4 duration-150`}
												>
													<div className="z-20 w-full rounded-2xl py-2">
														<Link href="/kyo/lock">
															<div className=" transform-gpu cursor-pointer px-4 duration-200 hover:text-lights-400">
																Lock
															</div>
														</Link>
													</div>
													<div className="z-20 w-full rounded-2xl py-2">
														<Link href="/kyo/gauges">
															<div className=" transform-gpu cursor-pointer px-4 duration-200 hover:text-lights-400">
																Vote
															</div>
														</Link>
													</div>
													<div className="z-20 w-full rounded-2xl py-2">
														<Link href="/kyo/farms">
															<div className=" transform-gpu cursor-pointer px-4 duration-200 hover:text-lights-400">
																Farms
															</div>
														</Link>
													</div>
												</div>
											</div>
											<ConnectButton />
										</div>
									</div>
								</div>
							</Disclosure.Panel>
						)}
					</>
				)}
			</Disclosure>
		</header>
	);
};

export default Navbar;
