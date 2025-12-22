
import React from 'react';

// FIX: Made the `children` prop optional to resolve a TypeScript error where it wasn't inferred from JSX.
const Box = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <div className={`bg-base-100 dark:bg-base-300-dark border-2 border-primary dark:border-secondary p-2 rounded-lg text-center shadow-md ${className}`}>
    {children}
  </div>
);

const Arrow = ({ className = '' }: { className?: string }) => (
  <svg className={`w-8 h-8 mx-2 text-content-200 dark:text-content-200-dark ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const DownArrow = ({ className = '' }: { className?: string }) => (
    <svg className={`w-8 h-8 my-2 text-content-200 dark:text-content-200-dark ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
);


export const JvmDiagram: React.FC = () => (
  <div className="flex flex-col md:flex-row items-center justify-center text-sm md:text-base text-content-100 dark:text-content-100-dark font-semibold">
    <Box>Java Code</Box>
    <Arrow />
    <Box>Compiler</Box>
    <Arrow />
    <Box>Bytecode</Box>
    <Arrow />
    <Box>JVM</Box>
  </div>
);

export const ClassVsObjectDiagram: React.FC = () => (
    <div className="flex flex-col items-center justify-center space-y-4 text-content-100 dark:text-content-100-dark">
        <Box className="w-48">
            <h3 className="font-bold text-primary dark:text-secondary">Class: Car</h3>
            <p className="text-sm">(Blueprint)</p>
            <ul className="text-xs text-left mt-1 list-disc list-inside">
                <li>String color</li>
                <li>int speed</li>
            </ul>
        </Box>
        <DownArrow />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Box className="w-40">
                <h3 className="font-bold">Object 1</h3>
                <p className="text-sm">color: "Red"</p>
                <p className="text-sm">speed: 250</p>
            </Box>
            <Box className="w-40">
                <h3 className="font-bold">Object 2</h3>
                <p className="text-sm">color: "Blue"</p>
                <p className="text-sm">speed: 180</p>
            </Box>
        </div>
    </div>
);

export const ArrayDiagram: React.FC = () => (
    <div className="text-center text-content-100 dark:text-content-100-dark">
        <h3 className="font-bold text-lg mb-2">Array: <code className="text-primary dark:text-secondary">int[] scores</code></h3>
        <div className="flex justify-center">
            <div className="relative border-2 border-primary dark:border-secondary p-2 m-1 w-16 h-16 flex items-center justify-center">88<span className="absolute -bottom-6 text-xs font-mono">0</span></div>
            <div className="relative border-2 border-primary dark:border-secondary p-2 m-1 w-16 h-16 flex items-center justify-center">92<span className="absolute -bottom-6 text-xs font-mono">1</span></div>
            <div className="relative border-2 border-primary dark:border-secondary p-2 m-1 w-16 h-16 flex items-center justify-center">75<span className="absolute -bottom-6 text-xs font-mono">2</span></div>
            <div className="relative border-2 border-primary dark:border-secondary p-2 m-1 w-16 h-16 flex items-center justify-center">100<span className="absolute -bottom-6 text-xs font-mono">3</span></div>
        </div>
        <p className="mt-8 text-sm font-semibold">Fixed Size | Access by Index</p>
    </div>
);

export const ArrayListDiagram: React.FC = () => (
    <div className="flex flex-col items-center text-content-100 dark:text-content-100-dark">
        <div className="mb-4 text-center">
            <h3 className="font-bold text-lg">ArrayList: <code className="text-primary dark:text-secondary">cars</code></h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Ordered Collection (Index)</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-start">
            
            {/* Structure */}
            <div className="flex flex-row bg-base-200 dark:bg-gray-800 p-4 rounded-lg border border-dashed border-gray-400">
                <div className="flex flex-col items-center mx-1">
                    <div className="w-20 h-12 border-2 border-primary dark:border-secondary bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm rounded font-mono text-sm">"Volvo"</div>
                    <span className="text-xs font-mono mt-1 text-gray-500">idx: 0</span>
                </div>
                <div className="flex flex-col items-center mx-1">
                    <div className="w-20 h-12 border-2 border-primary dark:border-secondary bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm rounded font-mono text-sm">"BMW"</div>
                    <span className="text-xs font-mono mt-1 text-gray-500">idx: 1</span>
                </div>
                <div className="flex flex-col items-center mx-1">
                    <div className="w-20 h-12 border-2 border-primary dark:border-secondary bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm rounded font-mono text-sm">"Ford"</div>
                    <span className="text-xs font-mono mt-1 text-gray-500">idx: 2</span>
                </div>
                 <div className="flex flex-col items-center mx-1 opacity-50">
                    <div className="w-20 h-12 border-2 border-dashed border-gray-400 bg-transparent flex items-center justify-center rounded font-mono text-xs text-gray-400">+ add()</div>
                    <span className="text-xs font-mono mt-1 text-gray-500">idx: 3</span>
                </div>
            </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-left bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded border border-yellow-200 dark:border-yellow-800">
            <div>
                <span className="font-bold">cars.get(1)</span> → Returns "BMW"
            </div>
            <div>
                <span className="font-bold">cars.size()</span> → Returns 3
            </div>
        </div>
    </div>
);

export const HashMapDiagram: React.FC = () => (
    <div className="flex flex-col items-center text-content-100 dark:text-content-100-dark">
        <div className="mb-4 text-center">
            <h3 className="font-bold text-lg">HashMap: <code className="text-primary dark:text-secondary">grades</code></h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Key-Value Mapping (Unique Keys)</p>
        </div>

        <div className="flex gap-8 bg-base-200 dark:bg-gray-800 p-6 rounded-xl border border-gray-300 dark:border-gray-600 shadow-inner">
            {/* Keys Column */}
            <div className="flex flex-col space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-center mb-2 text-blue-600 dark:text-blue-400">Keys</div>
                <div className="w-24 h-10 bg-blue-100 dark:bg-blue-900/50 border border-blue-300 dark:border-blue-700 rounded flex items-center justify-center font-mono text-sm font-bold">"John"</div>
                <div className="w-24 h-10 bg-blue-100 dark:bg-blue-900/50 border border-blue-300 dark:border-blue-700 rounded flex items-center justify-center font-mono text-sm font-bold">"Maria"</div>
                <div className="w-24 h-10 bg-blue-100 dark:bg-blue-900/50 border border-blue-300 dark:border-blue-700 rounded flex items-center justify-center font-mono text-sm font-bold">"David"</div>
            </div>

            {/* Arrows */}
            <div className="flex flex-col space-y-2 pt-8">
                <div className="h-10 flex items-center justify-center"><span className="text-gray-400">➔</span></div>
                <div className="h-10 flex items-center justify-center"><span className="text-gray-400">➔</span></div>
                <div className="h-10 flex items-center justify-center"><span className="text-gray-400">➔</span></div>
            </div>

            {/* Values Column */}
             <div className="flex flex-col space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-center mb-2 text-green-600 dark:text-green-400">Values</div>
                <div className="w-24 h-10 bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-700 rounded flex items-center justify-center font-mono text-sm">95</div>
                <div className="w-24 h-10 bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-700 rounded flex items-center justify-center font-mono text-sm">88</div>
                <div className="w-24 h-10 bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-700 rounded flex items-center justify-center font-mono text-sm">76</div>
            </div>
        </div>

         <div className="mt-4 text-xs text-center bg-blue-50 dark:bg-blue-900/20 p-2 rounded border border-blue-200 dark:border-blue-800">
            <span className="font-bold">grades.get("Maria")</span> retrieves <span className="font-bold text-green-600 dark:text-green-400">88</span>
        </div>
    </div>
);

export const InheritanceDiagram: React.FC = () => (
     <div className="flex flex-col items-center justify-center space-y-2 text-content-100 dark:text-content-100-dark">
        <Box className="w-48">
            <h3 className="font-bold text-primary dark:text-secondary">Superclass: Animal</h3>
            <ul className="text-xs text-left mt-1 list-disc list-inside">
                <li>void eat()</li>
            </ul>
        </Box>
        <DownArrow />
        <Box className="w-48">
            <h3 className="font-bold text-primary dark:text-secondary">Subclass: Dog</h3>
            <ul className="text-xs text-left mt-1 list-disc list-inside">
                <li className="text-gray-500">void eat() (inherited)</li>
                <li>void bark()</li>
            </ul>
        </Box>
    </div>
);
