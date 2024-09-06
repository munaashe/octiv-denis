# Octiv Denis

Welcome to the Octiv Denis project! This README will guide you through the setup and running of the React application.

## Live Project

You can view the live project at [https://octiv-denis.vercel.app/](https://octiv-denis.vercel.app/).

## Setup Instructions

To get started with the Octiv Denis project, follow these steps:

### 1. Clone the Repository

First, clone the repository to your local machine using Git:

```bash
git clone https://github.com/munaashe/octiv-denis.git
cd octiv-denis
```

### 2. Create Environment File

Copy the `.env.example` file to `.env` and set up the required environment variables:

```bash
cp .env.example .env
```

Edit the `.env` file and set the `REACT_APP_BASE_URL` variable to your API base URL:

```env
REACT_APP_BASE_URL=<your-api-base-url>
```

### 3. Install Dependencies

Install the project dependencies using Yarn:

```bash
yarn install
```

### 4. Start the Development Server

Run the development server:

```bash
yarn start
```

Your application should now be running at [http://localhost:3000](http://localhost:3000).

## Additional Information

- **Scripts**: 
  - `yarn start` - Starts the development server.
  - `yarn build` - Builds the project for production.
  - `yarn test` - Runs the tests.

- **Configuration**: Make sure to update the `.env` file with the correct `REACT_APP_BASE_URL` to ensure the application can connect to the correct API endpoints.

## Contributing

If you want to contribute to this project, please fork the repository and create a pull request with your changes.

