/*  ============================================================
    Free Food & Rewards — Provo to Lehi, Utah
    Leaflet + OpenStreetMap — no API key needed
    ============================================================ */

const DEFAULT_CENTER = [40.2338, -111.6585]; // Provo, UT
const DEFAULT_ZOOM = 12;

// ─── Brand colours & emojis ─────────────────────────────────
const BRAND_COLORS = {
  "Maverik":        "#d32f2f",
  "Mo' Bettahs":    "#2e7d32",
  "Taco Bell":      "#7b1fa2",
  "MOD Pizza":      "#ef6c00",
  "Café Zupas":     "#1565c0",
  "Beans & Brews":  "#6d4c41",
  "7-Eleven":       "#00897b",
  "Slim Chickens":  "#c62828",
};
const BRAND_EMOJI = {
  "Maverik":       "🍩",
  "Mo' Bettahs":   "🍗",
  "Taco Bell":     "🌯",
  "MOD Pizza":     "🎂",
  "Café Zupas":    "🍟",
  "Beans & Brews": "☕",
  "7-Eleven":      "🥤",
  "Slim Chickens": "🐔",
};

// ─── All locations ─────────────────────────────────────────
const LOCATIONS = [
  // ── Maverik ──────────────────────────────────────────
  { brand:"Maverik", city:"Provo",         address:"1410 S University Ave, Provo, UT 84601",            lat:40.2208, lng:-111.6579, hours:"Open 24 Hours",    offer:"Free drink + snack on app sign-up", signup:"https://loyalty.maverik.com/signup-email" },
  { brand:"Maverik", city:"Provo",         address:"1530 N State St, Provo, UT 84604",                  lat:40.2590, lng:-111.6504, hours:"Open 24 Hours",    offer:"Free drink + snack on app sign-up", signup:"https://loyalty.maverik.com/signup-email" },
  { brand:"Maverik", city:"Provo",         address:"325 S State St, Provo, UT 84601",                   lat:40.2300, lng:-111.6600, hours:"Open 24 Hours",    offer:"Free drink + snack on app sign-up", signup:"https://loyalty.maverik.com/signup-email" },
  { brand:"Maverik", city:"Provo",         address:"870 W Center St, Provo, UT 84601",                  lat:40.2338, lng:-111.6700, hours:"Open 24 Hours",    offer:"Free drink + snack on app sign-up", signup:"https://loyalty.maverik.com/signup-email" },
  { brand:"Maverik", city:"Orem",          address:"1240 S 800 E, Orem, UT 84097",                      lat:40.2730, lng:-111.6720, hours:"Open 24 Hours",    offer:"Free drink + snack on app sign-up", signup:"https://loyalty.maverik.com/signup-email" },
  { brand:"Maverik", city:"Orem",          address:"1249 S Geneva Rd, Orem, UT 84058",                  lat:40.2735, lng:-111.7200, hours:"Open 24 Hours",    offer:"Free drink + snack on app sign-up", signup:"https://loyalty.maverik.com/signup-email" },
  { brand:"Maverik", city:"Orem",          address:"1395 W 1600 N, Orem, UT 84057",                     lat:40.3150, lng:-111.7200, hours:"Open 24 Hours",    offer:"Free drink + snack on app sign-up", signup:"https://loyalty.maverik.com/signup-email" },
  { brand:"Maverik", city:"Orem",          address:"795 S State St, Orem, UT 84058",                    lat:40.2850, lng:-111.6930, hours:"5 AM – 12 AM",     offer:"Free drink + snack on app sign-up", signup:"https://loyalty.maverik.com/signup-email" },
  { brand:"Maverik", city:"Orem",          address:"833 N 1200 W, Orem, UT 84057",                      lat:40.3080, lng:-111.7150, hours:"Open 24 Hours",    offer:"Free drink + snack on app sign-up", signup:"https://loyalty.maverik.com/signup-email" },
  { brand:"Maverik", city:"Orem",          address:"85 W 800 N, Orem, UT 84057",                        lat:40.3050, lng:-111.6970, hours:"Open 24 Hours",    offer:"Free drink + snack on app sign-up", signup:"https://loyalty.maverik.com/signup-email" },
  { brand:"Maverik", city:"American Fork", address:"1078 E State Rd, American Fork, UT 84003",          lat:40.3760, lng:-111.7730, hours:"Open 24 Hours",    offer:"Free drink + snack on app sign-up", signup:"https://loyalty.maverik.com/signup-email" },
  { brand:"Maverik", city:"Lehi",          address:"1075 S 1100 W, Lehi, UT 84043",                     lat:40.3800, lng:-111.8750, hours:"Open 24 Hours",    offer:"Free drink + snack on app sign-up", signup:"https://loyalty.maverik.com/signup-email" },
  { brand:"Maverik", city:"Lehi",          address:"2050 N 3600 W, Lehi, UT 84043",                     lat:40.4150, lng:-111.9100, hours:"Open 24 Hours",    offer:"Free drink + snack on app sign-up", signup:"https://loyalty.maverik.com/signup-email" },
  { brand:"Maverik", city:"Lehi",          address:"3569 N Thanksgiving Way, Lehi, UT 84043",           lat:40.4280, lng:-111.8500, hours:"Open 24 Hours",    offer:"Free drink + snack on app sign-up", signup:"https://loyalty.maverik.com/signup-email" },

  // ── Mo' Bettahs ──────────────────────────────────────
  { brand:"Mo' Bettahs", city:"Provo",          address:"442 N 900 E, Provo, UT 84606",                 lat:40.2400, lng:-111.6440, hours:"10:30 AM – 10 PM", offer:"Free mini plate on sign-up",        signup:"https://signup.thanx.com/mobettahs" },
  { brand:"Mo' Bettahs", city:"Orem",           address:"115 N State St, Orem, UT 84057",               lat:40.2980, lng:-111.6940, hours:"10:30 AM – 10 PM", offer:"Free mini plate on sign-up",        signup:"https://signup.thanx.com/mobettahs" },
  { brand:"Mo' Bettahs", city:"Orem",           address:"1385 S State St, Orem, UT 84097",              lat:40.2710, lng:-111.6930, hours:"10:30 AM – 10 PM", offer:"Free mini plate on sign-up",        signup:"https://signup.thanx.com/mobettahs" },
  { brand:"Mo' Bettahs", city:"Pleasant Grove", address:"855 W State St, Pleasant Grove, UT 84062",     lat:40.3620, lng:-111.7500, hours:"10:30 AM – 10 PM", offer:"Free mini plate on sign-up",        signup:"https://signup.thanx.com/mobettahs" },
  { brand:"Mo' Bettahs", city:"Lehi",           address:"2975 Club House Dr, Lehi, UT 84043",           lat:40.4200, lng:-111.8600, hours:"10:30 AM – 10 PM", offer:"Free mini plate on sign-up",        signup:"https://signup.thanx.com/mobettahs" },

  // ── Taco Bell ────────────────────────────────────────
  { brand:"Taco Bell", city:"Provo",         address:"899 S University Ave, Provo, UT 84601",            lat:40.2200, lng:-111.6579, hours:"Open until 12 AM",  offer:"Free Beefy 5-Layer Burrito on app sign-up", signup:"https://www.tacobell.com/register/yum" },
  { brand:"Taco Bell", city:"Provo",         address:"433 N 900 E, Provo, UT 84606",                     lat:40.2395, lng:-111.6440, hours:"Open until 1 AM",   offer:"Free Beefy 5-Layer Burrito on app sign-up", signup:"https://www.tacobell.com/register/yum" },
  { brand:"Taco Bell", city:"Provo",         address:"1244 N Freedom Blvd, Provo, UT 84604",             lat:40.2550, lng:-111.6600, hours:"Varies",            offer:"Free Beefy 5-Layer Burrito on app sign-up", signup:"https://www.tacobell.com/register/yum" },
  { brand:"Taco Bell", city:"Provo",         address:"255 WSC South Campus Dr, Provo, UT 84602",         lat:40.2500, lng:-111.6490, hours:"Varies",            offer:"Free Beefy 5-Layer Burrito on app sign-up", signup:"https://www.tacobell.com/register/yum" },
  { brand:"Taco Bell", city:"Orem",          address:"800 W University Pkwy, Orem, UT 84058",            lat:40.2830, lng:-111.7050, hours:"Open until 8 PM",   offer:"Free Beefy 5-Layer Burrito on app sign-up", signup:"https://www.tacobell.com/register/yum" },
  { brand:"Taco Bell", city:"Orem",          address:"195 W Center St, Orem, UT 84057",                  lat:40.2960, lng:-111.6980, hours:"Varies",            offer:"Free Beefy 5-Layer Burrito on app sign-up", signup:"https://www.tacobell.com/register/yum" },
  { brand:"Taco Bell", city:"Orem",          address:"1130 W 800 N, Orem, UT 84057",                     lat:40.3050, lng:-111.7120, hours:"Varies",            offer:"Free Beefy 5-Layer Burrito on app sign-up", signup:"https://www.tacobell.com/register/yum" },
  { brand:"Taco Bell", city:"Lindon",        address:"571 N State St, Lindon, UT 84042",                 lat:40.3430, lng:-111.7220, hours:"Open until 1 AM",   offer:"Free Beefy 5-Layer Burrito on app sign-up", signup:"https://www.tacobell.com/register/yum" },
  { brand:"Taco Bell", city:"American Fork", address:"633 S 500 E, American Fork, UT 84003",             lat:40.3690, lng:-111.7850, hours:"Varies",            offer:"Free Beefy 5-Layer Burrito on app sign-up", signup:"https://www.tacobell.com/register/yum" },
  { brand:"Taco Bell", city:"Lehi",          address:"1300 E State St, Lehi, UT 84043",                  lat:40.3880, lng:-111.8300, hours:"Open until 5:30 AM",offer:"Free Beefy 5-Layer Burrito on app sign-up", signup:"https://www.tacobell.com/register/yum" },
  { brand:"Taco Bell", city:"Lehi",          address:"2190 W Stockton Ln, Lehi, UT 84043",               lat:40.3950, lng:-111.8900, hours:"Open until 4 AM",   offer:"Free Beefy 5-Layer Burrito on app sign-up", signup:"https://www.tacobell.com/register/yum" },

  // ── MOD Pizza ────────────────────────────────────────
  { brand:"MOD Pizza", city:"American Fork",     address:"599 Pacific Dr, American Fork, UT",             lat:40.3850, lng:-111.7850, hours:"Varies",            offer:"Free pizza via MOD Rewards",                signup:"https://modpizza.com/rewards/" },
  { brand:"MOD Pizza", city:"Saratoga Springs",  address:"617 N Redwood Rd, Saratoga Springs, UT",        lat:40.3560, lng:-111.9010, hours:"Varies",            offer:"Free pizza via MOD Rewards",                signup:"https://modpizza.com/rewards/" },

  // ── Café Zupas ───────────────────────────────────────
  { brand:"Café Zupas", city:"Provo", address:"408 W 2230 N, Provo, UT 84604",                           lat:40.2620, lng:-111.6630, hours:"Mon-Sat 11 AM – 9 PM", offer:"Earn points → free chips or drink",       signup:"https://cafezupas.com/Welcome" },
  { brand:"Café Zupas", city:"Orem",  address:"55 S State St, Orem, UT 84058",                           lat:40.2950, lng:-111.6940, hours:"Mon-Sat 11 AM – 9 PM", offer:"Earn points → free chips or drink",       signup:"https://cafezupas.com/Welcome" },

  // ── Beans & Brews ────────────────────────────────────
  { brand:"Beans & Brews", city:"Orem",          address:"325 E University Pkwy, Orem, UT 84058",        lat:40.2830, lng:-111.6870, hours:"Mon-Sat 5:30 AM – 7 PM",   offer:"Free small drink on sign-up",         signup:"https://www.beansandbrews.com/rewards/" },
  { brand:"Beans & Brews", city:"Pleasant Grove", address:"855 W State St Ste 103, Pleasant Grove, UT",  lat:40.3610, lng:-111.7510, hours:"Mon-Fri 5:30 AM – 7 PM",   offer:"Free small drink on sign-up",         signup:"https://www.beansandbrews.com/rewards/" },
  { brand:"Beans & Brews", city:"American Fork", address:"933 W 500 N, American Fork, UT 84003",         lat:40.3830, lng:-111.8100, hours:"Mon-Sat 5:30 AM – 8 PM",   offer:"Free small drink on sign-up",         signup:"https://www.beansandbrews.com/rewards/" },
  { brand:"Beans & Brews", city:"Lehi",          address:"1791 W Traverse Pkwy Ste A, Lehi, UT 84043",  lat:40.4020, lng:-111.8800, hours:"Mon-Sat 5:30 AM – 8 PM",   offer:"Free small drink on sign-up",         signup:"https://www.beansandbrews.com/rewards/" },

  // ── 7-Eleven ─────────────────────────────────────────
  { brand:"7-Eleven", city:"Provo",         address:"496 N University Ave, Provo, UT 84601",              lat:40.2390, lng:-111.6579, hours:"Open 24/7",          offer:"Free Slurpee / coffee / fountain drink",    signup:"https://www.7-eleven.com/app" },
  { brand:"7-Eleven", city:"Provo",         address:"2025 W Center St, Provo, UT 84601",                  lat:40.2338, lng:-111.6900, hours:"Open 24/7",          offer:"Free Slurpee / coffee / fountain drink",    signup:"https://www.7-eleven.com/app" },
  { brand:"7-Eleven", city:"Provo",         address:"222 W 300 S, Provo, UT 84601",                       lat:40.2310, lng:-111.6630, hours:"Varies",             offer:"Free Slurpee / coffee / fountain drink",    signup:"https://www.7-eleven.com/app" },
  { brand:"7-Eleven", city:"Provo",         address:"2291 N University Pkwy, Provo, UT 84604",            lat:40.2650, lng:-111.6550, hours:"Varies",             offer:"Free Slurpee / coffee / fountain drink",    signup:"https://www.7-eleven.com/app" },
  { brand:"7-Eleven", city:"Orem",          address:"110 W Center St, Orem, UT 84057",                    lat:40.2960, lng:-111.6960, hours:"Open 24/7",          offer:"Free Slurpee / coffee / fountain drink",    signup:"https://www.7-eleven.com/app" },
  { brand:"7-Eleven", city:"Orem",          address:"31 W 800 N, Orem, UT 84057",                         lat:40.3050, lng:-111.6950, hours:"Open 24/7",          offer:"Free Slurpee / coffee / fountain drink",    signup:"https://www.7-eleven.com/app" },
  { brand:"7-Eleven", city:"Orem",          address:"1120 Center St, Orem, UT 84057",                     lat:40.2960, lng:-111.7100, hours:"Varies",             offer:"Free Slurpee / coffee / fountain drink",    signup:"https://www.7-eleven.com/app" },
  { brand:"7-Eleven", city:"Lindon",        address:"25 S State St, Lindon, UT 84042",                    lat:40.3400, lng:-111.7230, hours:"Varies",             offer:"Free Slurpee / coffee / fountain drink",    signup:"https://www.7-eleven.com/app" },
  { brand:"7-Eleven", city:"American Fork", address:"290 W Main St, American Fork, UT 84003",             lat:40.3770, lng:-111.7980, hours:"Open 24/7",          offer:"Free Slurpee / coffee / fountain drink",    signup:"https://www.7-eleven.com/app" },
  { brand:"7-Eleven", city:"American Fork", address:"109 E Main St, American Fork, UT 84003",             lat:40.3775, lng:-111.7900, hours:"Varies",             offer:"Free Slurpee / coffee / fountain drink",    signup:"https://www.7-eleven.com/app" },
  { brand:"7-Eleven", city:"American Fork", address:"655 S 500 E, American Fork, UT 84003",               lat:40.3700, lng:-111.7860, hours:"Varies",             offer:"Free Slurpee / coffee / fountain drink",    signup:"https://www.7-eleven.com/app" },
  { brand:"7-Eleven", city:"Lehi",          address:"2261 W Main St, Lehi, UT 84043",                     lat:40.3890, lng:-111.8800, hours:"Open 24/7",          offer:"Free Slurpee / coffee / fountain drink",    signup:"https://www.7-eleven.com/app" },
  { brand:"7-Eleven", city:"Lehi",          address:"47 S 850 E, Lehi, UT 84043",                         lat:40.3860, lng:-111.8350, hours:"Varies",             offer:"Free Slurpee / coffee / fountain drink",    signup:"https://www.7-eleven.com/app" },
  { brand:"7-Eleven", city:"Lehi",          address:"2851 Club House Dr #100, Lehi, UT 84043",            lat:40.4210, lng:-111.8580, hours:"Varies",             offer:"Free Slurpee / coffee / fountain drink",    signup:"https://www.7-eleven.com/app" },

  // ── Slim Chickens ────────────────────────────────────
  { brand:"Slim Chickens", city:"Pleasant Grove", address:"855 S N County Blvd, Pleasant Grove, UT",      lat:40.3550, lng:-111.7350, hours:"10 AM – 10 PM",     offer:"Free chicken sandwich on sign-up",           signup:"https://slimchickens.com/rewards/" },
  { brand:"Slim Chickens", city:"Lehi",           address:"1250 E State St, Lehi, UT 84043",              lat:40.3880, lng:-111.8310, hours:"10 AM – 10 PM",     offer:"Free chicken sandwich on sign-up",           signup:"https://slimchickens.com/rewards/" },

  // ── No Name Cake (placeholder — single known Provo-area location) ──
  // If "No Name Cake" is a local spot, add its actual address here.
];

