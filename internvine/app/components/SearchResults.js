
// components/SearchResults.js
import SearchResultItem from './SearchResultItem';
import styles from '../styles/SearchResults.module.css';

export default function SearchResults({ query, filters }) {
  // In a real application, you would fetch results based on the query and filters
  const mockResults = [
    { id: 1, title: 'Result 1', image: '/image1.jpg' },
    { id: 2, title: 'Result 2', image: '/image2.jpg' },
    { id: 3, title: 'Result 3', image: '/image3.jpg' },
  ];

  return (
    <div className={styles.searchResults}>
      {mockResults.map((result) => (
        <SearchResultItem key={result.id} {...result} />
      ))}
    </div>
  );
}
