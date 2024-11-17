
// components/Filters.js
import styles from '../styles/Filters.module.css';

export default function Filters({ onChange }) {
  const handleChange = (e) => {
    onChange({ [e.target.name]: e.target.checked });
  };

  return (
    <div className={styles.filters}>
      <h3>Filters</h3>
      <label>
        <input type="checkbox" name="filter1" onChange={handleChange} />
        Filter 1
      </label>
      <label>
        <input type="checkbox" name="filter2" onChange={handleChange} />
        Filter 2
      </label>
      <label>
        <input type="checkbox" name="filter3" onChange={handleChange} />
        Filter 3
      </label>
    </div>
  );
}
