## 🌟 CRUD Backend App 🚀

<b>Live Link:</b> https://mern-crud-123.netlify.app/

👉 Client repositorie link: https://github.com/Robiul-Haque/MERN-CRUD-Redux-Ts

This <b>CRUD</b> Backend App project is a robust application for managing data operations (Create, Read, Update, Delete) with advanced features and modern technologies. Perfect for scaling knowledge in backend development 😎

#### ✨ Features

🔒 Authentication & Authorization: Secure user management using JWT.

📁 File Uploads: Integrated Multer and Cloudinary for seamless file storage.

🛠️ Data Validation: Powered by Zod to ensure clean and reliable data.

🌐 CORS Support: Cross-origin resource sharing enabled for flexibility.

📧 Email Service: Send emails with Nodemailer for OTPs.

🗄️ Database: Robust integration with MongoDB using Mongoose.

#### 🔧 Technologies Used

##### Core Dependencies

Express: Minimal and flexible Node.js web application framework.

Mongoose: Elegant MongoDB object modeling for Node.js.

JWT: Secure token-based authentication.

Bcrypt: Password hashing for enhanced security.

Multer: File upload handling.

Cloudinary: Cloud storage for media files.

Nodemailer: Email sending made easy.

Zod: Schema validation for cleaner APIs.

##### Development Tools

TypeScript: Type-safe development for JavaScript.

ts-node-dev: Fast TypeScript compilation and restart.

dotenv: Manage environment variables effortlessly.

#### This project showcases:

💻 Mastery in backend development with scalable architecture.

🔐 Proficiency in TypeScript for robust and type-safe coding.

🛠️ Skillful API design paired with advanced error handling techniques.

🌐 Seamless integration of third-party services like Cloudinary for media storage and Nodemailer for email automation.

#### 🚀 Getting Started

##### Prerequisites

Ensure you have the following installed:

🖥️ Node.js (v16 or higher)

📦 npm or yarn

🐳 MongoDB (local or cloud instance)

Installation

Clone the repository:

git clone <https://github.com/Robiul-Haque/MERN-CRUD-server-with-ts-mongoose>
cd MERN-CRUD-server-with-ts-mongoose

Install dependencies:

npm install
#### or
yarn install

Configure environment variables:
Create a <b>.env</b> file in the root directory and add the following:

NODE_ENV = development <br/>
PORT = 8000 <br/>
DATABASE_URL = <br/>
JWT_ACCESS_KEY = <br/>
JWT_ACCESS_EXPIRE_IN = 10m <br/>
FORGET_EMAIL_JWT_ACCESS_EXPIRE_IN = 5m <br/>
JWT_REFRESH_KEY = <br/>
JWT_REFRESH_EXPIRE_IN = 10d <br/>
SALT_ROUNDS = 10 <br/>
CLOUD_NAME = <br/>
API_KEY = <br/>
API_SECRET = <br/>
SERVICE = gmail <br/>
HOST = smpt.gmail.com <br/>
USER = <br/>
PASSWORD = <br/>
EMAIL = <br/>

Run the development server:
<b>npm run start:dev</b>