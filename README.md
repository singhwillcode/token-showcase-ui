🪐 A Custom ERC-20 Token with a Reactive Frontend: Black Buddha Peace (BBP)

Author: Sri Gaurab Kumar Singha

This project is a decentralized application (dApp) demonstrating full-stack Web3 development. It features a custom ERC-20 token smart contract (Gtoken) deployed on the Ethereum Sepolia Testnet and a modern, reactive frontend dashboard for token management.

🚀 Key Features

Real-Time Data Display: Fetches and displays token name, symbol, total supply, and the connected user's balance directly from the blockchain using ethers.js.

Token Actions: Provides interactive forms for standard ERC-20 operations:

transfer()

approve() (Managing allowances)

burn() (Token destruction)

Custom Admin Features: Includes interfaces for specialized contract functions available only to the founder:

freezeId() / unfreezeId(): Administrative control to restrict transactions for specific addresses.

tokenBurning(): Founder function to reduce the total supply.

Modern Design: Features a dark, custom theme built with Tailwind CSS for a responsive and intuitive user experience.

🛠️ Technology Stack

Component

Technology

Role in Project

Backend

Solidity (ERC-20)

Defines the immutable rules, supply, and logic (including freezeId) of the BBP token contract.

Blockchain

Sepolia Testnet

The network where the smart contract is deployed and tested.

Frontend

React & TypeScript

Builds the responsive, component-based user interface and ensures type safety.

Web3 Library

Ethers.js

The core library enabling the frontend to connect to MetaMask, read contract data, and submit signed transactions.

Styling

Tailwind CSS

A utility-first framework used to rapidly style the modern, dark-themed interface.

Tooling

Vite & Bun

Vite serves the application during development. Bun is the package manager used to install dependencies quickly.

⚙️ Getting Started (Local Development)

Follow these steps to clone this repository and run the dashboard locally.

Prerequisites

You must have Node.js (which includes npm) and Git installed on your system.

Installation

Clone the Repository:

git clone [https://github.com/singhwillcode/token-showcase-ui.git](https://github.com/singhwillcode/token-showcase-ui.git)
cd token-showcase-ui



Install Dependencies:
This project uses Bun as the primary package manager. Run the following command to install all necessary libraries (including React and Ethers.js):

bun install



Configure Contract Address:
You must update the deployed contract address. Find the CONTRACT_ADDRESS variable in your configuration files (likely in src/config/contract.ts) and replace the placeholder with the actual Sepolia address of the Gtoken contract.

Running the Application

Start the local development server:

npm run dev



The application will be available at http://localhost:3000 (or a similar port).

💡 Usage

Connect Wallet: Connect your MetaMask wallet (switched to the Sepolia Testnet).

Get Gas: Ensure your wallet has Sepolia ETH to pay for transaction fees (gas).

Interact: Use the forms to test core functionality, observing how "Your Balance" and "Total Supply" update after successful transactions.