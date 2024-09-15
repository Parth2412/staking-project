const STAKING_CONTRACT_ADDRESS = "0x8b67cf03ed8c4cf716a5760289568461498E8cE8";
const TOKEN_CONTRACT_ADDRESS = "0x68EBc80088002C89fB46fBda7d41dAd3016410B2";
const MAX_UINT256 =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

async function main() {
  const [user] = await ethers.getSigners();

  console.log("Calling stake function with account:", user.address);

  const ERC20Token = await ethers.getContractFactory("StakingToken");
  const tokenContract = await ERC20Token.attach(TOKEN_CONTRACT_ADDRESS);

  const StakingContract = await ethers.getContractFactory("StakingContract");
  const stakingContract = await StakingContract.attach(
    STAKING_CONTRACT_ADDRESS
  );

  console.log("Approving staking contract to spend tokens...");
  const approveTx = await tokenContract.approve(
    STAKING_CONTRACT_ADDRESS,
    MAX_UINT256
  );
  await approveTx.wait();

  console.log("Tokens approved. Proceeding to stake...");

  const stakeTx = await stakingContract.stake("10000000000000000000", "1");
  await stakeTx.wait();
  console.log(`Staked...`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
