const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/skip/:imdbId/s:seasone:episode.json', (req, res) => {
  const { imdbId, season, episode } = req.params;
  const filePath = path.join(__dirname, 'skip', imdbId, `s${season}e${episode}.json`);
  if (fs.existsSync(filePath)) {
    res.json(JSON.parse(fs.readFileSync(filePath, 'utf8')));
  } else {
    res.status(404).json({ error: 'Skip metadata not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Skip metadata API server listening on port ${PORT}`);
});
