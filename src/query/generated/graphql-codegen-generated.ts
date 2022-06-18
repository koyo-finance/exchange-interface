/* tslint:disable */ /* eslint-disable @typescript-eslint/consistent-type-definitions */
import { useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
	return async (): Promise<TData> => {
		const res = await fetch(endpoint, {
			method: 'POST',
			...requestInit,
			body: JSON.stringify({ query, variables })
		});

		const json = await res.json();

		if (json.errors) {
			const { message } = json.errors[0];

			throw new Error(message);
		}

		return json.data;
	};
}
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	BigDecimal: string;
	BigInt: string;
	Bytes: string;
}

export interface Account {
	__typename: 'Account';
	address: Scalars['Bytes'];
	/**    */
	gaugeWeightVotes?: Maybe<Array<GaugeWeightVote>>;
	/**  Liquidity gauges this account contributed to  */
	gauges?: Maybe<Array<GaugeLiquidity>>;
	id: Scalars['ID'];
	internalBalances?: Maybe<Array<AccountInternalBalance>>;
}

export interface AccountGaugeWeightVotesArgs {
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<GaugeWeightVote_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	where?: InputMaybe<GaugeWeightVote_Filter>;
}

export interface AccountGaugesArgs {
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<GaugeLiquidity_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	where?: InputMaybe<GaugeLiquidity_Filter>;
}

export interface AccountInternalBalancesArgs {
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<AccountInternalBalance_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	where?: InputMaybe<AccountInternalBalance_Filter>;
}

export interface AccountInternalBalance {
	__typename: 'AccountInternalBalance';
	account?: Maybe<Account>;
	balance: Scalars['BigDecimal'];
	balanceRaw: Scalars['BigInt'];
	id: Scalars['ID'];
	token: Scalars['Bytes'];
}

export interface AccountInternalBalance_Filter {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	account?: InputMaybe<Scalars['String']>;
	account_contains?: InputMaybe<Scalars['String']>;
	account_contains_nocase?: InputMaybe<Scalars['String']>;
	account_ends_with?: InputMaybe<Scalars['String']>;
	account_ends_with_nocase?: InputMaybe<Scalars['String']>;
	account_gt?: InputMaybe<Scalars['String']>;
	account_gte?: InputMaybe<Scalars['String']>;
	account_in?: InputMaybe<Array<Scalars['String']>>;
	account_lt?: InputMaybe<Scalars['String']>;
	account_lte?: InputMaybe<Scalars['String']>;
	account_not?: InputMaybe<Scalars['String']>;
	account_not_contains?: InputMaybe<Scalars['String']>;
	account_not_contains_nocase?: InputMaybe<Scalars['String']>;
	account_not_ends_with?: InputMaybe<Scalars['String']>;
	account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	account_not_in?: InputMaybe<Array<Scalars['String']>>;
	account_not_starts_with?: InputMaybe<Scalars['String']>;
	account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	account_starts_with?: InputMaybe<Scalars['String']>;
	account_starts_with_nocase?: InputMaybe<Scalars['String']>;
	balance?: InputMaybe<Scalars['BigDecimal']>;
	balanceRaw?: InputMaybe<Scalars['BigInt']>;
	balanceRaw_gt?: InputMaybe<Scalars['BigInt']>;
	balanceRaw_gte?: InputMaybe<Scalars['BigInt']>;
	balanceRaw_in?: InputMaybe<Array<Scalars['BigInt']>>;
	balanceRaw_lt?: InputMaybe<Scalars['BigInt']>;
	balanceRaw_lte?: InputMaybe<Scalars['BigInt']>;
	balanceRaw_not?: InputMaybe<Scalars['BigInt']>;
	balanceRaw_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	balance_gt?: InputMaybe<Scalars['BigDecimal']>;
	balance_gte?: InputMaybe<Scalars['BigDecimal']>;
	balance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	balance_lt?: InputMaybe<Scalars['BigDecimal']>;
	balance_lte?: InputMaybe<Scalars['BigDecimal']>;
	balance_not?: InputMaybe<Scalars['BigDecimal']>;
	balance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	token?: InputMaybe<Scalars['Bytes']>;
	token_contains?: InputMaybe<Scalars['Bytes']>;
	token_in?: InputMaybe<Array<Scalars['Bytes']>>;
	token_not?: InputMaybe<Scalars['Bytes']>;
	token_not_contains?: InputMaybe<Scalars['Bytes']>;
	token_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
}

export type AccountInternalBalance_OrderBy = 'account' | 'balance' | 'balanceRaw' | 'id' | 'token';

export interface Account_Filter {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	address?: InputMaybe<Scalars['Bytes']>;
	address_contains?: InputMaybe<Scalars['Bytes']>;
	address_in?: InputMaybe<Array<Scalars['Bytes']>>;
	address_not?: InputMaybe<Scalars['Bytes']>;
	address_not_contains?: InputMaybe<Scalars['Bytes']>;
	address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
}

export type Account_OrderBy = 'address' | 'gaugeWeightVotes' | 'gauges' | 'id' | 'internalBalances';

export interface BlockChangedFilter {
	number_gte: Scalars['Int'];
}

export interface Block_Height {
	hash?: InputMaybe<Scalars['Bytes']>;
	number?: InputMaybe<Scalars['Int']>;
	number_gte?: InputMaybe<Scalars['Int']>;
}

export interface Gauge {
	__typename: 'Gauge';
	address: Scalars['Bytes'];
	created: Scalars['BigInt'];
	createdAtBlock: Scalars['BigInt'];
	createdAtTransaction: Scalars['Bytes'];
	id: Scalars['ID'];
	killed: Scalars['Boolean'];
	name: Scalars['String'];
	symbol: Scalars['String'];
	type: GaugeType;
	weightVotes?: Maybe<Array<GaugeWeightVote>>;
	weights?: Maybe<Array<GaugeWeight>>;
}

export interface GaugeWeightVotesArgs {
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<GaugeWeightVote_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	where?: InputMaybe<GaugeWeightVote_Filter>;
}

export interface GaugeWeightsArgs {
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<GaugeWeight_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	where?: InputMaybe<GaugeWeight_Filter>;
}

export interface GaugeDeposit {
	__typename: 'GaugeDeposit';
	gauge: Gauge;
	id: Scalars['ID'];
	provider: Account;
	value: Scalars['BigDecimal'];
}

export interface GaugeDeposit_Filter {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	gauge?: InputMaybe<Scalars['String']>;
	gauge_contains?: InputMaybe<Scalars['String']>;
	gauge_contains_nocase?: InputMaybe<Scalars['String']>;
	gauge_ends_with?: InputMaybe<Scalars['String']>;
	gauge_ends_with_nocase?: InputMaybe<Scalars['String']>;
	gauge_gt?: InputMaybe<Scalars['String']>;
	gauge_gte?: InputMaybe<Scalars['String']>;
	gauge_in?: InputMaybe<Array<Scalars['String']>>;
	gauge_lt?: InputMaybe<Scalars['String']>;
	gauge_lte?: InputMaybe<Scalars['String']>;
	gauge_not?: InputMaybe<Scalars['String']>;
	gauge_not_contains?: InputMaybe<Scalars['String']>;
	gauge_not_contains_nocase?: InputMaybe<Scalars['String']>;
	gauge_not_ends_with?: InputMaybe<Scalars['String']>;
	gauge_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	gauge_not_in?: InputMaybe<Array<Scalars['String']>>;
	gauge_not_starts_with?: InputMaybe<Scalars['String']>;
	gauge_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	gauge_starts_with?: InputMaybe<Scalars['String']>;
	gauge_starts_with_nocase?: InputMaybe<Scalars['String']>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	provider?: InputMaybe<Scalars['String']>;
	provider_contains?: InputMaybe<Scalars['String']>;
	provider_contains_nocase?: InputMaybe<Scalars['String']>;
	provider_ends_with?: InputMaybe<Scalars['String']>;
	provider_ends_with_nocase?: InputMaybe<Scalars['String']>;
	provider_gt?: InputMaybe<Scalars['String']>;
	provider_gte?: InputMaybe<Scalars['String']>;
	provider_in?: InputMaybe<Array<Scalars['String']>>;
	provider_lt?: InputMaybe<Scalars['String']>;
	provider_lte?: InputMaybe<Scalars['String']>;
	provider_not?: InputMaybe<Scalars['String']>;
	provider_not_contains?: InputMaybe<Scalars['String']>;
	provider_not_contains_nocase?: InputMaybe<Scalars['String']>;
	provider_not_ends_with?: InputMaybe<Scalars['String']>;
	provider_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	provider_not_in?: InputMaybe<Array<Scalars['String']>>;
	provider_not_starts_with?: InputMaybe<Scalars['String']>;
	provider_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	provider_starts_with?: InputMaybe<Scalars['String']>;
	provider_starts_with_nocase?: InputMaybe<Scalars['String']>;
	value?: InputMaybe<Scalars['BigDecimal']>;
	value_gt?: InputMaybe<Scalars['BigDecimal']>;
	value_gte?: InputMaybe<Scalars['BigDecimal']>;
	value_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	value_lt?: InputMaybe<Scalars['BigDecimal']>;
	value_lte?: InputMaybe<Scalars['BigDecimal']>;
	value_not?: InputMaybe<Scalars['BigDecimal']>;
	value_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
}

export type GaugeDeposit_OrderBy = 'gauge' | 'id' | 'provider' | 'value';

export interface GaugeLiquidity {
	__typename: 'GaugeLiquidity';
	block: Scalars['BigInt'];
	gauge: Gauge;
	id: Scalars['ID'];
	originalBalance: Scalars['BigInt'];
	originalSupply: Scalars['BigInt'];
	timestamp: Scalars['BigInt'];
	transaction: Scalars['Bytes'];
	user: Account;
	workingBalance: Scalars['BigInt'];
	workingSupply: Scalars['BigInt'];
}

export interface GaugeLiquidity_Filter {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	block?: InputMaybe<Scalars['BigInt']>;
	block_gt?: InputMaybe<Scalars['BigInt']>;
	block_gte?: InputMaybe<Scalars['BigInt']>;
	block_in?: InputMaybe<Array<Scalars['BigInt']>>;
	block_lt?: InputMaybe<Scalars['BigInt']>;
	block_lte?: InputMaybe<Scalars['BigInt']>;
	block_not?: InputMaybe<Scalars['BigInt']>;
	block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	gauge?: InputMaybe<Scalars['String']>;
	gauge_contains?: InputMaybe<Scalars['String']>;
	gauge_contains_nocase?: InputMaybe<Scalars['String']>;
	gauge_ends_with?: InputMaybe<Scalars['String']>;
	gauge_ends_with_nocase?: InputMaybe<Scalars['String']>;
	gauge_gt?: InputMaybe<Scalars['String']>;
	gauge_gte?: InputMaybe<Scalars['String']>;
	gauge_in?: InputMaybe<Array<Scalars['String']>>;
	gauge_lt?: InputMaybe<Scalars['String']>;
	gauge_lte?: InputMaybe<Scalars['String']>;
	gauge_not?: InputMaybe<Scalars['String']>;
	gauge_not_contains?: InputMaybe<Scalars['String']>;
	gauge_not_contains_nocase?: InputMaybe<Scalars['String']>;
	gauge_not_ends_with?: InputMaybe<Scalars['String']>;
	gauge_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	gauge_not_in?: InputMaybe<Array<Scalars['String']>>;
	gauge_not_starts_with?: InputMaybe<Scalars['String']>;
	gauge_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	gauge_starts_with?: InputMaybe<Scalars['String']>;
	gauge_starts_with_nocase?: InputMaybe<Scalars['String']>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	originalBalance?: InputMaybe<Scalars['BigInt']>;
	originalBalance_gt?: InputMaybe<Scalars['BigInt']>;
	originalBalance_gte?: InputMaybe<Scalars['BigInt']>;
	originalBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
	originalBalance_lt?: InputMaybe<Scalars['BigInt']>;
	originalBalance_lte?: InputMaybe<Scalars['BigInt']>;
	originalBalance_not?: InputMaybe<Scalars['BigInt']>;
	originalBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	originalSupply?: InputMaybe<Scalars['BigInt']>;
	originalSupply_gt?: InputMaybe<Scalars['BigInt']>;
	originalSupply_gte?: InputMaybe<Scalars['BigInt']>;
	originalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
	originalSupply_lt?: InputMaybe<Scalars['BigInt']>;
	originalSupply_lte?: InputMaybe<Scalars['BigInt']>;
	originalSupply_not?: InputMaybe<Scalars['BigInt']>;
	originalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	timestamp?: InputMaybe<Scalars['BigInt']>;
	timestamp_gt?: InputMaybe<Scalars['BigInt']>;
	timestamp_gte?: InputMaybe<Scalars['BigInt']>;
	timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
	timestamp_lt?: InputMaybe<Scalars['BigInt']>;
	timestamp_lte?: InputMaybe<Scalars['BigInt']>;
	timestamp_not?: InputMaybe<Scalars['BigInt']>;
	timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	transaction?: InputMaybe<Scalars['Bytes']>;
	transaction_contains?: InputMaybe<Scalars['Bytes']>;
	transaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
	transaction_not?: InputMaybe<Scalars['Bytes']>;
	transaction_not_contains?: InputMaybe<Scalars['Bytes']>;
	transaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
	user?: InputMaybe<Scalars['String']>;
	user_contains?: InputMaybe<Scalars['String']>;
	user_contains_nocase?: InputMaybe<Scalars['String']>;
	user_ends_with?: InputMaybe<Scalars['String']>;
	user_ends_with_nocase?: InputMaybe<Scalars['String']>;
	user_gt?: InputMaybe<Scalars['String']>;
	user_gte?: InputMaybe<Scalars['String']>;
	user_in?: InputMaybe<Array<Scalars['String']>>;
	user_lt?: InputMaybe<Scalars['String']>;
	user_lte?: InputMaybe<Scalars['String']>;
	user_not?: InputMaybe<Scalars['String']>;
	user_not_contains?: InputMaybe<Scalars['String']>;
	user_not_contains_nocase?: InputMaybe<Scalars['String']>;
	user_not_ends_with?: InputMaybe<Scalars['String']>;
	user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	user_not_in?: InputMaybe<Array<Scalars['String']>>;
	user_not_starts_with?: InputMaybe<Scalars['String']>;
	user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	user_starts_with?: InputMaybe<Scalars['String']>;
	user_starts_with_nocase?: InputMaybe<Scalars['String']>;
	workingBalance?: InputMaybe<Scalars['BigInt']>;
	workingBalance_gt?: InputMaybe<Scalars['BigInt']>;
	workingBalance_gte?: InputMaybe<Scalars['BigInt']>;
	workingBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
	workingBalance_lt?: InputMaybe<Scalars['BigInt']>;
	workingBalance_lte?: InputMaybe<Scalars['BigInt']>;
	workingBalance_not?: InputMaybe<Scalars['BigInt']>;
	workingBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	workingSupply?: InputMaybe<Scalars['BigInt']>;
	workingSupply_gt?: InputMaybe<Scalars['BigInt']>;
	workingSupply_gte?: InputMaybe<Scalars['BigInt']>;
	workingSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
	workingSupply_lt?: InputMaybe<Scalars['BigInt']>;
	workingSupply_lte?: InputMaybe<Scalars['BigInt']>;
	workingSupply_not?: InputMaybe<Scalars['BigInt']>;
	workingSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
}

