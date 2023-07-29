const main = async () => {
  const [owner, addr1] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();
  console.log("Contract deploy to:", waveContract.address);

  const contractBalance1 = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance1)
  );

  await waveContract.setPrizeAmount(hre.ethers.utils.parseEther("0.0003"));

  await waveContract.getTotalWaves();

  const waveTxn1 = await waveContract.wave("This is wave #1");
  await waveTxn1.wait();

  const waveTxn2 = await waveContract.connect(addr1).wave("This is wave #2");
  await waveTxn2.wait();

  await waveContract
    .connect(owner)
    .deposit({ value: ethers.utils.parseEther("1") });

  await owner.sendTransaction({
    to: waveContract.address,
    value: ethers.utils.parseEther("1"),
  });

  const contractBalance2 = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance2)
  );

  const allWaves = await waveContract.getAllWaves();
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
