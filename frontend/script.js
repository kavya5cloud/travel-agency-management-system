/* ===================== DATA ===================== */
const TOUR_DATA = [
  {
    id: "paris-getaway",
    name: "Paris Getaway",
    short: "5 days exploring the City of Lights – Eiffel, Louvre & Seine.",
    image: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSw7tNXKQ0a-sw-HvKZhkbrLIIhFrL2Kikb43aII-K9qFGeDMhmuvwyCF0F0cio0pUBmg3NYtB7UMQ9NDrrWKvCe0zGZV6j5jEtOVDGQ3oKb9u7sHc0cvlr1J5Ufvh5Pbv_FSwEj=w243-h244-n-k-no-nu",
    price: "₹1,20,000",
    badge: "Popular",
    details: {
      description: "A romantic classic: art, food and iconic landmarks.",
      days: [
        "Arrival, Seine walk and Eiffel Tower by evening",
        "Louvre museum + Montmartre evening",
        "Versailles day trip",
        "Shopping day + local markets",
        "Departure"
      ]
    }
  },
  {
    id: "bali-bliss",
    name: "Bali Bliss",
    short: "Relax on pristine beaches, cultural Ubud & rice terraces.",
    image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSy8V0s87yV9evPhb7UPEHGcwPqhGHwzHSjUxE4FzquyTuup4XURSkRqPECRbWN3fWPkxpuvc16Yjg6ZLmNYW5BK-I&s=19",
    price: "₹85,000",
    badge: "Best Value",
    details: {
      description: "Beaches, temples and yoga – perfect for rest & recharge.",
      days: [
        "Arrival and beach relaxation",
        "Ubud: monkey forest & rice terraces",
        "Water sports + beach club",
        "Island tour and sunset temple",
        "Departure"
      ]
    }
  },
  {
    id: "swiss-escape",
    name: "Swiss Escape",
    short: "Snowy alps, scenic trains and lakeside towns.",
    image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTkQQsMODBD8MQ8v_8gyRYuvw7c735ziDujyshylTrwR6Pgz2Dnljge_MET0SsbT0WV165Bs9nVtPc0ANyt4a9HYKI&s=19",
    price: "₹1,40,000",
    badge: "Premium",
    details: {
      description: "Scenic rail journeys, alpine hikes and cozy villages.",
      days: [
        "Zurich arrival + lakeside walk",
        "Interlaken & Jungfrau excursion",
        "Lucerne and Mount Pilatus",
        "Scenic train rides",
        "Departure"
      ]
    }
  }
];

/* ===================== UTILITIES ===================== */
function el(id){ return document.getElementById(id); }
function updateYear(){ el('year').textContent = new Date().getFullYear(); }
updateYear();

function setActiveNav(route){
  document.querySelectorAll('.nav-link').forEach(a=>{
    a.classList.toggle('active', a.dataset.route === route);
  });
}

function parseHash(){
  const raw = location.hash.slice(1) || 'home';
  const [routePart, queryPart] = raw.split('?');
  const params = {};
  if(queryPart){
    queryPart.split('&').forEach(p=>{
      const [k,v] = p.split('=');
      if(k) params[k] = decodeURIComponent(v || '');
    });
  }
  return { route: routePart, params };
}

/* ===================== RENDERERS ===================== */
function renderHome(){
  setActiveNav('home');
  return `
    <section class="hero">
      <div class="hero-left">
        <h2>Explore the World with Us</h2>
        <p>Handpicked packages, seamless bookings, and 24/7 support. Your dream destination awaits – let's make it a reality together.</p>
        <div style="margin-top:25px;display:flex;gap:15px;flex-wrap:wrap;">
          <a class="btn" href="#tours">Explore Tours</a>
          <a class="btn ghost" href="#booking">Book Now</a>
        </div>
      </div>
      <div class="hero-image">
        <img src="https://source.unsplash.com/520x360/?travel,adventure" alt="travel">
      </div>
    </section>

    <section class="section scroll-reveal">
      <h2 class="section-title">🌟 Popular Tours</h2>
      <p style="color:var(--text-light);margin-bottom:30px;font-size:1.1rem;">Discover our most loved destinations</p>
      <div class="cards">${TOUR_DATA.map(t => tourCardHtml(t)).join('')}</div>
    </section>
  `;
}

function renderTours(){
  setActiveNav('tours');
  return `
    <section class="section">
      <h2 class="section-title">🗺️ All Tour Packages</h2>
      <div class="cards">${TOUR_DATA.map(t => tourCardHtml(t, true)).join('')}</div>
    </section>
  `;
}

