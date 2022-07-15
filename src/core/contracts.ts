import {
	BOBA_GAUGE_CONTROLLER_ADDRESS,
	BOBA_GAUGE_DISTRIBUTOR_ADDRESS,
	BOBA_KYO_ADDRESS,
	BOBA_KYO_MINTER_ADDRESS,
	BOBA_veKYO_ADDRESS
} from 'constants/contracts';
import { bobaReadonlyProvider } from 'hooks/useProviders';
import { GaugeController__factory, GaugeDistributor__factory, Koyo__factory, Minter__factory, VotingEscrow__factory } from 'types/contracts/koyo';

export const kyoContract = Koyo__factory.connect(
	BOBA_KYO_ADDRESS, //
	bobaReadonlyProvider
);
export const kyoMinterContract = Minter__factory.connect(
	BOBA_KYO_MINTER_ADDRESS, //
	bobaReadonlyProvider
);
export const votingEscrowContract = VotingEscrow__factory.connect(
	BOBA_veKYO_ADDRESS, //
	bobaReadonlyProvider
);
export const gaugeControllerContract = GaugeController__factory.connect(
	BOBA_GAUGE_CONTROLLER_ADDRESS, //
	bobaReadonlyProvider
);
export const gaugeDistributorContract = GaugeDistributor__factory.connect(
	BOBA_GAUGE_DISTRIBUTOR_ADDRESS, //
	bobaReadonlyProvider
);
