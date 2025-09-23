# ENGIConnect

<div align="center">
  <img src="assets/icon.png" alt="ENGIConnect Logo" width="120" height="120">
  <h1>Connect. Build. Grow.</h1>
  <p><strong>A Web3-powered community hub for engineers and tech creatives</strong></p>
  <p>
    <img src="https://img.shields.io/badge/React%20Native-0.81.4-blue.svg" alt="React Native">
    <img src="https://img.shields.io/badge/Expo-~54.0.9-black.svg" alt="Expo">
    <img src="https://img.shields.io/badge/Web3-Ethereum-7B68EE.svg" alt="Web3">
  </p>
</div>

## 🌟 Overview

ENGIConnect is a revolutionary Web3-powered community platform that transforms how engineers, developers, and tech creatives connect, collaborate, and monetize their skills. Built on blockchain technology, it provides a decentralized, privacy-focused environment where innovation thrives through token-gated communities, secure messaging, and direct crypto monetization.

## 🚀 The Problem

### Current Challenges in Tech Communities

**Fragmented Communication**
- Developers scattered across Discord, Slack, Telegram, and Reddit
- No unified platform for technical discussions and collaboration
- Lost opportunities due to disconnected conversations

**Monetization Barriers**
- Traditional platforms don't support crypto payments
- Freelancers struggle with payment processing
- No direct tipping or sponsorship mechanisms for tech content

**Privacy & Identity Issues**
- Centralized platforms control user data
- Lack of true ownership over digital identity
- Security concerns with traditional authentication

**Community Access Control**
- Difficulty creating exclusive communities
- No seamless token/NFT-based membership systems
- Manual verification processes for gated content

**Cross-Platform Integration**
- APIs are complex and developer-unfriendly
- No standardized way to embed community features
- Limited customization for different project needs

## 💡 The Solution

ENGIConnect addresses these challenges with a comprehensive Web3-native platform that provides:

### 🔐 **Decentralized Identity & Privacy**
- Wallet-only authentication ensuring true digital ownership
- Stealth mode for anonymous participation
- ENS and Unstoppable Domain integration
- NFT-based avatars and verification

### 💬 **Unified Communication Hub**
- Integrated DMs, group chats, and community channels
- Token-gated communities for exclusive access
- Smart contract triggers for DAO governance
- Self-destructing messages for sensitive discussions

### 💰 **Direct Crypto Monetization**
- In-chat crypto tipping system
- Premium subscription tiers with ETH/USDC payments
- NFT pass access to exclusive features
- Sponsored rooms for Web3-native advertising

### 🛠️ **Developer-First Architecture**
- Comprehensive API for dApp integration
- Branded chatrooms for DAOs and NFT projects
- Cross-chain compatibility
- Voice/video calling capabilities

## ✨ Key Features

### Core Functionality

#### 🔑 **Wallet Authentication**
- MetaMask, Coinbase Wallet, Trust Wallet support
- Proof-of-Activity verification (ETH balance checks)
- Secure, decentralized login system

#### 💬 **Advanced Chat System**
- Direct messaging with crypto tipping
- Group chats with moderation tools
- NFT showcase and transfer capabilities
- AI-powered scam detection
- Smart contract integration for DAO votes

#### 🌐 **Token-Gated Communities**
- NFT holder exclusive groups
- DAO governance rooms
- Sponsored community spaces
- On-chain moderation and blocklists

#### 👤 **Profile Management**
- ENS and Unstoppable Domain integration
- NFT avatar system
- Linked wallet management
- Privacy controls and stealth mode

#### 💳 **Monetization Features**
- Free and Premium tier system
- ETH/USDC/NFT payment options
- Tip Jar for instant crypto donations
- Sponsored rooms for Web3 advertising

#### 🔧 **B2B API Dashboard**
- Branded chatroom creation for projects
- Developer API for dApp embedding
- Subscription management
- Analytics and moderation tools

## 🎨 Design System

### Color Palette (Starknet Inspired)
- **Primary**: Deep Purple `#3B2CC0` | Indigo `#6C47FF`
- **Accents**: Cyan `#22D3EE` | Mint Green `#34D399`
- **Neutrals**: White `#F9FAFB` | Dark Gray `#1F2937` | Medium Gray `#9CA3AF`
- **Status**: Green `#10B981` | Yellow `#F59E0B` | Red `#EF4444`

### UI Principles
- Dark-first design with light mode support
- Neon accents for Web3 aesthetics
- Smooth animations and micro-interactions
- Mobile-first responsive design

