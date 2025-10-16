
import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Screen, AppContextType } from '../types';
import { HomeIcon } from './icons/HomeIcon';
import { WalletIcon } from './icons/WalletIcon';
import { UserIcon } from './icons/UserIcon';

interface BottomNavProps {
    currentScreen: Screen;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen }) => {
    const { navigate } = useContext(AppContext) as AppContextType;

    const navItems = [
        { screen: Screen.Dashboard, label: 'Home', icon: HomeIcon },
        { screen: Screen.Wallet, label: 'Wallet', icon: WalletIcon },
        { screen: Screen.Profile, label: 'Profile', icon: UserIcon },
    ];

    return (
        <nav className="bg-white border-t border-slate-200 sticky bottom-0 z-10">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const isActive = currentScreen === item.screen;
                    const colorClass = isActive ? 'text-orange-500' : 'text-slate-400';
                    return (
                        <button
                            key={item.screen}
                            onClick={() => navigate(item.screen)}
                            className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${colorClass} hover:text-orange-500`}
                        >
                            <item.icon className="w-6 h-6 mb-1" />
                            <span className={`text-xs font-bold ${isActive ? 'text-orange-500' : 'text-slate-500'}`}>{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;
