
import React, { useState } from 'react';

interface VendingMachineUIProps {
  onInteract: (input: string) => Promise<string>;
  isLoading: boolean;
}

const VendingMachineUI: React.FC<VendingMachineUIProps> = ({ onInteract, isLoading }) => {
  const [displayMsg, setDisplayMsg] = useState("INSERT COIN");
  const [credit, setCredit] = useState(0); // In cents
  const [inputCode, setInputCode] = useState("");
  const [dispensedItem, setDispensedItem] = useState<string | null>(null);

  const items = [
    { code: 'A1', name: 'Chips', price: 150, emoji: '🍟', color: 'bg-yellow-100 text-yellow-600' },
    { code: 'A2', name: 'Soda', price: 200, emoji: '🥤', color: 'bg-red-100 text-red-600' },
    { code: 'B1', name: 'Candy', price: 100, emoji: '🍬', color: 'bg-pink-100 text-pink-600' },
    { code: 'B2', name: 'Water', price: 125, emoji: '💧', color: 'bg-blue-100 text-blue-600' },
  ];

  const handleJavaResponse = (output: string) => {
    const lines = output.split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('CREDIT:')) {
        const val = parseInt(trimmed.split(':')[1].trim());
        if (!isNaN(val)) setCredit(val);
      }
      if (trimmed.startsWith('MSG:')) {
        setDisplayMsg(trimmed.split('MSG:')[1].trim().toUpperCase());
      }
      if (trimmed.startsWith('DISPENSE:')) {
        const item = trimmed.split('DISPENSE:')[1].trim();
        triggerDispense(item);
      }
      if (trimmed.startsWith('REFUND:')) {
        const amount = parseInt(trimmed.split(':')[1].trim());
        if (amount > 0) alert(`Refunded: $${(amount/100).toFixed(2)}`);
      }
    });
  };

  const triggerDispense = (itemName: string) => {
    setDispensedItem(itemName);
    setTimeout(() => setDispensedItem(null), 3000);
  };

  const sendCommand = async (cmd: string, param: string = '') => {
    if (isLoading) return;
    
    // Protocol: <Current_Credit> <Command> <Param>
    const payload = `${credit} ${cmd} ${param}`.trim();
    const response = await onInteract(payload);
    handleJavaResponse(response);
  };

  const handleKeypad = (key: string) => {
    if (key === 'C') {
        setInputCode("");
        setDisplayMsg("INSERT COIN");
        return;
    }
    if (key === 'E') { // Enter
        if (inputCode.length === 2) {
            sendCommand('SELECT', inputCode);
            setInputCode("");
        }
        return;
    }
    
    if (inputCode.length < 2) {
        const newCode = inputCode + key;
        setInputCode(newCode);
        setDisplayMsg(`SELECTION: ${newCode}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-200 dark:bg-gray-800 p-6 rounded-lg overflow-y-auto">
      <div className="bg-gray-800 dark:bg-black p-4 rounded-xl shadow-2xl border-4 border-gray-600 w-full max-w-md relative">
        
        {/* Glass Window / Items */}
        <div className="bg-white dark:bg-gray-900/50 rounded-lg p-4 mb-6 relative overflow-hidden min-h-[250px]">
           <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-10"></div>
           
           <div className="grid grid-cols-2 gap-4">
               {items.map(item => (
                   <div key={item.code} className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-2 shadow-md relative">
                       <span className="absolute top-1 left-1 text-[10px] font-bold bg-black text-white px-1 rounded">{item.code}</span>
                       <div className={`text-4xl mb-1 p-2 rounded-full ${item.color}`}>{item.emoji}</div>
                       <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{item.name}</span>
                       <span className="text-[10px] text-gray-500">${(item.price / 100).toFixed(2)}</span>
                   </div>
               ))}
           </div>

            {/* Dispensed Item Animation */}
            {dispensedItem && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-0 transition-transform duration-500 z-20">
                    <div className="bg-yellow-300 text-black font-bold px-4 py-2 rounded-full shadow-lg animate-bounce">
                        Dropped: {dispensedItem}
                    </div>
                </div>
            )}
        </div>

        {/* Control Panel */}
        <div className="flex gap-4">
            
            {/* Left: Keypad & Display */}
            <div className="flex-1 flex flex-col gap-3">
                {/* LED Display */}
                <div className="bg-black border-2 border-gray-600 p-2 rounded mb-2">
                    <p className="font-mono text-red-500 text-center text-sm font-bold truncate animate-pulse">
                        {displayMsg}
                    </p>
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-3 gap-2">
                    {['A', 'B', '1', '2', 'C', 'E'].map(key => (
                        <button
                            key={key}
                            onClick={() => handleKeypad(key)}
                            className={`font-bold py-2 rounded shadow-sm active:translate-y-1 transition-all ${
                                key === 'C' ? 'bg-red-600 text-white hover:bg-red-700' :
                                key === 'E' ? 'bg-green-600 text-white hover:bg-green-700' :
                                'bg-gray-300 dark:bg-gray-700 dark:text-white hover:bg-gray-400'
                            }`}
                        >
                            {key}
                        </button>
                    ))}
                </div>
            </div>

            {/* Right: Slots */}
            <div className="w-1/3 flex flex-col gap-3 items-center justify-start bg-gray-700 p-2 rounded-lg">
                 <div className="w-full text-center mb-1">
                    <span className="text-[10px] text-gray-300 uppercase">Credit</span>
                    <div className="font-mono text-green-400 font-bold">${(credit / 100).toFixed(2)}</div>
                 </div>

                 <div className="w-full h-1 bg-gray-900 rounded-full"></div>

                 <p className="text-[10px] text-gray-400 text-center">Insert Money</p>
                 <button 
                    onClick={() => sendCommand('INSERT', '25')}
                    disabled={isLoading}
                    className="w-10 h-10 rounded-full bg-yellow-500 border-2 border-yellow-600 shadow-md flex items-center justify-center text-[10px] font-bold text-yellow-900 hover:scale-105 active:scale-95 transition-transform"
                    title="Insert 25 cents"
                 >
                    25¢
                 </button>
                 <button 
                     onClick={() => sendCommand('INSERT', '100')}
                     disabled={isLoading}
                     className="w-12 h-8 rounded bg-green-600 border-2 border-green-700 shadow-md flex items-center justify-center text-[10px] font-bold text-green-100 hover:scale-105 active:scale-95 transition-transform"
                     title="Insert $1.00"
                 >
                    $1
                 </button>

                 <div className="mt-auto w-full">
                    <button 
                        onClick={() => sendCommand('REFUND')}
                        className="w-full bg-gray-500 text-[10px] text-white py-1 rounded hover:bg-gray-600"
                    >
                        Refund
                    </button>
                 </div>
            </div>

        </div>

        {/* Pickup Tray */}
        <div className="mt-6 bg-black h-12 rounded-b-lg border-t-4 border-gray-700 flex items-center justify-center">
             <div className="w-2/3 h-6 bg-gray-800 rounded-full"></div>
        </div>

      </div>
    </div>
  );
};

export default VendingMachineUI;
