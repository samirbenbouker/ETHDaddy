**Project Name: EthDomain**

---

## Overview

EthDomain is a decentralized domain marketplace powered by Ethereum. Similar to traditional domain registrars like GoDaddy, EthDomain allows users to buy and sell domain names using Ethereum smart contracts. The project utilizes Solidity for smart contract development and Hardhat for Ethereum development environment setup. The frontend is built using React to provide a user-friendly interface for interacting with the Ethereum blockchain.

---

## Features

- **Decentralized Marketplace:** EthDomain provides a decentralized platform for buying and selling domain names, eliminating the need for intermediaries.
  
- **Ethereum Integration:** Users can transact directly using Ethereum and interact with smart contracts to purchase domain names securely.

- **Smart Contracts:** EthDomain utilizes Solidity smart contracts to manage domain ownership, transfers, and payments securely on the Ethereum blockchain.

- **User-Friendly Interface:** The frontend interface, built with React, offers an intuitive and responsive user experience for browsing domain listings and making purchases.

---

## Getting Started

### Prerequisites

- Node.js
- npm
- Hardhat
- MetaMask (or any Ethereum wallet browser extension)

### Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/samirbenbouker/ETHDaddy.git
   ```

2. **Install Dependencies**
   ```bash
   cd ETHDaddy
   npm install
   ```

3. **Set Up the Environment**
   - Create a `.env` file in the project root and configure the necessary environment variables, such as the Ethereum node URL and web3 service provider API keys.

4. **Compile the Smart Contracts**
   ```bash
   npx hardhat compile
   ```

5. **Deploy the Smart Contracts (Optional)**
   If you want to deploy the smart contracts on a test network or on the Ethereum mainnet, configure your `hardhat.config.js` file with your account information and target network, and then run:
   ```bash
   npx hardhat run scripts/deploy.js --network <network_name>
   ```

6. **Start hardhat node**
   ```bash
   npx hardhat node
   ```

7. **Start the Frontend Application**
   ```bash
   npm start
   ```

8. **Access the Application**
   Open your web browser and visit `http://localhost:3000` to interact with the application.

## Smart Contracts

## Functions

### `list(string memory _name, uint256 _cost)`

Lists a new domain for sale.

- **Parameters:**
  - `_name`: Name of the domain.
  - `_cost`: Cost of the domain.

### `mint(uint256 _id)`

Mints a domain to the caller.

- **Parameters:**
  - `_id`: ID of the domain to mint.

### `getBalance()`

Returns the contract's balance.

- **Returns:**
  - `uint256`: Contract's balance.

### `withDraw()`

Withdraws funds from the contract.

---
