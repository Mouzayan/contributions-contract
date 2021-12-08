const hre = require("hardhat");

async function main() {
  const Contribution = await hre.ethers.getContractFactory("Contribution");
  console.log('Deploying contribution...')
  const contribution = await Contribution.deploy('0x15d34aaf54267db7d7c367839aaf71a00a2c6a65', '1000000');
  await contribution.deployed();
  console.log("Contribution deployed to:", contribution.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
