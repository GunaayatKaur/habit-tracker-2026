// import React, { useState } from 'react';
// import './HabitSetup.css';

// const HabitSetup = ({ onSubmit }) => {
//     const [habits, setHabits] = useState(['', '', '', '', '', '', '', '']);

//     const handleChange = (index, value) => {
//         const newHabits = [...habits];
//         newHabits[index] = value;
//         setHabits(newHabits);
//     };

//     const handleSubmit = () => {
//         const filledHabits = habits.filter(habit => habit.trim() !== '');
//         if (filledHabits.length === 0) {
//             alert('Please enter at least one habit to track!');
//             return;
//         }
//         onSubmit(filledHabits);
//     };

//     return (
//         <div className="habit-setup-container">
//             <div className="setup-content">
//                 <div className="setup-header">
//                     <h1 className="setup-title">🎯 Daily Habit Tracker 2026</h1>
//                     <p className="setup-subtitle">
//                         Want to track your habits for a more disciplined 2026?
//                     </p>
//                 </div>

//                 <div className="habits-form">
//                     <h2 className="form-title">List the habits you want to track...</h2>
//                     <div className="habits-grid">
//                         {habits.map((habit, index) => (
//                             <input
//                                 key={index}
//                                 type="text"
//                                 className="habit-input"
//                                 placeholder={`Habit ${index + 1}`}
//                                 value={habit}
//                                 onChange={(e) => handleChange(index, e.target.value)}
//                                 maxLength={50}
//                             />
//                         ))}
//                     </div>
//                 </div>

//                 <button className="submit-button" onClick={handleSubmit}>
//                     Submit & Next
//                     <span className="button-arrow">→</span>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default HabitSetup;


import React, { useState, useEffect } from 'react';
import './HabitSetup.css';

const HabitSetup = ({ onSubmit, existingHabits = [], isEditing = false }) => {
  const [habits, setHabits] = useState(['', '', '', '', '', '', '', '']);

  useEffect(() => {
    if (existingHabits.length > 0) {
      const filledHabits = [...existingHabits];
      while (filledHabits.length < 8) {
        filledHabits.push('');
      }
      setHabits(filledHabits.slice(0, 8));
    }
  }, [existingHabits]);

  const handleChange = (index, value) => {
    const newHabits = [...habits];
    newHabits[index] = value;
    setHabits(newHabits);
  };

  const handleSubmit = () => {
    const filledHabits = habits.filter(habit => habit.trim() !== '');
    if (filledHabits.length === 0) {
      alert('Please enter at least one habit to track!');
      return;
    }
    onSubmit(filledHabits);
  };

  return (
    <div className="habit-setup-container">
      <div className="setup-content">
        <div className="setup-header">
          <h1 className="setup-title">🎯 Daily Habit Tracker 2026</h1>
          <p className="setup-subtitle">
            {isEditing 
              ? 'Edit your habits below' 
              : 'Want to track your habits for a more disciplined 2026?'}
          </p>
          {isEditing && (
            <div className="edit-warning">
              <span className="warning-icon">⚠️</span>
              <span className="warning-text">
                Note: Changing habits won't affect your existing tracking data
              </span>
            </div>
          )}
        </div>

        <div className="habits-form">
          <h2 className="form-title">
            {isEditing ? 'Update your habits...' : 'List the habits you want to track...'}
          </h2>
          <div className="habits-grid">
            {habits.map((habit, index) => (
              <input
                key={index}
                type="text"
                className="habit-input"
                placeholder={`Habit ${index + 1}`}
                value={habit}
                onChange={(e) => handleChange(index, e.target.value)}
                maxLength={50}
              />
            ))}
          </div>
        </div>

        <button className="submit-button" onClick={handleSubmit}>
          {isEditing ? 'Save Changes' : 'Submit & Next'}
          <span className="button-arrow">→</span>
        </button>
      </div>
    </div>
  );
};

export default HabitSetup;
