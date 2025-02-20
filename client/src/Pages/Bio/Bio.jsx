import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../Context/AuthContext";
import Marquee from "react-fast-marquee";

const Bio = () => {
  const [operator, setOperator] = useState(""); // State to store selected operator
  const [number, setNumber] = useState(""); // State to store input number
  const { refresh, setRefresh, balance } = useAuthContext();
  const [Balance, setBalance] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch("/api/balance");
        const data = await response.json();
        setBalance(data);
      } catch (error) {
        console.error("Error fetching balance:", error.message);
      }
    };
    fetchBalance();
  }, []);
  // Function to handle select option change
  const handleOperatorChange = (e) => {
    setOperator(e.target.value);
  };

  // Function to handle input number change
  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    // Do something with the selected operator and input number, like submitting to a server
    const category = "bio";
    const formData = {
      operator,
      number,
      category,
    };

    if (balance < Balance.bioBalance) {
      setLoading(false);
      toast.error("Insufficient balance!");
    } else {
      setLoading(true);
      fetch("/api/apply/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          fetch("/api/users/update-balance-bio", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              toast.success("Order placed successfully!");
              setRefresh(!refresh);
              window.location.href = "/my-order";
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error:", error);
              toast.error("Something went wrong!");
            });
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Something went wrong!");
        });
    }
  };
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">বায়োমেট্রিক Form</h2>
      <Marquee>
        <h2 className="mb-4 text-xl font-bold">
          💢আপনার একাউন্ট থেকে {Balance.bioBalance}tk কেটে নেয়া হবে ।💢
        </h2>
      </Marquee>
      <div className="max-w-md mx-auto">
        <form
          onSubmit={handleSubmit}
          className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="operator"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Select Operator
            </label>
            <select
              id="operator"
              name="operator"
              required
              value={operator}
              onChange={handleOperatorChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            >
              <option value="">Select an operator</option>
              <option value="রবি">রবি</option>
              <option value="এয়ারটেল">এয়ারটেল</option>
              <option value="GP">GP</option>
              <option value="Banglalink">Banglalink</option>
              <option value="Teletalk">Teletalk</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="number"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Enter Number
            </label>
            <input
              type="text"
              id="number"
              name="number"
              value={number}
              required
              onChange={handleNumberChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter your number"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded disabled:bg-blue-800 hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Bio;
