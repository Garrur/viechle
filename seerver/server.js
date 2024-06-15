const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/inventory', (req, res) => {
    const results = [];
    fs.createReadStream(path.join(__dirname, 'sample-data-v2.csv'))
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