// ─── State ─────────────────────────────────────────────────
let map, clusterGroup, userMarker;
let offerMarkers = [];
let userPosition = null;
let filteredList = [];
let hasRealLocation = false;

// ─── Init ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  map = L.map("map").setView(DEFAULT_CENTER, DEFAULT_ZOOM);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  clusterGroup = L.markerClusterGroup({ maxClusterRadius: 40 });
  map.addLayer(clusterGroup);

  populateBrandFilter();
  wireUpControls();

  // Default: show everything from center of corridor
  userPosition = { lat: DEFAULT_CENTER[0], lng: DEFAULT_CENTER[1] };
  showOffers(LOCATIONS, userPosition);
});

// ─── Brand filter dropdown ─────────────────────────────────
function populateBrandFilter() {
  const sel = document.getElementById("select-brand");
  const brands = [...new Set(LOCATIONS.map((l) => l.brand))];
  brands.forEach((b) => {
    const opt = document.createElement("option");
    opt.value = b;
    opt.textContent = b;
    sel.appendChild(opt);
  });
}

// ─── Controls ──────────────────────────────────────────────
function wireUpControls() {
  document.getElementById("btn-locate").addEventListener("click", geolocateUser);
  document.getElementById("btn-search").addEventListener("click", searchAddress);
  document.getElementById("input-address").addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchAddress();
  });
  document.getElementById("select-radius").addEventListener("change", refresh);
  document.getElementById("select-brand").addEventListener("change", refresh);
}

