(() => {
  "use strict";

  /* ============ Helpers ============ */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const fmt = (n) => `${STORE.currency} ${Math.round(n).toLocaleString("en-US")}`;
  const getP = (id) => PRODUCTS.find((p) => p.id === id);
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (_) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} }
  };

  /* ============ Icons ============ */
  const ICONS = {
    search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35",
    heart: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
    "shopping-bag": "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
    menu: "M3 12h18M3 6h18M3 18h18",
    "arrow-right": "M5 12h14M12 5l7 7-7 7",
    zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    "map-pin": "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    truck: "M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    rotate: "M1 4v6h6M3.51 15a9 9 0 1 0 2.13-9.36L1 10",
    headphones: "M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z",
    activity: "M22 12h-4l-3 9L9 3l-3 9H2",
    phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
    droplet: "M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z",
    clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
    check: "M20 6L9 17l-5-5",
    message: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
    mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6",
    x: "M18 6L6 18M6 6l12 12",
    plus: "M12 5v14M5 12h14",
    minus: "M5 12h14",
    eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    "chevron-up": "M18 15l-6-6-6 6",
    instagram: "M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5zM16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01",
    facebook: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
    youtube: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02l5.75-3.27-5.75-3.27z"
  };
  const ico = (n) => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${ICONS[n] || ""}"/></svg>`;
  const hydrateIcons = (root = document) => $$("[data-icon]", root).forEach((el) => { el.innerHTML = ico(el.dataset.icon); });

  /* ============ Watch renderer (inline SVG) ============ */
  const METALS = {
    graphite: ["#4b5069", "#14162a"],
    silver: ["#eef0f8", "#8a90a9"],
    gold: ["#f8dc8e", "#a8782a"],
    titanium: ["#9aa0b2", "#3b3e4f"],
    rose: ["#f8cbc4", "#b0716b"]
  };
  const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const nowTime = () => { const d = new Date(); return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`; };
  const nowDate = () => { const d = new Date(); return `${DAYS[d.getDay()]} ${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]}`; };

  function shade(hex, p) {
    const n = parseInt(hex.slice(1), 16);
    let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    const t = p < 0 ? 0 : 255, k = Math.abs(p);
    r = Math.round((t - r) * k + r); g = Math.round((t - g) * k + g); b = Math.round((t - b) * k + b);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  const polar = (cx, cy, len, deg) => { const a = (deg * Math.PI) / 180; return [cx + len * Math.sin(a), cy - len * Math.cos(a)]; };

  function faceSVG(p, v) {
    const acc = v.accent;
    if (p.face === "analog") {
      let t = "";
      for (let i = 0; i < 12; i++) {
        const major = i % 3 === 0;
        const [x1, y1] = polar(100, 154, major ? 45 : 49, i * 30);
        const [x2, y2] = polar(100, 154, 54, i * 30);
        t += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#fff" stroke-width="${major ? 2.6 : 1.4}" stroke-linecap="round" opacity="${major ? 1 : .55}"/>`;
      }
      const [hx, hy] = polar(100, 154, 26, 305);
      const [mx, my] = polar(100, 154, 39, 60);
      const [sx, sy] = polar(100, 154, 44, 200);
      const [tx, ty] = polar(100, 154, -10, 200);
      return `${t}
        <text x="100" y="131" text-anchor="middle" font-size="5.5" letter-spacing="1.6" fill="#9aa3c4" font-weight="600">NEXWATCH</text>
        <line x1="100" y1="154" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="#fff" stroke-width="3.8" stroke-linecap="round"/>
        <line x1="100" y1="154" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>
        <line x1="${tx.toFixed(1)}" y1="${ty.toFixed(1)}" x2="${sx.toFixed(1)}" y2="${sy.toFixed(1)}" stroke="${acc}" stroke-width="1.1" stroke-linecap="round"/>
        <circle cx="100" cy="154" r="3.8" fill="${acc}"/><circle cx="100" cy="154" r="1.6" fill="#05060c"/>`;
    }
    if (p.face === "sport") {
      const hs = [8, 12, 10, 16, 22, 18, 26, 20, 14, 10];
      const bars = hs.map((h, i) => `<rect x="${(58 + i * 9.5).toFixed(1)}" y="${204 - h}" width="5" height="${h}" rx="2" fill="${acc}" opacity="${(0.35 + i * 0.065).toFixed(2)}"/>`).join("");
      return `<text x="100" y="119" text-anchor="middle" font-size="7" letter-spacing="2" fill="${acc}" font-weight="700">ZONE 4 · RUN</text>
        <text x="100" y="158" text-anchor="middle" font-size="38" font-weight="800" fill="#fff">148</text>
        <text x="100" y="172" text-anchor="middle" font-size="7.5" letter-spacing="2.4" fill="#8e96b0">BPM</text>${bars}`;
    }
    if (p.face === "kids") {
      return `<circle cx="100" cy="154" r="40" fill="${acc}"/>
        <circle cx="86" cy="147" r="7.5" fill="#fff"/><circle cx="114" cy="147" r="7.5" fill="#fff"/>
        <circle cx="87.5" cy="148.5" r="3.6" fill="#0b0d18"/><circle cx="112.5" cy="148.5" r="3.6" fill="#0b0d18"/>
        <circle cx="75" cy="162" r="5" fill="#fff" opacity=".28"/><circle cx="125" cy="162" r="5" fill="#fff" opacity=".28"/>
        <path d="M83 163 Q100 181 117 163" stroke="#0b0d18" stroke-width="3.6" fill="none" stroke-linecap="round"/>`;
    }
    // digital
    const ring = (r, col, f) => {
      const C = 2 * Math.PI * r;
      return `<circle cx="100" cy="184" r="${r}" fill="none" stroke="rgba(255,255,255,.09)" stroke-width="4.5"/>
        <circle cx="100" cy="184" r="${r}" fill="none" stroke="${col}" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="${(C * f).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 100 184)"/>`;
    };
    return `<text class="js-time" x="100" y="139" text-anchor="middle" font-size="29" font-weight="700" fill="#fff">${nowTime()}</text>
      <text class="js-date" x="100" y="153" text-anchor="middle" font-size="7.5" letter-spacing="1.6" fill="#8e96b0">${nowDate()}</text>
      ${ring(18, "#f43f9d", 0.78)}${ring(13, acc, 0.6)}${ring(8, "#8b5cf6", 0.45)}`;
  }

  let uid = 0;
  function watchSVG(p, v) {
    const id = "w" + ++uid;
    const [m1, m2] = METALS[v.metal] || METALS.graphite;
    const s = v.strap;
    const topP = "M64 6Q64 0 72 0H128Q136 0 136 6L144 98H56Z";
    const botP = "M56 202H144L136 294Q136 300 128 300H72Q64 300 64 294Z";
    let deco = "";
    if (p.strap === "silicone") {
      [236, 253, 270].forEach((y) => { deco += `<circle cx="100" cy="${y}" r="3.4" fill="${shade(s, -0.55)}"/><circle cx="100" cy="${y - 0.8}" r="3.4" fill="none" stroke="${shade(s, 0.25)}" stroke-width=".6" opacity=".6"/>`; });
      deco += `<path d="M70 22H130M68 40H132M66 58H134" stroke="${shade(s, -0.3)}" stroke-width="1.2" opacity=".5"/>`;
    } else if (p.strap === "leather") {
      deco += `<path d="M69 8L63 94M131 8L137 94M63 206L69 292M137 206L131 292" stroke="${shade(s, 0.4)}" stroke-width="1.1" stroke-dasharray="3 3" fill="none" opacity=".75"/>`;
      [240, 256, 272].forEach((y) => { deco += `<circle cx="100" cy="${y}" r="2.6" fill="${shade(s, -0.5)}"/>`; });
    } else {
      let l = "";
      for (let y = 6; y < 98; y += 4.5) l += `M0 ${y}H200`;
      for (let y = 204; y < 298; y += 4.5) l += `M0 ${y}H200`;
      deco += `<g clip-path="url(#${id}c)"><path d="${l}" stroke="${shade(s, 0.35)}" stroke-width=".8" opacity=".5"/></g>`;
    }
    return `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${p.name} in ${v.name}" font-family="Sora, Inter, sans-serif">
      <defs>
        <linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${shade(s, -0.4)}"/><stop offset=".5" stop-color="${shade(s, 0.1)}"/><stop offset="1" stop-color="${shade(s, -0.4)}"/></linearGradient>
        <linearGradient id="${id}m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${m1}"/><stop offset="1" stop-color="${m2}"/></linearGradient>
        <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/></linearGradient>
        <radialGradient id="${id}f" cx=".5" cy=".3" r=".9"><stop offset="0" stop-color="#141a3a"/><stop offset="1" stop-color="#03040b"/></radialGradient>
        <clipPath id="${id}c"><path d="${topP}"/><path d="${botP}"/></clipPath>
      </defs>
      <path d="${topP}" fill="url(#${id}s)"/>
      <path d="${botP}" fill="url(#${id}s)"/>
      ${deco}
      <rect x="170" y="128" width="9" height="28" rx="4" fill="url(#${id}m)"/>
      <rect x="170" y="166" width="6" height="16" rx="3" fill="url(#${id}m)" opacity=".85"/>
      <rect x="30" y="84" width="140" height="140" rx="40" fill="url(#${id}m)"/>
      <rect x="30.5" y="84.5" width="139" height="139" rx="39.5" fill="none" stroke="#fff" stroke-opacity=".25"/>
      <rect x="37" y="91" width="126" height="126" rx="34" fill="#05060c"/>
      <rect x="42" y="96" width="116" height="116" rx="29" fill="url(#${id}f)"/>
      ${faceSVG(p, v)}
      <rect x="42" y="96" width="116" height="116" rx="29" fill="url(#${id}g)"/>
    </svg>`;
  }

  /* ============ State ============ */
  let filter = "all", sort = "featured", query = "";
  const pick = {};                                   // product id -> chosen variant index
  let wish = store.get("nw-wish", []).filter((id) => getP(id));
  let cart = store.get("nw-cart", []).filter((i) => getP(i.id) && getP(i.id).variants[i.v] && i.qty > 0);
  let promo = store.get("nw-promo", null);
  if (promo && !STORE.promos[promo]) promo = null;

  /* ============ Toast / modals ============ */
  function toast(msg, icon = "check") {
    const t = $("#toast");
    t.innerHTML = `${ico(icon)}<span>${msg}</span>`;
    t.classList.add("show");
    clearTimeout(toast.t);
    toast.t = setTimeout(() => t.classList.remove("show"), 2400);
  }
  const syncLock = () => document.body.classList.toggle("lock", !!$(".modal.open") || $("#drawer").classList.contains("open") || $("#mobileMenu").classList.contains("open"));
  function openModal(el) { el.classList.add("open"); syncLock(); }
  function closeModals() { $$(".modal.open").forEach((m) => m.classList.remove("open")); syncLock(); }
  function openDrawer() { renderCart(); $("#drawer").classList.add("open"); $("#overlay").classList.add("show"); syncLock(); }
  function closeDrawer() { $("#drawer").classList.remove("open"); $("#overlay").classList.remove("show"); syncLock(); }
  function closeMenu() { $("#mobileMenu").classList.remove("open"); syncLock(); }

  /* ============ Categories ============ */
  function renderCats() {
    const sample = { sport: 1, classic: 3, ultra: 5, kids: 6 };
    $("#catGrid").innerHTML = Object.keys(CATS).map((k) => {
      const p = getP(sample[k]);
      const v = p.variants[0];
      const n = PRODUCTS.filter((x) => x.category === k).length;
      return `<button class="cat spot reveal" style="--acc:${v.accent}" data-cat="${k}">
        <div class="cat-watch">${watchSVG(p, v)}</div>
        <h3>${CATS[k]}</h3><small>${n} watch${n === 1 ? "" : "es"}</small></button>`;
    }).join("");
  }

  /* ============ Shop ============ */
  function getList() {
    let l = PRODUCTS.filter((p) => {
      if (filter === "saved") { if (!wish.includes(p.id)) return false; }
      else if (filter !== "all" && p.category !== filter) return false;
      if (query) {
        const hay = `${p.name} ${p.desc} ${CATS[p.category]} ${p.tags.join(" ")}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }

  function cardHTML(p, i) {
    const vi = pick[p.id] || 0, v = p.variants[vi];
    const off = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
    return `<article class="product spot" style="--acc:${v.accent};animation-delay:${i * 60}ms" data-id="${p.id}">
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
      <button class="wish ${wish.includes(p.id) ? "on" : ""}" data-wish="${p.id}" aria-label="Save to wishlist">${ico("heart")}</button>
      <div class="p-img"><div class="w" data-img>${watchSVG(p, v)}</div><span class="shadow"></span><button class="qv" data-quick="${p.id}">${ico("eye")} Quick view</button></div>
      <div class="p-body">
        <span class="p-cat">${CATS[p.category]}</span>
        <h3>${p.name}</h3>
        <p class="p-desc">${p.desc}</p>
        <ul class="p-tags">${p.tags.map((t) => `<li>${t}</li>`).join("")}</ul>
        <div class="dots" role="group" aria-label="Colours">${p.variants.map((x, k) => `<button class="dot ${k === vi ? "on" : ""}" style="--c:${x.strap}" data-var="${p.id}:${k}" title="${x.name}" aria-label="${x.name}"></button>`).join("")}</div>
        <div class="p-foot"><div class="price">${fmt(p.price)}${p.oldPrice ? `<em>-${off}%</em><s>${fmt(p.oldPrice)}</s>` : ""}</div><button class="add-btn" data-add="${p.id}">${ico("plus")} Add</button></div>
      </div></article>`;
  }

  function renderShop() {
    const list = getList();
    $("#productGrid").innerHTML = list.map(cardHTML).join("");
    $("#emptyState").hidden = list.length > 0;
    $("#resultCount").textContent = list.length ? `Showing ${list.length} of ${PRODUCTS.length} watches` : "";
    $$(".chip").forEach((c) => c.classList.toggle("active", c.dataset.filter === filter));
  }

  function setFilter(f, scroll) {
    filter = f; query = ""; $("#q").value = "";
    renderShop();
    if (scroll) $("#shop").scrollIntoView({ behavior: "smooth" });
  }

  function updateWishUI() {
    const c = $("#wishCount");
    c.textContent = wish.length; c.hidden = wish.length === 0;
    $$("[data-wish]").forEach((b) => b.classList.toggle("on", wish.includes(+b.dataset.wish)));
    store.set("nw-wish", wish);
  }

  /* ============ Quick view ============ */
  const qv = { id: null, v: 0, qty: 1 };
  function renderQV() {
    const p = getP(qv.id), v = p.variants[qv.v];
    const off = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
    $("#qvBody").innerHTML = `
      <div class="qv-visual" style="--acc:${v.accent}"><div class="qv-watch">${watchSVG(p, v)}</div></div>
      <div class="qv-info">
        <span class="p-cat">${CATS[p.category]}</span>
        <h2>${p.name}</h2>
        <div class="price big">${fmt(p.price)}${p.oldPrice ? `<s>${fmt(p.oldPrice)}</s><em>-${off}%</em>` : ""}</div>
        <p class="muted">${p.desc}</p>
        <div class="qv-label">Colour: <b>${v.name}</b></div>
        <div class="dots lg">${p.variants.map((x, k) => `<button class="dot ${k === qv.v ? "on" : ""}" style="--c:${x.strap}" data-qvvar="${k}" title="${x.name}" aria-label="${x.name}"></button>`).join("")}</div>
        <dl class="specs">${Object.entries(p.specs).map(([k, x]) => `<div><dt>${k}</dt><dd>${x}</dd></div>`).join("")}</dl>
        <div class="qv-actions">
          <div class="stepper"><button data-qvqty="-1" aria-label="Less">${ico("minus")}</button><span>${qv.qty}</span><button data-qvqty="1" aria-label="More">${ico("plus")}</button></div>
          <button class="btn primary" data-qvadd>${ico("shopping-bag")} Add to cart</button>
          <button class="btn ghost" data-qvbuy>Buy now</button>
        </div>
        <p class="mini">${ico("truck")} Delivered in 3–5 working days · 1-year warranty</p>
      </div>`;
  }
  function openQuick(id) {
    qv.id = id; qv.v = pick[id] || 0; qv.qty = 1;
    renderQV(); openModal($("#qvModal"));
  }

  /* ============ Cart ============ */
  function totals() {
    const sub = cart.reduce((s, i) => s + getP(i.id).price * i.qty, 0);
    const pct = promo ? STORE.promos[promo] : 0;
    const disc = Math.round((sub * pct) / 100);
    const ship = sub === 0 ? 0 : sub >= STORE.freeShippingOver ? 0 : STORE.shipping;
    return { sub, pct, disc, ship, total: sub - disc + ship, count: cart.reduce((s, i) => s + i.qty, 0) };
  }
  function saveCart() { store.set("nw-cart", cart); store.set("nw-promo", promo); }

  function addToCart(id, v, qty = 1) {
    const f = cart.find((i) => i.id === id && i.v === v);
    if (f) f.qty += qty; else cart.push({ id, v, qty });
    saveCart(); updateCartBadge();
    $("#cartBtn").classList.remove("bump"); void $("#cartBtn").offsetWidth; $("#cartBtn").classList.add("bump");
    renderCart();
  }
  function updateCartBadge() {
    const c = $("#cartCount"); const n = totals().count;
    c.textContent = n; c.hidden = n === 0;
  }

  function renderCart() {
    const t = totals();
    // free shipping progress
    const left = STORE.freeShippingOver - t.sub;
    $("#shipBar").innerHTML = t.sub === 0 ? "" : left > 0
      ? `Add <b>${fmt(left)}</b> more for free delivery<div class="track"><i style="--p:${Math.min(100, (t.sub / STORE.freeShippingOver) * 100)}%"></i></div>`
      : `You've unlocked <b>free delivery</b>!<div class="track"><i style="--p:100%"></i></div>`;

    $("#cartItems").innerHTML = cart.length ? cart.map((it) => {
      const p = getP(it.id), v = p.variants[it.v];
      return `<div class="c-item">
        <div class="c-thumb">${watchSVG(p, v)}</div>
        <div class="c-info"><h4>${p.name}</h4><small>${v.name}</small><div class="price">${fmt(p.price * it.qty)}</div></div>
        <div class="c-side">
          <div class="stepper"><button data-dec="${it.id}:${it.v}" aria-label="Less">${ico("minus")}</button><span>${it.qty}</span><button data-inc="${it.id}:${it.v}" aria-label="More">${ico("plus")}</button></div>
          <button class="c-remove" data-rm="${it.id}:${it.v}">Remove</button>
        </div></div>`;
    }).join("") : `<div class="empty-cart">${ico("shopping-bag")}<h3>Your cart is empty</h3><p>Add a watch to get started.</p><button class="btn ghost" data-close-drawer data-go="shop">Browse watches</button></div>`;

    $("#drawerFoot").innerHTML = cart.length ? `
      <div class="promo-row"><input id="promoInput" placeholder="Promo code" value="${promo || ""}" aria-label="Promo code" /><button class="btn ghost" data-apply-promo>Apply</button></div>
      <div class="promo-msg ${promo ? "ok" : ""}" id="promoMsg">${promo ? `Code ${promo} applied (-${STORE.promos[promo]}%)` : ""}</div>
      <div class="lines">
        <div><span>Subtotal</span><span>${fmt(t.sub)}</span></div>
        ${t.disc ? `<div class="disc"><span>Discount</span><span>-${fmt(t.disc)}</span></div>` : ""}
        <div><span>Delivery</span><span>${t.ship ? fmt(t.ship) : "Free"}</span></div>
        <div class="grand"><span>Total</span><span>${fmt(t.total)}</span></div>
      </div>
      <button class="btn primary full lg" data-checkout>Checkout ${ico("arrow-right")}</button>` : "";
    updateCartBadge();
  }

  function changeQty(key, d) {
    const [id, v] = key.split(":").map(Number);
    const it = cart.find((i) => i.id === id && i.v === v);
    if (!it) return;
    it.qty += d;
    if (it.qty <= 0) cart = cart.filter((i) => i !== it);
    saveCart(); renderCart();
  }
  function removeItem(key) {
    const [id, v] = key.split(":").map(Number);
    cart = cart.filter((i) => !(i.id === id && i.v === v));
    saveCart(); renderCart();
  }
  function applyPromo() {
    const code = ($("#promoInput").value || "").trim().toUpperCase();
    if (!code) { promo = null; saveCart(); return renderCart(); }
    if (STORE.promos[code]) { promo = code; saveCart(); renderCart(); toast(`Code ${code} applied`); }
    else { const m = $("#promoMsg"); m.textContent = "That code isn't valid."; m.className = "promo-msg bad"; }
  }

  /* ============ Checkout ============ */
  const PAY = {
    cod: ["Cash on delivery", "Pay when it arrives"],
    bank: ["Bank transfer", "Details shared on WhatsApp"],
    jazzcash: ["JazzCash", "Details shared on WhatsApp"],
    easypaisa: ["Easypaisa", "Details shared on WhatsApp"]
  };

  function orderLines() {
    return cart.map((i) => { const p = getP(i.id); return { p, v: p.variants[i.v], qty: i.qty }; });
  }

  function openCheckout() {
    if (!cart.length) return toast("Your cart is empty", "shopping-bag");
    closeDrawer();
    const t = totals();
    const saved = store.get("nw-customer", {});
    $("#coBody").innerHTML = `
      <div class="co-grid">
        <div class="co-main">
          <h2>Checkout</h2>
          <form class="co-form" id="coForm">
            <div class="row2">
              <div class="field"><label for="coName">Full name</label><input id="coName" required autocomplete="name" value="${saved.name || ""}" /></div>
              <div class="field"><label for="coPhone">Phone / WhatsApp</label><input id="coPhone" type="tel" required pattern="[0-9+\\s\\-]{10,16}" title="Enter a valid phone number" autocomplete="tel" value="${saved.phone || ""}" /></div>
            </div>
            <div class="row2">
              <div class="field"><label for="coCity">City</label><input id="coCity" required autocomplete="address-level2" value="${saved.city || ""}" /></div>
              <div class="field"><label for="coEmail">Email (optional)</label><input id="coEmail" type="email" autocomplete="email" value="${saved.email || ""}" /></div>
            </div>
            <div class="field"><label for="coAddr">Delivery address</label><textarea id="coAddr" rows="2" required autocomplete="street-address">${saved.addr || ""}</textarea></div>
            <div class="field"><span class="lbl">Payment method</span>
              <div class="pay">${Object.entries(PAY).map(([k, [n, s]], idx) => `<label class="pay-opt"><input type="radio" name="pay" value="${k}" ${idx === 0 ? "checked" : ""}/><span class="pay-box"><b>${n}</b><small>${s}</small></span></label>`).join("")}</div>
            </div>
            <div class="field"><label for="coNote">Order notes (optional)</label><input id="coNote" placeholder="Anything we should know?" /></div>
            <button class="btn primary full lg" type="submit">${ico("message")} Place order on WhatsApp</button>
          </form>
        </div>
        <aside class="co-side">
          <h3>Order summary</h3>
          <div class="co-items">${orderLines().map((l) => `<div class="co-it"><div class="c-thumb">${watchSVG(l.p, l.v)}</div><div><b>${l.p.name}</b><small>${l.v.name} · Qty ${l.qty}</small></div><span>${fmt(l.p.price * l.qty)}</span></div>`).join("")}</div>
          <div class="lines">
            <div><span>Subtotal</span><span>${fmt(t.sub)}</span></div>
            ${t.disc ? `<div class="disc"><span>Discount (${promo})</span><span>-${fmt(t.disc)}</span></div>` : ""}
            <div><span>Delivery</span><span>${t.ship ? fmt(t.ship) : "Free"}</span></div>
            <div class="grand"><span>Total</span><span>${fmt(t.total)}</span></div>
          </div>
          <p class="note">${ico("shield")}<span>Your order is confirmed once you send it on WhatsApp. We reply to confirm delivery and payment details.</span></p>
        </aside>
      </div>`;
    openModal($("#coModal"));
  }

  function waLink(text) { return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`; }

  function submitOrder(e) {
    e.preventDefault();
    const g = (id) => $("#" + id).value.trim();
    const pay = $("input[name=pay]:checked").value;
    const t = totals();
    const oid = "NW" + Math.floor(100000 + Math.random() * 900000);
    store.set("nw-customer", { name: g("coName"), phone: g("coPhone"), city: g("coCity"), email: g("coEmail"), addr: g("coAddr") });
    const lines = orderLines().map((l) => `• ${l.p.name} (${l.v.name}) x${l.qty} — ${fmt(l.p.price * l.qty)}`).join("\n");
    const msg = [
      `*New order ${oid}*`, "",
      `Name: ${g("coName")}`, `Phone: ${g("coPhone")}`, `City: ${g("coCity")}`, `Address: ${g("coAddr")}`,
      g("coEmail") ? `Email: ${g("coEmail")}` : null,
      `Payment: ${PAY[pay][0]}`,
      g("coNote") ? `Notes: ${g("coNote")}` : null, "",
      "*Items*", lines, "",
      `Subtotal: ${fmt(t.sub)}`,
      t.disc ? `Discount (${promo}): -${fmt(t.disc)}` : null,
      `Delivery: ${t.ship ? fmt(t.ship) : "Free"}`,
      `*Total: ${fmt(t.total)}*`
    ].filter((x) => x !== null).join("\n");
    const url = waLink(msg);

    cart = []; promo = null; saveCart(); renderCart();
    $("#coBody").innerHTML = `<div class="success">
      <div class="ok">${ico("check")}</div>
      <h2>Almost done!</h2>
      <p class="muted">Send your order on WhatsApp so we can confirm it. If WhatsApp didn't open, tap the button below.</p>
      <div class="oid">${oid}</div>
      <a class="btn primary lg" href="${url}" target="_blank" rel="noopener">${ico("message")} Send order on WhatsApp</a>
      <button class="btn ghost" data-close-modal>Continue shopping</button></div>`;
    window.open(url, "_blank", "noopener");
  }

  /* ============ Compare table ============ */
  function renderCompare() {
    const cols = [4, 1, 5].map(getP);
    const keys = Object.keys(cols[0].specs);
    const head = cols.map((p, i) => `<th class="${i === 1 ? "hl" : ""}"><div class="cmp-head"><div class="w">${watchSVG(p, p.variants[0])}</div><b>${p.name.replace("NEXWATCH ", "")}</b>${i === 1 ? '<span class="tag">MOST POPULAR</span>' : ""}</div></th>`).join("");
    const rows = [`<tr><th>Price</th>${cols.map((p, i) => `<td class="${i === 1 ? "hl" : ""}"><b>${fmt(p.price)}</b></td>`).join("")}</tr>`]
      .concat(keys.map((k) => `<tr><th>${k}</th>${cols.map((p, i) => `<td class="${i === 1 ? "hl" : ""}">${p.specs[k]}</td>`).join("")}</tr>`))
      .concat(`<tr><th></th>${cols.map((p, i) => `<td class="${i === 1 ? "hl" : ""}"><button class="btn ${i === 1 ? "primary" : "ghost"}" data-add="${p.id}">Add to cart</button></td>`).join("")}</tr>`);
    $("#compareTable").innerHTML = `<table class="cmp"><thead><tr><th></th>${head}</tr></thead><tbody>${rows.join("")}</tbody></table>`;
  }

  /* ============ Hero ============ */
  function renderHero(vi = 0) {
    const p = getP(1), v = p.variants[vi];
    $("#heroWatch").innerHTML = watchSVG(p, v);
    $("#heroStage").style.setProperty("--acc", v.accent);
    $("#heroSwatches").innerHTML = p.variants.map((x, k) => `<button class="swatch ${k === vi ? "on" : ""}" style="--c:${x.strap}" data-hero="${k}" title="${x.name}" aria-label="${x.name}"></button>`).join("");
  }

  /* ============ Events ============ */
  document.addEventListener("click", (e) => {
    const t = e.target;
    let el;

    if ((el = t.closest("[data-hero]"))) return renderHero(+el.dataset.hero);
    if ((el = t.closest("[data-wish]"))) {
      const id = +el.dataset.wish;
      wish = wish.includes(id) ? wish.filter((x) => x !== id) : [...wish, id];
      updateWishUI();
      if (filter === "saved") renderShop();
      return toast(wish.includes(id) ? "Saved to your list" : "Removed from saved", "heart");
    }
    if ((el = t.closest("[data-var]"))) {
      const [id, k] = el.dataset.var.split(":").map(Number);
      pick[id] = k;
      const card = el.closest(".product"), p = getP(id), v = p.variants[k];
      $("[data-img]", card).innerHTML = watchSVG(p, v);
      card.style.setProperty("--acc", v.accent);
      $$(".dot", card).forEach((d, i) => d.classList.toggle("on", i === k));
      return;
    }
    if ((el = t.closest("[data-quick]"))) return openQuick(+el.dataset.quick);
    if ((el = t.closest("[data-add]"))) {
      const id = +el.dataset.add;
      addToCart(id, pick[id] || 0, 1);
      return toast(`${getP(id).name} added to cart`, "shopping-bag");
    }
    if ((el = t.closest("[data-qvvar]"))) { qv.v = +el.dataset.qvvar; pick[qv.id] = qv.v; return renderQV(); }
    if ((el = t.closest("[data-qvqty]"))) { qv.qty = Math.max(1, Math.min(10, qv.qty + +el.dataset.qvqty)); return renderQV(); }
    if (t.closest("[data-qvadd]")) {
      addToCart(qv.id, qv.v, qv.qty); closeModals();
      toast(`${getP(qv.id).name} added to cart`, "shopping-bag"); return renderShop();
    }
    if (t.closest("[data-qvbuy]")) { addToCart(qv.id, qv.v, qv.qty); closeModals(); return openCheckout(); }
    if ((el = t.closest("[data-inc]"))) return changeQty(el.dataset.inc, 1);
    if ((el = t.closest("[data-dec]"))) return changeQty(el.dataset.dec, -1);
    if ((el = t.closest("[data-rm]"))) return removeItem(el.dataset.rm);
    if (t.closest("[data-apply-promo]")) return applyPromo();
    if (t.closest("[data-checkout]")) return openCheckout();
    if ((el = t.closest("[data-cat]"))) return setFilter(el.dataset.cat, true);
    if ((el = t.closest("[data-go-cat]"))) { e.preventDefault(); return setFilter(el.dataset.goCat, true); }
    if (t.closest("[data-buy-spot]")) return openQuick(1);
    if ((el = t.closest("[data-copy]"))) {
      const code = el.dataset.copy;
      const done = () => toast(`Code ${code} copied`);
      if (navigator.clipboard) navigator.clipboard.writeText(code).then(done, () => toast(`Your code: ${code}`));
      else toast(`Your code: ${code}`);
      return;
    }
    if (t.closest("[data-close-drawer]")) { closeDrawer(); const g = t.closest("[data-go]"); if (g) $("#" + g.dataset.go).scrollIntoView({ behavior: "smooth" }); return; }
    if (t.closest("[data-close-modal]")) return closeModals();
    if (t === $("#qvModal") || t === $("#coModal")) return closeModals();
  });

  document.addEventListener("submit", (e) => {
    if (e.target.id === "coForm") return submitOrder(e);
    if (e.target.id === "contactForm") {
      e.preventDefault();
      const msg = `Hi ${STORE.name}, I'm ${$("#cName").value} (${$("#cEmail").value}).\n\n${$("#cMsg").value}`;
      window.open(waLink(msg), "_blank", "noopener");
      e.target.reset();
      toast("Opening WhatsApp…", "message");
    }
  });

  $("#cartBtn").addEventListener("click", openDrawer);
  $("#overlay").addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeModals(); closeDrawer(); closeMenu(); } });
  document.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.id === "promoInput") { e.preventDefault(); applyPromo(); } });

  $("#filters").addEventListener("click", (e) => { const c = e.target.closest(".chip"); if (c) { filter = c.dataset.filter; renderShop(); } });
  $("#sort").addEventListener("change", (e) => { sort = e.target.value; renderShop(); });
  $("#q").addEventListener("input", (e) => { query = e.target.value.trim().toLowerCase(); if (query) filter = "all"; renderShop(); });
  $("#resetFilters").addEventListener("click", () => { sort = "featured"; $("#sort").value = "featured"; setFilter("all", false); });
  $("#searchBtn").addEventListener("click", () => { closeMenu(); $("#shop").scrollIntoView({ behavior: "smooth" }); setTimeout(() => $("#q").focus({ preventScroll: true }), 500); });
  $("#wishBtn").addEventListener("click", () => { setFilter("saved", true); if (!wish.length) toast("Tap the heart on a watch to save it", "heart"); });
  $("#burger").addEventListener("click", () => { $("#mobileMenu").classList.toggle("open"); syncLock(); });
  $$("#mobileMenu a").forEach((a) => a.addEventListener("click", closeMenu));
  $("#toTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ============ Page effects ============ */
  const nav = $("#nav"), bar = $("#progress"), top = $("#toTop");
  function onScroll() {
    const y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle("scrolled", y > 20);
    bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    top.classList.toggle("show", y > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  // hero tilt (desktop)
  const stage = $("#heroStage"), hw = $("#heroWatch");
  if (matchMedia("(hover: hover)").matches) {
    stage.addEventListener("mousemove", (e) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      hw.style.transform = `perspective(900px) rotateY(${x * 24}deg) rotateX(${-y * 18}deg)`;
    });
    stage.addEventListener("mouseleave", () => (hw.style.transform = ""));
  }

  // spotlight glow
  document.addEventListener("pointermove", (e) => {
    const s = e.target.closest && e.target.closest(".spot");
    if (!s) return;
    const r = s.getBoundingClientRect();
    s.style.setProperty("--mx", e.clientX - r.left + "px");
    s.style.setProperty("--my", e.clientY - r.top + "px");
  });

  // live watch faces
  setInterval(() => {
    $$(".js-time").forEach((n) => (n.textContent = nowTime()));
    $$(".js-date").forEach((n) => (n.textContent = nowDate()));
  }, 15000);
  setInterval(() => { $("#bpm").textContent = 68 + Math.floor(Math.random() * 9); }, 1800);

  function countUp(el) {
    const target = +el.dataset.count, start = performance.now();
    (function step(now) {
      const p = Math.min((now - start) / 1400, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }
  function observeReveals() {
    const els = $$(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) return els.forEach((n) => n.classList.add("in"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        $$("[data-count]", en.target).forEach(countUp);
        io.unobserve(en.target);
      });
    }, { threshold: 0.12 });
    els.forEach((n) => io.observe(n));
  }

  // active nav link
  function scrollSpy() {
    if (!("IntersectionObserver" in window)) return;
    const links = $$(".nav-links a");
    const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting && map.has(en.target.id)) {
          links.forEach((l) => l.classList.remove("active"));
          map.get(en.target.id).classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ============ Init ============ */
  $$("[data-store]").forEach((el) => { el.textContent = STORE[el.dataset.store] || ""; });
  $$("[data-wa]").forEach((a) => { a.href = `https://wa.me/${STORE.whatsapp}`; });
  $$("[data-tel]").forEach((a) => { a.href = "tel:" + STORE.phone.replace(/[^\d+]/g, ""); });
  $$("[data-mail]").forEach((a) => { a.href = "mailto:" + STORE.email; });
  $$("[data-social]").forEach((a) => { a.href = STORE.social[a.dataset.social] || "#"; });
  $("#year").textContent = new Date().getFullYear();

  hydrateIcons();
  renderHero(0);
  $("#spotWatch").innerHTML = watchSVG(getP(1), getP(1).variants[2]);
  renderCats();
  renderShop();
  renderCompare();
  renderCart();
  updateWishUI();
  observeReveals();
  scrollSpy();
  onScroll();
})();
