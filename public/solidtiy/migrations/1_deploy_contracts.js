const BindingContract = artifacts.require("./BindingContract.sol");

module.exports = function (deployer) {
    deployer.deploy(BindingContract);
};
