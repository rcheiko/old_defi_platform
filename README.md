# Nuxt 3 Minimal Starter
 
Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## Env Variables
To deploy the project

```
CHAIN_ID
LDG_CONTRACT_ADDRESS
LDG_TOKEN_ADDRESS
USDC_TOKEN_ADDRESS
PROVIDER_WEBSOCKET
API_KEY_FIREBASE
```

```
# The address of the network
Example : 0x13881 is the test net of mumbai network - we will have polygon network when the project will be in production
- CHAIN_ID
  
# The address of the ledgity contract
- LDG_CONTRACT_ADDRESS
  
# The address of the ledgity token
- LDG_TOKEN_ADDRESS
  
# The address of the usdc token
- USDC_TOKEN_ADDRESS
  
# The provider that will simulate a metamask provider you can have it on : https://dashboard.alchemy.com/
- PROVIDER_WEBSOCKET

# The api key where the data of all chart / user has been stored
- API_KEY_FIREBASE

# server/lib/index.ts
- Firestore information need to be filled

# assets/images - public/assets
- need to be filled
```
