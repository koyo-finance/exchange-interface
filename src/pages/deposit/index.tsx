import { Combobox } from '@headlessui/react';
import { allPoolsByName, getPool, Pool } from 'constants/pools';
import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { Form, Formik } from 'formik';
import useAddLiquidity from 'hooks/contracts/StableSwap/useAddLiquidity';
import useMultiTokenAllowance from 'hooks/contracts/useMultiTokenAllowance';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { Case, Default, Switch } from 'react-if';
import { useAccount, useSigner } from 'wagmi';

const DepositPage: NextPage = () => {
	const pools = allPoolsByName();

	const { data: account } = useAccount();
	const { data: signer } = useSigner();

	const [selectedPoolName, setSelectedPoolName] = useState(pools[0]);
	const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
	const [query, setQuery] = useState('');

	const allowances = useMultiTokenAllowance(
		account?.address,
		selectedPool?.deploy.swap_address,
		selectedPool?.coins?.map((coin) => coin.underlying_address)
	);

	const { mutate: addLiqudity } = useAddLiquidity(signer || undefined, selectedPool?.deploy?.name || '');

	useEffect(() => {
		setSelectedPool(getPool(selectedPoolName) || null);
	}, [selectedPoolName]);

	const filteredPools =
		query === ''
			? pools
			: pools.filter((pool) => {
					return pool.toLowerCase().includes(query.toLowerCase());
			  });

	return (
		<div className="container">
			<div className="content-without-nav flex">
				<div className="m-auto rounded-xl border-4 border-darks-500 bg-lights-300 p-8">
					<div className="text-center">
						<Combobox value={selectedPoolName} onChange={setSelectedPoolName}>
							<Combobox.Input onChange={(event) => setQuery(event.target.value)} className="rounded-xl p-2 px-4" />
							<Combobox.Options className="absolute z-10 mt-1 text-center">
								{filteredPools.map((pool) => (
									<Combobox.Option key={pool} value={pool}>
										{pool}
									</Combobox.Option>
								))}
							</Combobox.Options>
						</Combobox>
					</div>

					{selectedPool && (
						<>
							<h2 className="mt-4 text-center text-xl font-bold">Deposit tokens</h2>
							<Formik
								initialValues={Object.fromEntries(selectedPool.coins.map((coin) => [coin.name, 0]))}
								onSubmit={(values) => {
									return addLiqudity([
										// @ts-expect-error Huh
										Object.entries(values)
											.slice(0, selectedPool.coins.length)
											.map((coins) => coins[1] || 0)
											.map((amount, i) => parseUnits(amount.toString(), selectedPool.coins[i].decimals)),
										0,
										{ gasLimit: 600_000 }
									]);
								}}
							>
								{(props) => (
									<Form>
										<div>
											<div className="mt-4 grid grid-cols-2 gap-8">
												{selectedPool.coins.map((coin) => (
													<div key={coin.name}>
														<label htmlFor={coin.name} className="text-xl font-bold">
															{coin.name}
														</label>
														<br />
														<input
															name={coin.name}
															onChange={props.handleChange}
															value={props.values[coin.name]}
															type="number"
															className="mt-4 inline-block w-fit rounded-lg border border-black bg-transparent px-6 py-4 font-inter"
														/>
													</div>
												))}
											</div>
											<div className="mt-4 grid grid-cols-2">
												<div className="flex h-full items-center justify-center text-center font-bold text-white"></div>
												<div>
													<Switch>
														{selectedPool.coins.map((coin, i) => (
															<Case
																condition={BigNumber.from(allowances[i].data || 0).lt(
																	parseUnits((props.values[coin.name] || 0).toString(), coin.decimals)
																)}
															></Case>
														))}
														<Default>
															<button
																type="submit"
																className="btn border border-white bg-lights-300 font-sora text-sm lowercase text-white"
															>
																confirm
															</button>
														</Default>
													</Switch>
												</div>
											</div>
										</div>
									</Form>
								)}
							</Formik>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default DepositPage;
