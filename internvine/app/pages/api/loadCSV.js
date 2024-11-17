
import { promises as fs } from 'fs';
import path from 'path';
import csv from 'csv-parser';

export default async function handler(req, res) {
  const results = [];
  const filePath = path.join(process.cwd(), 'data', 'database.csv');

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const rows = fileContents.split('\n');
    const headers = rows[0].split(',');

    for (let i = 1; i < rows.length; i++) {
      const values = rows[i].split(',');
      if (values.length === headers.length) {
        const item = {};
        headers.forEach((header, index) => {
          item[header.trim()] = values[index].trim();
        });
        results.push(item);
      }
    }

    res.status(200).json(results);
  } catch (error) {
    console.error('Error reading CSV file:', error);
    res.status(500).json({ error: 'Failed to load CSV data' });
  }
}
