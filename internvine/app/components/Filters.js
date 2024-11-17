// components/Filters.js
import React, { useState } from 'react';
import styles from './Filters.module.css';

export default function Filters({ onChange }) {
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);

  // Company and Time filter options
  const companies = ['NVIDIA', 'Google', 'Boeing', 'Apple', 'Lockheed'];
  const times = ['Spring', 'Summer'];

  // Handle changes for company checkboxes
  const handleCompanyChange = (company) => {
    setSelectedCompanies((prev) => {
      const newSelection = prev.includes(company)
        ? prev.filter((item) => item !== company)
        : [...prev, company];
      
      // Trigger onChange after updating selectedCompanies
      onChange({ companies: newSelection, times: selectedTimes });
      return newSelection;
    });
  };

  // Handle changes for time checkboxes
  const handleTimeChange = (time) => {
    setSelectedTimes((prev) => {
      const newSelection = prev.includes(time)
        ? prev.filter((item) => item !== time)
        : [...prev, time];
      
      // Trigger onChange after updating selectedTimes
      onChange({ companies: selectedCompanies, times: newSelection });
      return newSelection;
    });
  };

  return (
    <div className={styles.filters}>
      {/* Company Filter Section */}
      <div className={styles.filterSection}>
        <h3>Company</h3>
        {companies.map((company) => (
          <label key={company} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={selectedCompanies.includes(company)}
              onChange={() => handleCompanyChange(company)}
            />
            {company}
          </label>
        ))}
      </div>

      {/* Time Filter Section */}
      <div className={styles.filterSection}>
        <h3>Time</h3>
        {times.map((time) => (
          <label key={time} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={selectedTimes.includes(time)}
              onChange={() => handleTimeChange(time)}
            />
            {time}
          </label>
        ))}
      </div>
    </div>
  );
}
