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
			const decimals = 18n;
			const { user, amount, duration } = event.returnValues;
			console.log('Staking details:', user, amount, duration);
			const newStake = new Staking({
				user,
				amount: Number(Number(amount) / Number(10) ** Number(decimals)),
				duration: Number(duration),
				stakingTime: Date.now(),
			});
			await newStake.save();
		});

		unstakedEventSubscription.on('data', async (event) => {
			const { user, amount, penalty, reward } = event.returnValues;
			console.log('Unstaking details:', user, amount, penalty, reward);
			await Staking.findOneAndUpdate(
				{ user },
				{ withdrawn: true, penalty: Number(penalty), reward: Number(reward) }
			);
		});

		stakedEventSubscription.on('error', (error) => {
			console.log(`error: ${error}`);
		});

		unstakedEventSubscription.on('error', (error) => {
			console.log(`error: ${error}`);
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
		console.log(`Closed webSocket connection`, error);
		// eslint-disable-next-line no-process-exit
		process.exit(0);
	});
}

listenToEvents();
