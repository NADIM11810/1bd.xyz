import { useEffect, useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import useLogout from "../../Hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();
  const { refresh, authUser, setBalance } = useAuthContext();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/api/users/userInfo")
      .then((response) => response.json())
      .then((data) => {
        setData(data.user);
        setBalance(data.user.balance);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [refresh, setBalance]);
  return (
    <div className="sticky top-0 z-10 shadow-sm shadow-black">
      <div className="px-10 navbar bg-base-100 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu flex-nowrap h-screen overflow-y-scroll overflow-x-hidden menu-sm dropdown-content mt-1 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <p className="m-4 text-[12px]">অপশনস</p>
              {authUser && authUser.role === "user" && (
                <>
                  <Link to="/server-copy">
                    <button className="w-3/4 mx-5 my-2 btn">আপকামিং</button>
                  </Link>
                  <Link to="/server-copy-backup">
                    <button className="w-3/4 mx-5 my-2 btn">
                      ব্যাকআপ সার্ভার কপি
                    </button>
                  </Link>
                  <Link to="/nid-order">
                    <button className="w-3/4 mx-5 my-2 btn">
                      অর্ডার সাইন কপি
                    </button>
                  </Link>
                  <Link to="/roshid">
                    <button className="w-3/4 mx-5 my-2 btn">
                      ভূমি উন্নয়ন কর রশিদ
                    </button>
                  </Link>
                  <Link to="/bio">
                    <button className="w-3/4 mx-5 my-2 btn">বায়োমেট্রিক</button>
                  </Link>
                  <Link to="/tin">
                    <button className="w-3/4 mx-5 my-2 btn">
                      অর্ডার অফিসিয়াল সার্ভার কপি
                    </button>
                  </Link>
                  <Link to="/birthday-registration">
                    <button className="w-3/4 mx-5 my-2 btn">
                      জন্ম নিবন্ধন
                    </button>
                  </Link>
                  <Link to="/recharge">
                    <button className="w-3/4 mx-5 my-2 btn">
                      এ্যাকাউন্ট রিচার্জ করুন
                    </button>
                  </Link>
                  <Link to="/my-order">
                    <button className="w-3/4 mx-5 my-2 btn">
                      অর্ডার লিস্ট
                    </button>
                  </Link>
                  <Link to="/my-roshid">
                    <button className="w-3/4 mx-5 my-2 btn">
                      খাজনা দাখিলা লিস্ট
                    </button>
                  </Link>

                  <Link to="https://chat.whatsapp.com/EyXpfFn5VTJ3nkUDO2jbdk">
                    <button className="w-3/4 mx-5 my-2 btn">
                      সকল আপডেট পেতে গ্রুপে যুক্ত হোন
                    </button>
                  </Link>
                </>
              )}
              {authUser && authUser.role === "admin" && (
                <>
                  <li>
                    <Link to="/all-order">
                      <button className="w-full mx-5 my-2">All Order</button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/all-user">
                      <button className="w-full mx-5 my-2">All User</button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/update-balance">
                      <button className="w-full mx-5 my-2">
                        Update Balance
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/notice">
                      <button className="w-full mx-5 my-2">
                        Update Notice
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup">
                      <button className="w-full mx-5 my-2">Add Account</button>
                    </Link>
                  </li>
                </>
              )}
              <p className="m-4 text-[12px]">একাউন্ট</p>
              <li>
                <Link to="/profile">
                  <button className="w-full mx-5 my-2">প্রোফাইল</button>
                </Link>
              </li>
              <li>
                <Link to="/update-password">
                  <button className="w-full mx-5 my-2">
                    পাসওয়ার্ড পরিবর্তন
                  </button>
                </Link>
              </li>
              <li>
                <button className="w-full mx-5 my-2" onClick={() => logout()}>
                  লগ আউট
                </button>
              </li>
            </ul>
          </div>
          <a className="text-xl btn btn-ghost">Unofficial</a>
        </div>

        <div className="navbar-end">
          <h1 className="px-4 py-2 ml-4 mr-0 bg-teal-600 rounded-lg lg:mr-10 md:mr-10 lg:ml-0 md:ml-0">
            Balance: {data?.balance}
          </h1>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={authUser?.profilePic}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile" className="p-2">
                  Profile
                </Link>
              </li>
              <li>
                <a onClick={() => logout()}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
