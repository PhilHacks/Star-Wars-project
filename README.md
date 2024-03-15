# StarWars API

## Table of Contents

1. [Project Overview](#project-overview)
2. [Installation and Setup](#installation-and-setup)
3. [API Endpoints](#api-endpoints)
4. [Project Structure](#project-structure)
5. [Technologies Used](#technologies-used)
6. [Database Configuration](#database-configuration)

## Project Overview

**Project Name:** StarWars API

**Description:** The StarWars API project enables management and interaction with a collection of Star Wars characters. It includes functionalities such as adding, deleting, and swapping characters, facilitated by a React-based frontend and an Express.js backend, with data fetched from an external API and stored in a MongoDB database.

## Installation and Setup

### Prerequisites

- **Node.js:** Install from [nodejs.org](https://nodejs.org/).
- **npm (Node Package Manager):** Comes bundled with Node.js.
- **MongoDB:** For local setup, MongoDB installed on your machine. For cloud setup, a MongoDB Atlas account.
- **Git:** For version control.

### Installation Steps

Clone the repository:

```sh
git clone https://github.com/PhilHacks/node-starwars-api.git
```

#### Backend Setup

Navigate to the backend directory:

```sh
cd node-starwars-api/backend
```

Install dependencies:

```sh
npm install
```

Start the backend server:

```sh
npm start
```

#### Frontend Setup

Open a new terminal window. Navigate to the frontend directory:

```sh
cd ../swapi-frontend
```

Install dependencies:

```sh
npm install
```

Start the frontend application:

```sh
npm start
```

## API Endpoints

The backend API provides endpoints for managing characters, including:

- `GET /characters/` - Retrieve all characters.
- `POST /characters/add` - Add a new character.
- `DELETE /characters/remove/:id` - Remove a character by ID.
- `POST /characters/swap` - Swap positions of two characters.

## Project Structure

The project is structured into two main folders:

- `backend/` contains all backend-related files.
- `swapi-frontend/` contains the React frontend application.

![SWAPI App Interface](./swapi-frontend/img/swapi.png)

## Technologies Used

- Backend: Express.js, Mongoose, MongoDB.
- Frontend: React, Axios, Styled-Components.

## Database Configuration

### Connecting to MongoDB Locally

1. Ensure that MongoDB is installed on your system. If not, download and install it from the [MongoDB Download Center](https://www.mongodb.com/try/download/community).

2. Start the MongoDB service. The method varies depending on your operating system:

   - **Windows**: The MongoDB service typically starts automatically after installation.
   - **macOS/Linux**: You may need to start `mongod` manually with the following command in your terminal:
     ```shell
     mongod
     ```

3. Open MongoDB Compass, which is the official GUI for MongoDB. Connect to the default local MongoDB instance at `mongodb://localhost:27017`.

4. Create a new database for the application, for example, `mydatabase`.

5. In your project, create a `.env` file and add the following line:

   ```
   URI=mongodb://localhost:27017/mydatabase
   ```

   Replace `mydatabase` with the name of the database you created in Compass.

6. Run your Node.js application. It should now be able to connect to your local MongoDB instance using the connection string from the `.env` file.
