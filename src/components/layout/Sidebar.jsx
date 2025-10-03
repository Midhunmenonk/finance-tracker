// src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiList, FiTarget } from 'react-icons/fi';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const linkClasses = "flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-200";
  const activeLinkClasses = "bg-purple-600 text-white";

  // Function to close sidebar on link click (for mobile view)
  const handleLinkClick = () => {
    if (window.innerWidth < 768) { // md breakpoint is 768px
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile view */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-[#1e222d] text-white p-5 flex flex-col transform transition-transform duration-300 ease-in-out z-40 
                   ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                   md:relative md:translate-x-0 md:flex`}
      >
        <div className="text-2xl font-bold mb-12 text-center text-purple-400">
          FinanceTrack
        </div>
        <nav>
          <ul className="space-y-3">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
                onClick={handleLinkClick}
              >
                <FiGrid className="mr-3" size={20} />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/transactions" 
                className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
                onClick={handleLinkClick}
              >
                <FiList className="mr-3" size={20} />
                <span>Transactions</span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/budgets" 
                className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
                onClick={handleLinkClick}
              >
                <FiTarget className="mr-3" size={20} />
                <span>Budgets</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;