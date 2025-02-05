import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  const handleEditBalance = async (userId) => {
    const balance = prompt("Enter new balance");
    if (balance) {
      try {
        const res = await axios.put("/api/users/edit-user-balance", {
          userId,
          amount: balance,
        });
        if (res.status === 200) {
          const newUsers = users.map((user) =>
            user._id === userId ? { ...user, balance } : user
          );
          setUsers(newUsers);
          toast.success(res.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDelete = async (userId) => {
    try {
      const res = await fetch(`/api/users/users/${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.status === 200) {
        const newUsers = users.filter((user) => user._id !== userId);
        setUsers(newUsers);
        toast.success(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user._id}
            className="max-w-md mx-auto overflow-hidden bg-white shadow-md rounded-xl md:max-w-2xl"
          >
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="object-cover w-full h-48 md:w-48"
                  src={user.profilePic}
                  alt={user.fullName}
                />
              </div>
              <div className="p-8">
                <div className="text-sm font-semibold tracking-wide text-indigo-500 uppercase">
                  {user.username}
                </div>
                <p className="mt-2 text-gray-600">{user.fullName}</p>
                <p className="mt-2 text-gray-600">{user.gender}</p>
                <p className="mt-2 text-gray-600">Balance: {user.balance}</p>
                <button
                  className="px-4 py-2 mt-4 text-white bg-red-500 rounded"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 m-2 mt-4 text-white bg-blue-500 rounded"
                  onClick={() => handleEditBalance(user._id)}
                >
                  Edit Balance
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUser;
