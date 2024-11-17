"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Profile.module.css';
import { FaPencilAlt, FaTrashAlt, FaPlus, FaSignOutAlt } from 'react-icons/fa';

const Profile = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    university: "",
    major: "",
    graduationYear: "",
    internships: [],
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/profile?email=${userEmail}`);
        if (response.ok) {
          const data = await response.json();
          setProfileData({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            university: data.university,
            major: data.major,
            graduationYear: data.graduationYear,
            internships: data.internships,
          });
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [router]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleFieldChange = (e, field) => {
    setProfileData((prevData) => ({ ...prevData, [field]: e.target.value }));
  };

  const handleInternshipChange = (index, value) => {
    setProfileData((prevData) => {
      const updatedInternships = [...prevData.internships];
      updatedInternships[index] = value;
      return { ...prevData, internships: updatedInternships };
    });
  };

  const addInternship = () => {
    setProfileData((prevData) => ({
      ...prevData,
      internships: [...prevData.internships, ""],
    }));
  };

  const deleteInternship = (index) => {
    setProfileData((prevData) => {
      const updatedInternships = prevData.internships.filter((_, i) => i !== index);
      return { ...prevData, internships: updatedInternships };
    });
  };

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
            {profileData.internships.map((internship, index) => (
              <div key={index} className={styles.internshipItem}>
                <input
                  value={internship}
                  onChange={(e) => handleInternshipChange(index, e.target.value)}
                />
                <FaTrashAlt onClick={() => deleteInternship(index)} />
              </div>
            ))}
            <button onClick={addInternship}>
              <FaPlus /> Add Internship
            </button>
          </div>
        ) : (
            <ul>
              {profileData.internships.map((internship, index) => (
                <li key={index}>{internship}</li>
              ))}
            </ul>
          )}
      </div>
    </div>
  );
};

export default Profile;
