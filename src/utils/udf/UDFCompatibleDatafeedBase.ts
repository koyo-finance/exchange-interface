import { getErrorMessage } from '@koyofinance/core-sdk';
import {
	DatafeedConfiguration,
	ErrorCallback,
	GetMarksCallback,
	HistoryCallback,
	IDatafeedChartApi,
	IDatafeedQuotesApi,
	IExternalDatafeed,
	LibrarySymbolInfo,
	Mark,
	OnReadyCallback,
	QuotesCallback,
	ResolutionString,
	ResolveCallback,
	SearchSymbolResultItem,
	SearchSymbolsCallback,
	ServerTimeCallback,
	SubscribeBarsCallback,
	SymbolResolveExtension,
	TimescaleMark
} from '../../public/static/charting/charting_library/charting_library';
import { DataPulseProvider } from './DataPulseProvider';
import { logMessage, RequestParams, UdfErrorResponse } from './helpers';
import { GetBarsResult, HistoryProvider, PeriodParamsWithOptionalCountback } from './HistoryProvider';
import { IQuotesProvider } from './IQuotesProvider';
import { QuotesPulseProvider } from './QuotesPulseProvider';
import { Requester } from './Requester';
import { SymbolsStorage } from './SymbolsStorage';

export const enum Constants {
	SearchItemsLimit = 30
}

export interface UdfCompatibleConfiguration extends DatafeedConfiguration {
	// tslint:disable:tv-variable-name
	supports_search?: boolean;
	supports_group_request?: boolean;
	// tslint:enable:tv-variable-name
}

export interface ResolveSymbolResponse extends LibrarySymbolInfo {
	s: undefined;
}

// it is hack to let's TypeScript make code flow analysis
export interface UdfSearchSymbolsResponse extends Array<SearchSymbolResultItem> {
	s?: undefined;
}

export type UdfDatafeedMarkType<T extends TimescaleMark | Mark> = {
	[K in keyof T]: T[K] | T[K][];
} & {
	id: (string | number)[];
};

export type UdfDatafeedMark = UdfDatafeedMarkType<Mark>;
export type UdfDatafeedTimescaleMark = UdfDatafeedMarkType<TimescaleMark>;

export function extractField<Field extends keyof Mark>(data: UdfDatafeedMark, field: Field, arrayIndex: number): Mark[Field];
export function extractField<Field extends keyof TimescaleMark>(
	data: UdfDatafeedTimescaleMark,
	field: Field,
	arrayIndex: number
): TimescaleMark[Field];
export function extractField<T, TField extends keyof T>(data: T, field: TField, arrayIndex: number): T[TField] {
	const value = data[field];
	return Array.isArray(value) ? value[arrayIndex] : value;
}

/**
 * This class implements interaction with UDF-compatible datafeed.
 * See UDF protocol reference at https://github.com/tradingview/charting_library/wiki/UDF
 */
export class UDFCompatibleDatafeedBase implements IExternalDatafeed, IDatafeedQuotesApi, IDatafeedChartApi {
	private readonly datafeedURL: string;
	private _configuration: UdfCompatibleConfiguration = defaultConfiguration();
	private readonly _configurationReadyPromise: Promise<void>;

	private readonly requester: Requester;

	private _symbolsStorage: SymbolsStorage | null = null;

	private readonly _historyProvider: HistoryProvider;
	private readonly _dataPulseProvider: DataPulseProvider;
	private readonly quotesProvider: IQuotesProvider;
	private readonly _quotesPulseProvider: QuotesPulseProvider;

	public constructor(datafeedURL: string, quotesProvider: IQuotesProvider, requester: Requester, updateFrequency: number = 10 * 1000) {
		this.datafeedURL = datafeedURL;
		this.quotesProvider = quotesProvider;
		this.requester = requester;

		this._historyProvider = new HistoryProvider(this.datafeedURL, this.requester);

		this._dataPulseProvider = new DataPulseProvider(this._historyProvider, updateFrequency);
		this._quotesPulseProvider = new QuotesPulseProvider(this.quotesProvider);

		this._configurationReadyPromise = this._requestConfiguration().then((configuration: UdfCompatibleConfiguration | null) => {
			if (configuration === null) {
				configuration = defaultConfiguration();
			}

			this._setupWithConfiguration(configuration);
		});
	}

	public onReady(callback: OnReadyCallback): void {
		void this._configurationReadyPromise.then(() => {
			callback(this._configuration);
		});
	}

