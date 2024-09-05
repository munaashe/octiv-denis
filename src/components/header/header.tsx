import React from 'react';
import { useTheme } from '../../context/theme-context';

interface HeaderProps {
    activeTab: 'map' | 'table';
    setActiveTab: React.Dispatch<React.SetStateAction<'map' | 'table'>>;
}
const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
    const { theme, toggleTheme } = useTheme();
    return (
        <header className="p-4 bg-gray-200 dark:bg-gray-900 flex justify-between items-center w-full">
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => setActiveTab('map')}
                    className={`py-2 px-4 font-bold ${activeTab === 'map'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        } rounded`}
                >
                    Map View
                </button>
                <button
                    onClick={() => setActiveTab('table')}
                    className={`py-2 px-4 font-bold ${activeTab === 'table'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        } rounded`}
                >
                    Table View
                </button>
            </div>
            <button onClick={toggleTheme} className="focus:outline-none w-8 h-8">
                {theme === 'dark' ? (
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <g clipPath="url(#clip0)" fill="#ffffff">
                                <path d="M12 0a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V1a1 1 0 0 1 1-1ZM4.929 3.515a1 1 0 0 0-1.414 1.414l2.828 2.828a1 1 0 0 0 1.414-1.414L4.93 3.515ZM1 11a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H1ZM18 12a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1ZM17.657 16.243a1 1 0 0 0-1.414 1.414l2.828 2.828a1 1 0 1 0 1.414-1.414l-2.828-2.828ZM7.757 17.657a1 1 0 1 0-1.414-1.414L3.515 19.07a1 1 0 1 0 1.414 1.414l2.828-2.828ZM20.485 4.929a1 1 0 0 0-1.414-1.414l-2.828 2.828a1 1 0 1 0 1.414 1.414l2.828-2.828ZM13 19a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0v-4ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <path fill="#ffffff" d="M0 0h24v24H0z"></path>
                                </clipPath>
                            </defs>
                        </g>
                    </svg>
                ) : (
                    <svg
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <defs>
                                <style>
                                    {`.c {fill:#000000;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;}`}
                                </style>
                            </defs>
                            <path
                                className="c"
                                d="m32.8,29.3c-8.9-.8-16.2-7.8-17.5-16.6-.3-1.8-.3-3.7,0-5.4.2-1.4-1.4-2.3-2.5-1.6C6.3,9.7,2.1,16.9,2.5,25c.5,10.7,9,19.5,19.7,20.4,10.6.9,19.8-6,22.5-15.6.4-1.4-1-2.6-2.3-2-2.9,1.3-6.1,1.8-9.6,1.5Z"
                            />
                        </g>
                    </svg>
                )}
            </button>
        </header>
    );
};

export default Header;