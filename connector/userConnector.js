require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
}); // Config environment

const axios = require("axios");
const uri = process.env.USER_SERVICE; // Add URI MongoDB Atlas

class UserConnector {
  getUserInfo = async (id) => {
    try {
      const response = await axios.get(`${uri}/user/` + id);
      return {
        message: response.data.message,
        data: response.data.data,
        statusCode: response.status,
      };
    } catch (error) {
      return {
        message: error.response.data.message,
        statusCode: error.response.status,
      };
    }
  };
}

module.exports = UserConnector;
