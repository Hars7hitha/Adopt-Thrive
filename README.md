# Adopt & Thrive

A web application for pet adoption and rescue management. Connect with your perfect pet today!

## Features

- **Pet Listings**: Browse available pets for adoption
- **Pet Submission**: Submit pets for adoption
- **User Authentication**: Secure login system
- **Pet Gallery**: View detailed pet profiles with photos
- **Contact & FAQ**: Get in touch and find answers
- **Donation Support**: Help support our mission

## 📋 Prerequisites

- Node.js (v20 or higher)
- MongoDB (running locally or Atlas connection)
- npm

## 🚀 Installation

1. Clone the repository:

```bash
git clone https://github.com/Hars7hitha/Adopt-Thrive.git
cd Adopt-Thrive
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file (optional) for sensitive configurations:

```
MONGODB_URI=mongodb://localhost:27017/
DB_NAME=bnmit
JWT_SECRET=your_jwt_secret_here
```

## 🏃 Running the Application

Start the development server:

```bash
npm start
```

The application will be available at **http://localhost:3000**

### Backend API Endpoints

- `GET /` - Serve homepage
- `POST /submit-pet` - Submit a new pet for adoption
- `GET /available-pets` - Get all available pets
- `POST /login` - User login
- Additional routes available in server.js

