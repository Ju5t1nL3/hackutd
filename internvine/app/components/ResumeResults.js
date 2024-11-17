// components/SearchResults.js

import ResumeResultItem from './ResumeResultItem';
import styles from './SearchResults.module.css';

export default function ResumeResults({ query, filters }) {
  const mockResults = [
    { id: 2, title: 'William Lam - Spring 2025 - STEP Internship', image: '/google.jpg', company: 'Google' },
    { id: 7, title: 'Sue-Ann Manthei - Summer 2025 - Ignite Internship', image: '/nvidia.jpg', company: 'NVIDIA' },
    { id: 3, title: 'William Lam - Spring 2025 - Structural Engineering Intern', image: '/boeing.jpeg', company: 'Boeing' },
    { id: 6, title: 'Alice Smith - Spring 2025 - Structural Engineering Intern', image: '/boeing.jpeg', company: 'Boeing' },
    { id: 9, title: 'Sue-Ann Manthei - Spring 2025 - Structural Engineering Intern', image: '/boeing.jpeg', company: 'Boeing' },
    { id: 1, title: 'William Lam - Summer 2025 - Ignite Internship', image: '/nvidia.jpg', company: 'NVIDIA' },
    { id: 5, title: 'Alice Smith - Spring 2025 - STEP Internship', image: '/google.jpg', company: 'Google' },
    { id: 4, title: 'Alice Smith - Summer 2025 - Ignite Internship', image: '/nvidia.jpg', company: 'NVIDIA' },
    { id: 8, title: 'Sue-Ann Manthei - Spring 2025 - STEP Internship', image: '/google.jpg', company: 'Google' },
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
          <ResumeResultItem
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
