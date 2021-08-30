const Token = artifacts.require("Token");

module.exports = async function (deployer) {
  await deployer.deploy(Token, "NFT Game", "NFTG");
  let tokenInstance = await Token.deployed();
  await tokenInstance.mint(100, 200, 100000);
  await tokenInstance.mint(255, 100, 200000);
  let pet = await tokenInstance.getTokenDetails(0);
  //let array = await tokenInstance.getAllTokensForUser('0xf079Ab20A4188de9b29Cd6EC2Dd6e77bA689Af91');
  console.log(pet);
};
