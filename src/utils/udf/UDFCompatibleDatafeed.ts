import { UDFCompatibleDatafeedBase } from './UDFCompatibleDatafeedBase';
import { QuotesProvider } from './QuotesProvider';
import { Requester } from './Requester';

export class UDFCompatibleDatafeed extends UDFCompatibleDatafeedBase {
	public constructor(datafeedURL: string, updateFrequency: number = 10 * 1000) {
		const requester = new Requester();
		const quotesProvider = new QuotesProvider(datafeedURL, requester);

		super(datafeedURL, quotesProvider, requester, updateFrequency);
	}
}
