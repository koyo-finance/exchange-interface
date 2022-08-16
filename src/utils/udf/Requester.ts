import { RequestParams, UdfResponse, UdfErrorResponse, logMessage } from './helpers';

export class Requester {
	public constructor(private readonly headers?: HeadersInit) {}

	public sendRequest<T extends UdfResponse>(datafeedUrl: string, urlPath: string, params?: RequestParams): Promise<T | UdfErrorResponse>;
	public sendRequest<T>(datafeedUrl: string, urlPath: string, params?: RequestParams): Promise<T>;
	public sendRequest<T>(datafeedUrl: string, urlPath: string, params?: RequestParams): Promise<T> {
		if (params !== undefined) {
			const paramKeys = Object.keys(params);
			if (paramKeys.length !== 0) {
				urlPath += '?';
			}

			urlPath += paramKeys
				.map((key: string) => {
					return `${encodeURIComponent(key)}=${encodeURIComponent(params[key].toString())}`;
				})
				.join('&');
		}

		logMessage(`New request: ${urlPath}`);

		// Send user cookies if the URL is on the same origin as the calling script.
		const options: RequestInit = { credentials: 'same-origin' };
		options.headers = this.headers;

		return fetch(`${datafeedUrl}/${urlPath}`, options)
			.then((response: Response) => response.text())
			.then((responseTest: string) => JSON.parse(responseTest));
	}
}
