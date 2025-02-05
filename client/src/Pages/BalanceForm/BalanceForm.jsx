import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BalanceForm = () => {
  const [nidBalance, setNidBalance] = useState("");
  const [serverBalance, setServerBalance] = useState("");
  const [birthBalance, setBirthBalance] = useState("");
  const [tinBalance, setTinBalance] = useState("");
  const [bioBalance, setBioBalance] = useState("");
  const [roshidBalance, setRoshidBalance] = useState("");
  const [editRoshidBalance, setEditRoshidBalance] = useState("");
  const [balance, setBalance] = useState({});
  const [loading, setLoading] = useState(true);

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
  }, [loading]);

  const handleNidBalanceUpdate = async () => {
    // Add logic to update NID balance
    console.log("Updating NID balance:", nidBalance);
    try {
      const response = await fetch("/api/balance/update-nid-balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nidBalance }),
      });
      const data = await response.json();
      toast.success("NID Balance updated successfully!");
      setLoading(!loading);
    } catch (error) {
      console.error("Error updating NID balance:", error.message);
      toast.error("Something went wrong while updating NID Balance!");
    }
  };

  const handleServerBalanceUpdate = async () => {
    try {
      const response = await fetch("/api/balance/update-server-balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serverBalance }),
      });
      const data = await response.json();
      toast.success("Server Balance updated successfully!");
      setLoading(!loading);
    } catch (error) {
      console.error("Error updating Server balance:", error.message);
      toast.error("Something went wrong while updating Server Balance!");
    }
  };

  const handleBirthBalanceUpdate = async () => {
    try {
      const response = await fetch("/api/balance/update-birth-balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ birthBalance }),
      });
      const data = await response.json();
      toast.success("Birth Balance updated successfully!");
      setLoading(!loading);
    } catch (error) {
      console.error("Error updating Birth balance:", error.message);
      toast.error("Something went wrong while updating Birth Balance!");
    }
  };

  const handleTinBalanceUpdate = async () => {
    try {
      const response = await fetch("/api/balance/update-tin-balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tinBalance }),
      });
      const data = await response.json();
      toast.success("Tin Balance updated successfully!");
      setLoading(!loading);
    } catch (error) {
      console.error("Error updating Tin balance:", error.message);
      toast.error("Something went wrong while updating Tin Balance!");
    }
  };

  const handleBioBalanceUpdate = async () => {
    // Add logic to update bio balance
    console.log("Updating Bio balance:", bioBalance);
    try {
      const response = await fetch("/api/balance/update-bio-balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bioBalance }),
      });
      const data = await response.json();
      toast.success("Bio Balance updated successfully!");
      setLoading(!loading);
    } catch (error) {
      console.error("Error updating Bio balance:", error.message);
      toast.error("Something went wrong while updating Bio Balance!");
    }
  };

  const handleRoshidBalanceUpdate = async () => {
    try {
      const response = await fetch("/api/balance/update-roshid-balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roshidBalance }),
      });
      const data = await response.json();
      toast.success("Roshid Balance updated successfully!");
      setLoading(!loading);
    } catch (error) {
      console.error("Error updating Roshid balance:", error.message);
      toast.error("Something went wrong while updating Roshid Balance!");
    }
  };

  const handleEditRoshidBalance = async () => {
    try {
      const response = await fetch("/api/balance/update-edit-roshid-balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ editRoshidBalance }),
      });
      const data = await response.json();
      toast.success("Roshid Balance updated successfully!");
      setLoading(!loading);
    } catch (error) {
      console.error("Error updating Roshid balance:", error.message);
      toast.error("Something went wrong while updating Roshid Balance!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="flex items-center justify-center bg-gray-200 ">
        <div className="p-8 bg-white rounded-md shadow-md">
          <div>
            <h2 className="mb-2 text-lg font-semibold">Balance:</h2>
            <ul className="pl-5 list-disc">
              <li>nidBalance: {balance.nidBalance}</li>
              <li>serverBalance: {balance.serverBalance}</li>
              <li>birthBalance: {balance.birthBalance}</li>
              <li>tinBalance: {balance.tinBalance}</li>
              <li>bioBalance: {balance.bioBalance}</li>
              <li>roshidBalance: {balance.roshidBalance}</li>
              <li>editRoshidBalance: {balance.editRoshidBalance}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-10 my-10 lg:grid-cols-2 md:grid-cols-1">
        <div>
          <input
            type="text"
            className="p-2 mb-4 border border-gray-400 rounded-md"
            placeholder="Enter NID Balance"
            value={nidBalance}
            onChange={(e) => setNidBalance(e.target.value)}
          />
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={handleNidBalanceUpdate}
          >
            Update NID Balance
          </button>
        </div>
        <div>
          <input
            type="text"
            className="p-2 mt-4 border border-gray-400 rounded-md"
            placeholder="Enter Server Balance"
            value={serverBalance}
            onChange={(e) => setServerBalance(e.target.value)}
          />
          <button
            className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={handleServerBalanceUpdate}
          >
            Update Server Balance
          </button>
        </div>
        <div>
          <input
            type="text"
            className="p-2 mt-4 border border-gray-400 rounded-md"
            placeholder="Enter Birth Balance"
            value={birthBalance}
            onChange={(e) => setBirthBalance(e.target.value)}
          />
          <button
            className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={handleBirthBalanceUpdate}
          >
            Update Birth Balance
          </button>
        </div>
        <div>
          <input
            type="text"
            className="p-2 mt-4 border border-gray-400 rounded-md"
            placeholder="Enter Tin Balance"
            value={tinBalance}
            onChange={(e) => setTinBalance(e.target.value)}
          />
          <button
            className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={handleTinBalanceUpdate}
          >
            Update Tin Balance
          </button>
        </div>
        <div>
          <input
            type="text"
            className="p-2 mt-4 border border-gray-400 rounded-md"
            placeholder="Enter Bio Balance"
            value={bioBalance}
            onChange={(e) => setBioBalance(e.target.value)}
          />
          <button
            className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={handleBioBalanceUpdate}
          >
            Update Bio Balance
          </button>
        </div>
        <div>
          <input
            type="text"
            className="p-2 mt-4 border border-gray-400 rounded-md"
            placeholder="Enter Roshid Balance"
            value={roshidBalance}
            onChange={(e) => setRoshidBalance(e.target.value)}
          />
          <button
            className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={handleRoshidBalanceUpdate}
          >
            Update Roshid Balance
          </button>
        </div>
        <div>
          <input
            type="text"
            className="p-2 mt-4 border border-gray-400 rounded-md"
            placeholder="Enter Roshid Balance"
            value={editRoshidBalance}
            onChange={(e) => setEditRoshidBalance(e.target.value)}
          />
          <button
            className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={handleEditRoshidBalance}
          >
            Update Edit Roshid Balance
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceForm;
