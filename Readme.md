MERN Stack Machine Test

# Overview

This project is a MERN stack application designed to handle admin login agent creation, and CSV-based task distribution among agents and application follows secure authentication practices and ensures equal distribution of tasks among agents

# Features

1. Admin Authentication (JWT + MongoDB)

Secure login system using JSON Web Tokens (JWT).

User credentials are validated with MongoDB

API endpoints are protected for authenticated users

2. Agent Management

Allows admin to create and manage agents

Each agent has name, email, and mobile number

Name

Email

Mobile Number (with country code)

Password (hashed for security) with help of bcrypt

3. CSV Upload & Task Distribution

Accepts CSV/XLSX/XLS files.

Validates the uploaded file format.

Parses the csv file and extracts data fields

FirstName (Text)

Phone (Number)

Notes (Text)

Distributes tasks equally among all the agents with help (Robin algorithm) index +

Handles cases where the total number of tasks is not evenly divisible by the number of agents

Stores distributed lists in MongoDB

Displays assigned lists on the frontend

# Tech Stack

1. Frontend

React.js (with Redux Toolkit for state management)

Tailwind CSS for styling

Notfication (Toastify)

Routing (React Router)

API calls (Axios)

2. Backend

Node.js + Express.js (RESTful API)

MongoDB (Database)

Mongoose (ODM for MongoDB)

JWT for authentication

3. Other Dependencies

Multer (for CSV file handling to store temp files)

csv-parser (for parsing CSV files)

Bcrypt (for password hashing)

strip-bom-stream() for BOM removal which means extra bytes and characters that are not part of the actual text

# Installation

1. Clone the repository:
2. Navigate to the project directory using CD command
3. Install project dependencies using NPM INSTALL
4. Start the development server using NPM RUN DEV
5. Open your browser and navigate to http://localhost:3000 to access the application

# Usage

1. There is no need to register we have admin credentials you can login with admin credentials admin@gmail.com and password admin123
2. After login you will be redirected to the dashboard where you can create agents and upload CSV files
3. You can also view the assigned tasks for each agent
4. You can also manage agents and delete them and edit them BONUS Features

# Environment Variables

1. Create a .env file in the root directory of the project
2. Add the following environment variables:
3. PORT = 9000
4. MONGO_URI = mongodb://localhost:27017/your-database-name
5. JWT_SECRET = your-secret-key
6. CLOUDINARY_CLOUD_NAME = your-cloudinary-cloud-name
7. CLOUDINARY_API_KEY = your-cloudinary-api-key
8. CLOUDINARY_API_SECRET = your-cloudinary-api-secret

# Conclusion

This MERN stack project successfully meets the requirements of the machine test by implementing secure authentication, agent management, CSV processing, and task distribution. It provides a user-friendly interface for admin users to manage agents and distribute tasks among agents.