export type GaugeLiquidity_OrderBy =
	| 'block'
	| 'gauge'
	| 'id'
	| 'originalBalance'
	| 'originalSupply'
	| 'timestamp'
	| 'transaction'
	| 'user'
	| 'workingBalance'
	| 'workingSupply';

export interface GaugeTotalWeight {
	__typename: 'GaugeTotalWeight';
	id: Scalars['ID'];
	time: Scalars['BigInt'];
	weight: Scalars['BigDecimal'];
}

export interface GaugeTotalWeight_Filter {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	time?: InputMaybe<Scalars['BigInt']>;
	time_gt?: InputMaybe<Scalars['BigInt']>;
	time_gte?: InputMaybe<Scalars['BigInt']>;
	time_in?: InputMaybe<Array<Scalars['BigInt']>>;
	time_lt?: InputMaybe<Scalars['BigInt']>;
	time_lte?: InputMaybe<Scalars['BigInt']>;
	time_not?: InputMaybe<Scalars['BigInt']>;
	time_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	weight?: InputMaybe<Scalars['BigDecimal']>;
	weight_gt?: InputMaybe<Scalars['BigDecimal']>;
	weight_gte?: InputMaybe<Scalars['BigDecimal']>;
	weight_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	weight_lt?: InputMaybe<Scalars['BigDecimal']>;
	weight_lte?: InputMaybe<Scalars['BigDecimal']>;
	weight_not?: InputMaybe<Scalars['BigDecimal']>;
	weight_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
}

export type GaugeTotalWeight_OrderBy = 'id' | 'time' | 'weight';

export interface GaugeType {
	__typename: 'GaugeType';
	gaugeCount: Scalars['BigInt'];
	gauges?: Maybe<Array<Gauge>>;
	id: Scalars['ID'];
	name: Scalars['String'];
	weights?: Maybe<Array<GaugeTypeWeight>>;
}

export interface GaugeTypeGaugesArgs {
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Gauge_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	where?: InputMaybe<Gauge_Filter>;
}

export interface GaugeTypeWeightsArgs {
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<GaugeTypeWeight_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	where?: InputMaybe<GaugeTypeWeight_Filter>;
}

export interface GaugeTypeWeight {
	__typename: 'GaugeTypeWeight';
	id: Scalars['ID'];
	time: Scalars['BigInt'];
	type: GaugeType;
	weight: Scalars['BigDecimal'];
}

export interface GaugeTypeWeight_Filter {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	time?: InputMaybe<Scalars['BigInt']>;
	time_gt?: InputMaybe<Scalars['BigInt']>;
	time_gte?: InputMaybe<Scalars['BigInt']>;
	time_in?: InputMaybe<Array<Scalars['BigInt']>>;
	time_lt?: InputMaybe<Scalars['BigInt']>;
	time_lte?: InputMaybe<Scalars['BigInt']>;
	time_not?: InputMaybe<Scalars['BigInt']>;
	time_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	type?: InputMaybe<Scalars['String']>;
	type_contains?: InputMaybe<Scalars['String']>;
	type_contains_nocase?: InputMaybe<Scalars['String']>;
	type_ends_with?: InputMaybe<Scalars['String']>;
	type_ends_with_nocase?: InputMaybe<Scalars['String']>;
	type_gt?: InputMaybe<Scalars['String']>;
	type_gte?: InputMaybe<Scalars['String']>;
	type_in?: InputMaybe<Array<Scalars['String']>>;
	type_lt?: InputMaybe<Scalars['String']>;
	type_lte?: InputMaybe<Scalars['String']>;
	type_not?: InputMaybe<Scalars['String']>;
	type_not_contains?: InputMaybe<Scalars['String']>;
	type_not_contains_nocase?: InputMaybe<Scalars['String']>;
	type_not_ends_with?: InputMaybe<Scalars['String']>;
	type_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	type_not_in?: InputMaybe<Array<Scalars['String']>>;
	type_not_starts_with?: InputMaybe<Scalars['String']>;
	type_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	type_starts_with?: InputMaybe<Scalars['String']>;
	type_starts_with_nocase?: InputMaybe<Scalars['String']>;
	weight?: InputMaybe<Scalars['BigDecimal']>;
	weight_gt?: InputMaybe<Scalars['BigDecimal']>;
	weight_gte?: InputMaybe<Scalars['BigDecimal']>;
	weight_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	weight_lt?: InputMaybe<Scalars['BigDecimal']>;
	weight_lte?: InputMaybe<Scalars['BigDecimal']>;
	weight_not?: InputMaybe<Scalars['BigDecimal']>;
	weight_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
}

export type GaugeTypeWeight_OrderBy = 'id' | 'time' | 'type' | 'weight';

export interface GaugeType_Filter {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	gaugeCount?: InputMaybe<Scalars['BigInt']>;
	gaugeCount_gt?: InputMaybe<Scalars['BigInt']>;
	gaugeCount_gte?: InputMaybe<Scalars['BigInt']>;
	gaugeCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
	gaugeCount_lt?: InputMaybe<Scalars['BigInt']>;
	gaugeCount_lte?: InputMaybe<Scalars['BigInt']>;
	gaugeCount_not?: InputMaybe<Scalars['BigInt']>;
	gaugeCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	name?: InputMaybe<Scalars['String']>;
	name_contains?: InputMaybe<Scalars['String']>;
	name_contains_nocase?: InputMaybe<Scalars['String']>;
	name_ends_with?: InputMaybe<Scalars['String']>;
	name_ends_with_nocase?: InputMaybe<Scalars['String']>;
	name_gt?: InputMaybe<Scalars['String']>;
	name_gte?: InputMaybe<Scalars['String']>;
	name_in?: InputMaybe<Array<Scalars['String']>>;
	name_lt?: InputMaybe<Scalars['String']>;
	name_lte?: InputMaybe<Scalars['String']>;
	name_not?: InputMaybe<Scalars['String']>;
	name_not_contains?: InputMaybe<Scalars['String']>;
	name_not_contains_nocase?: InputMaybe<Scalars['String']>;
	name_not_ends_with?: InputMaybe<Scalars['String']>;
	name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	name_not_in?: InputMaybe<Array<Scalars['String']>>;
	name_not_starts_with?: InputMaybe<Scalars['String']>;
	name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	name_starts_with?: InputMaybe<Scalars['String']>;
	name_starts_with_nocase?: InputMaybe<Scalars['String']>;
}

export type GaugeType_OrderBy = 'gaugeCount' | 'gauges' | 'id' | 'name' | 'weights';

export interface GaugeWeight {
	__typename: 'GaugeWeight';
	gauge: Gauge;
	id: Scalars['ID'];
	time: Scalars['BigInt'];
	weight: Scalars['BigDecimal'];
}

export interface GaugeWeightVote {
	__typename: 'GaugeWeightVote';
	gauge: Gauge;
	id: Scalars['ID'];
	time: Scalars['BigInt'];
	user: Account;
	weight: Scalars['BigDecimal'];
}

export interface GaugeWeightVote_Filter {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	gauge?: InputMaybe<Scalars['String']>;
	gauge_contains?: InputMaybe<Scalars['String']>;
	gauge_contains_nocase?: InputMaybe<Scalars['String']>;
	gauge_ends_with?: InputMaybe<Scalars['String']>;
	gauge_ends_with_nocase?: InputMaybe<Scalars['String']>;
	gauge_gt?: InputMaybe<Scalars['String']>;
	gauge_gte?: InputMaybe<Scalars['String']>;
	gauge_in?: InputMaybe<Array<Scalars['String']>>;
	gauge_lt?: InputMaybe<Scalars['String']>;
	gauge_lte?: InputMaybe<Scalars['String']>;
	gauge_not?: InputMaybe<Scalars['String']>;
	gauge_not_contains?: InputMaybe<Scalars['String']>;
	gauge_not_contains_nocase?: InputMaybe<Scalars['String']>;
	gauge_not_ends_with?: InputMaybe<Scalars['String']>;
	gauge_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	gauge_not_in?: InputMaybe<Array<Scalars['String']>>;
	gauge_not_starts_with?: InputMaybe<Scalars['String']>;
	gauge_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	gauge_starts_with?: InputMaybe<Scalars['String']>;
	gauge_starts_with_nocase?: InputMaybe<Scalars['String']>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	time?: InputMaybe<Scalars['BigInt']>;
	time_gt?: InputMaybe<Scalars['BigInt']>;
	time_gte?: InputMaybe<Scalars['BigInt']>;
	time_in?: InputMaybe<Array<Scalars['BigInt']>>;
	time_lt?: InputMaybe<Scalars['BigInt']>;
	time_lte?: InputMaybe<Scalars['BigInt']>;
	time_not?: InputMaybe<Scalars['BigInt']>;
	time_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	user?: InputMaybe<Scalars['String']>;
	user_contains?: InputMaybe<Scalars['String']>;
	user_contains_nocase?: InputMaybe<Scalars['String']>;
	user_ends_with?: InputMaybe<Scalars['String']>;
	user_ends_with_nocase?: InputMaybe<Scalars['String']>;
	user_gt?: InputMaybe<Scalars['String']>;
	user_gte?: InputMaybe<Scalars['String']>;
	user_in?: InputMaybe<Array<Scalars['String']>>;
	user_lt?: InputMaybe<Scalars['String']>;
	user_lte?: InputMaybe<Scalars['String']>;
	user_not?: InputMaybe<Scalars['String']>;
	user_not_contains?: InputMaybe<Scalars['String']>;
	user_not_contains_nocase?: InputMaybe<Scalars['String']>;
	user_not_ends_with?: InputMaybe<Scalars['String']>;
	user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	user_not_in?: InputMaybe<Array<Scalars['String']>>;
	user_not_starts_with?: InputMaybe<Scalars['String']>;
	user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	user_starts_with?: InputMaybe<Scalars['String']>;
	user_starts_with_nocase?: InputMaybe<Scalars['String']>;
	weight?: InputMaybe<Scalars['BigDecimal']>;
	weight_gt?: InputMaybe<Scalars['BigDecimal']>;
	weight_gte?: InputMaybe<Scalars['BigDecimal']>;
	weight_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	weight_lt?: InputMaybe<Scalars['BigDecimal']>;
	weight_lte?: InputMaybe<Scalars['BigDecimal']>;
	weight_not?: InputMaybe<Scalars['BigDecimal']>;
	weight_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
}

export type GaugeWeightVote_OrderBy = 'gauge' | 'id' | 'time' | 'user' | 'weight';

export interface GaugeWeight_Filter {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	gauge?: InputMaybe<Scalars['String']>;
	gauge_contains?: InputMaybe<Scalars['String']>;
	gauge_contains_nocase?: InputMaybe<Scalars['String']>;
	gauge_ends_with?: InputMaybe<Scalars['String']>;
	gauge_ends_with_nocase?: InputMaybe<Scalars['String']>;
	gauge_gt?: InputMaybe<Scalars['String']>;
	gauge_gte?: InputMaybe<Scalars['String']>;
	gauge_in?: InputMaybe<Array<Scalars['String']>>;
	gauge_lt?: InputMaybe<Scalars['String']>;
	gauge_lte?: InputMaybe<Scalars['String']>;
	gauge_not?: InputMaybe<Scalars['String']>;
	gauge_not_contains?: InputMaybe<Scalars['String']>;
	gauge_not_contains_nocase?: InputMaybe<Scalars['String']>;
	gauge_not_ends_with?: InputMaybe<Scalars['String']>;
	gauge_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	gauge_not_in?: InputMaybe<Array<Scalars['String']>>;
	gauge_not_starts_with?: InputMaybe<Scalars['String']>;
	gauge_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	gauge_starts_with?: InputMaybe<Scalars['String']>;
	gauge_starts_with_nocase?: InputMaybe<Scalars['String']>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	time?: InputMaybe<Scalars['BigInt']>;
	time_gt?: InputMaybe<Scalars['BigInt']>;
	time_gte?: InputMaybe<Scalars['BigInt']>;
	time_in?: InputMaybe<Array<Scalars['BigInt']>>;
	time_lt?: InputMaybe<Scalars['BigInt']>;
	time_lte?: InputMaybe<Scalars['BigInt']>;
	time_not?: InputMaybe<Scalars['BigInt']>;
	time_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	weight?: InputMaybe<Scalars['BigDecimal']>;
	weight_gt?: InputMaybe<Scalars['BigDecimal']>;
	weight_gte?: InputMaybe<Scalars['BigDecimal']>;
	weight_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	weight_lt?: InputMaybe<Scalars['BigDecimal']>;
	weight_lte?: InputMaybe<Scalars['BigDecimal']>;
	weight_not?: InputMaybe<Scalars['BigDecimal']>;
	weight_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
}

export type GaugeWeight_OrderBy = 'gauge' | 'id' | 'time' | 'weight';

export interface GaugeWithdraw {
	__typename: 'GaugeWithdraw';
	gauge: Gauge;
	id: Scalars['ID'];
	provider: Account;
	value: Scalars['BigDecimal'];
}

export interface GaugeWithdraw_Filter {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	gauge?: InputMaybe<Scalars['String']>;
	gauge_contains?: InputMaybe<Scalars['String']>;
	gauge_contains_nocase?: InputMaybe<Scalars['String']>;
	gauge_ends_with?: InputMaybe<Scalars['String']>;
	gauge_ends_with_nocase?: InputMaybe<Scalars['String']>;
	gauge_gt?: InputMaybe<Scalars['String']>;
	gauge_gte?: InputMaybe<Scalars['String']>;
	gauge_in?: InputMaybe<Array<Scalars['String']>>;
	gauge_lt?: InputMaybe<Scalars['String']>;
	gauge_lte?: InputMaybe<Scalars['String']>;
	gauge_not?: InputMaybe<Scalars['String']>;
	gauge_not_contains?: InputMaybe<Scalars['String']>;
	gauge_not_contains_nocase?: InputMaybe<Scalars['String']>;
	gauge_not_ends_with?: InputMaybe<Scalars['String']>;
	gauge_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	gauge_not_in?: InputMaybe<Array<Scalars['String']>>;
	gauge_not_starts_with?: InputMaybe<Scalars['String']>;
	gauge_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	gauge_starts_with?: InputMaybe<Scalars['String']>;
	gauge_starts_with_nocase?: InputMaybe<Scalars['String']>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	provider?: InputMaybe<Scalars['String']>;
	provider_contains?: InputMaybe<Scalars['String']>;
	provider_contains_nocase?: InputMaybe<Scalars['String']>;
	provider_ends_with?: InputMaybe<Scalars['String']>;
	provider_ends_with_nocase?: InputMaybe<Scalars['String']>;
	provider_gt?: InputMaybe<Scalars['String']>;
	provider_gte?: InputMaybe<Scalars['String']>;
	provider_in?: InputMaybe<Array<Scalars['String']>>;
	provider_lt?: InputMaybe<Scalars['String']>;
	provider_lte?: InputMaybe<Scalars['String']>;
	provider_not?: InputMaybe<Scalars['String']>;
	provider_not_contains?: InputMaybe<Scalars['String']>;
	provider_not_contains_nocase?: InputMaybe<Scalars['String']>;
	provider_not_ends_with?: InputMaybe<Scalars['String']>;
	provider_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	provider_not_in?: InputMaybe<Array<Scalars['String']>>;
	provider_not_starts_with?: InputMaybe<Scalars['String']>;
	provider_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	provider_starts_with?: InputMaybe<Scalars['String']>;
	provider_starts_with_nocase?: InputMaybe<Scalars['String']>;
	value?: InputMaybe<Scalars['BigDecimal']>;
	value_gt?: InputMaybe<Scalars['BigDecimal']>;
	value_gte?: InputMaybe<Scalars['BigDecimal']>;
	value_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	value_lt?: InputMaybe<Scalars['BigDecimal']>;
	value_lte?: InputMaybe<Scalars['BigDecimal']>;
	value_not?: InputMaybe<Scalars['BigDecimal']>;
	value_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
}

