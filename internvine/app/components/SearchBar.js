
// components/SearchBar.js
import styles from './SearchBar.module.css';

export default function SearchBar({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(e.target.search.value);
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input type="text" name="search" placeholder="Search..." />
      <button type="submit">Search</button>
    </form>
  );
}
