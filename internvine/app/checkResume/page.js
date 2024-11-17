'use client';

import PdfViewer from '../components/PdfViewer';
import styles from './CheckResume.module.css';

export default function CheckResumePage() {
  const fileUrl = '/resumes/sample.pdf'; // Updated path to PDF in the public/resumes folder

  return (
    <div className={styles.checkResumeContainer}>
      {/* Left Section: PDF Viewer */}
      <div className={styles.pdfSection}>
        <PdfViewer fileUrl={fileUrl} />
      </div>

      {/* Right Section: Grading Status */}
      <div className={styles.statusSection}>
        <h2>Grading Status</h2>
        <p>Oops, not graded yet.</p>
      </div>
    </div>
  );
}