export type GaugeWithdraw_OrderBy = 'gauge' | 'id' | 'provider' | 'value';

export interface Gauge_Filter {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	address?: InputMaybe<Scalars['Bytes']>;
	address_contains?: InputMaybe<Scalars['Bytes']>;
	address_in?: InputMaybe<Array<Scalars['Bytes']>>;
	address_not?: InputMaybe<Scalars['Bytes']>;
	address_not_contains?: InputMaybe<Scalars['Bytes']>;
	address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
	created?: InputMaybe<Scalars['BigInt']>;
	createdAtBlock?: InputMaybe<Scalars['BigInt']>;
	createdAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
	createdAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
	createdAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
	createdAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
	createdAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
	createdAtBlock_not?: InputMaybe<Scalars['BigInt']>;
	createdAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	createdAtTransaction?: InputMaybe<Scalars['Bytes']>;
	createdAtTransaction_contains?: InputMaybe<Scalars['Bytes']>;
	createdAtTransaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
	createdAtTransaction_not?: InputMaybe<Scalars['Bytes']>;
	createdAtTransaction_not_contains?: InputMaybe<Scalars['Bytes']>;
	createdAtTransaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
	created_gt?: InputMaybe<Scalars['BigInt']>;
	created_gte?: InputMaybe<Scalars['BigInt']>;
	created_in?: InputMaybe<Array<Scalars['BigInt']>>;
	created_lt?: InputMaybe<Scalars['BigInt']>;
	created_lte?: InputMaybe<Scalars['BigInt']>;
	created_not?: InputMaybe<Scalars['BigInt']>;
	created_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	killed?: InputMaybe<Scalars['Boolean']>;
	killed_in?: InputMaybe<Array<Scalars['Boolean']>>;
	killed_not?: InputMaybe<Scalars['Boolean']>;
	killed_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
	name?: InputMaybe<Scalars['String']>;
	name_contains?: InputMaybe<Scalars['String']>;
	name_contains_nocase?: InputMaybe<Scalars['String']>;
	name_ends_with?: InputMaybe<Scalars['String']>;
	name_ends_with_nocase?: InputMaybe<Scalars['String']>;
	name_gt?: InputMaybe<Scalars['String']>;
	name_gte?: InputMaybe<Scalars['String']>;
	name_in?: InputMaybe<Array<Scalars['String']>>;
	name_lt?: InputMaybe<Scalars['String']>;
	name_lte?: InputMaybe<Scalars['String']>;
	name_not?: InputMaybe<Scalars['String']>;
	name_not_contains?: InputMaybe<Scalars['String']>;
	name_not_contains_nocase?: InputMaybe<Scalars['String']>;
	name_not_ends_with?: InputMaybe<Scalars['String']>;
	name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	name_not_in?: InputMaybe<Array<Scalars['String']>>;
	name_not_starts_with?: InputMaybe<Scalars['String']>;
	name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	name_starts_with?: InputMaybe<Scalars['String']>;
	name_starts_with_nocase?: InputMaybe<Scalars['String']>;
	symbol?: InputMaybe<Scalars['String']>;
	symbol_contains?: InputMaybe<Scalars['String']>;
	symbol_contains_nocase?: InputMaybe<Scalars['String']>;
	symbol_ends_with?: InputMaybe<Scalars['String']>;
	symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
	symbol_gt?: InputMaybe<Scalars['String']>;
	symbol_gte?: InputMaybe<Scalars['String']>;
	symbol_in?: InputMaybe<Array<Scalars['String']>>;
	symbol_lt?: InputMaybe<Scalars['String']>;
	symbol_lte?: InputMaybe<Scalars['String']>;
	symbol_not?: InputMaybe<Scalars['String']>;
	symbol_not_contains?: InputMaybe<Scalars['String']>;
	symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
	symbol_not_ends_with?: InputMaybe<Scalars['String']>;
	symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
	symbol_not_starts_with?: InputMaybe<Scalars['String']>;
	symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	symbol_starts_with?: InputMaybe<Scalars['String']>;
	symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
	type?: InputMaybe<Scalars['String']>;
	type_contains?: InputMaybe<Scalars['String']>;
	type_contains_nocase?: InputMaybe<Scalars['String']>;
	type_ends_with?: InputMaybe<Scalars['String']>;
	type_ends_with_nocase?: InputMaybe<Scalars['String']>;
	type_gt?: InputMaybe<Scalars['String']>;
	type_gte?: InputMaybe<Scalars['String']>;
	type_in?: InputMaybe<Array<Scalars['String']>>;
	type_lt?: InputMaybe<Scalars['String']>;
	type_lte?: InputMaybe<Scalars['String']>;
	type_not?: InputMaybe<Scalars['String']>;
	type_not_contains?: InputMaybe<Scalars['String']>;
	type_not_contains_nocase?: InputMaybe<Scalars['String']>;
	type_not_ends_with?: InputMaybe<Scalars['String']>;
	type_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	type_not_in?: InputMaybe<Array<Scalars['String']>>;
	type_not_starts_with?: InputMaybe<Scalars['String']>;
	type_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	type_starts_with?: InputMaybe<Scalars['String']>;
	type_starts_with_nocase?: InputMaybe<Scalars['String']>;
}

export type Gauge_OrderBy =
	| 'address'
	| 'created'
	| 'createdAtBlock'
	| 'createdAtTransaction'
	| 'id'
	| 'killed'
	| 'name'
	| 'symbol'
	| 'type'
	| 'weightVotes'
	| 'weights';

export type InvestType = 'Exit' | 'Join';

export interface JoinExit {
	__typename: 'JoinExit';
	account: Account;
	amounts: Array<Scalars['BigDecimal']>;
	id: Scalars['ID'];
	pool: Pool;
	sender: Scalars['Bytes'];
	timestamp: Scalars['Int'];
	tx: Scalars['Bytes'];
	type: InvestType;
}

export interface JoinExit_Filter {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	account?: InputMaybe<Scalars['String']>;
	account_contains?: InputMaybe<Scalars['String']>;
	account_contains_nocase?: InputMaybe<Scalars['String']>;
	account_ends_with?: InputMaybe<Scalars['String']>;
	account_ends_with_nocase?: InputMaybe<Scalars['String']>;
	account_gt?: InputMaybe<Scalars['String']>;
	account_gte?: InputMaybe<Scalars['String']>;
	account_in?: InputMaybe<Array<Scalars['String']>>;
	account_lt?: InputMaybe<Scalars['String']>;
	account_lte?: InputMaybe<Scalars['String']>;
	account_not?: InputMaybe<Scalars['String']>;
	account_not_contains?: InputMaybe<Scalars['String']>;
	account_not_contains_nocase?: InputMaybe<Scalars['String']>;
	account_not_ends_with?: InputMaybe<Scalars['String']>;
	account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	account_not_in?: InputMaybe<Array<Scalars['String']>>;
	account_not_starts_with?: InputMaybe<Scalars['String']>;
	account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	account_starts_with?: InputMaybe<Scalars['String']>;
	account_starts_with_nocase?: InputMaybe<Scalars['String']>;
	amounts?: InputMaybe<Array<Scalars['BigDecimal']>>;
	amounts_contains?: InputMaybe<Array<Scalars['BigDecimal']>>;
	amounts_contains_nocase?: InputMaybe<Array<Scalars['BigDecimal']>>;
	amounts_not?: InputMaybe<Array<Scalars['BigDecimal']>>;
	amounts_not_contains?: InputMaybe<Array<Scalars['BigDecimal']>>;
	amounts_not_contains_nocase?: InputMaybe<Array<Scalars['BigDecimal']>>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	pool?: InputMaybe<Scalars['String']>;
	pool_contains?: InputMaybe<Scalars['String']>;
	pool_contains_nocase?: InputMaybe<Scalars['String']>;
	pool_ends_with?: InputMaybe<Scalars['String']>;
	pool_ends_with_nocase?: InputMaybe<Scalars['String']>;
	pool_gt?: InputMaybe<Scalars['String']>;
	pool_gte?: InputMaybe<Scalars['String']>;
	pool_in?: InputMaybe<Array<Scalars['String']>>;
	pool_lt?: InputMaybe<Scalars['String']>;
	pool_lte?: InputMaybe<Scalars['String']>;
	pool_not?: InputMaybe<Scalars['String']>;
	pool_not_contains?: InputMaybe<Scalars['String']>;
	pool_not_contains_nocase?: InputMaybe<Scalars['String']>;
	pool_not_ends_with?: InputMaybe<Scalars['String']>;
	pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	pool_not_in?: InputMaybe<Array<Scalars['String']>>;
	pool_not_starts_with?: InputMaybe<Scalars['String']>;
	pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	pool_starts_with?: InputMaybe<Scalars['String']>;
	pool_starts_with_nocase?: InputMaybe<Scalars['String']>;
	sender?: InputMaybe<Scalars['Bytes']>;
	sender_contains?: InputMaybe<Scalars['Bytes']>;
	sender_in?: InputMaybe<Array<Scalars['Bytes']>>;
	sender_not?: InputMaybe<Scalars['Bytes']>;
	sender_not_contains?: InputMaybe<Scalars['Bytes']>;
	sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
	timestamp?: InputMaybe<Scalars['Int']>;
	timestamp_gt?: InputMaybe<Scalars['Int']>;
	timestamp_gte?: InputMaybe<Scalars['Int']>;
	timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
	timestamp_lt?: InputMaybe<Scalars['Int']>;
	timestamp_lte?: InputMaybe<Scalars['Int']>;
	timestamp_not?: InputMaybe<Scalars['Int']>;
	timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
	tx?: InputMaybe<Scalars['Bytes']>;
	tx_contains?: InputMaybe<Scalars['Bytes']>;
	tx_in?: InputMaybe<Array<Scalars['Bytes']>>;
	tx_not?: InputMaybe<Scalars['Bytes']>;
	tx_not_contains?: InputMaybe<Scalars['Bytes']>;
	tx_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
	type?: InputMaybe<InvestType>;
	type_in?: InputMaybe<Array<InvestType>>;
	type_not?: InputMaybe<InvestType>;
	type_not_in?: InputMaybe<Array<InvestType>>;
}

export type JoinExit_OrderBy = 'account' | 'amounts' | 'id' | 'pool' | 'sender' | 'timestamp' | 'tx' | 'type';

export interface Koyo {
	__typename: 'Koyo';
	/**  Address of the Kōyō vault  */
	address: Scalars['Bytes'];
	/**  Number of gauges registered  */
	gaugeCount: Scalars['BigInt'];
	/**  Number of gauge types registered  */
	gaugeTypeCount: Scalars['BigInt'];
	id: Scalars['ID'];
	/**  Number of pools registered  */
	poolCount: Scalars['Int'];
	/**  List of registered pools  */
	pools?: Maybe<Array<Pool>>;
	totalLiquidity: Scalars['BigDecimal'];
	totalSwapCount: Scalars['BigInt'];
	totalSwapFee: Scalars['BigDecimal'];
	totalSwapVolume: Scalars['BigDecimal'];
}

export interface KoyoPoolsArgs {
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Pool_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	where?: InputMaybe<Pool_Filter>;
}

export interface Koyo_Filter {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	address?: InputMaybe<Scalars['Bytes']>;
	address_contains?: InputMaybe<Scalars['Bytes']>;
	address_in?: InputMaybe<Array<Scalars['Bytes']>>;
	address_not?: InputMaybe<Scalars['Bytes']>;
	address_not_contains?: InputMaybe<Scalars['Bytes']>;
	address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
	gaugeCount?: InputMaybe<Scalars['BigInt']>;
	gaugeCount_gt?: InputMaybe<Scalars['BigInt']>;
	gaugeCount_gte?: InputMaybe<Scalars['BigInt']>;
	gaugeCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
	gaugeCount_lt?: InputMaybe<Scalars['BigInt']>;
	gaugeCount_lte?: InputMaybe<Scalars['BigInt']>;
	gaugeCount_not?: InputMaybe<Scalars['BigInt']>;
	gaugeCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	gaugeTypeCount?: InputMaybe<Scalars['BigInt']>;
	gaugeTypeCount_gt?: InputMaybe<Scalars['BigInt']>;
	gaugeTypeCount_gte?: InputMaybe<Scalars['BigInt']>;
	gaugeTypeCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
	gaugeTypeCount_lt?: InputMaybe<Scalars['BigInt']>;
	gaugeTypeCount_lte?: InputMaybe<Scalars['BigInt']>;
	gaugeTypeCount_not?: InputMaybe<Scalars['BigInt']>;
	gaugeTypeCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	poolCount?: InputMaybe<Scalars['Int']>;
	poolCount_gt?: InputMaybe<Scalars['Int']>;
	poolCount_gte?: InputMaybe<Scalars['Int']>;
	poolCount_in?: InputMaybe<Array<Scalars['Int']>>;
	poolCount_lt?: InputMaybe<Scalars['Int']>;
	poolCount_lte?: InputMaybe<Scalars['Int']>;
	poolCount_not?: InputMaybe<Scalars['Int']>;
	poolCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
	totalLiquidity?: InputMaybe<Scalars['BigDecimal']>;
	totalLiquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
	totalLiquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
	totalLiquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalLiquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
	totalLiquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
	totalLiquidity_not?: InputMaybe<Scalars['BigDecimal']>;
	totalLiquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalSwapCount?: InputMaybe<Scalars['BigInt']>;
	totalSwapCount_gt?: InputMaybe<Scalars['BigInt']>;
	totalSwapCount_gte?: InputMaybe<Scalars['BigInt']>;
	totalSwapCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
	totalSwapCount_lt?: InputMaybe<Scalars['BigInt']>;
	totalSwapCount_lte?: InputMaybe<Scalars['BigInt']>;
	totalSwapCount_not?: InputMaybe<Scalars['BigInt']>;
	totalSwapCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	totalSwapFee?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapFee_gt?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapFee_gte?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapFee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalSwapFee_lt?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapFee_lte?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapFee_not?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalSwapVolume?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalSwapVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapVolume_not?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
}

export type Koyo_OrderBy =
	| 'address'
	| 'gaugeCount'
	| 'gaugeTypeCount'
	| 'id'
	| 'poolCount'
	| 'pools'
	| 'totalLiquidity'
	| 'totalSwapCount'
	| 'totalSwapFee'
	| 'totalSwapVolume';

export interface LatestPrice {
	__typename: 'LatestPrice';
	asset: Scalars['Bytes'];
	block: Scalars['BigInt'];
	id: Scalars['ID'];
	poolId: Pool;
	price: Scalars['BigDecimal'];
	priceUSD: Scalars['BigDecimal'];
	pricingAsset: Scalars['Bytes'];
}

