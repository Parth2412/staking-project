import mongoose from 'mongoose';

const stakingSchema = new mongoose.Schema({
	user: { type: String, required: true },
	amount: { type: Number, required: true },
	duration: { type: Number, required: true },
	stakingTime: { type: Date, required: true },
	withdrawn: { type: Boolean, default: false },
	penalty: { type: Number, default: 0 },
	reward: { type: Number, default: 0 },
});

const stakingModel = mongoose.model('Staking', stakingSchema);

export default stakingModel;
