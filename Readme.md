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

Distributes tasks equally among all the agents with help robin algorithm

Handles cases where the total number of tasks is not evenly divisible by the number of agents

Stores distributed lists in MongoDB

Displays assigned lists on the frontend

# Tech Stack

1. Frontend

React.js (with Redux Toolkit for state management)

Tailwind CSS for styling

2. Backend

Node.js + Express.js (RESTful API)

MongoDB (Database)

Mongoose (ODM for MongoDB)

JWT for authentication

3. Other Dependencies

Multer (for CSV file handling)

csv-parser (for parsing CSV files)

Bcrypt (for password hashing)
