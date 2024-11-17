// components/SearchResults.js

import SearchResultItem from './SearchResultItem';
import styles from './SearchResults.module.css';

export default function SearchResults({ query, filters }) {
  const mockResults = [
    { id: 1, title: 'Summer 2025 - Ignite Internship', image: '/nvidia.jpg', company: 'NVIDIA' },
    { id: 2, title: 'Spring 2025 - STEP Program', image: '/google.jpg', company: 'Google' },
    { id: 3, title: 'Spring 2025 - Structural Engineering Intern', image: '/boeing.jpeg', company: 'Boeing' },
    { id: 4, title: 'Spring 2025 - Virtual Reality Intern', image: '/apple.jpg', company: 'Apple' },
    { id: 5, title: 'Fall 2025 - Mechanical Engineering Intern', image: '/lockheed.jpg', company: 'Lockheed' },
  ];

  // Ensure filters have default values to avoid undefined errors
  const companies = filters.companies || [];
  const times = filters.times || [];

  // Filter results based on query and filters for company and time
  const filteredResults = mockResults.filter(result => {
    const matchesQuery = result.title.toLowerCase().includes(query.toLowerCase());
    const matchesCompany = companies.length === 0 || companies.includes(result.company);
    const matchesTime = times.length === 0 || times.some(time => result.title.includes(time));
    
    return matchesQuery && matchesCompany && matchesTime;
  });

  return (
    <div className={styles.searchResults}>
      {filteredResults.length === 0 ? (
        <h2 className={styles.noResults}>No results found</h2>
      ) : (
        filteredResults.map(result => (
          <SearchResultItem
            key={result.id}
            id={result.id}
            title={result.title}
            image={result.image}
            company={result.company}
          />
        ))
      )}
    </div>
  );
}