function tourCardHtml(t, showPrice=false){
  return `
    <article class="card" onclick="openItinerary('${t.id}')">
      ${t.badge ? `<div class="card-badge">${t.badge}</div>` : ''}
      <img src="${t.image}" alt="${t.name}">
      <div class="card-content">
        <h3>${t.name}</h3>
        <p>${t.short}</p>
        ${showPrice ? `<div class="card-price">${t.price}</div>` : ''}
      </div>
    </article>
  `;
}

function renderItinerary(id){
  setActiveNav('tours');
  const t = TOUR_DATA.find(x => x.id === id);
  if(!t) return `<section class="section"><h2>❌ Tour not found</h2></section>`;
  return `
    <section class="section">
      <div style="display:flex;gap:30px;flex-wrap:wrap;align-items:flex-start;justify-content:center">
        <img src="${t.image}" alt="${t.name}" style="width:100%;max-width:520px;border-radius:20px;">
        <div class="itinerary-card">
          <h3>${t.name}</h3>
          <p>${t.details.description}</p>
          <div class="card-price">${t.price}</div>
          <h4 style="margin-top:25px;margin-bottom:15px;color:var(--primary1)">📅 Itinerary</h4>
          <ul class="day-list">${t.details.days.map((d,i)=>`<li><strong>Day ${i+1}:</strong> ${d}</li>`).join('')}</ul>
          <button class="btn" onclick="startBooking('${t.id}')">🎫 Book this package</button>
        </div>
      </div>
    </section>
  `;
}

function renderBooking(prefill){
  setActiveNav('booking');
  return `
    <section class="section">
      <h2 class="section-title">📝 Customer Booking</h2>
      <p style="color:var(--text-light);text-align:center;margin-bottom:30px;">Fill out the form below to reserve your dream vacation</p>

      <div class="form">
        <label>👤 Full Name</label>
        <input id="bk-name" type="text" placeholder="Enter your full name" required>

        <label>📧 Email Address</label>
        <input id="bk-email" type="email" placeholder="you@example.com" required>

        <label>📱 Phone Number</label>
        <input id="bk-phone" type="text" placeholder="+91 98765 43210" required>

        <label>🎫 Select Package</label>
        <select id="bk-package">
          <option value="">-- Choose your destination --</option>
          ${TOUR_DATA.map(t => `<option value="${t.id}" ${prefill===t.id ? 'selected':''}>${t.name} – ${t.price}</option>`).join('')}
        </select>

        <button class="btn" id="bk-submit">Confirm Booking</button>
      </div>
      <ul id="customer-list"></ul>
    </section>
  `;
}

/* ===================== APP / ROUTER ===================== */
const app = el('app');

function routerRender(){
  const {route, params} = parseHash();
  window.scrollTo({top:0, behavior:'smooth'});
  if(route === 'home') app.innerHTML = renderHome();
  else if(route === 'tours') app.innerHTML = renderTours();
  else if(route === 'itinerary') app.innerHTML = renderItinerary(params.id);
  else if(route === 'booking') app.innerHTML = renderBooking(params.prefill);
  attachAfterRender();
}

/* ===================== BACKEND CONNECTION ===================== */
function attachAfterRender(){
  const bkBtn = document.getElementById('bk-submit');
  if(bkBtn){
    bkBtn.addEventListener('click', async (e)=>{
      e.preventDefault();
      const name = el('bk-name').value.trim();
      const email = el('bk-email').value.trim();
      const phone = el('bk-phone').value.trim();
      const pkg = el('bk-package').value;

      if(!name || !email || !phone || !pkg) return renderCustomerList(null,"⚠️ Please fill all fields.");

      const bookingData = {
        Booking_ID: "BK" + Math.floor(Math.random()*100000),
        Customer_ID: "CUST" + Math.floor(Math.random()*1000),
        Package_ID: pkg,
        TravelDate: new Date().toISOString().slice(0,10),
        Status: "Pending",
        Amount: "50000",
        PaymentStatus: "Unpaid"
      };

      try{
        const res = await fetch("http://localhost:3000/api/bookings", {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify(bookingData)
        });
        const result = await res.json();
        renderCustomerList(result, null);
      }catch(err){
        renderCustomerList(null, "❌ Could not connect to backend. Make sure Node server is running.");
      }
    });
  }
  renderCustomerList();
}

function renderCustomerList(booking, error){
  const listEl = el("customer-list");
  if(!listEl) return;
  if(error) listEl.innerHTML = `<li class="error">${error}</li>`;
  else if(booking) listEl.innerHTML = `<li class="success">✅ Booking saved successfully!</li>`;
  else listEl.innerHTML = `<p style="color:var(--muted);text-align:center;">📋 Fill the form above to confirm booking.</p>`;
}

/* ===================== INTERACTIVITY ===================== */
window.openItinerary = id => location.hash = `itinerary?id=${id}`;
window.startBooking = id => location.hash = `booking?prefill=${id}`;

window.addEventListener('hashchange', routerRender);
window.addEventListener('load', routerRender);
