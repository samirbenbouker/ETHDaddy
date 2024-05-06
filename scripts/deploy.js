const hre = require("hardhat");

const tokens = (n) => {
    return ethers.parseUnits(n.toString(), 'ether')
}

async function main() {
    const [deployer] = await ethers.getSigners()
    const NAME = "ETH Daddy"
    const SYMBOL = "ETHD"

    const ETHDaddy = await ethers.getContractFactory("ETHDaddy")
    const ethDaddy = await ETHDaddy.deploy(NAME, SYMBOL)
    await ethDaddy.waitForDeployment()

    console.log(`Deployed Domain Contract at: ${ethDaddy.address}\n`)

    const names = ["jack.eth", "john.eth", "henry.eth", "cobalt.eth", "oxygen.eth", "carbon.eth"]
    const costs = [tokens(10), tokens(25), tokens(15), tokens(2.5), tokens(3), tokens(1)]

    for (var i = 0; i < 6; i++) {
        const transaction = await ethDaddy.connect(deployer).list(names[i], costs[i])
        await transaction.wait()

        console.log(`Listed Domain ${i + 1}: ${names[i]}`)
    }

    console.log("Deplyed finished")
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});