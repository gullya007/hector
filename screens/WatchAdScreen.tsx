
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { AppContextType } from '../types';
import { PlayIcon } from '../components/icons/PlayIcon';

const AD_DURATION = 15; // in seconds

const WatchAdScreen: React.FC = () => {
    const { completeAd, isAdCompleted } = useContext(AppContext) as AppContextType;
    const [progress, setProgress] = useState(0);
    const [timeLeft, setTimeLeft] = useState(AD_DURATION);

    useEffect(() => {
        if (progress >= 100) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setProgress(100);
                    return 0;
                }
                const newTime = prev - 1;
                setProgress(((AD_DURATION - newTime) / AD_DURATION) * 100);
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [progress]);
    
    return (
        <div className="flex flex-col h-full justify-between items-center text-center p-4 bg-slate-900 rounded-2xl text-white">
            <div>
                <h1 className="text-2xl font-bold mb-2">Watching Ad</h1>
                <p className="text-slate-400">Please watch the full ad to earn your reward.</p>
            </div>

            <div className="relative w-64 h-40 bg-black rounded-lg flex items-center justify-center border-2 border-slate-700 my-8">
                <img src="https://picsum.photos/300/200" alt="Ad placeholder" className="opacity-50 rounded-lg"/>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <PlayIcon className="w-16 h-16 text-white opacity-70" />
                </div>
                <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    Ad
                </div>
            </div>

            <div className="w-full max-w-xs">
                 <div className="flex justify-between text-sm font-semibold mb-2 text-slate-300">
                    <span>Progress</span>
                    <span>{timeLeft}s left</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-4 border border-slate-600">
                    <div 
                        className="bg-gradient-to-r from-orange-500 to-amber-400 h-full rounded-full transition-all duration-1000 ease-linear"
                        style={{ width: `${progress}%` }}>
                    </div>
                </div>

                <div className="mt-8 h-16">
                    {progress >= 100 && (
                        <button
                            onClick={completeAd}
                            disabled={isAdCompleted}
                            className="w-full bg-green-500 text-white font-bold py-4 rounded-xl text-lg shadow-lg transition-transform transform hover:scale-105 animate-pulse disabled:animate-none disabled:bg-green-700"
                        >
                            {isAdCompleted ? 'Claimed!' : 'Claim ₹0.50'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WatchAdScreen;
