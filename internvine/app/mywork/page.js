'use client';

import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import Filters from '../components/Filters';
import ResumeList from '../components/ResumeList';
import styles from '../styles/Search.module.css';
import DashTabs from '../components/DashTabs'

export default function ResumesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    // Fetch resumes when the component mounts
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    // In a real application, this would be an API call
    // For now, we'll use mock data
    const mockResumes = [
      {
        id: 1,
        name: "Justin",
        gpa: 4.0,
        school: "Texas A&M University",
        major: "Computer Science",
        skills: ["Python", "Java", "TypeScript", "SQL"],
        fileUrl: "/justin-resume.pdf"
      },
      // Add more mock resumes here
    ];
    setResumes(mockResumes);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className={styles.searchPage}>
      <DashTabs />

      <SearchBar onSearch={handleSearch} />
      <div className={styles.content}>
        <Filters onChange={handleFilterChange} />
        <SearchResults query={searchQuery} filters={filters} />
      </div>
    </div>
  );
}