import FormApproveAsset from 'components/Pools/StableSwap/FormApproveAsset';
import { getPool } from 'constants/pools';
import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { Form, Formik } from 'formik';
import useExchange from 'hooks/contracts/StableSwap/useExchange';
import useTokenAllowance from 'hooks/contracts/useTokenAllowance';
import { NextPage } from 'next';
import React from 'react';
import { Case, Default, Switch } from 'react-if';
import { useAccount, useSigner } from 'wagmi';

const SwapPage: NextPage = () => {
	const poolName = '4pool';
	const pool = getPool(poolName)!;

	const { data: account } = useAccount();
	const { data: signer } = useSigner();

	const tokenIn = 0;
	const tokenOut = 3;

	const { data: tokenInAllowance = 0 } = useTokenAllowance(account?.address, pool.deploy.swap_address, pool.coins[tokenIn].underlying_address);
	const { mutate: exchange } = useExchange(signer || undefined, poolName);

	return (
		<div className="container">
			<div className="content-without-nav flex">
				<div className="m-auto rounded-xl border-4 border-darks-500 bg-lights-300 p-8">
					<h2 className="mt-4 text-center text-xl font-bold">Deposit tokens</h2>
					<Formik
						initialValues={{ tokenIn: 0 }}
						onSubmit={(values) => {
							return exchange([
								tokenIn,
								tokenOut,
								parseUnits(values.tokenIn.toString(), pool.coins[tokenIn].decimals),
								0,
								{ gasLimit: 300_000 }
							]);
						}}
					>
						{(props) => (
							<Form>
								<div>
									<div className="mt-4 grid grid-cols-2 gap-8">
										<label htmlFor="tokenIn" className="text-xl font-bold">
											{pool.coins[tokenIn].name}
										</label>
										<br />
										<input
											name="tokenIn"
											onChange={props.handleChange}
											value={props.values.tokenIn}
											type="number"
											className="w-fit mt-4 inline-block rounded-lg border border-black bg-transparent px-6 py-4 font-inter"
										/>
									</div>
									<div className="mt-4 grid grid-cols-2">
										<div>
											<Switch>
												<Case
													condition={BigNumber.from(tokenInAllowance).lt(
														parseUnits((props.values.tokenIn || 0).toString(), pool.coins[tokenIn].decimals)
													)}
												>
													<FormApproveAsset
														asset={pool.coins[tokenIn].underlying_address}
														spender={pool.deploy.swap_address}
														amount={props.values.tokenIn}
														decimals={pool.coins[tokenIn].decimals}
														className="btn border border-white bg-lights-300 font-sora text-sm lowercase text-white"
													>
														approve - {pool.coins[tokenIn].name}
													</FormApproveAsset>
												</Case>
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
				</div>
			</div>
		</div>
	);
};

export default SwapPage;
