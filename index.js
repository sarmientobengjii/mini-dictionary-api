import express from 'express';
import data from './data.js';

const app = express();
const PORT = process.env.PORT || 3000;

//GET /words -> all words
app.get('/words', (request, response) => {
  response.json(data);
});

//GET /words/:word -> specific word (case-insensitive)
app.get('/words/:word', (request, response) => {
  const word = request.params.word.toLowerCase();
  const found = data.find(item => item.word.toLowerCase() === word);

  if (!found) {
    return response.status(404).json({ error: 'Word not found' });
  }
  response.json(found);
});

//GET /filter?type=verb -> filter by any type
app.get('/filter', (request, response) => {
  const { type } = request.query;
  if (!type) {
    return response.status(400).json({ error: 'Type is required' });
  }

  const filtered = data.filter(item => item.type.toLowerCase() === type.toLowerCase());
  response.json(filtered);
});

//Get /search?q=ap -> partial search
app.get('/search', (request, response) => {
  const { query } = request.query;
  if (!query) {
    return response.status(400).json({ error: 'Search query is required' });
  }
  
  const results = data.filter(item =>
    item.word.toLowerCase().includes(query.toLowerCase()) 
  );
  response.json(results);
});





app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});