## 🛠️ Tech Stack

### Frontend
- **React Native 0.81.4** - Cross-platform mobile development
- **Expo SDK 54** - Development platform and native APIs
- **React Navigation** - Navigation and routing
- **React Native Reanimated** - Smooth animations

### Blockchain Integration
- **Ethers.js** - Ethereum blockchain interaction
- **Web3** - Decentralized protocols
- **WalletConnect** - Wallet integration protocol

### UI/UX
- **Expo Linear Gradient** - Beautiful gradient backgrounds
- **Expo Vector Icons** - Consistent iconography
- **NativeWind** - Utility-first styling
- **React Native Gesture Handler** - Advanced touch interactions

### Development Tools
- **Babel** - JavaScript transpilation
- **Metro** - React Native bundler
- **ESLint** - Code quality

## 📱 App Screens

1. **Landing Page** - Hero section with wallet connect CTA
2. **Onboarding** - Wallet connection and profile setup
3. **Chat List** - Inbox with DMs and group tabs
4. **Direct Chat** - Core messaging with crypto features
5. **Communities** - Token-gated groups and discovery
6. **Profile** - Settings, privacy, and account management
7. **Monetization Board** - Premium features and payment options
8. **DAO Dashboard** - B2B tools and API management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- Web3 wallet (MetaMask, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/engiconnect.git
   cd engiconnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/emulator**
   - For iOS: `npx expo run:ios`
   - For Android: `npx expo run:android`
   - For Web: `npx expo start --web`

### Environment Setup

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_INFURA_PROJECT_ID=your_infura_project_id
EXPO_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
EXPO_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
```

## 📖 Usage

### For Users

1. **Connect Wallet**: Choose your preferred Web3 wallet
2. **Complete Onboarding**: Set up your profile and alias
3. **Join Communities**: Discover and join token-gated groups
4. **Start Chatting**: Send messages, tip with crypto, share NFTs
5. **Monetize**: Access premium features and earn through tips

### For Developers

1. **Access API Dashboard**: Navigate to DAO Dashboard from profile
2. **Generate API Key**: Create authentication credentials
3. **Integrate Chat**: Use our SDK to embed chat in your dApp
4. **Customize Branding**: Create branded rooms for your project

## 🔧 API Documentation

### Authentication
```javascript
const apiKey = 'your_api_key';
const client = new ENGIConnectClient({ apiKey });
```

### Create Branded Room
```javascript
const room = await client.createRoom({
  name: 'My DAO Chat',
  tokenGate: '0x...',
  branding: {
    primaryColor: '#3B2CC0',
    logo: 'https://...'
  }
});
```

### Embed Chat Component
```javascript
import { ENGIConnectChat } from 'engiconnect-sdk';

<ENGIConnectChat
  roomId="room_123"
  theme="dark"
  features={['tipping', 'nft-sharing']}
/>
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Install dependencies: `npm install`
4. Make your changes
5. Run tests: `npm test`
6. Commit changes: `git commit -m 'Add amazing feature'`
7. Push to branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Code Style
- Follow React Native best practices
- Use TypeScript for new components
- Maintain consistent styling with our design system
- Write meaningful commit messages

### Testing
- Test on both iOS and Android
- Verify wallet connections work properly
- Test all monetization features
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Starknet** for inspiring our design system
- **Expo** for the amazing development platform
- **React Native Community** for incredible tools and libraries
- **Web3 Community** for pushing the boundaries of decentralized technology

## 📞 Contact

**ENGIConnect Team**
- Website: [engiconnect.app](https://engiconnect.app)
- Twitter: [@ENGIConnect](https://twitter.com/ENGIConnect)
- Discord: [ENGIConnect Community](https://discord.gg/engiconnect)
- Email: hello@engiconnect.app

### Support
- 📖 [Documentation](https://docs.engiconnect.app)
- 🐛 [Bug Reports](https://github.com/engiconnect/engiconnect/issues)
- 💡 [Feature Requests](https://github.com/engiconnect/engiconnect/discussions)
- 💬 [Community Forum](https://community.engiconnect.app)

---

<div align="center">
  <p><strong>Built with ❤️ for the Web3 community</strong></p>
  <p>
    <a href="#engiconnect">Overview</a> •
    <a href="#-the-problem">Problem</a> •
    <a href="#-the-solution">Solution</a> •
    <a href="#-key-features">Features</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-contributing">Contributing</a>
  </p>
</div>