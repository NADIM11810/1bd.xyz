import axios from "axios";
import globals from "node-global-storage";

const generateInvoiceNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

let userIdValue;

export const createPayment = async (req, res) => {
  const invoiceNumber = generateInvoiceNumber();

  try {
    const { userId, amount } = req.body;

    userIdValue = userId;

    const { data } = await axios.post(
      process.env.bkash_create_payment_url,
      {
        mode: "0011",
        payerReference: " ",
        callbackURL: `${process.env.server_url}/api/bkash/callback`,
        amount: amount,
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: "Inv" + invoiceNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: globals.getValue("id_token"),
          "X-App-Key": process.env.bkash_app_key,
        },
      }
    );

    res.status(200).json({ bkashURL: data.bkashURL });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Failed to create bKash payment",
    });
  }
};

export const paymentCallback = async (req, res) => {
  const { paymentID, status } = req.query;

  if (status === "cancel" || status === "failure") {
    return res.redirect(
      `${process.env.frontend_url}/recharge?status=${status}`
    );
  }

  if (status === "success") {
    try {
      const { data } = await axios.post(
        process.env.bkash_execute_payment_url,
        { paymentID },
        {
          headers: {
            Accept: "application/json",
            Authorization: globals.getValue("id_token"),
            "X-App-Key": process.env.bkash_app_key,
          },
        }
      );

      if (data && data.statusCode === "2029") {
        return res.redirect(
          `${process.env.frontend_url}/recharge?status=error2029`
        );
      }

      if (data && data.statusCode === "9999") {
        return res.redirect(
          `${process.env.frontend_url}/recharge?status=error9999`
        );
      }

      if (data && data.statusCode === "2117") {
        return res.redirect(
          `${process.env.frontend_url}/recharge?status=error2117`
        );
      }

      if (data?.transactionStatus === "Completed") {
        try {
          const updateResponse = await axios.put(
            `${process.env.server_url}/api/users/update-user-balance`,
            {
              userId: userIdValue,
              amount: data.amount,
            }
          );

          if (!updateResponse.data.success) {
            return res.redirect(
              `${process.env.frontend_url}/recharge?status=updateError`
            );
          }
        } catch (updateError) {
          console.error("Balance update error:", updateError);
          return res.redirect(
            `${process.env.frontend_url}/recharge?status=updateError`
          );
        }
      }

      return res.redirect(
        `${process.env.frontend_url}/recharge?status=${status}`
      );
    } catch (error) {
      console.error("Payment execution error:", error);
      return res.redirect(
        `${process.env.frontend_url}/recharge?status=failure`
      );
    }
  }
};
