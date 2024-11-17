
// components/SearchResultItem.js
import styles from '../styles/SearchResultItem.module.css';

export default function SearchResultItem({ title, image }) {
  return (
    <div className={styles.searchResultItem} style={{ backgroundImage: `url(${image})` }}>
      <div className={styles.content}>
        <h3>{title}</h3>
      </div>
    </div>
  );
}
