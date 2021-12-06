const hre = require("hardhat");

async function main() {
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, World!");

  const Contribution = await hre.ethers.getContractFactory("Contribution");
  const contribution = await Contribution.deploy("Hello, Let's Contribute!");


  await greeter.deployed();
  await contribution.deployed();

  console.log("Greeter deployed to:", greeter.address);
  console.log("Contribution deployed to:", contribution.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
