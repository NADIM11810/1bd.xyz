import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../Context/AuthContext";
import Marquee from "react-fast-marquee";

const Tin = () => {
  const { refresh, setRefresh, balance } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [Balance, setBalance] = useState({});

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
  const [formData, setFormData] = useState({
    name: "",
    identifier: "",
    category: "tin",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (balance < Balance.tinBalance) {
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
          fetch("/api/users/update-balance-tin", {
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
      <h2 className="mb-4 text-xl font-bold">অর্ডার অফিসিয়াল সার্ভার কপি</h2>
      <Marquee>
        <h2 className="mb-4 text-xl font-bold">
          💢আপনার একাউন্ট থেকে {Balance.tinBalance}tk কেটে নেয়া হবে ।💢
        </h2>
      </Marquee>
      <div className="max-w-md mx-auto my-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">
              ENTER NID NUMBER{" "}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="identifier" className="block text-gray-700">
              DATE OF BIRTH (YYYY-MM-DD)
            </label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-white bg-blue-500 rounded-md disabled:bg-blue-800 hover:bg-blue-600"
            >
              {loading ? "Processing..." : "Order Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Tin;
