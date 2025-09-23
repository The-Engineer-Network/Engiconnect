# ENGIConnect - Backend API and Architecture Documentation

## Overview

ENGIConnect's backend architecture combines multiple services to support a blockchain-powered social platform. The system uses a hybrid approach with Firebase/Supabase for real-time features, custom API endpoints for complex logic, and direct blockchain integration.

## Architecture Components

### 1. Primary Backend Services
- **Firebase/Supabase**: Real-time database, authentication, file storage
- **Custom API Server**: Node.js/Express for business logic
- **Blockchain RPC**: Direct Starknet integration
- **IPFS/Pinata**: Decentralized file storage
- **WebSocket Server**: Real-time messaging

### 2. Technology Stack
```json
{
  "database": "Supabase (PostgreSQL + real-time)",
  "authentication": "Supabase Auth + Web3 wallets",
  "fileStorage": "IPFS + Pinata",
  "cache": "Redis",
  "blockchain": "Starknet RPC",
  "messaging": "Socket.io + Firebase",
  "server": "Node.js + Express",
  "deployment": "Vercel + Railway"
}
```

## Database Schema

### Core Tables

#### Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address VARCHAR(255) UNIQUE,
  username VARCHAR(50) UNIQUE,
  display_name VARCHAR(100),
  email VARCHAR(255),
  ens_domain VARCHAR(255),
  unstoppable_domain VARCHAR(255),
  avatar_url TEXT,
  bio TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  privacy_settings JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Communities
```sql
CREATE TABLE communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  owner_id UUID REFERENCES users(id),
  access_type VARCHAR(20) DEFAULT 'public', -- 'public', 'token-gated', 'nft-gated'
  requirements JSONB DEFAULT '{}', -- token_address, min_balance, nft_contract
  member_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Community Members
```sql
CREATE TABLE community_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES communities(id),
  user_id UUID REFERENCES users(id),
  role VARCHAR(20) DEFAULT 'member', -- 'owner', 'admin', 'moderator', 'member'
  joined_at TIMESTAMP DEFAULT NOW(),
  access_proof JSONB, -- token balance proof, NFT ownership
  UNIQUE(community_id, user_id)
);
```

#### Chats
```sql
CREATE TABLE chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(20) NOT NULL, -- 'direct', 'group', 'community'
  name VARCHAR(100),
  description TEXT,
  avatar_url TEXT,
  created_by UUID REFERENCES users(id),
  community_id UUID REFERENCES communities(id), -- for community chats
  is_encrypted BOOLEAN DEFAULT FALSE,
  encryption_key_hash VARCHAR(255),
  member_count INTEGER DEFAULT 0,
  last_message_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Messages
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID REFERENCES chats(id),
  sender_id UUID REFERENCES users(id),
  content_type VARCHAR(20) DEFAULT 'text', -- 'text', 'image', 'file', 'system'
  content TEXT,
  metadata JSONB DEFAULT '{}', -- file info, encryption data
  reply_to UUID REFERENCES messages(id),
  is_edited BOOLEAN DEFAULT FALSE,
  edited_at TIMESTAMP,
  is_deleted BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP, -- for self-destructing messages
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Payments & Transactions
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  type VARCHAR(20) NOT NULL, -- 'payment', 'tip', 'subscription', 'swap'
  amount DECIMAL(36,18),
  currency VARCHAR(10) DEFAULT 'STRK',
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'completed', 'failed'
  tx_hash VARCHAR(255),
  recipient_id UUID REFERENCES users(id),
  chat_id UUID REFERENCES chats(id), -- for tips
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);
```

#### Subscriptions
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  tier VARCHAR(20) NOT NULL, -- 'basic', 'pro', 'enterprise'
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'cancelled', 'expired'
  payment_method JSONB, -- crypto wallet, payment provider
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### NFTs & Gaming
```sql
CREATE TABLE user_nfts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  contract_address VARCHAR(255),
  token_id VARCHAR(255),
  name VARCHAR(255),
  description TEXT,
  image_url TEXT,
  attributes JSONB,
  acquired_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, contract_address, token_id)
);

CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  type VARCHAR(50), -- 'message_count', 'community_join', 'nft_ownership'
  title VARCHAR(100),
  description TEXT,
  points INTEGER DEFAULT 0,
  nft_minted BOOLEAN DEFAULT FALSE,
  nft_contract_address VARCHAR(255),
  nft_token_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## API Endpoints

### Authentication Endpoints

#### POST /auth/login
**Wallet-based authentication**
```json
Request:
{
  "wallet_address": "0x...",
  "signature": "0x...",
  "message": "Login to ENGIConnect"
}

Response:
{
  "access_token": "jwt_token",
  "refresh_token": "jwt_token",
  "user": { ... },
  "expires_in": 3600
}
```

#### POST /auth/refresh
**Refresh access token**
```json
Request:
{
  "refresh_token": "jwt_token"
}

Response:
{
  "access_token": "jwt_token",
  "expires_in": 3600
}
```

#### POST /auth/verify-ens
**Verify ENS domain ownership**
```json
Request:
{
  "domain": "alice.ens",
  "signature": "0x..."
}

Response:
{
  "verified": true,
  "address": "0x..."
}
```

### User Management Endpoints

#### GET /users/profile
**Get current user profile**
```json
Response:
{
  "id": "uuid",
  "username": "alice_dev",
  "display_name": "Alice Johnson",
  "wallet_address": "0x...",
  "ens_domain": "alice.ens",
  "avatar_url": "ipfs://...",
  "bio": "Web3 Developer",
  "is_verified": true,
  "privacy_settings": { ... },
  "stats": {
    "communities_joined": 5,
    "messages_sent": 1234,
    "achievements_count": 8
  }
}
```

#### PUT /users/profile
**Update user profile**
```json
Request:
{
  "display_name": "Alice Johnson",
  "bio": "Updated bio",
  "privacy_settings": {
    "profile_visibility": "public",
    "show_online_status": true
  }
}
```

#### GET /users/search
**Search users**
```json
Query Params:
- q: search query
- limit: 20
- offset: 0

Response:
{
  "users": [ ... ],
  "total": 150,
  "has_more": true
}
```

### Community Endpoints

#### GET /communities
**List communities**
```json
Query Params:
- type: 'public' | 'joined' | 'featured'
- category: 'tech' | 'gaming' | 'defi'
- limit: 20
- offset: 0

Response:
{
  "communities": [ ... ],
  "total": 500
}
```

#### POST /communities
**Create community**
```json
Request:
{
  "name": "Web3 Developers",
  "description": "Discuss latest in Web3",
  "access_type": "token-gated",
  "requirements": {
    "token_address": "0x...",
    "min_balance": "100"
  }
}

Response:
{
  "id": "uuid",
  "name": "Web3 Developers",
  ...
}
```

#### GET /communities/:id
**Get community details**
```json
Response:
{
  "id": "uuid",
  "name": "Web3 Developers",
  "description": "...",
  "members": [ ... ],
  "access_type": "token-gated",
  "requirements": { ... },
  "stats": {
    "member_count": 150,
    "active_chats": 5,
    "total_messages": 2500
  }
}
```

#### POST /communities/:id/join
**Join community**
```json
Request:
{
  "access_proof": {
    "token_balance": "150",
    "signature": "0x..."
  }
}

Response:
{
  "success": true,
  "role": "member"
}
```

### Chat Endpoints

#### GET /chats
**List user chats**
```json
Query Params:
- type: 'direct' | 'group' | 'community'
- limit: 50

Response:
{
  "chats": [
    {
      "id": "uuid",
      "type": "direct",
      "name": "Alice Johnson",
      "last_message": {
        "content": "Hey there!",
        "sender": "Bob",
        "timestamp": "2024-01-01T10:00:00Z"
      },
      "unread_count": 2
    }
  ]
}
```

