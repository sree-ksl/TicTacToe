// test/TestLibString.sol
pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "../contracts/LibString.sol";

contract TestLibString {
    function testSaltedHash() public {
        bytes32 hash1 = LibString.saltedHash(123, "my salt here");
        bytes32 hash2 = LibString.saltedHash(123, "my salt 2 here");
        bytes32 hash3 = LibString.saltedHash(234, "my salt here");
        
        Assert.isNotZero(hash1, "Salted hash should be valid");

        Assert.notEqual(hash1, hash2, "Different salt should produce different hashes");
        Assert.notEqual(hash1, hash3, "Different numbers should produce different hashes");
        Assert.notEqual(hash2, hash3, "Different numbers and salt should produce different hashes");
    }
}
