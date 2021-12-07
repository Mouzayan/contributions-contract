const { expect } = require("chai");
const { ethers } = require("hardhat");
const BN = require('bn.js')
const chai = require('chai')
chai.use(require('chai-bn')(BN));
const { before, beforeEach } = require("mocha");
const { Contract } = require("ethers");
// const { SignerWithAddress } = require("@nomiclabs/hardhat-ethers/signers");

describe('Contribution contract', function () {
  before(async function () {
    const Contribution = await ethers.getContractFactory('Contribution');
    const contribution = await Contribution.deploy(this.name, this.value);
    await contribution.deployed()
  });

  beforeEach(async function () {
    await this.contribution.totalSupply(1000000)
  })

  it('Initial total supply is set to 1000000', async function () {
    expect((await this.contribution.totalSupply()).toString()).to.equal('1000000')
  })
});



// describe("Tyro", () => {
//   it("Should initialize Tyro contract", async () => {
//     const TyroFactory = await ethers.getContractFactory("Tyro");
//     // create an instance of the contract, giving us access to all
//     // functions & variables
//     const tyroContract = await TyroFactory.deploy('1000000');
//     // use the "expect" assertion, and read the totalSupply variable
//     expect(await tyroContract.totalSupply()).to.equal('1000000');
//   });
// });

// describe("Contribution", () => {
//   it("Should initialize Bored Ape contract", async () => {
//     const ContributionFactory = await ethers.getContractFactory("Contribution");
//     // create an instance of the contract, giving us access to all
//     // functions & variables
//     const contributionContract = await ContributionFactory.deploy(
//       "Tyro",
//       "TYR",
//       10000
//     );
//     // use the "expect" assertion, and read the totalSupply variable
//     expect(await contributionContract.totalSupply).to.equal(1000000);
//   });
// });