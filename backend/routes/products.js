const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { SEED_PRODUCTS } = require('../seed_data');

function filterSeedProducts(sector, category, search, sort) {
  let list = [...(SEED_PRODUCTS || [])];

  if (sector && sector !== 'all') {
    list = list.filter(p => p.sector === sector);
  }

  if (category && category !== 'all') {
    list = list.filter(p => p.sub_category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(p =>
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.sector_name && p.sector_name.toLowerCase().includes(q))
    );
  }

  if (sort === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'name') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    list.sort((a, b) => (b.is_featured || 0) - (a.is_featured || 0) || (b.rating || 0) - (a.rating || 0));
  }

  return list.map(p => ({
    ...p,
    isFeatured: Boolean(p.is_featured),
    originalPrice: p.original_price,
    reviewsCount: p.reviews_count,
    sectorName: p.sector_name,
    subCategory: p.sub_category,
    specs: typeof p.specs === 'string' ? JSON.parse(p.specs) : (p.specs || [])
  }));
}

// GET /api/sectors - Get list of sectors and product count
router.get('/sectors', (req, res) => {
  const query = `
    SELECT sector, sector_name, COUNT(*) as count 
    FROM products 
    GROUP BY sector
  `;
  db.all(query, [], (err, rows) => {
    if (err || !rows || rows.length === 0) {
      const sectorCounts = {};
      (SEED_PRODUCTS || []).forEach(p => {
        if (!sectorCounts[p.sector]) {
          sectorCounts[p.sector] = { sector: p.sector, sector_name: p.sector_name, count: 0 };
        }
        sectorCounts[p.sector].count++;
      });
      return res.json({ success: true, sectors: Object.values(sectorCounts) });
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
    if (err || !rows || rows.length === 0) {
      const fallbackProducts = filterSeedProducts(sector, category, search, sort);
      return res.json({ success: true, count: fallbackProducts.length, products: fallbackProducts });
    }

    // Parse specs JSON array
    const formattedProducts = rows.map(p => ({
      ...p,
      isFeatured: Boolean(p.is_featured),
      originalPrice: p.original_price,
      reviewsCount: p.reviews_count,
      sectorName: p.sector_name,
      subCategory: p.sub_category,
      specs: typeof p.specs === 'string' ? JSON.parse(p.specs) : (p.specs || [])
    }));

    res.json({ success: true, count: formattedProducts.length, products: formattedProducts });
  });
});

// GET /api/products/:id - Get single product
router.get('/products/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
    if (err || !row) {
      const item = (SEED_PRODUCTS || []).find(p => p.id === id);
      if (!item) return res.status(404).json({ error: 'Product not found' });
      const product = {
        ...item,
        isFeatured: Boolean(item.is_featured),
        originalPrice: item.original_price,
        reviewsCount: item.reviews_count,
        sectorName: item.sector_name,
        subCategory: item.sub_category,
        specs: typeof item.specs === 'string' ? JSON.parse(item.specs) : (item.specs || [])
      };
      return res.json({ success: true, product });
    }

    const product = {
      ...row,
      isFeatured: Boolean(row.is_featured),
      originalPrice: row.original_price,
      reviewsCount: row.reviews_count,
      sectorName: row.sector_name,
      subCategory: row.sub_category,
      specs: typeof row.specs === 'string' ? JSON.parse(row.specs) : (row.specs || [])
    };

    res.json({ success: true, product });
  });
});

module.exports = router;
