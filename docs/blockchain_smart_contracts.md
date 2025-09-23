# ENGIConnect - Blockchain and Smart Contracts Implementation Task

## Overview
This task focuses on integrating Starknet blockchain functionality into the ENGIConnect React Native app. The developer assigned to this task will implement smart contract interactions, wallet connections, and on-chain features for token-gated access, NFT ownership checks, and DAO governance.

## Key Technologies
- **Starknet**: Mainnet/testnet for deploying contracts
- **Cairo SDK**: Write, compile, and deploy smart contracts
- **OpenZeppelin**: Prebuilt, audited contracts (tokens, access control)
- **Wallet Integration**: Xverse Wallet (BTC + Starknet), MetaMask/Coinbase Wallet/Trust Wallet
- **Web3 Libraries**: starknet.js for contract interactions

## Implementation Areas

### 1. Smart Contract Development
**Location**: Create a new `contracts/` directory in the project root for Cairo smart contracts.

**Files to Create**:
- `contracts/ENGIToken.cairo` - ERC20 token contract for in-app currency
- `contracts/CommunityAccess.cairo` - Token-gated access control for premium rooms
- `contracts/NFTOwnership.cairo` - NFT verification for exclusive communities
- `contracts/DAOGovernance.cairo` - Voting and proposal system for communities

**Steps**:
1. Set up Cairo development environment
2. Implement token contracts using OpenZeppelin templates
3. Deploy contracts to Starknet testnet first, then mainnet
4. Create deployment scripts in `scripts/deploy.js`

### 2. Wallet Integration
**Location**: Create `utils/wallet.js` and `utils/starknet.js` for wallet management.

**Implementation**:
- Install `starknet.js` and wallet connector libraries
- Implement wallet connection UI components in `components/WalletConnect.js`
- Add wallet state management to Redux/Context (create `contexts/WalletContext.js`)
- Integrate with existing screens: ProfileScreen for wallet management, CommunitiesScreen for token-gated access

**Key Functions**:
- `connectWallet()` - Connect to supported wallets
- `getAccountBalance()` - Fetch STRK/ETH balances
- `verifyNFTOwnership()` - Check NFT ownership for access
- `executeContractCall()` - Interact with deployed contracts

### 3. On-Chain Data Integration
**Location**: Modify existing screens to include blockchain features.

**Screens to Update**:
- **CommunitiesScreen.js**: Add token-gated community access
- **ProfileScreen.js**: Display wallet info, NFT collections, token balances
- **DAODashboardScreen.js**: Implement voting interface for proposals

**API Integration**:
- Use Starknet RPC endpoints for real-time data
- Implement caching for contract states to reduce API calls
- Add error handling for network failures and transaction rejections

## Dependencies to Add
```json
{
  "starknet": "^5.0.0",
  "get-starknet": "^3.0.0",
  "@starknet-react/core": "^2.0.0"
}
```

## Testing Strategy
- Unit tests for contract functions using Starknet testing framework
- Integration tests for wallet connections
- End-to-end tests for token-gated features on testnet

## Security Considerations
- Implement proper key management and never store private keys
- Use audited OpenZeppelin contracts
- Add transaction confirmation dialogs
- Implement rate limiting for contract calls

## Deliverables
- Deployed smart contracts on Starknet
- Wallet integration components
- Updated screens with blockchain features
- Comprehensive test suite
- Documentation for contract ABIs and interaction methods

## Timeline Estimate
- Contract development: 2-3 weeks
- Wallet integration: 1 week
- UI integration: 1 week
- Testing and deployment: 1 week

## Next Steps
After completion, coordinate with Payments task for token transactions and Monetization task for premium feature access control.