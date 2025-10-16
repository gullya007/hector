
import React, { useContext } from 'react';
import { AppContext } from '../App';
import { AppContextType } from '../types';
import { PlayIcon } from './icons/PlayIcon';
import { WalletIcon } from './icons/WalletIcon';
import { BellIcon } from './icons/BellIcon';

const Header: React.FC = () => {
    const { wallet } = useContext(AppContext) as AppContextType;

    return (
        <header className="bg-white shadow-md sticky top-0 z-10 p-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
                        <div className="relative">
                           <PlayIcon className="text-white h-5 w-5" />
                           <span className="absolute -top-1 -right-1 text-xs text-orange-500 font-bold">$</span>
                        </div>
                    </div>
                    <h1 className="text-xl font-extrabold text-blue-900">Hector's Ads</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm flex items-center space-x-1">
                        <WalletIcon className="w-4 h-4" />
                        <span>₹{wallet.balance.toFixed(2)}</span>
                    </div>
                    <button className="text-slate-500 relative">
                        <BellIcon className="w-6 h-6" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
