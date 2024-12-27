
# FundMe React / TypeScript dApp

A React-based dApp (decentralized application) that demonstrates wallet connectivity, authentication, and interaction with Ethereum smart contracts.

## Features

- Wallet Connection and Authentication
- Fund Transfer to Smart Contract
- Balance Checking
- Funds Withdrawal
- Persistent Authentication State

## Components

### WalletLogin
- Handles wallet authentication using MetaMask
- Implements message signing for secure authentication
- Maintains login state
- Handles wallet connection events

### WalletConnect
- Manages wallet connection state
- Handles MetaMask events (account changes, chain changes)
- Displays connected wallet address

### FundAccount
- Allows users to send ETH to the smart contract
- Input validation for funding amount
- Transaction status feedback
- Error handling

### WithdrawFunds
- Enables withdrawal of funds from the smart contract
- Transaction status feedback
- Error handling

### GetBalance
- Displays the current balance of the smart contract
- Auto-updates when contract state changes

## Technical Stack

- React
- TypeScript
- ethers.js
- MetaMask (Web3 Provider)

## Prerequisites

- Node.js
- MetaMask browser extension
- An Ethereum wallet with test network tokens

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Usage

1. Connect your MetaMask wallet
2. Sign the authentication message
3. Once authenticated, you can:
   - View contract balance
   - Fund the contract
   - Withdraw funds (if authorized)

## Security Features

- Message signing for authentication
- Persistent login state using localStorage
- Automatic disconnection handling
- Chain change detection

## State Management

- Uses React's useState and useEffect hooks
- Implements custom hooks for contract interaction
- Maintains wallet connection state

## Error Handling

- Comprehensive error catching and display
- User-friendly error messages
- Loading states for transactions

## License

MIT License
