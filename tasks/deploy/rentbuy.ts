import { task } from "hardhat/config";
import { getExpectedContractAddress } from "../utils";

import {
  OldtimersRentBuy,
  OldtimersRentBuy__factory,
} from "../../typechain";

task("deploy:RentBuy").setAction(async function (_, { ethers, run }) {

  const tokenFactory: OldtimersRentBuy__factory = await ethers.getContractFactory("OldtimersRentBuy");

  const signerAddress = await tokenFactory.signer.getAddress();
  const signer = await ethers.getSigner(signerAddress);

  const oldtimersrentbuy: OldtimersRentBuy = <OldtimersRentBuy>await tokenFactory.deploy();
  await oldtimersrentbuy.deployed();

  console.log("Oldtimers Rent Buy deployed to: ", {
    oldtimersrentbuy: oldtimersrentbuy.address,
  });

  
});
