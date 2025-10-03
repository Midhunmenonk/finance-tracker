import React from 'react';
import { FiMenu } from 'react-icons/fi';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm md:hidden">
      <div className="p-4 flex items-center">
        <button onClick={toggleSidebar} className="text-gray-600 hover:text-gray-900">
          <FiMenu size={24} />
        </button>
        <div className="text-xl font-bold ml-4 text-purple-600">
          FinanceTrack
        </div>
      </div>
    </header>
  );
};

export default Header;