function refresh() {
  if (userPosition) showOffers(LOCATIONS, userPosition);
}

function geolocateUser() {
  if (!navigator.geolocation) {
    // Geolocation not available — silently use default center
    userPosition = { lat: DEFAULT_CENTER[0], lng: DEFAULT_CENTER[1] };
    map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
    showOffers(LOCATIONS, userPosition);
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      hasRealLocation = true;
      userPosition = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      map.setView([userPosition.lat, userPosition.lng], 13);
      showOffers(LOCATIONS, userPosition);
    },
    () => {
      // Permission denied or error — fall back to default center
      userPosition = { lat: DEFAULT_CENTER[0], lng: DEFAULT_CENTER[1] };
      map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
      showOffers(LOCATIONS, userPosition);
    }
  );
}

function searchAddress() {
  const addr = document.getElementById("input-address").value.trim();
  if (!addr) return;
  const url = "https://nominatim.openstreetmap.org/search?" +
    new URLSearchParams({ q: addr, format: "json", limit: "1" });

  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      if (data.length === 0) { alert("Could not find that address."); return; }
      userPosition = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      map.setView([userPosition.lat, userPosition.lng], 13);
      showOffers(LOCATIONS, userPosition);
    })
    .catch(() => alert("Geocoding failed. Check your connection."));
}

