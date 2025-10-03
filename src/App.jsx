// src/App.jsx
import { useState } from 'react'; // Import useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header'; // New Header component
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import BudgetPage from './pages/BudgetPage';

function App() {
  // State to manage sidebar visibility
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="relative flex min-h-screen bg-gray-100">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
        <main className="flex-1 flex flex-col">
          {/* Header will contain the hamburger button on mobile */}
          <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/budgets" element={<BudgetPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;