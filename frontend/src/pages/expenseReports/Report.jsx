import React, { useState } from 'react';
import { useItemStore } from '../../store/itemStore';
import { useCatStore } from '../../store/catStore';
import './report.css'; 

function Report() {
  const [timePeriod, setTimePeriod] = useState('monthly');
  const { items } = useItemStore(); 
  const { category } = useCatStore(); 

  const categorizeItems = (items) => {
    const daily = { total: 0, categories: {} };
    const weekly = { total: 0, categories: {} };
    const monthly = { total: 0, categories: {} };

    const addSpending = (period, categoryName, amount) => {
      period.total += amount;
      if (!period.categories[categoryName]) {
        period.categories[categoryName] = 0;
      }
      period.categories[categoryName] += amount;
    };

    items.forEach(item => {
      const amount = item.amount;
      const categoryObj = category.find(ele => ele._id === item.category);
      const categoryName = categoryObj.name;
      const date = new Date(item.date);
      const now = new Date();

      if (date.toDateString() === now.toDateString()) {
        addSpending(daily, categoryName, amount);
      }

      const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
      if (date >= weekStart && date <= now) {
        addSpending(weekly, categoryName, amount);
      }

      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      if (date >= monthStart && date <= now) {
        addSpending(monthly, categoryName, amount);
      }
    });

    return { daily, weekly, monthly };
  };

  const spendingData = categorizeItems(items);

  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
  };

  const { total, categories } = spendingData[timePeriod];

  return (
    <div className="report-container">
      <h1 className="report-title">Expense Report</h1>

      <div className="time-period">
        <label htmlFor="timePeriod">Time Period: </label>
        <select id="timePeriod" value={timePeriod} onChange={handleTimePeriodChange}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="total-spending">
        <h2>Total Spending: ${total.toFixed(2)}</h2>
      </div>

      <div className="spending-category">
        <h3>Spending by Category</h3>
        {total === 0 ? (
          <p className="no-spendings">No spendings</p>
        ) : (
          <ul className="category-list">
            {Object.entries(categories).map(([cat, amount]) => (
              <li key={cat}>{cat}: ${amount.toFixed(2)}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Report;
