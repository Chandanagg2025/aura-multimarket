const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST /api/orders - Create a new order
router.post('/orders', (req, res) => {
  const { customerName, customerEmail, customerPhone, shippingAddress, paymentMethod, subtotal, discount, tax, shippingFee, totalPaid, items } = req.body;

  if (!customerName || !shippingAddress || !items || items.length === 0) {
    return res.status(400).json({ error: 'Missing required order fields' });
  }

  const orderRef = `#ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

  db.serialize(() => {
    db.run(
      `INSERT INTO orders (order_ref, date, customer_name, customer_email, customer_phone, shipping_address, payment_method, subtotal, discount, tax, shipping_fee, total_paid, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [orderRef, dateStr, customerName, customerEmail || '', customerPhone || '', shippingAddress, paymentMethod || 'Online Gateway', subtotal, discount || 0, tax, shippingFee || 0, totalPaid, 'Payment Confirmed'],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        const stmtItem = db.prepare(`
          INSERT INTO order_items (order_ref, product_id, product_name, price, quantity, sector)
          VALUES (?, ?, ?, ?, ?, ?)
        `);

        items.forEach(item => {
          stmtItem.run(orderRef, item.id, item.name, item.price, item.quantity, item.sector || 'general');
        });
        stmtItem.finalize();

        res.json({
          success: true,
          message: 'Order created successfully',
          order: {
            orderRef,
            date: dateStr,
            customerName,
            customerEmail,
            customerPhone,
            shippingAddress,
            paymentMethod,
            subtotal,
            discount,
            tax,
            shippingFee,
            totalPaid,
            items,
            status: 'Payment Confirmed'
          }
        });
      }
    );
  });
});

// GET /api/orders - List orders
router.get('/orders', (req, res) => {
  db.all('SELECT * FROM orders ORDER BY date DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, orders: rows });
  });
});

// GET /api/orders/:ref - Get single order with items
router.get('/orders/:ref', (req, res) => {
  const { ref } = req.params;

  db.get('SELECT * FROM orders WHERE order_ref = ?', [ref], (err, order) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!order) return res.status(404).json({ error: 'Order not found' });

    db.all('SELECT * FROM order_items WHERE order_ref = ?', [ref], (err, items) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, order: { ...order, items } });
    });
  });
});

module.exports = router;
