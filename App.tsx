
import React, { useState, useCallback, useMemo } from 'react';
import { Screen, User, Wallet, Withdrawal, AppContextType } from './types';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import WatchAdScreen from './screens/WatchAdScreen';
import WalletScreen from './screens/WalletScreen';
import ProfileScreen from './screens/ProfileScreen';
import Header from './components/Header';
import BottomNav from './components/BottomNav';

export const AppContext = React.createContext<AppContextType | null>(null);

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [screen, setScreen] = useState<Screen>(Screen.Dashboard);

    const [wallet, setWallet] = useState<Wallet>({
        balance: 125.50,
        pending: 12.00,
        totalEarned: 540.75,
    });
    const [adsAvailable, setAdsAvailable] = useState<number>(9);
    const [adsWatched, setAdsWatched] = useState<number>(0);
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([
        { id: 'w1', amount: 50.00, status: 'Paid', date: '2023-10-15', method: 'UPI' },
        { id: 'w2', amount: 100.00, status: 'Processing', date: '2023-10-28', method: 'Bank Transfer' },
        { id: 'w3', amount: 75.50, status: 'Paid', date: '2023-09-22', method: 'PayPal' },
    ]);
    const [isAdCompleted, setIsAdCompleted] = useState(false);

    const login = useCallback((email: string) => {
        setUser({
            id: 'u1',
            name: 'John Doe',
            email: email,
            avatarUrl: `https://picsum.photos/seed/${email}/100/100`,
            referralCode: 'JOHN123',
            region: 'Orissa',
        });
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setScreen(Screen.Dashboard);
    }, []);

    const navigate = useCallback((newScreen: Screen) => {
        setScreen(newScreen);
    }, []);

    const completeAd = useCallback(() => {
        if (adsAvailable > 0) {
            setWallet(prev => ({
                ...prev,
                balance: prev.balance + 0.50,
                pending: prev.pending,
                totalEarned: prev.totalEarned + 0.50,
            }));
            setAdsAvailable(prev => prev - 1);
            setAdsWatched(prev => prev + 1);
        }
        setIsAdCompleted(true);
        setTimeout(() => {
            navigate(Screen.Dashboard);
            setIsAdCompleted(false);
        }, 1500);
    }, [adsAvailable, navigate]);
    
    const requestWithdrawal = useCallback((amount: number, method: string) => {
        setWallet(prev => ({ ...prev, balance: prev.balance - amount }));
        const newWithdrawal: Withdrawal = {
            id: `w${withdrawals.length + 1}`,
            amount,
            status: 'Requested',
            date: new Date().toISOString().split('T')[0],
            method,
        };
        setWithdrawals(prev => [newWithdrawal, ...prev]);
        alert(`Withdrawal of ₹${amount} via ${method} requested!`);
        navigate(Screen.Dashboard);
    }, [navigate, withdrawals.length]);


    const contextValue = useMemo(() => ({
        user,
        wallet,
        adsAvailable,
        adsWatched,
        withdrawals,
        isAdCompleted,
        login,
        logout,
        navigate,
        completeAd,
        requestWithdrawal,
    }), [user, wallet, adsAvailable, adsWatched, withdrawals, isAdCompleted, login, logout, navigate, completeAd, requestWithdrawal]);

    const renderScreen = () => {
        switch (screen) {
            case Screen.Dashboard:
                return <DashboardScreen />;
            case Screen.WatchAd:
                return <WatchAdScreen />;
            case Screen.Wallet:
                return <WalletScreen />;
            case Screen.Profile:
                return <ProfileScreen />;
            default:
                return <DashboardScreen />;
        }
    };

    return (
        <AppContext.Provider value={contextValue}>
            <div className="bg-slate-100 min-h-screen text-slate-800 font-sans">
                <div className="max-w-sm mx-auto bg-white shadow-lg min-h-screen flex flex-col">
                    {!user ? (
                        <LoginScreen />
                    ) : (
                        <>
                            <Header />
                            <main className="flex-grow p-4 overflow-y-auto">
                                {renderScreen()}
                            </main>
                            <BottomNav currentScreen={screen} />
                        </>
                    )}
                </div>
            </div>
        </AppContext.Provider>
    );
};

export default App;
