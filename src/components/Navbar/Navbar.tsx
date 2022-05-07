import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Disclosure } from '@headlessui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
	return (
		<>
			<header className="sticky top-0 z-20 w-full">
				<Disclosure as="nav" className="border-b-2 border-darks-500 bg-lights-200 font-semibold text-black">
					{({ open }) => (
						<>
							<div className="container mx-auto px-8 py-2">
								<div className="relative flex h-12 items-center justify-between">
									{/* Left */}
									<div className="flex items-stretch justify-start pl-0">
										<div className="flex flex-shrink-0 items-center">
											<Link href="/">
												<img src="/wide.svg" alt="Koyo logo" className="max-h-9 cursor-pointer" />
											</Link>
										</div>
									</div>

									{/* Center */}
									<div className="flex justify-self-center">
										<Link href="/swap">Swap</Link>
									</div>

									{/* Right */}
									<div className="static inset-auto right-0 flex items-center pr-0">
										<div className="ml-6 block w-full content-center">
											<div className="hidden md:block">
												<div className="flex justify-end space-x-4">
													<ConnectButton />
												</div>
											</div>
										</div>
										<div className="block md:hidden">
											<Disclosure.Button className="focus:outline-none inline-flex items-center justify-center rounded-md p-2 focus:ring-2 focus:ring-inset focus:ring-white">
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
									<div className="justify-content-evenly flex w-full">
										<ConnectButton />
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
