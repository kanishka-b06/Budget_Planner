(() => {
'use strict';

/* ================= constants & helpers ================= */
const EXP = ['Food','Transport','Rent','Bills','Shopping','Health','Education','Entertainment','Other'];
const INC = ['Salary','Freelance','Gift','Investment','Other'];
const PATHS = {
  Food:'<path d="M3 2v7a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6a2 2 0 0 0 2 2h3zm0 0v7"/>',
  Transport:'<path d="M8 6v6M16 6v6M2 12h19.6M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5A2 2 0 0 0 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>',
  Rent:'<path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  Bills:'<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5a6 6 0 0 0-12 0c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6M10 22h4"/>',
  Shopping:'<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>',
  Health:'<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>',
  Education:'<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  Entertainment:'<rect x="2" y="3" width="20" height="18" rx="2"/><path d="M7 3v18M17 3v18M2 12h20M2 7.5h5M2 16.5h5M17 7.5h5M17 16.5h5"/>',
  Other:'<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z"/>',
  Salary:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  Freelance:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/>',
  Gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
  Investment:'<path d="M22 7l-8.5 8.5-5-5L2 17M16 7h6v6"/>',
  income:'<path d="M12 3v13M6 11l6 6 6-6M4 21h16"/>',
  expense:'<path d="M5 2h14v20l-3-2-2 2-2-2-2 2-2-2-3 2zM9 7h6M9 11h6"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  wallet:'<path d="M3 7a2 2 0 0 1 2-2h14v4"/><path d="M3 7v11a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1H5a2 2 0 0 1-2-2z"/><circle cx="16.5" cy="14.5" r="1"/>',
  sprout:'<path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8zM14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
  coins:'<circle cx="8" cy="8" r="6"/><path d="M18.1 10.4A6 6 0 1 1 10.3 18M7 6h1v4M16.7 13.9l.7.7-2.8 2.8"/>',
  star:'<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
  check:'<circle cx="12" cy="12" r="10"/><path d="M8 12.5l3 3 5-6"/>'
};
const icon = k => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${PATHS[k] || PATHS.Other}</svg>`;
const ICONS = Object.fromEntries(Object.keys(PATHS).map(k => [k, icon(k)]));
const COLORS = {Food:'#8b7cf6',Transport:'#5ab0f0',Rent:'#ee628a',Bills:'#f4b544',Shopping:'#3fbf9b',Health:'#ff9f80',Education:'#6c8cff',Entertainment:'#c58af0',Other:'#b3a9c0'};
const KEY = 'budgetPlanner.v1', MKEY = 'budgetPlanner.month';

const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const money = n => '₹' + Number(n || 0).toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
const pad = n => String(n).padStart(2, '0');
const todayStr = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const monthLabel = m => { const [y, mo] = m.split('-').map(Number); return new Date(y, mo - 1, 1).toLocaleDateString('en-IN', {month: 'long', year: 'numeric'}); };
const shortMonth = m => { const [y, mo] = m.split('-').map(Number); return new Date(y, mo - 1, 1).toLocaleDateString('en-IN', {month: 'short'}); };
const fmtDate = d => { const [y, m, day] = d.split('-').map(Number); return new Date(y, m - 1, day).toLocaleDateString('en-IN', {day: '2-digit', month: 'short', year: 'numeric'}); };
const shiftMonth = (m, delta) => { const [y, mo] = m.split('-').map(Number); const d = new Date(y, mo - 1 + delta, 1); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`; };
const barCls = p => p >= 100 ? 'danger' : p >= 80 ? 'warn' : '';
const bar = (pct, cls = '') => `<div class="bar ${cls}"><i style="width:${Math.max(0, Math.min(100, pct))}%"></i></div>`;
const empty = (emoji, title, text) => `<div class="empty"><span class="e">${emoji}</span><b>${title}</b>${text}</div>`;

/* ================= storage ================= */
const blank = () => ({budgets: {}, limits: {}, transactions: [], goals: []});
let db = load();
function load() {
  try { const d = JSON.parse(localStorage.getItem(KEY)); if (d && typeof d === 'object') return Object.assign(blank(), d); } catch (e) {}
  return blank();
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(db)); }
  catch (e) { toast('Could not save - browser storage is blocked or full', 'error'); }
}
function getMonth() {
  let m = null;
  try { m = localStorage.getItem(MKEY); } catch (e) {}
  return /^\d{4}-\d{2}$/.test(m) ? m : todayStr().slice(0, 7);
}
function setMonth(m) { try { localStorage.setItem(MKEY, m); } catch (e) {} }

