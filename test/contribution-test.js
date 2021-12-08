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
    const address = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
    const Contribution = await ethers.getContractFactory('Contribution');
    // const contribution = await Contribution.attach(address);
    const contribution = await Contribution.deploy(address, '1000000');
    await contribution.deployed();
  });

  beforeEach(async function () {
    let result = await this.contribution.totalSupply()
    console.log(result)
  })

  it('Initial total supply is set to 1000000', async function () {
    expect((await contribution.totalSupply()).toString()).to.equal('1000000')
  })
});