	public getQuotes(symbols: string[], onDataCallback: QuotesCallback, onErrorCallback: (msg: string) => void): void {
		this.quotesProvider.getQuotes(symbols).then(onDataCallback).catch(onErrorCallback);
	}

	public subscribeQuotes(symbols: string[], fastSymbols: string[], onRealtimeCallback: QuotesCallback, listenerGuid: string): void {
		this._quotesPulseProvider.subscribeQuotes(symbols, fastSymbols, onRealtimeCallback, listenerGuid);
	}

	public unsubscribeQuotes(listenerGuid: string): void {
		this._quotesPulseProvider.unsubscribeQuotes(listenerGuid);
	}

	public getMarks(
		symbolInfo: LibrarySymbolInfo,
		from: number,
		to: number,
		onDataCallback: GetMarksCallback<Mark>,
		resolution: ResolutionString
	): void {
		if (!this._configuration.supports_marks) {
			return;
		}

		const requestParams: RequestParams = {
			symbol: symbolInfo.ticker || '',
			from,
			to,
			resolution
		};

		this._send<Mark[] | UdfDatafeedMark>('marks', requestParams)
			.then((response: Mark[] | UdfDatafeedMark) => {
				if (!Array.isArray(response)) {
					const result: Mark[] = [];
					for (let i = 0; i < response.id.length; ++i) {
						result.push({
							id: extractField(response, 'id', i),
							time: extractField(response, 'time', i),
							color: extractField(response, 'color', i),
							text: extractField(response, 'text', i),
							label: extractField(response, 'label', i),
							labelFontColor: extractField(response, 'labelFontColor', i),
							minSize: extractField(response, 'minSize', i)
						});
					}

					response = result;
				}

				onDataCallback(response);
			})
			.catch((error?: string | Error) => {
				logMessage(`UdfCompatibleDatafeed: Request marks failed: ${getErrorMessage(error)}`);
				onDataCallback([]);
			});
	}

	public getTimescaleMarks(
		symbolInfo: LibrarySymbolInfo,
		from: number,
		to: number,
		onDataCallback: GetMarksCallback<TimescaleMark>,
		resolution: ResolutionString
	): void {
		if (!this._configuration.supports_timescale_marks) {
			return;
		}

		const requestParams: RequestParams = {
			symbol: symbolInfo.ticker || '',
			from,
			to,
			resolution
		};

		this._send<TimescaleMark[] | UdfDatafeedTimescaleMark>('timescale_marks', requestParams)
			.then((response: TimescaleMark[] | UdfDatafeedTimescaleMark) => {
				if (!Array.isArray(response)) {
					const result: TimescaleMark[] = [];
					for (let i = 0; i < response.id.length; ++i) {
						result.push({
							id: extractField(response, 'id', i),
							time: extractField(response, 'time', i),
							color: extractField(response, 'color', i),
							label: extractField(response, 'label', i),
							tooltip: extractField(response, 'tooltip', i)
						});
					}

					response = result;
				}

				onDataCallback(response);
			})
			.catch((error?: string | Error) => {
				logMessage(`UdfCompatibleDatafeed: Request timescale marks failed: ${getErrorMessage(error)}`);
				onDataCallback([]);
			});
	}

	public getServerTime(callback: ServerTimeCallback): void {
		if (!this._configuration.supports_time) {
			return;
		}

		this._send<string>('time')
			.then((response: string) => {
				const time = parseInt(response, 10);
				if (!isNaN(time)) {
					callback(time);
				}
			})
			.catch((error?: string | Error) => {
				logMessage(`UdfCompatibleDatafeed: Fail to load server time, error=${getErrorMessage(error)}`);
			});
	}

	public searchSymbols(userInput: string, exchange: string, symbolType: string, onResult: SearchSymbolsCallback): void {
		if (this._configuration.supports_search) {
			const params: RequestParams = {
				limit: Constants.SearchItemsLimit,
				query: userInput.toUpperCase(),
				type: symbolType,
				exchange
			};

			this._send<UdfSearchSymbolsResponse | UdfErrorResponse>('search', params)
				.then((response: UdfSearchSymbolsResponse | UdfErrorResponse) => {
					if (response.s !== undefined) {
						logMessage(`UdfCompatibleDatafeed: search symbols error=${response.errmsg}`);
						onResult([]);
						return;
					}

					onResult(response);
				})
				.catch((reason?: string | Error) => {
					logMessage(`UdfCompatibleDatafeed: Search symbols for '${userInput}' failed. Error=${getErrorMessage(reason)}`);
					onResult([]);
				});
		} else {
			if (this._symbolsStorage === null) {
				throw new Error('UdfCompatibleDatafeed: inconsistent configuration (symbols storage)');
			}

			this._symbolsStorage
				.searchSymbols(userInput, exchange, symbolType, Constants.SearchItemsLimit)
				.then(onResult)
				.catch(onResult.bind(null, []));
		}
	}

