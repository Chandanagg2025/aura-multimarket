const SEED_PRODUCTS = [
  // WATER SECTOR
  {
    id: "wat-001",
    sector: "water",
    sector_name: "Water & Hydration",
    sub_category: "purifiers",
    name: "Shree Pratham HydroPure Pro 9-Stage Smart Water Purifier",
    price: 18999.00,
    original_price: 24999.00,
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
    price: 1499.00,
    original_price: 1999.00,
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
    price: 2499.00,
    original_price: 3299.00,
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
    price: 12999.00,
    original_price: 15999.00,
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
  {
    id: "wat-005",
    sector: "water",
    sector_name: "Water & Hydration",
    sub_category: "appliances",
    name: "Shree Pratham Digital Water Quality Analyzer (TDS/pH/Temp)",
    price: 3499.00,
    original_price: 4499.00,
    rating: 4.85,
    reviews_count: 36,
    badge: "Industrial",
    is_featured: 1,
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=600&q=80",
    description: "High-accuracy digital water tester designed for industries. Measures TDS, pH levels, and fluid temperature simultaneously with dynamic LCD backlight.",
    specs: JSON.stringify([
      "Triple parameter monitoring: TDS, pH & Temperature",
      "Replaceable high-sensitivity sensor probe",
      "Automatic temperature compensation (ATC)",
      "Rechargeable battery with auto power-off"
    ])
  },
  {
    id: "wat-006",
    sector: "water",
    sector_name: "Water & Hydration",
    sub_category: "appliances",
    name: "Shree Pratham Electromagnetic Flow Meter",
    price: 24999.00,
    original_price: 29999.00,
    rating: 4.9,
    reviews_count: 24,
    badge: "Industrial",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    description: "Electromagnetic flow meter designed for pipes in water treatment plants. Features digital rate logging and industrial RS485 Modbus communication protocol.",
    specs: JSON.stringify([
      "Highly accurate volumetric flow measurement",
      "Corrosion-resistant PTFE liner",
      "Backlit LCD display for rate & totalizer",
      "Compatible with standard industrial networks"
    ])
  },
  {
    id: "wat-007",
    sector: "water",
    sector_name: "Water & Hydration",
    sub_category: "appliances",
    name: "Shree Pratham Industrial Borewell Piezometer (Water Level)",
    price: 14999.00,
    original_price: 18999.00,
    rating: 4.75,
    reviews_count: 15,
    badge: "Industrial",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    description: "Submersible water level sensor designed for deep borewells, industrial reservoirs, and mining sites. Enclosed in heavy-duty IP68 stainless steel.",
    specs: JSON.stringify([
      "IP68 waterproof rating with vented cable structure",
      "High accuracy silicon piezoresistive pressure cell",
      "Sturdy 316L stainless steel diaphragm",
      "Long-term stability with surge protection"
    ])
  },
  {
    id: "wat-008",
    sector: "water",
    sector_name: "Water & Hydration",
    sub_category: "drinking",
    name: "Tata Copper Water (Case of 24 PET Bottles)",
    price: 960.00,
    original_price: 1200.00,
    rating: 4.8,
    reviews_count: 110,
    badge: "Tata Pure",
    is_featured: 1,
    image: "https://images.unsplash.com/photo-1608889175123-8ec330b86f84?auto=format&fit=crop&w=600&q=80",
    description: "Tata Copper Plus alkaline water enriched with essential copper minerals. Crafted to support metabolism, digestive health, and optimal daily hydration.",
    specs: JSON.stringify([
      "Enriched with high purity copper minerals",
      "Assists in healthy immune and digestive systems",
      "Case of 24 x 500ml PET bottles",
      "Strict quality purification standards"
    ])
  },
  {
    id: "wat-009",
    sector: "water",
    sector_name: "Water & Hydration",
    sub_category: "drinking",
    name: "Iota Pure Distilled Water (Case of 6 x 5L Cans)",
    price: 1499.00,
    original_price: 1800.00,
    rating: 4.65,
    reviews_count: 54,
    badge: "Iota Pure",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80",
    description: "Ultra-pure double distilled water by Iota. Zero minerals, contaminants, or scale-forming minerals. Excellent for autoclaves, CPAP machines, and battery maintenance.",
    specs: JSON.stringify([
      "Double steam distillation filter cycle",
      "TDS level under 1 ppm for chemical purity",
      "6 x 5-Liter durable bulk canisters",
      "Paraffin and mineral free"
    ])
  },

  // CAMERA SECTOR (CCTV ONLY)
  {
    id: "cam-005",
    sector: "camera",
    sector_name: "Cameras & Optics",
    sub_category: "cctv",
    name: "Shree Pratham PTZ Dome 360 CCTV Camera",
    price: 7999.00,
    original_price: 9999.00,
    rating: 4.8,
    reviews_count: 42,
    badge: "Outdoor PTZ",
    is_featured: 1,
    image: "https://images.unsplash.com/photo-1549556259-d6e32e8b2611?auto=format&fit=crop&w=600&q=80",
    description: "High-security outdoor dome camera with 360° pan, 90° tilt, high-power infrared LEDs for dark settings, and dynamic sound alerts.",
    specs: JSON.stringify([
      "Full HD 1080p surveillance video stream",
      "Motorized 360-degree pan & tilt control",
      "Waterproof IP66 heavy composite outer shell",
      "Two-way high-volume speak intercom"
    ])
  },
  {
    id: "cam-006",
    sector: "camera",
    sector_name: "Cameras & Optics",
    sub_category: "cctv",
    name: "Shree Pratham AI NightVision Bullet CCTV Camera",
    price: 5499.00,
    original_price: 6999.00,
    rating: 4.75,
    reviews_count: 31,
    badge: "Night Vision",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1524338198850-8a2ff63a6b5f?auto=format&fit=crop&w=600&q=80",
    description: "Heavy-duty outdoor bullet camera equipped with smart AI sensors to filter false alarms and spotlight systems for full color night recording.",
    specs: JSON.stringify([
      "Intelligent human & vehicle filter alerts",
      "Full color night vision up to 30 meters",
      "Wide-angle lens with 110-degree coverage field",
      "Sturdy vandal-resistant structural body"
    ])
  },
  {
    id: "cam-007",
    sector: "camera",
    sector_name: "Cameras & Optics",
    sub_category: "cctv",
    name: "Shree Pratham Smart Mini Dome Indoor CCTV Camera",
    price: 3299.00,
    original_price: 4499.00,
    rating: 4.7,
    reviews_count: 58,
    badge: "Indoor Dome",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=600&q=80",
    description: "Compact interior dome camera for living rooms and office desks. Includes smart sound detection, baby monitor chimes, and secure local micro-SD storage.",
    specs: JSON.stringify([
      "Instant push warnings on sound/motion",
      "Auto-tracking rotating lens mechanism",
      "Supports local micro-SD storage up to 256GB",
      "Easy wall mount bracket included"
    ])
  },
  {
    id: "cam-008",
    sector: "camera",
    sector_name: "Cameras & Optics",
    sub_category: "cctv",
    name: "Shree Pratham Multi-Lens Dual-Screen CCTV Camera",
    price: 11999.00,
    original_price: 14999.00,
    rating: 4.9,
    reviews_count: 19,
    badge: "Panoramic Dual",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=600&q=80",
    description: "State-of-the-art dual lens camera that displays two video panels simultaneously on your smartphone: one fixed wide overview and one active rotating PTZ tracker.",
    specs: JSON.stringify([
      "Dual lenses: fixed ultra-wide lens + PTZ lens",
      "Tracks and zooms in on human movement automatically",
      "Dual screen monitoring on iOS/Android client apps",
      "Active warning siren and flashing blue-red light warnings"
    ])
  },

  // CLOTHING SECTOR
  {
    id: "clo-001",
    sector: "clothing",
    sector_name: "Apparel & Fashion",
    sub_category: "jackets",
    name: "Shree Pratham Obsidian Tech Fleece Heavyweight Hoodie",
    price: 4999.00,
    original_price: 5999.00,
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
    price: 1999.00,
    original_price: 2499.00,
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
    price: 2999.00,
    original_price: 3499.00,
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
    price: 18999.00,
    original_price: 22999.00,
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
  {
    id: "clo-005",
    sector: "clothing",
    sector_name: "Apparel & Fashion",
    sub_category: "shirts",
    name: "Shree Pratham Classic Linen Summer Shirt",
    price: 2499.00,
    original_price: 3499.00,
    rating: 4.78,
    reviews_count: 85,
    badge: "Linen",
    is_featured: 1,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
    description: "Lightweight and breathable long-sleeve casual shirt woven from 100% natural organic flax linen. Perfect for smart-casual summer wear.",
    specs: JSON.stringify([
      "100% organic French flax linen fiber",
      "Pre-washed texture for ultimate softness",
      "Classic spread collar and adjustable buttoned cuffs",
      "Sustainable coconut shell button details"
    ])
  },
  {
    id: "clo-006",
    sector: "clothing",
    sector_name: "Apparel & Fashion",
    sub_category: "pants",
    name: "Shree Pratham Comfort Fit Denim Jeans",
    price: 3499.00,
    original_price: 4999.00,
    rating: 4.8,
    reviews_count: 120,
    badge: "Denim",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
    description: "Washed dark indigo denim jeans with regular-fit comfort. Tailored using premium ringspun cotton with a touch of stretch for day-long ease.",
    specs: JSON.stringify([
      "99% Premium Ringspun Cotton, 1% Lycra stretch",
      "Authentic heavy-duty metal rivets and zip fly",
      "Triple-needle stitched seams for high durability",
      "Fade and shrink-resistant rinse wash treatment"
    ])
  },
  {
    id: "clo-007",
    sector: "clothing",
    sector_name: "Apparel & Fashion",
    sub_category: "shirts",
    name: "Shree Pratham Active Dry-Fit Sports Polo",
    price: 1499.00,
    original_price: 1999.00,
    rating: 4.7,
    reviews_count: 64,
    badge: "Dry-Fit",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80",
    description: "High-performance athletic polo shirt featuring quick-drying micro-mesh fabric. Engineered to wick moisture away and keep you dry on and off the court.",
    specs: JSON.stringify([
      "100% Recycled moisture-wicking polyester fabric",
      "Breathable side mesh panels for ventilation",
      "Modern three-button placket and rib-knit collar",
      "Flatlock seams prevent skin chafing"
    ])
  },
  {
    id: "clo-008",
    sector: "clothing",
    sector_name: "Apparel & Fashion",
    sub_category: "sweaters",
    name: "Shree Pratham Knit Cotton Crewneck Sweater",
    price: 3999.00,
    original_price: 4999.00,
    rating: 4.82,
    reviews_count: 45,
    badge: "Winter Wear",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=600&q=80",
    description: "Warm, cozy midweight sweater knitted with pure combed cotton threads. Minimalist design styling featuring ribbed crewneck collar, sleeve cuffs, and hem.",
    specs: JSON.stringify([
      "100% Combed cotton soft-spun yarn",
      "Breathable waffle-knit thermal structure",
      "Classic fit styling with drop sleeves",
      "Color-fast treatment resists pilling"
    ])
  },

  // GIFT GALLERY SECTOR
  {
    id: "gft-001",
    sector: "gifts",
    sector_name: "Gift Gallery",
    sub_category: "hampers",
    name: "Royal Heritage Luxury Gourmet & Champagne Hamper",
    price: 8999.00,
    original_price: 10999.00,
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
    price: 3499.00,
    original_price: 4499.00,
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
    price: 2499.00,
    original_price: 3299.00,
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
    price: 4999.00,
    original_price: 5999.00,
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
  },
  {
    id: "gft-005",
    sector: "gifts",
    sector_name: "Gift Gallery",
    sub_category: "crockery",
    name: "Shree Pratham Handcrafted Ceramic Tea Set (12-Piece)",
    price: 4499.00,
    original_price: 5999.00,
    rating: 4.9,
    reviews_count: 27,
    badge: "Artisanal",
    is_featured: 1,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    description: "Gorgeously glazed stoneware tea hosting set. Includes one teapot with wooden handle, six matching teacups, and coordinating bamboo tray.",
    specs: JSON.stringify([
      "Premium porcelain ceramics fired at 1300°C",
      "Double-walled insulation keeps tea hot and exterior cool",
      "Detachable natural bamboo handle and serving platter",
      "Dishwasher and microwave safe components"
    ])
  },
  {
    id: "gft-006",
    sector: "gifts",
    sector_name: "Gift Gallery",
    sub_category: "home",
    name: "Shree Pratham Bonsai Tree Green Decor Gift Kit",
    price: 2499.00,
    original_price: 3200.00,
    rating: 4.82,
    reviews_count: 38,
    badge: "Eco-Friendly",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1613143719002-de6b0807b587?auto=format&fit=crop&w=600&q=80",
    description: "A beautiful live Juniper Bonsai tree set up in a ceramic glazed drainage pot. Packaged with professional nutrients and special shears.",
    specs: JSON.stringify([
      "4-year old healthy Juniper Bonsai starter tree",
      "Bespoke ceramic pot with matching drip tray",
      "High grade organic potting soil & slow-release nutrients",
      "Includes high-carbon carbon steel pruning shears"
    ])
  },
  {
    id: "gft-007",
    sector: "gifts",
    sector_name: "Gift Gallery",
    sub_category: "music",
    name: "Shree Pratham Vintage Wooden Music Box (Hand-Cranked)",
    price: 1899.00,
    original_price: 2400.00,
    rating: 4.78,
    reviews_count: 72,
    badge: "Vintage",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80",
    description: "Mechanical music box carved out of maple hardwood. Simply rotate the side metal handle to play a crystal clear mechanical rendition of vintage folk tunes.",
    specs: JSON.stringify([
      "Laser-etched vintage wood carving design",
      "Pure copper mechanical cylinder pin mechanism",
      "Needs no batteries or electronic charging",
      "Measures 6.4 x 5.2 x 4.2 cm for desk displays"
    ])
  },
  {
    id: "gft-008",
    sector: "gifts",
    sector_name: "Gift Gallery",
    sub_category: "keepsakes",
    name: "Shree Pratham Premium Leather Travel Passport Organizer",
    price: 2999.00,
    original_price: 3999.00,
    rating: 4.85,
    reviews_count: 51,
    badge: "Travel Luxe",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    description: "Full-grain textured leather pocketbook for travelers. Safely houses your passport, up to 8 credit cards, paper cash, and boarding passes.",
    specs: JSON.stringify([
      "100% Genuine vegetable-tanned leather exterior",
      "Built-in RFID blocking fabric liner layers",
      "Sleek design fits comfortably inside jacket pockets",
      "Sturdy metal zipper closure system"
    ])
  }
];

const SEED_COUPONS = [
  { code: 'SAVE10', type: 'percent', value: 10, description: '10% OFF Launch Discount' },
  { code: 'SHREE20', type: 'percent', value: 20, description: '20% OFF Shree Pratham Discount' },
  { code: 'FREESHIP', type: 'shipping', value: 0, description: 'Free Express Shipping' }
];

module.exports = function seedData(db) {
  if (!db) return;
  db.serialize(() => {
    console.log("Auto-seeding SQLite database with Shree Pratham multi-market products in INR...");

    // Clear existing
    db.run("DELETE FROM products");
    db.run("DELETE FROM coupons");

    const stmtProduct = db.prepare(`
      INSERT INTO products (id, sector, sector_name, sub_category, name, price, original_price, rating, reviews_count, badge, is_featured, image, description, specs)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    SEED_PRODUCTS.forEach(p => {
      stmtProduct.run(p.id, p.sector, p.sector_name, p.sub_category, p.name, p.price, p.original_price, p.rating, p.reviews_count, p.badge, p.is_featured, p.image, p.description, p.specs);
    });
    stmtProduct.finalize();

    const stmtCoupon = db.prepare(`INSERT INTO coupons (code, type, value, description) VALUES (?, ?, ?, ?)`);
    SEED_COUPONS.forEach(c => {
      stmtCoupon.run(c.code, c.type, c.value, c.description);
    });
    stmtCoupon.finalize();

    console.log("Database successfully seeded with Water, Camera, Clothing, and Gift products in INR!");
  });
};

module.exports.SEED_PRODUCTS = SEED_PRODUCTS;
module.exports.SEED_COUPONS = SEED_COUPONS;