export interface LatestPrice_Filter {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	asset?: InputMaybe<Scalars['Bytes']>;
	asset_contains?: InputMaybe<Scalars['Bytes']>;
	asset_in?: InputMaybe<Array<Scalars['Bytes']>>;
	asset_not?: InputMaybe<Scalars['Bytes']>;
	asset_not_contains?: InputMaybe<Scalars['Bytes']>;
	asset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
	block?: InputMaybe<Scalars['BigInt']>;
	block_gt?: InputMaybe<Scalars['BigInt']>;
	block_gte?: InputMaybe<Scalars['BigInt']>;
	block_in?: InputMaybe<Array<Scalars['BigInt']>>;
	block_lt?: InputMaybe<Scalars['BigInt']>;
	block_lte?: InputMaybe<Scalars['BigInt']>;
	block_not?: InputMaybe<Scalars['BigInt']>;
	block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	poolId?: InputMaybe<Scalars['String']>;
	poolId_contains?: InputMaybe<Scalars['String']>;
	poolId_contains_nocase?: InputMaybe<Scalars['String']>;
	poolId_ends_with?: InputMaybe<Scalars['String']>;
	poolId_ends_with_nocase?: InputMaybe<Scalars['String']>;
	poolId_gt?: InputMaybe<Scalars['String']>;
	poolId_gte?: InputMaybe<Scalars['String']>;
	poolId_in?: InputMaybe<Array<Scalars['String']>>;
	poolId_lt?: InputMaybe<Scalars['String']>;
	poolId_lte?: InputMaybe<Scalars['String']>;
	poolId_not?: InputMaybe<Scalars['String']>;
	poolId_not_contains?: InputMaybe<Scalars['String']>;
	poolId_not_contains_nocase?: InputMaybe<Scalars['String']>;
	poolId_not_ends_with?: InputMaybe<Scalars['String']>;
	poolId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
	poolId_not_starts_with?: InputMaybe<Scalars['String']>;
	poolId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	poolId_starts_with?: InputMaybe<Scalars['String']>;
	poolId_starts_with_nocase?: InputMaybe<Scalars['String']>;
	price?: InputMaybe<Scalars['BigDecimal']>;
	priceUSD?: InputMaybe<Scalars['BigDecimal']>;
	priceUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
	priceUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
	priceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	priceUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
	priceUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
	priceUSD_not?: InputMaybe<Scalars['BigDecimal']>;
	priceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	price_gt?: InputMaybe<Scalars['BigDecimal']>;
	price_gte?: InputMaybe<Scalars['BigDecimal']>;
	price_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	price_lt?: InputMaybe<Scalars['BigDecimal']>;
	price_lte?: InputMaybe<Scalars['BigDecimal']>;
	price_not?: InputMaybe<Scalars['BigDecimal']>;
	price_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	pricingAsset?: InputMaybe<Scalars['Bytes']>;
	pricingAsset_contains?: InputMaybe<Scalars['Bytes']>;
	pricingAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
	pricingAsset_not?: InputMaybe<Scalars['Bytes']>;
	pricingAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
	pricingAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
}

export type LatestPrice_OrderBy = 'asset' | 'block' | 'id' | 'poolId' | 'price' | 'priceUSD' | 'pricingAsset';

/** Defines the order direction, either ascending or descending */
export type OrderDirection = 'asc' | 'desc';

export interface Pool {
	__typename: 'Pool';
	address: Scalars['Bytes'];
	createTime: Scalars['Int'];
	factory?: Maybe<Scalars['Bytes']>;
	historicalValues?: Maybe<Array<PoolHistoricalLiquidity>>;
	holdersCount: Scalars['BigInt'];
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	owner?: Maybe<Account>;
	poolType?: Maybe<Scalars['String']>;
	shares?: Maybe<Array<PoolShare>>;
	strategyType: Scalars['Int'];
	swapEnabled: Scalars['Boolean'];
	swapFee: Scalars['BigDecimal'];
	swaps?: Maybe<Array<Swap>>;
	swapsCount: Scalars['BigInt'];
	symbol?: Maybe<Scalars['String']>;
	tokens?: Maybe<Array<PoolToken>>;
	tokensList: Array<Scalars['Bytes']>;
	totalLiquidity: Scalars['BigDecimal'];
	totalShares: Scalars['BigDecimal'];
	totalSharesRaw: Scalars['BigInt'];
	totalSwapFee: Scalars['BigDecimal'];
	totalSwapVolume: Scalars['BigDecimal'];
	totalWeight?: Maybe<Scalars['BigDecimal']>;
	tx?: Maybe<Scalars['Bytes']>;
	vault: Koyo;
}

export interface PoolHistoricalValuesArgs {
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<PoolHistoricalLiquidity_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	where?: InputMaybe<PoolHistoricalLiquidity_Filter>;
}

export interface PoolSharesArgs {
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<PoolShare_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	where?: InputMaybe<PoolShare_Filter>;
}

export interface PoolSwapsArgs {
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Swap_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	where?: InputMaybe<Swap_Filter>;
}

export interface PoolTokensArgs {
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<PoolToken_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	where?: InputMaybe<PoolToken_Filter>;
}

export interface PoolHistoricalLiquidity {
	__typename: 'PoolHistoricalLiquidity';
	block: Scalars['BigInt'];
	id: Scalars['ID'];
	poolId: Pool;
	poolLiquidity: Scalars['BigDecimal'];
	poolShareValue: Scalars['BigDecimal'];
	poolTotalShares: Scalars['BigDecimal'];
	pricingAsset: Scalars['Bytes'];
}

export interface PoolHistoricalLiquidity_Filter {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	block?: InputMaybe<Scalars['BigInt']>;
	block_gt?: InputMaybe<Scalars['BigInt']>;
	block_gte?: InputMaybe<Scalars['BigInt']>;
	block_in?: InputMaybe<Array<Scalars['BigInt']>>;
	block_lt?: InputMaybe<Scalars['BigInt']>;
	block_lte?: InputMaybe<Scalars['BigInt']>;
	block_not?: InputMaybe<Scalars['BigInt']>;
	block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	poolId?: InputMaybe<Scalars['String']>;
	poolId_contains?: InputMaybe<Scalars['String']>;
	poolId_contains_nocase?: InputMaybe<Scalars['String']>;
	poolId_ends_with?: InputMaybe<Scalars['String']>;
	poolId_ends_with_nocase?: InputMaybe<Scalars['String']>;
	poolId_gt?: InputMaybe<Scalars['String']>;
	poolId_gte?: InputMaybe<Scalars['String']>;
	poolId_in?: InputMaybe<Array<Scalars['String']>>;
	poolId_lt?: InputMaybe<Scalars['String']>;
	poolId_lte?: InputMaybe<Scalars['String']>;
	poolId_not?: InputMaybe<Scalars['String']>;
	poolId_not_contains?: InputMaybe<Scalars['String']>;
	poolId_not_contains_nocase?: InputMaybe<Scalars['String']>;
	poolId_not_ends_with?: InputMaybe<Scalars['String']>;
	poolId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
	poolId_not_starts_with?: InputMaybe<Scalars['String']>;
	poolId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	poolId_starts_with?: InputMaybe<Scalars['String']>;
	poolId_starts_with_nocase?: InputMaybe<Scalars['String']>;
	poolLiquidity?: InputMaybe<Scalars['BigDecimal']>;
	poolLiquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
	poolLiquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
	poolLiquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	poolLiquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
	poolLiquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
	poolLiquidity_not?: InputMaybe<Scalars['BigDecimal']>;
	poolLiquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	poolShareValue?: InputMaybe<Scalars['BigDecimal']>;
	poolShareValue_gt?: InputMaybe<Scalars['BigDecimal']>;
	poolShareValue_gte?: InputMaybe<Scalars['BigDecimal']>;
	poolShareValue_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	poolShareValue_lt?: InputMaybe<Scalars['BigDecimal']>;
	poolShareValue_lte?: InputMaybe<Scalars['BigDecimal']>;
	poolShareValue_not?: InputMaybe<Scalars['BigDecimal']>;
	poolShareValue_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	poolTotalShares?: InputMaybe<Scalars['BigDecimal']>;
	poolTotalShares_gt?: InputMaybe<Scalars['BigDecimal']>;
	poolTotalShares_gte?: InputMaybe<Scalars['BigDecimal']>;
	poolTotalShares_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	poolTotalShares_lt?: InputMaybe<Scalars['BigDecimal']>;
	poolTotalShares_lte?: InputMaybe<Scalars['BigDecimal']>;
	poolTotalShares_not?: InputMaybe<Scalars['BigDecimal']>;
	poolTotalShares_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	pricingAsset?: InputMaybe<Scalars['Bytes']>;
	pricingAsset_contains?: InputMaybe<Scalars['Bytes']>;
	pricingAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
	pricingAsset_not?: InputMaybe<Scalars['Bytes']>;
	pricingAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
	pricingAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
}

export type PoolHistoricalLiquidity_OrderBy = 'block' | 'id' | 'poolId' | 'poolLiquidity' | 'poolShareValue' | 'poolTotalShares' | 'pricingAsset';

export interface PoolShare {
	__typename: 'PoolShare';
	account: Account;
	balance: Scalars['BigDecimal'];
	balanceRaw: Scalars['BigInt'];
	id: Scalars['ID'];
	poolId: Pool;
}

export interface PoolShare_Filter {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	account?: InputMaybe<Scalars['String']>;
	account_contains?: InputMaybe<Scalars['String']>;
	account_contains_nocase?: InputMaybe<Scalars['String']>;
	account_ends_with?: InputMaybe<Scalars['String']>;
	account_ends_with_nocase?: InputMaybe<Scalars['String']>;
	account_gt?: InputMaybe<Scalars['String']>;
	account_gte?: InputMaybe<Scalars['String']>;
	account_in?: InputMaybe<Array<Scalars['String']>>;
	account_lt?: InputMaybe<Scalars['String']>;
	account_lte?: InputMaybe<Scalars['String']>;
	account_not?: InputMaybe<Scalars['String']>;
	account_not_contains?: InputMaybe<Scalars['String']>;
	account_not_contains_nocase?: InputMaybe<Scalars['String']>;
	account_not_ends_with?: InputMaybe<Scalars['String']>;
	account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	account_not_in?: InputMaybe<Array<Scalars['String']>>;
	account_not_starts_with?: InputMaybe<Scalars['String']>;
	account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	account_starts_with?: InputMaybe<Scalars['String']>;
	account_starts_with_nocase?: InputMaybe<Scalars['String']>;
	balance?: InputMaybe<Scalars['BigDecimal']>;
	balanceRaw?: InputMaybe<Scalars['BigInt']>;
	balanceRaw_gt?: InputMaybe<Scalars['BigInt']>;
	balanceRaw_gte?: InputMaybe<Scalars['BigInt']>;
	balanceRaw_in?: InputMaybe<Array<Scalars['BigInt']>>;
	balanceRaw_lt?: InputMaybe<Scalars['BigInt']>;
	balanceRaw_lte?: InputMaybe<Scalars['BigInt']>;
	balanceRaw_not?: InputMaybe<Scalars['BigInt']>;
	balanceRaw_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	balance_gt?: InputMaybe<Scalars['BigDecimal']>;
	balance_gte?: InputMaybe<Scalars['BigDecimal']>;
	balance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	balance_lt?: InputMaybe<Scalars['BigDecimal']>;
	balance_lte?: InputMaybe<Scalars['BigDecimal']>;
	balance_not?: InputMaybe<Scalars['BigDecimal']>;
	balance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	poolId?: InputMaybe<Scalars['String']>;
	poolId_contains?: InputMaybe<Scalars['String']>;
	poolId_contains_nocase?: InputMaybe<Scalars['String']>;
	poolId_ends_with?: InputMaybe<Scalars['String']>;
	poolId_ends_with_nocase?: InputMaybe<Scalars['String']>;
	poolId_gt?: InputMaybe<Scalars['String']>;
	poolId_gte?: InputMaybe<Scalars['String']>;
	poolId_in?: InputMaybe<Array<Scalars['String']>>;
	poolId_lt?: InputMaybe<Scalars['String']>;
	poolId_lte?: InputMaybe<Scalars['String']>;
	poolId_not?: InputMaybe<Scalars['String']>;
	poolId_not_contains?: InputMaybe<Scalars['String']>;
	poolId_not_contains_nocase?: InputMaybe<Scalars['String']>;
	poolId_not_ends_with?: InputMaybe<Scalars['String']>;
	poolId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
	poolId_not_starts_with?: InputMaybe<Scalars['String']>;
	poolId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	poolId_starts_with?: InputMaybe<Scalars['String']>;
	poolId_starts_with_nocase?: InputMaybe<Scalars['String']>;
}

export type PoolShare_OrderBy = 'account' | 'balance' | 'balanceRaw' | 'id' | 'poolId';

export interface PoolToken {
	__typename: 'PoolToken';
	address: Scalars['String'];
	balance: Scalars['BigDecimal'];
	balanceRaw: Scalars['BigInt'];
	decimals: Scalars['Int'];
	id: Scalars['ID'];
	invested: Scalars['BigDecimal'];
	name: Scalars['String'];
	poolId: Pool;
	priceRate: Scalars['BigDecimal'];
	symbol: Scalars['String'];
	token: Token;
	weight?: Maybe<Scalars['BigDecimal']>;
}

