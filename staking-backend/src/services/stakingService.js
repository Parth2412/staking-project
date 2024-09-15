import { Web3, WebSocketProvider } from 'web3';
import config from '../config/config.js';
import Staking from '../models/stakingModel.js';
import { stakingContract } from '../abi/stakingContract.js';

async function listenToEvents() {
	const provider = new WebSocketProvider(
		`${config.amoyWebsocketUrl}`,
		{},
		{
			autoReconnect: true,
			delay: 5000,
			maxAttempts: 10,
		}
	);

	provider.on('connect', async () => {
		console.log(
			`Connected to websocket provider for Staking smart contract event`
		);

		const web3 = new Web3(provider);
		const ContractInstance = new web3.eth.Contract(
			stakingContract.abi,
			config.contractAddress
		);

		// Initializing contract instances for "Staked" and "Unstaked" event.
		const stakedEventSubscription = ContractInstance.events.Staked({
			fromBlock: 'latest',
		});

		const unstakedEventSubscription = ContractInstance.events.Unstaked({
			fromBlock: 'latest',
		});

		stakedEventSubscription.on('connected', (stakedEventSubscriptionId) => {
			console.log(
				`SubID for Staking Smart Contract Event(Staked): ${stakedEventSubscriptionId}`
			);
		});

		unstakedEventSubscription.on('connected', (unstakedEventSubscriptionId) => {
			console.log(
				`SubID for Staking Smart Contract Event(Unstaked): ${unstakedEventSubscriptionId}`
			);
		});

		stakedEventSubscription.on('data', async (event) => {
			console.log(`Staked event data: ${event.topics[0]}`);
			if (event.topics.length === 1) {
				const getStakedEventData = web3.eth.abi.decodeLog(
					[
						{
							indexed: true,
							internalType: 'address',
							name: 'user',
							type: 'address',
						},
						{
							indexed: false,
							internalType: 'uint256',
							name: 'amount',
							type: 'uint256',
						},
						{
							indexed: false,
							internalType: 'uint256',
							name: 'duration',
							type: 'uint256',
						},
					],
					event.data,
					event.topics[0]
				);
				const { user, amount, duration } = getStakedEventData;
				console.log(user, amount, duration);
			}
		});

		unstakedEventSubscription.on('data', async (event) => {
			console.log(`Unstaked event data: ${event.topics[0]}`);
			if (event.topics.length === 1) {
				const getUnstakedEventData = web3.eth.abi.decodeLog(
					[
						{
							indexed: true,
							internalType: 'address',
							name: 'user',
							type: 'address',
						},
						{
							indexed: false,
							internalType: 'uint256',
							name: 'amount',
							type: 'uint256',
						},
						{
							indexed: false,
							internalType: 'bool',
							name: 'early',
							type: 'bool',
						},
						{
							indexed: false,
							internalType: 'uint256',
							name: 'penalty',
							type: 'uint256',
						},
					],
					event.data,
					event.topics[0]
				);
				const { user, amount, penalty, reward } = getUnstakedEventData;
				console.log(user, amount, penalty, reward);
			}
		});

		stakedEventSubscription.on('error', (error) => {
			logger.error(`error: ${error}`);
		});

		unstakedEventSubscription.on('error', (error) => {
			logger.error(`error: ${error}`);
		});
	});

	provider.on('error', (error) => {
		console.error('WebSocket error occurred:', error);
		console.log('Terminating server due to WebSocket error...');
		// eslint-disable-next-line no-process-exit
		process.exit(1);
	});

	provider.on('close', () => {
		console.log('WebSocket connection closed');
		console.log('Terminating server due to WebSocket connection close...');
		// eslint-disable-next-line no-process-exit
		process.exit(0);
	});

	provider.on('end', () => {
		console.log('WebSocket connection ended');
		// eslint-disable-next-line no-process-exit
		process.exit(0);
	});

	provider.on('disconnect', (error) => {
		logger.error(`Closed webSocket connection`, error);
		// eslint-disable-next-line no-process-exit
		process.exit(0);
	});
}

listenToEvents();
