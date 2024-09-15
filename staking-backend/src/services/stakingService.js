import { Web3 } from 'web3';
import Staking from '../models/stakingModel.js';
import { stakingContract } from '../abi/stakingContract.js';

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));
const contract = new web3.eth.Contract(
	stakingContract,
	process.env.CONTRACT_ADDRESS
);

async function listenToEvents() {
	contract.events
		.allEvents()
		.on('data', async (event) => {
			if (event.event === 'Staked') {
				const { user, amount, duration } = event.returnValues;
				const newStake = new Staking({
					user,
					amount: web3.utils.fromWei(amount),
					duration,
					stakingTime: Date.now(),
				});
				await newStake.save();
			}

			if (event.event === 'Unstaked') {
				const { user, amount, penalty, reward } = event.returnValues;
				await Staking.findOneAndUpdate(
					{ user },
					{ withdrawn: true, penalty, reward }
				);
			}
		})
		.on('error', console.error);
}

listenToEvents();