export interface PoolToken_Filter {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	address?: InputMaybe<Scalars['String']>;
	address_contains?: InputMaybe<Scalars['String']>;
	address_contains_nocase?: InputMaybe<Scalars['String']>;
	address_ends_with?: InputMaybe<Scalars['String']>;
	address_ends_with_nocase?: InputMaybe<Scalars['String']>;
	address_gt?: InputMaybe<Scalars['String']>;
	address_gte?: InputMaybe<Scalars['String']>;
	address_in?: InputMaybe<Array<Scalars['String']>>;
	address_lt?: InputMaybe<Scalars['String']>;
	address_lte?: InputMaybe<Scalars['String']>;
	address_not?: InputMaybe<Scalars['String']>;
	address_not_contains?: InputMaybe<Scalars['String']>;
	address_not_contains_nocase?: InputMaybe<Scalars['String']>;
	address_not_ends_with?: InputMaybe<Scalars['String']>;
	address_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	address_not_in?: InputMaybe<Array<Scalars['String']>>;
	address_not_starts_with?: InputMaybe<Scalars['String']>;
	address_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	address_starts_with?: InputMaybe<Scalars['String']>;
	address_starts_with_nocase?: InputMaybe<Scalars['String']>;
	balance?: InputMaybe<Scalars['BigDecimal']>;
	balanceRaw?: InputMaybe<Scalars['BigInt']>;
	balanceRaw_gt?: InputMaybe<Scalars['BigInt']>;
	balanceRaw_gte?: InputMaybe<Scalars['BigInt']>;
	balanceRaw_in?: InputMaybe<Array<Scalars['BigInt']>>;
	balanceRaw_lt?: InputMaybe<Scalars['BigInt']>;
	balanceRaw_lte?: InputMaybe<Scalars['BigInt']>;
	balanceRaw_not?: InputMaybe<Scalars['BigInt']>;
	balanceRaw_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	balance_gt?: InputMaybe<Scalars['BigDecimal']>;
	balance_gte?: InputMaybe<Scalars['BigDecimal']>;
	balance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	balance_lt?: InputMaybe<Scalars['BigDecimal']>;
	balance_lte?: InputMaybe<Scalars['BigDecimal']>;
	balance_not?: InputMaybe<Scalars['BigDecimal']>;
	balance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	decimals?: InputMaybe<Scalars['Int']>;
	decimals_gt?: InputMaybe<Scalars['Int']>;
	decimals_gte?: InputMaybe<Scalars['Int']>;
	decimals_in?: InputMaybe<Array<Scalars['Int']>>;
	decimals_lt?: InputMaybe<Scalars['Int']>;
	decimals_lte?: InputMaybe<Scalars['Int']>;
	decimals_not?: InputMaybe<Scalars['Int']>;
	decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	invested?: InputMaybe<Scalars['BigDecimal']>;
	invested_gt?: InputMaybe<Scalars['BigDecimal']>;
	invested_gte?: InputMaybe<Scalars['BigDecimal']>;
	invested_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	invested_lt?: InputMaybe<Scalars['BigDecimal']>;
	invested_lte?: InputMaybe<Scalars['BigDecimal']>;
	invested_not?: InputMaybe<Scalars['BigDecimal']>;
	invested_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	name?: InputMaybe<Scalars['String']>;
	name_contains?: InputMaybe<Scalars['String']>;
	name_contains_nocase?: InputMaybe<Scalars['String']>;
	name_ends_with?: InputMaybe<Scalars['String']>;
	name_ends_with_nocase?: InputMaybe<Scalars['String']>;
	name_gt?: InputMaybe<Scalars['String']>;
	name_gte?: InputMaybe<Scalars['String']>;
	name_in?: InputMaybe<Array<Scalars['String']>>;
	name_lt?: InputMaybe<Scalars['String']>;
	name_lte?: InputMaybe<Scalars['String']>;
	name_not?: InputMaybe<Scalars['String']>;
	name_not_contains?: InputMaybe<Scalars['String']>;
	name_not_contains_nocase?: InputMaybe<Scalars['String']>;
	name_not_ends_with?: InputMaybe<Scalars['String']>;
	name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	name_not_in?: InputMaybe<Array<Scalars['String']>>;
	name_not_starts_with?: InputMaybe<Scalars['String']>;
	name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	name_starts_with?: InputMaybe<Scalars['String']>;
	name_starts_with_nocase?: InputMaybe<Scalars['String']>;
	poolId?: InputMaybe<Scalars['String']>;
	poolId_contains?: InputMaybe<Scalars['String']>;
	poolId_contains_nocase?: InputMaybe<Scalars['String']>;
	poolId_ends_with?: InputMaybe<Scalars['String']>;
	poolId_ends_with_nocase?: InputMaybe<Scalars['String']>;
	poolId_gt?: InputMaybe<Scalars['String']>;
	poolId_gte?: InputMaybe<Scalars['String']>;
	poolId_in?: InputMaybe<Array<Scalars['String']>>;
	poolId_lt?: InputMaybe<Scalars['String']>;
	poolId_lte?: InputMaybe<Scalars['String']>;
	poolId_not?: InputMaybe<Scalars['String']>;
	poolId_not_contains?: InputMaybe<Scalars['String']>;
	poolId_not_contains_nocase?: InputMaybe<Scalars['String']>;
	poolId_not_ends_with?: InputMaybe<Scalars['String']>;
	poolId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
	poolId_not_starts_with?: InputMaybe<Scalars['String']>;
	poolId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	poolId_starts_with?: InputMaybe<Scalars['String']>;
	poolId_starts_with_nocase?: InputMaybe<Scalars['String']>;
	priceRate?: InputMaybe<Scalars['BigDecimal']>;
	priceRate_gt?: InputMaybe<Scalars['BigDecimal']>;
	priceRate_gte?: InputMaybe<Scalars['BigDecimal']>;
	priceRate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	priceRate_lt?: InputMaybe<Scalars['BigDecimal']>;
	priceRate_lte?: InputMaybe<Scalars['BigDecimal']>;
	priceRate_not?: InputMaybe<Scalars['BigDecimal']>;
	priceRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	symbol?: InputMaybe<Scalars['String']>;
	symbol_contains?: InputMaybe<Scalars['String']>;
	symbol_contains_nocase?: InputMaybe<Scalars['String']>;
	symbol_ends_with?: InputMaybe<Scalars['String']>;
	symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
	symbol_gt?: InputMaybe<Scalars['String']>;
	symbol_gte?: InputMaybe<Scalars['String']>;
	symbol_in?: InputMaybe<Array<Scalars['String']>>;
	symbol_lt?: InputMaybe<Scalars['String']>;
	symbol_lte?: InputMaybe<Scalars['String']>;
	symbol_not?: InputMaybe<Scalars['String']>;
	symbol_not_contains?: InputMaybe<Scalars['String']>;
	symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
	symbol_not_ends_with?: InputMaybe<Scalars['String']>;
	symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
	symbol_not_starts_with?: InputMaybe<Scalars['String']>;
	symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	symbol_starts_with?: InputMaybe<Scalars['String']>;
	symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
	token?: InputMaybe<Scalars['String']>;
	token_contains?: InputMaybe<Scalars['String']>;
	token_contains_nocase?: InputMaybe<Scalars['String']>;
	token_ends_with?: InputMaybe<Scalars['String']>;
	token_ends_with_nocase?: InputMaybe<Scalars['String']>;
	token_gt?: InputMaybe<Scalars['String']>;
	token_gte?: InputMaybe<Scalars['String']>;
	token_in?: InputMaybe<Array<Scalars['String']>>;
	token_lt?: InputMaybe<Scalars['String']>;
	token_lte?: InputMaybe<Scalars['String']>;
	token_not?: InputMaybe<Scalars['String']>;
	token_not_contains?: InputMaybe<Scalars['String']>;
	token_not_contains_nocase?: InputMaybe<Scalars['String']>;
	token_not_ends_with?: InputMaybe<Scalars['String']>;
	token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	token_not_in?: InputMaybe<Array<Scalars['String']>>;
	token_not_starts_with?: InputMaybe<Scalars['String']>;
	token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	token_starts_with?: InputMaybe<Scalars['String']>;
	token_starts_with_nocase?: InputMaybe<Scalars['String']>;
	weight?: InputMaybe<Scalars['BigDecimal']>;
	weight_gt?: InputMaybe<Scalars['BigDecimal']>;
	weight_gte?: InputMaybe<Scalars['BigDecimal']>;
	weight_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	weight_lt?: InputMaybe<Scalars['BigDecimal']>;
	weight_lte?: InputMaybe<Scalars['BigDecimal']>;
	weight_not?: InputMaybe<Scalars['BigDecimal']>;
	weight_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
}

export type PoolToken_OrderBy =
	| 'address'
	| 'balance'
	| 'balanceRaw'
	| 'decimals'
	| 'id'
	| 'invested'
	| 'name'
	| 'poolId'
	| 'priceRate'
	| 'symbol'
	| 'token'
	| 'weight';

export interface Pool_Filter {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	address?: InputMaybe<Scalars['Bytes']>;
	address_contains?: InputMaybe<Scalars['Bytes']>;
	address_in?: InputMaybe<Array<Scalars['Bytes']>>;
	address_not?: InputMaybe<Scalars['Bytes']>;
	address_not_contains?: InputMaybe<Scalars['Bytes']>;
	address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
	createTime?: InputMaybe<Scalars['Int']>;
	createTime_gt?: InputMaybe<Scalars['Int']>;
	createTime_gte?: InputMaybe<Scalars['Int']>;
	createTime_in?: InputMaybe<Array<Scalars['Int']>>;
	createTime_lt?: InputMaybe<Scalars['Int']>;
	createTime_lte?: InputMaybe<Scalars['Int']>;
	createTime_not?: InputMaybe<Scalars['Int']>;
	createTime_not_in?: InputMaybe<Array<Scalars['Int']>>;
	factory?: InputMaybe<Scalars['Bytes']>;
	factory_contains?: InputMaybe<Scalars['Bytes']>;
	factory_in?: InputMaybe<Array<Scalars['Bytes']>>;
	factory_not?: InputMaybe<Scalars['Bytes']>;
	factory_not_contains?: InputMaybe<Scalars['Bytes']>;
	factory_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
	holdersCount?: InputMaybe<Scalars['BigInt']>;
	holdersCount_gt?: InputMaybe<Scalars['BigInt']>;
	holdersCount_gte?: InputMaybe<Scalars['BigInt']>;
	holdersCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
	holdersCount_lt?: InputMaybe<Scalars['BigInt']>;
	holdersCount_lte?: InputMaybe<Scalars['BigInt']>;
	holdersCount_not?: InputMaybe<Scalars['BigInt']>;
	holdersCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	name?: InputMaybe<Scalars['String']>;
	name_contains?: InputMaybe<Scalars['String']>;
	name_contains_nocase?: InputMaybe<Scalars['String']>;
	name_ends_with?: InputMaybe<Scalars['String']>;
	name_ends_with_nocase?: InputMaybe<Scalars['String']>;
	name_gt?: InputMaybe<Scalars['String']>;
	name_gte?: InputMaybe<Scalars['String']>;
	name_in?: InputMaybe<Array<Scalars['String']>>;
	name_lt?: InputMaybe<Scalars['String']>;
	name_lte?: InputMaybe<Scalars['String']>;
	name_not?: InputMaybe<Scalars['String']>;
	name_not_contains?: InputMaybe<Scalars['String']>;
	name_not_contains_nocase?: InputMaybe<Scalars['String']>;
	name_not_ends_with?: InputMaybe<Scalars['String']>;
	name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	name_not_in?: InputMaybe<Array<Scalars['String']>>;
	name_not_starts_with?: InputMaybe<Scalars['String']>;
	name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	name_starts_with?: InputMaybe<Scalars['String']>;
	name_starts_with_nocase?: InputMaybe<Scalars['String']>;
	owner?: InputMaybe<Scalars['String']>;
	owner_contains?: InputMaybe<Scalars['String']>;
	owner_contains_nocase?: InputMaybe<Scalars['String']>;
	owner_ends_with?: InputMaybe<Scalars['String']>;
	owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
	owner_gt?: InputMaybe<Scalars['String']>;
	owner_gte?: InputMaybe<Scalars['String']>;
	owner_in?: InputMaybe<Array<Scalars['String']>>;
	owner_lt?: InputMaybe<Scalars['String']>;
	owner_lte?: InputMaybe<Scalars['String']>;
	owner_not?: InputMaybe<Scalars['String']>;
	owner_not_contains?: InputMaybe<Scalars['String']>;
	owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
	owner_not_ends_with?: InputMaybe<Scalars['String']>;
	owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	owner_not_in?: InputMaybe<Array<Scalars['String']>>;
	owner_not_starts_with?: InputMaybe<Scalars['String']>;
	owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	owner_starts_with?: InputMaybe<Scalars['String']>;
	owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
	poolType?: InputMaybe<Scalars['String']>;
	poolType_contains?: InputMaybe<Scalars['String']>;
	poolType_contains_nocase?: InputMaybe<Scalars['String']>;
	poolType_ends_with?: InputMaybe<Scalars['String']>;
	poolType_ends_with_nocase?: InputMaybe<Scalars['String']>;
	poolType_gt?: InputMaybe<Scalars['String']>;
	poolType_gte?: InputMaybe<Scalars['String']>;
	poolType_in?: InputMaybe<Array<Scalars['String']>>;
	poolType_lt?: InputMaybe<Scalars['String']>;
	poolType_lte?: InputMaybe<Scalars['String']>;
	poolType_not?: InputMaybe<Scalars['String']>;
	poolType_not_contains?: InputMaybe<Scalars['String']>;
	poolType_not_contains_nocase?: InputMaybe<Scalars['String']>;
	poolType_not_ends_with?: InputMaybe<Scalars['String']>;
	poolType_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	poolType_not_in?: InputMaybe<Array<Scalars['String']>>;
	poolType_not_starts_with?: InputMaybe<Scalars['String']>;
	poolType_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	poolType_starts_with?: InputMaybe<Scalars['String']>;
	poolType_starts_with_nocase?: InputMaybe<Scalars['String']>;
	strategyType?: InputMaybe<Scalars['Int']>;
	strategyType_gt?: InputMaybe<Scalars['Int']>;
	strategyType_gte?: InputMaybe<Scalars['Int']>;
	strategyType_in?: InputMaybe<Array<Scalars['Int']>>;
	strategyType_lt?: InputMaybe<Scalars['Int']>;
	strategyType_lte?: InputMaybe<Scalars['Int']>;
	strategyType_not?: InputMaybe<Scalars['Int']>;
	strategyType_not_in?: InputMaybe<Array<Scalars['Int']>>;
	swapEnabled?: InputMaybe<Scalars['Boolean']>;
	swapEnabled_in?: InputMaybe<Array<Scalars['Boolean']>>;
	swapEnabled_not?: InputMaybe<Scalars['Boolean']>;
	swapEnabled_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
	swapFee?: InputMaybe<Scalars['BigDecimal']>;
	swapFee_gt?: InputMaybe<Scalars['BigDecimal']>;
	swapFee_gte?: InputMaybe<Scalars['BigDecimal']>;
	swapFee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	swapFee_lt?: InputMaybe<Scalars['BigDecimal']>;
	swapFee_lte?: InputMaybe<Scalars['BigDecimal']>;
	swapFee_not?: InputMaybe<Scalars['BigDecimal']>;
	swapFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	swapsCount?: InputMaybe<Scalars['BigInt']>;
	swapsCount_gt?: InputMaybe<Scalars['BigInt']>;
	swapsCount_gte?: InputMaybe<Scalars['BigInt']>;
	swapsCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
	swapsCount_lt?: InputMaybe<Scalars['BigInt']>;
	swapsCount_lte?: InputMaybe<Scalars['BigInt']>;
	swapsCount_not?: InputMaybe<Scalars['BigInt']>;
	swapsCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	symbol?: InputMaybe<Scalars['String']>;
	symbol_contains?: InputMaybe<Scalars['String']>;
	symbol_contains_nocase?: InputMaybe<Scalars['String']>;
	symbol_ends_with?: InputMaybe<Scalars['String']>;
	symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
	symbol_gt?: InputMaybe<Scalars['String']>;
	symbol_gte?: InputMaybe<Scalars['String']>;
	symbol_in?: InputMaybe<Array<Scalars['String']>>;
	symbol_lt?: InputMaybe<Scalars['String']>;
	symbol_lte?: InputMaybe<Scalars['String']>;
	symbol_not?: InputMaybe<Scalars['String']>;
	symbol_not_contains?: InputMaybe<Scalars['String']>;
	symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
	symbol_not_ends_with?: InputMaybe<Scalars['String']>;
	symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
	symbol_not_starts_with?: InputMaybe<Scalars['String']>;
	symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	symbol_starts_with?: InputMaybe<Scalars['String']>;
	symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
	tokensList?: InputMaybe<Array<Scalars['Bytes']>>;
	tokensList_contains?: InputMaybe<Array<Scalars['Bytes']>>;
	tokensList_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
	tokensList_not?: InputMaybe<Array<Scalars['Bytes']>>;
	tokensList_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
	tokensList_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
	totalLiquidity?: InputMaybe<Scalars['BigDecimal']>;
	totalLiquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
	totalLiquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
	totalLiquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalLiquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
	totalLiquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
	totalLiquidity_not?: InputMaybe<Scalars['BigDecimal']>;
	totalLiquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalShares?: InputMaybe<Scalars['BigDecimal']>;
	totalSharesRaw?: InputMaybe<Scalars['BigInt']>;
	totalSharesRaw_gt?: InputMaybe<Scalars['BigInt']>;
	totalSharesRaw_gte?: InputMaybe<Scalars['BigInt']>;
	totalSharesRaw_in?: InputMaybe<Array<Scalars['BigInt']>>;
	totalSharesRaw_lt?: InputMaybe<Scalars['BigInt']>;
	totalSharesRaw_lte?: InputMaybe<Scalars['BigInt']>;
	totalSharesRaw_not?: InputMaybe<Scalars['BigInt']>;
	totalSharesRaw_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	totalShares_gt?: InputMaybe<Scalars['BigDecimal']>;
	totalShares_gte?: InputMaybe<Scalars['BigDecimal']>;
	totalShares_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalShares_lt?: InputMaybe<Scalars['BigDecimal']>;
	totalShares_lte?: InputMaybe<Scalars['BigDecimal']>;
	totalShares_not?: InputMaybe<Scalars['BigDecimal']>;
	totalShares_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalSwapFee?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapFee_gt?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapFee_gte?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapFee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalSwapFee_lt?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapFee_lte?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapFee_not?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalSwapVolume?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalSwapVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapVolume_not?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalWeight?: InputMaybe<Scalars['BigDecimal']>;
	totalWeight_gt?: InputMaybe<Scalars['BigDecimal']>;
	totalWeight_gte?: InputMaybe<Scalars['BigDecimal']>;
	totalWeight_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalWeight_lt?: InputMaybe<Scalars['BigDecimal']>;
	totalWeight_lte?: InputMaybe<Scalars['BigDecimal']>;
	totalWeight_not?: InputMaybe<Scalars['BigDecimal']>;
	totalWeight_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	tx?: InputMaybe<Scalars['Bytes']>;
	tx_contains?: InputMaybe<Scalars['Bytes']>;
	tx_in?: InputMaybe<Array<Scalars['Bytes']>>;
	tx_not?: InputMaybe<Scalars['Bytes']>;
	tx_not_contains?: InputMaybe<Scalars['Bytes']>;
	tx_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
	vault?: InputMaybe<Scalars['String']>;
	vault_contains?: InputMaybe<Scalars['String']>;
	vault_contains_nocase?: InputMaybe<Scalars['String']>;
	vault_ends_with?: InputMaybe<Scalars['String']>;
	vault_ends_with_nocase?: InputMaybe<Scalars['String']>;
	vault_gt?: InputMaybe<Scalars['String']>;
	vault_gte?: InputMaybe<Scalars['String']>;
	vault_in?: InputMaybe<Array<Scalars['String']>>;
	vault_lt?: InputMaybe<Scalars['String']>;
	vault_lte?: InputMaybe<Scalars['String']>;
	vault_not?: InputMaybe<Scalars['String']>;
	vault_not_contains?: InputMaybe<Scalars['String']>;
	vault_not_contains_nocase?: InputMaybe<Scalars['String']>;
	vault_not_ends_with?: InputMaybe<Scalars['String']>;
	vault_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	vault_not_in?: InputMaybe<Array<Scalars['String']>>;
	vault_not_starts_with?: InputMaybe<Scalars['String']>;
	vault_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	vault_starts_with?: InputMaybe<Scalars['String']>;
	vault_starts_with_nocase?: InputMaybe<Scalars['String']>;
}

