# Exchange Monitor

Exchange Monitor is a web application for monitoring the USD to UAH exchange rate. The application also allows users to subscribe to rate updates via email.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Database Migrations](#database-migrations)
- [Docker](#docker)

## Prerequisites

1. **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

2. **MongoDB**: Make sure MongoDB is installed and running on your local machine or accessible via a URI. You can download MongoDB from [mongodb.com](https://www.mongodb.com/).

3. **Docker** (optional): If you prefer using Docker, ensure Docker and Docker Compose are installed. You can download Docker from [docker.com](https://www.docker.com/).

## Installation

1. Clone the repository:
    git clone https://github.com/taniaomelko/exchange-monitor.git
    cd exchange-monitor

2. Install dependencies:
    npm install

## Configuration

1. Use a `.env.example` file to create `.env` in the root directory of the project. Replace the placeholders for email and password with your actual values:
    _EMAIL: Replace your-email@gmail.com with your actual email address.
    _EMAIL_PASSWORD: Replace your-email-password with your actual email password.

## Usage

1. Start MongoDB.

2. Start the application in development mode:
    npm run dev

3. Start the application in production mode:
    npm start

## Database Migrations

Migrations are automatically applied when the server starts. This ensures that your database schema is always up to date.

## Docker

If you prefer to use Docker for running the application, follow these steps:

1. Ensure Docker and Docker Compose are installed on your machine. You can download Docker from [docker.com](https://www.docker.com/).

2. Build the Docker containers:
    docker-compose build

3. Start the Docker containers:
    docker-compose up

4. Stop the Docker containers:
    docker-compose down

Using Docker simplifies the setup process by containerizing the application and its dependencies, making it easier to manage and deploy.
