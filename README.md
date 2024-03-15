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

Detailed instructions for configuring both local and cloud (MongoDB Atlas) databases.
