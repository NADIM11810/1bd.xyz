import Navbar from "../components/Navbar/Navbar";
import { Link, Outlet } from "react-router-dom";
import Notice from "../components/Notice/Notice";
import useLogout from "../Hooks/useLogout";
import { useAuthContext } from "../Context/AuthContext";

const Main = () => {
  const { logout } = useLogout();
  const { authUser } = useAuthContext();
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="sticky left-0 hidden w-2/12 min-h-screen border-r-2 md:block lg:block border-gray-950">
          <div>
            <p className="m-4  text-[12px]">অপশনস</p>
            {authUser && authUser.role === "user" && (
              <>
                <Link to="/server-copy">
                  <button className="w-3/4 mx-5 my-2 btn">সার্ভার কপি</button>
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
                  <button className="w-3/4 mx-5 my-2 btn">জন্ম নিবন্ধন</button>
                </Link>
                <Link to="/recharge">
                  <button className="w-3/4 mx-5 my-2 btn">
                    এ্যাকাউন্ট রিচার্জ করুন
                  </button>
                </Link>
                <Link to="/my-order">
                  <button className="w-3/4 mx-5 my-2 btn">অর্ডার লিস্ট</button>
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
                <Link to="/all-order">
                  <button className="w-3/4 mx-5 my-2 btn">All Order</button>
                </Link>
                <Link to="/notice">
                  <button className="w-3/4 mx-5 my-2 btn">Update Notice</button>
                </Link>
                <Link to="/all-user">
                  <button className="w-3/4 mx-5 my-2 btn">All User</button>
                </Link>
                <Link to="/update-balance">
                  <button className="w-3/4 mx-5 my-2 btn">
                    Update Balance
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="w-3/4 mx-5 my-2 btn">Add Account</button>
                </Link>
                <Link to="/toggle-order">
                  <button className="w-3/4 mx-5 my-2 btn">
                    Turn On/Off Order
                  </button>
                </Link>
              </>
            )}

            <p className="m-4 text-[12px]">একাউন্ট</p>
            <Link to="/profile">
              <button className="w-3/4 mx-5 my-2 btn">প্রোফাইল</button>
            </Link>
            <Link to="/update-password">
              <button className="w-3/4 mx-5 my-2 btn">
                পাসওয়ার্ড পরিবর্তন
              </button>
            </Link>
            <button className="w-3/4 mx-5 my-2 btn" onClick={() => logout()}>
              লগ আউট
            </button>
          </div>
        </div>
        <div className="w-full min-h-screen lg:w-10/12 md:w-10/12">
          <Notice />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
