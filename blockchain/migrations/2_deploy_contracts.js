var LibString = artifacts.require("./LibString.sol")
var DipDappDoe = artifacts.require("./DipDappDoe.sol")

module.exports = function(deployer) {
  deployer.deploy(LibString)
  deployer.link(LibString, DipDappDoe)
  deployer.deploy(DipDappDoe, 2) // timeout (seconds)
}