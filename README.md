# staking-project

Entire project is divided into 2 directories. 
1. [staking-contract](#1-staking-contract)
2. [staking-backend](#2-staking-backend)


### 1. staking-contract
- This directory contains the smart contract written in solidity and hardhat configuration and scripts.
- Go to this directory and create the ***.env*** file with following contents

```
POLYGON_API_KEY=YOUR_POLYGON_API_KEY
PRIVATE_KEY=YOUR_ACCOUNT_PRIVATE_KEY
```

Detailed readme is present in the staking-project/staking-contract/README.md [here](https://github.com/Parth2412/staking-project/blob/readme-updates/staking-contract/README.md)


### 2. staking-backend
- This directory contains the backend which listens the relevant events of the smart contract and stores the user data into the database. 
- Go to this directory and create the ***.env*** file with following contents

```
PORT=YOUR_DESIRED_PORT
MONGO_STRING=MONGODB_STRING
AMOY_WEBSCOKET_URL=POLYGON_WSS_URL_OF_AMOY_TESTNET
CONTRACT_ADDRESS=STAKING_CONTRACT_ADDRESS_THAT_WE_GOT_AT_TIME_OF_DEPLOYMENT
```

Detailed readme is present in the staking-project/staking-backend/README.md [here](https://github.com/Parth2412/staking-project/blob/readme-updates/staking-backend/README.md)