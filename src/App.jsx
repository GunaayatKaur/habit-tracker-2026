// import React, { useState, useEffect } from 'react';
// import './App.css';
// import HabitSetup from './components/HabitSetup';
// import MonthDashboard from './components/MonthDashboard';
// import MonthTracker from './components/MonthTracker';

// function App() {
//   const [habits, setHabits] = useState([]);
//   const [isSetupComplete, setIsSetupComplete] = useState(false);
//   const [selectedMonth, setSelectedMonth] = useState(null);

//   useEffect(() => {
//     const savedHabits = localStorage.getItem('habits2026');
//     const setupComplete = localStorage.getItem('setupComplete2026');

//     if (savedHabits && setupComplete === 'true') {
//       setHabits(JSON.parse(savedHabits));
//       setIsSetupComplete(true);
//     }
//   }, []);

//   const handleHabitsSubmit = (habitList) => {
//     setHabits(habitList);
//     setIsSetupComplete(true);
//     localStorage.setItem('habits2026', JSON.stringify(habitList));
//     localStorage.setItem('setupComplete2026', 'true');
//   };

//   const handleMonthSelect = (month) => {
//     setSelectedMonth(month);
//   };

//   const handleBackToDashboard = () => {
//     setSelectedMonth(null);
//   };

//   if (!isSetupComplete) {
//     return <HabitSetup onSubmit={handleHabitsSubmit} />;
//   }

//   if (selectedMonth) {
//     return (
//       <MonthTracker
//         month={selectedMonth}
//         habits={habits}
//         onBack={handleBackToDashboard}
//       />
//     );
//   }

//   return <MonthDashboard onMonthSelect={handleMonthSelect} />;
// }

// export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import HabitSetup from './components/HabitSetup';
import MonthDashboard from './components/MonthDashboard';
import MonthTracker from './components/MonthTracker';

function App() {
  const [habits, setHabits] = useState([]);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [isEditingHabits, setIsEditingHabits] = useState(false);

  useEffect(() => {
    const savedHabits = localStorage.getItem('habits2026');
    const setupComplete = localStorage.getItem('setupComplete2026');

    if (savedHabits && setupComplete === 'true') {
      setHabits(JSON.parse(savedHabits));
      setIsSetupComplete(true);
    }
  }, []);

  const handleHabitsSubmit = (habitList) => {
    setHabits(habitList);
    setIsSetupComplete(true);
    setIsEditingHabits(false);
    localStorage.setItem('habits2026', JSON.stringify(habitList));
    localStorage.setItem('setupComplete2026', 'true');
  };

  const handleEditHabits = () => {
    setIsEditingHabits(true);
    setSelectedMonth(null);
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
  };

  const handleBackToDashboard = () => {
    setSelectedMonth(null);
  };

  if (!isSetupComplete || isEditingHabits) {
    return (
      <HabitSetup 
        onSubmit={handleHabitsSubmit} 
        existingHabits={habits}
        isEditing={isEditingHabits}
      />
    );
  }

  if (selectedMonth) {
    return (
      <MonthTracker
        month={selectedMonth}
        habits={habits}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <MonthDashboard 
      onMonthSelect={handleMonthSelect}
      onEditHabits={handleEditHabits}
    />
  );
}

export default App;
