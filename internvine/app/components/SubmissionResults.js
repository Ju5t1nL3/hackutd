// components/SearchResults.js

import SubmissionResultItem from './SubmissionResultItem';
import styles from './SearchResults.module.css';

export default function SubmissionResults({ query, filters }) {
  const mockResults = [
    { id: 3, title: 'My Resume - Spring 2025 - Structural Engineering Intern Submission', image: '/boeing.jpeg', company: 'Boeing' },
    { id: 4, title: 'My CV - Spring 2025 - Structural Engineering Intern Submission', image: '/boeing.jpeg', company: 'Boeing' },
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
          <SubmissionResultItem
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
