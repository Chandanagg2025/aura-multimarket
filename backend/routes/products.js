const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/sectors - Get list of sectors and product count
router.get('/sectors', (req, res) => {
  const query = `
    SELECT sector, sector_name, COUNT(*) as count 
    FROM products 
    GROUP BY sector
  `;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, sectors: rows });
  });
});

// GET /api/products - Get catalog items with filtering & sorting
router.get('/products', (req, res) => {
  const { sector, category, search, sort } = req.query;

  let query = 'SELECT * FROM products WHERE 1=1';
  const params = [];

  if (sector && sector !== 'all') {
    query += ' AND sector = ?';
    params.push(sector);
  }

  if (category && category !== 'all') {
    query += ' AND sub_category = ?';
    params.push(category);
  }

  if (search) {
    query += ' AND (LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(sector_name) LIKE ?)';
    const searchPattern = `%${search.toLowerCase()}%`;
    params.push(searchPattern, searchPattern, searchPattern);
  }

  if (sort === 'price-low') {
    query += ' ORDER BY price ASC';
  } else if (sort === 'price-high') {
    query += ' ORDER BY price DESC';
  } else if (sort === 'rating') {
    query += ' ORDER BY rating DESC';
  } else if (sort === 'name') {
    query += ' ORDER BY name ASC';
  } else {
    query += ' ORDER BY is_featured DESC, rating DESC';
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Parse specs JSON array
    const formattedProducts = rows.map(p => ({
      ...p,
      isFeatured: Boolean(p.is_featured),
      originalPrice: p.original_price,
      reviewsCount: p.reviews_count,
      sectorName: p.sector_name,
      subCategory: p.sub_category,
      specs: p.specs ? JSON.parse(p.specs) : []
    }));

    res.json({ success: true, count: formattedProducts.length, products: formattedProducts });
  });
});

// GET /api/products/:id - Get single product
router.get('/products/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Product not found' });

    const product = {
      ...row,
      isFeatured: Boolean(row.is_featured),
      originalPrice: row.original_price,
      reviewsCount: row.reviews_count,
      sectorName: row.sector_name,
      subCategory: row.sub_category,
      specs: row.specs ? JSON.parse(row.specs) : []
    };

    res.json({ success: true, product });
  });
});

module.exports = router;
