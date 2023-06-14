import { ethers } from "hardhat";

const main = async () => {
  const signers = await ethers.getSigners();
  console.log(signers.length);

  const Token = await ethers.getContractFactory("MockUSDT");
  const token0 = await Token.deploy('Tether USD', 'USDT', ethers.utils.parseUnits('10000000', 18));
  await token0.deployed();
  console.log("usdt:", token0.address);

  const WBNB = await ethers.getContractFactory("WBNB");
  const wbnb = await WBNB.deploy();
  await wbnb.deployed();
  console.log("wbnb:", wbnb.address);

  const PancakeFactory = await ethers.getContractFactory("PancakeFactory");
  const pancakeFactory = await PancakeFactory.deploy(signers[0].address);
  await pancakeFactory.deployed();
  console.log("pancakeFactory:", pancakeFactory.address);

  const PancakeRouter = await ethers.getContractFactory("PancakeRouter");
  const pancakeRouter = await PancakeRouter.deploy(pancakeFactory.address, wbnb.address);
  await pancakeRouter.deployed();
  console.log("pancakeRouter:", pancakeRouter.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
