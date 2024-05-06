const { expect } = require("chai")

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether')
}

describe("ETHDaddy", () => {
  let ethDaddy
  let deployer, owner1

  const NAME = "ETH Daddy"
  const SYMBOL = "ETHD"

  beforeEach(async () => {
    [deployer, owner1] = await ethers.getSigners()

    const ETHDaddy = await ethers.getContractFactory("ETHDaddy")
    ethDaddy = await ETHDaddy.deploy(NAME, SYMBOL);

    const transaction = await ethDaddy.connect(deployer).list("samirbenbouker.eth", tokens(10))
    await transaction.wait()
  })

  describe("Deployment", () => {
    it("Sets the name", async () => {
      const result = await ethDaddy.name()
      expect(result).to.equal(NAME)
    })

    it("Sets the symbol", async () => {
      const result = await ethDaddy.symbol()
      expect(result).to.equal(SYMBOL)
    })

    it("Sets the owner", async () => {
      const result = await ethDaddy.owner()
      expect(result).to.equal(deployer.address)
    })

    it("Returns the max supply", async () => {
      const result = await ethDaddy.maxSupply()
      expect(result).to.equal(1)
    })

    it("Returns the max supply", async () => {
      const result = await ethDaddy.totalSupply()
      expect(result).to.equal(0)
    })
  })

  describe("Domain", () => {
    it("Returns domain attributes", async () => {
      const result = await ethDaddy.domains(1)

      expect(result.name).to.equal("samirbenbouker.eth")
      expect(result.cost).to.equal(tokens(10))
      expect(result.isOwned).to.equal(false)
    })
  })

  describe("Minting", () => {
    const ID = 1
    const AMOUNT = ethers.parseUnits("10", "ether")

    beforeEach(async () => {
      const transaction = await ethDaddy.connect(owner1).mint(ID, { value: AMOUNT })
      await transaction.wait()
    })

    it("Updates the owner", async () => {
      const owner = await ethDaddy.ownerOf(ID)
      expect(owner).to.be.equal(owner1.address)
    })

    it("Updates the domain status", async () => {
      const domain = await ethDaddy.domains(ID)
      expect(domain.isOwned).to.be.equal(true)
    })

    it("Updates the contract balance", async () => {
      const result = await ethDaddy.getBalance()
      expect(result).to.be.equal(AMOUNT)
    })
  })

  describe("Withdrawing", () => {
    const ID = 1
    const AMOUNT = ethers.parseUnits("10", "ether")
    let balanceBefore

    beforeEach(async () => {
      balanceBefore = await ethers.provider.getBalance(deployer.address)

      let transaction = await ethDaddy.connect(owner1).mint(ID, { value: AMOUNT })
      await transaction.wait()

      transaction = await ethDaddy.connect(deployer).withDraw()
      await transaction.wait()
    })

    it('Updates the owner balance', async () => {
      const balanceAfter = await ethers.provider.getBalance(deployer.address)
      expect(balanceAfter).to.be.greaterThan(balanceBefore)
    })

    it('Updates the contract balance', async () => {
      const result = await ethDaddy.getBalance()
      expect(result).to.equal(0)
    })
  })
})