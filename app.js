/* Farm Desk — static SA farm ops demo
   Plaas Sonder Naam · Free State / Highveld · localStorage · ZAR
   NOT veterinary / legal / tax / financial / agronomist advice */

(function () {
  "use strict";

  const STORAGE_KEY = "farm-desk-v1";
  const TZ = "Africa/Johannesburg";

  function seed() {
    const today = startOfDay(new Date());
    return {
      farm: {
        name: "Plaas Sonder Naam",
        region: "Free State · Highveld",
        hectares: 420,
        grazingHa: 280,
      },
      fields: [
        { id: "f1", name: "Kamp Noord", ha: 45, crop: "Maize", status: "vegetative" },
        { id: "f2", name: "Kamp Suid", ha: 38, crop: "Sunflower", status: "planted" },
        { id: "f3", name: "Kamp Oos", ha: 52, crop: "Soybean", status: "prep" },
        { id: "f4", name: "Weiding A", ha: 90, crop: "Natural veld", status: "grazing" },
        { id: "f5", name: "Weiding B", ha: 70, crop: "Natural veld", status: "resting" },
        { id: "f6", name: "Lusern kamp", ha: 25, crop: "Lucerne", status: "cutting" },
      ],
      planner: [
        { id: "p1", what: "Plant soybean", where: "Kamp Oos", when: isoDate(addDays(today, 12)), window: "Oct–Nov Highveld" },
        { id: "p2", what: "Side-dress maize N", where: "Kamp Noord", when: isoDate(addDays(today, 5)), window: "V6–V8 reminder" },
        { id: "p3", what: "Sunflower scout", where: "Kamp Suid", when: isoDate(addDays(today, 2)), window: "Post-emergence" },
        { id: "p4", what: "Lucerne cut 2", where: "Lusern kamp", when: isoDate(addDays(today, 18)), window: "Growth stage" },
      ],
      fertReminders: [
        { id: "fr1", crop: "Maize", field: "Kamp Noord", label: "Top-dress N window", dueAt: isoDate(addDays(today, 5)), done: false },
        { id: "fr2", crop: "Soybean", field: "Kamp Oos", label: "Basal at plant (reminder)", dueAt: isoDate(addDays(today, 12)), done: false },
        { id: "fr3", crop: "Lucerne", field: "Lusern kamp", label: "Post-cut K reminder", dueAt: isoDate(addDays(today, 20)), done: false },
      ],
      soilLogs: [
        { id: "sl1", fieldId: "f1", fieldName: "Kamp Noord", moisture: "Adequate", note: "Good tilth after weekend rain", at: isoDate(addDays(today, -3)) },
        { id: "sl2", fieldId: "f2", fieldName: "Kamp Suid", moisture: "Slightly dry topsoil", note: "Monitor until next shower", at: isoDate(addDays(today, -1)) },
      ],
      livestock: [
        { id: "l1", species: "cattle", label: "Cattle (beeste)", head: 86, unit: "LSU≈1.0", kamp: "Weiding A" },
        { id: "l2", species: "sheep", label: "Sheep (skape)", head: 240, unit: "LSU≈0.15", kamp: "Weiding B" },
        { id: "l3", species: "pigs", label: "Pigs (varkens)", head: 48, unit: "sty", kamp: "Varkhuis" },
        { id: "l4", species: "chickens", label: "Chickens (hoenders)", head: 320, unit: "birds", kamp: "Hoenderhuis" },
        { id: "l5", species: "wildlife", label: "Wildlife / game", head: 22, unit: "heads", kamp: "Game camp" },
      ],
      stockingRates: {
        cattle: 0.25,
        sheep: 1.5,
        mixed_veld: 0.3,
        wildlife: 0.2,
      },
      grazing: [
        { id: "g1", kamp: "Weiding A", herd: "Cattle", daysIn: 12, nextMove: isoDate(addDays(today, 3)), status: "active" },
        { id: "g2", kamp: "Weiding B", herd: "Sheep", daysIn: 8, nextMove: isoDate(addDays(today, 6)), status: "active" },
        { id: "g3", kamp: "Kamp Noord margin", herd: "Rest", daysIn: 21, nextMove: isoDate(addDays(today, 14)), status: "resting" },
      ],
      feed: [
        { id: "fd1", name: "Cattle lick (bag)", qty: 42, unit: "bags", reorder: 20 },
        { id: "fd2", name: "Sheep pellets", qty: 18, unit: "bags", reorder: 15 },
        { id: "fd3", name: "Layer mash", qty: 8, unit: "bags", reorder: 12 },
        { id: "fd4", name: "Pig grower", qty: 25, unit: "bags", reorder: 10 },
        { id: "fd5", name: "Lucerne bales", qty: 60, unit: "bales", reorder: 30 },
      ],
      injections: [
        { id: "inj1", species: "cattle", label: "Cattle — annual booster reminder", dueAt: isoDate(addDays(today, 4)), given: false, product: "" },
        { id: "inj2", species: "sheep", label: "Sheep — seasonal parasite reminder", dueAt: isoDate(addDays(today, 1)), given: false, product: "" },
        { id: "inj3", species: "chickens", label: "Poultry — flock vaccine reminder", dueAt: isoDate(addDays(today, 14)), given: false, product: "" },
        { id: "inj4", species: "pigs", label: "Pigs — herd health schedule reminder", dueAt: isoDate(addDays(today, -2)), given: false, product: "" },
        { id: "inj5", species: "cattle", label: "Calves — branding-day health check reminder", dueAt: isoDate(addDays(today, 28)), given: false, product: "" },
      ],
      treatmentLog: [
        { id: "tl1", injectId: "inj0", label: "Cattle — tick control reminder", product: "User-entered brand A", note: "Camp A group", at: isoDate(addDays(today, -20)) },
      ],
      stock: [
        { id: "s1", name: "Fence droppers", qty: 120, unit: "pcs", reorder: 50, cat: "Infra" },
        { id: "s2", name: "Diesel (farm tank)", qty: 380, unit: "L", reorder: 200, cat: "Fuel" },
        { id: "s3", name: "Seed maize (bags)", qty: 6, unit: "bags", reorder: 4, cat: "Crop" },
        { id: "s4", name: "Gloves / PPE", qty: 14, unit: "pairs", reorder: 10, cat: "PPE" },
        { id: "s5", name: "Water trough floats", qty: 3, unit: "pcs", reorder: 4, cat: "Infra" },
      ],
      purchases: [
        { id: "pu1", item: "Diesel bulk", amount: 8500, at: isoDate(addDays(today, -6)), supplier: "Local depot" },
        { id: "pu2", item: "Layer mash", amount: 2400, at: isoDate(addDays(today, -2)), supplier: "Feed co-op" },
        { id: "pu3", item: "Fence wire", amount: 1850, at: isoDate(addDays(today, -15)), supplier: "Farm chandlery" },
      ],
      monitoring: [
        { id: "m1", area: "crop", note: "Maize leaf colour OK after rain — Kamp Noord", at: isoDate(addDays(today, -2)), photo: true },
        { id: "m2", area: "livestock", note: "Two ewes lagging — watch / call vet if worsens", at: isoDate(addDays(today, -1)), photo: true },
      ],
      infra: [
        { id: "i1", name: "West boundary fence", type: "Fence", condition: "Fair" },
        { id: "i2", name: "Dam windpomp", type: "Pump", condition: "Good" },
        { id: "i3", name: "Bakkie FS demo", type: "Vehicle", condition: "Good" },
        { id: "i4", name: "Implement shed", type: "Shed", condition: "Fair" },
        { id: "i5", name: "Borehole pump E", type: "Pump", condition: "Needs check" },
      ],
      repairs: [
        { id: "r1", assetId: "i1", asset: "West boundary fence", issue: "Three droppers down near gate", status: "open", at: isoDate(addDays(today, -1)) },
        { id: "r2", assetId: "i5", asset: "Borehole pump E", issue: "Intermittent start — electrician?", status: "open", at: isoDate(addDays(today, -4)) },
        { id: "r3", assetId: "i4", asset: "Implement shed", issue: "Roof sheet loose", status: "done", at: isoDate(addDays(today, -30)) },
      ],
      income: [
        { id: "in1", label: "Cattle sale (lot)", amount: 185000, at: isoDate(addDays(today, -12)) },
        { id: "in2", label: "Egg sales (month)", amount: 9200, at: isoDate(addDays(today, -3)) },
        { id: "in3", label: "Lucerne bales sold", amount: 24000, at: isoDate(addDays(today, -8)) },
      ],
      expenses: [
        { id: "ex1", label: "Feed & lick", amount: 18600, at: isoDate(addDays(today, -5)) },
        { id: "ex2", label: "Diesel", amount: 8500, at: isoDate(addDays(today, -6)) },
        { id: "ex3", label: "Wages (skof)", amount: 42000, at: isoDate(addDays(today, -2)) },
        { id: "ex4", label: "Repairs & parts", amount: 3100, at: isoDate(addDays(today, -10)) },
      ],
      buying: [
        { id: "by1", item: "New trough floats", est: 450, priority: "high" },
        { id: "by2", item: "Sheep pellets restock", est: 3200, priority: "medium" },
        { id: "by3", item: "Shed roof sheets", est: 2800, priority: "medium" },
      ],
      cashOverview: 126400,
      contacts: [
        { id: "c1", name: "Dr. Naidoo (Vet)", type: "vet", phone: "051 000 0001", note: "Large animal · sample" },
        { id: "c2", name: "Highveld Feed Co-op", type: "supplier", phone: "051 000 0002", note: "Feed & lick" },
        { id: "c3", name: "Free State Labour Broker", type: "broker", phone: "051 000 0003", note: "Seasonal labour" },
        { id: "c4", name: "Abattoir buyer — demo", type: "buyer", phone: "051 000 0004", note: "Cattle lots" },
        { id: "c5", name: "Seed merchant FS", type: "supplier", phone: "051 000 0005", note: "Maize / soya seed" },
        { id: "c6", name: "Game meat buyer", type: "buyer", phone: "051 000 0006", note: "Seasonal" },
      ],
      legalRenewals: [
        { id: "lr1", label: "Water-use registration check", dueAt: isoDate(addDays(today, 45)), status: "open" },
        { id: "lr2", label: "Vehicle licence discs (farm fleet)", dueAt: isoDate(addDays(today, 22)), status: "open" },
        { id: "lr3", label: "Firebreak / readiness review", dueAt: isoDate(addDays(today, 60)), status: "open" },
      ],
      legalChecks: [
        { id: "lc1", text: "Keep worker contracts & IDs on file", done: true },
        { id: "lc2", text: "POPIA: minimise personal data on shared devices", done: true },
        { id: "lc3", text: "Confirm current livestock movement / brand rules with authority", done: false },
        { id: "lc4", text: "Review insurance schedule after asset changes", done: false },
      ],
      workers: [
        { id: "w1", name: "Jaco van Wyk", role: "Foreman", skof: "Day", wage: 8500 },
        { id: "w2", name: "Lerato Molefe", role: "Livestock hand", skof: "Day", wage: 5200 },
        { id: "w3", name: "Pieter Smit", role: "Tractor / implements", skof: "Day", wage: 6100 },
        { id: "w4", name: "Nomsa Dlamini", role: "Poultry", skof: "Morning", wage: 4800 },
      ],
      skofLog: [
        { id: "sk1", worker: "Jaco van Wyk", action: "in", at: isoDate(today) + " 06:05" },
        { id: "sk2", worker: "Lerato Molefe", action: "in", at: isoDate(today) + " 06:12" },
      ],
      leave: [
        { id: "lv1", worker: "Pieter Smit", from: isoDate(addDays(today, 10)), to: isoDate(addDays(today, 12)), status: "pending" },
        { id: "lv2", worker: "Nomsa Dlamini", from: isoDate(addDays(today, -5)), to: isoDate(addDays(today, -3)), status: "approved" },
      ],
      payrollApproved: false,
      todos: [
        { id: "td1", text: "Move cattle to next kamp", source: "auto", done: false, due: isoDate(addDays(today, 3)) },
        { id: "td2", text: "Sheep inject reminder due", source: "auto", done: false, due: isoDate(addDays(today, 1)) },
        { id: "td3", text: "Fix west fence droppers", source: "auto", done: false, due: isoDate(today) },
        { id: "td4", text: "Order trough floats", source: "manual", done: false, due: isoDate(addDays(today, 7)) },
      ],
      contactFilter: "all",
    };
  }

  /* ── date helpers ── */
  function startOfDay(d) {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  }
  function addDays(d, n) {
    const x = new Date(d);
    x.setDate(x.getDate() + n);
    return x;
  }
  function isoDate(d) {
    const x = new Date(d);
    const y = x.getFullYear();
    const m = String(x.getMonth() + 1).padStart(2, "0");
    const day = String(x.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  function parseISO(s) {
    const [y, m, d] = String(s).split("T")[0].split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  function daysUntil(iso) {
    const a = startOfDay(new Date());
    const b = startOfDay(parseISO(iso));
    return Math.round((b - a) / 86400000);
  }
  function fmtDate(iso) {
    try {
      return parseISO(iso).toLocaleDateString("en-ZA", {
        timeZone: TZ,
        weekday: "short",
        day: "numeric",
        month: "short",
      });
    } catch {
      return iso;
    }
  }
  function fmtMoney(n) {
    return "R" + Number(n).toLocaleString("en-ZA");
  }
  function todayLabel() {
    return new Date().toLocaleDateString("en-ZA", {
      timeZone: TZ,
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }
  function uid(prefix) {
    return prefix + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  /* ── state ── */
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return seed();
      return JSON.parse(raw);
    } catch {
      return seed();
    }
  }
  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  let state = load();
  let currentView = "home";
  let cropsTab = "fields";
  let animalsTab = "herd";

  /* ── queue / alerts ── */
  function buildQueue() {
    const items = [];
    state.planner.forEach((p) => {
      const d = daysUntil(p.when);
      if (d <= 14) {
        items.push({
          id: "q-plant-" + p.id,
          title: p.what,
          meta: p.where + " · " + fmtDate(p.when),
          severity: d <= 2 ? "red" : d <= 7 ? "amber" : "green",
          due: d,
          action: "crops",
          icon: "🌾",
        });
      }
    });
    state.fertReminders.filter((f) => !f.done).forEach((f) => {
      const d = daysUntil(f.dueAt);
      if (d <= 14) {
        items.push({
          id: "q-fert-" + f.id,
          title: "Fertilise: " + f.label,
          meta: f.field + " · " + fmtDate(f.dueAt),
          severity: d <= 3 ? "amber" : "green",
          due: d,
          action: "crops",
          icon: "🪴",
        });
      }
    });
    state.grazing.filter((g) => g.status === "active").forEach((g) => {
      const d = daysUntil(g.nextMove);
      if (d <= 7) {
        items.push({
          id: "q-graze-" + g.id,
          title: "Graze move — " + g.kamp,
          meta: g.herd + " · " + fmtDate(g.nextMove),
          severity: d <= 1 ? "red" : "amber",
          due: d,
          action: "animals",
          icon: "🐄",
        });
      }
    });
    state.injections.filter((i) => !i.given).forEach((i) => {
      const d = daysUntil(i.dueAt);
      if (d <= 14) {
        items.push({
          id: "q-inj-" + i.id,
          title: "Inject reminder: " + i.label,
          meta: "Due " + fmtDate(i.dueAt) + " · no dosage — confirm with vet",
          severity: d < 0 ? "red" : d <= 3 ? "amber" : "green",
          due: d,
          action: "animals",
          icon: "💉",
        });
      }
    });
    state.repairs.filter((r) => r.status === "open").forEach((r) => {
      items.push({
        id: "q-rep-" + r.id,
        title: "Repair: " + r.asset,
        meta: r.issue,
        severity: "amber",
        due: daysUntil(r.at),
        action: "infra",
        icon: "🔧",
      });
    });
    if (!state.payrollApproved) {
      items.push({
        id: "q-hr",
        title: "HR — Approve payroll",
        meta: state.workers.length + " people · skof wages",
        severity: "amber",
        due: 2,
        action: "hr",
        icon: "👥",
      });
    }
    state.todos.filter((t) => !t.done).forEach((t) => {
      const d = daysUntil(t.due);
      if (d <= 5) {
        items.push({
          id: "q-td-" + t.id,
          title: t.text,
          meta: (t.source === "auto" ? "Auto · " : "") + fmtDate(t.due),
          severity: d <= 0 ? "red" : "amber",
          due: d,
          action: "todo",
          icon: "✓",
        });
      }
    });
    items.sort((a, b) => a.due - b.due || a.title.localeCompare(b.title));
    return items;
  }

  function buildAlerts() {
    const alerts = [];
    const lowFeed = state.feed.filter((f) => f.qty <= f.reorder);
    lowFeed.forEach((f) => {
      alerts.push({ title: "Feed low: " + f.name, meta: f.qty + " " + f.unit + " ≤ reorder " + f.reorder, sev: "amber", action: "animals" });
    });
    const lowStock = state.stock.filter((s) => s.qty <= s.reorder);
    lowStock.forEach((s) => {
      alerts.push({ title: "Stock reorder: " + s.name, meta: s.qty + " " + s.unit, sev: "amber", action: "stock" });
    });
    const overdueInj = state.injections.filter((i) => !i.given && daysUntil(i.dueAt) < 0);
    overdueInj.forEach((i) => {
      alerts.push({ title: "Overdue inject reminder", meta: i.label, sev: "red", action: "animals" });
    });
    alerts.push({ title: "Frost risk window (sample)", meta: "Highveld late winter / early spring — watch tender crops", sev: "info", action: "weather" });
    return alerts;
  }

  /* ── UI helpers ── */
  function $(sel) {
    return document.querySelector(sel);
  }
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("show"), 2200);
  }
  function openModal(title, html) {
    $("#modal-title").textContent = title;
    $("#modal-body").innerHTML = html;
    $("#modal").classList.add("open");
    $("#modal").setAttribute("aria-hidden", "false");
  }
  function closeModal() {
    $("#modal").classList.remove("open");
    $("#modal").setAttribute("aria-hidden", "true");
  }

  function showView(name) {
    currentView = name;
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    const el = document.getElementById("view-" + name);
    if (el) el.classList.add("active");
    document.querySelectorAll("#bottom-nav button").forEach((b) => {
      b.classList.toggle("active", b.getAttribute("data-nav") === name || (name !== "home" && name !== "crops" && name !== "animals" && name !== "money" && name !== "more" && b.getAttribute("data-nav") === "more" && ["weather","stock","monitor","infra","admin","contacts","legal","hr","todo","settings"].includes(name)));
    });
    // Primary tabs only highlight exact match
    document.querySelectorAll("#bottom-nav button").forEach((b) => {
      const nav = b.getAttribute("data-nav");
      const primary = ["home", "crops", "animals", "money", "more"];
      if (primary.includes(name)) {
        b.classList.toggle("active", nav === name);
      } else {
        b.classList.toggle("active", nav === "more");
      }
    });
    render();
    window.scrollTo(0, 0);
  }

  function rowHTML(opts) {
    const sev = opts.severity ? " sev-" + opts.severity : "";
    const done = opts.done ? " done" : "";
    return (
      '<div class="row' + sev + done + '"' + (opts.action ? ' data-goto="' + opts.action + '"' : "") + ">" +
      (opts.icon ? '<div class="row-icon">' + opts.icon + "</div>" : "") +
      '<div class="row-body"><div class="row-title">' +
      escapeHtml(opts.title) +
      '</div><div class="row-meta">' +
      escapeHtml(opts.meta || "") +
      "</div></div>" +
      '<div class="row-right">' +
      (opts.right || "") +
      (opts.btn || "") +
      "</div></div>"
    );
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ── renders ── */
  function renderHome() {
    $("#today-date").textContent = todayLabel();
    const q = buildQueue();
    $("#today-count").innerHTML = '<span class="dot"></span> ' + q.length + " due";
    $("#today-queue").innerHTML =
      q.length === 0
        ? '<div class="empty">Nothing urgent — lekker.</div>'
        : q
            .slice(0, 10)
            .map((item) =>
              rowHTML({
                icon: item.icon,
                title: item.title,
                meta: item.meta,
                severity: item.severity,
                action: item.action,
                right: '<span class="badge ' + (item.severity === "red" ? "danger" : item.severity === "amber" ? "warn" : "ok") + '">' + (item.due < 0 ? "overdue" : item.due === 0 ? "today" : item.due + "d") + "</span>",
              })
            )
            .join("");

    $("#weather-snap").innerHTML = [
      { t: "Rainfall", m: "Summer peak season", icon: "🌧" },
      { t: "Frost risk", m: "Late winter sample", icon: "❄" },
      { t: "Heat", m: "Highveld midday", icon: "☀" },
    ]
      .map(
        (w) =>
          '<div class="card kpi weather-card"><div class="w-title">' +
          w.icon +
          " " +
          w.t +
          '</div><div class="w-meta">' +
          w.m +
          "</div></div>"
      )
      .join("");

    const alerts = buildAlerts();
    $("#alerts-badge").textContent = alerts.length + "";
    $("#alerts-badge").className = "badge " + (alerts.some((a) => a.sev === "red") ? "danger" : "warn");
    $("#alerts-list").innerHTML = alerts
      .map((a) =>
        rowHTML({
          icon: a.sev === "red" ? "⚠" : a.sev === "info" ? "ℹ" : "!",
          title: a.title,
          meta: a.meta,
          severity: a.sev === "info" ? "teal" : a.sev,
          action: a.action,
        })
      )
      .join("");
  }

  function renderCrops() {
    document.querySelectorAll("#crops-tabs .tab").forEach((t) => t.classList.toggle("active", t.getAttribute("data-ctab") === cropsTab));
    ["fields", "planner", "fert", "soil"].forEach((p) => {
      const el = document.getElementById("crops-panel-" + p);
      if (el) el.classList.toggle("hidden", p !== cropsTab);
    });

    const totalHa = state.fields.reduce((s, f) => s + f.ha, 0);
    $("#fields-ha").textContent = totalHa + " ha";
    $("#fields-list").innerHTML = state.fields
      .map((f) =>
        rowHTML({
          icon: f.crop.includes("veld") || f.crop.includes("Lucerne") ? "🌿" : "🌾",
          title: f.name,
          meta: f.ha + " ha · " + f.crop + " · " + f.status,
          right: '<span class="badge teal">' + f.status + "</span>",
        })
      )
      .join("");

    $("#planner-list").innerHTML = state.planner
      .map((p) => {
        const d = daysUntil(p.when);
        return rowHTML({
          icon: "📅",
          title: p.what,
          meta: p.where + " · " + p.window + " · " + fmtDate(p.when),
          severity: d <= 3 ? "amber" : "green",
          right: '<span class="badge">' + (d < 0 ? "past" : d + "d") + "</span>",
        });
      })
      .join("");

    $("#fert-list").innerHTML = state.fertReminders
      .map((f) =>
        rowHTML({
          icon: "🪴",
          title: f.label,
          meta: f.crop + " · " + f.field + " · " + fmtDate(f.dueAt),
          done: f.done,
          btn: f.done
            ? '<span class="badge ok">done</span>'
            : '<button type="button" class="btn btn-sm btn-ghost" data-fert-done="' + f.id + '">Done</button>',
        })
      )
      .join("");

    const sel = $("#soil-field");
    sel.innerHTML = state.fields.map((f) => '<option value="' + f.id + '">' + escapeHtml(f.name) + "</option>").join("");
    $("#soil-logs").innerHTML =
      state.soilLogs.length === 0
        ? '<div class="empty">No soil logs yet</div>'
        : state.soilLogs
            .slice()
            .reverse()
            .map((l) =>
              rowHTML({
                icon: "🪴",
                title: l.fieldName,
                meta: l.moisture + " · " + l.note + " · " + fmtDate(l.at),
              })
            )
            .join("");
  }

  function renderAnimals() {
    document.querySelectorAll("#animals-tabs .tab").forEach((t) => t.classList.toggle("active", t.getAttribute("data-atab") === animalsTab));
    ["herd", "capacity", "graze", "feed", "inject"].forEach((p) => {
      const el = document.getElementById("animals-panel-" + p);
      if (el) el.classList.toggle("hidden", p !== animalsTab);
    });

    const totalHead = state.livestock.reduce((s, l) => s + l.head, 0);
    $("#herd-kpis").innerHTML =
      '<div class="card kpi"><div class="stat-value teal">' +
      totalHead +
      '</div><div class="stat-label">Total head</div></div>' +
      '<div class="card kpi"><div class="stat-value green">' +
      state.livestock.length +
      '</div><div class="stat-label">Species groups</div></div>';

    $("#herd-list").innerHTML = state.livestock
      .map((l) =>
        rowHTML({
          icon: speciesIcon(l.species),
          title: l.label,
          meta: l.head + " head · " + l.kamp + " · " + l.unit,
          right: '<span class="badge teal">' + l.head + "</span>",
        })
      )
      .join("");

    // Capacity
    const capHa = $("#cap-ha");
    const capSpecies = $("#cap-species");
    const capRate = $("#cap-rate");
    if (!capSpecies.options.length) {
      capSpecies.innerHTML =
        '<option value="cattle">Cattle (LSU)</option>' +
        '<option value="sheep">Sheep (as LSU equiv table)</option>' +
        '<option value="mixed_veld">Mixed veld</option>' +
        '<option value="wildlife">Wildlife / game</option>';
    }
    if (!capHa.value) capHa.value = state.farm.grazingHa;
    const sp = capSpecies.value || "cattle";
    if (!capRate.dataset.touched) capRate.value = state.stockingRates[sp];
    updateCapacity();

    $("#rate-table").innerHTML = Object.keys(state.stockingRates)
      .map((k) =>
        rowHTML({
          icon: "📐",
          title: k.replace("_", " "),
          meta: "Sample LSU/ha (adjustable)",
          right: '<span class="badge muted">' + state.stockingRates[k] + "</span>",
        })
      )
      .join("");

    $("#graze-list").innerHTML = state.grazing
      .map((g) =>
        rowHTML({
          icon: "🔄",
          title: g.kamp,
          meta: g.herd + " · " + g.daysIn + " days in · next " + fmtDate(g.nextMove),
          right: '<span class="badge ' + (g.status === "active" ? "teal" : "muted") + '">' + g.status + "</span>",
        })
      )
      .join("");

    $("#feed-list").innerHTML = state.feed
      .map((f) => {
        const low = f.qty <= f.reorder;
        return rowHTML({
          icon: "📦",
          title: f.name,
          meta: f.qty + " " + f.unit + " · reorder @ " + f.reorder,
          severity: low ? "amber" : "green",
          right: low ? '<span class="badge warn">reorder</span>' : '<span class="badge ok">ok</span>',
        });
      })
      .join("");

    $("#inject-list").innerHTML = state.injections
      .map((i) => {
        const d = daysUntil(i.dueAt);
        return rowHTML({
          icon: "💉",
          title: i.label,
          meta: "Due " + fmtDate(i.dueAt) + " · reminder only — enter product when logging",
          severity: i.given ? "green" : d < 0 ? "red" : d <= 3 ? "amber" : "teal",
          done: i.given,
          right: i.given
            ? '<span class="badge ok">given</span>'
            : '<span class="badge ' + (d < 0 ? "danger" : "warn") + '">' + (d < 0 ? "overdue" : d + "d") + "</span>",
        });
      })
      .join("");

    $("#log-inject-id").innerHTML = state.injections
      .filter((i) => !i.given)
      .map((i) => '<option value="' + i.id + '">' + escapeHtml(i.label) + "</option>")
      .join("");

    $("#treatment-log").innerHTML =
      state.treatmentLog.length === 0
        ? '<div class="empty">No treatments logged</div>'
        : state.treatmentLog
            .slice()
            .reverse()
            .map((t) =>
              rowHTML({
                icon: "📝",
                title: t.label,
                meta: "Product: " + t.product + (t.note ? " · " + t.note : "") + " · " + fmtDate(t.at),
              })
            )
            .join("");
  }

  function speciesIcon(s) {
    return { cattle: "🐄", sheep: "🐑", pigs: "🐷", chickens: "🐔", wildlife: "🦌" }[s] || "🐾";
  }

  function updateCapacity() {
    const ha = parseFloat($("#cap-ha").value) || 0;
    const rate = parseFloat($("#cap-rate").value) || 0;
    const cap = ha * rate;
    $("#cap-result").textContent = cap.toFixed(1) + " LSU";
    const cattle = state.livestock.find((l) => l.species === "cattle");
    const sheep = state.livestock.find((l) => l.species === "sheep");
    const approxLSU = (cattle ? cattle.head * 1 : 0) + (sheep ? sheep.head * 0.15 : 0);
    $("#cap-compare").textContent =
      "Demo herd ≈ " + approxLSU.toFixed(0) + " LSU (cattle 1.0 + sheep 0.15 sample) vs capacity " + cap.toFixed(1);
  }

  function renderMoney() {
    const tin = state.income.reduce((s, i) => s + i.amount, 0);
    const tout = state.expenses.reduce((s, e) => s + e.amount, 0);
    $("#money-in").textContent = fmtMoney(tin);
    $("#money-out").textContent = fmtMoney(tout);
    $("#money-cash").textContent = fmtMoney(state.cashOverview);
    $("#income-list").innerHTML = state.income
      .map((i) =>
        rowHTML({
          icon: "↑",
          title: i.label,
          meta: fmtDate(i.at),
          right: '<span class="amount" style="color:var(--green)">' + fmtMoney(i.amount) + "</span>",
        })
      )
      .join("");
    $("#expense-list").innerHTML = state.expenses
      .map((e) =>
        rowHTML({
          icon: "↓",
          title: e.label,
          meta: fmtDate(e.at),
          right: '<span class="amount" style="color:var(--amber)">' + fmtMoney(e.amount) + "</span>",
        })
      )
      .join("");
    $("#buying-list").innerHTML = state.buying
      .map((b) =>
        rowHTML({
          icon: "🛒",
          title: b.item,
          meta: "Est. " + fmtMoney(b.est),
          right: '<span class="badge ' + (b.priority === "high" ? "warn" : "muted") + '">' + b.priority + "</span>",
        })
      )
      .join("");
  }

  function renderMore() {
    const items = [
      { nav: "weather", icon: "🌤", title: "Weather & seasons", meta: "Highveld calendar · frost" },
      { nav: "stock", icon: "📦", title: "Stock & supplies", meta: "Inventory · reorder" },
      { nav: "monitor", icon: "👁", title: "Monitoring", meta: "Health notes · photo stubs" },
      { nav: "infra", icon: "🔧", title: "Repairs & infra", meta: "Fences · pumps · vehicles" },
      { nav: "admin", icon: "📊", title: "Admin & budget", meta: "Cash overview · buying" },
      { nav: "contacts", icon: "📞", title: "Contacts", meta: "Vets · suppliers · buyers" },
      { nav: "legal", icon: "⚖", title: "Legal", meta: "Permits · POPIA · checklist" },
      { nav: "hr", icon: "👥", title: "HR & people", meta: "Roster · skof · payroll" },
      { nav: "todo", icon: "✓", title: "To-do", meta: "Farm-wide tasks" },
      { nav: "settings", icon: "⚙", title: "Settings", meta: "Reset demo" },
    ];
    $("#more-grid").innerHTML = items
      .map(
        (m) =>
          '<button type="button" class="more-item" data-nav="' +
          m.nav +
          '"><div class="mi-icon">' +
          m.icon +
          '</div><div class="mi-body"><div class="mi-title">' +
          m.title +
          '</div><div class="mi-meta">' +
          m.meta +
          '</div></div><div class="mi-chevron">›</div></button>'
      )
      .join("");
  }

  function renderWeather() {
    $("#weather-cards").innerHTML = [
      { t: "Rainfall season", m: "Highveld summer rainfall dominant (sample). Peak Dec–Feb. Dry winter typical.", badge: "sample" },
      { t: "Frost windows", m: "Risk often May–Aug inland Highveld. Tender crops / young stock — plan cover. Not a live frost alert.", badge: "frost" },
      { t: "Heat / evaporation", m: "Hot dry spells raise stock water & crop stress. Check troughs and soil moisture logs.", badge: "heat" },
    ]
      .map(
        (w) =>
          '<div class="weather-card"><div class="w-title">' +
          escapeHtml(w.t) +
          ' <span class="badge muted">' +
          w.badge +
          '</span></div><div class="w-meta">' +
          escapeHtml(w.m) +
          "</div></div>"
      )
      .join("");

    const seasons = [
      { m: "Sep–Oct", body: "Spring warm-up · plant windows open for summer crops", note: "Watch late frost" },
      { m: "Nov–Jan", body: "Rain season · vegetative growth · grazing pressure", note: "Scout pests / weeds (ops note)" },
      { m: "Feb–Apr", body: "Grain fill / harvest prep · autumn veld", note: "Plan feed for winter" },
      { m: "May–Aug", body: "Dry / frost season · supplementary feed · fire readiness", note: "Sample Highveld pattern" },
    ];
    $("#season-calendar").innerHTML = seasons
      .map(
        (s) =>
          '<div class="season-row"><div class="s-month">' +
          s.m +
          '</div><div><div class="s-body">' +
          s.body +
          '</div><div class="s-note">' +
          s.note +
          "</div></div></div>"
      )
      .join("");
  }

  function renderStock() {
    const low = state.stock.filter((s) => s.qty <= s.reorder).length;
    $("#stock-low-badge").textContent = low ? low + " low" : "ok";
    $("#stock-low-badge").className = "badge " + (low ? "warn" : "ok");
    $("#stock-list").innerHTML = state.stock
      .map((s) => {
        const isLow = s.qty <= s.reorder;
        return rowHTML({
          icon: "📦",
          title: s.name,
          meta: s.cat + " · " + s.qty + " " + s.unit + " · reorder " + s.reorder,
          severity: isLow ? "amber" : "green",
          right: isLow ? '<span class="badge warn">reorder</span>' : '<span class="badge ok">ok</span>',
        });
      })
      .join("");
    $("#purchase-list").innerHTML = state.purchases
      .map((p) =>
        rowHTML({
          icon: "🧾",
          title: p.item,
          meta: p.supplier + " · " + fmtDate(p.at),
          right: '<span class="amount">' + fmtMoney(p.amount) + "</span>",
        })
      )
      .join("");
  }

  function renderMonitor() {
    $("#mon-list").innerHTML =
      state.monitoring.length === 0
        ? '<div class="empty">No notes yet</div>'
        : state.monitoring
            .slice()
            .reverse()
            .map(
              (m) =>
                '<div class="row"><div class="photo-stub" aria-hidden="true">' +
                (m.photo ? "🖼" : "·") +
                '</div><div class="row-body"><div class="row-title">' +
                escapeHtml(m.area) +
                '</div><div class="row-meta">' +
                escapeHtml(m.note) +
                " · " +
                fmtDate(m.at) +
                "</div></div></div>"
            )
            .join("");
    const tasks = buildQueue().slice(0, 5);
    $("#mon-tasks").innerHTML = tasks
      .map((t) =>
        rowHTML({
          icon: t.icon,
          title: t.title,
          meta: t.meta,
          severity: t.severity,
          action: t.action,
        })
      )
      .join("");
  }

  function renderInfra() {
    $("#infra-list").innerHTML = state.infra
      .map((i) =>
        rowHTML({
          icon: i.type === "Fence" ? "⛓" : i.type === "Pump" ? "💧" : i.type === "Vehicle" ? "🚛" : "🏠",
          title: i.name,
          meta: i.type + " · " + i.condition,
          right: '<span class="badge ' + (i.condition.includes("Needs") ? "warn" : "muted") + '">' + i.condition + "</span>",
        })
      )
      .join("");
    const open = state.repairs.filter((r) => r.status === "open");
    $("#repair-badge").textContent = open.length + " open";
    $("#repair-list").innerHTML = state.repairs
      .map((r) =>
        rowHTML({
          icon: "🔧",
          title: r.asset,
          meta: r.issue + " · " + fmtDate(r.at),
          done: r.status === "done",
          severity: r.status === "open" ? "amber" : "green",
          btn:
            r.status === "open"
              ? '<button type="button" class="btn btn-sm btn-ghost" data-repair-done="' + r.id + '">Done</button>'
              : '<span class="badge ok">done</span>',
        })
      )
      .join("");
    $("#repair-asset").innerHTML = state.infra
      .map((i) => '<option value="' + i.id + '">' + escapeHtml(i.name) + "</option>")
      .join("");
  }

  function renderAdmin() {
    $("#admin-ha").textContent = state.farm.hectares + " ha";
    $("#admin-head").textContent = state.livestock.reduce((s, l) => s + l.head, 0);
    const tin = state.income.reduce((s, i) => s + i.amount, 0);
    const tout = state.expenses.reduce((s, e) => s + e.amount, 0);
    $("#admin-budget").innerHTML =
      '<div class="env-row"><div class="env-head"><span>Income</span><span class="env-amt">' +
      fmtMoney(tin) +
      '</span></div></div>' +
      '<div class="env-row"><div class="env-head"><span>Expenses</span><span class="env-amt">' +
      fmtMoney(tout) +
      '</span></div></div>' +
      '<div class="env-row"><div class="env-head"><span>Cash overview</span><span class="env-amt" style="color:var(--accent-bright)">' +
      fmtMoney(state.cashOverview) +
      "</span></div></div>" +
      '<p style="font-size:11px;color:var(--muted);margin-top:8px">Sketch only — not a full set of books.</p>';
  }

  function renderContacts() {
    const types = ["all", "vet", "supplier", "broker", "buyer"];
    $("#contact-filters").innerHTML = types
      .map(
        (t) =>
          '<button type="button" class="chip' +
          (state.contactFilter === t ? " tab active" : "") +
          '" data-cfilter="' +
          t +
          '" style="' +
          (state.contactFilter === t ? "border-color:var(--accent);color:var(--accent-bright);background:var(--accent-glow)" : "") +
          '">' +
          t +
          "</button>"
      )
      .join("");
    const list = state.contacts.filter((c) => state.contactFilter === "all" || c.type === state.contactFilter);
    $("#contacts-list").innerHTML = list
      .map((c) =>
        rowHTML({
          icon: c.type === "vet" ? "🩺" : c.type === "buyer" ? "🤝" : "📞",
          title: c.name,
          meta: c.type + " · " + c.phone + " · " + c.note,
        })
      )
      .join("");
  }

  function renderLegal() {
    $("#legal-renewals").innerHTML = state.legalRenewals
      .map((l) => {
        const d = daysUntil(l.dueAt);
        return rowHTML({
          icon: "📋",
          title: l.label,
          meta: fmtDate(l.dueAt),
          severity: d <= 30 ? "amber" : "green",
          right: '<span class="badge warn">' + d + "d</span>",
        });
      })
      .join("");
    $("#legal-checklist").innerHTML = state.legalChecks
      .map(
        (c) =>
          '<label class="check-item"><input type="checkbox" data-legal-check="' +
          c.id +
          '"' +
          (c.done ? " checked" : "") +
          " /> <span>" +
          escapeHtml(c.text) +
          "</span></label>"
      )
      .join("");
  }

  function renderHR() {
    $("#hr-count").textContent = state.workers.length + "";
    $("#payroll-copy").textContent = state.payrollApproved
      ? "Payroll approved for this cycle. Mark paid on payday offline."
      : "Payslips ready for next pay day (" +
        state.workers.length +
        " people). App prepared slips — you confirm pay.";
    $("#btn-payroll-approve").style.display = state.payrollApproved ? "none" : "";
    $("#hr-list").innerHTML = state.workers
      .map((w) =>
        rowHTML({
          icon: "👤",
          title: w.name,
          meta: w.role + " · " + w.skof + " skof · " + fmtMoney(w.wage) + "/mo",
        })
      )
      .join("");
    $("#skof-list").innerHTML =
      state.skofLog.length === 0
        ? '<div class="empty">No clock events today</div>'
        : state.skofLog
            .slice()
            .reverse()
            .slice(0, 8)
            .map((s) =>
              rowHTML({
                icon: s.action === "in" ? "▶" : "■",
                title: s.worker,
                meta: "Clock " + s.action + " · " + s.at,
              })
            )
            .join("");
    $("#leave-list").innerHTML = state.leave
      .map((l) =>
        rowHTML({
          icon: "🏖",
          title: l.worker,
          meta: fmtDate(l.from) + " → " + fmtDate(l.to),
          right: '<span class="badge ' + (l.status === "approved" ? "ok" : "warn") + '">' + l.status + "</span>",
        })
      )
      .join("");
  }

  function renderTodo() {
    const open = state.todos.filter((t) => !t.done).length;
    $("#todo-badge").textContent = open + " open";
    $("#todo-list").innerHTML =
      state.todos.length === 0
        ? '<div class="empty">No tasks</div>'
        : state.todos
            .map((t) =>
              rowHTML({
                icon: t.source === "auto" ? "⚡" : "✎",
                title: t.text,
                meta: t.source + " · due " + fmtDate(t.due),
                done: t.done,
                btn: t.done
                  ? '<span class="badge ok">done</span>'
                  : '<button type="button" class="btn btn-sm btn-ghost" data-todo-done="' + t.id + '">Done</button>',
              })
            )
            .join("");
  }

  function renderSettings() {
    $("#settings-farm").innerHTML =
      "<strong>" +
      escapeHtml(state.farm.name) +
      "</strong><br>" +
      escapeHtml(state.farm.region) +
      "<br>" +
      state.farm.hectares +
      " ha total · " +
      state.farm.grazingHa +
      " ha grazing (sample)";
  }

  function render() {
    if (currentView === "home") renderHome();
    else if (currentView === "crops") renderCrops();
    else if (currentView === "animals") renderAnimals();
    else if (currentView === "money") renderMoney();
    else if (currentView === "more") renderMore();
    else if (currentView === "weather") renderWeather();
    else if (currentView === "stock") renderStock();
    else if (currentView === "monitor") renderMonitor();
    else if (currentView === "infra") renderInfra();
    else if (currentView === "admin") renderAdmin();
    else if (currentView === "contacts") renderContacts();
    else if (currentView === "legal") renderLegal();
    else if (currentView === "hr") renderHR();
    else if (currentView === "todo") renderTodo();
    else if (currentView === "settings") renderSettings();
  }

  function resetDemo() {
    if (!confirm("Reset all Farm Desk demo data?")) return;
    localStorage.removeItem(STORAGE_KEY);
    state = seed();
    save();
    toast("Demo reset");
    showView("home");
  }

  /* ── events ── */
  function bind() {
    document.body.addEventListener("click", (e) => {
      const navEl = e.target.closest("[data-nav]");
      if (navEl) {
        const nav = navEl.getAttribute("data-nav");
        if (nav) {
          e.preventDefault();
          showView(nav);
        }
      }
      const goto = e.target.closest("[data-goto]");
      if (goto) {
        showView(goto.getAttribute("data-goto"));
      }
      const fert = e.target.closest("[data-fert-done]");
      if (fert) {
        const id = fert.getAttribute("data-fert-done");
        const f = state.fertReminders.find((x) => x.id === id);
        if (f) {
          f.done = true;
          save();
          toast("Fertilise reminder marked done");
          render();
        }
      }
      const rd = e.target.closest("[data-repair-done]");
      if (rd) {
        const id = rd.getAttribute("data-repair-done");
        const r = state.repairs.find((x) => x.id === id);
        if (r) {
          r.status = "done";
          save();
          toast("Ticket closed");
          render();
        }
      }
      const td = e.target.closest("[data-todo-done]");
      if (td) {
        const id = td.getAttribute("data-todo-done");
        const t = state.todos.find((x) => x.id === id);
        if (t) {
          t.done = true;
          save();
          toast("Task done");
          render();
        }
      }
      const cf = e.target.closest("[data-cfilter]");
      if (cf) {
        state.contactFilter = cf.getAttribute("data-cfilter");
        save();
        render();
      }
      const lc = e.target.closest("[data-legal-check]");
      if (lc && e.target.matches("input")) {
        const id = lc.getAttribute("data-legal-check");
        const c = state.legalChecks.find((x) => x.id === id);
        if (c) {
          c.done = lc.checked;
          save();
        }
      }
    });

    document.querySelectorAll("#crops-tabs .tab").forEach((t) => {
      t.addEventListener("click", () => {
        cropsTab = t.getAttribute("data-ctab");
        render();
      });
    });
    document.querySelectorAll("#animals-tabs .tab").forEach((t) => {
      t.addEventListener("click", () => {
        animalsTab = t.getAttribute("data-atab");
        if (animalsTab === "capacity") {
          $("#cap-rate").dataset.touched = "";
        }
        render();
      });
    });

    $("#btn-soil-log").addEventListener("click", () => {
      const fieldId = $("#soil-field").value;
      const field = state.fields.find((f) => f.id === fieldId);
      const moisture = $("#soil-moisture").value.trim() || "—";
      const note = $("#soil-note").value.trim() || "—";
      state.soilLogs.push({
        id: uid("sl"),
        fieldId,
        fieldName: field ? field.name : fieldId,
        moisture,
        note,
        at: isoDate(new Date()),
      });
      $("#soil-moisture").value = "";
      $("#soil-note").value = "";
      save();
      toast("Soil log saved");
      render();
    });

    $("#cap-ha").addEventListener("input", updateCapacity);
    $("#cap-rate").addEventListener("input", () => {
      $("#cap-rate").dataset.touched = "1";
      updateCapacity();
    });
    $("#cap-species").addEventListener("change", () => {
      $("#cap-rate").dataset.touched = "";
      $("#cap-rate").value = state.stockingRates[$("#cap-species").value];
      updateCapacity();
    });
    $("#btn-cap-save").addEventListener("click", () => {
      const sp = $("#cap-species").value;
      const rate = parseFloat($("#cap-rate").value);
      if (!isNaN(rate) && rate > 0) {
        state.stockingRates[sp] = rate;
        save();
        toast("Stocking rate saved");
        render();
      }
    });

    $("#btn-log-inject").addEventListener("click", () => {
      const id = $("#log-inject-id").value;
      const product = $("#log-inject-product").value.trim();
      const note = $("#log-inject-note").value.trim();
      if (!id) {
        toast("No open reminders");
        return;
      }
      if (!product) {
        toast("Enter the product you used");
        return;
      }
      const inj = state.injections.find((i) => i.id === id);
      if (!inj) return;
      inj.given = true;
      inj.product = product;
      state.treatmentLog.push({
        id: uid("tl"),
        injectId: id,
        label: inj.label,
        product,
        note,
        at: isoDate(new Date()),
      });
      $("#log-inject-product").value = "";
      $("#log-inject-note").value = "";
      save();
      toast("Logged — no dosage stored (ops log only)");
      render();
    });

    $("#btn-mon-add").addEventListener("click", () => {
      const note = $("#mon-note").value.trim();
      if (!note) {
        toast("Enter a note");
        return;
      }
      state.monitoring.push({
        id: uid("m"),
        area: $("#mon-area").value,
        note,
        at: isoDate(new Date()),
        photo: true,
      });
      $("#mon-note").value = "";
      save();
      toast("Note saved (+ photo stub)");
      render();
    });

    $("#btn-repair-add").addEventListener("click", () => {
      const assetId = $("#repair-asset").value;
      const asset = state.infra.find((i) => i.id === assetId);
      const issue = $("#repair-issue").value.trim();
      if (!issue) {
        toast("Describe the issue");
        return;
      }
      state.repairs.unshift({
        id: uid("r"),
        assetId,
        asset: asset ? asset.name : assetId,
        issue,
        status: "open",
        at: isoDate(new Date()),
      });
      $("#repair-issue").value = "";
      save();
      toast("Repair ticket opened");
      render();
    });

    $("#btn-todo-add").addEventListener("click", () => {
      const text = $("#todo-text").value.trim();
      if (!text) {
        toast("Enter a task");
        return;
      }
      state.todos.unshift({
        id: uid("td"),
        text,
        source: "manual",
        done: false,
        due: isoDate(addDays(new Date(), 3)),
      });
      $("#todo-text").value = "";
      save();
      toast("Task added");
      render();
    });

    $("#btn-payroll-approve").addEventListener("click", () => {
      state.payrollApproved = true;
      save();
      toast("Payroll approved");
      render();
    });
    $("#btn-payroll-later").addEventListener("click", () => toast("Reminded — still pending Approve"));

    $("#btn-clock-in").addEventListener("click", () => {
      const w = state.workers[0];
      const now = new Date();
      const time =
        isoDate(now) +
        " " +
        now.toLocaleTimeString("en-ZA", { timeZone: TZ, hour: "2-digit", minute: "2-digit" });
      state.skofLog.push({ id: uid("sk"), worker: w.name, action: "in", at: time });
      save();
      toast("Clocked in · " + w.name);
      render();
    });
    $("#btn-clock-out").addEventListener("click", () => {
      const w = state.workers[0];
      const now = new Date();
      const time =
        isoDate(now) +
        " " +
        now.toLocaleTimeString("en-ZA", { timeZone: TZ, hour: "2-digit", minute: "2-digit" });
      state.skofLog.push({ id: uid("sk"), worker: w.name, action: "out", at: time });
      save();
      toast("Clocked out · " + w.name);
      render();
    });

    $("#btn-reset").addEventListener("click", resetDemo);
    $("#btn-reset-2").addEventListener("click", resetDemo);
    $("#btn-info").addEventListener("click", () => {
      openModal(
        "About Farm Desk",
        "<p><strong>Plaas Sonder Naam · Free State / Highveld</strong> sample farm.</p>" +
          "<p>Mobile-first static demo. Faceless SA ZAR. Data in localStorage.</p>" +
          "<p><strong>NOT</strong> veterinary advice. <strong>NOT</strong> legal, tax or financial advice. <strong>NOT</strong> an agronomist prescription. Injection module is reminder + user-entered product log only — no dosages.</p>" +
          "<p>Confirm all real decisions with a qualified vet, agronomist, lawyer or accountant.</p>"
      );
    });
    $("#modal-close").addEventListener("click", closeModal);
    $("#modal").addEventListener("click", (e) => {
      if (e.target.id === "modal") closeModal();
    });
  }

  bind();
  render();
})();
