import { QuoteData } from '../../public/static/charting/charting_library/charting_library';
import { UdfOkResponse } from './helpers';

export interface UdfQuotesResponse extends UdfOkResponse {
	d: QuoteData[];
}

export interface IQuotesProvider {
	getQuotes(symbols: string[]): Promise<QuoteData[]>;
}
