# Yenetta Code Bootcamp Project - Backend

This is the backend part of a MERN (MongoDB, Express.js, React, Node.js) project for performing CRUD operations on products. The backend provides the API for creating, reading, updating, and deleting product information.

## Getting Started

### Prerequisites

- **Node.js:** Make sure you have Node.js installed on your machine.
- **MongoDB:** You need a running MongoDB server. You can install it locally or use a cloud-based MongoDB service.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Yosinan/Yenetta-Bootcamp-Project.git
   cd api

    ```
2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure environment variables:

 Create a .env file and set the MongoDB connection string and PORT number:

    ```bash
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/your-database-name
    ```

4. Start the server:

    ```bash
    npm start
    ```

    The backend server will start at http://localhost:5000 or the port specified in your .env file.

## API Endpoints
- GET api/products: Get a list of all products.
- POST api/products/add: Create a new product.
- PUT api/products/edit/:id: Update a product by ID.
- DELETE api/products/delete/:id: Delete a product by ID.

## Built With
Node.js
Express.js
MongoDB


## Author
Yoseph Zewdu