	public resolveSymbol(symbolName: string, onResolve: ResolveCallback, onError: ErrorCallback, extension?: SymbolResolveExtension): void {
		logMessage('Resolve requested');

		const currencyCode = extension && extension.currencyCode;
		const unitId = extension && extension.unitId;

		const resolveRequestStartTime = Date.now();
		function onResultReady(symbolInfo: LibrarySymbolInfo): void {
			logMessage(`Symbol resolved: ${Date.now() - resolveRequestStartTime}ms`);
			onResolve(symbolInfo);
		}

		if (this._configuration.supports_group_request) {
			if (this._symbolsStorage === null) {
				throw new Error('UdfCompatibleDatafeed: inconsistent configuration (symbols storage)');
			}

			this._symbolsStorage.resolveSymbol(symbolName, currencyCode, unitId).then(onResultReady).catch(onError);
		} else {
			const params: RequestParams = {
				symbol: symbolName
			};
			if (currencyCode !== undefined) {
				params.currencyCode = currencyCode;
			}
			if (unitId !== undefined) {
				params.unitId = unitId;
			}

			this._send<ResolveSymbolResponse | UdfErrorResponse>('symbols', params)
				.then((response: ResolveSymbolResponse | UdfErrorResponse) => {
					if (response.s === undefined) {
						onResultReady(response);
					} else {
						onError('unknown_symbol');
					}
				})
				.catch((reason?: string | Error) => {
					logMessage(`UdfCompatibleDatafeed: Error resolving symbol: ${getErrorMessage(reason)}`);
					onError('unknown_symbol');
				});
		}
	}

	public getBars(
		symbolInfo: LibrarySymbolInfo,
		resolution: ResolutionString,
		periodParams: PeriodParamsWithOptionalCountback,
		onResult: HistoryCallback,
		onError: ErrorCallback
	): void {
		this._historyProvider
			.getBars(symbolInfo, resolution, periodParams)
			.then((result: GetBarsResult) => {
				onResult(result.bars, result.meta);
			})
			.catch(onError);
	}

	public subscribeBars(symbolInfo: LibrarySymbolInfo, resolution: ResolutionString, onTick: SubscribeBarsCallback, listenerGuid: string): void {
		this._dataPulseProvider.subscribeBars(symbolInfo, resolution, onTick, listenerGuid);
	}

	public unsubscribeBars(listenerGuid: string): void {
		this._dataPulseProvider.unsubscribeBars(listenerGuid);
	}

	protected _requestConfiguration(): Promise<UdfCompatibleConfiguration | null> {
		return this._send<UdfCompatibleConfiguration>('config').catch((reason?: string | Error) => {
			logMessage(`UdfCompatibleDatafeed: Cannot get datafeed configuration - use default, error=${getErrorMessage(reason)}`);
			return null;
		});
	}

	private _send<T>(urlPath: string, params?: RequestParams): Promise<T> {
		console.log(this.requester);
		return this.requester.sendRequest<T>(this.datafeedURL, urlPath, params);
	}

	private _setupWithConfiguration(configurationData: UdfCompatibleConfiguration): void {
		this._configuration = configurationData;

		if (configurationData.exchanges === undefined) {
			configurationData.exchanges = [];
		}

		if (!configurationData.supports_search && !configurationData.supports_group_request) {
			throw new Error('Unsupported datafeed configuration. Must either support search, or support group request');
		}

		if (configurationData.supports_group_request || !configurationData.supports_search) {
			this._symbolsStorage = new SymbolsStorage(this.datafeedURL, configurationData.supported_resolutions || [], this.requester);
		}

		logMessage(`UdfCompatibleDatafeed: Initialized with ${JSON.stringify(configurationData)}`);
	}
}

function defaultConfiguration(): UdfCompatibleConfiguration {
	return {
		supports_search: false,
		supports_group_request: true,
		supported_resolutions: [
			'1' as ResolutionString,
			'5' as ResolutionString,
			'15' as ResolutionString,
			'30' as ResolutionString,
			'60' as ResolutionString,
			'1D' as ResolutionString,
			'1W' as ResolutionString,
			'1M' as ResolutionString
		],
		supports_marks: false,
		supports_timescale_marks: false
	};
}
