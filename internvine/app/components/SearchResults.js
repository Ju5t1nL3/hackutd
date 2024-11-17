import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/SearchResultItem.module.css';

export default function SearchResultItem({ title, image }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={styles.searchResultItem}>
      {!imageError ? (
        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className={styles.errorImage}>Image not available</div>
      )}
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h3>{title}</h3>
      </div>
    </div>
  );
}