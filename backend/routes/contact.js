const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../services/notification');

// POST /api/contact - Handle Contact Us form inquiries
router.post('/contact', async (req, res) => {
  const { name, email, subject, sector, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required contact fields (name, email, subject, message)' });
  }

  try {
    console.log(`[API] Processing contact inquiry from customer: ${email}...`);
    const emailResult = await sendContactEmail({ name, email, subject, sector, message });
    
    res.json({
      success: true,
      message: 'Inquiry processed and validation confirmation sent successfully.',
      previewUrl: typeof emailResult === 'string' ? emailResult : null
    });
  } catch (err) {
    console.error('[API ERROR] Contact form route encountered failure:', err);
    res.status(500).json({ error: 'Internal system failure registering support inquiry.' });
  }
});

module.exports = router;
