const { expect } = require("chai");
const { ethers } = require("hardhat");
const BN = require('bn.js')
const chai = require('chai')
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.use(require('chai-bn')(BN));
const { before, beforeEach } = require("mocha");

// const { SignerWithAddress } = require("@nomiclabs/hardhat-ethers/signers");

const address = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
const initialSupply = 1000000

describe('Contribution', function () {
  before(async function () {
    this.Contribution = await ethers.getContractFactory('Contribution')
  });

  beforeEach(async function () {
    this.contribution = await this.Contribution.deploy(address, initialSupply)
    await this.contribution.deployed()
    console.log('Test instance deployed!')
  })

  it('totalSupply supply gets Total Supply', async function () {
    await this.contribution.totalSupply();
    expect((await this.contribution.totalSupply()).toString()).to.equal('1000000000000000000000000');
  });

  // it('rejects token transfer outside of tokenTransferStart', async function () {
  //   let founder = await this.contribution.founder();
  //   expect(await this.contribution.transfer('0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc', '50', { from: founder })).should.be.fulfilled();
  // });
  it('emits Contribute event at contribution', async function () {
    expect(await this.contribution.contribute({ value: '1000' }))
   })
})