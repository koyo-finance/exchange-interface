import { getErrorMessage } from '@koyofinance/core-sdk';
import { QuoteData } from '../../public/static/charting/charting_library/charting_library';
import { logMessage, UdfErrorResponse } from './helpers';
import { IQuotesProvider, UdfQuotesResponse } from './IQuotesProvider';
import { Requester } from './Requester';

export class QuotesProvider implements IQuotesProvider {
	private readonly _datafeedUrl: string;
	private readonly _requester: Requester;

	public constructor(datafeedUrl: string, requester: Requester) {
		this._datafeedUrl = datafeedUrl;
		this._requester = requester;
	}

	public getQuotes(symbols: string[]): Promise<QuoteData[]> {
		return new Promise((resolve: (data: QuoteData[]) => void, reject: (reason: string) => void) => {
			this._requester
				.sendRequest<UdfQuotesResponse>(this._datafeedUrl, 'quotes', { symbols })
				.then((response: UdfQuotesResponse | UdfErrorResponse) => {
					if (response.s === 'ok') {
						resolve(response.d);
					} else {
						reject(response.errmsg);
					}
				})
				.catch((error?: string | Error) => {
					const errorMessage = getErrorMessage(error);
					logMessage(`QuotesProvider: getQuotes failed, error=${errorMessage}`);
					// eslint-disable-next-line prefer-promise-reject-errors
					reject(`network error: ${errorMessage}`);
				});
		});
	}
}
