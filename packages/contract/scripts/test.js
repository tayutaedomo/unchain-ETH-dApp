const hre = require("hardhat");
const { expect } = require("chai");

describe("Wave Contract", function () {
  it("test if wave and token are sent", async function () {
    const waveContractFactory = await hre.ethers.getContractFactory(
      "WavePortal"
    );
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();

    const contractBalanceBefore = hre.ethers.utils.formatEther(
      await hre.ethers.provider.getBalance(waveContract.address)
    );

    const waveTxn = await waveContract.wave("This is wave #1");
    await waveTxn.wait();
    // const waveTxn2 = await waveContract.wave("This is wave #2");
    // await waveTxn2.wait();
    await expect(waveContract.wave("This is wave #2")).to.be.revertedWith(
      "Wait 15m"
    );

    const contractBalanceAfter = hre.ethers.utils.formatEther(
      await hre.ethers.provider.getBalance(waveContract.address)
    );

    const allWaves = await waveContract.getAllWaves();
    // let cost = 0;
    // for (let i = 0; i < allWaves.length; i++) {
    //   console.log("Seed:", allWaves[i].seed);
    //   if (allWaves[i].seed <= 50) {
    //     cost += 0.0001;
    //   }
    // }

    expect(allWaves[0].message).to.equal("This is wave #1");
    // expect(allWaves[1].message).to.equal("This is wave #2");

    // expect(parseFloat(contractBalanceAfter)).to.equal(
    //   contractBalanceBefore - cost
    // );
  });
});
