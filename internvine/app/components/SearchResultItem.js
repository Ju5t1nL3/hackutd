// components/SearchResultItem.js
import Link from 'next/link';
import styles from '../styles/SearchResultItem.module.css';

export default function SearchResultItem({ id, title, image, company }) {
  return (
    <Link href={`/companies/${company.toLowerCase()}`} className={styles.searchResultItem}>
      <img src={image} alt={title} className={styles.resultImage} />
      <h3 className={styles.resultTitle}>{title}</h3>
    </Link>
  );
}