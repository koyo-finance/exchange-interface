import {
	BOBA_GAUGE_CONTROLLER_ADDRESS,
	BOBA_GAUGE_DISTRIBUTOR_ADDRESS,
	BOBA_KYO_ADDRESS,
	BOBA_KYO_MINTER_ADDRESS,
	BOBA_ORACLE_WEIGHTED_POOL_FACTORY_ADDRESS,
	BOBA_STABLE_POOL_FACTORY_ADDRESS,
	BOBA_VAULT_ADDRESS,
	BOBA_VAULT_HELPER_ADDRESS,
	BOBA_veKYO_ADDRESS,
	BOBA_WEIGHTED_POOL_FACTORY_ADDRESS
} from 'constants/contracts';
import { bobaReadonlyProvider } from 'hooks/useProviders';
import { OracleWeightedPoolFactory__factory, Vault__factory, WeightedPoolFactory__factory } from 'types/contracts/exchange';
import { KoyoHelpers__factory } from 'types/contracts/exchange/factories/KoyoHelpers__factory';
import { StablePoolFactory__factory } from 'types/contracts/exchange/factories/StablePoolFactory__factory';
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

export const vaultContract = Vault__factory.connect(
	BOBA_VAULT_ADDRESS, //
	bobaReadonlyProvider
);
export const vaultHelperContract = KoyoHelpers__factory.connect(
	BOBA_VAULT_HELPER_ADDRESS, //
	bobaReadonlyProvider
);
export const oracleWeightedPoolFactoryContract = OracleWeightedPoolFactory__factory.connect(
	BOBA_ORACLE_WEIGHTED_POOL_FACTORY_ADDRESS, //
	bobaReadonlyProvider
);
export const weightedPoolFactoryContract = WeightedPoolFactory__factory.connect(
	BOBA_WEIGHTED_POOL_FACTORY_ADDRESS, //
	bobaReadonlyProvider
);
export const stablePoolFactoryContract = StablePoolFactory__factory.connect(
	BOBA_STABLE_POOL_FACTORY_ADDRESS, //
	bobaReadonlyProvider
);
