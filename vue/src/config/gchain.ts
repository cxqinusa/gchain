const gchain = {
	chainId: "gchain",
	chainName: "gchain-cosmos",
	rpc: "http://127.0.0.1:26657",
	rest: "http://127.0.0.1:1317",
	stakeCurrency: {
		coinDenom: "CGT",
		coinMinimalDenom: "ucgt",
		coinDecimals: 6,
	},
	bip44: {
		coinType: 118,
	},
	bech32Config: {
		bech32PrefixAccAddr: "cgt",
		bech32PrefixAccPub: "cgtpub",
		bech32PrefixValAddr: "cgtvaloper",
		bech32PrefixValPub: "cgtvaloperpub",
		bech32PrefixConsAddr: "cgtvalcons",
		bech32PrefixConsPub: "cgtvalconspub",
	},
	currencies: [
		{
			coinDenom: "CGT",
			coinDecimals: 6,
			coinMinimalDenom: "ucgt",
		},
	],
	feeCurrencies: [
		{
			coinDenom: "CGT",
			coinMinimalDenom: "ucgt",
			coinDecimals: 6,
		},
	],
	gasPriceStep: {
		low: 0.01,
		average: 0.025,
		high: 0.04,
	},
};

export default gchain;
