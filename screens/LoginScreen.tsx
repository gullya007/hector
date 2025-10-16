
import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { AppContextType } from '../types';
import { PlayIcon } from '../components/icons/PlayIcon';

const LoginScreen: React.FC = () => {
    const { login } = useContext(AppContext) as AppContextType;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            login(email);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-blue-900 text-white">
            <div className="flex items-center space-x-3 mb-8">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className="relative">
                        <PlayIcon className="text-blue-900 h-8 w-8" />
                        <span className="absolute -top-1 -right-2 text-lg text-orange-500 font-bold">$</span>
                    </div>
                </div>
                <div>
                    <h1 className="text-4xl font-extrabold">Hector's Ads</h1>
                    <p className="text-orange-400 font-semibold">Watch. Earn. Repeat.</p>
                </div>
            </div>

            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 text-slate-800">
                <h2 className="text-2xl font-bold text-center mb-2 text-blue-900">Welcome Back!</h2>
                <p className="text-center text-slate-500 mb-6">Login to continue earning.</p>
                
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-slate-600 text-sm font-bold mb-2" htmlFor="email">
                            Email or Phone
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-slate-600 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 shadow-lg"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-sm text-slate-500 mt-6">
                    Don't have an account? <a href="#" className="text-orange-500 font-bold">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default LoginScreen;
