"use client";
<<<<<<< Updated upstream
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
=======

import React, { useState } from 'react';
>>>>>>> Stashed changes
import styles from './Profile.module.css';
import { FaPencilAlt, FaTrashAlt, FaPlus, FaSignOutAlt } from 'react-icons/fa';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false); // Edit mode control
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    university: "Some University",
    major: "Computer Science",
    graduationYear: "2025",
    internships: ["Software Engineering Intern", "Data Science Intern"], // Default internships
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

<<<<<<< Updated upstream
  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: profileData.email,
          university: profileData.university,
          major: profileData.major,
          graduationYear: profileData.graduationYear,
          internships: profileData.internships,
        }),
      });

      if (response.ok) {
        setIsEditing(false);
        // Optionally, you can fetch the updated data here
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/signout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        localStorage.removeItem('userEmail');
        router.push('/login');
      } else {
        console.error('Failed to sign out');
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <h1>Profile</h1>
      <div className={styles.profileHeader}>
        <button onClick={handleEditToggle} className={styles.editButton}>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
        <button onClick={handleSignOut} className={styles.signOutButton}>
          <FaSignOutAlt /> Sign Out
        </button>
      </div>
      <div className={styles.profileField}>
        <label>Email:</label>
        <span>{profileData.email}</span>
      </div>

      <div className={styles.profileField}>
        <label>University:</label>
        {isEditing ? (
          <input
            value={profileData.university}
            onChange={(e) => handleFieldChange(e, 'university')}
          />
        ) : (
            <span>{profileData.university}</span>
          )}
      </div>

      <div className={styles.profileField}>
        <label>Major:</label>
        {isEditing ? (
          <input
            value={profileData.major}
            onChange={(e) => handleFieldChange(e, 'major')}
          />
        ) : (
            <span>{profileData.major}</span>
          )}
      </div>

      <div className={styles.profileField}>
        <label>Graduation Year:</label>
        {isEditing ? (
          <input
            type="number"
            value={profileData.graduationYear}
            onChange={(e) => handleFieldChange(e, 'graduationYear')}
          />
        ) : (
            <span>{profileData.graduationYear}</span>
          )}
      </div>

      <div className={styles.profileField}>
        <label>Internships:</label>
        {isEditing ? (
          <div>
=======
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          </div>
        ) : (
            <ul>
              {profileData.internships.map((internship, index) => (
                <li key={index}>{internship}</li>
              ))}
            </ul>
          )}
=======
          )}
        </div>
>>>>>>> Stashed changes
      </div>
    </div>
  );
};

export default Profile;