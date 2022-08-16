import { getErrorMessage } from '@koyofinance/core-sdk';
import { QuoteData, QuotesCallback } from '../../public/static/charting/charting_library/charting_library';
import { logMessage } from './helpers';
import { IQuotesProvider } from './IQuotesProvider';

export const enum SymbolsType {
	General,
	Fast
}
export const enum UpdateTimeouts {
	Fast = 10 * 1000,
	General = 60 * 1000
}

export interface QuoteSubscriber {
	symbols: string[];
	fastSymbols: string[];
	listener: QuotesCallback;
}
export interface QuoteSubscribers {
	[listenerId: string]: QuoteSubscriber;
}

export class QuotesPulseProvider {
	private readonly _subscribers: QuoteSubscribers = {};
	private _requestsPending = 0;

	public constructor(private readonly quotesProvider: IQuotesProvider) {
		setInterval(this._updateQuotes.bind(this, SymbolsType.Fast), UpdateTimeouts.Fast);
		setInterval(this._updateQuotes.bind(this, SymbolsType.General), UpdateTimeouts.General);
	}

	public subscribeQuotes(symbols: string[], fastSymbols: string[], onRealtimeCallback: QuotesCallback, listenerGuid: string): void {
		this._subscribers[listenerGuid] = {
			symbols,
			fastSymbols,
			listener: onRealtimeCallback
		};

		logMessage(`QuotesPulseProvider: subscribed quotes with #${listenerGuid}`);
	}

	public unsubscribeQuotes(listenerGuid: string): void {
		delete this._subscribers[listenerGuid];
		logMessage(`QuotesPulseProvider: unsubscribed quotes with #${listenerGuid}`);
	}

	private _updateQuotes(updateType: SymbolsType): void {
		if (this._requestsPending > 0) {
			return;
		}

		// eslint-disable-next-line guard-for-in
		for (const listenerGuid in this._subscribers) {
			this._requestsPending++;

			const subscriptionRecord = this._subscribers[listenerGuid];
			this.quotesProvider
				.getQuotes(updateType === SymbolsType.Fast ? subscriptionRecord.fastSymbols : subscriptionRecord.symbols)
				.then((data: QuoteData[]) => {
					this._requestsPending--;
					if (!this._subscribers.hasOwnProperty(listenerGuid)) {
						return;
					}

					subscriptionRecord.listener(data);
					logMessage(
						`QuotesPulseProvider: data for #${listenerGuid} (${updateType}) updated successfully, pending=${this._requestsPending}`
					);
				})
				.catch((reason?: string | Error) => {
					this._requestsPending--;
					logMessage(
						`QuotesPulseProvider: data for #${listenerGuid} (${updateType}) updated with error=${getErrorMessage(reason)}, pending=${
							this._requestsPending
						}`
					);
				});
		}
	}
}
