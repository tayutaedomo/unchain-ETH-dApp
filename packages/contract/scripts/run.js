const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  const wavePortal = await waveContract.deployed();
  console.log("Contract deploy to:", wavePortal.address);

  const contractBalance1 = await hre.ethers.provider.getBalance(
    wavePortal.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance1)
  );

  await wavePortal.getTotalWaves();

  const waveTxn1 = await wavePortal.wave("A message!");
  await waveTxn1.wait();

  const contractBalance2 = await hre.ethers.provider.getBalance(
    wavePortal.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance2)
  );

  [_, randomPerson] = await hre.ethers.getSigners();
  const waveTxn2 = await wavePortal
    .connect(randomPerson)
    .wave("Another message!");
  await waveTxn2.wait();

  const allWaves = await wavePortal.getAllWaves();
  console.log(allWaves);
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
