# Purora Backend

Purora Backend is a Node.js and Express REST API for user authentication, profile management, avatar upload, and admin user management. It uses MongoDB with Mongoose for persistence and JWT for protected routes.

## Features

- User registration and login
- JWT-based authentication
- Role-based access control for admin routes
- User profile retrieval
- Dashboard route for authenticated users
- Avatar upload support via Cloudinary
- Admin endpoints to view, update, and delete customer accounts

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- Cloudinary
- Multer
- CORS
- Dotenv

## Project Structure

```bash
purora_backend/
├── config/
│   ├── cloudinary.js
│   └── db.js
├── controllers/
│   ├── admin.controller.js
│   ├── auth.controller.js
│   └── user.controller.js
├── middleware/
│   ├── auth.js
│   ├── role.js
│   └── upload.js
├── models/
│   └── user.model.js
├── routes/
│   └── user.routes.js
├── .gitignore
├── package.json
├── purora_api_docs.md
├── server.js
└── README.md
```

## Prerequisites

- Node.js 20 or later
- MongoDB database
- Cloudinary account for avatar uploads

## Installation

1. Clone the repository.
2. Open the project folder.
3. Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root with the following values:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/purora
JWT_SECRET=your_jwt_secret_key
CLOUD_NAME=your_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

## Run the Server

Development mode:

```bash
npm start
```

If you use nodemon locally:

```bash
npx nodemon server.js
```

The server will start on:

```bash
http://localhost:3000
```

## API Overview

### Public Routes

- `POST /users/register` - register a new user
- `POST /users/login` - login and receive a JWT token

### Protected Routes

All protected routes require:

```http
Authorization: Bearer <token>
```

- `GET /users/profile` - fetch logged-in user profile
- `GET /users/dashboard` - fetch dashboard data
- `POST /users/avatar` - upload avatar image
- `GET /users/products` - fetch product list

### Admin Routes

- `GET /users/customers` - list all customers
- `PUT /users/customers/update/:id` - update a customer account
- `DELETE /users/customers/delete/:id` - delete a customer account

## User Model

The `User` model includes:

- `name`
- `mobile` (unique)
- `password`
- `role` (`customer` or `admin`)
- `avatar`
- timestamps (`createdAt`, `updatedAt`)

## Notes

- The project exposes a root route at `/` returning a basic health check message: `Purora API is running`.
- More detailed API examples and response formats are available in [purora_api_docs.md](purora_api_docs.md).

## License

This project is licensed under the ISC License.
