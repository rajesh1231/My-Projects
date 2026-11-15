/* Tamil script -> easy Tanglish (English letters) converter.
   Follows how Tamil is actually spoken: க is "k" at the start of a word,
   "g" in the middle ("magan"), "kk" when doubled ("akka"), and so on. */
(function (root) {
  var VOWELS = { 'அ':'a','ஆ':'aa','இ':'i','ஈ':'ee','உ':'u','ஊ':'oo','எ':'e','ஏ':'ē','ஐ':'ai','ஒ':'o','ஓ':'ō','ஔ':'au' };
  var SIGNS  = { 'ா':'aa','ி':'i','ீ':'ee','ு':'u','ூ':'oo','ெ':'e','ே':'ē','ை':'ai','ொ':'o','ோ':'ō','ௌ':'au' };
  var PULLI = '்';
  var BASE = { 'க':'k','ங':'ng','ச':'s','ஞ':'nj','ட':'t','ண':'n','த':'th','ந':'n','ப':'p','ம':'m','ய':'y','ர':'r','ல':'l','வ':'v','ழ':'zh','ள':'l','ற':'r','ன':'n','ஜ':'j','ஷ':'sh','ஸ':'s','ஹ':'h','ஶ':'sh' };
  var NASAL = { 'ங':1,'ஞ':1,'ண':1,'ந':1,'ம':1,'ன':1 };
  var STOP  = { 'க':1,'ச':1,'ட':1,'த':1,'ப':1,'ற':1 };
  // sound of a stop consonant in each position
  var STOPS = {
    'க': { init:'k', dbl:'k',  nasal:'g',  hard:'k',  soft:'g',  vowel:'g'  },
    'ச': { init:'s', dbl:'ch', nasal:'j',  hard:'ch', soft:'s',  vowel:'s'  },
    'ட': { init:'t', dbl:'t',  nasal:'d',  hard:'t',  soft:'d',  vowel:'d'  },
    'த': { init:'th',dbl:'th', nasal:'dh', hard:'th', soft:'dh', vowel:'dh' },
    'ப': { init:'p', dbl:'p',  nasal:'b',  hard:'p',  soft:'p',  vowel:'b'  },
    'ற': { init:'r', dbl:'r',  nasal:'dr', hard:'r',  soft:'r',  vowel:'r'  }
  };
  // first half of a doubled stop: க்க=kk, ச்ச=cch, ட்ட=tt, த்த=tth, ப்ப=pp, ற்ற=tr
  var DBL_FIRST = { 'க':'k','ச':'c','ட':'t','த':'t','ப':'p','ற':'t' };
  var PULLI_STOP = { 'க':'k','ச':'ch','ட':'t','த':'th','ப':'p','ற':'r' };
  var DIGITS = { '௦':'0','௧':'1','௨':'2','௩':'3','௪':'4','௫':'5','௬':'6','௭':'7','௮':'8','௯':'9','௰':'10' };

  function tokenize(text) {
    var toks = [], chars = Array.from(text.normalize('NFC'));
    for (var i = 0; i < chars.length; i++) {
      var c = chars[i];
      if (BASE[c]) {
        var n = chars[i + 1];
        if (n === PULLI) { toks.push({ type:'C', c:c, v:null }); i++; }
        else if (SIGNS[n]) { toks.push({ type:'C', c:c, v:SIGNS[n] }); i++; }
        else toks.push({ type:'C', c:c, v:'a' });
      } else if (VOWELS[c]) toks.push({ type:'V', v:VOWELS[c] });
      else if (c === 'ஃ') toks.push({ type:'A' });
      else if (SIGNS[c] || c === PULLI || c === 'ௗ') { /* stray sign: skip */ }
      else toks.push({ type:'O', c: DIGITS[c] || c });
    }
    return toks;
  }

  function convert(text) {
    if (!text) return '';
    var t = tokenize(text), out = '';
    for (var i = 0; i < t.length; i++) {
      var k = t[i], prev = t[i - 1], next = t[i + 1];
      if (k.type === 'O') { out += k.c; continue; }
      if (k.type === 'V') { out += k.v; continue; }
      if (k.type === 'A') { out += 'h'; continue; }
      var c = k.c, s;
      if (k.v === null && next && next.type === 'C' && next.c === c && DBL_FIRST[c]) {
        s = DBL_FIRST[c];                       // first half of a doubled stop
      } else if (k.v === null && next && next.type === 'C' && STOP[next.c] && (c === 'ங' || c === 'ஞ')) {
        s = 'n';                                // ங்க = ng, ஞ்ச = nj
      } else if (STOPS[c] && k.v === null) {
        s = PULLI_STOP[c];                      // a stop with pulli keeps its hard sound
      } else if (STOPS[c]) {
        var pos;
        if (!prev || prev.type === 'O') pos = 'init';
        else if (prev.type === 'A') pos = 'hard';
        else if (prev.type === 'V' || prev.v !== null) pos = 'vowel';
        else if (prev.c === c) pos = 'dbl';
        else if (NASAL[prev.c]) pos = 'nasal';
        else if (STOP[prev.c] || prev.c === 'ஷ' || prev.c === 'ஸ') pos = 'hard';
        else pos = 'soft';
        s = STOPS[c][pos];
      } else if (c === 'ய' && k.v === null && prev && /a$/.test(prev.v || '')) {
        s = 'i';                                // நாய் = naai, வாய் = vaai
      } else s = BASE[c];
      out += s + (k.v || '');
    }
    return out;
  }

  root.TamilTranslit = { convert: convert };
  if (typeof module !== 'undefined') module.exports = root.TamilTranslit;
})(typeof window !== 'undefined' ? window : globalThis);
