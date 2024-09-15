# Staking smart contract hardhat project

This project is a staking smart contract built with Solidity and configured using the Hardhat framework. The contract allows users to stake tokens for predefined durations, rewards them based on the staking period, applies penalties for early unstaking, and ensures secure and upgradeable contract functionality. The project is deployed on the Polygon Mumbai testnet.

## Features

- *Staking Mechanism:* Users can stake tokens for different periods such as 1 week, 4 weeks, or 8 weeks.
- *Rewards:* Stakers earn rewards based on the duration of their staking period. The reward percentage increases with longer staking periods.
- *Penalty on Early Unstaking:* If users unstake before the defined staking period, a penalty (in percentage) is applied to the staked amount.
- *Cooldown Period:* A configurable cooldown period is imposed after early unstaking, preventing immediate withdrawal of funds.
- *Configurable Parameters:* All staking parameters, such as staking periods, reward percentages, penalties, and cooldown times, are configurable by contract administrators using a multi-signature wallet.
- *Upgradability:* The contract supports upgradability, ensuring future enhancements and security updates without disrupting the user experience.

## Reward Information

The contract offers different rewards, penalties, and cooldown periods based on the staking duration. The details are provided below:

| **Staking Period** | **Reward (%)** | **Penalty (%) on Early Unstake** | **Cooldown Period** |
|--------------------|----------------|----------------------------------|---------------------|
| 1 week             | 5%             | 2%                               | 1 day               |
| 4 weeks            | 10%            | 5%                               | 2 days              |
| 8 weeks            | 20%            | 10%                              | 3 days              |

## Project Structure

- *Contracts:* All smart contract code is located in the contracts/ directory.
- *Scripts:* Deploy contract script is located in the scripts/ directory.

## Prerequisites

- This step presumes that your system has already downloaded the Nodejs **v18.13.0** and npm **8.19.3**.

    *1. Clone this repository*

    ```
    git clone https://github.com/Parth2412/staking-project.git
    cd staking-project/staking-contract
    ```

    *2. Install dependencies*

    ```
    npm install
    ```

    *3. Create **.env** file and add the following*

    ```
    POLYGON_API_KEY=YOUR_POLYGON_API_KEY
    PRIVATE_KEY=YOUR_WALLET_PRIVATE_KEY
    ```

    *4. Compile the contract*

    ```
    npx hardhat compile
    ```

    Before deploying the main staking contract, we'll first deploy a basic ERC20 token contract. This token will be used within the staking contract, as it's difficult to obtain the token address for MATIC/WMATIC on the testnet. By creating our own token, we can easily integrate it into the staking contract. 

    *5. Deploy the token contract to the Polygon Amoy testnet by running*

    ```
    npm run deploy-token
    ```

    *6. Verify the ERC20 token contract(STK) on Polygon Amoy testnet by running*

    ```
    npx hardhat verify --network amoy DEPLOYED_SMART_CONTRACT_ADDRESS
    ```

    *7. Deploy the contract to the Polygon Amoy testnet by running*

    ```
    npm run deploy-contract
    ```

    *8. Verify the contract on Polygon Amoy testnet by running*

    ```
    npx hardhat verify --network amoy DEPLOYED_SMART_CONTRACT_ADDRESS
    ```

    ***Note:*** After deploying the ERC20 token contract and the staking smart contract, make sure to save both contract addresses for future reference.

    *9. Initialize the contract*

    Initialize is a smart contract function which will take 2 arguments: 1) ERC20 Token Contract Address, 2) MultiSig Wallet Address. Before running this script, Please open scripts/initialize.js file and change STAKING_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS, MULTISIG_ACCOUNT_ADDRESS.

    ```
    npm run initialize-contract
    ```
