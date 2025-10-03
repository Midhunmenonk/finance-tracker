# React + Vite
FinanceTrack - Personal Finance Tracker
FinanceTrack is a modern, responsive personal finance application built with React.js. It allows users to track their income and expenses, set monthly budget goals, and gain insights into their spending habits, all with real-time currency conversion.

✨ Features
Dashboard Overview: A comprehensive summary of your total income, expenses, and current balance.

Transaction Management: Easily add, edit, and delete income or expense transactions.

Budgeting: Set, manage, and track your progress against monthly budget goals for different categories.

Real-time Currency Conversion: Input transactions in various currencies (USD, EUR, INR, etc.) and see all totals displayed in your preferred base currency using the latest exchange rates.

Data Visualization: Interactive charts provide a clear breakdown of your spending habits.

Spending Insights: Get dynamic feedback and suggestions based on your financial patterns.

Fully Responsive: A clean and intuitive UI that works seamlessly across desktops, tablets, and mobile devices.


🛠️ Tech Stack

Frontend: React.js (with Vite

State Management: Redux Toolkit (including RTK Query for API calls)

Styling: Tailwind CSS

Routing: React Router

Charts: Recharts

Icons: React Icons


📋 Prerequisites

Node.js (v18.x or later recommended)

npm 

To run this project:-

1. Clone the Repository
   
   git clone https://github.com/your-username/finance-tracker.git
   
   cd finance-tracker

3. Install Dependencies
   
   npm install

5. Set Up Environment Variables
   
   -This project requires an API key from ExchangeRate-API for currency conversion.
   
   -Sign up for a free API key at www.exchangerate-api.com.
   
   -Create a new file named .env in the root of your project.
   
   -Add your API key to the .env file like this:
   
   -VITE_EXCHANGE_RATE_API_KEY=your_api_key_here

7. Run the Development Server
   
   npm run dev


