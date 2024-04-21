const axios = require("axios");

exports.handler = async (event) => {
  const { code } = event.queryStringParameters;

  try {
    // Exchange authorization code for access token
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: "client_id",
      client_secret: "client_secret",
      code,
      grant_type: "authorization_code",
    });

    const { access_token, id_token } = response.data;

    // Perform additional operations (e.g., validate token, fetch user information)

    return {
      statusCode: 200,
      body: JSON.stringify({ access_token, id_token }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
