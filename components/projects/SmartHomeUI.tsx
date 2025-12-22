
import React, { useState, useEffect } from 'react';

interface SmartHomeUIProps {
  onInteract: (input: string) => Promise<string>;
  isLoading: boolean;
}

const SmartHomeUI: React.FC<SmartHomeUIProps> = ({ onInteract, isLoading }) => {
  const [isLightOn, setIsLightOn] = useState(false);
  const [temperature, setTemperature] = useState(22);
  const [isArmed, setIsArmed] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
      setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const handleJavaResponse = (output: string) => {
    const lines = output.split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('LIGHT:')) {
        const status = trimmed.split(':')[1].trim();
        setIsLightOn(status === 'ON');
        addLog(`Light set to ${status}`);
      }
      if (trimmed.startsWith('TEMP:')) {
        const val = parseInt(trimmed.split(':')[1].trim());
        if (!isNaN(val)) {
            setTemperature(val);
            addLog(`Temp set to ${val}°C`);
        }
      }
      if (trimmed.startsWith('SECURITY:')) {
        const status = trimmed.split(':')[1].trim();
        setIsArmed(status === 'ARMED');
        addLog(`System ${status}`);
      }
    });
  };

  const sendCommand = async (cmd: string) => {
    if (isLoading) return;
    
    // Protocol: <Light_0/1> <Temp_Int> <Armed_0/1> <Command>
    const lightState = isLightOn ? 1 : 0;
    const armedState = isArmed ? 1 : 0;
    const payload = `${lightState} ${temperature} ${armedState} ${cmd}`;
    
    const response = await onInteract(payload);
    handleJavaResponse(response);
  };

  // Initial sync not really needed since we control state here, but good for testing connectivity
  useEffect(() => {
      // Just checking connectivity, not changing state yet
      // sendCommand("GET_STATUS"); 
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-100 dark:bg-slate-900 p-6 rounded-lg overflow-y-auto font-sans">
      
      <div className="w-full max-w-md space-y-6">
        <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Smart Home Hub</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Control Panel</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-2 gap-4">
            
            {/* Light Card */}
            <div 
                onClick={() => sendCommand('TOGGLE_LIGHT')}
                className={`col-span-2 sm:col-span-1 p-6 rounded-2xl shadow-lg transition-all cursor-pointer border-2 ${isLightOn ? 'bg-yellow-100 border-yellow-400 dark:bg-yellow-900/30 dark:border-yellow-600' : 'bg-white dark:bg-slate-800 border-transparent hover:border-slate-300 dark:hover:border-slate-600'}`}
            >
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-full ${isLightOn ? 'bg-yellow-500 text-white shadow-yellow-500/50 shadow-lg' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill={isLightOn ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-6 0m6 0H9" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.379 5.102A1.5 1.5 0 0 0 10.5 6.375v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125v-.375a1.5 1.5 0 0 0-.879-1.273l-1.5-.637a1.5 1.5 0 0 0-1.142 0l-1.5.637Z" />
                        </svg>
                    </div>
                    <div className={`text-xs font-bold px-2 py-1 rounded uppercase ${isLightOn ? 'bg-yellow-200 text-yellow-800' : 'bg-slate-100 text-slate-500'}`}>
                        {isLightOn ? 'ON' : 'OFF'}
                    </div>
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Living Room</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Main Light</p>
            </div>

            {/* Security Card */}
            <div 
                onClick={() => sendCommand('TOGGLE_SECURITY')}
                className={`col-span-2 sm:col-span-1 p-6 rounded-2xl shadow-lg transition-all cursor-pointer border-2 ${isArmed ? 'bg-green-100 border-green-400 dark:bg-green-900/30 dark:border-green-600' : 'bg-white dark:bg-slate-800 border-transparent hover:border-slate-300 dark:hover:border-slate-600'}`}
            >
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-full ${isArmed ? 'bg-green-500 text-white shadow-green-500/50 shadow-lg' : 'bg-red-100 dark:bg-red-900/30 text-red-500'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                        </svg>
                    </div>
                    <div className={`text-xs font-bold px-2 py-1 rounded uppercase ${isArmed ? 'bg-green-200 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {isArmed ? 'ARMED' : 'DISARMED'}
                    </div>
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Security</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Perimeter System</p>
            </div>

            {/* Thermostat Card (Full Width) */}
            <div className="col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-transparent">
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white font-bold text-xl shadow-inner">
                        {temperature}°
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Thermostat</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Living Room AC</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                     <button 
                        onClick={() => sendCommand('TEMP_DOWN')}
                        disabled={isLoading}
                        className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center text-slate-600 dark:text-white transition-colors shadow-sm"
                     >
                         -
                     </button>
                     <button 
                        onClick={() => sendCommand('TEMP_UP')}
                        disabled={isLoading}
                        className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white transition-colors shadow-md"
                     >
                         +
                     </button>
                 </div>
            </div>
        </div>
        
        {/* Log Window */}
        <div className="bg-slate-200 dark:bg-slate-950 rounded-lg p-3 h-32 overflow-hidden flex flex-col shadow-inner">
             <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Hub Activity Log</p>
             <div className="flex-grow overflow-y-auto space-y-1">
                 {logs.length === 0 ? (
                     <p className="text-xs text-slate-400 italic">No activity yet.</p>
                 ) : (
                     logs.map((log, i) => (
                         <p key={i} className="text-xs font-mono text-slate-600 dark:text-slate-300 border-b border-slate-300 dark:border-slate-800 last:border-0 pb-1">
                             <span className="text-blue-500 mr-2">&gt;&gt;</span>{log}
                         </p>
                     ))
                 )}
             </div>
        </div>

      </div>
    </div>
  );
};

export default SmartHomeUI;
