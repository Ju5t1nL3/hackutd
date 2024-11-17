// components/ApplicationForm.js
import React, { useState } from 'react';
import styles from '../styles/ApplicationForm.module.css';

function ApplicationForm({ jobId }) {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
    } else {
      alert('Please upload a PDF file for your resume');
    }
  };

  const handleCoverLetterUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setCoverLetter(file);
    } else {
      alert('Please upload a PDF file for your cover letter');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resume || !coverLetter) {
      alert('Please upload both resume and cover letter');
      return;
    }
    console.log('Submitted for job ID:', jobId, { resume, coverLetter });
    // Here you would typically send the data to your server
  };

  return (
    <div className={styles.applicationForm}>
      <form onSubmit={handleSubmit}>
        <div className={styles.uploadButtons}>
          <div className={styles.uploadGroup}>
            <label htmlFor="resume" className={styles.uploadLabel}>
              Upload Resume (PDF)
              <input
                type="file"
                id="resume"
                accept=".pdf"
                onChange={handleResumeUpload}
                className={styles.fileInput}
                style={{ display: 'none' }}
              />
            </label>
            {resume && <span className={styles.fileName}>{resume.name}</span>}
          </div>

          <div className={styles.uploadGroup}>
            <label htmlFor="coverLetter" className={styles.uploadLabel}>
              Upload Cover Letter (PDF)
              <input
                type="file"
                id="coverLetter"
                accept=".pdf"
                onChange={handleCoverLetterUpload}
                className={styles.fileInput}
                style={{ display: 'none' }}
              />
            </label>
            {coverLetter && <span className={styles.fileName}>{coverLetter.name}</span>}
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default ApplicationForm;