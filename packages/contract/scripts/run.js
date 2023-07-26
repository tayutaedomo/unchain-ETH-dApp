const main = async () => {
  [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  const wavePortal = await waveContract.deployed();

  console.log("Contract deploy to:", wavePortal.address);
  console.log("Contract deploy by:", owner.address);

  await wavePortal.getTotalWaves();

  const waveTxn1 = await wavePortal.wave();
  await waveTxn1.wait();

  await wavePortal.getTotalWaves();

  const waveTxn2 = await wavePortal.connect(randomPerson).wave();
  await waveTxn2.wait();

  await wavePortal.getTotalWaves();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