// ─── Core ──────────────────────────────────────────────────
function showOffers(offers, center) {
  const maxMinutes = parseFloat(document.getElementById("select-radius").value);
  const brandFilter = document.getElementById("select-brand").value;

  let list = offers.map((o) => {
    const miles = haversineMiles(center.lat, center.lng, o.lat, o.lng);
    return { ...o, distance: miles, driveMin: Math.round((miles / 25) * 60) };
  });
  list = list.filter((o) => o.driveMin <= maxMinutes);
  if (brandFilter !== "all") list = list.filter((o) => o.brand === brandFilter);
  list.sort((a, b) => a.distance - b.distance);

  filteredList = list;
  renderTable(list);
  renderMarkers(list, center);
}

// ─── Table ─────────────────────────────────────────────────
function renderTable(list) {
  const tbody = document.getElementById("food-tbody");
  const msg = document.getElementById("empty-msg");
  const countEl = document.getElementById("result-count");
  tbody.innerHTML = "";

  if (list.length === 0) {
    msg.style.display = "";
    msg.textContent = "No locations found. Try increasing the radius or changing the brand filter.";
    countEl.textContent = "";
    return;
  }
  msg.style.display = "none";
  countEl.textContent = `(${list.length} locations)`;

  list.forEach((item, i) => {
    const color = BRAND_COLORS[item.brand] || "#333";
    const emoji = BRAND_EMOJI[item.brand] || "📌";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><span class="brand-dot" style="background:${color}"></span>${emoji} <strong>${esc(item.brand)}</strong></td>
      <td>${esc(item.offer)}</td>
      <td><a class="addr-link" href="${mapsUrl(item.address)}" target="_blank" rel="noopener">${esc(item.address)}</a></td>
      <td>${esc(item.city)}</td>
      <td>${esc(item.hours)}</td>
      <td>${formatDist(item.distance)}</td>
      <td><a class="signup-link" href="${esc(item.signup)}" target="_blank" rel="noopener">Sign Up ↗</a></td>
    `;
    tr.addEventListener("click", () => highlightMarker(i));
    tbody.appendChild(tr);
  });
}

// ─── Map markers ───────────────────────────────────────────
function renderMarkers(list, center) {
  clusterGroup.clearLayers();
  offerMarkers = [];
  if (userMarker) map.removeLayer(userMarker);

  const markerLabel = hasRealLocation ? "📍 YOU ARE HERE" : "📍 PROVO (default)";
  const popupText = hasRealLocation
    ? "<strong>📍 You are here</strong>"
    : "<strong>📍 Default: Provo</strong><br><small>Share your location for accurate results</small>";

  // "You Are Here" pulsing marker
  const youIcon = L.divIcon({
    className: "",
    html: `<div class="you-are-here">
             <div class="pulse"></div>
             <div class="label">${markerLabel}</div>
           </div>`,
    iconSize: [0, 0],
    iconAnchor: [0, -4],
  });
  userMarker = L.marker([center.lat, center.lng], { icon: youIcon, zIndexOffset: 1000 })
    .addTo(map)
    .bindPopup(popupText);

  list.forEach((item) => {
    const color = BRAND_COLORS[item.brand] || "#333";

    const emoji = BRAND_EMOJI[item.brand] || "📌";
    const icon = L.divIcon({
      className: "emoji-marker",
      html: emoji,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    const marker = L.marker([item.lat, item.lng], { icon })
      .bindPopup(`
        <div class="iw">
          <h3>${emoji} ${esc(item.brand)}</h3>
          <p><strong>${esc(item.offer)}</strong></p>
          <p><a href="${mapsUrl(item.address)}" target="_blank" rel="noopener" style="color:#475569">${esc(item.address)}</a></p>
          <p>🕐 ${esc(item.hours)}</p>
          <p>� ${formatDist(item.distance)} drive</p>
          <a href="${esc(item.signup)}" target="_blank" rel="noopener" style="color:#0d9488;font-weight:600">Sign Up ↗</a>
        </div>
      `);
    offerMarkers.push(marker);
    clusterGroup.addLayer(marker);
  });

  // Fit bounds
  if (list.length) {
    const group = L.featureGroup([userMarker, ...offerMarkers]);
    map.fitBounds(group.getBounds().pad(0.08));
  }
}

function highlightMarker(index) {
  if (offerMarkers[index]) {
    offerMarkers[index].openPopup();
    map.setView(offerMarkers[index].getLatLng(), 14);
  }
  document.querySelectorAll("#food-tbody tr").forEach((tr, i) => {
    tr.classList.toggle("active", i === index);
  });
}

// ─── Helpers ───────────────────────────────────────────────
function haversineMiles(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // Earth radius in miles
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDist(miles) {
  // Estimate drive time at ~25 mph average (city/suburban roads)
  const mins = Math.round((miles / 25) * 60);
  if (mins < 1) return "< 1 min";
  return mins + " min";
}

function mapsUrl(address) {
  return "https://www.google.com/maps/search/" + encodeURIComponent(address);
}

function esc(str) {
  const el = document.createElement("span");
  el.textContent = str;
  return el.innerHTML;
}
