import React, { useState } from 'react';
import './AgeCalculator.css';

function AgeCalculator() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const calculateAge = () => {
    setError(''); 
    setResult(''); 

    const dayNum = parseInt(day);
    const monthNum = parseInt(month); 
    const yearNum = parseInt(year);

    if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) {
      setError("Please enter valid numbers for day, month, and year.");
      return;
    }
    const currentYear = new Date().getFullYear();
    if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12 || yearNum < 1900 || yearNum > currentYear) {
      setError(`Please enter a valid date (Day: 1-31, Month: 1-12, Year: 1900-${currentYear}).`);
      return;
    }


    const birthDate = new Date(yearNum, monthNum - 1, dayNum); 
    const today = new Date();

    if (birthDate.getFullYear() !== yearNum || birthDate.getMonth() !== monthNum - 1 || birthDate.getDate() !== dayNum) {
      setError("Please enter a valid date (e.g., February doesn't have 31 days).");
      return;
    }
    if (birthDate > today) {
      setError("Birth date cannot be in the future.");
      return;
    }


    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths--;
      const daysInLastMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      ageDays += daysInLastMonth;
    }
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    setResult(`You are ${ageYears} years, ${ageMonths} months, and ${ageDays} days old.`);
  };

  return (
    <div className="calculator-container component-container">
      <h1>Age Calculator</h1>
      <div className="input-group">
        <label htmlFor="day">Day:</label>
        <input type="number" id="day" placeholder="DD" min="1" max="31" value={day} onChange={(e) => setDay(e.target.value)} required />
      </div>
      <div className="input-group">
        <label htmlFor="month">Month:</label>
        <input type="number" id="month" placeholder="MM" min="1" max="12" value={month} onChange={(e) => setMonth(e.target.value)} required />
      </div>
      <div className="input-group">
        <label htmlFor="year">Year:</label>
        <input type="number" id="year" placeholder="YYYY" min="1900" max={new Date().getFullYear()} value={year} onChange={(e) => setYear(e.target.value)} required />
      </div>
      <button onClick={calculateAge}>Calculate Age</button>
      {error && <div className="result-display error">{error}</div>}
      {result && <div className="result-display">{result}</div>}
    </div>
  );
}

export default AgeCalculator;