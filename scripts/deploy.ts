import { ethers } from "hardhat";

import points from "../args/points.json";

async function main() {
  const airdrop = await ethers.deployContract("Airdrop", ['0x216864D65BBBe2BcFA6B10Eb60cb1820D3DBFaB2']);

  await airdrop.waitForDeployment();

  console.log(
    `Airdrop: `, airdrop.target
  );

  const data = points.map(item => ({ to: item.address, amount: BigInt(item.balance) }))

  for (let i = 0; i < 7; i++) {
    await (await airdrop.setAirdropData(data.slice(i * 500, (i + 1) * 500))).wait()
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