#### POST /chats
**Create new chat**
```json
Request:
{
  "type": "direct",
  "participant_ids": ["uuid1", "uuid2"],
  "name": "Project Discussion" // for groups
}

Response:
{
  "id": "uuid",
  "type": "direct",
  ...
}
```

#### GET /chats/:id/messages
**Get chat messages**
```json
Query Params:
- limit: 50
- before: "timestamp"
- after: "timestamp"

Response:
{
  "messages": [
    {
      "id": "uuid",
      "sender": {
        "id": "uuid",
        "username": "alice",
        "avatar_url": "..."
      },
      "content": "Hello world!",
      "content_type": "text",
      "timestamp": "2024-01-01T10:00:00Z",
      "is_edited": false,
      "reactions": [
        { "emoji": "👍", "count": 3, "users": ["uuid1", "uuid2"] }
      ]
    }
  ],
  "has_more": true
}
```

#### POST /chats/:id/messages
**Send message**
```json
Request:
{
  "content": "Hello everyone!",
  "content_type": "text",
  "reply_to": "message_uuid", // optional
  "expires_in": 3600 // seconds, for self-destructing
}

Response:
{
  "id": "uuid",
  "timestamp": "2024-01-01T10:00:00Z",
  "expires_at": "2024-01-01T11:00:00Z"
}
```

### Payment Endpoints

#### POST /payments/tip
**Send tip**
```json
Request:
{
  "recipient_id": "uuid",
  "chat_id": "uuid",
  "amount": "1.5",
  "currency": "STRK",
  "message": "Thanks for the help!" // optional
}

Response:
{
  "transaction_id": "uuid",
  "status": "pending",
  "tx_hash": "0x..."
}
```

#### POST /payments/subscribe
**Start subscription**
```json
Request:
{
  "tier": "pro",
  "payment_method": {
    "type": "crypto",
    "wallet_address": "0x..."
  }
}

Response:
{
  "subscription_id": "uuid",
  "status": "active",
  "current_period_end": "2024-02-01T00:00:00Z"
}
```

#### GET /payments/transactions
**Get transaction history**
```json
Query Params:
- limit: 20
- offset: 0
- type: 'all' | 'sent' | 'received'

Response:
{
  "transactions": [ ... ],
  "total": 150
}
```

### NFT and Gaming Endpoints

#### GET /nfts/collection
**Get user's NFT collection**
```json
Response:
{
  "nfts": [
    {
      "id": "uuid",
      "contract_address": "0x...",
      "token_id": "123",
      "name": "ENGIConnect Badge",
      "image_url": "ipfs://...",
      "attributes": { ... }
    }
  ]
}
```

#### GET /achievements
**Get user achievements**
```json
Response:
{
  "achievements": [
    {
      "id": "uuid",
      "type": "message_count",
      "title": "Chat Master",
      "description": "Sent 1000 messages",
      "points": 100,
      "nft_minted": true,
      "nft_contract": "0x..."
    }
  ],
  "total_points": 1250
}
```

#### POST /gaming/verify-achievement
**Verify and mint achievement NFT**
```json
Request:
{
  "achievement_type": "community_join",
  "proof_data": { ... }
}

Response:
{
  "achievement_id": "uuid",
  "nft_minted": true,
  "tx_hash": "0x..."
}
```

## Real-time Features

### WebSocket Events

#### Connection
```javascript
// Client connects with JWT token
const socket = io('wss://api.engiconnect.com', {
  auth: { token: 'jwt_token' }
});
```

#### Chat Events
```javascript
// Join chat room
socket.emit('join_chat', { chat_id: 'uuid' });

// Listen for new messages
socket.on('new_message', (message) => {
  // Handle incoming message
});

// Send message
socket.emit('send_message', {
  chat_id: 'uuid',
  content: 'Hello!',
  content_type: 'text'
});

// Typing indicators
socket.emit('typing_start', { chat_id: 'uuid' });
socket.on('user_typing', (data) => {
  // Show typing indicator
});
```

