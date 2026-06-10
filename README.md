# Adopt & Thrive

A web application for pet adoption and rescue management. Connect with your perfect pet today!

## 🐾 Features

- **Pet Listings**: Browse available pets for adoption
- **Pet Submission**: Submit pets for adoption
- **User Authentication**: Secure login system
- **Pet Gallery**: View detailed pet profiles with photos
- **Contact & FAQ**: Get in touch and find answers
- **Donation Support**: Help support our mission

## 🛠️ Tech Stack

**Frontend:**

- HTML5
- CSS3
- Bootstrap 5.3.3
- React 18.3.1
- React Bootstrap 2.10.4

**Backend:**

- Node.js with Express.js
- MongoDB
- JWT Authentication
- Multer for file uploads
- CORS enabled

**Additional Tools:**

- Bcrypt for password hashing
- Nodemon for development

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

## 📁 Project Structure

```
Adopt-Thrive/
├── public/               # Frontend static files
│   ├── index.html
│   ├── about-us.html
│   ├── available-pets.html
│   ├── contact-us.html
│   ├── donate.html
│   ├── faq.html
│   ├── login.html
│   └── submit-pet.html
├── uploads/              # User uploaded pet photos
├── server.js             # Express server configuration
├── package.json          # Dependencies
└── README.md            # This file
```

## 🔐 Security Notes

- JWT secret should be changed in production
- Use environment variables for sensitive data
- Implement proper input validation
- Enable HTTPS in production
- Keep dependencies updated

## 🤝 Contributing

Feel free to fork this repository and submit pull requests for improvements.

## 📝 License

This project is open source and available under the MIT License.

## 💬 Support

For support, please open an issue on the GitHub repository or contact us through the Contact Us page.

---

**Made with ❤️ for pet lovers everywhere**
