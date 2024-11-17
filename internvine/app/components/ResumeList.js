// components/ResumeList.js
import React, { useState } from 'react';

export default function ResumeList({ resumes, query, filters, onReviewSubmit }) {
  const [reviewText, setReviewText] = useState({});

  const filteredResumes = resumes.filter(resume => 
    resume.name.toLowerCase().includes(query.toLowerCase()) &&
    // Add more filter logic here based on your `filters` object
    true
  );

  const handleReviewChange = (resumeId, text) => {
    setReviewText(prev => ({ ...prev, [resumeId]: text }));
  };

  const handleSubmitReview = (resumeId) => {
    onReviewSubmit(resumeId, reviewText[resumeId]);
    setReviewText(prev => ({ ...prev, [resumeId]: '' }));
  };

  return (
    <div className={styles.resumeList}>
      {filteredResumes.map(resume => (
        <div key={resume.id} className={styles.resumeItem}>
          <h3>{resume.name}</h3>
          <p>Experience: {resume.experience} years</p>
          <a href={resume.fileUrl} target="_blank" rel="noopener noreferrer" className={styles.viewButton}>
            View Resume
          </a>
          <textarea
            value={reviewText[resume.id] || ''}
            onChange={(e) => handleReviewChange(resume.id, e.target.value)}
            placeholder="Write your review here..."
            className={styles.reviewTextarea}
          />
          <button 
            onClick={() => handleSubmitReview(resume.id)}
            className={styles.submitButton}
          >
            Submit Review
          </button>
        </div>
      ))}
    </div>
  );
}