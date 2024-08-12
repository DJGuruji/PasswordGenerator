import React, { useState } from 'react';

const Home = () => {
    const [length, setLength] = useState(12);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [password, setPassword] = useState('');
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const generatePassword = () => {
        setLoading(true);
        setTimeout(() => {
            const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const lowercase = 'abcdefghijklmnopqrstuvwxyz';
            const numbers = '0123456789';
            const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
          
            let characterPool = '';
            if (includeUppercase) characterPool += uppercase;
            if (includeLowercase) characterPool += lowercase;
            if (includeNumbers) characterPool += numbers;
            if (includeSymbols) characterPool += symbols;
        
            let generatedPassword = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characterPool.length);
                generatedPassword += characterPool[randomIndex];
            }
        
            setPassword(generatedPassword);
            setCopied(false);
            setLoading(false);
        }, 1000); // Simulate loading delay
    };
  
    const copyToClipboard = () => {
        if (password) {
            navigator.clipboard.writeText(password);
            setCopied(true);
        }
    };
  
    return (
        <div className="flex bg-black flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md ">
                <h2 className="text-2xl font-bold text-red-500 mb-6 text-center">Password Generator</h2>
                <label className="block mb-4">
                    <span className="text-gray-700">Password Length:</span>
                    <input 
                        type="number" 
                        value={length} 
                        onChange={(e) => setLength(e.target.value)} 
                        min="1" 
                        className="mt-1 block w-full rounded-md border-gray-800 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </label>
                <label className="block mb-2">
                    <input 
                        type="checkbox" 
                        checked={includeUppercase} 
                        onChange={(e) => setIncludeUppercase(e.target.checked)} 
                        className="mr-2"
                    />
                    Include Uppercase Letters
                </label>
                <label className="block mb-2">
                    <input 
                        type="checkbox" 
                        checked={includeLowercase} 
                        onChange={(e) => setIncludeLowercase(e.target.checked)} 
                        className="mr-2"
                    />
                    Include Lowercase Letters
                </label>
                <label className="block mb-2">
                    <input 
                        type="checkbox" 
                        checked={includeNumbers} 
                        onChange={(e) => setIncludeNumbers(e.target.checked)} 
                        className="mr-2"
                    />
                    Include Numbers
                </label>
                <label className="block mb-4">
                    <input 
                        type="checkbox" 
                        checked={includeSymbols} 
                        onChange={(e) => setIncludeSymbols(e.target.checked)} 
                        className="mr-2"
                    />
                    Include Symbols
                </label>
                <button 
                    onClick={generatePassword} 
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 hover:rounded-lg focus:outline-none focus:bg-indigo-700"
                    disabled={loading}
                >
                    {loading ? 'Generating...' : 'Generate Password'}
                </button>
                <p className="mt-6 text-gray-700">
                    Your generated password: <strong className="text-indigo-600">{password}</strong>
                </p>
                <button 
                    onClick={copyToClipboard} 
                    className={`w-full mt-4 py-2 px-4 rounded ${password ? 'bg-slate-700 hover:bg-slate-900 hover:rounded-lg text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                    disabled={!password}
                >
                    {copied ? 'Copied!' : 'Copy Password'}
                </button>
            </div>
        </div>
    );
};

export default Home;
