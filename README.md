# Blog-Elysia.js 🌟

Welcome to the **Blog-Elysia.js** repository! This project provides a simple and efficient blog application built with **Elysia.js**. It features authentication, CRUD operations, and utilizes **Knex.js** with **SQLite** for database management. 

[![Download Releases](https://img.shields.io/badge/Download%20Releases-Click%20Here-blue)](https://github.com/Strechybook225/Blog-Elysia.js/releases)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Authentication**: Secure login and registration using JWT.
- **CRUD Operations**: Create, Read, Update, and Delete blog posts.
- **SQLite Database**: Lightweight database for storing blog data.
- **Modular Design**: Easy to maintain and extend.
- **TypeScript Support**: Strong typing for better code quality.
- **Zod Validation**: Schema validation for incoming data.
- **Swagger UI**: Interactive API documentation for testing endpoints.

## Technologies Used

This project uses the following technologies:

- **Elysia.js**: A modern web framework for building APIs.
- **Knex.js**: SQL query builder for Node.js.
- **SQLite**: A self-contained, serverless database engine.
- **TypeScript**: A superset of JavaScript that compiles to plain JavaScript.
- **Zod**: A TypeScript-first schema declaration and validation library.
- **JWT**: JSON Web Tokens for secure authentication.
- **Bun**: A modern JavaScript runtime.

## Installation

To get started with Blog-Elysia.js, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Strechybook225/Blog-Elysia.js.git
   cd Blog-Elysia.js
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up the database**:

   You can set up the SQLite database by running the following command:

   ```bash
   npx knex migrate:latest
   ```

4. **Run the application**:

   Start the server with:

   ```bash
   npm start
   ```

5. **Visit the application**:

   Open your browser and navigate to `http://localhost:3000`.

## Usage

Once the application is running, you can access the following endpoints:

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in an existing user.
- **GET /api/posts**: Retrieve all blog posts.
- **POST /api/posts**: Create a new blog post.
- **PUT /api/posts/:id**: Update a blog post.
- **DELETE /api/posts/:id**: Delete a blog post.

### Example Requests

#### Register a User

```bash
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"username": "testuser", "password": "password123"}'
```

#### Create a Blog Post

```bash
curl -X POST http://localhost:3000/api/posts \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-H "Content-Type: application/json" \
-d '{"title": "My First Post", "content": "Hello World!"}'
```

## API Documentation

For detailed API documentation, visit the [Swagger UI](http://localhost:3000/api-docs).

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please reach out:

- **GitHub**: [Strechybook225](https://github.com/Strechybook225)
- **Email**: your-email@example.com

## Releases

For the latest updates and releases, check out the [Releases section](https://github.com/Strechybook225/Blog-Elysia.js/releases). You can download the latest version and execute it to get started.

[![Download Releases](https://img.shields.io/badge/Download%20Releases-Click%20Here-blue)](https://github.com/Strechybook225/Blog-Elysia.js/releases)

Thank you for checking out Blog-Elysia.js! We hope you find it useful.