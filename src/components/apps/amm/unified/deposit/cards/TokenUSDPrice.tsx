import { BigNumber } from 'ethers';
import React from 'react';

export interface TokenUSDPriceProps {
	amount: BigNumber;
}

const TokenUSDPrice: React.FC<TokenUSDPriceProps> = () => {
	// const [tokenPrice, setTokenPrice] = useState(0);

	// const priceService = jpex.resolve<TokenPriceService>();

	// useEffect(() => {
	// 	const fetchETHPrice = async () => {
	// 		const req = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd', {
	// 			method: 'GET',
	// 			headers: {
	// 				'Content-type': 'application/json'
	// 			}
	// 		});

	// 		const data = await req.json();
	// 		const usdPrice = data.ethereum.usd;

	// 		const priceInETH = priceService.getNativeAssetPriceInToken(token.address);
	// 		const tokenPriceInETH = await priceInETH.then((data) => Number(data));

	// 		const tokenAmount = fromBigNumber(amount, token.decimals);

	// 		const tokenPriceInUSD = (tokenPriceInETH / (await usdPrice)) * tokenAmount;
	// 		console.log(tokenPriceInUSD);
	// 	};

	// 	fetchETHPrice();
	// }, [token]);

	return <div>TokenUSDPrice</div>;
};

export default TokenUSDPrice;
