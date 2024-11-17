// components/SearchResultItem.js
import Link from 'next/link';
import styles from '../styles/SearchResultItem.module.css';

export default function SearchResultItem({ id, title, image, company }) {
  return (
    <Link href={`/companies/${company.toLowerCase()}`} className={styles.searchResultItem}>
      <img src={image} alt={`${company} internship: ${title}`} className={styles.resultImage} />
      <div className={styles.resultInfo}>
        <h3 className={styles.resultTitle}>{title}</h3>
        <p className={styles.resultCompany}>{company}</p>
      </div>
    </Link>
  );
}