import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../../Context/AuthContext";

const Recharge = () => {
  const [amount, setAmount] = useState("");
  const { authUser } = useAuthContext();

  const queryParams = new URLSearchParams(window.location.search);
  useEffect(() => {
    const status = queryParams.get("status");
    if (status === "success") {
      toast.success("Recharge successful!");
    } else if (status === "failure") {
      toast.error("Recharge failed! Please try again.");
    } else if (status === "cancel") {
      toast.error("Recharge cancelled!");
    } else if (status === "error2029") {
      toast.error("Duplicate transaction! Please try with different amount.");
    } else if (status === "error9999") {
      toast.error("Internal server error from Bkash! Please try again.");
    } else if (status === "error2117") {
      toast.error(
        "Payment execution already been called before! Please try again."
      );
    } else if (status === "updateError") {
      toast.error("Errors in updating balance! Please contact Admin.");
    }
  }, [queryParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amount < 110) {
      toast.error("Minimum recharge amount is 110!");
    } else {
      const { data } = await axios.post(
        "/api/bkash/create-payment",
        {
          userId: authUser._id,
          amount,
        },
        { withCredentials: true }
      );
      window.location.href = data.bkashURL;
      setAmount("");
    }

    console.log("Recharge with bKash clicked");
  };
  return (
    <div>
      <div className="max-w-md mx-auto my-10">
        <div>
          <h4 className="text-center">
            এ্যাকাউন্ট রিচার্জ এর জন্য রিচার্জের পরিমান ইংরেজিতে লিখে recharge
            অপশনে ক্লিক দিবেন, অটো টাকা এড হবে
          </h4>
        </div>
        <div>
          <h2 className="mt-4 text-center text-white bg-red-500">
            {" "}
            সর্বনিম্ন রির্চাজ 110{" "}
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
        >
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="amount"
            >
              Amount
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="amount"
              type="text"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Recharge With Bkash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Recharge;