export type Pool_OrderBy =
	| 'address'
	| 'createTime'
	| 'factory'
	| 'historicalValues'
	| 'holdersCount'
	| 'id'
	| 'name'
	| 'owner'
	| 'poolType'
	| 'shares'
	| 'strategyType'
	| 'swapEnabled'
	| 'swapFee'
	| 'swaps'
	| 'swapsCount'
	| 'symbol'
	| 'tokens'
	| 'tokensList'
	| 'totalLiquidity'
	| 'totalShares'
	| 'totalSharesRaw'
	| 'totalSwapFee'
	| 'totalSwapVolume'
	| 'totalWeight'
	| 'tx'
	| 'vault';

export interface Query {
	__typename: 'Query';
	/** Access to subgraph metadata */
	_meta?: Maybe<_Meta_>;
	account?: Maybe<Account>;
	accountInternalBalance?: Maybe<AccountInternalBalance>;
	accountInternalBalances: Array<AccountInternalBalance>;
	accounts: Array<Account>;
	gauge?: Maybe<Gauge>;
	gaugeDeposit?: Maybe<GaugeDeposit>;
	gaugeDeposits: Array<GaugeDeposit>;
	gaugeLiquidities: Array<GaugeLiquidity>;
	gaugeLiquidity?: Maybe<GaugeLiquidity>;
	gaugeTotalWeight?: Maybe<GaugeTotalWeight>;
	gaugeTotalWeights: Array<GaugeTotalWeight>;
	gaugeType?: Maybe<GaugeType>;
	gaugeTypeWeight?: Maybe<GaugeTypeWeight>;
	gaugeTypeWeights: Array<GaugeTypeWeight>;
	gaugeTypes: Array<GaugeType>;
	gaugeWeight?: Maybe<GaugeWeight>;
	gaugeWeightVote?: Maybe<GaugeWeightVote>;
	gaugeWeightVotes: Array<GaugeWeightVote>;
	gaugeWeights: Array<GaugeWeight>;
	gaugeWithdraw?: Maybe<GaugeWithdraw>;
	gaugeWithdraws: Array<GaugeWithdraw>;
	gauges: Array<Gauge>;
	joinExit?: Maybe<JoinExit>;
	joinExits: Array<JoinExit>;
	koyo?: Maybe<Koyo>;
	koyos: Array<Koyo>;
	latestPrice?: Maybe<LatestPrice>;
	latestPrices: Array<LatestPrice>;
	pool?: Maybe<Pool>;
	poolHistoricalLiquidities: Array<PoolHistoricalLiquidity>;
	poolHistoricalLiquidity?: Maybe<PoolHistoricalLiquidity>;
	poolShare?: Maybe<PoolShare>;
	poolShares: Array<PoolShare>;
	poolToken?: Maybe<PoolToken>;
	poolTokens: Array<PoolToken>;
	pools: Array<Pool>;
	swap?: Maybe<Swap>;
	swaps: Array<Swap>;
	token?: Maybe<Token>;
	tokenPrice?: Maybe<TokenPrice>;
	tokenPrices: Array<TokenPrice>;
	tokenSnapshot?: Maybe<TokenSnapshot>;
	tokenSnapshots: Array<TokenSnapshot>;
	tokens: Array<Token>;
	tradePair?: Maybe<TradePair>;
	tradePairs: Array<TradePair>;
}

export interface Query_MetaArgs {
	block?: InputMaybe<Block_Height>;
}

export interface QueryAccountArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryAccountInternalBalanceArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryAccountInternalBalancesArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<AccountInternalBalance_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<AccountInternalBalance_Filter>;
}

export interface QueryAccountsArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Account_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Account_Filter>;
}

export interface QueryGaugeArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryGaugeDepositArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryGaugeDepositsArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<GaugeDeposit_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<GaugeDeposit_Filter>;
}

export interface QueryGaugeLiquiditiesArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<GaugeLiquidity_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<GaugeLiquidity_Filter>;
}

export interface QueryGaugeLiquidityArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryGaugeTotalWeightArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryGaugeTotalWeightsArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<GaugeTotalWeight_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<GaugeTotalWeight_Filter>;
}

export interface QueryGaugeTypeArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryGaugeTypeWeightArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryGaugeTypeWeightsArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<GaugeTypeWeight_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<GaugeTypeWeight_Filter>;
}

export interface QueryGaugeTypesArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<GaugeType_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<GaugeType_Filter>;
}

export interface QueryGaugeWeightArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryGaugeWeightVoteArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryGaugeWeightVotesArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<GaugeWeightVote_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<GaugeWeightVote_Filter>;
}

export interface QueryGaugeWeightsArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<GaugeWeight_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<GaugeWeight_Filter>;
}

export interface QueryGaugeWithdrawArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryGaugeWithdrawsArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<GaugeWithdraw_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<GaugeWithdraw_Filter>;
}

export interface QueryGaugesArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Gauge_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Gauge_Filter>;
}

export interface QueryJoinExitArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryJoinExitsArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<JoinExit_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<JoinExit_Filter>;
}

export interface QueryKoyoArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryKoyosArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Koyo_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Koyo_Filter>;
}

export interface QueryLatestPriceArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryLatestPricesArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<LatestPrice_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<LatestPrice_Filter>;
}

export interface QueryPoolArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryPoolHistoricalLiquiditiesArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<PoolHistoricalLiquidity_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<PoolHistoricalLiquidity_Filter>;
}

export interface QueryPoolHistoricalLiquidityArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryPoolShareArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryPoolSharesArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<PoolShare_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<PoolShare_Filter>;
}

export interface QueryPoolTokenArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryPoolTokensArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<PoolToken_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<PoolToken_Filter>;
}

export interface QueryPoolsArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Pool_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Pool_Filter>;
}

export interface QuerySwapArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface QuerySwapsArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Swap_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Swap_Filter>;
}

export interface QueryTokenArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryTokenPriceArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryTokenPricesArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<TokenPrice_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<TokenPrice_Filter>;
}

export interface QueryTokenSnapshotArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryTokenSnapshotsArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<TokenSnapshot_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<TokenSnapshot_Filter>;
}

export interface QueryTokensArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Token_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Token_Filter>;
}

export interface QueryTradePairArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryTradePairsArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<TradePair_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<TradePair_Filter>;
}

export interface Subscription {
	__typename: 'Subscription';
	/** Access to subgraph metadata */
	_meta?: Maybe<_Meta_>;
	account?: Maybe<Account>;
	accountInternalBalance?: Maybe<AccountInternalBalance>;
	accountInternalBalances: Array<AccountInternalBalance>;
	accounts: Array<Account>;
	gauge?: Maybe<Gauge>;
	gaugeDeposit?: Maybe<GaugeDeposit>;
	gaugeDeposits: Array<GaugeDeposit>;
	gaugeLiquidities: Array<GaugeLiquidity>;
	gaugeLiquidity?: Maybe<GaugeLiquidity>;
	gaugeTotalWeight?: Maybe<GaugeTotalWeight>;
	gaugeTotalWeights: Array<GaugeTotalWeight>;
	gaugeType?: Maybe<GaugeType>;
	gaugeTypeWeight?: Maybe<GaugeTypeWeight>;
	gaugeTypeWeights: Array<GaugeTypeWeight>;
	gaugeTypes: Array<GaugeType>;
	gaugeWeight?: Maybe<GaugeWeight>;
	gaugeWeightVote?: Maybe<GaugeWeightVote>;
	gaugeWeightVotes: Array<GaugeWeightVote>;
	gaugeWeights: Array<GaugeWeight>;
	gaugeWithdraw?: Maybe<GaugeWithdraw>;
	gaugeWithdraws: Array<GaugeWithdraw>;
	gauges: Array<Gauge>;
	joinExit?: Maybe<JoinExit>;
	joinExits: Array<JoinExit>;
	koyo?: Maybe<Koyo>;
	koyos: Array<Koyo>;
	latestPrice?: Maybe<LatestPrice>;
	latestPrices: Array<LatestPrice>;
	pool?: Maybe<Pool>;
	poolHistoricalLiquidities: Array<PoolHistoricalLiquidity>;
	poolHistoricalLiquidity?: Maybe<PoolHistoricalLiquidity>;
	poolShare?: Maybe<PoolShare>;
	poolShares: Array<PoolShare>;
	poolToken?: Maybe<PoolToken>;
	poolTokens: Array<PoolToken>;
	pools: Array<Pool>;
	swap?: Maybe<Swap>;
	swaps: Array<Swap>;
	token?: Maybe<Token>;
	tokenPrice?: Maybe<TokenPrice>;
	tokenPrices: Array<TokenPrice>;
	tokenSnapshot?: Maybe<TokenSnapshot>;
	tokenSnapshots: Array<TokenSnapshot>;
	tokens: Array<Token>;
	tradePair?: Maybe<TradePair>;
	tradePairs: Array<TradePair>;
}

export interface Subscription_MetaArgs {
	block?: InputMaybe<Block_Height>;
}

export interface SubscriptionAccountArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionAccountInternalBalanceArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionAccountInternalBalancesArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<AccountInternalBalance_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<AccountInternalBalance_Filter>;
}

export interface SubscriptionAccountsArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Account_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Account_Filter>;
}

export interface SubscriptionGaugeArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionGaugeDepositArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionGaugeDepositsArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<GaugeDeposit_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<GaugeDeposit_Filter>;
}

export interface SubscriptionGaugeLiquiditiesArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<GaugeLiquidity_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<GaugeLiquidity_Filter>;
}

export interface SubscriptionGaugeLiquidityArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionGaugeTotalWeightArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionGaugeTotalWeightsArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<GaugeTotalWeight_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<GaugeTotalWeight_Filter>;
}

export interface SubscriptionGaugeTypeArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionGaugeTypeWeightArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionGaugeTypeWeightsArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<GaugeTypeWeight_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<GaugeTypeWeight_Filter>;
}

export interface SubscriptionGaugeTypesArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<GaugeType_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<GaugeType_Filter>;
}

export interface SubscriptionGaugeWeightArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionGaugeWeightVoteArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionGaugeWeightVotesArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<GaugeWeightVote_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<GaugeWeightVote_Filter>;
}

export interface SubscriptionGaugeWeightsArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<GaugeWeight_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<GaugeWeight_Filter>;
}

export interface SubscriptionGaugeWithdrawArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionGaugeWithdrawsArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<GaugeWithdraw_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<GaugeWithdraw_Filter>;
}

export interface SubscriptionGaugesArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Gauge_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Gauge_Filter>;
}

export interface SubscriptionJoinExitArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionJoinExitsArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<JoinExit_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<JoinExit_Filter>;
}

export interface SubscriptionKoyoArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionKoyosArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Koyo_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Koyo_Filter>;
}

export interface SubscriptionLatestPriceArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionLatestPricesArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<LatestPrice_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<LatestPrice_Filter>;
}

export interface SubscriptionPoolArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionPoolHistoricalLiquiditiesArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<PoolHistoricalLiquidity_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<PoolHistoricalLiquidity_Filter>;
}

export interface SubscriptionPoolHistoricalLiquidityArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionPoolShareArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionPoolSharesArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<PoolShare_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<PoolShare_Filter>;
}

export interface SubscriptionPoolTokenArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionPoolTokensArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<PoolToken_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<PoolToken_Filter>;
}

export interface SubscriptionPoolsArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Pool_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Pool_Filter>;
}

export interface SubscriptionSwapArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionSwapsArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Swap_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Swap_Filter>;
}

export interface SubscriptionTokenArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionTokenPriceArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionTokenPricesArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<TokenPrice_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<TokenPrice_Filter>;
}

export interface SubscriptionTokenSnapshotArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionTokenSnapshotsArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<TokenSnapshot_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<TokenSnapshot_Filter>;
}

