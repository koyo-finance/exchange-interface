import { ChainId } from '@koyofinance/core-sdk';
import { Pool } from '@koyofinance/swap-sdk';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectAllPoolsByChainId } from 'state/reducers/lists';

export interface PoolsModalProps {
	setPool: (pool: string) => void;
	closeModal: () => void;
}

const PoolsModal: React.FC<PoolsModalProps> = (props) => {
	const pools = useSelector(selectAllPoolsByChainId(ChainId.BOBA));
	const [filteredPoolList, setFilteredPoolList] = useState(pools);

	const filterPoolsHandler = (e: any) => {
		if (e.target.value === '') {
			setFilteredPoolList(pools);
			return;
		}
		const filteredList = pools.filter(
			(pool: Pool) =>
				pool.id.includes(e.target.value) ||
				pool.id.toLowerCase().includes(e.target.value) ||
				pool.id.includes(e.target.value) ||
				pool.id.toLowerCase().includes(e.target.value)
		);
		setFilteredPoolList(filteredList);
	};

	return (
		<div className=" fixed top-0 left-0 z-40 flex min-h-screen w-full items-center justify-center ">
			<div className="fixed top-0 left-0 z-0 min-h-screen w-full cursor-pointer bg-black bg-opacity-50" onClick={props.closeModal}></div>
			<div className="z-20 flex w-[30rem] flex-col gap-4 rounded-xl bg-gray-800 p-4 text-white">
				<div className=" flex w-full flex-row items-center justify-between">
					<div>Select Pool</div>
					<div className="cursor-pointer text-2xl" onClick={props.closeModal}>
						<FaTimes />
					</div>
				</div>
				<div>
					<input
						type="text"
						placeholder="Select Token by Name or Address"
						onChange={filterPoolsHandler}
						className="w-full rounded-xl border-2 border-darks-300 bg-transparent p-2 text-lg outline-none"
					/>
				</div>
				<div className="flex  max-h-[50vh] w-full flex-col overflow-y-scroll">
					{filteredPoolList.map((pool) => (
						<div
							key={pool.id}
							className="flex transform-gpu cursor-pointer flex-row justify-between rounded-lg p-3 text-lg duration-100 hover:bg-gray-700"
							onClick={() => {
								props.setPool(pool.id);
								props.closeModal();
							}}
						>
							<div>{pool.id}</div>
							<div className="flex flex-row gap-1 text-gray-300">{pool.assets}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default PoolsModal;
