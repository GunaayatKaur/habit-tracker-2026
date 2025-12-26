// import React from 'react';
// import './MonthDashboard.css';

// const MonthDashboard = ({ onMonthSelect }) => {
//   const months = [
//     'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL',
//     'MAY', 'JUNE', 'JULY', 'AUGUST',
//     'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
//   ];

//   const monthEmojis = ['❄️', '💝', '🌸', '🌷', '🌺', '☀️', '🏖️', '🌻', '🍂', '🎃', '🍁', '🎄'];

//   return (
//     <div className="dashboard-container">
//       <header className="dashboard-header">
//         <h1 className="dashboard-title">Daily Habit Tracker 2026</h1>
//         <p className="dashboard-subtitle">Select a month to track your progress</p>
//       </header>

//       <div className="months-grid">
//         {months.map((month, index) => (
//           <div
//             key={month}
//             className="month-card"
//             onClick={() => onMonthSelect(month)}
//           >
//             <span className="month-emoji">{monthEmojis[index]}</span>
//             <span className="month-name">{month}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MonthDashboard;

import React from 'react';
import './MonthDashboard.css';

const MonthDashboard = ({ onMonthSelect, onEditHabits }) => {
  const months = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL',
    'MAY', 'JUNE', 'JULY', 'AUGUST',
    'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  const monthEmojis = ['❄️', '💝', '🌸', '🌷', '🌺', '☀️', '🏖️', '🌻', '🍂', '🎃', '🍁', '🎄'];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Daily Habit Tracker 2026</h1>
        <p className="dashboard-subtitle">Select a month to track your progress</p>
        <button className="edit-habits-button" onClick={onEditHabits}>
        ✏️ Edit Habits
        </button>
      </header>

      <div className="months-grid">
        {months.map((month, index) => (
          <div
            key={month}
            className="month-card"
            onClick={() => onMonthSelect(month)}
          >
            <span className="month-emoji">{monthEmojis[index]}</span>
            <span className="month-name">{month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthDashboard;