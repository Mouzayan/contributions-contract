const hre = require("hardhat");

async function main() {
  const Contribution = await hre.ethers.getContractFactory("Contribution");
  const contribution = await Contribution.deploy('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', '1000000');

  await contribution.deployed();

  console.log("Contribution deployed to:", contribution.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
