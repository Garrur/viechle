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
    const { brand, product_type } = req.query;

    

    fs.createReadStream(path.join(__dirname, 'sample-data-v2.csv'))
        .pipe(csv())
        .on('data', (data) => {
            
            let include = true;
            if (brand && data.brand !== brand) {
                include = false;
            }
            if (product_type && data.product_type !== product_type) {
                include = false;
            }
            if (include) {
                results.push(data);
            }
        })
        .on('end', () => {
           
            res.json(results);
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
