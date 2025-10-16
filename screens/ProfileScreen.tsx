
import React, { useContext } from 'react';
import { AppContext } from '../App';
import { AppContextType } from '../types';

const ProfileScreen: React.FC = () => {
    const { user, logout } = useContext(AppContext) as AppContextType;

    if (!user) return null;

    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center space-y-3">
                <img src={user.avatarUrl} alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-orange-500 shadow-lg" />
                <h1 className="text-2xl font-extrabold text-blue-900">{user.name}</h1>
                <p className="text-slate-500">{user.email}</p>
                <div className="bg-slate-100 text-slate-600 text-sm font-bold px-4 py-1 rounded-full">
                    Referral Code: {user.referralCode}
                </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-md space-y-4">
                <h2 className="font-bold text-lg text-slate-800">Edit Profile</h2>
                <div>
                    <label className="block text-slate-600 text-sm font-bold mb-1" htmlFor="name">Full Name</label>
                    <input
                        id="name"
                        type="text"
                        defaultValue={user.name}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
                 <div>
                    <label className="block text-slate-600 text-sm font-bold mb-1" htmlFor="region">Region</label>
                    <input
                        id="region"
                        type="text"
                        defaultValue={user.region}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
                <button className="w-full bg-blue-900 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition">
                    Save Changes
                </button>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-md">
                 <h2 className="font-bold text-lg text-slate-800 mb-2">Settings</h2>
                 <div className="flex justify-between items-center py-2 border-b">
                    <span>Notifications</span>
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" defaultChecked/>
                        <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                    </label>
                 </div>
                 <div className="flex justify-between items-center py-2">
                    <span>Ad Categories</span>
                    <span className="text-slate-500 text-sm">Manage</span>
                 </div>
            </div>

            <button
                onClick={logout}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition"
            >
                Logout
            </button>
        </div>
    );
};

export default ProfileScreen;
