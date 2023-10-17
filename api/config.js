require("dotenv").config();

// configure env variables (DB_URI & PORT )

const { DB_URI, PORT } = process.env;
module.exports = {
    PORT, DB_URI
};
