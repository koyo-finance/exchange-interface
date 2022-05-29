import { calculatePercentage, formatBalance } from '@koyofinance/core-sdk';
import LockerForm from 'components/UI/Forms/LockerForm';
import { ROOT_WITH_PROTOCOL } from 'constants/links';
import { kyoContract, votingEscrowContract } from 'core/contracts';
import useTokenBalance from 'hooks/contracts/useTokenBalance';
import useTokenTotalSupply from 'hooks/contracts/useTokenTotalSupply';
import { SwapLayout } from 'layouts/SwapLayout';
import { NextSeo } from 'next-seo';
import React from 'react';
import { ExtendedNextPage } from 'types/ExtendedNextPage';
import { useAccount } from 'wagmi';

const LockIndexPage: ExtendedNextPage = () => {
	const { data: account } = useAccount();
	const accountAddress = account?.address;

	const { data: kyoBalance = 0 } = useTokenBalance(accountAddress, kyoContract.address);
	const { data: kyoEscrowed = 0 } = useTokenBalance(votingEscrowContract.address, kyoContract.address);
	const { data: veKyoBalance = 0 } = useTokenBalance(accountAddress, votingEscrowContract.address);
	const { data: kyoTotalSupply = 0 } = useTokenTotalSupply(kyoContract.address);
	const { data: veKyoTotalSupply = 0 } = useTokenTotalSupply(votingEscrowContract.address);

	return (
		<>
			<NextSeo title="Lock" canonical={`${ROOT_WITH_PROTOCOL}/lock`} />
			<div className="relative flex min-h-screen w-full items-center justify-center bg-darks-500 pt-24 pb-6 md:pb-0 lg:pt-20">
				<div className="container pt-20">
					<div>
						<h1 className="text-5xl font-bold">Kōyō locking</h1>
						<p className="pt-5 text-xl">
							Lock your <code>KYO</code> in the Kōyō Finance locker to receive emissions and a share of pool fees alongside
							participating in the governance votes.
						</p>
					</div>
					<div className="pt-16">
						<h2 className="text-3xl font-bold">My voting power</h2>
						<p className="pt-5 text-xl">These numbers represent .....</p>
						<div className="mx-14 mt-8">
							<div className="grid w-full grid-cols-2 grid-rows-1">
								<div className="grid w-full grid-cols-2 grid-rows-1">
									<div>
										<span className="relative top-1 text-4xl font-bold">{formatBalance(kyoBalance)}</span>
										<p className="pt-2 text-xl">My KYO balance</p>
									</div>
									<div>
										<span className="relative top-1 text-4xl font-bold">{formatBalance(veKyoBalance)}</span>
										<p className="pt-2 text-xl">My locked KYO</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="pt-20">
						<h2 className="text-3xl font-bold">Lock KYO tokens</h2>
						<div className="mt-6 w-full rounded-lg border-2 border-black">
							<div className="py-11 px-20">
								<LockerForm />
							</div>
						</div>
					</div>
					<div className="pt-20">
						<h2 className="text-3xl font-bold">Total voting power</h2>
						<p className="pt-5 text-xl">General stats about the veKYO system</p>
						<div className="mx-14 mt-16">
							<div className="grid w-full grid-cols-3 grid-rows-2 gap-6 gap-y-12">
								<div>
									<span className="relative top-1 text-4xl font-bold">{formatBalance(kyoEscrowed)}</span>
									<p className="pt-2 text-xl">Total KYO vote-locked</p>
								</div>
								<div>
									<span className="relative top-1 text-4xl font-bold">
										{calculatePercentage(kyoTotalSupply, kyoEscrowed).toLocaleString('fullwide', {
											maximumFractionDigits: 5
										})}{' '}
										%
									</span>
									<p className="pt-2 text-xl">
										Percentage of total
										<br />
										KYO locked
									</p>
								</div>
								<div>
									<span className="relative top-1 text-4xl font-bold">{formatBalance(veKyoTotalSupply)}</span>
									<p className="pt-2 text-xl">Total veKYO</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

LockIndexPage.Layout = SwapLayout('lock');
export default LockIndexPage;
