const STAKING_CONTRACT_ADDRESS = "0x8b67cf03ed8c4cf716a5760289568461498E8cE8";
const TOKEN_CONTRACT_ADDRESS = "0x68EBc80088002C89fB46fBda7d41dAd3016410B2";
const MULTISIG_ACCOUNT_ADDRESS = "0xF42A2674172614345963551d340B775d72C04DaA";
const MAX_UINT256 =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Calling initialize function with account:", deployer.address);

  const StakingContract = await ethers.getContractFactory("StakingContract");
  const stakingContract = await StakingContract.attach(
    STAKING_CONTRACT_ADDRESS
  );

  const ERC20Token = await ethers.getContractFactory("StakingToken");
  const tokenContract = await ERC20Token.attach(TOKEN_CONTRACT_ADDRESS);

  console.log("Approving staking contract to spend tokens...");
  const approveTx = await tokenContract.approve(
    STAKING_CONTRACT_ADDRESS,
    MAX_UINT256
  );
  await approveTx.wait();

  console.log("Tokens approved. Proceeding to initialize staking contract...");

  const tx = await stakingContract.initialize(
    TOKEN_CONTRACT_ADDRESS,
    MULTISIG_ACCOUNT_ADDRESS
  );
  await tx.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
