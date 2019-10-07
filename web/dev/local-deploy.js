const fs = require("fs")
const path = require("path")
const Web3 = require("web3")

const web3 = new Web3("http://localhost:8545")

async function deploy(web3, fromAccount, ABI, bytecode, ...params) {
    const contract = new web3.eth.Contract(JSON.parse(ABI))

    const estimatedGas = await contract.deploy({ data: "0x" + bytecode, arguments: params }).estimateGas()

    const tx = await contract
        .deploy({ data: "0x" + bytecode, arguments: params })
        .send({ from: fromAccount, gas: estimatedGas + 200 })

    return tx.options.address
}

function setContractAddressToEnv(contractAddress) {
    if (!contractAddress) throw new Error("Invalid contract address")
    const filePath = path.resolve(__dirname, "..", ".env.test.local")
    let data = fs.readFileSync(filePath).toString()

    data = data.replace(/CONTRACT_ADDRESS=[^\n]+/, `CONTRACT_ADDRESS=${contractAddress}`)
    fs.writeFileSync(filePath, data)
}

async function deployContracts() {
    const accounts = await web3.eth.getAccounts()

    console.log(`The account used to deploy is ${accounts[0]}`)

    const libStringAbi = fs.readFileSync(path.resolve(__dirname, "..", "..", "blockchain", "build", "__contracts_LibString_sol_LibString.abi")).toString()
    const libStringBytecode = fs.readFileSync(path.resolve(__dirname, "..", "..", "blockchain", "build", "__contracts_LibString_sol_LibString.bin")).toString()
    const dipDappDoeAbi = fs.readFileSync(path.resolve(__dirname, "..", "..", "blockchain", "build", "__contracts_DipDappDoe_sol_DipDappDoe.abi")).toString()
    const dipDappDoeBytecode = fs.readFileSync(path.resolve(__dirname, "..", "..", "blockchain", "build", "__contracts_DipDappDoe_sol_DipDappDoe.bin")).toString()

    try {
        console.log("Deploying LibString...")
        const libStringAddress = await deploy(web3, accounts[0], libStringAbi, libStringBytecode)
        console.log(`- LibString deployed at ${libStringAddress}\n`)

        const libPattern = /__.\/contracts\/LibString.sol:LibString___/g
        const linkedDipDappDoeBytecode = dipDappDoeBytecode.replace(libPattern, libStringAddress.substr(2))
        if (linkedDipDappDoeBytecode.length != dipDappDoeBytecode.length) {
            throw new Error("The linked contract size does not match the original")
        }

        console.log("Deploying DipDappDoe...")
        const dipDappDoeAddress = await deploy(web3, accounts[0], dipDappDoeAbi, linkedDipDappDoeBytecode, 0)
        console.log(`- DipDappDoe deployed at ${dipDappDoeAddress}`)

        // write .env.test.local
        setContractAddressToEnv(dipDappDoeAddress)
    }
    catch (err) {
        console.error("\nUnable to deploy:", err.message, "\n")
        process.exit(1)
    }
    process.exit()
}

deployContracts()
