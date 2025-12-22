
import React, { useState, useEffect, useCallback } from 'react';

interface BankProjectUIProps {
  onInteract: (input: string) => Promise<string>;
  isLoading: boolean;
}

const BankProjectUI: React.FC<BankProjectUIProps> = ({ onInteract, isLoading }) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [amount, setAmount] = useState('');
  const [logs, setLogs] = useState<string[]>(['System initialized. Waiting for connection...']);
  const [activeScreen, setActiveScreen] = useState<'home' | 'actions'>('home');

  const addLog = useCallback((msg: string) => setLogs(prev => [...prev, msg]), []);

  const handleCommand = useCallback(async (command: string, value?: string) => {
    let fullInput = command;
    if (value) fullInput += ` ${value}`;

    addLog(`> Sending: ${fullInput}`);

    const output = await onInteract(fullInput);

    // Parse Output
    const lines = output.split('\n');
    lines.forEach(line => {
      addLog(`< ${line}`);

      // Heuristic Parsing for UI Updates
      if (line.includes('BALANCE:')) {
        const balStr = line.split('BALANCE:')[1].trim();
        const bal = parseFloat(balStr);
        if (!isNaN(bal)) {
            setBalance(bal);
        }
      }
      if (line.includes('SUCCESS')) {
         // Maybe show a toast or animation
      }
    });
  }, [addLog, onInteract]);

  useEffect(() => {
      // Initial balance check
      handleCommand("BALANCE");
  }, [handleCommand]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
      {/* Phone Frame */}
      <div className="w-[300px] h-[600px] bg-black rounded-[3rem] p-3 shadow-2xl border-4 border-gray-800 relative">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-xl z-20"></div>
        
        {/* Screen */}
        <div className="w-full h-full bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden flex flex-col relative">
          
          {/* Status Bar */}
          <div className="h-8 bg-slate-100 dark:bg-slate-900 w-full flex justify-between items-center px-6 text-[10px] text-gray-500 z-10">
            <span>9:41</span>
            <div className="flex gap-1">
               <div className="w-3 h-3 bg-black dark:bg-white rounded-full opacity-20"></div>
               <div className="w-3 h-3 bg-black dark:bg-white rounded-full opacity-60"></div>
               <div className="w-3 h-3 bg-black dark:bg-white rounded-full"></div>
            </div>
          </div>

          {/* App Content */}
          <div className="flex-grow flex flex-col p-6 overflow-y-auto">
            
            {/* Bank Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">J</div>
                <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase">Java Bank</p>
                    <p className="text-sm font-bold text-gray-800 dark:text-white">Hello, User</p>
                </div>
            </div>

            {/* Balance Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg mb-8 transform transition-all hover:scale-105 cursor-pointer" onClick={() => handleCommand("BALANCE")}>
                <p className="text-xs opacity-70 mb-1">Total Balance</p>
                <h2 className="text-3xl font-bold tracking-tight">
                    {balance !== null ? `$${balance.toFixed(2)}` : '---'}
                </h2>
                <div className="mt-4 flex justify-between items-end">
                    <p className="text-[10px] opacity-60">**** 4289</p>
                    {isLoading && <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>}
                </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <button 
                    onClick={() => setActiveScreen(activeScreen === 'home' ? 'actions' : 'home')}
                    className="bg-gray-100 dark:bg-slate-700 p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                >
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Deposit</span>
                </button>
                <button 
                    onClick={() => setActiveScreen(activeScreen === 'home' ? 'actions' : 'home')}
                    className="bg-gray-100 dark:bg-slate-700 p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                >
                     <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center text-red-600 dark:text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Withdraw</span>
                </button>
            </div>

            {activeScreen === 'actions' && (
                <div className="bg-white dark:bg-slate-700 rounded-xl p-4 shadow-inner animate-fade-in mb-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Enter Amount</p>
                    <div className="flex gap-2">
                        <input 
                            type="number" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-gray-100 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 dark:text-white"
                            placeholder="0.00"
                        />
                    </div>
                    <div className="flex gap-2 mt-2">
                        <button 
                            onClick={() => handleCommand("DEPOSIT", amount)}
                            disabled={isLoading || !amount}
                            className="flex-1 bg-green-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                            Deposit
                        </button>
                         <button 
                            onClick={() => handleCommand("WITHDRAW", amount)}
                            disabled={isLoading || !amount}
                            className="flex-1 bg-red-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
                        >
                            Withdraw
                        </button>
                    </div>
                </div>
            )}

            {/* Transaction Log / Mini Console */}
            <div className="mt-auto">
                <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Server Logs</p>
                <div className="bg-gray-900 rounded-lg p-3 h-24 overflow-y-auto font-mono text-[10px] text-green-400 shadow-inner">
                    {logs.map((log, i) => (
                        <div key={i} className="mb-1 border-b border-gray-800 pb-1 last:border-0">{log}</div>
                    ))}
                    <div id="log-end"></div>
                </div>
            </div>

          </div>

          {/* Home Bar */}
          <div className="w-full h-6 flex justify-center items-center">
            <div className="w-1/3 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankProjectUI;
