async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const StakingToken = await ethers.getContractFactory("StakingToken");
  const deployStakingToken = await StakingToken.deploy();

  console.log(
    "Staking Token(STK) Contract deployed at:",
    deployStakingToken.target
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
