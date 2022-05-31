import { useForceWithdrawLockedEscrow } from 'hooks/contracts/KYO/useForceWithdraw';
import React from 'react';
import { useSigner } from 'wagmi';

const ForceWithdrawModal: React.FC<{ closeForceWithdrawModal: () => void }> = ({ closeForceWithdrawModal }) => {
	const { data: signer } = useSigner();
	const signerDefaulted = signer || undefined;

	const { mutate: kyoForceWithdraw } = useForceWithdrawLockedEscrow(signerDefaulted);

	return (
		<div className="fixed top-0 left-0 z-30 flex h-screen w-screen items-center justify-center px-2">
			<div
				className="absolute top-0 left-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-60"
				onClick={() => closeForceWithdrawModal()}
			></div>
			<div className="md:2/3 lg:1/2 z-20  flex w-full flex-col gap-6 rounded-xl bg-zinc-800 p-4 text-white xl:w-1/3">
				<div className="flex w-full flex-row justify-between pr-2 text-2xl">
					<div>Are you sure?</div>
					<div
						className=" transform-gpu cursor-pointer font-extrabold duration-150 hover:text-red-500"
						onClick={() => closeForceWithdrawModal()}
					>
						X
					</div>
				</div>
				<div className="text-lg">
					If you make a <b>FORCE WITHDRAW</b> you will lose 80% of your deposited KYO, as a penalty for not waiting a full lock period. If
					you still want to withdraw your KYO click "FORCE WITHDRAW".
				</div>
				<button
					className="btn w-full border-0 bg-red-600 text-xl text-white outline-none hover:bg-red-500"
					onClick={() => kyoForceWithdraw([{ gasLimit: 700_000 }])}
				>
					FORCE WITHDRAW
				</button>
			</div>
		</div>
	);
};

export default ForceWithdrawModal;