#### Community Events
```javascript
// Join community room
socket.emit('join_community', { community_id: 'uuid' });

// Listen for member updates
socket.on('member_joined', (member) => {
  // Update member count
});

// Listen for community announcements
socket.on('community_announcement', (announcement) => {
  // Show notification
});
```

#### Gaming Events
```javascript
// Join game room
socket.emit('join_game', { game_id: 'uuid' });

// Listen for game updates
socket.on('game_state_update', (state) => {
  // Update game UI
});

// Send game action
socket.emit('game_action', {
  game_id: 'uuid',
  action: 'move',
  data: { x: 10, y: 20 }
});
```

## Blockchain Integration

### Smart Contract Events
```javascript
// Listen for contract events
const contract = new Contract(abi, address, provider);

contract.on('Transfer', (from, to, amount) => {
  // Handle token transfers
});

contract.on('CommunityAccessGranted', (user, community) => {
  // Update user permissions
});
```

### RPC Endpoints
```javascript
// Get token balance
const balance = await provider.call({
  contractAddress: tokenAddress,
  entrypoint: 'balanceOf',
  calldata: [userAddress]
});

// Verify NFT ownership
const owner = await provider.call({
  contractAddress: nftContract,
  entrypoint: 'ownerOf',
  calldata: [tokenId]
});
```

## File Storage (IPFS)

### Upload File
```javascript
const uploadToIPFS = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PINATA_JWT}`
    },
    body: formData
  });

  const result = await response.json();
  return `ipfs://${result.IpfsHash}`;
};
```

### Access File
```javascript
const getIPFSUrl = (ipfsHash) => {
  return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
};
```

## Security & Authentication

### JWT Token Structure
```json
{
  "sub": "user_uuid",
  "wallet_address": "0x...",
  "iat": 1640995200,
  "exp": 1641081600,
  "permissions": ["read", "write", "admin"]
}
```

### API Security
- Rate limiting: 100 requests/minute per user
- CORS configuration for mobile app
- Input validation and sanitization
- SQL injection prevention
- XSS protection

### Encryption
- End-to-end encryption for private messages
- AES-256 for data at rest
- TLS 1.3 for all API communications
- Secure key exchange protocols

## Deployment & Scaling

### Infrastructure
- **Frontend**: Vercel (React Native Web)
- **API**: Railway/Railway (Node.js)
- **Database**: Supabase (PostgreSQL)
- **Cache**: Redis on Railway
- **File Storage**: IPFS + Pinata
- **CDN**: Cloudflare

### Environment Variables
```env
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...
PINATA_API_KEY=...
PINATA_SECRET_KEY=...
STARKNET_RPC_URL=https://...
JWT_SECRET=...
REDIS_URL=redis://...
```

### Monitoring
- Application logs: Railway logs
- Performance monitoring: Vercel Analytics
- Error tracking: Sentry
- Database monitoring: Supabase dashboard

### Scaling Strategy
- Horizontal scaling for API servers
- Database read replicas
- Redis clustering for cache
- CDN for static assets
- Auto-scaling based on load

## Error Handling

### Standard Error Response
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "reason": "Invalid email format"
    }
  }
}
```

### Error Codes
- `AUTHENTICATION_ERROR`: Invalid credentials
- `AUTHORIZATION_ERROR`: Insufficient permissions
- `VALIDATION_ERROR`: Invalid input
- `NOT_FOUND`: Resource not found
- `RATE_LIMITED`: Too many requests
- `BLOCKCHAIN_ERROR`: Smart contract interaction failed
- `NETWORK_ERROR`: External service unavailable

## Testing

### API Testing
```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

### Load Testing
```bash
# Use Artillery for load testing
artillery run load-test.yml

# Test real-time messaging
artillery run websocket-test.yml
```

## Conclusion

This backend architecture provides a robust foundation for ENGIConnect, supporting real-time social features, blockchain integration, and scalable user growth. The hybrid approach balances performance, security, and development velocity while maintaining Web3 principles of decentralization and user ownership.