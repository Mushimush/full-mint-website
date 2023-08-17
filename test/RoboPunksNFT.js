const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RoboPunksNFT", function () {
  let robopunksNFT;
  let owner;
  let user;

  beforeEach(async function () {
    const RoboPunksNFT = await ethers.getContractFactory("RoboPunksNFT");
    robopunksNFT = await RoboPunksNFT.deploy();
    await robopunksNFT.waitForDeployment();

    [owner, user] = await ethers.getSigners();
  });

  it("should deploy the contract correctly", async function () {
    expect(await robopunksNFT.name()).to.equal("RoboPunks");
    expect(await robopunksNFT.symbol()).to.equal("RP");
    expect(await robopunksNFT.mintPrice()).to.equal(ethers.parseEther("0.02"));
    expect(await robopunksNFT.totalSupply()).to.equal(0);
    expect(await robopunksNFT.maxSupply()).to.equal(1000);
    expect(await robopunksNFT.maxPerWallet()).to.equal(3);
    expect(await robopunksNFT.isPublicMintEnabled()).to.equal(false);
  });

  it("should allow the owner to enable public minting", async function () {
    await robopunksNFT.setIsPublicMintEnabled(true);
    expect(await robopunksNFT.isPublicMintEnabled()).to.equal(true);
  });

  it("should not allow minting when public minting is disabled", async function () {
    await expect(
      robopunksNFT.connect(user).mint(1, { value: ethers.parseEther("0.02") })
    ).to.be.revertedWith("minting not enabled");
  });

  // Add more test cases as needed
});
