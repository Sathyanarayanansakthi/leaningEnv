# MERN Stack Project with MUI, Stripe, and MongoDB Atlas

This is a full-stack MERN (MongoDB, Express, React, Node.js) application integrated with:

- 🎨 Material UI (MUI) for UI components
- 💳 Stripe for payment processing
- 🌐 MongoDB Atlas for the database

https://leaning-env.vercel.app/

---

## 📦 Tech Stack

**Frontend:**
- React.js
- Material UI (MUI)
- Axios
- Stripe.js SDK

**Backend:**
- Node.js
- Express
- MongoDB with Mongoose
- Stripe Node SDK
- dotenv

---

## 📁 Folder Structure

your-project/
├── client/ # React frontend with MUI and Stripe
├── server/ # Node.js backend with Express + MongoDB + Stripe
└── README.md

yaml
Copy code

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
2. Configure Environment Variables
Create a .env file inside the server/ directory with the following content:

env
Copy code
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/your-db?retryWrites=true&w=majority
STRIPE_SECRET_KEY=sk_test_your_secret_key
PORT=5000
(Optional) Create a .env file inside the client/ directory:

env
Copy code
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
⚠️ Never commit .env files to version control.

3. Install Dependencies
Backend
bash
Copy code
cd server
npm install
Frontend
bash
Copy code
cd ../client
npm install
4. Run the App
Start Backend
bash
Copy code
cd server
npm start
Start Frontend
bash
Copy code
cd ../client
npm start
Frontend runs at: http://localhost:3000

Backend runs at: http://localhost:5000

💳 Stripe Integration
The backend exposes a route to create a payment intent:

bash
Copy code
POST /api/create-payment-intent
Frontend uses Stripe Elements and @stripe/react-stripe-js for collecting and processing payments.

Test Card (provided by Stripe)
yaml
Copy code
Card Number: 4242 4242 4242 4242
Expiration: Any future date
CVC: Any 3-digit number
🗄️ MongoDB Atlas Setup
Go to https://www.mongodb.com/cloud/atlas

Create a free cluster

Add a database user and set their password

Whitelist your IP address (or allow access from anywhere for development)

Copy the connection string and update .env:

ini
Copy code
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/your-db?retryWrites=true&w=majority
🔐 Environment Variables Summary
Variable Name	Location	Description
MONGO_URI	server/.env	MongoDB Atlas connection string
STRIPE_SECRET_KEY	server/.env	Stripe secret key for server
REACT_APP_STRIPE_PUBLISHABLE_KEY	client/.env	Stripe public key for frontend Stripe
