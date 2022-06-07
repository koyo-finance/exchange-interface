import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Disclosure } from '@headlessui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import PageSelectedOverlay from './Desktop/PageSelectedOverlay';

const Navbar: React.FC = () => {
	const router = useRouter();

	return (
		<>
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
										}
				`}
									>
										<div className="relative hidden flex-row items-center rounded-2xl bg-black bg-opacity-50 p-0 text-center text-white md:w-1/2 lg:flex xl:w-1/3">
											<Link href="/swap">
												<div className={`z-10 w-1/4 cursor-pointer rounded-2xl py-2 `}>Swap</div>
											</Link>
											<Link href="/deposit">
												<div className={`z-10 w-1/4 cursor-pointer rounded-2xl py-2 `}>Deposit</div>
											</Link>
											<Link href="/withdraw">
												<div className={`z-10 w-1/4 cursor-pointer rounded-2xl py-2`}>Withdraw</div>
											</Link>
											<div className="group relative z-10 w-1/4">
												<div className={`z-10 w-full cursor-pointer rounded-2xl py-2`}>
													{router.pathname.includes('/kyo')
														? router.pathname[5].toUpperCase() + router.pathname.slice(6, router.pathname.length)
														: 'KYO'}
												</div>
												<div className=" absolute top-10 hidden w-full flex-col items-center justify-center gap-1 rounded-xl bg-black bg-opacity-90 py-2 hover:flex group-hover:flex">
													<Link href="/kyo/lock">
														<div className=" transform-gpu cursor-pointer duration-150 hover:text-darks-200">Lock</div>
													</Link>
													<Link href="/kyo/gauges">
														<div className=" transform-gpu cursor-pointer duration-150 hover:text-darks-200">Gauges</div>
													</Link>
												</div>
											</div>
											<PageSelectedOverlay />
										</div>
									</div>

									{/* Right */}
									<div
										className={`static right-0 z-40 flex transform-gpu items-center pr-0 duration-100 ${
											router.pathname === '/' ? 'opacity-0' : 'opacity-100'
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
													/* @ts-expect-error This is quite odd */
													<FontAwesomeIcon icon={faTimes} className="block h-6 w-6" aria-hidden="true" />
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
								<Disclosure.Panel className="lg:hidden">
									<div className="w-full space-y-1 px-2 pt-2 pb-3 shadow-lg">
										<div className=" flex w-full justify-center">
											<div className="flex flex-col gap-y-4 text-center text-white">
												<div className={`z-10 w-full rounded-2xl py-2 `}>
													<Link href="/swap">
														<span className="transform-gpu cursor-pointer px-4 duration-200 hover:text-lights-400">
															Swap
														</span>
													</Link>
												</div>
												<div className="z-10 w-full rounded-2xl py-2">
													<Link href="/deposit">
														<span className="cursor-pointer px-4 duration-200 hover:text-lights-400">Deposit</span>
													</Link>
												</div>
												<div className="z-10 w-full rounded-2xl py-2">
													<Link href="/withdraw">
														<span className="cursor-pointer px-4 duration-200 hover:text-lights-400">Withdraw</span>
													</Link>
												</div>
												<div className="z-10 w-full rounded-2xl py-2">
													<Link href="/kyo/lock">
														<div className=" transform-gpu cursor-pointer px-4 duration-200 hover:text-lights-400">
															Lock
														</div>
													</Link>
												</div>
												<div className="z-10 w-full rounded-2xl py-2">
													<Link href="/kyo/gauges">
														<div className=" transform-gpu cursor-pointer px-4 duration-200 hover:text-lights-400">
															Gauges
														</div>
													</Link>
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
		</>
	);
};

export default Navbar;
