// app/review/[profileId]/page.js
"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PdfViewer from '../components/PdfViewer'; // Assuming the PdfViewer is located in a components folder
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
        <h2>Oops! Looks like no one has graded your resume.</h2>
        
      </div>
    </div>
  );
}
