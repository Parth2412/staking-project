const STAKING_CONTRACT_ADDRESS = "0x8b67cf03ed8c4cf716a5760289568461498E8cE8";
const TOKEN_CONTRACT_ADDRESS = "0x68EBc80088002C89fB46fBda7d41dAd3016410B2";

async function main() {
  const [user] = await ethers.getSigners();

  console.log("Calling unstake function with account:", user.address);

  const StakingContract = await ethers.getContractFactory("StakingContract");
  const stakingContract = await StakingContract.attach(
    STAKING_CONTRACT_ADDRESS
  );

  const unstakeTx = await stakingContract.unstake();
  await unstakeTx.wait();
  console.log(`Unstaked...`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
