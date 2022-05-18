import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Disclosure } from '@headlessui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Navbar: React.FC = () => {
	const router = useRouter();

	return (
		<>
			<header className="fixed left-0 top-0 z-20 w-full bg-darks-500 pt-2">
				<Disclosure as="nav" className="bg-transparenr border-b-2 border-darks-500 font-semibold text-black">
					{({ open }) => (
						<>
							<div className="container mx-auto px-8 py-2">
								<div className="relative flex h-12 items-center justify-between">
									{/* Left */}
									<div className="z-40 flex items-stretch justify-start pl-0">
										<div className="flex items-center">
											<Link href="/">
												<img src="/wide.svg" alt="Koyo logo" className="max-h-12 cursor-pointer" />
											</Link>
										</div>
									</div>

									{/* Center */}
									<div className="absolute z-0 flex w-full flex-row items-center justify-center">
										<div className="relative hidden flex-row items-center rounded-2xl bg-black bg-opacity-50 p-0 text-center text-white lg:flex lg:w-1/4 ">
											<div className={`z-10 w-1/3 rounded-2xl py-2 `}>
												<Link href="/swap">
													<span className="cursor-pointer px-4">Swap</span>
												</Link>
											</div>
											<div className={`z-10 w-1/3 rounded-2xl py-2 `}>
												<Link href="/deposit">
													<span className="cursor-pointer px-4">Deposit</span>
												</Link>
											</div>
											<div className={`z-10 w-1/3 rounded-2xl py-2`}>
												<Link href="/withdraw">
													<span className="cursor-pointer px-4">Withdraw</span>
												</Link>
											</div>
											<div
												className={`absolute left-0 z-0 h-10 w-1/3 transform rounded-2xl bg-darks-200 bg-opacity-100 duration-200 ${
													router.pathname === '/swap' ? ' translate-x-0' : ''
												} ${router.pathname === '/deposit' ? ' ml-0 translate-x-[100%]' : ''} ${
													router.pathname === '/withdraw' ? 'ml-0 translate-x-[200%]' : ''
												} ${router.pathname === '/' ? ' -translate-x-[100%] opacity-0' : ''}`}
											></div>
										</div>
									</div>

									{/* Right */}
									<div className="static right-0 z-40 flex items-center pr-0">
										<div className="ml-6 block w-full content-center">
											<div className="hidden md:block">
												<div className=" flex justify-end space-x-4">
													<ConnectButton />
												</div>
											</div>
										</div>
										<div className="block md:hidden">
											<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
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
								</div>
							</div>

							<Disclosure.Panel className="md:hidden">
								<div className="w-full space-y-1 px-2 pt-2 pb-3 shadow-lg">
									<div className=" flex w-full justify-center">
										<div className="flex flex-col gap-y-4 text-center">
											<Link href="/swap">Swap</Link>
											<Link href="/deposit">Deposit</Link>
											<ConnectButton />
										</div>
									</div>
								</div>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</header>
		</>
	);
};

export default Navbar;
