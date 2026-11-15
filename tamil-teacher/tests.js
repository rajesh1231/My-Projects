/* Pre-tests and post-tests for Term 1 and Term 2, built from the lesson data. */
(function () {
  var A = window.TamilApp, D = window.DATA, tl = window.TamilTranslit.convert, esc = A.esc, SPK = A.SPK;
  var $ = function (s, r) { return (r || document).querySelector(s); };

  /* Term plans. Each part: [label, type, count, params] */
  var PLANS = {
    '1': {
      t1: { topics: 'Vowels and consonants, words for each vowel, family, colours, numbers 1–10, the அம்மா இங்கே வா வா rhyme',
        pre:  [['Vowel sounds','sound',4,{set:'uyir'}],['Word meanings','meaning',3,{topics:['family','colours']}],['Find the word','find',3,{topics:['uyirwords']}]],
        post: [['Vowel sounds','sound',4,{set:'uyir'}],['Consonant sounds','sound',4,{set:'mei'}],['Word meanings','meaning',4,{topics:['family','colours','numbers']}],
               ['Find the word','find',4,{topics:['uyirwords','body']}],['First letter','first',2,{topics:['uyirwords']}],['Rhyme','poem',2,{id:'amma'}]],
        dictation: { label:'Write the letter', letters:true } },
      t2: { topics: 'க and கா rows of the letter chart, easy words, ஆ-sign words, animals, birds, fruits, food, things at home, first letter, this/that, one and many, opposites, short stories',
        pre:  [['Letter sounds','sound',3,{set:'row2'}],['Word meanings','meaning',3,{topics:['animals','fruits']}],['First letter','first',2,{topics:['easy','aawords']}],['Opposite words','pair',2,{g:'opposite'}]],
        post: [['Letter sounds','sound',4,{set:'row2'}],['Word meanings','meaning',4,{topics:['animals','birds','fruits','food','home']}],
               ['Find the word','find',4,{topics:['easy','aawords','home']}],['First letter','first',3,{topics:['easy','aawords','animals']}],
               ['One and many','pair',2,{g:'many'}],['Opposite words','pair',1,{g:'opposite'}],['This and that','gmean',1,{g:'thisthat'}],['Story','story',1,{}]],
        dictation: { label:'Write the word', topics:['easy','aawords'] } }
    },
    '3': {
      t1: { topics: 'Letters and the uyirmei chart, family, body, colours, numbers, animals, birds, naming and action words, singular and plural, opposites, Aathichoodi, the thirsty crow',
        pre:  [['Letter sounds','sound',3,{set:'all'}],['Word meanings','meaning',3,{topics:['family','body','colours']}],['One and many','pair',2,{g:'number'}],['Opposite words','pair',2,{g:'opposite'}]],
        post: [['Letter sounds','sound',3,{set:'all'}],['Word meanings','meaning',4,{topics:['family','body','colours','numbers']}],['Find the word','find',3,{topics:['animals','birds']}],
               ['One and many','pair',3,{g:'number'}],['Opposite words','pair',3,{g:'opposite'}],['Naming or action word','nounverb',2,{}],
               ['Aathichoodi','poem',1,{id:'aathichoodi'}],['Story','story',1,{id:'crow'}]],
        dictation: { label:'Write the word', topics:['family','body','animals'] } },
      t2: { topics: 'Fruits, vegetables, days, Tamil months, school, nature, action words, male and female words, pronouns, question words, tenses, same-meaning words, Thirukkural, the rabbit and the tortoise',
        pre:  [['Word meanings','meaning',3,{topics:['fruits','vegetables','days']}],['Male and female','pair',2,{g:'gender'}],['Question words','gmean',2,{g:'question'}],
               ['Tense','tense',1,{}],['Same meaning','pair',2,{g:'synonym'}]],
        post: [['Word meanings','meaning',4,{topics:['fruits','vegetables','days','months','school','nature']}],['Find the word','find',3,{topics:['nature','school','verbs']}],
               ['Male and female','pair',3,{g:'gender'}],['Same meaning','pair',2,{g:'synonym'}],['Pronouns','gmean',2,{g:'pronoun'}],['Question words','gmean',2,{g:'question'}],
               ['Tense','tense',2,{}],['Thirukkural','poem',1,{id:'kural'}],['Story','story',1,{id:'race'}]],
        dictation: { label:'Write the word', topics:['fruits','nature','school'] } }
    }
  };

  /* seeded random so a test gives the same questions each time */
  function rng(seed) { var h = 1779033703; for (var i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 3432918353), h = h << 13 | h >>> 19;
    return function () { h = Math.imul(h ^ h >>> 16, 2246822507); h = Math.imul(h ^ h >>> 13, 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; }; }

  function build(cls, term, kind, variant) {
    var C = D['c' + cls], R = rng(cls + term + kind + variant), plan = PLANS[cls][term];
    var pick = function (a) { return a[Math.floor(R() * a.length)]; };
    var shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(R() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
    var used = {};
    function fresh(pool, keyFn) { for (var t = 0; t < 40; t++) { var x = pick(pool); if (!used[keyFn(x)]) { used[keyFn(x)] = 1; return x; } } return pick(pool); }
    function distinct(answer, pool, n, keyFn) { var out = [answer], k = [keyFn(answer)];
      for (var t = 0; t < 200 && out.length < n; t++) { var o = pick(pool); if (k.indexOf(keyFn(o)) < 0) { k.push(keyFn(o)); out.push(o); } } return shuffle(out); }
    function words(topics) { var a = []; C.topics.forEach(function (t) { if (topics.indexOf(t.id) >= 0) t.words.forEach(function (w) { a.push({ ta:w[0], en:w[1], pic:w[2] }); }); }); return a; }
    var allWords = words(C.topics.map(function (t) { return t.id; }));
    function g(id) { return C.grammar.filter(function (x) { return x.id === id; })[0]; }
    function letters(set) {
      var a = [];
      if (set === 'uyir' || set === 'all') D.uyir.forEach(function (u) { a.push({ ta:u[0], tl:u[1] }); });
      if (set === 'mei' || set === 'all') D.mei.forEach(function (m) { a.push({ ta:m[0], tl:m[1] }); });
      if (set === 'row2' || set === 'all') D.uyirmeiCons.forEach(function (c, i) { D.uyirmeiSigns.forEach(function (s, j) {
        if (set === 'row2' && j > 1) return; a.push({ ta:c + s, tl:D.uyirmeiBase[i] + D.uyirmeiVowel[j] }); }); });
      return a;
    }
    function firstLetter(w) { var ch = Array.from(w); return /[ா-்]/.test(ch[1] || '') ? ch[0] + ch[1] : ch[0]; }
    var taOpt = function (s) { return { html:'<span class="ta">' + esc(s) + '</span>', key:s }; };
    var enOpt = function (s) { return { html:esc(s), key:s }; };

    var MAKERS = {
      sound: function (p) { var pool = letters(p.set), a = fresh(pool, function (x) { return x.ta; });
        return { prompt:'<div class="q-main">' + esc(a.ta) + '</div>', ask:'Which sound is this letter?', say:a.ta.replace('்',''),
          options: distinct(a, pool, 4, function (x) { return x.tl.toLowerCase(); }).map(function (o) { return enOpt(o.tl); }), answer:a.tl, ta:a.ta, en:'sound: ' + a.tl }; },
      meaning: function (p) { var pool = words(p.topics), a = fresh(pool, function (x) { return x.ta; });
        return { prompt:'<div class="q-main small">' + esc(a.ta) + '</div>', ask:'What does this word mean?', say:a.ta,
          options: distinct(a, pool.length >= 4 ? pool : allWords, 4, function (x) { return x.en; }).map(function (o) { return enOpt(o.en); }), answer:a.en, ta:a.ta, en:a.en }; },
      find: function (p) { var pool = words(p.topics), a = fresh(pool, function (x) { return x.ta; });
        return { prompt:'<div class="q-main small">' + esc(a.pic) + '</div>', ask:'Which Tamil word means <b>' + esc(a.en) + '</b>?', say:null,
          options: distinct(a, pool.length >= 4 ? pool : allWords, 4, function (x) { return x.ta; }).map(function (o) { return taOpt(o.ta); }), answer:a.ta, ta:a.ta, en:a.en }; },
      first: function (p) { var pool = words(p.topics), a = fresh(pool, function (x) { return x.ta; }), f = firstLetter(a.ta);
        var opts = distinct(f, allWords.map(function (w) { return firstLetter(w.ta); }), 4, function (x) { return x; });
        return { prompt:'<div class="q-main small">' + esc(a.pic) + '</div>', ask:'<b>' + esc(a.en) + '</b>. Listen, then choose the first letter.', say:a.ta,
          options: opts.map(taOpt), answer:f, ta:a.ta, en:a.en + ' starts with ' + f }; },
      pair: function (p) { var gr = g(p.g), a = fresh(gr.rows, function (r) { return r[0]; });
        var ask = { opposite:'Choose the opposite word.', many:'Choose the word for "many".', number:'Choose the plural (பன்மை).', gender:'Choose the female word (பெண்பால்).', synonym:'Choose the word with the same meaning.' }[p.g];
        return { prompt:'<div class="q-main small">' + esc(a[0]) + '</div>', ask:ask, say:a[0],
          options: distinct(a, gr.rows, 4, function (r) { return r[1]; }).map(function (r) { return taOpt(r[1]); }), answer:a[1], ta:a[0] + ' → ' + a[1], en:a[a.length - 1] }; },
      gmean: function (p) { var gr = g(p.g), a = fresh(gr.rows, function (r) { return r[0]; });
        return { prompt:'<div class="q-main small">' + esc(a[0]) + '</div>', ask:'What does this mean?', say:a[0],
          options: distinct(a, gr.rows, 4, function (r) { return r[1]; }).map(function (r) { return enOpt(r[1]); }), answer:a[1], ta:a[0], en:a[1] }; },
      nounverb: function () { var n = g('noun'), v = g('verb'), isN = R() < .5, a = fresh((isN ? n : v).rows, function (r) { return r[0]; });
        var right = isN ? 'Naming word (பெயர்ச்சொல்)' : 'Action word (வினைச்சொல்)';
        return { prompt:'<div class="q-main small">' + esc(a[0]) + '</div>', ask:'Is this a naming word or an action word?', say:a[0],
          options: [enOpt('Naming word (பெயர்ச்சொல்)'), enOpt('Action word (வினைச்சொல்)')], answer:right, ta:a[0], en:a[1] + ' · ' + right }; },
      tense: function () { var gr = g('tense'), r = pick(gr.rows), j = Math.floor(R() * 3), names = ['Past (இறந்தகாலம்)','Present (நிகழ்காலம்)','Future (எதிர்காலம்)'];
        if (used['t' + r[j]]) { r = pick(gr.rows); j = (j + 1) % 3; } used['t' + r[j]] = 1;
        return { prompt:'<div class="q-main small">' + esc(r[j]) + '</div>', ask:'When does this happen?', say:r[j],
          options: names.map(enOpt), answer:names[j], ta:r[j], en:names[j] }; },
      poem: function (p) { var po = C.poems.filter(function (x) { return x.id === p.id; })[0], a = fresh(po.lines, function (l) { return l[0]; });
        return { prompt:'<div class="q-sub">' + esc(a[1]) + '</div>', ask:'Which line of <b>' + esc(po.en) + '</b> means this?', say:null,
          options: distinct(a, po.lines, 4, function (l) { return l[0]; }).map(function (l) { return taOpt(l[0]); }), answer:a[0], ta:a[0], en:a[1] }; },
      story: function (p) { var st = p.id ? C.stories.filter(function (x) { return x.id === p.id; })[0] : pick(C.stories), q = fresh(st.questions, function (x) { return x[0]; });
        var pool = []; C.stories.forEach(function (s) { s.questions.forEach(function (x) { pool.push(x); }); });
        return { prompt:'<div class="q-main small">' + esc(q[0]) + '</div>', ask:'From the story <b>' + esc(st.en) + '</b> (' + esc(st.ta) + '). Choose the answer.', say:q[0],
          options: distinct(q, pool, 4, function (x) { return x[2]; }).map(function (x) { return taOpt(x[2]); }), answer:q[2], ta:q[0] + ' ' + q[2], en:q[1] + ' ' + q[3] }; }
    };

    var qs = [];
    plan[kind].forEach(function (part) { for (var i = 0; i < part[2]; i++) { var q = MAKERS[part[1]](part[3]); q.topic = part[0]; qs.push(q); } });
    if (kind === 'post') {
      var d = plan.dictation, dpool = d.letters ? letters('uyir').concat(letters('mei')).map(function (l) { return { ta:l.ta, en:l.tl }; }) : words(d.topics);
      for (var k = 0; k < 5; k++) { var w = fresh(dpool, function (x) { return x.ta; }); qs.push({ topic:'Dictation', dictation:true, ta:w.ta, en:w.en, say:w.ta.replace('்','') }); }
    }
    return qs;
  }

  /* ---------- storage ---------- */
  function key(cls, term, kind) { return 'test:' + cls + ':' + term + ':' + kind; }
  function getRes(cls, term, kind) { try { return JSON.parse(A.store(key(cls, term, kind)) || 'null'); } catch (e) { return null; } }
  function saveRes(cls, term, kind, r) { A.store(key(cls, term, kind), JSON.stringify(r)); }
  function pct(r) { return Math.round(100 * r.score / r.total); }
  function grade(p) { return p >= 90 ? ['Excellent','அருமை'] : p >= 75 ? ['Very good','மிக நன்று'] : p >= 50 ? ['Good, keep practising','நன்று'] : ['Needs more practice','இன்னும் பயிற்சி தேவை']; }

  /* ---------- screens ---------- */
  var root, run = null;
  var TERMS = [['t1','Term 1','முதல் பருவம்'],['t2','Term 2','இரண்டாம் பருவம்']];

  function home() {
    run = null;
    var cls = A.cls(), h = '<div class="note">Showing tests for <b>Class ' + cls + '</b>. Use the Class switch at the top to change. Tamil is shown without Tanglish during the test, so your child reads it alone. You can still tap <b>Hear it</b> when a question allows it. Read the English choices aloud if your child needs help. Scores are saved on this device only.</div>';
    TERMS.forEach(function (t) {
      var pre = getRes(cls, t[0], 'pre'), post = getRes(cls, t[0], 'post'), plan = PLANS[cls][t[0]];
      h += '<div class="panel"><div class="panel-head"><h3>' + t[1] + '</h3><span class="ta">' + t[2] + '</span></div>' +
        '<p class="en keep"><b>Covers:</b> ' + esc(plan.topics) + '</p><div class="test-cards">' +
        testCard(cls, t[0], 'pre', 'Pre-test', 'Before teaching the term · ' + count(plan.pre) + ' questions · about 10 minutes', pre) +
        testCard(cls, t[0], 'post', 'Post-test', 'End of the term · ' + count(plan.post) + ' questions + 5 dictation · about 25 minutes', post) + '</div>';
      if (pre && post) { var diff = pct(post) - pct(pre);
        h += '<div class="compare"><span>Pre-test <b>' + pct(pre) + '%</b></span><span class="arrow">→</span><span>Post-test <b>' + pct(post) + '%</b></span><span class="' + (diff >= 0 ? 'up' : 'down') + '">' +
          (diff >= 0 ? 'Improved by ' + diff + ' points' : 'Down by ' + (-diff) + ' points') + '</span></div>'; }
      h += '</div>';
    });
    root.innerHTML = h;
    root.querySelectorAll('[data-start]').forEach(function (b) { b.onclick = function () { var a = b.dataset.start.split(':'); start(a[0], a[1], a[2]); }; });
    root.querySelectorAll('[data-review]').forEach(function (b) { b.onclick = function () { var a = b.dataset.review.split(':'); results(a[0], a[1], a[2], getRes(a[0], a[1], a[2])); }; });
  }
  function count(parts) { return parts.reduce(function (s, p) { return s + p[2]; }, 0); }
  function testCard(cls, term, kind, title, sub, res) {
    var id = cls + ':' + term + ':' + kind;
    return '<div class="test-card"><div><h4>' + title + '</h4><p class="en keep">' + sub + '</p></div>' +
      (res ? '<p class="last">Last score: <b>' + res.score + ' / ' + res.total + '</b> (' + pct(res) + '%) · ' + esc(res.date) + '</p>' : '<p class="last">Not taken yet</p>') +
      '<div class="row"><button type="button" class="btn" data-start="' + id + '">' + (res ? 'Take again' : 'Start') + '</button>' +
      (res ? '<button type="button" class="btn ghost" data-review="' + id + '">See answers</button>' : '') + '</div></div>';
  }

  function start(cls, term, kind) {
    var prev = getRes(cls, term, kind), variant = prev ? (prev.variant || 0) + 1 : 0;
    run = { cls:cls, term:term, kind:kind, variant:variant, qs:build(cls, term, kind, variant), i:0, answers:[] };
    question();
  }

  function header() {
    var t = TERMS.filter(function (x) { return x[0] === run.term; })[0];
    return '<div class="test-top"><b>Class ' + run.cls + ' · ' + t[1] + ' · ' + (run.kind === 'pre' ? 'Pre-test' : 'Post-test') + '</b>' +
      '<span>Question ' + (run.i + 1) + ' of ' + run.qs.length + '</span></div><div class="bar"><span style="width:' + (100 * run.i / run.qs.length) + '%"></span></div>';
  }

  function question() {
    var q = run.qs[run.i], h = '<div class="panel">' + header() + '<div class="quiz"><div class="eyebrow">' + esc(q.topic) + '</div>';
    if (q.dictation) {
      h += '<div class="q-sub">Tap <b>Hear it</b> and say the word aloud too. Your child writes it on paper. Then tap <b>Show answer</b> and mark it.</div>' +
        '<button type="button" class="btn" id="t-say">' + SPK + ' Hear it</button>' +
        '<div id="t-reveal" hidden><div class="q-main small">' + esc(q.ta) + '</div><div class="tl">' + esc(tl(q.ta)) + '</div><div class="en">' + esc(q.en) + '</div>' +
        '<p class="q-sub">Did your child write it correctly?</p><div class="options"><button type="button" class="opt" data-mark="1">Yes, correct</button><button type="button" class="opt" data-mark="0">No, not yet</button></div></div>' +
        '<button type="button" class="btn ghost" id="t-show">Show answer</button>';
    } else {
      h += q.prompt + '<div class="q-sub">' + q.ask + '</div>' + (q.say ? '<button type="button" class="btn ghost" id="t-say">' + SPK + ' Hear it</button>' : '') +
        '<div class="options' + (q.options.length < 4 ? ' one-col' : '') + '">' + q.options.map(function (o, k) { return '<button type="button" class="opt" data-k="' + k + '">' + o.html + '</button>'; }).join('') + '</div>';
    }
    h += '<div class="row"><button type="button" class="btn ghost" id="t-quit">Stop test</button></div></div></div>';
    root.innerHTML = h; window.scrollTo(0, 0);
    var say = $('#t-say', root); if (say) say.onclick = function () { A.speak(q.say); };
    $('#t-quit', root).onclick = home;
    if (q.dictation) {
      $('#t-show', root).onclick = function () { $('#t-reveal', root).hidden = false; this.hidden = true; };
      root.querySelectorAll('[data-mark]').forEach(function (b) { b.onclick = function () { next(b.dataset.mark === '1', b.dataset.mark === '1' ? 'written correctly' : 'not written correctly'); }; });
    } else {
      root.querySelectorAll('[data-k]').forEach(function (b) { b.onclick = function () {
        var o = q.options[+b.dataset.k]; root.querySelectorAll('.opt').forEach(function (x) { x.disabled = true; }); b.classList.add('chosen');
        setTimeout(function () { next(o.key === q.answer, o.key); }, 250); }; });
    }
  }

  function next(ok, given) {
    var q = run.qs[run.i];
    run.answers.push({ topic:q.topic, ok:ok, given:given, answer:q.dictation ? q.ta : q.answer, ta:q.ta, en:q.en });
    run.i++;
    if (run.i < run.qs.length) return question();
    var score = run.answers.filter(function (a) { return a.ok; }).length, d = new Date();
    var res = { score:score, total:run.answers.length, date:d.toLocaleDateString(undefined, { day:'numeric', month:'short', year:'numeric' }), variant:run.variant, answers:run.answers };
    saveRes(run.cls, run.term, run.kind, res);
    results(run.cls, run.term, run.kind, res);
  }

  function results(cls, term, kind, res) {
    run = null;
    var p = pct(res), gr = grade(p), t = TERMS.filter(function (x) { return x[0] === term; })[0], topics = {}, order = [];
    res.answers.forEach(function (a) { if (!topics[a.topic]) { topics[a.topic] = [0, 0]; order.push(a.topic); } topics[a.topic][1]++; if (a.ok) topics[a.topic][0]++; });
    var h = '<div class="panel"><div class="result-head"><div><div class="eyebrow">Class ' + cls + ' · ' + t[1] + ' · ' + (kind === 'pre' ? 'Pre-test' : 'Post-test') + ' · ' + esc(res.date) + '</div>' +
      '<div class="big-score">' + res.score + '<span> / ' + res.total + '</span></div><div class="grade">' + gr[0] + ' · <span class="ta">' + gr[1] + '</span></div></div><div class="ring" style="--p:' + p + '"><span>' + p + '%</span></div></div>';
    h += '<h3>Score by topic</h3><table class="list"><tbody>' + order.map(function (k) { var s = topics[k], tp = Math.round(100 * s[0] / s[1]);
      return '<tr><td>' + esc(k) + '</td><td class="num">' + s[0] + ' / ' + s[1] + '</td><td class="meter"><span class="' + (tp >= 75 ? 'good' : tp >= 50 ? 'ok' : 'low') + '" style="width:' + tp + '%"></span></td></tr>'; }).join('') + '</tbody></table>';
    var weak = order.filter(function (k) { return topics[k][0] / topics[k][1] < .75; });
    if (weak.length) h += '<div class="note"><b>Practise next:</b> ' + weak.map(esc).join(', ') + '. Use the Letters, Words, Grammar and Practice tabs for these.</div>';
    var wrong = res.answers.filter(function (a) { return !a.ok; });
    h += '<h3>' + (wrong.length ? 'Answers to go over (' + wrong.length + ')' : 'Every answer was correct!') + '</h3><div class="lines">' +
      wrong.map(function (a) { return '<div class="line"><span class="x">✗</span><div><span class="ta">' + esc(a.ta) + '</span><span class="tl">' + esc(tl(a.ta)) + '</span><span class="en">' +
        esc(a.en) + '</span><span class="en">Correct: <b>' + esc(a.answer) + '</b> · Child chose: ' + esc(a.given) + '</span></div></div>'; }).join('') + '</div>';
    h += '<div class="row"><button type="button" class="btn" id="t-back">Back to tests</button></div></div>';
    root.innerHTML = h; window.scrollTo(0, 0);
    $('#t-back', root).onclick = home;
  }

  function init() { root = document.getElementById('tests-root'); if (!run) home(); }
  A.hooks.push(function () { if (root) { run = null; home(); } });
  init();
})();
