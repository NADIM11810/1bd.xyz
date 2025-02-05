import axios from "axios";
import globals from "node-global-storage";

const bkashAuth = async (req, res, next) => {
  globals.unsetValue("id_token");
  try {
    const { data } = await axios.post(
      process.env.bkash_grant_token_url,
      {
        app_key: process.env.bkash_app_key,
        app_secret: process.env.bkash_secret_key,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          username: process.env.bkash_username,
          password: process.env.bkash_password,
        },
      }
    );

    globals.setValue("id_token", data.id_token, { protected: true });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Failed to generate bKash token",
    });
  }
};

export default bkashAuth;
