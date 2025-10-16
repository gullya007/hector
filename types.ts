
export enum Screen {
    Dashboard = 'DASHBOARD',
    WatchAd = 'WATCH_AD',
    Wallet = 'WALLET',
    Profile = 'PROFILE',
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    referralCode: string;
    region: string;
}

export interface Wallet {
    balance: number;
    pending: number;
    totalEarned: number;
}

export interface Withdrawal {
    id: string;
    amount: number;
    status: 'Paid' | 'Processing' | 'Requested' | 'Rejected';
    date: string;
    method: string;
}

export interface AppContextType {
    user: User | null;
    wallet: Wallet;
    adsAvailable: number;
    adsWatched: number;
    withdrawals: Withdrawal[];
    isAdCompleted: boolean;
    login: (email: string) => void;
    logout: () => void;
    navigate: (screen: Screen) => void;
    completeAd: () => void;
    requestWithdrawal: (amount: number, method: string) => void;
}
