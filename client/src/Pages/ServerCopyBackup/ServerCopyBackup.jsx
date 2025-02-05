import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import Marquee from "react-fast-marquee";

const ServerCopyBackup = () => {
  const navigate = useNavigate();
  const { gender, setGender } = useAuthContext();
  const [nid, setNid] = useState("");
  const [birthday, setBirthday] = useState("");
  const { balance } = useAuthContext();
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
  const handleNidChange = (e) => {
    setNid(e.target.value);
  };

  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("NID:", nid);
    console.log("Birthday:", birthday);
    if (balance < Balance.serverBalance) {
      toast.error("Insufficient balance!");
    } else {
      navigate(`/server-copy-print-backup/${nid}/${birthday}`);
    }
  };
  const handlev2 = () => {
    if (balance < Balance.serverBalance) {
      toast.error("Insufficient balance!");
    } else {
      navigate(`/server-copy-v2-backup/${nid}/${birthday}`);
    }
  };
  return (
    <div>
      <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">Enter NID and Birthday</h2>
        <Marquee>
          <h2 className="text-xl font-bold mb-4">
            💢আপনার একাউন্ট থেকে {Balance.serverBalance}tk কেটে নেয়া হবে ।💢
          </h2>
        </Marquee>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nid" className="block text-gray-700">
              NID Number:
            </label>
            <input
              type="text"
              id="nid"
              value={nid}
              onChange={handleNidChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Enter NID Number"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="birthday" className="block text-gray-700">
              Birthday:
            </label>
            <input
              type="text"
              id="birthday"
              value={birthday}
              onChange={handleBirthdayChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="YYYY-MM-DD"
            />
          </div>
          {/* <div className="mb-4">
            <label htmlFor="gender" className="block mb-1">
              Gender *
            </label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={handleGenderChange}
              className="w-full border rounded px-2 py-1"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div> */}
          <div className="flex gap-5">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Server Copy V1
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handlev2}
            >
              Server Copy V2
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServerCopyBackup;
