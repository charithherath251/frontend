import React, { useEffect, useState } from 'react';
import instance from "../utils/axios";
import { UserContext } from '../context/UserContext';
const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userContext, setUserContext] = useState(JSON.parse(sessionStorage.getItem('user')));

    useEffect(() => {
        // Fetch user data from API (example endpoint)
        instance.get(`/user/profile/${userContext._id}`)
            .then((response) => {
                setUserData(response?.data);
                console.log(response);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!userData) {
        return <div className="text-center text-red-500">No user data available.</div>;
    }

    return (
        <UserContext.Provider value={{ userContext, setUserContext }}>
        <div className="min-h-screen flex flex-col items-center py-8 bg-gray-100">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label className="text-gray-600 font-semibold mb-1">First Name:</label>
                        <p className="bg-gray-50 p-3 rounded-lg">{userData.firstName}</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-600 font-semibold mb-1">Last Name:</label>
                        <p className="bg-gray-50 p-3 rounded-lg">{userData.lastName}</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-600 font-semibold mb-1">Email:</label>
                        <p className="bg-gray-50 p-3 rounded-lg">{userData.email}</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-600 font-semibold mb-1">Role:</label>
                        <p className="bg-gray-50 p-3 rounded-lg">{userData.role}</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-600 font-semibold mb-1">Department:</label>
                        <p className="bg-gray-50 p-3 rounded-lg">{userData.department}</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-600 font-semibold mb-1">Level:</label>
                        <p className="bg-gray-50 p-3 rounded-lg">{userData.level}</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-600 font-semibold mb-1">Last Login:</label>
                        <p className="bg-gray-50 p-3 rounded-lg">{userData.lastLogin === '-1' ? 'Never' : userData.lastLogin}</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-600 font-semibold mb-1">First Login:</label>
                        <p className="bg-gray-50 p-3 rounded-lg">{userData.firstLogin ? 'Yes' : 'No'}</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-600 font-semibold mb-1">Quiz Completed:</label>
                        <p className="bg-gray-50 p-3 rounded-lg">{userData.quizCompleted ? 'Yes' : 'No'}</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-600 font-semibold mb-1">OTP:</label>
                        <p className="bg-gray-50 p-3 rounded-lg">{userData.otp === '-1' ? 'Not Set' : userData.otp}</p>
                    </div>
                </div>

                <div className="mt-8">
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
        </UserContext.Provider>
    );
};

export default UserProfile;
