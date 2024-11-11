# Crypto Bot Contest

Welcome to the **Crypto Bot Contest** project! This application allows users to buy and send digital gifts to their friends via Telegram. The project consists of a client-side application built with Vue.js and a server-side application built with Node.js and Fastify. Additionally, it integrates with the [Crypto Pay API]([url](https://help.crypt.bot/crypto-pay-api) for handling payments.

## 🤖 Demo

👉 **[Access the Telegram Bot](https://t.me/dim_contest_bot)**

*Note: The demo application is configured to work with the Crypto Bot on the mainnet.*

## 🛠️ Technologies Used

### Client (`apps/client`)

- **Framework**: [Vue.js 3](https://vuejs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: [Reatom](https://github.com/reatomjs/reatom)
- **Routing**: [Vue Router](https://router.vuejs.org/)
- **Internationalization**: [vue-i18n](https://kazupon.github.io/vue-i18n/)
- **TMA Integration**: [@telegram-apps/sdk-vue](https://docs.telegram-mini-apps.com/docs/libraries/sdks/vue) - Vue.js SDK for Telegram Mini Apps
- **Storybook**: [Storybook for Vue 3](https://storybook.js.org/docs/vue/get-started/introduction)
- **Type Checking**: [TypeScript](https://www.typescriptlang.org/)
- **Testing & Linting**: ESLint, Prettier

### Server (`apps/server`)

- **Runtime**: [Node.js](https://nodejs.org/) (v20.x)
- **Framework**: [Fastify](https://www.fastify.io/)
- **Telegram Bot**: [Grammy](https://grammy.dev/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Type Checking**: [TypeScript](https://www.typescriptlang.org/)
- **Process Management**: [PM2](https://pm2.keymetrics.io/)
- **Payment Integration**: [Crypto Pay API](https://cryptopay.me/)
- **Utilities**: dotenv for environment variables, certbot for SSL certificates

### Monorepo Management

- **Tool**: [Turbo](https://turbo.build/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📋 Functionality

The Crypto Bot Contest application offers the following features:

1. **User Authentication**: Users authenticate via Telegram.
2. **Gift Store**: Browse and purchase digital gifts.
3. **Own Gifts**: View and manage purchased gifts.
4. **Gift Sending**: Send gifts to friends on Telegram.
5. **Notifications**: Receive notifications for gift purchases and deliveries.
6. **Event History**: View recent actions and events.
7. **Leaderboard**: Track top gift senders and receivers.

### 🛍️ Adding a New Gift

To add a new gift to the store, follow these steps:

1. **Define the Gift Metadata**:
   
   Locate the `apps/server/src/hooks/seed-db.ts` file. This file contains the initial set of gifts added to the database during the seeding process.

2. **Add the Gift to the Seed Data**:
   
   Add a new object to the `GIFTS` array with the following structure:
   
   ```json
   {
     "id": 8,
     "name": "New Gift Name",
     "totalQty": 5000,
     "soldQty": 0,
     "img": "gift-new-gift-image",
     "price": {
       "amount": 15,
       "asset": "TON"
     },
     "accentColor": "#123456"
   }
   ```
   
   - **id**: Unique identifier for the gift.
   - **name**: Name of the gift.
   - **totalQty**: Total quantity available.
   - **soldQty**: Quantity already sold (initialize to `0`).
   - **img**: Image identifier corresponding to the gift's image file.
   - **price**: Price details.
     - **amount**: Cost of the gift.
     - **asset**: Currency type (`TON`, `ETH`, `USDT`).
   - **accentColor**: Hex color code for UI accents related to the gift.

3. **Deploy the Changes**:
   
   After adding the new gift to the seed data, deploy the server to initialize the new gift in the database.

4. **Verify on Client**:
   
   Once deployed, the new gift should appear in the gift store on the client application.

### 🎁 Sending Gifts

To send a gift to a friend, follow these steps:

1. **Access Your Gifts**:
   - Navigate to the "Gifts" section in the navigation menu
   - You'll see a list of gifts you've purchased but haven't sent yet

2. **Send via Inline Query**:
   - Open any Telegram chat where you want to send the gift
   - Type `@your_bot_username` followed by a space
   - You'll see a list of your available gifts
   - Select the gift you want to send
   - The recipient will receive a notification about the gift

3. ~~Alternative Method~~ **NOT IMPLEMENTED**:
   - From the "Gifts" section, click the "Send" button next to the gift
   - Select a contact from your Telegram contacts list
   - Confirm sending the gift

When a gift is sent, both you and the recipient will receive notifications.

## 🚀 Deployment

### Prerequisites

- **Server**:
  - Node.js (v20.x)
  - MongoDB instance with appropriate credentials
  - Domain with SSL certificates (managed via Certbot)
  - PM2 for process management

- **Client**:
  - Node.js (v20.x)
  - Vite configured for production builds

### Environment Variables

#### Server (`apps/server/.env`)

Create a `.env` file in the `apps/server` directory with the following variables:

```env
CRYPTO_PAY_TOKEN=your_crypto_pay_token
CRYPTO_PAY_API_URL=https://api.cryptopay.me
BOT_TOKEN=your_telegram_bot_token
WEB_APP_URL=https://your-web-app-url.com
MINI_APP_URL=https://your-mini-app-url.com
DB_REPLICAS_SET=your_db_replica_set
DB_NAME=your_db_name
DB_USER=your_db_username
DB_PASS=your_db_password
DB_CERT_PATH=/path/to/your/db_certificate.pem
DB_HOST=your_db_host
```

- **CRYPTO_PAY_TOKEN**: Token provided by Crypto Pay for API access.
- **CRYPTO_PAY_API_URL**: Base URL for Crypto Pay API.
- **BOT_TOKEN**: Telegram bot token.
- **WEB_APP_URL**: URL where the client application is hosted.
- **MINI_APP_URL**: URL for the mini-app integration.
- **DB_REPLICAS_SET**: MongoDB replica set name.
- **DB_NAME**: Name of the MongoDB database.
- **DB_USER**: MongoDB username.
- **DB_PASS**: MongoDB password.
- **DB_CERT_PATH**: Path to MongoDB SSL certificate.
- **DB_HOST**: MongoDB host address.

#### Client (`apps/client/.env`)

Create a `.env` file in the `apps/client` directory with necessary variables (if applicable).

### Steps to Deploy

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/crypto-bot-contest.git
   cd crypto-bot-contest
   ```

2. **Install Dependencies**:

   ```bash
   pnpm install
   ```

3. **Build the Project**:

   ```bash
   pnpm build
   ```

4. **Set Up Environment Variables**:
   
   Ensure that the `.env` files for both `client` and `server` are correctly configured as described above.

5. **Deploy the Server**:
   
   A deployment script is provided at `apps/server/deploy.sh`. Ensure it has execute permissions and run it:

   ```bash
   chmod +x apps/server/deploy.sh
   ./apps/server/deploy.sh
   ```

6. **Start the Server**:
   
   PM2 will manage the server processes automatically. Verify the status with:

   ```bash
   pm2 status
   ```

7. **Host the Client Application**:
   
   Serve the `apps/client/dist` directory using a web server of your choice (e.g., Nginx, Apache).

### Obtaining SSL Certificates

Automate SSL certificate acquisition using Certbot with the provided `apps/server/prepare-vm.sh` script:

```bash
chmod +x apps/server/prepare-vm.sh
./apps/server/prepare-vm.sh
```

This script installs necessary packages, sets up Node.js, installs PM2, and obtains SSL certificates for your domain.

## 📝 TODOs

- [ ] **Clean up styles**:
  - during development lots of style declarations for offsets were added to the project need to clean them up

- [ ] **Enhance UX Animations**:
  - Add smooth animations for gift purchases
  - Implement animated page transitions
  - Add animations for loaders and skeletons

- [ ] **Expand Gift Features**:
  - Implement scheduled gift delivery
  - Add option to attach messages to gifts

- [ ] **Testing**:
  - Add tests for Reatom stores
  - Implement component tests
  - Set up E2E tests for critical user scenarios

- [ ] **Improve Error Handling**:
  - Create a unified error display component
  - Implement automatic retry for failed requests
  - Add detailed client-side error logging

## 📚 Additional Resources

- [Fastify Documentation](https://www.fastify.io/docs/latest/)
- [Vue.js Documentation](https://vuejs.org/v2/guide/)
- [Reatom Documentation](https://reatom.js.org/)
- [Grammy Telegram Bot Framework](https://grammy.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Crypto Pay API Documentation](https://cryptopay.me/documentation)
- [Telegram Mini Apps Documentation](https://docs.telegram-mini-apps.com/)

---
