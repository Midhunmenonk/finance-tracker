import React from 'react';

const SummaryCard = ({ title, amount, icon, color, baseCurrency = 'USD' }) => {
  const colorSchemes = {
    green: { bg: 'bg-green-100', text: 'text-green-800', iconBg: 'bg-green-200', progress: 'bg-green-500' },
    red: { bg: 'bg-red-100', text: 'text-red-800', iconBg: 'bg-red-200', progress: 'bg-red-500' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-800', iconBg: 'bg-blue-200', progress: 'bg-blue-500' },
  };

  const scheme = colorSchemes[color] || colorSchemes.blue;
  
  // Uses the baseCurrency prop to format the currency correctly
  const formattedAmount = amount.toLocaleString('en-US', {
    style: 'currency',
    currency: baseCurrency,
  });

  return (
    <div className={`${scheme.bg} ${scheme.text} p-6 rounded-xl shadow-md`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold mt-1">{formattedAmount}</p>
        </div>
        <div className={`p-3 rounded-full ${scheme.iconBg}`}>
          {React.cloneElement(icon, { className: `text-3xl ${scheme.text}` })}
        </div>
      </div>
      <div className="mt-4 bg-gray-200 rounded-full h-2 w-full">
        <div className={`${scheme.progress} h-2 rounded-full w-2/3`}></div>
      </div>
    </div>
  );
};

export default SummaryCard;