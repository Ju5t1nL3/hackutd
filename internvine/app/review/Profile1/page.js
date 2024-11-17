// app/review/[profileId]/page.js
"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PdfViewer from '../../components/PdfViewer'; // Assuming the PdfViewer is located in a components folder
import styles from './Review.module.css';

export default function ReviewPage({ params }) {
  const { profileId } = params; // Get the profile ID from the URL
  const [reviewData, setReviewData] = useState({
    rating: '',
    likes: '',
    dislikes: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log(`Review for profile ${profileId}:`, reviewData);
    // Submit review data here (e.g., via API call)
  };

  return (
    <div className={styles.reviewContainer}>
      {/* Left Section: Resume-style data */}
      <div className={styles.resumeSection}>
        <h2>Profile Resume</h2>
        <PdfViewer pdfUrl="/Resume.pdf" /> {/* PDF viewer */}
      </div>

      {/* Right Section: Review fields */}
      <div className={styles.reviewSection}>
        <h2>Submit a Review</h2>
        
        <div className={styles.field}>
          <label>Rating</label>
          <input
            type="number"
            name="rating"
            value={reviewData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            placeholder="Rate out of 5"
          />
        </div>

        <div className={styles.field}>
          <label>What you like</label>
          <textarea
            name="likes"
            value={reviewData.likes}
            onChange={handleChange}
            placeholder="What did you like?"
          />
        </div>

        <div className={styles.field}>
          <label>What you don’t like</label>
          <textarea
            name="dislikes"
            value={reviewData.dislikes}
            onChange={handleChange}
            placeholder="What didn’t you like?"
          />
        </div>

        <div className={styles.field}>
          <label>Additional notes</label>
          <textarea
            name="notes"
            value={reviewData.notes}
            onChange={handleChange}
            placeholder="Any additional notes"
          />
        </div>

        <button onClick={handleSubmit} className={styles.submitButton}>
          Submit Review
        </button>
      </div>
    </div>
  );
}
