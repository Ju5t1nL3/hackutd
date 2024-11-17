// components/SearchResults.js
import SearchResultItem from './SearchResultItem';
import styles from '../styles/SearchResults.module.css';

export default function SearchResults({ query, filters }) {
  const mockResults = [
    { id: 1, title: 'Summer 2025 - CUDA Intern', image: '/nvidia.jpg', company: 'NVIDIA' },
    { id: 2, title: 'Spring 2025 - Software Development Intern', image: '/google.jpg', company: 'Google' },
    { id: 3, title: 'Spring 2025 - Structural Engineer Intern', image: '/boeing.jpeg', company: 'Boeing' },
  ];

  return (
    <div className={styles.searchResults}>
      {mockResults.map((result) => (
        <SearchResultItem key={result.id} {...result} />
      ))}
    </div>
  );
}