# Event-hosting

## Introduction

This project is an event-hosting application designed to manage and organize events efficiently. The frontend is built with modern web technologies, and the backend is powered by a database with Prisma as the ORM.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- Prisma installed globally (`npm install -g prisma`)
- A database (PostgreSQL, MySQL, etc.) and its connection URL

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/rahul-MyGit/event-hosting.git
cd event-hosting
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Create a .env File at the Root

Create a .env file in the root directory of the project and add the following environment variables. Replace the placeholder values with your actual configuration.

```sh
DATABASE_URL='your-database-url'
PORT=3000
JWT_SECRET='your-secret-key'
NODE_ENV=development
```

### 4. Generate Prisma Client

Run the following command to apply migrations and generate the Prisma client.

```sh
npx prisma migrate dev
```

### 5. Build the Frontend

To build the frontend assets, run:

```sh
npm run build
```

### 6. Start the Application

Finally, start the development server with:

```sh
Copy code
npm run dev
```

### 6. Usage

Once the server is running, you can access the application at `http://localhost:3000`
