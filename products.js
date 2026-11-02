/* ==========================================================
   NEXWATCH — store settings and product catalogue
   Edit this file to make the store yours.
   All prices, specs and policies below are SAMPLE values:
   replace them with your real products and details.
   ========================================================== */

const STORE = {
  name: "NEXWATCH",
  currency: "Rs.",
  // WhatsApp number in international format, digits only (example: 923001234567)
  whatsapp: "923001234567",
  phone: "+92 300 1234567",
  email: "hello@nexwatch.store",
  hours: "Mon – Sat, 10:00 AM – 8:00 PM",
  address: "Your store address, Pakistan",
  shipping: 250,              // delivery charge
  freeShippingOver: 15000,    // free delivery above this subtotal
  promos: { NEX10: 10 },      // promo code -> % discount
  social: { instagram: "#", facebook: "#", youtube: "#" }
};

const CATS = {
  sport: "Sport",
  classic: "Classic",
  ultra: "Ultra",
  kids: "Kids"
};

/*
  face:   digital | analog | sport | kids   (drawn watch face)
  strap:  silicone | leather | steel        (drawn strap style)
  variants: colour options -> strap colour, case metal, accent colour
  metals: graphite | silver | gold | titanium | rose
*/
const PRODUCTS = [
  {
    id: 1, name: "NEXWATCH Series X", category: "sport",
    price: 34999, oldPrice: 39999, badge: "BEST SELLER",
    face: "digital", strap: "silicone",
    desc: "Our flagship AMOLED smartwatch with ECG, dual-band GPS and a battery that lasts two weeks.",
    tags: ["AMOLED", "ECG", "14 days"],
    specs: {
      Display: "1.5-inch AMOLED · 2000 nits",
      Battery: "Up to 14 days",
      "Water resistance": "50 m (5 ATM)",
      GPS: "Dual-band GPS",
      Health: "ECG · SpO2 · Sleep · Heart rate",
      Calls: "Bluetooth calling"
    },
    variants: [
      { name: "Midnight", strap: "#1c2033", metal: "graphite", accent: "#22d3ee" },
      { name: "Arctic",   strap: "#dfe4f2", metal: "silver",   accent: "#8b5cf6" },
      { name: "Ember",    strap: "#e11d48", metal: "graphite", accent: "#f43f9d" }
    ]
  },
  {
    id: 2, name: "NEXWATCH Pulse Pro", category: "sport",
    price: 27999, oldPrice: null, badge: "NEW",
    face: "sport", strap: "silicone",
    desc: "Built for athletes. Track runs, rides and swims with 100+ sport modes and VO2 max insights.",
    tags: ["100+ sports", "VO2 max", "GPS"],
    specs: {
      Display: "1.43-inch AMOLED · 1500 nits",
      Battery: "Up to 10 days",
      "Water resistance": "50 m (5 ATM)",
      GPS: "Dual-band GPS",
      Health: "Heart rate · SpO2 · VO2 max",
      Calls: "Bluetooth calling"
    },
    variants: [
      { name: "Volt",  strap: "#2a2f45", metal: "graphite", accent: "#a3e635" },
      { name: "Coral", strap: "#fb7185", metal: "silver",   accent: "#f43f9d" },
      { name: "Ocean", strap: "#0ea5e9", metal: "graphite", accent: "#22d3ee" }
    ]
  },
  {
    id: 3, name: "NEXWATCH Aero Classic", category: "classic",
    price: 42999, oldPrice: 49999, badge: "LIMITED",
    face: "analog", strap: "steel",
    desc: "A stainless steel smartwatch with sapphire glass and a timeless analog dial.",
    tags: ["Steel", "Sapphire", "7 days"],
    specs: {
      Display: "1.39-inch AMOLED · sapphire glass",
      Battery: "Up to 7 days",
      "Water resistance": "50 m (5 ATM)",
      GPS: "Built-in GPS",
      Health: "Heart rate · SpO2 · Sleep",
      Calls: "Bluetooth calling"
    },
    variants: [
      { name: "Steel", strap: "#9aa3b8", metal: "silver",   accent: "#f8fafc" },
      { name: "Onyx",  strap: "#2b2d3a", metal: "graphite", accent: "#22d3ee" },
      { name: "Gold",  strap: "#c9a24b", metal: "gold",     accent: "#fbbf24" }
    ]
  },
  {
    id: 4, name: "NEXWATCH Lite 2", category: "classic",
    price: 12999, oldPrice: 15999, badge: null,
    face: "digital", strap: "silicone",
    desc: "A slim everyday smartwatch with notifications, sleep and step tracking at a friendly price.",
    tags: ["Slim", "7 days", "Great value"],
    specs: {
      Display: "1.32-inch HD AMOLED",
      Battery: "Up to 7 days",
      "Water resistance": "30 m (3 ATM)",
      GPS: "Connected GPS",
      Health: "Heart rate · Sleep · Steps",
      Calls: "Notifications"
    },
    variants: [
      { name: "Violet",   strap: "#6d4ae0", metal: "graphite", accent: "#8b5cf6" },
      { name: "Mint",     strap: "#34d399", metal: "silver",   accent: "#34d399" },
      { name: "Graphite", strap: "#232638", metal: "graphite", accent: "#22d3ee" }
    ]
  },
  {
    id: 5, name: "NEXWATCH Orbit Ultra", category: "ultra",
    price: 54999, oldPrice: null, badge: "ULTRA",
    face: "sport", strap: "silicone",
    desc: "Rugged titanium case, 100 m water resistance and offline maps for serious adventures.",
    tags: ["Titanium", "100 m", "21 days"],
    specs: {
      Display: "1.6-inch AMOLED · 3000 nits",
      Battery: "Up to 21 days",
      "Water resistance": "100 m (10 ATM)",
      GPS: "Dual-band + offline maps",
      Health: "ECG · SpO2 · Skin temperature",
      Calls: "Bluetooth calling"
    },
    variants: [
      { name: "Titanium", strap: "#6b7084", metal: "titanium", accent: "#22d3ee" },
      { name: "Orange",   strap: "#f97316", metal: "titanium", accent: "#fb923c" },
      { name: "Black",    strap: "#14151f", metal: "graphite", accent: "#a3e635" }
    ]
  },
  {
    id: 6, name: "NEXWATCH Kids Beam", category: "kids",
    price: 8999, oldPrice: 10999, badge: null,
    face: "kids", strap: "silicone",
    desc: "Safe GPS tracking, SOS button and fun watch faces. Parents stay connected, kids stay playful.",
    tags: ["GPS + SOS", "IP68", "Parental controls"],
    specs: {
      Display: "1.28-inch colour touch",
      Battery: "Up to 5 days",
      "Water resistance": "IP68",
      GPS: "GPS + SOS",
      Health: "Steps · Sleep",
      Calls: "Approved contacts only"
    },
    variants: [
      { name: "Mint",  strap: "#34d399", metal: "silver",   accent: "#34d399" },
      { name: "Pink",  strap: "#f472b6", metal: "silver",   accent: "#f472b6" },
      { name: "Blue",  strap: "#60a5fa", metal: "silver",   accent: "#60a5fa" }
    ]
  },
  {
    id: 7, name: "NEXWATCH Luna Slim", category: "classic",
    price: 18999, oldPrice: null, badge: "NEW",
    face: "analog", strap: "leather",
    desc: "An elegant slim smartwatch with a leather strap and cycle tracking. Made to be noticed.",
    tags: ["Slim", "Leather", "Cycle tracking"],
    specs: {
      Display: "1.2-inch AMOLED",
      Battery: "Up to 6 days",
      "Water resistance": "30 m (3 ATM)",
      GPS: "Connected GPS",
      Health: "Heart rate · Cycle · Sleep",
      Calls: "Notifications"
    },
    variants: [
      { name: "Rose Gold", strap: "#e9b8b0", metal: "rose",     accent: "#f9a8d4" },
      { name: "Silver",    strap: "#cbd5e1", metal: "silver",   accent: "#8b5cf6" },
      { name: "Midnight",  strap: "#1f2236", metal: "gold",     accent: "#fbbf24" }
    ]
  },
  {
    id: 8, name: "NEXWATCH Titan Edge", category: "ultra",
    price: 64999, oldPrice: null, badge: "PREMIUM",
    face: "analog", strap: "steel",
    desc: "Our most premium smartwatch: titanium body, sapphire display and a steel link bracelet.",
    tags: ["Titanium", "Sapphire", "12 days"],
    specs: {
      Display: "1.5-inch AMOLED · sapphire glass",
      Battery: "Up to 12 days",
      "Water resistance": "100 m (10 ATM)",
      GPS: "Dual-band GPS",
      Health: "ECG · SpO2 · Skin temperature",
      Calls: "Bluetooth calling"
    },
    variants: [
      { name: "Titanium", strap: "#7d8296", metal: "titanium", accent: "#22d3ee" },
      { name: "Black",    strap: "#23252f", metal: "graphite", accent: "#f43f9d" },
      { name: "Gold",     strap: "#c9a24b", metal: "gold",     accent: "#fbbf24" }
    ]
  }
];
