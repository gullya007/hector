
import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { AppContextType, Withdrawal } from '../types';
import { WalletIcon } from '../components/icons/WalletIcon';

const StatusBadge: React.FC<{ status: Withdrawal['status'] }> = ({ status }) => {
    const baseClasses = "text-xs font-bold px-2 py-1 rounded-full";
    switch (status) {
        case 'Paid': return <span className={`${baseClasses} bg-green-100 text-green-800`}>Paid</span>;
        case 'Processing': return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Processing</span>;
        case 'Requested': return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>Requested</span>;
        case 'Rejected': return <span className={`${baseClasses} bg-red-100 text-red-800`}>Rejected</span>;
        default: return null;
    }
};

const WalletScreen: React.FC = () => {
    const { wallet, withdrawals, requestWithdrawal } = useContext(AppContext) as AppContextType;
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('UPI');

    const handleWithdraw = (e: React.FormEvent) => {
        e.preventDefault();
        const numAmount = parseFloat(amount);
        if (numAmount > 0 && numAmount <= wallet.balance) {
            requestWithdrawal(numAmount, method);
            setAmount('');
        } else {
            alert('Invalid withdrawal amount.');
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-extrabold text-blue-900">My Wallet</h1>
            
            {/* Balance Cards */}
            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-slate-100 p-4 rounded-xl">
                    <p className="text-sm text-slate-500">Pending</p>
                    <p className="text-lg font-bold">₹{wallet.pending.toFixed(2)}</p>
                </div>
                <div className="bg-slate-100 p-4 rounded-xl">
                    <p className="text-sm text-slate-500">Total Earned</p>
                    <p className="text-lg font-bold">₹{wallet.totalEarned.toFixed(2)}</p>
                </div>
            </div>

            {/* Withdraw Section */}
            <div className="bg-white p-5 rounded-2xl shadow-md">
                <h2 className="font-bold text-lg mb-4 text-slate-800">Withdraw Funds</h2>
                <form onSubmit={handleWithdraw} className="space-y-4">
                    <div>
                        <label className="block text-slate-600 text-sm font-bold mb-1" htmlFor="amount">Amount (₹)</label>
                        <input
                            id="amount"
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder={`Max: ₹${wallet.balance.toFixed(2)}`}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-600 text-sm font-bold mb-1" htmlFor="method">Method</label>
                        <select
                            id="method"
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option>UPI</option>
                            <option>Bank Transfer</option>
                            <option>PayPal</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition shadow-md">
                        Request Withdrawal
                    </button>
                </form>
            </div>
            
            {/* Withdrawal History */}
            <div className="bg-white p-5 rounded-2xl shadow-md">
                <h2 className="font-bold text-lg mb-4 text-slate-800">Withdrawal History</h2>
                <ul className="space-y-3">
                    {withdrawals.map(w => (
                        <li key={w.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-slate-200 rounded-full"><WalletIcon className="w-5 h-5 text-slate-600"/></div>
                                <div>
                                    <p className="font-bold">₹{w.amount.toFixed(2)}</p>
                                    <p className="text-xs text-slate-500">{w.date} via {w.method}</p>
                                </div>
                            </div>
                            <StatusBadge status={w.status} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WalletScreen;
