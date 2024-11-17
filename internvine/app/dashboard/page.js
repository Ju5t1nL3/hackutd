'use client';

// pages/search.js
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import SearchResults from '../components/SearchResults';
import styles from '../styles/Search.module.css';
import DashTabs from '../components/DashTabs'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});

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
