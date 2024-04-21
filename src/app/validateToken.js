const axios = require("axios");

exports.handler = async (event) => {
  const { access_token } = JSON.parse(event.body);

  try {
    // Call Google's tokeninfo endpoint to validate the access token
    const response = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?access_token=${access_token}`
    );

    const { aud, email } = response.data;

    // Check if the audience matches your client ID and perform additional checks if necessary

    return {
      statusCode: 200,
      body: JSON.stringify({ email }),
    };
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Unauthorized" }),
    };
  }
};
