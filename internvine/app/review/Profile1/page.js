"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PdfViewer from '../../components/PdfViewer';
import styles from './Review.module.css';

export default function ReviewPage({ params }) {
  const { profileId } = params;
  const router = useRouter();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Review for profile ${profileId}:`, reviewData);
    
    // Submit review data here (e.g., via API call)
    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // After successful submission, navigate to a different page
      router.push('/dashboard'); // Replace '/thank-you' with your desired route
    } catch (error) {
      console.error('Error submitting review:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className={styles.reviewContainer}>
      {/* Left Section: Resume-style data */}
      <div className={styles.resumeSection}>
        <h2>Profile Resume</h2>
        <PdfViewer pdfUrl="/Resume.pdf" />
      </div>

      {/* Right Section: Review fields */}
      <div className={styles.reviewSection}>
        <h2>Submit a Review</h2>
        <form onSubmit={handleSubmit}>
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
              required
            />
          </div>

          <div className={styles.field}>
            <label>What you like</label>
            <textarea
              name="likes"
              value={reviewData.likes}
              onChange={handleChange}
              placeholder="What did you like?"
              required
            />
          </div>

        <div className={styles.field}>
          <label>What you don&apos;t like</label>
          <textarea
            name="dislikes"
            value={reviewData.dislikes}
            onChange={handleChange}
            placeholder="What didn&apos;t you like?"
          />
        </div>
          <div className={styles.field}>
            <label>What you don't like</label>
            <textarea
              name="dislikes"
              value={reviewData.dislikes}
              onChange={handleChange}
              placeholder="What didn't you like?"
              required
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

          <button type="submit" className={styles.submitButton}>
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
