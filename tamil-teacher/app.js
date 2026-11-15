(function () {
  var D = window.DATA, tl = window.TamilTranslit.convert;
  var cls = '3', C = D.c3;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var SPK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]; }); }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function gtLink(text) { return 'https://translate.google.com/?sl=ta&tl=en&op=translate&text=' + encodeURIComponent(text); }

  /* ---------- speech ---------- */
  var voice = null, synth = window.speechSynthesis;
  function findVoice() {
    if (!synth) return null;
    var vs = synth.getVoices();
    voice = vs.filter(function (v) { return /^ta/i.test(v.lang); })[0] || null;
    renderVoiceStatus();
    return voice;
  }
  if (synth) { findVoice(); synth.onvoiceschanged = findVoice; }
  function speak(text, el) {
    text = text.replace(/\n/g, ' ');
    if (!synth) { window.open(gtLink(text), '_blank', 'noopener'); return; }
    synth.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'ta-IN'; if (voice) u.voice = voice; u.rate = 0.8;
    if (el) { el.classList.add('playing'); u.onend = u.onerror = function () { el.classList.remove('playing'); }; }
    synth.speak(u);
  }
  function speakAll(list) {
    if (!synth) return; synth.cancel();
    list.forEach(function (t) { var u = new SpeechSynthesisUtterance(t.replace(/\n/g, ' ')); u.lang = 'ta-IN'; if (voice) u.voice = voice; u.rate = 0.8; synth.speak(u); });
  }
  function renderVoiceStatus() {
    var box = $('#voice-status'); if (!box) return;
    if (voice) box.innerHTML = '<div class="voice-ok"><b>Sound is ready.</b> A Tamil voice was found on this device. Tap any card to hear it.</div>';
    else box.innerHTML = '<div class="voice-warn"><b>No Tamil voice found on this device yet.</b> Tapping a word may sound wrong or silent. To fix it on Android: Settings → search "Text-to-speech" → Preferred engine: <b>Speech Services by Google</b> → tap the settings icon → Install voice data → <b>Tamil (India)</b>. On iPhone: Settings → Accessibility → Spoken Content → Voices → add <b>Tamil</b>. Then reload this page. Use Chrome on Android or Safari on iPhone for best results.</div>';
  }

  window.TamilApp = { speak: speak, esc: esc, store: store, SPK: SPK, shuffle: shuffle, hooks: [],
    cls: function () { return cls; }, data: function () { return C; } };

  /* ---------- helpers toggles ---------- */
  function bindToggle(id, cls) {
    var box = $(id), saved = store(cls);
    if (saved === '0') box.checked = false;
    var apply = function () { document.body.classList.toggle(cls, !box.checked); store(cls, box.checked ? '1' : '0'); };
    box.addEventListener('change', apply); apply();
  }
  bindToggle('#opt-tl', 'no-tl'); bindToggle('#opt-en', 'no-en');
  cls = ['1', '2', '3', '4'].indexOf(store('cls')) >= 0 ? store('cls') : '3';

  /* ---------- card builders ---------- */
  function card(ta, tanglish, en, opts) {
    opts = opts || {};
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'card';
    b.innerHTML = (opts.pic ? '<span class="pic" aria-hidden="true">' + esc(opts.pic) + '</span>' : '') +
      '<span class="ta">' + esc(ta) + '</span><span class="tl">' + esc(tanglish) + '</span>' +
      (en ? '<span class="en">' + esc(en) + '</span>' : '') + (opts.hint ? '<span class="hint">' + esc(opts.hint) + '</span>' : '') +
      '<span class="spk">' + SPK + '</span>';
    b.setAttribute('aria-label', 'Hear ' + tanglish + (en ? ', ' + en : ''));
    b.addEventListener('click', function () { speak(opts.say || ta, b); });
    return b;
  }
  function lineRow(ta, en) {
    var d = document.createElement('div'); d.className = 'line';
    d.innerHTML = '<button type="button" class="round" aria-label="Hear this line">' + SPK + '</button><div><span class="ta">' + esc(ta) +
      '</span><span class="tl">' + esc(tl(ta)) + '</span>' + (en ? '<span class="en">' + esc(en) + '</span>' : '') + '</div>';
    d.querySelector('button').addEventListener('click', function () { speak(ta, d); });
    return d;
  }
  function chipBar(el, items, onPick, key) {
    el.innerHTML = '';
    key = key + cls; var saved = store(key), first = items.filter(function (x) { return x.id === saved; })[0] || items[0];
    items.forEach(function (it) {
      var c = document.createElement('button'); c.type = 'button'; c.className = 'chip';
      c.innerHTML = esc(it.en) + (it.ta ? ' <span class="ta">' + esc(it.ta) + '</span>' : '');
      c.addEventListener('click', function () { select(it); });
      it._chip = c; el.appendChild(c);
    });
    function select(it) { items.forEach(function (x) { x._chip.setAttribute('aria-pressed', x === it ? 'true' : 'false'); }); store(key, it.id); onPick(it); }
    select(first);
  }

  /* ---------- letters ---------- */
  var uy = $('#uyir-grid');
  D.uyir.forEach(function (r) { uy.appendChild(card(r[0], r[1], r[3] + ' = ' + r[4], { hint: r[2], say: r[0] })); });
  var me = $('#mei-grid');
  D.mei.forEach(function (r) { me.appendChild(card(r[0], r[1], r[3] + ' = ' + r[4], { hint: r[2], say: r[0].replace('்', '') })); });
  (function () {
    var t = $('#uyirmei'), h = '<thead><tr><th></th>';
    D.uyir.forEach(function (u) { h += '<th>' + u[0] + '<small>' + u[1] + '</small></th>'; });
    h += '</tr></thead><tbody>';
    D.uyirmeiCons.forEach(function (c, i) {
      h += '<tr><th>' + D.mei[i][0] + '<small>' + D.uyirmeiBase[i] + '</small></th>';
      D.uyirmeiSigns.forEach(function (s, j) {
        var L = c + s, T = D.uyirmeiBase[i] + D.uyirmeiVowel[j];
        h += '<td><button type="button" data-say="' + L + '" aria-label="' + T + '"><span class="ta">' + L + '</span><span class="tl">' + T + '</span></button></td>';
      });
      h += '</tr>';
    });
    t.innerHTML = h + '</tbody>';
    t.addEventListener('click', function (e) { var b = e.target.closest('button[data-say]'); if (b) speak(b.dataset.say, b); });
  })();

  /* ---------- words ---------- */
  function renderClass() {
  C = D['c' + cls];
  window.TamilApp.hooks.forEach(function (f) { f(); });
  ['1', '2', '3', '4'].forEach(function (n) { document.body.classList.toggle('c' + n, cls === n); });
  document.querySelectorAll('.cls-switch button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.cls === cls ? 'true' : 'false'); });
  chipBar($('#topic-chips'), C.topics, function (tp) {
    var p = $('#topic-panel');
    p.innerHTML = '<div class="panel-head"><h3>' + esc(tp.en) + '</h3><span class="ta">' + esc(tp.ta) + '</span><span class="tl">' + esc(tl(tp.ta)) + '</span></div>';
    var g = document.createElement('div'); g.className = 'grid';
    tp.words.forEach(function (w) { g.appendChild(card(w[0], tl(w[0]), w[1], { pic: w[2] })); });
    p.appendChild(g);
  }, 'topic');
  var ph = $('#phrases'); ph.innerHTML = '';
  C.phrases.forEach(function (p) { ph.appendChild(lineRow(p[0], p[1])); });

  /* ---------- grammar ---------- */
  chipBar($('#grammar-chips'), C.grammar, function (g) {
    var p = $('#grammar-panel'), taCols = g.taCols || (g.cols.length - (g.id === 'tense' ? 0 : 1));
    var h = '<div class="panel-head"><h3>' + esc(g.en) + '</h3><span class="ta">' + esc(g.ta) + '</span><span class="tl">' + esc(tl(g.ta)) + '</span></div>' +
      '<div class="note">' + esc(g.explain) + '</div><div class="scroll-x" style="border:0"><table class="list"><thead><tr>';
    g.cols.forEach(function (c) { h += '<th>' + esc(c) + '</th>'; });
    h += '<th><span class="sr" hidden>Listen</span></th></tr></thead><tbody>';
    g.rows.forEach(function (r, i) {
      h += '<tr>';
      r.forEach(function (cell, j) {
        if (j < taCols) h += '<td><span class="ta">' + esc(cell) + '</span><span class="tl">' + esc(tl(cell)) + '</span></td>';
        else h += '<td class="en">' + esc(cell) + '</td>';
      });
      h += '<td><button type="button" class="row-spk" data-row="' + i + '" aria-label="Hear this row">' + SPK + '</button></td></tr>';
    });
    h += '</tbody></table></div>' + (g.note ? '<p class="en">' + esc(g.note) + '</p>' : '');
    p.innerHTML = h;
    p.querySelectorAll('.row-spk').forEach(function (b) {
      b.addEventListener('click', function () { speak(g.rows[+b.dataset.row].slice(0, taCols).join('. '), b.closest('tr')); });
    });
  }, 'grammar');

  /* ---------- reading ---------- */
  var reads = C.poems.concat(C.stories);
  chipBar($('#reading-chips'), reads, function (r) {
    var p = $('#reading-panel');
    p.innerHTML = '<div class="panel-head"><h3>' + esc(r.en) + '</h3><span class="ta">' + esc(r.ta) + '</span><span class="tl">' + esc(tl(r.ta)) + '</span></div>' +
      (r.about ? '<p class="en keep">' + esc(r.about) + '</p>' : '');
    var row = document.createElement('div'); row.className = 'row';
    row.innerHTML = '<button type="button" class="btn">' + SPK + ' Read all</button><button type="button" class="btn ghost">Stop</button>';
    row.children[0].onclick = function () { speakAll(r.lines.map(function (l) { return l[0]; })); };
    row.children[1].onclick = function () { synth && synth.cancel(); };
    p.appendChild(row);
    var ls = document.createElement('div'); ls.className = 'lines';
    r.lines.forEach(function (l) { ls.appendChild(lineRow(l[0], l[1])); });
    p.appendChild(ls);
    if (r.moral) {
      var m = document.createElement('div'); m.className = 'note';
      m.innerHTML = '<b>Moral (நீதி, needhi):</b>'; m.appendChild(lineRow(r.moral[0], r.moral[1])); p.appendChild(m);
    }
    if (r.questions) {
      var qh = document.createElement('h3'); qh.textContent = 'Questions to ask (வினாக்கள்)'; p.appendChild(qh);
      var qs = document.createElement('div'); qs.className = 'lines';
      r.questions.forEach(function (q) {
        qs.appendChild(lineRow(q[0], q[1]));
        var a = lineRow(q[2], 'Answer: ' + q[3]); a.style.paddingLeft = '24px'; qs.appendChild(a);
      });
      p.appendChild(qs);
    }
  }, 'reading');

  /* ---------- quiz ---------- */
  var allWords = [], seen = {};
  C.topics.forEach(function (t) { t.words.forEach(function (w) { if (seen[w[0]]) return; seen[w[0]] = 1; allWords.push({ ta: w[0], en: w[1], pic: w[2], topic: t.id }); }); });
  var allLetters = D.uyir.map(function (u) { return { ta: u[0], tl: u[1] }; }).concat(D.mei.map(function (m) { return { ta: m[0], tl: m[1] }; }));
  D.uyirmeiCons.forEach(function (c, i) { D.uyirmeiSigns.forEach(function (s, j) { if (cls === '1' && j > 1) return; allLetters.push({ ta: c + s, tl: D.uyirmeiBase[i] + D.uyirmeiVowel[j] }); }); });
  function firstLetter(w) { var ch = Array.from(w); return /[\u0BBE-\u0BCD]/.test(ch[1] || '') ? ch[0] + ch[1] : ch[0]; }
  var quizzes = [
    { id:'letter', en:'Read the letter', make: function () {
      var a = pick(allLetters), opts = [a];
      while (opts.length < 4) { var o = pick(allLetters); if (opts.every(function (x) { return x.tl.toLowerCase() !== o.tl.toLowerCase(); })) opts.push(o); }
      return { main: a.ta, sub: 'Which sound is this letter?', say: a.ta.replace('்', ''), answer: a, opts: shuffle(opts), label: function (o) { return '<span>' + esc(o.tl) + '</span>'; } };
    }},
    { id:'meaning', en:'What does it mean?', make: function () {
      var a = pick(allWords), opts = [a];
      while (opts.length < 4) { var o = pick(allWords); if (opts.every(function (x) { return x.en !== o.en; })) opts.push(o); }
      return { main: a.ta, small: true, sub: '<span class="tl">' + esc(tl(a.ta)) + '</span> · Choose the meaning', say: a.ta, answer: a, opts: shuffle(opts), label: function (o) { return esc(o.en); } };
    }},
    { id:'find', en:'Find the Tamil word', make: function () {
      var a = pick(allWords.filter(function (w) { return w.topic !== 'months'; })), pool = allWords.filter(function (w) { return w.topic === a.topic; }), opts = [a];
      while (opts.length < 4) { var o = pick(pool.length >= 4 ? pool : allWords); if (opts.every(function (x) { return x.ta !== o.ta; })) opts.push(o); }
      return { main: a.pic, small: true, sub: '<b>' + esc(a.en) + '</b> · Which Tamil word is it?', say: null, answer: a, opts: shuffle(opts), reveal: true,
        label: function (o) { return '<span class="ta">' + esc(o.ta) + '</span><span class="tl q-tl" hidden>' + esc(tl(o.ta)) + '</span>'; } };
    }}
  ];
  if (cls === '1') quizzes.splice(1, 0, { id:'firstletter', en:'First letter', make: function () {
      var a = pick(allWords.filter(function (w) { return w.topic !== 'numbers'; })), f = firstLetter(a.ta), opts = [f];
      while (opts.length < 4) { var o = firstLetter(pick(allWords).ta); if (opts.indexOf(o) < 0) opts.push(o); }
      return { main: a.pic, small: true, sub: '<b>' + esc(a.en) + '</b> · <span class="tl">' + esc(tl(a.ta)) + '</span><br>Which letter does it start with?', say: a.ta,
        answer: { ta: f }, opts: shuffle(opts).map(function (x) { return x === f ? null : { ta: x }; }), firstKey: f,
        label: function (o) { return '<span class="ta">' + esc(o.ta) + '</span>'; } };
    }});
  score = { right: 0, total: 0 };
  function renderQuiz(qz) {
    current = qz;
    var q = qz.make(), box = $('#quiz');
    box.innerHTML = '<div class="score">Score: ' + score.right + ' / ' + score.total + '</div>' +
      '<div class="q-main' + (q.small ? ' small' : '') + '">' + esc(q.main) + '</div><div class="q-sub">' + q.sub + '</div>' +
      (q.say ? '<button type="button" class="btn ghost" id="q-say">' + SPK + ' Hear it</button>' : '') +
      '<div class="options"></div><div class="feedback" aria-live="polite"></div><button type="button" class="btn" id="q-next">Next question</button>';
    var ops = box.querySelector('.options'), done = false;
    if (q.firstKey) q.opts = q.opts.map(function (o) { return o || q.answer; });
    q.opts.forEach(function (o) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'opt'; b.innerHTML = q.label(o);
      b.addEventListener('click', function () {
        if (done) return; done = true; score.total++;
        var ok = o === q.answer; if (ok) score.right++;
        b.classList.add(ok ? 'right' : 'wrong');
        ops.children[q.opts.indexOf(q.answer)].classList.add('right');
        if (q.reveal) box.querySelectorAll('.q-tl').forEach(function (x) { x.hidden = false; });
        box.querySelector('.feedback').innerHTML = ok ? 'சபாஷ்! (sabaash!) Well done.' : 'Not quite. The answer is shown in green.';
        box.querySelector('.score').textContent = 'Score: ' + score.right + ' / ' + score.total;
        speak(q.answer.ta.replace('்', ''));
      });
      ops.appendChild(b);
    });
    if (q.say) $('#q-say').onclick = function () { speak(q.say); };
    $('#q-next').onclick = function () { renderQuiz(current); };
  }
  chipBar($('#quiz-chips'), quizzes, function (qz) { renderQuiz(qz); }, 'quiz');
  }
  var score = { right: 0, total: 0 }, current;
  document.querySelectorAll('.cls-switch button').forEach(function (b) {
    b.addEventListener('click', function () { cls = b.dataset.cls; store('cls', cls); renderClass(); });
  });
  renderClass();

  /* ---------- tracing ---------- */
  (function () {
    var sel = $('#trace-pick'), ghost = $('#trace-ghost'), cv = $('#trace-canvas'), ctx = cv.getContext('2d'), drawing = false;
    var letters = D.uyir.map(function (u) { return [u[0], u[1]]; }).concat(D.mei.map(function (m) { return [m[0], m[1]]; }));
    D.uyirmeiCons.forEach(function (c, i) { letters.push([c, D.uyirmeiBase[i] + 'a']); });
    letters.forEach(function (l, i) { var o = document.createElement('option'); o.value = i; o.textContent = l[0] + '  (' + l[1] + ')'; sel.appendChild(o); });
    function size() { var r = cv.getBoundingClientRect(), d = window.devicePixelRatio || 1; cv.width = r.width * d; cv.height = r.height * d; ctx.setTransform(d, 0, 0, d, 0, 0); }
    function clear() { size(); }
    function show() { ghost.textContent = letters[sel.value][0]; clear(); }
    function pt(e) { var r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
    cv.addEventListener('pointerdown', function (e) { drawing = true; cv.setPointerCapture(e.pointerId); var p = pt(e); ctx.beginPath(); ctx.moveTo(p[0], p[1]);
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--leaf'); ctx.lineWidth = 12; ctx.lineCap = ctx.lineJoin = 'round'; });
    cv.addEventListener('pointermove', function (e) { if (!drawing) return; var p = pt(e); ctx.lineTo(p[0], p[1]); ctx.stroke(); });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (ev) { cv.addEventListener(ev, function () { drawing = false; }); });
    sel.addEventListener('change', show);
    $('#trace-clear').onclick = clear;
    $('#trace-say').onclick = function () { speak(letters[sel.value][0].replace('்', '')); };
    $('#trace-next').onclick = function () { sel.value = (+sel.value + 1) % letters.length; show(); };
    window.addEventListener('resize', clear);
    show();
    window._traceResize = clear;
  })();

  /* ---------- homework helper ---------- */
  var sample = 'எங்கள் வீட்டுத் தோட்டம்\nஎங்கள் வீட்டில் ஒரு அழகான தோட்டம் உள்ளது.\nஅதில் ரோஜா, மல்லிகை, செம்பருத்தி பூக்கள் உள்ளன.\nநான் தினமும் செடிகளுக்குத் தண்ணீர் ஊற்றுவேன்.';
  var inp = $('#hw-input'), out = $('#hw-out');
  inp.value = store('hw') || sample;
  function convertHW() {
    var text = inp.value.trim(); store('hw', inp.value);
    out.innerHTML = '';
    if (!text) { out.innerHTML = '<p class="en keep">Paste Tamil text in the box above, then tap Convert to Tanglish.</p>'; return; }
    var head = document.createElement('div'); head.className = 'row';
    head.innerHTML = '<h3>Tanglish</h3><button type="button" class="btn ghost">' + SPK + ' Read all</button><a class="btn ghost" target="_blank" rel="noopener" href="' + gtLink(text) + '">English meaning of all ↗</a>';
    head.querySelector('button').onclick = function () { speakAll(text.split(/\n+/)); };
    out.appendChild(head);
    var ls = document.createElement('div'); ls.className = 'lines';
    text.split(/\n+/).forEach(function (line) {
      line = line.trim(); if (!line) return;
      var r = lineRow(line, '');
      if (/[஀-௿]/.test(line)) {
        var a = document.createElement('a'); a.href = gtLink(line); a.target = '_blank'; a.rel = 'noopener'; a.className = 'en keep'; a.textContent = 'Meaning ↗';
        r.children[1].appendChild(a);
      }
      ls.appendChild(r);
    });
    out.appendChild(ls);
  }
  $('#hw-go').onclick = convertHW;
  $('#hw-clear').onclick = function () { inp.value = ''; store('hw', ''); convertHW(); inp.focus(); };
  $('#hw-copy').onclick = function () {
    var txt = inp.value.split('\n').map(function (l) { return tl(l); }).join('\n'), msg = $('#hw-msg');
    var p = navigator.clipboard && navigator.clipboard.writeText(txt);
    if (p) p.then(function () { msg.textContent = 'Copied.'; }, function () { msg.textContent = 'Copy blocked. Select the Tanglish below and copy it.'; });
    else msg.textContent = 'Select the Tanglish below and copy it.';
  };
  convertHW();

  /* ---------- routing ---------- */
  var views = ['start', 'letters', 'words', 'grammar', 'reading', 'practice', 'tests', 'homework'];
  function route() {
    var v = (location.hash || '#start').slice(1);
    if (/^class[1-4]$/.test(v)) { cls = v.slice(5); store('cls', cls); renderClass(); v = 'start'; }
    if (views.indexOf(v) < 0) v = 'start';
    views.forEach(function (n) { $('#view-' + n).hidden = n !== v; });
    document.querySelectorAll('.tabs a').forEach(function (a) { if (a.getAttribute('href') === '#' + v) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    if (v === 'practice') window._traceResize();
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route); route();
})();
