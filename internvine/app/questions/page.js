"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Questions.module.css';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';

const Questions = () => {
  const router = useRouter();
  const [questionsData, setQuestionsData] = useState({
    university: "",
    major: "",
    graduationYear: "",
    internships: [""],
  });

  const handleFieldChange = (e, field) => {
    setQuestionsData((prevData) => ({ ...prevData, [field]: e.target.value }));
  };

  const handleInternshipChange = (index, value) => {
    setQuestionsData((prevData) => {
      const updatedInternships = [...prevData.internships];
      updatedInternships[index] = value;
      return { ...prevData, internships: updatedInternships };
    });
  };

  const addInternship = () => {
    setQuestionsData((prevData) => ({
      ...prevData,
      internships: [...prevData.internships, ""],
    }));
  };

  const deleteInternship = (index) => {
    setQuestionsData((prevData) => {
      const updatedInternships = prevData.internships.filter((_, i) => i !== index);
      return { ...prevData, internships: updatedInternships };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        const data = await response.json();
        alert(data.error || 'Error updating profile');
      }
    } catch (error) {
      alert('An error occurred while saving profile');
    }
  };

  return (
    <div className={styles.questionsContainer}>
      <h2 className={styles.title}>Tell me about yourself!</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.questionField}>
          <label htmlFor="university">What university?</label>
          <input
            id="university"
            className={styles.inputField}
            value={questionsData.university}
            onChange={(e) => handleFieldChange(e, 'university')}
            placeholder="Enter your university"
            required
          />
        </div>

        <div className={styles.questionField}>
          <label htmlFor="major">What major?</label>
          <input
            id="major"
            className={styles.inputField}
            value={questionsData.major}
            onChange={(e) => handleFieldChange(e, 'major')}
            placeholder="Enter your major"
            required
          />
        </div>

        <div className={styles.questionField}>
          <label htmlFor="graduationYear">What graduation year?</label>
          <input
            id="graduationYear"
            className={styles.inputField}
            type="number"
            value={questionsData.graduationYear}
            onChange={(e) => handleFieldChange(e, 'graduationYear')}
            placeholder="Enter your graduation year"
            required
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
          <button type="button" onClick={addInternship} className={styles.addInternshipButton}>
            <FaPlus /> Add Internship
          </button>
        </div>

        <button 
          type="submit" 
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-4"
        >
          Finish Profile
        </button>
      </form>
    </div>
  );
};

export default Questions;
