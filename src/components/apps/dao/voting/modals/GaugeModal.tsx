import { GAUGES_SUBGRAPH_URL } from 'constants/subgraphs';
import { useGetAllGaugesQuery } from 'query/generated/graphql-codegen-generated';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export interface PoolsModalProps {
	setGauge: (gauge: string) => void;
	closeModal: () => void;
}

const GaugeModal: React.FC<PoolsModalProps> = ({ setGauge, closeModal }) => {
	const { data: allGaugesQueryData } = useGetAllGaugesQuery({
		endpoint: GAUGES_SUBGRAPH_URL
	});
	const gaugeList = (allGaugesQueryData?.allGauges || []) //
		.map((gauge) => ({ address: gauge.address, name: gauge.symbol.replace('-gauge', '') }));

	const [filteredGaugeList, setFilteredGaugeList] = useState(gaugeList);

	const filterGaugeListHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === '') {
			setFilteredGaugeList(gaugeList);
			return;
		}
		const filteredList = gaugeList.filter((gauge) => gauge.address.includes(e.target.value) || gauge.name.includes(e.target.value));
		setFilteredGaugeList(filteredList);
	};

	return (
		<div className=" fixed top-0 left-0 z-40 flex min-h-screen w-full items-center justify-center px-4 ">
			<div className="fixed top-0 left-0 z-0 min-h-screen w-full cursor-pointer bg-black bg-opacity-50" onClick={closeModal}></div>
			<div className="z-20 flex w-[30rem] flex-col gap-4 rounded-xl bg-gray-800 p-4 text-white">
				<div className=" flex w-full flex-row items-center justify-between">
					<div>Select Gauge</div>
					<div className="cursor-pointer text-2xl" onClick={closeModal}>
						<FaTimes />
					</div>
				</div>
				<div>
					<input
						type="text"
						placeholder="Select Gauge by name or address"
						onChange={filterGaugeListHandler}
						className="w-full rounded-xl border-2 border-darks-300 bg-transparent p-2 text-lg outline-none"
					/>
				</div>
				<div className="flex  max-h-[50vh] w-full flex-col overflow-y-scroll">
					{filteredGaugeList.map((gauge, i) => (
						<div
							key={i}
							className="flex transform-gpu cursor-pointer flex-row justify-between rounded-lg p-3 text-lg duration-100 hover:bg-gray-700"
							onClick={() => {
								setGauge(gauge.address);
								closeModal();
							}}
						>
							<div className="flex w-full flex-row justify-between">
								<div className=" max-w-1/2">{gauge.name}</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default GaugeModal;
