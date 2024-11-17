"use client";

import React, { useState } from 'react';
import styles from './Questions.module.css';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';

const Questions = () => {
  const [questionsData, setQuestionsData] = useState({
    university: "",
    major: "",
    graduationYear: "",
    internships: [""], // Starts with one empty internship field
  });

  // Update fields for university, major, and graduation year
  const handleFieldChange = (e, field) => {
    setQuestionsData((prevData) => ({ ...prevData, [field]: e.target.value }));
  };

  // Update individual internship entries
  const handleInternshipChange = (index, value) => {
    setQuestionsData((prevData) => {
      const updatedInternships = [...prevData.internships];
      updatedInternships[index] = value;
      return { ...prevData, internships: updatedInternships };
    });
  };

  // Add a new internship entry
  const addInternship = () => {
    setQuestionsData((prevData) => ({
      ...prevData,
      internships: [...prevData.internships, ""],
    }));
  };

  // Delete an internship entry
  const deleteInternship = (index) => {
    setQuestionsData((prevData) => {
      const updatedInternships = prevData.internships.filter((_, i) => i !== index);
      return { ...prevData, internships: updatedInternships };
    });
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!questionsData.university || !questionsData.major || !questionsData.graduationYear) {
      alert('Please fill in all required fields');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail'),
          ...questionsData
        })
      });
  
      if (response.ok) {
        router.push('/profile');
      } else {
        alert('Error updating profile');
      }
    } catch (error) {
      alert('An error occurred while saving profile');
    }
  };

  return (
    <div className={styles.questionsContainer}>
      <h2 className={styles.title}>Tell me about yourself!</h2>

      <div className={styles.questionField}>
        <label>What university?</label>
        <input
          className={styles.inputField}
          value={questionsData.university}
          onChange={(e) => handleFieldChange(e, 'university')}
          placeholder="Enter your university"
        />
      </div>

      <div className={styles.questionField}>
        <label>What major?</label>
        <input
          className={styles.inputField}
          value={questionsData.major}
          onChange={(e) => handleFieldChange(e, 'major')}
          placeholder="Enter your major"
        />
      </div>

      <div className={styles.questionField}>
        <label>What graduation year?</label>
        <input
          className={styles.inputField}
          type="number"
          value={questionsData.graduationYear}
          onChange={(e) => handleFieldChange(e, 'graduationYear')}
          placeholder="Enter your graduation year"
        />
      </div>

      <div className={styles.questionField}>
        <label>What internships?</label>
        <div className={styles.internshipList}>
          {questionsData.internships.map((internship, index) => (
            <div key={index} className={styles.internshipItem}>
              <input
                className={styles.inputField}
                value={internship}
                onChange={(e) => handleInternshipChange(index, e.target.value)}
                placeholder="Type to search or add internship"
              />
              <FaTrashAlt
                className={styles.deleteIcon}
                onClick={() => deleteInternship(index)}
              />
            </div>
          ))}
        </div>
        <button onClick={addInternship} className={styles.addInternshipButton}>
          <FaPlus /> Add Internship
        </button>
        <button 
          onClick={handleSubmit} 
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-4"
        >
            Finish Profile
        </button>
      </div>
    </div>
  );
};

export default Questions;
