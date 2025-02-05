import { useState } from "react";
import toast from "react-hot-toast";

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/users/update-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ oldPassword, newPassword }),
            });
            const data = await response.json();
            toast.success(data.message);
        } catch (error) {
            console.error('Error updating password:', error.message);
            toast.error('Something went wrong!');
        }
    };
    return (
        <div>
            <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Update Password</h2>
                
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label htmlFor="oldPassword" className="block text-sm font-semibold mb-2">Old Password:</label>
                        <input
                            type="password"
                            id="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-sm font-semibold mb-2">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;