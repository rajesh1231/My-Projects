/* Lesson content for Class 2 Tamil. Reuses some Class 3 / Class 1 word lists. */
DATA.c2 = {};
(function () {
  function t3(id) { return DATA.c3.topics.filter(function (t) { return t.id === id; })[0]; }
  function cut(id, n, en) { var t = t3(id); return { id:t.id, ta:t.ta, en:en || t.en, words:t.words.slice(0, n) }; }
  function g3(id) { return DATA.c3.grammar.filter(function (g) { return g.id === id; })[0]; }
  function p(src, id) { return src.filter(function (x) { return x.id === id; })[0]; }

  DATA.c2.topics = [
    { id:'isigns', ta:'இ, ஈ ஓசைச் சொற்கள்', en:'Words with கி, கீ sounds', words:[
      ['கிளி','parrot','🦜'],['விரல்','finger','☝️'],['மிளகு','pepper','🌶️'],['பின்','back / behind','🔙'],
      ['மீன்','fish','🐟'],['தீ','fire','🔥'],['வீடு','house','🏠'],['கீரை','spinach / greens','🥬'],['நீலம்','blue','🔵'],['சீப்பு','comb','🪮']]},
    { id:'usigns', ta:'உ, ஊ ஓசைச் சொற்கள்', en:'Words with கு, கூ sounds', words:[
      ['குடை','umbrella','☂️'],['புலி','tiger','🐅'],['முயல்','rabbit','🐇'],['குருவி','sparrow','🐦'],
      ['பூ','flower','🌼'],['பூனை','cat','🐈'],['சூரியன்','sun','☀️'],['தூண்','pillar','🏛️'],['நூல்','thread / book','🧵'],['கூடை','basket','🧺']]},
    { id:'esigns', ta:'எ, ஏ, ஐ ஓசைச் சொற்கள்', en:'Words with கெ, கே, கை sounds', words:[
      ['பெட்டி','box','📦'],['தென்னை','coconut tree','🌴'],['செருப்பு','slipper','🩴'],['மேகம்','cloud','☁️'],
      ['தேன்','honey','🍯'],['தேர்','temple chariot','🛕'],['மேசை','table','🪑'],['மலை','mountain','⛰️'],['கை','hand','✋'],['பை','bag','🎒']]},
    { id:'osigns', ta:'ஒ, ஓ, ஔ ஓசைச் சொற்கள்', en:'Words with கொ, கோ, கௌ sounds', words:[
      ['கொடி','flag','🚩'],['பொம்மை','toy / doll','🧸'],['தொப்பி','cap','🧢'],['கோழி','hen','🐔'],
      ['தோசை','dosa','🥞'],['ரோஜா','rose','🌹'],['மோர்','buttermilk','🥛'],['வௌவால்','bat','🦇'],['மௌனம்','silence','🤫']]},
    t3('family'), t3('body'), cut('colours', 8), cut('numbers', 20, 'Numbers 1 to 20'), t3('animals'), t3('birds'),
    t3('fruits'), cut('vegetables', 8), cut('days', 7), t3('school'), t3('nature'), t3('verbs')
  ];

  DATA.c2.phrases = DATA.c3.phrases;

  DATA.c2.grammar = [
    g3('noun'), g3('verb'), g3('number'),
    { id:'opposite', ta:'எதிர்ச்சொல்', en:'Opposite words',
      explain:'Say one word, the child says the opposite. A common question in Class 2 tests.',
      cols:['Word','Opposite','Meaning'],
      rows:[['பெரிய','சிறிய','big – small'],['மேலே','கீழே','up – down'],['உள்ளே','வெளியே','inside – outside'],['பகல்','இரவு','day – night'],
            ['வா','போ','come – go'],['சூடு','குளிர்','hot – cold'],['நல்ல','கெட்ட','good – bad'],['முன்','பின்','front – back'],['புதிய','பழைய','new – old']] },
    { id:'gender', ta:'ஆண்பால் – பெண்பால்', en:'Male and female words',
      explain:'அவன் = he, அவள் = she. Many male words end in ன், female words in ள் or இ.',
      cols:['Male (ஆண்பால்)','Female (பெண்பால்)','Meaning'], rows:g3('gender').rows.slice(0, 7) },
    { id:'thisthese', ta:'இது – இவை, அது – அவை', en:'This / these, that / those',
      explain:'இது (idhu) = this, இவை (ivai) = these. அது (adhu) = that, அவை (avai) = those. When the word changes to "many", add கள் too.',
      cols:['One','Many','Meaning'], taCols:2,
      rows:[['இது மரம்.','இவை மரங்கள்.','This is a tree. → These are trees.'],['அது நாய்.','அவை நாய்கள்.','That is a dog. → Those are dogs.'],
            ['இது பழம்.','இவை பழங்கள்.','This is a fruit. → These are fruits.'],['அது பறவை.','அவை பறவைகள்.','That is a bird. → Those are birds.'],
            ['இது பூ.','இவை பூக்கள்.','This is a flower. → These are flowers.']] },
    g3('question')
  ];

  DATA.c2.poems = [ p(DATA.c1.poems, 'amma'), p(DATA.c3.poems, 'aathichoodi'), p(DATA.c1.poems, 'kaiveesu'), p(DATA.c3.poems, 'nila'),
    { id:'kural', ta:'திருக்குறள்', en:'Thirukkural (first verses)', about:'Two easy kurals that children learn first.', lines:p(DATA.c3.poems, 'kural').lines.slice(0, 2) } ];

  DATA.c2.stories = [
    { id:'lion', ta:'சிங்கமும் எலியும்', en:'The lion and the mouse',
      lines:[['ஒரு காட்டில் ஒரு சிங்கம் தூங்கிக்கொண்டிருந்தது.','A lion was sleeping in a forest.'],
        ['ஒரு எலி சிங்கத்தின் மேல் ஓடியது.','A mouse ran over the lion.'],
        ['சிங்கம் கோபத்துடன் எலியைப் பிடித்தது.','The lion angrily caught the mouse.'],
        ['"என்னை விட்டுவிடு, நான் உனக்கு உதவுவேன்" என்றது எலி.','"Let me go, I will help you," said the mouse.'],
        ['சிங்கம் சிரித்துக்கொண்டே எலியை விட்டது.','The lion laughed and let the mouse go.'],
        ['ஒரு நாள் சிங்கம் வலையில் மாட்டிக்கொண்டது.','One day the lion got caught in a net.'],
        ['எலி வலையைக் கடித்து சிங்கத்தைக் காப்பாற்றியது.','The mouse bit the net and saved the lion.']],
      moral:['யாரையும் சிறியவர் என்று நினைக்காதே.','Never think anyone is too small to help.'],
      questions:[['சிங்கம் என்ன செய்துகொண்டிருந்தது?','What was the lion doing?','தூங்கிக்கொண்டிருந்தது.','It was sleeping.'],
        ['சிங்கம் எதில் மாட்டிக்கொண்டது?','What did the lion get caught in?','வலையில்.','In a net.'],
        ['சிங்கத்தை யார் காப்பாற்றியது?','Who saved the lion?','எலி.','The mouse.']] },
    p(DATA.c3.stories, 'crow')
  ];
})();
