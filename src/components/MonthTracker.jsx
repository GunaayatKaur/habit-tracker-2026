import React, { useState, useEffect } from 'react';
import './MonthTracker.css';

const MonthTracker = ({ month, habits, onBack }) => {
  const [highlights, setHighlights] = useState([]);
  const [newHighlight, setNewHighlight] = useState('');
  const [habitData, setHabitData] = useState({});

  const getDaysInMonth = (monthName) => {
    const monthIndex = [
      'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
      'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ].indexOf(monthName);

    const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonth[monthIndex];
  };

  const days = getDaysInMonth(month);

  useEffect(() => {
    const savedHighlights = localStorage.getItem(`highlights_${month}_2026`);
    const savedHabitData = localStorage.getItem(`habitData_${month}_2026`);

    if (savedHighlights) {
      setHighlights(JSON.parse(savedHighlights));
    }

    if (savedHabitData) {
      setHabitData(JSON.parse(savedHabitData));
    } else {
      const initialData = {};
      habits.forEach(habit => {
        initialData[habit] = Array(days).fill(false);
      });
      setHabitData(initialData);
    }
  }, [month, habits, days]);

  const saveData = (newHabitData, newHighlights) => {
    localStorage.setItem(`habitData_${month}_2026`, JSON.stringify(newHabitData));
    if (newHighlights !== undefined) {
      localStorage.setItem(`highlights_${month}_2026`, JSON.stringify(newHighlights));
    }
  };

  const toggleHabit = (habitName, dayIndex) => {
    const newData = { ...habitData };
    newData[habitName][dayIndex] = !newData[habitName][dayIndex];
    setHabitData(newData);
    saveData(newData);
  };

  const addHighlight = () => {
    if (newHighlight.trim()) {
      const newHighlights = [...highlights, newHighlight];
      setHighlights(newHighlights);
      setNewHighlight('');
      saveData(habitData, newHighlights);
    }
  };

  const removeHighlight = (index) => {
    const newHighlights = highlights.filter((_, i) => i !== index);
    setHighlights(newHighlights);
    saveData(habitData, newHighlights);
  };

  return (
    <div className="tracker-container">
      <header className="tracker-header">
        <button className="back-button" onClick={onBack}>
        ← Back to Dashboard
        </button>
        <h1 className="tracker-title">{month} 2026</h1>
      </header>

      <div className="tracker-content">
        <div className="highlights-section">
          <h2 className="highlights-title">Highlight moments of the month</h2>
          <div className="highlights-box">
            <ul className="highlights-list">
              {highlights.map((highlight, index) => (
                <li key={index} className="highlight-item">
                  <span className="highlight-bullet">•</span>
                  <span className="highlight-text">{highlight}</span>
                  <button
                    className="remove-highlight"
                    onClick={() => removeHighlight(index)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            <div className="add-highlight">
              <input
                type="text"
                className="highlight-input"
                placeholder="Add a highlight..."
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addHighlight()}
              />
              <button className="add-highlight-btn" onClick={addHighlight}>
                +
              </button>
            </div>
          </div>
        </div>

        <div className="tracker-grid-section">
          <div className="tracker-grid">
            <div className="grid-header">
              <div className="day-column header-cell">Day</div>
              {habits.map((habit, index) => (
                <div key={index} className="habit-column header-cell">
                  {habit}
                </div>
              ))}
            </div>

            <div className="grid-body">
              {Array.from({ length: days }, (_, dayIndex) => (
                <div key={dayIndex} className="grid-row">
                  <div className="day-cell">{dayIndex + 1}</div>
                  {habits.map((habit, habitIndex) => (
                    <div key={habitIndex} className="checkbox-cell">
                      <input
                        type="checkbox"
                        className="habit-checkbox"
                        checked={habitData[habit]?.[dayIndex] || false}
                        onChange={() => toggleHabit(habit, dayIndex)}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthTracker;