/* ================= data helpers ================= */
const monthTx = m => db.transactions.filter(t => t.date.startsWith(m));
function stats(m) {
  const tx = monthTx(m);
  const income = tx.filter(t => t.type === 'income').reduce((a, t) => a + t.amount, 0);
  const expense = tx.filter(t => t.type === 'expense').reduce((a, t) => a + t.amount, 0);
  const budget = db.budgets[m] || 0;
  return {income, expense, budget, balance: income - expense, left: budget - expense, pct: budget > 0 ? expense / budget * 100 : 0, tx};
}
function byCategory(m) {
  const map = {};
  monthTx(m).filter(t => t.type === 'expense').forEach(t => map[t.category] = (map[t.category] || 0) + t.amount);
  return Object.entries(map).sort((a, b) => b[1] - a[1]);
}
const goalSaved = g => g.contribs.reduce((a, c) => a + c.amount, 0);
const goalMonthSaved = m => db.goals.reduce((a, g) => a + g.contribs.filter(c => c.date.startsWith(m)).reduce((x, c) => x + c.amount, 0), 0);
const sortTx = list => [...list].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));

/* ================= UI helpers ================= */
function toast(msg, type = '') {
  const t = document.createElement('div');
  t.className = 'toast ' + type; t.textContent = msg;
  $('#toasts').appendChild(t);
  setTimeout(() => t.remove(), 2800);
}
function download(name, content, type) {
  const url = URL.createObjectURL(new Blob([content], {type}));
  const a = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const opts = (list, sel) => list.map(c => `<option${c === sel ? ' selected' : ''}>${c}</option>`).join('');

function ring(pct, label, cls = '') {
  const C = 2 * Math.PI * 54, off = C * (1 - Math.min(100, pct) / 100);
  return `<div class="ring ${cls}"><svg viewBox="0 0 132 132"><circle class="bg" cx="66" cy="66" r="54"/><circle class="fg" cx="66" cy="66" r="54" stroke-dasharray="${C.toFixed(2)}" stroke-dashoffset="${off.toFixed(2)}"/></svg><div class="mid">${label}</div></div>`;
}
function donut(rows, total) {
  if (!rows.length) return empty(ICONS.sprout, 'No spending yet', 'Your category breakdown will appear here.');
  let acc = 0;
  const stops = rows.map(([c, v]) => { const a = acc, b = acc + v / total * 100; acc = b; return `${COLORS[c] || '#999'} ${a.toFixed(2)}% ${b.toFixed(2)}%`; }).join(',');
  return `<div class="donut-wrap"><div class="donut" style="background:conic-gradient(${stops})"><div class="donut-mid"><small>Spent</small><b>${money(total)}</b></div></div>
    <div class="legend">${rows.map(([c, v]) => `<div class="row"><i class="dot" style="background:${COLORS[c] || '#999'}"></i><b>${esc(c)}</b><span class="amt">${money(v)} · ${(v / total * 100).toFixed(0)}%</span></div>`).join('')}</div></div>`;
}
function txItem(t, actions) {
  const inc = t.type === 'income';
  return `<div class="item"><div class="badge-ico ${inc ? 'i-mint' : 'i-rose'}">${ICONS[t.category] || ICONS.Other}</div>
    <div class="info"><b>${esc(t.desc)}</b><small>${esc(t.category)} · ${fmtDate(t.date)}</small></div>
    <div class="amount ${inc ? 'c-mint' : 'c-rose'}">${inc ? '+' : '-'}${money(t.amount)}</div>
    ${actions ? `<div class="acts"><button class="link-btn" data-action="edit-tx" data-id="${t.id}">Edit</button><button class="link-btn del" data-action="del-tx" data-id="${t.id}">Delete</button></div>` : ''}</div>`;
}
function budgetNote(s) {
  if (!s.budget) return 'Set your monthly budget to get started.';
  if (s.left < 0) return `Over budget by ${money(-s.left)}`;
  return `${money(s.left)} left of ${money(s.budget)}`;
}

/* ================= views ================= */
const VIEWS = {
  dashboard: {eyebrow: 'Overview', title: 'Dashboard', draw: dashboard},
  transactions: {eyebrow: 'Income & Expenses', title: 'Transactions', draw: transactions},
  budget: {eyebrow: 'Plan', title: 'Budget', draw: budget},
  goals: {eyebrow: 'Save', title: 'Savings Goals', draw: goals},
  reports: {eyebrow: 'Insights', title: 'Reports', draw: reports}
};
let current = 'dashboard';
const filters = {q: '', type: '', cat: ''};

function dashboard() {
  const m = getMonth(), s = stats(m), cats = byCategory(m), recent = sortTx(s.tx).slice(0, 5);
  const ringLabel = s.budget ? Math.round(s.pct) + '%' : '0%';
  $('#view').innerHTML = `
    <section class="hero">
      <div><span class="hero-label">Remaining balance</span>
        <div class="hero-amount">${money(s.balance)}</div>
        <div class="chips"><span class="chip">↓ Income ${money(s.income)}</span><span class="chip">↑ Spent ${money(s.expense)}</span></div></div>
      <div class="hero-ring">${ring(s.pct, ringLabel)}<p>${budgetNote(s)}</p></div>
    </section>
    <section class="grid g3">
      <div class="card stat"><div class="ico i-mint">${ICONS.income}</div><div><div class="label">Total Income</div><div class="value c-mint">${money(s.income)}</div><div class="hint">Money received</div></div></div>
      <div class="card stat"><div class="ico i-rose">${ICONS.expense}</div><div><div class="label">Total Expenses</div><div class="value c-rose">${money(s.expense)}</div><div class="hint">Money spent</div></div></div>
      <div class="card stat"><div class="ico i-sun">${ICONS.target}</div><div><div class="label">Budget Left</div><div class="value ${s.left < 0 ? 'c-rose' : 'c-sun'}">${money(s.left)}</div><div class="hint">Budget minus expenses</div></div></div>
    </section>
    <section class="grid g2">
      <div class="card"><h2>Spending by category</h2><p class="sub">Where your money went this month.</p>${donut(cats, s.expense)}</div>
      <div class="card"><h2>Recent transactions</h2><p class="sub">Your latest activity.</p>
        <div class="list">${recent.length ? recent.map(t => txItem(t, false)).join('') : empty(ICONS.coins, 'No transactions yet', 'Add your first transaction to see activity here.')}</div>
        <a class="more" href="#transactions">View all →</a></div>
    </section>
    <section class="card"><div class="card-head"><div><h2>Savings goals</h2><p class="sub">Progress on what you are saving for.</p></div><a class="btn sm ghost" href="#goals">Manage goals</a></div>
      ${db.goals.length ? db.goals.slice(0, 3).map(g => { const sv = goalSaved(g), p = g.target ? sv / g.target * 100 : 0;
        return `<div style="margin-bottom:18px"><div class="card-head" style="margin-bottom:8px"><b>${esc(g.name)}</b><span class="c-lav"><b>${money(sv)}</b> / ${money(g.target)}</span></div>${bar(p, p >= 100 ? 'done' : '')}</div>`; }).join('')
        : empty(ICONS.star, 'No goals yet', 'Start saving towards something you care about.')}
    </section>`;
}

function transactions() {
  $('#view').innerHTML = `
    <section class="card">
      <div class="card-head"><div><h2>All transactions</h2><p class="sub">Your financial activity for the selected month.</p></div><span class="badge" id="count"></span></div>
      <div class="toolbar">
        <input type="search" id="search" placeholder="Search transactions..." value="${esc(filters.q)}">
        <select id="fType"><option value="">All types</option><option value="income"${filters.type === 'income' ? ' selected' : ''}>Income</option><option value="expense"${filters.type === 'expense' ? ' selected' : ''}>Expense</option></select>
        <select id="fCat"><option value="">All categories</option>${opts([...new Set([...EXP, ...INC])], filters.cat)}</select>
      </div>
      <div class="list" id="txList"></div>
    </section>`;
  drawTx();
}
function drawTx() {
  const m = getMonth(), q = filters.q.trim().toLowerCase();
  const list = sortTx(monthTx(m)).filter(t => (!filters.type || t.type === filters.type) && (!filters.cat || t.category === filters.cat) && (!q || (t.desc + ' ' + t.category).toLowerCase().includes(q)));
  $('#count').textContent = list.length + (list.length === 1 ? ' record' : ' records');
  $('#txList').innerHTML = list.length ? list.map(t => txItem(t, true)).join('') : empty(ICONS.coins, 'No transactions yet', 'Add your first transaction using the button above.');
}

function budget() {
  const m = getMonth(), s = stats(m), lim = db.limits[m] || {}, spent = Object.fromEntries(byCategory(m));
  const total = Object.values(lim).reduce((a, b) => a + b, 0);
  $('#view').innerHTML = `
    <section class="card grid g2" style="gap:36px;align-items:center">
      <div>
        <h2>Monthly budget</h2><p class="sub">How much do you plan to spend in ${monthLabel(m)}?</p>
        <div class="inline">
          <div class="money-input"><span>₹</span><input type="number" id="budgetInput" min="0" step="100" placeholder="20000" value="${s.budget || ''}"></div>
          <button class="btn" data-action="save-budget">Save</button>
          <button class="btn ghost" data-action="copy-budget">Copy last month</button>
        </div>
      </div>
      <div class="hero-ring" style="max-width:none;display:flex;align-items:center;gap:22px;text-align:left;color:var(--ink)">
        ${ring(s.pct, s.budget ? Math.round(s.pct) + '%' : '0%', 'dark ' + barCls(s.pct))}
        <div><b>Budget used</b><p class="note ${s.left < 0 && s.budget ? 'bad' : ''}" style="margin-top:4px">${budgetNote(s)}</p></div>
      </div>
    </section>
    <section class="card" style="margin-top:20px">
      <div class="card-head"><div><h2>Category limits</h2><p class="sub">Optional - set a limit for each spending category.</p></div><button class="btn sm" data-action="save-limits">Save limits</button></div>
      ${EXP.map(c => { const sp = spent[c] || 0, l = lim[c] || 0, p = l ? sp / l * 100 : 0;
        return `<div class="limit"><div class="nm"><span class="badge-ico" style="width:38px;height:38px;border-radius:13px;background:${COLORS[c]}22;color:${COLORS[c]}">${ICONS[c]}</span>${c}</div>
          <div>${bar(p, barCls(p))}<small>${money(sp)} spent${l ? (sp > l ? ` · over by ${money(sp - l)}` : ` · ${money(l - sp)} left`) : ' · no limit set'}</small></div>
          <div class="money-input"><span>₹</span><input type="number" min="0" step="1" placeholder="Limit" data-limit="${c}" value="${l || ''}"></div></div>`; }).join('')}
      <p class="note ${s.budget && total > s.budget ? 'bad' : ''}">${s.budget && total > s.budget ? `Your category limits (${money(total)}) add up to more than your monthly budget.` : total ? `Limits total ${money(total)}.` : ''}</p>
    </section>`;
}

function goals() {
  $('#view').innerHTML = `
    <section class="card" style="margin-bottom:20px">
      <h2>New goal</h2><p class="sub">What are you saving for?</p>
      <form id="goalForm" class="goal-form" novalidate>
        <div><label class="f" for="gName">Goal name</label><input type="text" id="gName" placeholder="e.g. New laptop" maxlength="60" autocomplete="off"></div>
        <div><label class="f" for="gTarget">Target (₹)</label><input type="number" id="gTarget" placeholder="50000" min="0" step="1"></div>
        <div><label class="f" for="gStart">Already saved (₹)</label><input type="number" id="gStart" placeholder="0" min="0" step="1"></div>
        <div><label class="f" for="gDate">Target date</label><input type="date" id="gDate"></div>
        <button class="btn" type="submit">+ Create</button>
      </form>
    </section>
    <div class="card-head" style="margin-bottom:14px"><h2 style="font-family:var(--serif)">Your goals</h2><span class="badge">${db.goals.length} ${db.goals.length === 1 ? 'goal' : 'goals'}</span></div>
    ${db.goals.length ? `<div class="grid goals">${db.goals.map(goalCard).join('')}</div>` : `<div class="card">${empty(ICONS.star, 'No goals yet', 'Create your first savings goal using the form above.')}</div>`}`;
}
function goalCard(g) {
  const sv = goalSaved(g), p = g.target ? sv / g.target * 100 : 0, rem = Math.max(0, g.target - sv);
  let meta = rem === 0 ? `${ICONS.check} Goal reached` : `${money(rem)} to go`;
  if (g.deadline && rem > 0) {
    const days = Math.ceil((new Date(g.deadline + 'T00:00:00') - new Date(todayStr() + 'T00:00:00')) / 864e5);
    if (days < 0) meta += ' · deadline passed';
    else { const months = Math.max(1, Math.ceil(days / 30.44)); meta += ` · ${days} days left · save ~${money(rem / months)}/month`; }
  }
  const hist = [...g.contribs].reverse().map(c => `<div class="hist"><span>${fmtDate(c.date)} · <b>${money(c.amount)}</b></span><button class="link-btn del" data-action="rm-contrib" data-g="${g.id}" data-id="${c.id}" title="Remove">✕</button></div>`).join('');
  return `<div class="card goal"><div class="top2"><div class="badge-ico i-lav">${ICONS.target}</div><h3>${esc(g.name)}</h3><button class="link-btn del" data-action="del-goal" data-id="${g.id}">Delete</button></div>
    <div class="nums"><span class="${p >= 100 ? 'c-mint' : 'c-lav'}">${money(sv)}</span><span>${money(g.target)}</span></div>
    ${bar(p, p >= 100 ? 'done' : '')}<div class="meta">${Math.min(100, p).toFixed(0)}% · ${meta}</div>
    <div class="add"><input type="number" min="0" step="1" placeholder="Amount (₹)" data-amt="${g.id}"><button class="btn sm" data-action="add-money" data-id="${g.id}">Add</button></div>
    ${g.contribs.length ? `<details><summary>History (${g.contribs.length})</summary>${hist}</details>` : ''}</div>`;
}

function reports() {
  const m = getMonth(), s = stats(m), cur = todayStr().slice(0, 7);
  let bannerCls = 'banner', bannerTxt;
  if (m < cur) { bannerCls += ' closed'; bannerTxt = `${monthLabel(m)} is closed. Your month-end report is ready to download.`; }
  else if (m > cur) bannerTxt = `${monthLabel(m)} is an upcoming month.`;
  else {
    const d = new Date(), left = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate() - d.getDate();
    if (left <= 3) bannerCls += ' soon';
    bannerTxt = left === 0 ? 'Today is the last day of the month - download your month-end report!' : `${left} day${left === 1 ? '' : 's'} left in ${monthLabel(m)}.${left <= 3 ? ' Time to download your month-end report.' : ''}`;
  }
  const months = [-5, -4, -3, -2, -1, 0].map(i => shiftMonth(m, i)), data = months.map(stats);
  const max = Math.max(1, ...data.map(d => Math.max(d.income, d.expense)));
  $('#view').innerHTML = `
    <div class="${bannerCls}">${bannerTxt}</div>
    <section class="grid g4">
      <div class="card stat"><div class="ico i-mint">${ICONS.income}</div><div><div class="label">Income</div><div class="value c-mint" style="font-size:1.3rem">${money(s.income)}</div></div></div>
      <div class="card stat"><div class="ico i-rose">${ICONS.expense}</div><div><div class="label">Expenses</div><div class="value c-rose" style="font-size:1.3rem">${money(s.expense)}</div></div></div>
      <div class="card stat"><div class="ico i-lav">${ICONS.wallet}</div><div><div class="label">Balance</div><div class="value ${s.balance < 0 ? 'c-rose' : 'c-lav'}" style="font-size:1.3rem">${money(s.balance)}</div></div></div>
      <div class="card stat"><div class="ico i-sun">${ICONS.target}</div><div><div class="label">Saved to goals</div><div class="value c-sun" style="font-size:1.3rem">${money(goalMonthSaved(m))}</div></div></div>
    </section>
    <section class="grid g2">
      <div class="card"><h2>Spending by category</h2><p class="sub">Share of this month's expenses.</p>${donut(byCategory(m), s.expense)}</div>
      <div class="card"><h2>Downloads</h2><p class="sub">Keep a record of this month.</p>
        <div class="dl">
          <div class="opt"><div><b>Monthly spending</b><small>All transactions as a CSV (opens in Excel)</small></div><button class="btn sm" data-action="dl-csv">Download CSV</button></div>
          <div class="opt"><div><b>Month-end report</b><small>Summary, categories and transactions</small></div><button class="btn sm mint" data-action="dl-report">Download report</button></div>
          <div class="opt"><div><b>Print / Save as PDF</b><small>Print this page or save it as a PDF</small></div><button class="btn sm ghost" data-action="print">Print</button></div>
        </div></div>
    </section>
    <section class="card"><h2>6-month trend</h2><p class="sub">Income vs expenses, ending with the selected month.</p>
      <div class="trend">${months.map((x, i) => `<div class="col"><div class="pair"><i class="in" style="height:${data[i].income / max * 100}%" title="Income ${money(data[i].income)}"></i><i class="ex" style="height:${data[i].expense / max * 100}%" title="Expenses ${money(data[i].expense)}"></i></div><span>${shortMonth(x)}</span></div>`).join('')}</div>
      <div class="keys"><span><i class="dot" style="background:var(--mint);display:inline-block;margin-right:6px"></i>Income</span><span><i class="dot" style="background:var(--rose);display:inline-block;margin-right:6px"></i>Expenses</span></div>
    </section>`;
}

/* ================= downloads ================= */
function downloadCsv() {
  const m = getMonth(), s = stats(m), tx = monthTx(m).sort((a, b) => a.date.localeCompare(b.date));
  if (!tx.length) return toast('No transactions this month to download', 'error');
  const cell = v => `"${String(v).replace(/"/g, '""')}"`;
  const rows = [['Date', 'Description', 'Type', 'Category', 'Amount (INR)'], ...tx.map(t => [t.date, t.desc, t.type, t.category, t.amount.toFixed(2)]),
    [], ['', 'Total income', '', '', s.income.toFixed(2)], ['', 'Total expenses', '', '', s.expense.toFixed(2)], ['', 'Balance', '', '', s.balance.toFixed(2)], ['', 'Monthly budget', '', '', s.budget.toFixed(2)]];
  download(`spending-${m}.csv`, '\ufeff' + rows.map(r => r.map(cell).join(',')).join('\r\n'), 'text/csv;charset=utf-8');
  toast('Spending downloaded');
}
function downloadReport() {
  const m = getMonth(), s = stats(m), cats = byCategory(m), tx = monthTx(m).sort((a, b) => a.date.localeCompare(b.date)), saved = goalMonthSaved(m);
  const verdict = !s.budget ? 'No budget was set for this month.' : s.left >= 0 ? `You stayed within budget with ${money(s.left)} to spare.` : `You went over budget by ${money(-s.left)}.`;
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Month-End Report - ${monthLabel(m)}</title><style>
    body{font-family:system-ui,Segoe UI,Roboto,sans-serif;max-width:820px;margin:40px auto;padding:0 24px;color:#2b2438;background:#fffdfb}
    h1{font-family:Georgia,serif;margin:0 0 4px}h2{margin:34px 0 10px;font-size:1.1rem;font-family:Georgia,serif}.sub{color:#8a8197}
    .grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:20px}.box{border:1px solid #f0e8df;border-radius:16px;padding:14px 18px;background:#fff}
    .box small{color:#8a8197;display:block}.box b{font-size:1.4rem}table{width:100%;border-collapse:collapse;font-size:.92rem}
    th,td{text-align:left;padding:9px 10px;border-bottom:1px solid #f0e8df}th{background:#faf6f1;font-size:.75rem;text-transform:uppercase;letter-spacing:.06em}
    td.r,th.r{text-align:right}.v{background:#efecff;color:#6f5fe0;border-radius:16px;padding:14px 18px;margin-top:20px;font-weight:600}</style></head><body>
    <h1>Month-End Report</h1><div class="sub">${monthLabel(m)} · Generated ${fmtDate(todayStr())}</div>
    <div class="grid"><div class="box"><small>Total income</small><b>${money(s.income)}</b></div><div class="box"><small>Total expenses</small><b>${money(s.expense)}</b></div>
    <div class="box"><small>Remaining balance</small><b>${money(s.balance)}</b></div><div class="box"><small>Monthly budget</small><b>${money(s.budget)}</b></div>
    <div class="box"><small>Budget left</small><b>${money(s.left)}</b></div><div class="box"><small>Saved towards goals</small><b>${money(saved)}</b></div></div>
    <div class="v">${verdict}</div>
    <h2>Spending by category</h2>${cats.length ? `<table><tr><th>Category</th><th class="r">Amount</th><th class="r">Share</th></tr>${cats.map(([c, v]) => `<tr><td>${esc(c)}</td><td class="r">${money(v)}</td><td class="r">${(v / s.expense * 100).toFixed(0)}%</td></tr>`).join('')}</table>` : '<p class="sub">No expenses recorded.</p>'}
    <h2>All transactions</h2>${tx.length ? `<table><tr><th>Date</th><th>Description</th><th>Category</th><th class="r">Amount</th></tr>${tx.map(t => `<tr><td>${fmtDate(t.date)}</td><td>${esc(t.desc)}</td><td>${esc(t.category)}</td><td class="r">${t.type === 'income' ? '+' : '-'}${money(t.amount)}</td></tr>`).join('')}</table>` : '<p class="sub">No transactions recorded.</p>'}
    </body></html>`;
  download(`month-end-report-${m}.html`, html, 'text/html;charset=utf-8');
  toast('Month-end report downloaded');
}

/* ================= transaction dialog ================= */
const dlg = () => $('#txDialog');
let editId = null, txType = 'expense';
function setType(t, cat) {
  txType = t;
  document.querySelectorAll('#typeSeg button').forEach(b => b.classList.toggle('on', b.dataset.type === t));
  $('#category').innerHTML = opts(t === 'income' ? INC : EXP, cat);
}
function openTx(id) {
  editId = id || null;
  const t = id ? db.transactions.find(x => x.id === id) : null;
  $('#txForm').reset();
  setType(t ? t.type : 'expense', t && t.category);
  $('#desc').value = t ? t.desc : ''; $('#amount').value = t ? t.amount : ''; $('#date').value = t ? t.date : todayStr();
  $('#dialogTitle').textContent = t ? 'Edit transaction' : 'Add transaction';
  $('#submitBtn').textContent = t ? 'Save changes' : 'Add transaction';
  dlg().showModal();
  $('#desc').focus();
}
function submitTx(e) {
  e.preventDefault();
  const desc = $('#desc').value.trim(), amount = parseFloat($('#amount').value), date = $('#date').value;
  if (!desc) return toast('Please enter a description', 'error');
  if (!(amount > 0)) return toast('Amount must be greater than zero', 'error');
  if (!date) return toast('Please choose a date', 'error');
  const tx = {id: editId || uid(), desc, amount: Math.round(amount * 100) / 100, type: txType, category: $('#category').value, date};
  if (editId) db.transactions = db.transactions.map(t => t.id === editId ? tx : t); else db.transactions.push(tx);
  save();
  dlg().close();
  toast(editId ? 'Transaction updated' : 'Transaction added');
  if (!date.startsWith(getMonth())) { setMonth(date.slice(0, 7)); $('#monthPicker').value = date.slice(0, 7); toast('Switched to ' + monthLabel(date.slice(0, 7))); }
  render();
}

/* ================= theme (light / dark) ================= */
const THEME_KEY = 'budgetPlanner.theme';
const root = document.documentElement;
const sysDark = window.matchMedia('(prefers-color-scheme: dark)');
const savedTheme = () => { try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; } };
function applyTheme(t) {
  root.setAttribute('data-theme', t);
  const next = t === 'dark' ? 'light' : 'dark', btn = $('#themeBtn');
  if (btn) { btn.setAttribute('aria-label', 'Switch to ' + next + ' mode'); btn.title = 'Switch to ' + next + ' mode'; }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = t === 'dark' ? '#14111c' : '#faf6f1';
}
function toggleTheme() {
  const t = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.classList.add('theming');
  applyTheme(t);
  try { localStorage.setItem(THEME_KEY, t); } catch (e) { /* storage blocked - theme still applies for this visit */ }
  setTimeout(() => root.classList.remove('theming'), 350);
}

/* ================= events ================= */
const actions = {
  'toggle-theme': toggleTheme,
  'new-tx': () => openTx(),
  'close-dialog': () => dlg().close(),
  'edit-tx': el => openTx(el.dataset.id),
  'del-tx': el => { if (confirm('Delete this transaction?')) { db.transactions = db.transactions.filter(t => t.id !== el.dataset.id); save(); toast('Transaction deleted'); render(); } },
  'save-budget': () => {
    const inp = $('#budgetInput'), v = parseFloat(inp.value);
    if (inp.value === '' || !(v >= 0)) return toast('Enter a valid budget amount', 'error');
    db.budgets[getMonth()] = Math.round(v * 100) / 100; save(); toast('Budget saved'); render();
  },
  'copy-budget': () => {
    const prev = db.budgets[shiftMonth(getMonth(), -1)];
    if (!prev) return toast('No budget found for last month', 'error');
    db.budgets[getMonth()] = prev; save(); toast("Copied last month's budget"); render();
  },
  'save-limits': () => {
    const lim = {};
    document.querySelectorAll('[data-limit]').forEach(i => { const v = parseFloat(i.value); if (v > 0) lim[i.dataset.limit] = v; });
    db.limits[getMonth()] = lim; save(); toast('Category limits saved'); render();
  },
  'add-money': el => {
    const inp = document.querySelector(`[data-amt="${el.dataset.id}"]`), v = parseFloat(inp.value);
    if (!(v > 0)) return toast('Enter an amount to save', 'error');
    const g = db.goals.find(x => x.id === el.dataset.id);
    g.contribs.push({id: uid(), date: todayStr(), amount: Math.round(v * 100) / 100});
    save(); toast(goalSaved(g) >= g.target ? 'Goal reached!' : 'Savings added'); render();
  },
  'del-goal': el => { if (confirm('Delete this goal and its savings history?')) { db.goals = db.goals.filter(g => g.id !== el.dataset.id); save(); toast('Goal deleted'); render(); } },
  'rm-contrib': el => { const g = db.goals.find(x => x.id === el.dataset.g); g.contribs = g.contribs.filter(c => c.id !== el.dataset.id); save(); render(); },
  'dl-csv': downloadCsv,
  'dl-report': downloadReport,
  'print': () => window.print()
};

document.addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if (el && actions[el.dataset.action]) return actions[el.dataset.action](el);
  const seg = e.target.closest('#typeSeg button');
  if (seg) setType(seg.dataset.type);
  if (e.target === dlg()) dlg().close(); // click on backdrop
});
document.addEventListener('submit', e => {
  if (e.target.id === 'txForm') return submitTx(e);
  if (e.target.id === 'goalForm') {
    e.preventDefault();
    const name = $('#gName').value.trim(), target = parseFloat($('#gTarget').value), start = parseFloat($('#gStart').value) || 0;
    if (!name) return toast('Give your goal a name', 'error');
    if (!(target > 0)) return toast('Target must be greater than zero', 'error');
    const g = {id: uid(), name, target, deadline: $('#gDate').value, contribs: []};
    if (start > 0) g.contribs.push({id: uid(), date: todayStr(), amount: start});
    db.goals.push(g); save(); toast('Goal created'); render();
  }
});
document.addEventListener('input', e => {
  if (e.target.id === 'search') { filters.q = e.target.value; drawTx(); }
  if (e.target.id === 'fType') { filters.type = e.target.value; drawTx(); }
  if (e.target.id === 'fCat') { filters.cat = e.target.value; drawTx(); }
});

/* ================= router & boot ================= */
function render() {
  const v = VIEWS[current], m = getMonth();
  $('#eyebrow').textContent = v.eyebrow;
  $('#title').textContent = v.title;
  $('#subtitle').textContent = 'Here is your money for ' + monthLabel(m) + '.';
  document.querySelectorAll('[data-view]').forEach(a => a.classList.toggle('active', a.dataset.view === current));
  document.title = v.title + ' · Budget Planner';
  v.draw();
}
function route() {
  const name = location.hash.slice(1);
  current = VIEWS[name] ? name : 'dashboard';
  render();
  window.scrollTo(0, 0);
}
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  // follow the system setting until the user picks a theme themselves
  sysDark.addEventListener && sysDark.addEventListener('change', e => { if (!savedTheme()) applyTheme(e.matches ? 'dark' : 'light'); });
  const picker = $('#monthPicker');
  picker.value = getMonth();
  picker.addEventListener('change', () => { if (picker.value) { setMonth(picker.value); render(); } else picker.value = getMonth(); });
  window.addEventListener('hashchange', route);
  route();
});
})();