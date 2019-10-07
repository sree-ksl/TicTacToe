TicTacToe
---

This is a simple TicTacToe game on ethereum. Based on a tutorial but with upgrades.

The project is divided into the `blockchain` files (smart contracts) and the `web`.

# Getting started

TicTacToe makes use of `runner-cli`:

    npm i -g runner-cli

The tasks are declared in `blockchain/taskfile` and `web/taskfile`, which are shell scripts on steroids.

To see the available commands, simply invoke:

    run

To invoke a command:

    run build

Or:

    ./taskfile build

# Dependencies

To work with TicTacToe you need:

	[sudo] npm i -g truffle parcel-bundler solc ganache-cli

* ParcelJS (HTML/JS/CSS bundler)
* Truffle (Solidity development tools)
* Solc (Solidity compiler)
* Ganache (local blockchain)

# Typical workflow

    [sudo] npm i -g runner-cli

## Development
Blockchain:

    cd blockchain
    run init
    # do your changes
    run test
    # repeat...

Frontend:

    cd web
    run init
    run test
    run dev  # or "run dev ropsten"
    # do your changes and live reload

## Deployment
Blockchain:

    cd blockchain
    run deploy  # implies "run build"

Frontend:

    cd web
    run build
    ls ./build  # your dist files are here

## Blockchain

* Install the dependencies: `run init`
* Run the test suite: `run test`
* Compile the contracts: `run build`
* Deploy the contract to the blockchain: `run deploy`

## Web

* Develop with live reload: `run dev`
    * Start Ganache
    * Deploy the contracts to the local blockchain
    * Open Chrome with MetaMask pointing to ganache
    * Bundle the web and serve it with live reload

