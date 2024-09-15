const STAKING_CONTRACT_ADDRESS = "0x38f8ab969ABd357748aa06537eb7256B56D89201";
const TOKEN_CONTRACT_ADDRESS = "0x563a1c0B793413dd08d920515fAD736fd76B98D8";
const MULTISIG_ACCOUNT_ADDRESS = "0xF42A2674172614345963551d340B775d72C04DaA";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Calling initialize function with account:", deployer.address);

  const StakingContract = await ethers.getContractFactory("StakingContract");
  const stakingContract = await StakingContract.attach(
    STAKING_CONTRACT_ADDRESS
  );

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
