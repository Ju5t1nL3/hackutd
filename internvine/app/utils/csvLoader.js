
// utils/csvLoader.js
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

export function loadCSV() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(path.join(process.cwd(), 'data', 'database.csv'))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}
