
// pages/api/search.js
import { loadCSV } from '../../utils/csvLoader';

let database = null;

export default async function handler(req, res) {
  const { query } = req.query;

  if (!database) {
    try {
      database = await loadCSV();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to load database' });
    }
  }

  const results = database.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  res.status(200).json(results);
}
