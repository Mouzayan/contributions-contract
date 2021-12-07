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
    const contribution = await Contribution.deploy('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', '1000000');
    await contribution.deployed()
  });

  beforeEach(async function () {
    let result = await this.contribution.totalSupply()
    console.log(result)
  })

  it('Initial total supply is set to 1000000', async function () {
    expect((await this.contribution.totalSupply()).toString()).to.equal('1000000')
  })
});



