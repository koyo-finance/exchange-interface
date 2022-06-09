import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export interface PoolsModalProps {
	setGauge: (gauge: string) => void;
	closeModal: () => void;
}

const GaugeModal: React.FC<PoolsModalProps> = ({ setGauge, closeModal }) => {
	const FourKoyoGaugeAddress = '0x24f47A11AEE5d1bF96C18dDA7bB0c0Ef248A8e71';
	const gaugeList = [{ name: '4koyo', address: FourKoyoGaugeAddress, pools: ['4pool'] }];

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
								<div className=" max-w-1/2 text-gray-400">
									(
									{gauge.pools.map((pool) => (
										<span className="">{pool}</span>
									))}
									)
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default GaugeModal;
