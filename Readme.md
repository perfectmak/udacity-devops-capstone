# Transaction's Management App

[![CircleCI](https://circleci.com/gh/perfectmak/udacity-devops-capstone.svg?style=svg)](https://circleci.com/gh/perfectmak/udacity-devops-capstone)

> This is my capstone project for the Udacity DevOps Nanodegree Program.

The Transaction Management Portal is a simple application for logging and viewing income and expense transactions
for a business.

## Project Structure

The project's frontend is build with (React)[https://reactjs.org] and backend API is a GraphQL API built with Node.js.

The project has infrastructure code to make it easy to deploy to AWS infrastructure (see the [infra](./infra) folder).

## Setup Environment
Generally, you would need Node.js (>= 12.x.x) installed on your computer to test and run any part of the application

### Frontend Setup
The frontend is a simple react application.

Change directory to the `frontend/` folder to access the frontend application code.

To run the application in dev mode, run:

```bash
npm install
npm run start
```

Depending on where the API Server is setup, you might need to set the `REACT_APP_API_URL` environment to the appropriate value.

### Backend Setup

**Setup Database**

The backend requires a PostgreSql database to run properly. For development you start a docker one using docker-compose file provided by running `docker-compose -f docker-compose-dev.yml up`.

Next, set environment variable `DB_URL` as the Postgres URL. The application would lookup this value

> Checkout the `.env.sample` for other environment variables that need to be set.

Next, run database migrations using `npm run knex migrate:latest --env development`. Change the env to `production` for production configurations (see knexfile.js for each environment configuration)

**Run the application (natively)**

To start the application for development, run:
```
npm run start
```

For production build, run the following command:

```
npm run build
npm run serve
```

By default, the application GraphQL server starts listening on port 9797 but this can be changed via the `APP` environment variable.

**Run the application (Docker)**
A `Dockerfile` is included, which wraps the backend application, builds and run the service.
You can also run the `docker-compose.yml` file to quickly build and run the Dockerfile.

## Possible Improvements
- [ ] Customer Management
- [ ] Order Management
- [ ] User and Permission Management
- [ ] Caching and other API Optimization


## LICENSE
MIT