export interface SubscriptionTokensArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Token_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Token_Filter>;
}

export interface SubscriptionTradePairArgs {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionTradePairsArgs {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<TradePair_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<TradePair_Filter>;
}

export interface Swap {
	__typename: 'Swap';
	account: Account;
	caller: Scalars['Bytes'];
	id: Scalars['ID'];
	poolId: Pool;
	timestamp: Scalars['Int'];
	tokenAmountIn: Scalars['BigDecimal'];
	tokenAmountOut: Scalars['BigDecimal'];
	tokenIn: Scalars['Bytes'];
	tokenInSym: Scalars['String'];
	tokenOut: Scalars['Bytes'];
	tokenOutSym: Scalars['String'];
	tx: Scalars['Bytes'];
}

export interface Swap_Filter {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	account?: InputMaybe<Scalars['String']>;
	account_contains?: InputMaybe<Scalars['String']>;
	account_contains_nocase?: InputMaybe<Scalars['String']>;
	account_ends_with?: InputMaybe<Scalars['String']>;
	account_ends_with_nocase?: InputMaybe<Scalars['String']>;
	account_gt?: InputMaybe<Scalars['String']>;
	account_gte?: InputMaybe<Scalars['String']>;
	account_in?: InputMaybe<Array<Scalars['String']>>;
	account_lt?: InputMaybe<Scalars['String']>;
	account_lte?: InputMaybe<Scalars['String']>;
	account_not?: InputMaybe<Scalars['String']>;
	account_not_contains?: InputMaybe<Scalars['String']>;
	account_not_contains_nocase?: InputMaybe<Scalars['String']>;
	account_not_ends_with?: InputMaybe<Scalars['String']>;
	account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	account_not_in?: InputMaybe<Array<Scalars['String']>>;
	account_not_starts_with?: InputMaybe<Scalars['String']>;
	account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	account_starts_with?: InputMaybe<Scalars['String']>;
	account_starts_with_nocase?: InputMaybe<Scalars['String']>;
	caller?: InputMaybe<Scalars['Bytes']>;
	caller_contains?: InputMaybe<Scalars['Bytes']>;
	caller_in?: InputMaybe<Array<Scalars['Bytes']>>;
	caller_not?: InputMaybe<Scalars['Bytes']>;
	caller_not_contains?: InputMaybe<Scalars['Bytes']>;
	caller_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	poolId?: InputMaybe<Scalars['String']>;
	poolId_contains?: InputMaybe<Scalars['String']>;
	poolId_contains_nocase?: InputMaybe<Scalars['String']>;
	poolId_ends_with?: InputMaybe<Scalars['String']>;
	poolId_ends_with_nocase?: InputMaybe<Scalars['String']>;
	poolId_gt?: InputMaybe<Scalars['String']>;
	poolId_gte?: InputMaybe<Scalars['String']>;
	poolId_in?: InputMaybe<Array<Scalars['String']>>;
	poolId_lt?: InputMaybe<Scalars['String']>;
	poolId_lte?: InputMaybe<Scalars['String']>;
	poolId_not?: InputMaybe<Scalars['String']>;
	poolId_not_contains?: InputMaybe<Scalars['String']>;
	poolId_not_contains_nocase?: InputMaybe<Scalars['String']>;
	poolId_not_ends_with?: InputMaybe<Scalars['String']>;
	poolId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
	poolId_not_starts_with?: InputMaybe<Scalars['String']>;
	poolId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	poolId_starts_with?: InputMaybe<Scalars['String']>;
	poolId_starts_with_nocase?: InputMaybe<Scalars['String']>;
	timestamp?: InputMaybe<Scalars['Int']>;
	timestamp_gt?: InputMaybe<Scalars['Int']>;
	timestamp_gte?: InputMaybe<Scalars['Int']>;
	timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
	timestamp_lt?: InputMaybe<Scalars['Int']>;
	timestamp_lte?: InputMaybe<Scalars['Int']>;
	timestamp_not?: InputMaybe<Scalars['Int']>;
	timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
	tokenAmountIn?: InputMaybe<Scalars['BigDecimal']>;
	tokenAmountIn_gt?: InputMaybe<Scalars['BigDecimal']>;
	tokenAmountIn_gte?: InputMaybe<Scalars['BigDecimal']>;
	tokenAmountIn_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	tokenAmountIn_lt?: InputMaybe<Scalars['BigDecimal']>;
	tokenAmountIn_lte?: InputMaybe<Scalars['BigDecimal']>;
	tokenAmountIn_not?: InputMaybe<Scalars['BigDecimal']>;
	tokenAmountIn_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	tokenAmountOut?: InputMaybe<Scalars['BigDecimal']>;
	tokenAmountOut_gt?: InputMaybe<Scalars['BigDecimal']>;
	tokenAmountOut_gte?: InputMaybe<Scalars['BigDecimal']>;
	tokenAmountOut_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	tokenAmountOut_lt?: InputMaybe<Scalars['BigDecimal']>;
	tokenAmountOut_lte?: InputMaybe<Scalars['BigDecimal']>;
	tokenAmountOut_not?: InputMaybe<Scalars['BigDecimal']>;
	tokenAmountOut_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	tokenIn?: InputMaybe<Scalars['Bytes']>;
	tokenInSym?: InputMaybe<Scalars['String']>;
	tokenInSym_contains?: InputMaybe<Scalars['String']>;
	tokenInSym_contains_nocase?: InputMaybe<Scalars['String']>;
	tokenInSym_ends_with?: InputMaybe<Scalars['String']>;
	tokenInSym_ends_with_nocase?: InputMaybe<Scalars['String']>;
	tokenInSym_gt?: InputMaybe<Scalars['String']>;
	tokenInSym_gte?: InputMaybe<Scalars['String']>;
	tokenInSym_in?: InputMaybe<Array<Scalars['String']>>;
	tokenInSym_lt?: InputMaybe<Scalars['String']>;
	tokenInSym_lte?: InputMaybe<Scalars['String']>;
	tokenInSym_not?: InputMaybe<Scalars['String']>;
	tokenInSym_not_contains?: InputMaybe<Scalars['String']>;
	tokenInSym_not_contains_nocase?: InputMaybe<Scalars['String']>;
	tokenInSym_not_ends_with?: InputMaybe<Scalars['String']>;
	tokenInSym_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	tokenInSym_not_in?: InputMaybe<Array<Scalars['String']>>;
	tokenInSym_not_starts_with?: InputMaybe<Scalars['String']>;
	tokenInSym_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	tokenInSym_starts_with?: InputMaybe<Scalars['String']>;
	tokenInSym_starts_with_nocase?: InputMaybe<Scalars['String']>;
	tokenIn_contains?: InputMaybe<Scalars['Bytes']>;
	tokenIn_in?: InputMaybe<Array<Scalars['Bytes']>>;
	tokenIn_not?: InputMaybe<Scalars['Bytes']>;
	tokenIn_not_contains?: InputMaybe<Scalars['Bytes']>;
	tokenIn_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
	tokenOut?: InputMaybe<Scalars['Bytes']>;
	tokenOutSym?: InputMaybe<Scalars['String']>;
	tokenOutSym_contains?: InputMaybe<Scalars['String']>;
	tokenOutSym_contains_nocase?: InputMaybe<Scalars['String']>;
	tokenOutSym_ends_with?: InputMaybe<Scalars['String']>;
	tokenOutSym_ends_with_nocase?: InputMaybe<Scalars['String']>;
	tokenOutSym_gt?: InputMaybe<Scalars['String']>;
	tokenOutSym_gte?: InputMaybe<Scalars['String']>;
	tokenOutSym_in?: InputMaybe<Array<Scalars['String']>>;
	tokenOutSym_lt?: InputMaybe<Scalars['String']>;
	tokenOutSym_lte?: InputMaybe<Scalars['String']>;
	tokenOutSym_not?: InputMaybe<Scalars['String']>;
	tokenOutSym_not_contains?: InputMaybe<Scalars['String']>;
	tokenOutSym_not_contains_nocase?: InputMaybe<Scalars['String']>;
	tokenOutSym_not_ends_with?: InputMaybe<Scalars['String']>;
	tokenOutSym_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	tokenOutSym_not_in?: InputMaybe<Array<Scalars['String']>>;
	tokenOutSym_not_starts_with?: InputMaybe<Scalars['String']>;
	tokenOutSym_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	tokenOutSym_starts_with?: InputMaybe<Scalars['String']>;
	tokenOutSym_starts_with_nocase?: InputMaybe<Scalars['String']>;
	tokenOut_contains?: InputMaybe<Scalars['Bytes']>;
	tokenOut_in?: InputMaybe<Array<Scalars['Bytes']>>;
	tokenOut_not?: InputMaybe<Scalars['Bytes']>;
	tokenOut_not_contains?: InputMaybe<Scalars['Bytes']>;
	tokenOut_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
	tx?: InputMaybe<Scalars['Bytes']>;
	tx_contains?: InputMaybe<Scalars['Bytes']>;
	tx_in?: InputMaybe<Array<Scalars['Bytes']>>;
	tx_not?: InputMaybe<Scalars['Bytes']>;
	tx_not_contains?: InputMaybe<Scalars['Bytes']>;
	tx_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
}

export type Swap_OrderBy =
	| 'account'
	| 'caller'
	| 'id'
	| 'poolId'
	| 'timestamp'
	| 'tokenAmountIn'
	| 'tokenAmountOut'
	| 'tokenIn'
	| 'tokenInSym'
	| 'tokenOut'
	| 'tokenOutSym'
	| 'tx';

export interface Token {
	__typename: 'Token';
	address: Scalars['String'];
	decimals: Scalars['Int'];
	id: Scalars['ID'];
	latestPrice?: Maybe<LatestPrice>;
	name?: Maybe<Scalars['String']>;
	symbol?: Maybe<Scalars['String']>;
	totalBalanceNotional: Scalars['BigDecimal'];
	totalBalanceUSD: Scalars['BigDecimal'];
	totalSwapCount: Scalars['BigInt'];
	totalVolumeNotional: Scalars['BigDecimal'];
	totalVolumeUSD: Scalars['BigDecimal'];
}

export interface TokenPrice {
	__typename: 'TokenPrice';
	amount: Scalars['BigDecimal'];
	asset: Scalars['Bytes'];
	block: Scalars['BigInt'];
	id: Scalars['ID'];
	poolId: Pool;
	price: Scalars['BigDecimal'];
	priceUSD: Scalars['BigDecimal'];
	/**  Address of stable asset  */
	pricingAsset: Scalars['Bytes'];
	timestamp: Scalars['Int'];
}

export interface TokenPrice_Filter {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	amount?: InputMaybe<Scalars['BigDecimal']>;
	amount_gt?: InputMaybe<Scalars['BigDecimal']>;
	amount_gte?: InputMaybe<Scalars['BigDecimal']>;
	amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	amount_lt?: InputMaybe<Scalars['BigDecimal']>;
	amount_lte?: InputMaybe<Scalars['BigDecimal']>;
	amount_not?: InputMaybe<Scalars['BigDecimal']>;
	amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	asset?: InputMaybe<Scalars['Bytes']>;
	asset_contains?: InputMaybe<Scalars['Bytes']>;
	asset_in?: InputMaybe<Array<Scalars['Bytes']>>;
	asset_not?: InputMaybe<Scalars['Bytes']>;
	asset_not_contains?: InputMaybe<Scalars['Bytes']>;
	asset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
	block?: InputMaybe<Scalars['BigInt']>;
	block_gt?: InputMaybe<Scalars['BigInt']>;
	block_gte?: InputMaybe<Scalars['BigInt']>;
	block_in?: InputMaybe<Array<Scalars['BigInt']>>;
	block_lt?: InputMaybe<Scalars['BigInt']>;
	block_lte?: InputMaybe<Scalars['BigInt']>;
	block_not?: InputMaybe<Scalars['BigInt']>;
	block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	poolId?: InputMaybe<Scalars['String']>;
	poolId_contains?: InputMaybe<Scalars['String']>;
	poolId_contains_nocase?: InputMaybe<Scalars['String']>;
	poolId_ends_with?: InputMaybe<Scalars['String']>;
	poolId_ends_with_nocase?: InputMaybe<Scalars['String']>;
	poolId_gt?: InputMaybe<Scalars['String']>;
	poolId_gte?: InputMaybe<Scalars['String']>;
	poolId_in?: InputMaybe<Array<Scalars['String']>>;
	poolId_lt?: InputMaybe<Scalars['String']>;
	poolId_lte?: InputMaybe<Scalars['String']>;
	poolId_not?: InputMaybe<Scalars['String']>;
	poolId_not_contains?: InputMaybe<Scalars['String']>;
	poolId_not_contains_nocase?: InputMaybe<Scalars['String']>;
	poolId_not_ends_with?: InputMaybe<Scalars['String']>;
	poolId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
	poolId_not_starts_with?: InputMaybe<Scalars['String']>;
	poolId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	poolId_starts_with?: InputMaybe<Scalars['String']>;
	poolId_starts_with_nocase?: InputMaybe<Scalars['String']>;
	price?: InputMaybe<Scalars['BigDecimal']>;
	priceUSD?: InputMaybe<Scalars['BigDecimal']>;
	priceUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
	priceUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
	priceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	priceUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
	priceUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
	priceUSD_not?: InputMaybe<Scalars['BigDecimal']>;
	priceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	price_gt?: InputMaybe<Scalars['BigDecimal']>;
	price_gte?: InputMaybe<Scalars['BigDecimal']>;
	price_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	price_lt?: InputMaybe<Scalars['BigDecimal']>;
	price_lte?: InputMaybe<Scalars['BigDecimal']>;
	price_not?: InputMaybe<Scalars['BigDecimal']>;
	price_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	pricingAsset?: InputMaybe<Scalars['Bytes']>;
	pricingAsset_contains?: InputMaybe<Scalars['Bytes']>;
	pricingAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
	pricingAsset_not?: InputMaybe<Scalars['Bytes']>;
	pricingAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
	pricingAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
	timestamp?: InputMaybe<Scalars['Int']>;
	timestamp_gt?: InputMaybe<Scalars['Int']>;
	timestamp_gte?: InputMaybe<Scalars['Int']>;
	timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
	timestamp_lt?: InputMaybe<Scalars['Int']>;
	timestamp_lte?: InputMaybe<Scalars['Int']>;
	timestamp_not?: InputMaybe<Scalars['Int']>;
	timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
}

export type TokenPrice_OrderBy = 'amount' | 'asset' | 'block' | 'id' | 'poolId' | 'price' | 'priceUSD' | 'pricingAsset' | 'timestamp';

export interface TokenSnapshot {
	__typename: 'TokenSnapshot';
	id: Scalars['ID'];
	timestamp: Scalars['Int'];
	token: Token;
	totalBalanceNotional: Scalars['BigDecimal'];
	totalBalanceUSD: Scalars['BigDecimal'];
	totalSwapCount: Scalars['BigInt'];
	totalVolumeNotional: Scalars['BigDecimal'];
	totalVolumeUSD: Scalars['BigDecimal'];
}

export interface TokenSnapshot_Filter {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	timestamp?: InputMaybe<Scalars['Int']>;
	timestamp_gt?: InputMaybe<Scalars['Int']>;
	timestamp_gte?: InputMaybe<Scalars['Int']>;
	timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
	timestamp_lt?: InputMaybe<Scalars['Int']>;
	timestamp_lte?: InputMaybe<Scalars['Int']>;
	timestamp_not?: InputMaybe<Scalars['Int']>;
	timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
	token?: InputMaybe<Scalars['String']>;
	token_contains?: InputMaybe<Scalars['String']>;
	token_contains_nocase?: InputMaybe<Scalars['String']>;
	token_ends_with?: InputMaybe<Scalars['String']>;
	token_ends_with_nocase?: InputMaybe<Scalars['String']>;
	token_gt?: InputMaybe<Scalars['String']>;
	token_gte?: InputMaybe<Scalars['String']>;
	token_in?: InputMaybe<Array<Scalars['String']>>;
	token_lt?: InputMaybe<Scalars['String']>;
	token_lte?: InputMaybe<Scalars['String']>;
	token_not?: InputMaybe<Scalars['String']>;
	token_not_contains?: InputMaybe<Scalars['String']>;
	token_not_contains_nocase?: InputMaybe<Scalars['String']>;
	token_not_ends_with?: InputMaybe<Scalars['String']>;
	token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	token_not_in?: InputMaybe<Array<Scalars['String']>>;
	token_not_starts_with?: InputMaybe<Scalars['String']>;
	token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	token_starts_with?: InputMaybe<Scalars['String']>;
	token_starts_with_nocase?: InputMaybe<Scalars['String']>;
	totalBalanceNotional?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceNotional_gt?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceNotional_gte?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceNotional_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalBalanceNotional_lt?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceNotional_lte?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceNotional_not?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceNotional_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalBalanceUSD?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalBalanceUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceUSD_not?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalSwapCount?: InputMaybe<Scalars['BigInt']>;
	totalSwapCount_gt?: InputMaybe<Scalars['BigInt']>;
	totalSwapCount_gte?: InputMaybe<Scalars['BigInt']>;
	totalSwapCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
	totalSwapCount_lt?: InputMaybe<Scalars['BigInt']>;
	totalSwapCount_lte?: InputMaybe<Scalars['BigInt']>;
	totalSwapCount_not?: InputMaybe<Scalars['BigInt']>;
	totalSwapCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	totalVolumeNotional?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeNotional_gt?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeNotional_gte?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeNotional_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalVolumeNotional_lt?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeNotional_lte?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeNotional_not?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeNotional_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
}

export type TokenSnapshot_OrderBy =
	| 'id'
	| 'timestamp'
	| 'token'
	| 'totalBalanceNotional'
	| 'totalBalanceUSD'
	| 'totalSwapCount'
	| 'totalVolumeNotional'
	| 'totalVolumeUSD';

export interface Token_Filter {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	address?: InputMaybe<Scalars['String']>;
	address_contains?: InputMaybe<Scalars['String']>;
	address_contains_nocase?: InputMaybe<Scalars['String']>;
	address_ends_with?: InputMaybe<Scalars['String']>;
	address_ends_with_nocase?: InputMaybe<Scalars['String']>;
	address_gt?: InputMaybe<Scalars['String']>;
	address_gte?: InputMaybe<Scalars['String']>;
	address_in?: InputMaybe<Array<Scalars['String']>>;
	address_lt?: InputMaybe<Scalars['String']>;
	address_lte?: InputMaybe<Scalars['String']>;
	address_not?: InputMaybe<Scalars['String']>;
	address_not_contains?: InputMaybe<Scalars['String']>;
	address_not_contains_nocase?: InputMaybe<Scalars['String']>;
	address_not_ends_with?: InputMaybe<Scalars['String']>;
	address_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	address_not_in?: InputMaybe<Array<Scalars['String']>>;
	address_not_starts_with?: InputMaybe<Scalars['String']>;
	address_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	address_starts_with?: InputMaybe<Scalars['String']>;
	address_starts_with_nocase?: InputMaybe<Scalars['String']>;
	decimals?: InputMaybe<Scalars['Int']>;
	decimals_gt?: InputMaybe<Scalars['Int']>;
	decimals_gte?: InputMaybe<Scalars['Int']>;
	decimals_in?: InputMaybe<Array<Scalars['Int']>>;
	decimals_lt?: InputMaybe<Scalars['Int']>;
	decimals_lte?: InputMaybe<Scalars['Int']>;
	decimals_not?: InputMaybe<Scalars['Int']>;
	decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	latestPrice?: InputMaybe<Scalars['String']>;
	latestPrice_contains?: InputMaybe<Scalars['String']>;
	latestPrice_contains_nocase?: InputMaybe<Scalars['String']>;
	latestPrice_ends_with?: InputMaybe<Scalars['String']>;
	latestPrice_ends_with_nocase?: InputMaybe<Scalars['String']>;
	latestPrice_gt?: InputMaybe<Scalars['String']>;
	latestPrice_gte?: InputMaybe<Scalars['String']>;
	latestPrice_in?: InputMaybe<Array<Scalars['String']>>;
	latestPrice_lt?: InputMaybe<Scalars['String']>;
	latestPrice_lte?: InputMaybe<Scalars['String']>;
	latestPrice_not?: InputMaybe<Scalars['String']>;
	latestPrice_not_contains?: InputMaybe<Scalars['String']>;
	latestPrice_not_contains_nocase?: InputMaybe<Scalars['String']>;
	latestPrice_not_ends_with?: InputMaybe<Scalars['String']>;
	latestPrice_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	latestPrice_not_in?: InputMaybe<Array<Scalars['String']>>;
	latestPrice_not_starts_with?: InputMaybe<Scalars['String']>;
	latestPrice_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	latestPrice_starts_with?: InputMaybe<Scalars['String']>;
	latestPrice_starts_with_nocase?: InputMaybe<Scalars['String']>;
	name?: InputMaybe<Scalars['String']>;
	name_contains?: InputMaybe<Scalars['String']>;
	name_contains_nocase?: InputMaybe<Scalars['String']>;
	name_ends_with?: InputMaybe<Scalars['String']>;
	name_ends_with_nocase?: InputMaybe<Scalars['String']>;
	name_gt?: InputMaybe<Scalars['String']>;
	name_gte?: InputMaybe<Scalars['String']>;
	name_in?: InputMaybe<Array<Scalars['String']>>;
	name_lt?: InputMaybe<Scalars['String']>;
	name_lte?: InputMaybe<Scalars['String']>;
	name_not?: InputMaybe<Scalars['String']>;
	name_not_contains?: InputMaybe<Scalars['String']>;
	name_not_contains_nocase?: InputMaybe<Scalars['String']>;
	name_not_ends_with?: InputMaybe<Scalars['String']>;
	name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	name_not_in?: InputMaybe<Array<Scalars['String']>>;
	name_not_starts_with?: InputMaybe<Scalars['String']>;
	name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	name_starts_with?: InputMaybe<Scalars['String']>;
	name_starts_with_nocase?: InputMaybe<Scalars['String']>;
	symbol?: InputMaybe<Scalars['String']>;
	symbol_contains?: InputMaybe<Scalars['String']>;
	symbol_contains_nocase?: InputMaybe<Scalars['String']>;
	symbol_ends_with?: InputMaybe<Scalars['String']>;
	symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
	symbol_gt?: InputMaybe<Scalars['String']>;
	symbol_gte?: InputMaybe<Scalars['String']>;
	symbol_in?: InputMaybe<Array<Scalars['String']>>;
	symbol_lt?: InputMaybe<Scalars['String']>;
	symbol_lte?: InputMaybe<Scalars['String']>;
	symbol_not?: InputMaybe<Scalars['String']>;
	symbol_not_contains?: InputMaybe<Scalars['String']>;
	symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
	symbol_not_ends_with?: InputMaybe<Scalars['String']>;
	symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
	symbol_not_starts_with?: InputMaybe<Scalars['String']>;
	symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	symbol_starts_with?: InputMaybe<Scalars['String']>;
	symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
	totalBalanceNotional?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceNotional_gt?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceNotional_gte?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceNotional_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalBalanceNotional_lt?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceNotional_lte?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceNotional_not?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceNotional_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalBalanceUSD?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalBalanceUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceUSD_not?: InputMaybe<Scalars['BigDecimal']>;
	totalBalanceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalSwapCount?: InputMaybe<Scalars['BigInt']>;
	totalSwapCount_gt?: InputMaybe<Scalars['BigInt']>;
	totalSwapCount_gte?: InputMaybe<Scalars['BigInt']>;
	totalSwapCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
	totalSwapCount_lt?: InputMaybe<Scalars['BigInt']>;
	totalSwapCount_lte?: InputMaybe<Scalars['BigInt']>;
	totalSwapCount_not?: InputMaybe<Scalars['BigInt']>;
	totalSwapCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	totalVolumeNotional?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeNotional_gt?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeNotional_gte?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeNotional_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalVolumeNotional_lt?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeNotional_lte?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeNotional_not?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeNotional_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
	totalVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
}

export type Token_OrderBy =
	| 'address'
	| 'decimals'
	| 'id'
	| 'latestPrice'
	| 'name'
	| 'symbol'
	| 'totalBalanceNotional'
	| 'totalBalanceUSD'
	| 'totalSwapCount'
	| 'totalVolumeNotional'
	| 'totalVolumeUSD';

export interface TradePair {
	__typename: 'TradePair';
	/**  Token Address - Token Address  */
	id: Scalars['ID'];
	token0: Token;
	token1: Token;
	totalSwapFee: Scalars['BigDecimal'];
	totalSwapVolume: Scalars['BigDecimal'];
}

export interface TradePair_Filter {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	token0?: InputMaybe<Scalars['String']>;
	token0_contains?: InputMaybe<Scalars['String']>;
	token0_contains_nocase?: InputMaybe<Scalars['String']>;
	token0_ends_with?: InputMaybe<Scalars['String']>;
	token0_ends_with_nocase?: InputMaybe<Scalars['String']>;
	token0_gt?: InputMaybe<Scalars['String']>;
	token0_gte?: InputMaybe<Scalars['String']>;
	token0_in?: InputMaybe<Array<Scalars['String']>>;
	token0_lt?: InputMaybe<Scalars['String']>;
	token0_lte?: InputMaybe<Scalars['String']>;
	token0_not?: InputMaybe<Scalars['String']>;
	token0_not_contains?: InputMaybe<Scalars['String']>;
	token0_not_contains_nocase?: InputMaybe<Scalars['String']>;
	token0_not_ends_with?: InputMaybe<Scalars['String']>;
	token0_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	token0_not_in?: InputMaybe<Array<Scalars['String']>>;
	token0_not_starts_with?: InputMaybe<Scalars['String']>;
	token0_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	token0_starts_with?: InputMaybe<Scalars['String']>;
	token0_starts_with_nocase?: InputMaybe<Scalars['String']>;
	token1?: InputMaybe<Scalars['String']>;
	token1_contains?: InputMaybe<Scalars['String']>;
	token1_contains_nocase?: InputMaybe<Scalars['String']>;
	token1_ends_with?: InputMaybe<Scalars['String']>;
	token1_ends_with_nocase?: InputMaybe<Scalars['String']>;
	token1_gt?: InputMaybe<Scalars['String']>;
	token1_gte?: InputMaybe<Scalars['String']>;
	token1_in?: InputMaybe<Array<Scalars['String']>>;
	token1_lt?: InputMaybe<Scalars['String']>;
	token1_lte?: InputMaybe<Scalars['String']>;
	token1_not?: InputMaybe<Scalars['String']>;
	token1_not_contains?: InputMaybe<Scalars['String']>;
	token1_not_contains_nocase?: InputMaybe<Scalars['String']>;
	token1_not_ends_with?: InputMaybe<Scalars['String']>;
	token1_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	token1_not_in?: InputMaybe<Array<Scalars['String']>>;
	token1_not_starts_with?: InputMaybe<Scalars['String']>;
	token1_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	token1_starts_with?: InputMaybe<Scalars['String']>;
	token1_starts_with_nocase?: InputMaybe<Scalars['String']>;
	totalSwapFee?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapFee_gt?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapFee_gte?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapFee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalSwapFee_lt?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapFee_lte?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapFee_not?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalSwapVolume?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
	totalSwapVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapVolume_not?: InputMaybe<Scalars['BigDecimal']>;
	totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
}

export type TradePair_OrderBy = 'id' | 'token0' | 'token1' | 'totalSwapFee' | 'totalSwapVolume';

export interface _Block_ {
	__typename: '_Block_';
	/** The hash of the block */
	hash?: Maybe<Scalars['Bytes']>;
	/** The block number */
	number: Scalars['Int'];
}

/** The type for the top-level _meta field */
export interface _Meta_ {
	__typename: '_Meta_';
	/**
	 * Information about a specific subgraph block. The hash of the block
	 * will be null if the _meta field has a block constraint that asks for
	 * a block number. It will be filled if the _meta field has no block constraint
	 * and therefore asks for the latest  block
	 *
	 */
	block: _Block_;
	/** The deployment ID */
	deployment: Scalars['String'];
	/** If `true`, the subgraph encountered indexing errors at some past block */
	hasIndexingErrors: Scalars['Boolean'];
}

export type _SubgraphErrorPolicy_ =
	/** Data will be returned even if the subgraph has indexing errors */
	| 'allow'
	/** If the subgraph has indexing errors, data will be omitted. The default. */
	| 'deny';

export type GetPoolsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPoolsQuery = {
	__typename: 'Query';
	allPools: Array<{
		__typename: 'Pool';
		id: string;
		name?: string | null;
		symbol?: string | null;
		address: string;
		poolType?: string | null;
		swapFee: string;
		tokens?: Array<{
			__typename: 'PoolToken';
			id: string;
			name: string;
			address: string;
			symbol: string;
			decimals: number;
			weight?: string | null;
		}> | null;
	}>;
};

export type TokenFragment = {
	__typename: 'PoolToken';
	id: string;
	name: string;
	address: string;
	symbol: string;
	decimals: number;
	weight?: string | null;
};

export type LitePoolFragment = {
	__typename: 'Pool';
	id: string;
	name?: string | null;
	symbol?: string | null;
	address: string;
	poolType?: string | null;
	swapFee: string;
	tokens?: Array<{
		__typename: 'PoolToken';
		id: string;
		name: string;
		address: string;
		symbol: string;
		decimals: number;
		weight?: string | null;
	}> | null;
};

export const TokenFragmentDoc = `
    fragment Token on PoolToken {
  id
  name
  address
  symbol
  decimals
  weight
}
    `;
export const LitePoolFragmentDoc = `
    fragment LitePool on Pool {
  id
  name
  symbol
  address
  poolType
  swapFee
  tokens {
    ...Token
  }
}
    ${TokenFragmentDoc}`;
export const GetPoolsDocument = `
    query GetPools {
  allPools: pools {
    ...LitePool
  }
}
    ${LitePoolFragmentDoc}`;
export const useGetPoolsQuery = <TData = GetPoolsQuery, TError = unknown>(
	dataSource: { endpoint: string; fetchParams?: RequestInit },
	variables?: GetPoolsQueryVariables,
	options?: UseQueryOptions<GetPoolsQuery, TError, TData>
) =>
	useQuery<GetPoolsQuery, TError, TData>(
		variables === undefined ? ['GetPools'] : ['GetPools', variables],
		fetcher<GetPoolsQuery, GetPoolsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetPoolsDocument, variables),
		options
	);
