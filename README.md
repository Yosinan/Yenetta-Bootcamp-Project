# Yenetta Code Bootcamp Project 

This is a MERN (MongoDB, Express.js, React, Node.js) project that allows you to perform CRUD operations on products. The project consists of both the frontend and backend components.

## Project Overview

- **Frontend**: The frontend is built using React and provides a user interface for interacting with product data.
- **Backend**: The backend is built using Node.js and Express.js, serving as the API for creating, reading, updating, and deleting product information.
- **Database**: MongoDB is used as the database to store product data.

## Getting Started

### Prerequisites

- **Node.js**: Make sure you have Node.js installed on your machine.
- **MongoDB**: You need a running MongoDB server. You can install it locally or use a cloud-based MongoDB service.

### Installation

1. Clone the repository:

   ```bash
   git clone  https://github.com/Yosinan/Yenetta-Bootcamp-Project.git
   cd <project-directory>


    ```

2. Install dependencies for both the frontend and backend.

    ```bash
    cd client
    npm install
    cd ../api
    npm install
    ```
3. Configure environment variables:

    Create a .env file and set the MongoDB connection string and PORT number:
    
    ```bash
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/your-database-name
    
    ```
4. Start the development servers:

    ```bash
    cd client
    npm start
    cd ../api
    npm start
    ```

    The frontend server will start at http://localhost:3000 and 
    the backend server will start at http://localhost:5000 or 
    the port specified in your .env file.

## Built With

- React.js
- Node.js
- Express.js
- MongoDB
- Bootstrap
- Axios

## Author
Yoseph Zewdu

## License
This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Bootstrap](https://getbootstrap.com/)



