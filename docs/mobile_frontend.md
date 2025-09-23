# ENGIConnect - Mobile and Frontend Development Task

## Overview
This task focuses on building and enhancing the mobile-first dApp UI for ENGIConnect. The developer will implement responsive React Native components, integrate Web3 functionality, and apply the specified design system using Tailwind CSS.

## Key Technologies
- **React Native**: Mobile-first dApp UI framework
- **React**: Web version support (if needed)
- **Web3 Libraries**: Wallet Connect, ethers.js, starknet.js
- **UI/Design**: Tailwind CSS for styling, custom color palette
- **Animation**: React Native Reanimated for smooth interactions

## Current Project Structure
The app uses Expo with React Navigation (Stack + Tabs), existing screens include:
- LandingScreen, OnboardingScreen
- ChatListScreen, DirectChatScreen
- CommunitiesScreen, ProfileScreen
- MonetizationScreen, DAODashboardScreen

## Implementation Areas

### 1. Design System Implementation
**Location**: Create `styles/theme.js` and `components/ui/` directory

**Color Palette**:
- Primary: Purple (#7C3AED), Indigo (#4F46E5), Cyan (#22D3EE)
- Accent: Mint Green (#10B981), Dark Gray (#1F2937)
- Background gradients: Linear gradients from Dark Gray to Purple

**Typography**:
- Font family: System fonts with fallbacks
- Text sizes: 12px (small), 14px (body), 16px (heading), 24px (title)
- Weights: Regular (400), Medium (500), Bold (600), Extra Bold (700)

**Components to Create**:
- `Button.js` - Primary/secondary/action buttons
- `Card.js` - Content containers with shadows
- `Input.js` - Text inputs with validation
- `Modal.js` - Overlay dialogs
- `Avatar.js` - User profile images
- `Badge.js` - Status indicators

### 2. Web3 UI Components
**Location**: `components/web3/` directory

**Components**:
- `WalletConnectButton.js` - Wallet connection interface
- `TokenBalance.js` - Display crypto balances
- `TransactionStatus.js` - Show transaction progress
- `NFTCard.js` - Display NFT assets
- `QRCodeScanner.js` - For wallet addresses/payments

**Integration**:
- Use WalletConnect for cross-wallet compatibility
- Implement loading states for blockchain operations
- Add error boundaries for Web3 failures

### 3. Screen Enhancements
**Existing Screens to Update**:

**ChatListScreen.js**:
- Add Web3 identity indicators (ENS, NFT avatars)
- Implement tipping buttons on chat items
- Add community access badges

**CommunitiesScreen.js**:
- Token-gated community previews
- NFT ownership requirements display
- Premium community indicators

**ProfileScreen.js**:
- Wallet connection status
- NFT gallery view
- Token portfolio summary
- Privacy settings toggle

**MonetizationScreen.js**:
- Subscription tier cards
- Payment method selection
- Transaction history

**New Screens to Create**:
- `WalletScreen.js` - Full wallet management
- `NFTGalleryScreen.js` - User's NFT collection
- `SettingsScreen.js` - App preferences and privacy
- `SearchScreen.js` - Find users/communities

### 4. Navigation Improvements
**Location**: Update `App.js` and navigation configuration

**Enhancements**:
- Add drawer navigation for settings
- Implement deep linking for wallet connections
- Add tab badges for notifications
- Create custom header components

### 5. State Management
**Location**: Implement Redux Toolkit or Context API

**Stores to Create**:
- `walletSlice.js` - Wallet connection state
- `userSlice.js` - User profile and preferences
- `chatSlice.js` - Chat and community data
- `paymentSlice.js` - Transaction history

## Dependencies to Add
```json
{
  "@walletconnect/react-native-dapp": "^1.8.0",
  "@react-native-async-storage/async-storage": "^1.19.0",
  "react-native-vector-icons": "^10.0.0",
  "react-native-qrcode-scanner": "^1.5.5",
  "@reduxjs/toolkit": "^2.0.1",
  "react-redux": "^9.0.4"
}
```

## Performance Optimization
- Implement FlatList virtualization for large lists
- Use React.memo for expensive components
- Optimize image loading with Expo Image
- Implement pagination for chat/communities

## Accessibility
- Add proper ARIA labels for screen readers
- Implement keyboard navigation
- Support dynamic text sizing
- Add haptic feedback for interactions

## Testing Strategy
- Component unit tests with React Testing Library
- E2E tests with Detox for critical flows
- Visual regression tests for UI components
- Performance benchmarks for animations

## Deliverables
- Complete mobile UI with Web3 integration
- Responsive design across device sizes
- Smooth animations and transitions
- Accessible and performant interface
- Comprehensive component library

## Timeline Estimate
- Design system setup: 1 week
- Web3 component development: 1-2 weeks
- Screen enhancements: 2 weeks
- Navigation and state management: 1 week
- Testing and optimization: 1 week

## Dependencies
- Coordinates with all other tasks for UI integration
- Requires API endpoints from backend services
- Works with Blockchain task for Web3 functionality