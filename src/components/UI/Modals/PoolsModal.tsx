import { EXLUDED_POOL_IDS } from 'config/pool-lists';
import { EXCHANGE_SUBGRAPH_URL } from 'constants/subgraphs';
import { LitePoolFragment, useGetPoolsQuery } from 'query/generated/graphql-codegen-generated';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { getShortPoolName } from 'utils/exchange/getShortPoolName';

export interface PoolsModalProps {
	setPool: (poolAddress: string) => void;
	closeModal: () => void;
}

const PoolsModal: React.FC<PoolsModalProps> = (props) => {
	const { data: poolsQuery } = useGetPoolsQuery({ endpoint: EXCHANGE_SUBGRAPH_URL });
	const pools = poolsQuery?.allPools;

	const [filteredPoolList, setFilteredPoolList] = useState(pools?.filter((pool) => !EXLUDED_POOL_IDS.includes(pool.id)));

	const filterPoolsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === '') {
			setFilteredPoolList(pools?.filter((pool) => !EXLUDED_POOL_IDS.includes(pool.id)));
			return;
		}
		const filteredList = pools
			?.filter((pool) => !EXLUDED_POOL_IDS.includes(pool.id))
			.filter(
				(pool: LitePoolFragment) =>
					getShortPoolName(pool).includes(e.target.value) ||
					getShortPoolName(pool).toLowerCase().includes(e.target.value) ||
					getShortPoolName(pool).includes(e.target.value) ||
					getShortPoolName(pool).toLowerCase().includes(e.target.value) ||
					pool.address.includes(e.target.value)
			);

		setFilteredPoolList(filteredList);
	};

	return (
		<div className=" fixed top-0 left-0 z-40 flex min-h-screen w-full items-center justify-center px-4 ">
			<div className="fixed top-0 left-0 z-0 min-h-screen w-full cursor-pointer bg-black bg-opacity-50" onClick={props.closeModal}></div>
			<div className="z-20 flex w-full flex-col gap-4 rounded-xl bg-gray-800 p-4 text-white md:w-[40rem] lg:w-[35vw]">
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
				<div className="flex max-h-[50vh] flex-col overflow-y-scroll">
					{filteredPoolList?.map((pool) => (
						<div
							key={pool.address}
							className="flex transform-gpu cursor-pointer flex-row justify-between rounded-lg p-3 text-lg duration-100 hover:bg-gray-700"
							onClick={() => {
								props.setPool(pool.address);
								props.closeModal();
							}}
						>
							<div>{getShortPoolName(pool)}</div>
							<div className="max-w-[60%] flex-row gap-1 truncate text-gray-300">{parseFloat(pool.swapFee) * 100}%</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default PoolsModal;
