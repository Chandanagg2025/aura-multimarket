const SEED_PRODUCTS = [
  // WATER SECTOR
  {
    id: "wat-001",
    sector: "water",
    sector_name: "Water & Hydration",
    sub_category: "purifiers",
    name: "AURA HydroPure Pro 9-Stage Smart Water Purifier",
    price: 349.99,
    original_price: 429.99,
    rating: 4.9,
    reviews_count: 142,
    badge: "Bestseller",
    is_featured: 1,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80",
    description: "State-of-the-art RO + UV + UF + Mineralizer water purification system with digital TDS monitoring, instant hot & cold dispenser, and UV LED tank sterilization.",
    specs: JSON.stringify([
      "9-stage advanced reverse osmosis & UV filtration",
      "Real-time digital TDS & filter life indicator",
      "Instant heating (95°C) and chilling (5°C) options",
      "Stainless steel 8-liter storage tank",
      "Smart Mobile App connectivity with leak detection"
    ])
  },
  {
    id: "wat-002",
    sector: "water",
    sector_name: "Water & Hydration",
    sub_category: "mineral",
    name: "Aptia Glacier Mineral Water (Case of 12 Glass Bottles)",
    price: 34.99,
    original_price: 44.99,
    rating: 4.8,
    reviews_count: 98,
    badge: "Organic",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    description: "Sourced directly from protected alpine mountain springs. Naturally alkaline pH 8.5 rich in essential magnesium, calcium, and silica packaged in zero-plastic amber glass bottles.",
    specs: JSON.stringify([
      "100% natural glacier spring water",
      "Naturally alkaline pH 8.5 level",
      "12 x 750ml eco-friendly glass bottles",
      "Zero microplastics, zero artificial additives"
    ])
  },
  {
    id: "wat-003",
    sector: "water",
    sector_name: "Water & Hydration",
    sub_category: "bottles",
    name: "HydroFlask Insulated Smart Hydration Bottle 1000ml",
    price: 49.99,
    original_price: 59.99,
    rating: 4.7,
    reviews_count: 210,
    badge: "Trending",
    is_featured: 1,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    description: "Double-wall vacuum insulated smart stainless steel water bottle with LED lid temperature display, hydration reminder chime, and built-in UV-C self-cleaning module.",
    specs: JSON.stringify([
      "Keeps beverages cold for 24h / hot for 12h",
      "Touch LED lid displays water temperature",
      "UV-C light neutralizes 99.99% of bacteria",
      "BPA-free pro-grade 18/8 stainless steel"
    ])
  },
  {
    id: "wat-004",
    sector: "water",
    sector_name: "Water & Hydration",
    sub_category: "purifiers",
    name: "AlkaFlow Countertop Hydrogen-Rich Water Generator",
    price: 279.00,
    original_price: 320.00,
    rating: 4.9,
    reviews_count: 64,
    badge: "New Tech",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=600&q=80",
    description: "Advanced SPE/PEM electrolysis technology producing high-concentration molecular hydrogen water (up to 3000 ppb) for enhanced cellular antioxidant wellness.",
    specs: JSON.stringify([
      "SPE/PEM platinum titanium electrolysis chamber",
      "High concentration hydrogen water up to 3000 ppb",
      "Touchscreen control with 4 volume presets",
      "Self-cleaning electrode cycle"
    ])
  },

  // CAMERA SECTOR
  {
    id: "cam-001",
    sector: "camera",
    sector_name: "Cameras & Optics",
    sub_category: "dslr",
    name: "Lumina Alpha FX9 4K Cinema Mirrorless Camera",
    price: 1899.99,
    original_price: 2199.99,
    rating: 4.95,
    reviews_count: 312,
    badge: "Pro Choice",
    is_featured: 1,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    description: "Full-frame 35.7MP BSI CMOS sensor featuring 4K 120fps uncompressed RAW video recording, 5-axis IBIS, dual Native ISO, and real-time AI eye tracking autofocus.",
    specs: JSON.stringify([
      "35.7 Megapixel Full-Frame Back-Illuminated Sensor",
      "4K 120fps & 8K 30fps RAW 10-bit 4:2:2 recording",
      "In-Body 5-Axis Optical Image Stabilization (7 stops)",
      "Dual CFexpress Type-A / SD Card Slots",
      "Weather-sealed magnesium alloy chassis"
    ])
  },
  {
    id: "cam-002",
    sector: "camera",
    sector_name: "Cameras & Optics",
    sub_category: "action",
    name: "GoCam X-Extreme 4K Waterproof Action Camera",
    price: 329.99,
    original_price: 389.99,
    rating: 4.8,
    reviews_count: 185,
    badge: "Hot Deal",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80",
    description: "Ultra-compact rugged camera with Horizon Lock 4.0 stabilization, 4K 60fps HDR video, dual touchscreens, and waterproof up to 33ft (10m) without housing.",
    specs: JSON.stringify([
      "5.3K 60fps & 4K 120fps high frame rate capture",
      "HyperSmooth 6.0 horizon stabilization",
      "Front and rear high-contrast LCD screens",
      "Voice control in 10 languages",
      "Waterproof to 10 meters depth"
    ])
  },
  {
    id: "cam-003",
    sector: "camera",
    sector_name: "Cameras & Optics",
    sub_category: "security",
    name: "Sentinel 360° AI Solar Security Camera Kit",
    price: 199.99,
    original_price: 249.99,
    rating: 4.85,
    reviews_count: 124,
    badge: "Smart Home",
    is_featured: 1,
    image: "https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=600&q=80",
    description: "100% wire-free outdoor PTZ surveillance camera powered by continuous solar panel charging, 2K color night vision, radar motion detection, and cloud recording.",
    specs: JSON.stringify([
      "2K QHD 360° Pan & 90° Tilt coverage",
      "Integrated High-efficiency Solar Panel",
      "AI Human & Vehicle Detection with auto-tracking",
      "Full-color Spotlight Night Vision",
      "Two-way audio & 110dB emergency siren"
    ])
  },
  {
    id: "cam-004",
    sector: "camera",
    sector_name: "Cameras & Optics",
    sub_category: "lenses",
    name: "Apex Prime 85mm f/1.2 Portrait Master Lens",
    price: 899.99,
    original_price: 999.99,
    rating: 4.9,
    reviews_count: 76,
    badge: "Exclusive",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=600&q=80",
    description: "Ultra-fast prime lens delivering velvety bokeh, razor-sharp focus wide open, nano AR coating, and linear motor ultrasonic AF for high-res portraiture.",
    specs: JSON.stringify([
      "Ultra-wide f/1.2 aperture for shallow depth of field",
      "11-blade circular aperture diaphragm",
      "ED glass elements minimize chromatic aberration",
      "Focus hold button and de-clickable aperture ring"
    ])
  },

  // CLOTHING SECTOR
  {
    id: "clo-001",
    sector: "clothing",
    sector_name: "Apparel & Fashion",
    sub_category: "jackets",
    name: "AURA Obsidian Tech Fleece Heavyweight Hoodie",
    price: 119.99,
    original_price: 149.99,
    rating: 4.85,
    reviews_count: 240,
    badge: "Bestseller",
    is_featured: 1,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
    description: "Crafted from 480GSM premium double-knit organic cotton blend with water-resistant DWR coating, magnetic pocket closures, and ergonomically shaped hood.",
    specs: JSON.stringify([
      "480 GSM 100% Organic Heavyweight French Terry Cotton",
      "Hidden zipped device pockets with RFID shielding",
      "Water-repellent storm outer finish",
      "Relaxed urban drop-shoulder silhouette"
    ])
  },
  {
    id: "clo-002",
    sector: "clothing",
    sector_name: "Apparel & Fashion",
    sub_category: "streetwear",
    name: "Vanguard Luxe Oversized Graphic Streetwear Tee",
    price: 45.00,
    original_price: 55.00,
    rating: 4.7,
    reviews_count: 165,
    badge: "Trending",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    description: "Premium combed ring-spun cotton tee with high-density puff screen print artwork on back, pre-shrunk wash treatment, and reinforced seamless collar.",
    specs: JSON.stringify([
      "260 GSM heavy combed cotton",
      "Puff print typography art design",
      "Vintage acid-wash custom dye finish",
      "Unisex boxy streetwear fit"
    ])
  },
  {
    id: "clo-003",
    sector: "clothing",
    sector_name: "Apparel & Fashion",
    sub_category: "activewear",
    name: "Apex Perform 4-Way Stretch Training Joggers",
    price: 79.99,
    original_price: 95.00,
    rating: 4.9,
    reviews_count: 190,
    badge: "Featured",
    is_featured: 1,
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=600&q=80",
    description: "Engineered for maximum agility with sweat-wicking moisture lock technology, ankle zipper cuffs, reflective safety trims, and secure zipped phone holder.",
    specs: JSON.stringify([
      "Lightweight 4-way stretch nylon-spandex weave",
      "Quick-dry moisture transport system",
      "Zip phone pocket & towel loop holder",
      "Reflective 3M logos for night training"
    ])
  },
  {
    id: "clo-004",
    sector: "clothing",
    sector_name: "Apparel & Fashion",
    sub_category: "jackets",
    name: "Elysian Artisan Italian Genuine Leather Jacket",
    price: 399.99,
    original_price: 489.99,
    rating: 4.95,
    reviews_count: 52,
    badge: "Luxury",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=600&q=80",
    description: "Handcrafted full-grain lambskin leather jacket featuring satin silk inner lining, heavy-duty YKK brass hardware, and timeless biker silhouette.",
    specs: JSON.stringify([
      "100% Full-grain buttery soft lambskin",
      "Silk satin custom quilted lining",
      "Antique brass YKK zippers",
      "Tailored modern cut with adjustable waist tabs"
    ])
  },

  // GIFT GALLERY SECTOR
  {
    id: "gft-001",
    sector: "gifts",
    sector_name: "Gift Gallery",
    sub_category: "hampers",
    name: "Royal Heritage Luxury Gourmet & Champagne Hamper",
    price: 189.99,
    original_price: 229.99,
    rating: 4.95,
    reviews_count: 88,
    badge: "Luxury Gift",
    is_featured: 1,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    description: "An opulent gift hamper presented in a hand-woven leather trim trunk. Features vintage sparkling wine, artisanal Swiss chocolates, truffle butter, and premium caviar.",
    specs: JSON.stringify([
      "Vintage Brut Rosé Sparkling Champagne (750ml)",
      "Handcrafted Swiss Pralines & Belgian Truffles",
      "Wildflower organic honey & artisan cheese crackers",
      "Reusable luxury keepsake trunk with custom gold tag"
    ])
  },
  {
    id: "gft-002",
    sector: "gifts",
    sector_name: "Gift Gallery",
    sub_category: "keepsakes",
    name: "Custom Engraved Crystal Memory Orb & LED Stand",
    price: 69.99,
    original_price: 85.00,
    rating: 4.85,
    reviews_count: 310,
    badge: "Personalised",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
    description: "3D laser engraved high-purity K9 crystal sphere illuminated by a warm walnut wood LED base. Personalized photo engraving available upon order placement.",
    specs: JSON.stringify([
      "Sub-surface 3D high resolution laser etching",
      "Optically clear K9 solid glass crystal",
      "Natural solid walnut wooden base with dimmable light",
      "USB powered with touch controls"
    ])
  },
  {
    id: "gft-003",
    sector: "gifts",
    sector_name: "Gift Gallery",
    sub_category: "candles",
    name: "Botanical Aromatherapy Soy Candle Trio Gift Set",
    price: 54.99,
    original_price: 65.00,
    rating: 4.9,
    reviews_count: 140,
    badge: "Handmade",
    is_featured: 1,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
    description: "100% natural organic soy wax candles infused with French lavender, sandalwood vanilla, and wild fig essential oils. Hand-poured in matte ceramic jars.",
    specs: JSON.stringify([
      "3 x 220g natural soy wax candles",
      "Crackling natural wooden wicks",
      "55+ hours clean burn time per candle",
      "Zero toxins, paraffin-free, hand-poured"
    ])
  },
  {
    id: "gft-004",
    sector: "gifts",
    sector_name: "Gift Gallery",
    sub_category: "keepsakes",
    name: "Executive Gold Foil Pen & Leather Journal Gift Box",
    price: 89.99,
    original_price: 110.00,
    rating: 4.8,
    reviews_count: 78,
    badge: "Corporate",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    description: "Handcrafted Italian leather refillable notebook binder paired with a 24k gold-plated rollerball pen. Packaged in a velvet-lined magnetic gift presentation case.",
    specs: JSON.stringify([
      "Genuine crazy-horse vintage leather cover",
      "24K Gold electroplated smooth writing pen",
      "Includes 200 pages of 120GSM fountain-pen friendly paper",
      "Magnetic luxury gift box presentation"
    ])
  }
];

const SEED_COUPONS = [
  { code: 'SAVE10', type: 'percent', value: 10, description: '10% OFF Launch Discount' },
  { code: 'AURA20', type: 'percent', value: 20, description: '20% OFF Luxury Offer' },
  { code: 'FREESHIP', type: 'shipping', value: 0, description: 'Free Express Shipping' }
];

module.exports = function seedData(db) {
  db.serialize(() => {
    const stmtProduct = db.prepare(`
      INSERT OR REPLACE INTO products (id, sector, sector_name, sub_category, name, price, original_price, rating, reviews_count, badge, is_featured, image, description, specs)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    SEED_PRODUCTS.forEach(p => {
      stmtProduct.run(p.id, p.sector, p.sector_name, p.sub_category, p.name, p.price, p.original_price, p.rating, p.reviews_count, p.badge, p.is_featured, p.image, p.description, p.specs);
    });
    stmtProduct.finalize();

    const stmtCoupon = db.prepare(`INSERT OR REPLACE INTO coupons (code, type, value, description) VALUES (?, ?, ?, ?)`);
    SEED_COUPONS.forEach(c => {
      stmtCoupon.run(c.code, c.type, c.value, c.description);
    });
    stmtCoupon.finalize();
  });
};
