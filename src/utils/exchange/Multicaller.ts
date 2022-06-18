import { Fragment, Interface, JsonFragment, Result } from '@ethersproject/abi';
import { Provider } from '@ethersproject/providers';
import set from 'lodash.set';
import { Multicall1__factory } from 'types/contracts/util';

export class Multicaller {
	public options: Record<string, unknown> = {};

	private multiAddress: string;
	private provider: Provider;
	private interface: Interface;
	private calls: [string, string, any][] = [];
	private paths: string[] = [];

	public constructor(multiAddress: string, provider: Provider, abi: string | Array<Fragment | JsonFragment | string>, options = {}) {
		this.multiAddress = multiAddress;
		this.provider = provider;
		this.interface = new Interface(abi);
		this.options = options;
	}

	public call(path: string, address: string, functionName: string, params?: any[]): Multicaller {
		this.calls.push([address, functionName, params]);
		this.paths.push(path);
		return this;
	}

	public async execute(from: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
		const obj = from;
		const results = await this.executeMulticall();
		results.forEach((result, i) => set(obj, this.paths[i], result.length > 1 ? result : result[0]));
		this.calls = [];
		this.paths = [];
		return obj;
	}

	private async executeMulticall(): Promise<Result[]> {
		const multi = Multicall1__factory.connect(this.multiAddress, this.provider);

		const [, res] = await multi.aggregate(
			this.calls.map(([address, functionName, params]) => ({
				target: address,
				callData: this.interface.encodeFunctionData(functionName, params)
			})),
			this.options
		);

		return res.map((result, i) => this.interface.decodeFunctionResult(this.calls[i][1], result));
	}
}
