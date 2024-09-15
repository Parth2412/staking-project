async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const StakingContract = await ethers.getContractFactory("StakingContract");
  const deployStakingContract = await StakingContract.deploy();

  console.log("Staking Contract deployed at:", deployStakingContract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
