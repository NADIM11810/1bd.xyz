import { useEffect, useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";

const MyProfile = () => {
    const { refresh, setBalance } = useAuthContext();
    const [user, setUser] = useState(null);

    useEffect(() => {
            fetch('/api/users/userInfo')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setUser(data.user);
                setBalance(data.user.balance);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
        
    }, [refresh, setBalance]);

    return (
        <div>
            {user ? (
                <div className="w-full flex justify-center">
                    <div className="mx-auto rounded-xl overflow-hidden">
                        <img className="h-28 w-full object-cover" src={user.profilePic} alt="User Profile" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl capitalize mb-2">{user.fullName}</div>
                            <p className="text-gray-700 capitalize text-base">{user.username}</p>
                            <p className="text-gray-700 capitalize text-base">{user.gender}</p>
                            <p className="text-gray-700 capitalize text-base">Balance: {user.balance}tk</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MyProfile;
