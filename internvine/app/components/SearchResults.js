// components/SearchResults.js
import SearchResultItem from './SearchResultItem';
import styles from '../styles/SearchResults.module.css';

export default function SearchResults({ query, filters }) {
  const mockResults = [
    { id: 1, title: 'Summer 2025 - NVIDIA Ignite Internship', image: '/nvidia.jpg', company: 'NVIDIA' },
    { id: 2, title: 'Spring 2025 - Google STEP Internship', image: '/google.jpg', company: 'Google' },
    { id: 3, title: 'Spring 2025 - Boeing Structural Engineering Intern', image: '/boeing.jpeg', company: 'Boeing' },
  ];

  // Filter the results based on the search query
  const filteredResults = mockResults.filter(result =>
    result.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.searchResults}>
      {filteredResults.map((result) => (
        <SearchResultItem key={result.id} {...result} />
      ))}
    </div>
  );
}