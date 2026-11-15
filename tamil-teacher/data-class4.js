/* Lesson content for Class 4 Tamil. Reuses Class 3 word lists and adds new ones. */
DATA.c4 = {};
(function () {
  function t3(id) { return DATA.c3.topics.filter(function (t) { return t.id === id; })[0]; }
  function g3(id) { return DATA.c3.grammar.filter(function (g) { return g.id === id; })[0]; }
  function p3(id) { return DATA.c3.poems.filter(function (x) { return x.id === id; })[0]; }
  function s3(id) { return DATA.c3.stories.filter(function (x) { return x.id === id; })[0]; }

  DATA.c4.topics = [
    { id:'jobs', ta:'தொழில்கள்', en:'People and their work', words:[
      ['ஆசிரியர்','teacher','🧑‍🏫'],['மருத்துவர்','doctor','🧑‍⚕️'],['செவிலியர்','nurse','👩‍⚕️'],['விவசாயி','farmer','🧑‍🌾'],
      ['காவலர்','police officer','👮'],['ஓட்டுநர்','driver','🚌'],['தச்சர்','carpenter','🪚'],['தையல்காரர்','tailor','🧵'],
      ['மீனவர்','fisherman','🎣'],['அஞ்சல்காரர்','postman','📮'],['சமையல்காரர்','cook','🧑‍🍳'],['வீரர்','soldier / player','🎖️']]},
    { id:'transport', ta:'வாகனங்கள்', en:'Vehicles', words:[
      ['பேருந்து','bus','🚌'],['மிதிவண்டி','bicycle','🚲'],['மகிழுந்து','car','🚗'],['தொடர்வண்டி','train','🚆'],
      ['வானூர்தி','aeroplane','✈️'],['கப்பல்','ship','🚢'],['படகு','boat','⛵'],['மாட்டுவண்டி','bullock cart','🐂'],['ஆட்டோ','autorickshaw','🛺']]},
    { id:'festivals', ta:'பண்டிகைகள்', en:'Festivals', words:[
      ['பொங்கல்','Pongal','🍚'],['தீபாவளி','Deepavali','🪔'],['சித்திரைப் புத்தாண்டு','Tamil New Year','🌸'],['கார்த்திகை தீபம்','Karthigai Deepam','🕯️'],
      ['விநாயகர் சதுர்த்தி','Vinayagar Chathurthi','🐘'],['கிறிஸ்துமஸ்','Christmas','🎄'],['ரம்ஜான்','Ramzan','🌙'],['சுதந்திர தினம்','Independence Day','🇮🇳']]},
    { id:'feelings', ta:'உணர்வுகள்', en:'Feelings', words:[
      ['மகிழ்ச்சி','happiness','😀'],['கோபம்','anger','😠'],['பயம்','fear','😨'],['வருத்தம்','sadness','😢'],
      ['ஆச்சரியம்','surprise','😲'],['அன்பு','love','❤️'],['வெட்கம்','shyness','😊'],['பொறுமை','patience','🧘']]},
    { id:'directions', ta:'திசைகளும் இடங்களும்', en:'Directions and places', words:[
      ['கிழக்கு','east','➡️'],['மேற்கு','west','⬅️'],['வடக்கு','north','⬆️'],['தெற்கு','south','⬇️'],
      ['வலது','right','👉'],['இடது','left','👈'],['அருகில்','near','📍'],['தொலைவில்','far','🔭'],
      ['கடை','shop','🏪'],['மருத்துவமனை','hospital','🏥'],['கோயில்','temple','🛕'],['நூலகம்','library','📚']]},
    t3('family'), t3('body'), t3('numbers'), t3('animals'), t3('birds'), t3('fruits'), t3('vegetables'),
    t3('days'), t3('months'), t3('school'), t3('nature'), t3('verbs')
  ];

  DATA.c4.phrases = DATA.c3.phrases.concat([
    ['நீ எந்த வகுப்பில் படிக்கிறாய்?','Which class are you studying in?'],
    ['நான் நான்காம் வகுப்பில் படிக்கிறேன்.','I am studying in the fourth class.'],
    ['உனக்குப் பிடித்த பாடம் எது?','Which is your favourite subject?'],
    ['பாடத்தை உன் சொந்த வாக்கியத்தில் சொல்.','Tell the lesson in your own words.']
  ]);

  DATA.c4.grammar = [
    g3('noun'), g3('verb'),
    { id:'adjective', ta:'பெயரடை', en:'Describing words for things (Adjectives)',
      explain:'A பெயரடை tells us more about a naming word: what kind, what colour, what size. Ask: "What kind of ___?"',
      cols:['Phrase','Meaning'],
      rows:[['அழகான பூ','a beautiful flower'],['பெரிய யானை','a big elephant'],['சிவப்பு ரோஜா','a red rose'],['உயரமான மரம்','a tall tree'],
            ['இனிப்பான மாம்பழம்','a sweet mango'],['சிறிய பறவை','a small bird'],['புதிய புத்தகம்','a new book'],['நல்ல பையன்','a good boy']] },
    { id:'adverb', ta:'வினையடை', en:'Describing words for actions (Adverbs)',
      explain:'A வினையடை tells us how an action is done. Most end in -ஆக (-aaga). Ask: "How did he do it?"',
      cols:['Phrase','Meaning'],
      rows:[['வேகமாக ஓடினான்','ran fast'],['மெதுவாக நடந்தாள்','walked slowly'],['நன்றாகப் படித்தான்','studied well'],['சத்தமாகச் சிரித்தாள்','laughed loudly'],
            ['அமைதியாக உட்கார்','sit quietly'],['அழகாக எழுதினாள்','wrote beautifully'],['மெல்லப் பேசு','speak softly']] },
    { id:'pal', ta:'பால்', en:'Five kinds of gender (பால்)',
      explain:'Tamil sorts words into five groups: ஆண்பால் (one man), பெண்பால் (one woman), பலர்பால் (many people), ஒன்றன்பால் (one animal or thing), பலவின்பால் (many animals or things).',
      cols:['Word','Kind','Meaning'], taCols:2,
      rows:[['அவன்','ஆண்பால்','he'],['அவள்','பெண்பால்','she'],['அவர்கள்','பலர்பால்','they (people)'],['அது','ஒன்றன்பால்','it'],['அவை','பலவின்பால்','they (things)'],
            ['மாணவன்','ஆண்பால்','boy student'],['மாணவி','பெண்பால்','girl student'],['மாணவர்கள்','பலர்பால்','students'],['மரம்','ஒன்றன்பால்','tree'],['மரங்கள்','பலவின்பால்','trees']] },
    g3('number'),
    { id:'opposite', ta:'எதிர்ச்சொல்', en:'Opposite words',
      explain:'Say one word, the child says the opposite. Class 4 tests often ask for these.',
      cols:['Word','Opposite','Meaning'],
      rows:g3('opposite').rows.concat([['அன்பு','வெறுப்பு','love – hate'],['உண்மை','பொய்','truth – lie'],['ஏழை','பணக்காரன்','poor – rich'],
            ['சுறுசுறுப்பு','சோம்பல்','active – lazy'],['அருகில்','தொலைவில்','near – far'],['தொடக்கம்','முடிவு','beginning – end']]) },
    { id:'synonym', ta:'ஒருபொருள் தரும் பல சொற்கள்', en:'Words with the same meaning',
      explain:'Tamil has many words for the same thing. Tests ask for one more word with the same meaning.',
      cols:['Word','Same meaning','Meaning'],
      rows:g3('synonym').rows.concat([['யானை','களிறு','elephant'],['மலை','குன்று','hill / mountain'],['மேகம்','முகில்','cloud'],['வானம்','விண்','sky'],['கடல்','ஆழி','sea']]) },
    { id:'split', ta:'பிரித்து எழுதுதல்', en:'Splitting joined words',
      explain:'Many Tamil words are two words joined together. Split them to understand the meaning. Sometimes a letter changes when they join, like மரம் + கிளை = மரக்கிளை.',
      cols:['Joined word','Split','Meaning'], taCols:2,
      rows:[['பூந்தோட்டம்','பூ + தோட்டம்','flower garden'],['மரக்கிளை','மரம் + கிளை','branch of a tree'],['பள்ளிக்கூடம்','பள்ளி + கூடம்','school building'],
            ['தாய்மொழி','தாய் + மொழி','mother tongue'],['பனிமலை','பனி + மலை','snow mountain'],['நீர்நிலை','நீர் + நிலை','water body'],['கடற்கரை','கடல் + கரை','seashore']] },
    { id:'tense', ta:'காலம்', en:'Tense (past, present, future)', explain:g3('tense').explain, cols:g3('tense').cols,
      rows:g3('tense').rows.concat([['அவர்கள் வந்தார்கள்','அவர்கள் வருகிறார்கள்','அவர்கள் வருவார்கள்'],['அது பறந்தது','அது பறக்கிறது','அது பறக்கும்']]),
      note:g3('tense').note + ' · They came / are coming / will come · It flew / is flying / will fly' },
    g3('question')
  ];

  DATA.c4.poems = [
    { id:'bharathi', ta:'ஓடி விளையாடு பாப்பா', en:'Odi vilaiyaadu paappaa by Bharathiyar',
      about:'A famous children\'s song by the poet Subramania Bharathiyar. It tells children to play, be active and be kind.',
      lines:[['ஓடி விளையாடு பாப்பா – நீ','Run and play, little one;'],['ஓய்ந்திருக்கலாகாது பாப்பா','you should not sit idle, little one.'],
        ['கூடி விளையாடு பாப்பா – ஒரு','Play together with others, little one;'],['குழந்தையை வையாதே பாப்பா','do not scold any child, little one.'],
        ['சின்னஞ் சிறு குருவி போலே – நீ','Like a tiny little sparrow,'],['திரிந்து பறந்து வா பாப்பா','wander and fly around, little one.'],
        ['வண்ணப் பறவைகளைக் கண்டு – நீ','When you see colourful birds,'],['மனதில் மகிழ்ச்சி கொள்ளு பாப்பா','be happy in your heart, little one.']] },
    { id:'kural', ta:'திருக்குறள்', en:'Thirukkural by Thiruvalluvar',
      about:'Each kural has two lines. Class 4 children learn these by heart and explain the meaning.',
      lines:p3('kural').lines.concat([
        ['தொட்டனைத் தூறும் மணற்கேணி மாந்தர்க்குக்\nகற்றனைத் தூறும் அறிவு.','The deeper you dig a sand well, the more water comes; the more you learn, the more knowledge grows. (Kural 396)'],
        ['செய்யாமல் செய்த உதவிக்கு வையகமும்\nவானகமும் ஆற்றல் அரிது.','Help given without any earlier help in return is worth more than the earth and the sky. (Kural 101)'],
        ['உடுக்கை இழந்தவன் கைபோல ஆங்கே\nஇடுக்கண் களைவதாம் நட்பு.','True friendship rushes to help in trouble, like a hand that catches a slipping cloth. (Kural 788)']]) },
    { id:'kondrai', ta:'கொன்றை வேந்தன்', en:'Kondrai Vendhan by Avvaiyar (selected lines)',
      about:'More one-line advice by Avvaiyar, after Aathichoodi.',
      lines:[['அன்னையும் பிதாவும் முன்னறி தெய்வம்','Mother and father are the first gods we know.'],
        ['ஆலயம் தொழுவது சாலவும் நன்று','Praying at the temple is very good.'],
        ['ஊக்கமுடைமை ஆக்கத்திற்கு அழகு','Enthusiasm is what makes progress beautiful.'],
        ['எண்ணும் எழுத்தும் கண்ணெனத் தகும்','Numbers and letters are like our eyes.'],
        ['ஏவா மக்கள் மூவா மருந்து','Children who help without being told are a precious medicine.']] },
    { id:'proverbs', ta:'பழமொழிகள்', en:'Tamil proverbs',
      about:'Old sayings with a lesson. Ask your child when each one could be used.',
      lines:[['சிறு துளி பெரு வெள்ளம்','Small drops make a big flood (little efforts add up).'],
        ['ஒற்றுமையே பலம்','Unity is strength.'],
        ['காலம் பொன் போன்றது','Time is like gold.'],
        ['இளமையில் கல்','Learn while you are young.'],
        ['கற்றது கைமண் அளவு, கல்லாதது உலகளவு','What we have learnt is a handful of sand; what we have not learnt is as big as the world.'],
        ['ஆழம் அறியாமல் காலை விடாதே','Do not step in without knowing the depth (think before you act).'],
        ['அளவுக்கு மிஞ்சினால் அமிர்தமும் நஞ்சு','Even nectar becomes poison when taken too much.']] },
    p3('aathichoodi')
  ];

  DATA.c4.stories = [
    { id:'woodcutter', ta:'நேர்மையான விறகுவெட்டி', en:'The honest woodcutter',
      lines:[['ஒரு ஊரில் ஒரு ஏழை விறகுவெட்டி இருந்தான்.','A poor woodcutter lived in a village.'],
        ['ஒரு நாள் அவன் ஆற்றங்கரையில் மரம் வெட்டிக்கொண்டிருந்தான்.','One day he was cutting a tree on the river bank.'],
        ['அவனுடைய கோடரி ஆற்றில் விழுந்துவிட்டது.','His axe fell into the river.'],
        ['அவன் வருத்தத்துடன் அழுதான்.','He cried sadly.'],
        ['அப்போது ஒரு தேவதை தோன்றி, ஒரு தங்கக் கோடரியைக் காட்டியது.','Then a fairy appeared and showed him a golden axe.'],
        ['"இது என்னுடையது இல்லை" என்றான் விறகுவெட்டி.','"This is not mine," said the woodcutter.'],
        ['பிறகு ஒரு வெள்ளிக் கோடரியைக் காட்டியது. அதையும் அவன் வேண்டாம் என்றான்.','Then it showed a silver axe. He said no to that too.'],
        ['கடைசியில் இரும்புக் கோடரியைக் காட்டியதும், "இதுதான் என்னுடையது" என்றான்.','At last it showed the iron axe, and he said, "This is mine."'],
        ['அவனுடைய நேர்மையைப் பாராட்டி, தேவதை மூன்று கோடரிகளையும் கொடுத்தது.','Praising his honesty, the fairy gave him all three axes.']],
      moral:['நேர்மையே சிறந்த கொள்கை.','Honesty is the best policy.'],
      questions:[['விறகுவெட்டியின் கோடரி எங்கே விழுந்தது?','Where did the woodcutter\'s axe fall?','ஆற்றில் விழுந்தது.','Into the river.'],
        ['தேவதை முதலில் எந்தக் கோடரியைக் காட்டியது?','Which axe did the fairy show first?','தங்கக் கோடரியைக் காட்டியது.','A golden axe.'],
        ['தேவதை ஏன் மூன்று கோடரிகளையும் கொடுத்தது?','Why did the fairy give all three axes?','அவனுடைய நேர்மைக்காக.','Because he was honest.']] },
    { id:'ant', ta:'எறும்பும் புறாவும்', en:'The ant and the dove',
      lines:[['ஒரு எறும்பு தண்ணீர் குடிக்க ஆற்றுக்குச் சென்றது.','An ant went to the river to drink water.'],
        ['அது தவறி ஆற்றில் விழுந்தது.','It slipped and fell into the river.'],
        ['மரத்தின் மேல் இருந்த ஒரு புறா அதைப் பார்த்தது.','A dove sitting in a tree saw it.'],
        ['புறா ஒரு இலையைப் பறித்து ஆற்றில் போட்டது.','The dove plucked a leaf and dropped it into the river.'],
        ['எறும்பு இலையின் மேல் ஏறிக் கரைக்கு வந்தது.','The ant climbed onto the leaf and reached the bank.'],
        ['சில நாட்கள் கழித்து, ஒரு வேடன் புறாவைக் குறி வைத்தான்.','A few days later, a hunter aimed at the dove.'],
        ['எறும்பு வேடனின் காலில் கடித்தது.','The ant bit the hunter\'s leg.'],
        ['வேடனின் குறி தவறியது. புறா பறந்து தப்பியது.','The hunter missed, and the dove flew away safely.']],
      moral:['உதவி செய்தால் உதவி கிடைக்கும்.','If you help others, you will get help.'],
      questions:[['எறும்பு எங்கே விழுந்தது?','Where did the ant fall?','ஆற்றில் விழுந்தது.','Into the river.'],
        ['புறா எறும்புக்கு எப்படி உதவியது?','How did the dove help the ant?','இலையை ஆற்றில் போட்டது.','It dropped a leaf into the river.'],
        ['எறும்பு யாரைக் கடித்தது?','Whom did the ant bite?','வேடனைக் கடித்தது.','The hunter.']] },
    s3('race')
  ];
})();
