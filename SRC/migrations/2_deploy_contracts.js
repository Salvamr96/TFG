var Contract = artifacts.require("Contract");

    module.exports = function(deployer) {
        
        deployer.deploy(Contract, "0xD67D7F7465aBB2A610Bc926c8BaBf930903622d6");
    };