"use client";

import React, { useState } from 'react';
import styles from './Profile.module.css';
import { FaPencilAlt, FaTrashAlt, FaPlus } from 'react-icons/fa';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false); // Edit mode control
  const [profileData, setProfileData] = useState({

    name: "Isaac Chacko",
    university: "TAMU",
    major: "Computer Science",
    graduationYear: "2025",
    internships: ["NVIDIA Ignite Intern", "Google STEP Intern"], // Default internships
  });
  const [editingField, setEditingField] = useState(null);

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditingField(null); // Reset any currently editing field
  };

  // Handle text field changes
  const handleFieldChange = (e, field) => {
    setProfileData((prevData) => ({ ...prevData, [field]: e.target.value }));
  };

  // Handle internship field changes
  const handleInternshipChange = (index, value) => {
    setProfileData((prevData) => {
      const updatedInternships = [...prevData.internships];
      updatedInternships[index] = value;
      return { ...prevData, internships: updatedInternships };
    });
  };

  // Add a new internship entry
  const addInternship = () => {
    setProfileData((prevData) => ({
      ...prevData,
      internships: [...prevData.internships, ""],
    }));
  };

  // Delete an internship entry
  const deleteInternship = (index) => {
    setProfileData((prevData) => {
      const updatedInternships = prevData.internships.filter((_, i) => i !== index);
      return { ...prevData, internships: updatedInternships };
    });
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.header}>
        <h2>Profile</h2>
        <button onClick={handleEditToggle} className={styles.editButton}>
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <div className={styles.avatarSection}>
        <div className={styles.avatar}>
          <img src="https://via.placeholder.com/100" alt="Avatar" />
          {isEditing && (
            <div className={styles.avatarEditIcon}>
              <FaPencilAlt />
            </div>
          )}
        </div>
      </div>

      <div className={styles.infoSection}>
        {Object.keys(profileData).map((field, index) => (
          field !== "internships" && (
            <div key={index} className={styles.infoField}>
              <label>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
              {editingField === field ? (
                <input
                  className={styles.inputField}
                  value={profileData[field]}
                  onChange={(e) => handleFieldChange(e, field)}
                  onBlur={() => setEditingField(null)}
                  autoFocus
                />
              ) : (
                <div className={styles.infoValue}>
                  <span>{profileData[field]}</span>
                  {isEditing && (
                    <FaPencilAlt onClick={() => setEditingField(field)} className={styles.editIcon} />
                  )}
                </div>
              )}
            </div>
          )
        ))}

        {/* Internships Section */}
        <div className={styles.infoField}>
          <label>Internships</label>
          <div className={styles.internshipList}>
            {profileData.internships.map((internship, index) => (
              <div key={index} className={styles.internshipItem}>
                {isEditing ? (
                  <>
                    <input
                      className={styles.inputField}
                      value={internship}
                      onChange={(e) => handleInternshipChange(index, e.target.value)}
                      placeholder="Type to search..."
                    />
                    <FaTrashAlt
                      className={styles.deleteIcon}
                      onClick={() => deleteInternship(index)}
                    />
                  </>
                ) : (
                  <span>{internship}</span>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <button onClick={addInternship} className={styles.addInternshipButton}>
              <FaPlus /> Add Internship
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
