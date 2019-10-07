// test/TestDipDappDoe.sol
pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/DipDappDoe.sol";

contract TestDipDappDoe2 {
    DipDappDoe gamesInstance;

    constructor() public {
        gamesInstance = DipDappDoe(DeployedAddresses.DipDappDoe());
    }

    function testGameConfirmed() public {
        uint8[9] memory cells;
        uint8 status;
        uint amount;
        string memory nick1;
        string memory nick2;

        bytes32 hash = gamesInstance.saltedHash(123, "my salt goes here");
        uint32 gameIdx = gamesInstance.createGame(hash, "John");
        gamesInstance.acceptGame(gameIdx, 234, "Mary");

        gamesInstance.confirmGame(gameIdx, 123, "my salt goes here");

        // 123 ^ 234 is odd: player 2 should start
        (cells, status, amount, nick1, nick2) = gamesInstance.getGameInfo(gameIdx);
        Assert.equal(uint(cells[0]), 0, "The board should be empty");
        Assert.equal(uint(cells[1]), 0, "The board should be empty");
        Assert.equal(uint(cells[2]), 0, "The board should be empty");
        Assert.equal(uint(cells[3]), 0, "The board should be empty");
        Assert.equal(uint(cells[4]), 0, "The board should be empty");
        Assert.equal(uint(cells[5]), 0, "The board should be empty");
        Assert.equal(uint(cells[6]), 0, "The board should be empty");
        Assert.equal(uint(cells[7]), 0, "The board should be empty");
        Assert.equal(uint(cells[8]), 0, "The board should be empty");
        Assert.equal(uint(status), 2, "The game should be started at player 2");
        Assert.equal(amount, 0, "The initial amount should be zero");
        Assert.equal(nick1, "John", "The nick should be John");
        Assert.equal(nick2, "Mary", "The nick should be Mary");

        // Try to cheat
        hash = gamesInstance.saltedHash(123, "my salt goes here");
        gameIdx = gamesInstance.createGame(hash, "John");
        gamesInstance.acceptGame(gameIdx, 234, "Mary");

        gamesInstance.confirmGame(gameIdx, 100, "my salt goes here");

        // The hash does not correspond: 100 != 123 
        (cells, status, amount, nick1, nick2) = gamesInstance.getGameInfo(gameIdx);
        Assert.equal(uint(cells[0]), 0, "The board should be empty");
        Assert.equal(uint(cells[1]), 0, "The board should be empty");
        Assert.equal(uint(cells[2]), 0, "The board should be empty");
        Assert.equal(uint(cells[3]), 0, "The board should be empty");
        Assert.equal(uint(cells[4]), 0, "The board should be empty");
        Assert.equal(uint(cells[5]), 0, "The board should be empty");
        Assert.equal(uint(cells[6]), 0, "The board should be empty");
        Assert.equal(uint(cells[7]), 0, "The board should be empty");
        Assert.equal(uint(cells[8]), 0, "The board should be empty");
        Assert.equal(uint(status), 12, "The game should be won by player 2");
    }
}
