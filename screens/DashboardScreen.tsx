
import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Screen, AppContextType } from '../types';
import { ChevronRightIcon } from '../components/icons/ChevronRightIcon';

const DashboardScreen: React.FC = () => {
    const { navigate, wallet, adsAvailable, adsWatched } = useContext(AppContext) as AppContextType;
    const totalAds = adsAvailable + adsWatched;

    return (
        <div className="space-y-6">
            {/* Wallet Quick View */}
            <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-lg text-center">
                <p className="text-sm text-blue-200">Current Balance</p>
                <p className="text-4xl font-extrabold tracking-tight my-2">₹{wallet.balance.toFixed(2)}</p>
                <div className="flex justify-center space-x-4 mt-4">
                    <button onClick={() => navigate(Screen.Wallet)} className="bg-orange-500 text-white font-bold py-2 px-5 rounded-full text-sm flex items-center space-x-1 hover:bg-orange-600 transition">
                        <span>Withdraw</span>
                        <ChevronRightIcon className="w-4 h-4" />
                    </button>
                    <button onClick={() => navigate(Screen.Wallet)} className="bg-blue-800 text-blue-100 font-bold py-2 px-5 rounded-full text-sm hover:bg-blue-700 transition">
                        History
                    </button>
                </div>
            </div>

            {/* Watch Ads CTA */}
            <div className="bg-white p-5 rounded-2xl shadow-md">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="font-bold text-lg text-slate-800">Watch Ads & Earn</h2>
                    <span className="text-sm font-bold text-slate-500">{adsWatched}/{totalAds} watched</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 mb-4">
                    <div 
                        className="bg-orange-500 h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${(adsWatched / totalAds) * 100}%` }}>
                    </div>
                </div>
                <button
                    onClick={() => navigate(Screen.WatchAd)}
                    disabled={adsAvailable === 0}
                    className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl text-lg transition-transform transform hover:scale-105 shadow-lg disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {adsAvailable > 0 ? `Watch Ads (${adsAvailable} left)` : 'No Ads Available'}
                </button>
                {adsAvailable === 0 && <p className="text-center text-sm text-slate-500 mt-2">New ads available in 24 hours.</p>}
            </div>

            {/* Other actions */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl shadow-md text-center">
                    <h3 className="font-bold text-slate-700">Invite Friends</h3>
                    <p className="text-xs text-slate-500 mb-2">Earn bonus rewards!</p>
                    <button className="bg-green-500 text-white font-bold text-xs py-1 px-3 rounded-full hover:bg-green-600 transition">Invite</button>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-md text-center">
                     <h3 className="font-bold text-slate-700">Members Count</h3>
                     <p className="text-xs text-slate-500">Global: 12,345</p>
                     <p className="text-xs text-slate-500">Orissa: 1,234</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardScreen;
