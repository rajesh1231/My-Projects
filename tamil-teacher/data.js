/* Lesson content for Class 3 Tamil (second language).
   Tanglish is generated automatically from the Tamil by translit.js,
   so every line here only needs the Tamil text and the English meaning. */
var DATA = {};

DATA.uyir = [
  ['அ','a','short "a", like the u in "cup"','அம்மா','mother'],
  ['ஆ','aa','long "aa", like the a in "father"','ஆடு','goat'],
  ['இ','i','short "i", like the i in "sit"','இலை','leaf'],
  ['ஈ','ee','long "ee", like the ee in "see"','ஈ','housefly'],
  ['உ','u','short "u", like the u in "put"','உப்பு','salt'],
  ['ஊ','oo','long "oo", like the oo in "moon"','ஊஞ்சல்','swing'],
  ['எ','e','short "e", like the e in "egg"','எலி','rat'],
  ['ஏ','ē','long "ae", like the a in "cake"','ஏணி','ladder'],
  ['ஐ','ai','"ai", like the word "eye"','ஐந்து','five'],
  ['ஒ','o','short "o", like the o in "omit"','ஒட்டகம்','camel'],
  ['ஓ','ō','long "o", like the oa in "boat"','ஓநாய்','wolf'],
  ['ஔ','au','"au", like the ow in "cow"','ஔவையார்','the poet Avvaiyar']
];

DATA.mei = [
  ['க்','k','"k" as in kite. In the middle of a word it softens to "g"','கல்','stone'],
  ['ங்','ng','"ng" as in sing','சிங்கம்','lion'],
  ['ச்','ch','"s" at the start of a word, "ch" when doubled, "j" after ஞ்','சட்டை','shirt'],
  ['ஞ்','nj','"ny" as in canyon','ஞாயிறு','Sunday / sun'],
  ['ட்','t','hard "t" with the tongue curled back, as in top. "d" in the middle of a word','படம்','picture'],
  ['ண்','N','"n" with the tongue curled back (hard n)','கண்','eye'],
  ['த்','th','soft "t" with the tongue touching the teeth. "dh" in the middle of a word','தண்ணீர்','water'],
  ['ந்','n','"n" as in nose (used at the start of words)','நாய்','dog'],
  ['ப்','p','"p" as in pen. "b" in the middle of a word','பந்து','ball'],
  ['ம்','m','"m" as in mango','மரம்','tree'],
  ['ய்','y','"y" as in yes','யானை','elephant'],
  ['ர்','r','light "r" as in run','ரோஜா','rose'],
  ['ல்','l','"l" as in lamp (tongue behind the teeth)','இலை','leaf'],
  ['வ்','v','"v" as in van','வீடு','house'],
  ['ழ்','zh','special Tamil sound: curl the tongue back and say "r" softly, as in Tamizh','பழம்','fruit'],
  ['ள்','L','"l" with the tongue curled back (hard l)','வாள்','sword'],
  ['ற்','R','strong rolled "r". Doubled ற்ற sounds "tr"','கறி','curry'],
  ['ன்','n','"n" as in sun (used in the middle and end of words)','மான்','deer']
];

DATA.uyirmeiCons = ['க','ங','ச','ஞ','ட','ண','த','ந','ப','ம','ய','ர','ல','வ','ழ','ள','ற','ன'];
DATA.uyirmeiBase = ['k','ng','ch','nj','t','N','th','n','p','m','y','r','l','v','zh','L','R','n'];
DATA.uyirmeiSigns = ['','ா','ி','ீ','ு','ூ','ெ','ே','ை','ொ','ோ','ௌ'];
DATA.uyirmeiVowel = ['a','aa','i','ee','u','oo','e','ē','ai','o','ō','au'];

/* Word topics: [Tamil, English, picture] */
DATA.topics = [
  { id:'family', ta:'குடும்பம்', en:'Family', words:[
    ['அம்மா','mother','👩'],['அப்பா','father','👨'],['அண்ணன்','elder brother','👦'],['அக்கா','elder sister','👧'],
    ['தம்பி','younger brother','👦'],['தங்கை','younger sister','👧'],['தாத்தா','grandfather','👴'],['பாட்டி','grandmother','👵'],
    ['மாமா','uncle (mother\'s brother)','🧔'],['அத்தை','aunt (father\'s sister)','👩'],['குழந்தை','baby / child','👶'],['குடும்பம்','family','👨‍👩‍👧‍👦']]},
  { id:'body', ta:'உடல் உறுப்புகள்', en:'Parts of the body', words:[
    ['தலை','head','🙂'],['முடி','hair','💇'],['கண்','eye','👁️'],['காது','ear','👂'],['மூக்கு','nose','👃'],['வாய்','mouth','👄'],
    ['பல்','tooth','🦷'],['நாக்கு','tongue','👅'],['கை','hand','✋'],['விரல்','finger','☝️'],['கால்','leg','🦵'],['வயிறு','stomach','🫃']]},
  { id:'colours', ta:'நிறங்கள்', en:'Colours', words:[
    ['சிவப்பு','red','🔴'],['பச்சை','green','🟢'],['மஞ்சள்','yellow','🟡'],['நீலம்','blue','🔵'],['வெள்ளை','white','⚪'],
    ['கருப்பு','black','⚫'],['ஆரஞ்சு','orange','🟠'],['ஊதா','purple','🟣'],['இளஞ்சிவப்பு','pink','🌸'],['பழுப்பு','brown','🟤']]},
  { id:'numbers', ta:'எண்கள்', en:'Numbers', words:[
    ['ஒன்று','one (1)','1'],['இரண்டு','two (2)','2'],['மூன்று','three (3)','3'],['நான்கு','four (4)','4'],['ஐந்து','five (5)','5'],
    ['ஆறு','six (6)','6'],['ஏழு','seven (7)','7'],['எட்டு','eight (8)','8'],['ஒன்பது','nine (9)','9'],['பத்து','ten (10)','10'],
    ['பதினொன்று','eleven (11)','11'],['பன்னிரண்டு','twelve (12)','12'],['பதின்மூன்று','thirteen (13)','13'],['பதினான்கு','fourteen (14)','14'],
    ['பதினைந்து','fifteen (15)','15'],['பதினாறு','sixteen (16)','16'],['பதினேழு','seventeen (17)','17'],['பதினெட்டு','eighteen (18)','18'],
    ['பத்தொன்பது','nineteen (19)','19'],['இருபது','twenty (20)','20'],['ஐம்பது','fifty (50)','50'],['நூறு','hundred (100)','100']]},
  { id:'animals', ta:'விலங்குகள்', en:'Animals', words:[
    ['நாய்','dog','🐕'],['பூனை','cat','🐈'],['பசு','cow','🐄'],['யானை','elephant','🐘'],['சிங்கம்','lion','🦁'],['புலி','tiger','🐅'],
    ['குரங்கு','monkey','🐒'],['குதிரை','horse','🐎'],['ஆடு','goat','🐐'],['முயல்','rabbit','🐇'],['மான்','deer','🦌'],['கரடி','bear','🐻'],
    ['எலி','rat','🐀'],['ஒட்டகம்','camel','🐫'],['ஆமை','tortoise','🐢'],['பாம்பு','snake','🐍']]},
  { id:'birds', ta:'பறவைகள்', en:'Birds', words:[
    ['காகம்','crow','🐦‍⬛'],['கிளி','parrot','🦜'],['மயில்','peacock','🦚'],['புறா','pigeon','🕊️'],['கோழி','hen','🐔'],
    ['வாத்து','duck','🦆'],['குருவி','sparrow','🐦'],['ஆந்தை','owl','🦉'],['கழுகு','eagle','🦅'],['பறவை','bird','🐤']]},
  { id:'fruits', ta:'பழங்கள்', en:'Fruits', words:[
    ['மாம்பழம்','mango','🥭'],['வாழைப்பழம்','banana','🍌'],['ஆப்பிள்','apple','🍎'],['ஆரஞ்சு','orange','🍊'],['திராட்சை','grapes','🍇'],
    ['பலாப்பழம்','jackfruit','🍈'],['கொய்யாப்பழம்','guava','🍐'],['மாதுளை','pomegranate','🍎'],['தர்பூசணி','watermelon','🍉'],
    ['அன்னாசி','pineapple','🍍'],['தேங்காய்','coconut','🥥'],['பழம்','fruit','🍓']]},
  { id:'vegetables', ta:'காய்கறிகள்', en:'Vegetables', words:[
    ['கத்தரிக்காய்','brinjal','🍆'],['வெண்டைக்காய்','lady\'s finger','🫛'],['தக்காளி','tomato','🍅'],['உருளைக்கிழங்கு','potato','🥔'],
    ['வெங்காயம்','onion','🧅'],['கேரட்','carrot','🥕'],['முருங்கைக்காய்','drumstick','🥢'],['பூசணிக்காய்','pumpkin','🎃'],
    ['கீரை','spinach / greens','🥬'],['மிளகாய்','chilli','🌶️'],['வெள்ளரிக்காய்','cucumber','🥒'],['பூண்டு','garlic','🧄']]},
  { id:'days', ta:'கிழமைகள்', en:'Days of the week', words:[
    ['ஞாயிற்றுக்கிழமை','Sunday','☀️'],['திங்கட்கிழமை','Monday','🌙'],['செவ்வாய்க்கிழமை','Tuesday','🔴'],['புதன்கிழமை','Wednesday','🟢'],
    ['வியாழக்கிழமை','Thursday','🟡'],['வெள்ளிக்கிழமை','Friday','⚪'],['சனிக்கிழமை','Saturday','⚫'],
    ['நேற்று','yesterday','⬅️'],['இன்று','today','📍'],['நாளை','tomorrow','➡️']]},
  { id:'months', ta:'தமிழ் மாதங்கள்', en:'Tamil months', words:[
    ['சித்திரை','Chithirai (Apr–May)','1'],['வைகாசி','Vaikasi (May–Jun)','2'],['ஆனி','Aani (Jun–Jul)','3'],['ஆடி','Aadi (Jul–Aug)','4'],
    ['ஆவணி','Aavani (Aug–Sep)','5'],['புரட்டாசி','Purattasi (Sep–Oct)','6'],['ஐப்பசி','Aippasi (Oct–Nov)','7'],['கார்த்திகை','Karthigai (Nov–Dec)','8'],
    ['மார்கழி','Margazhi (Dec–Jan)','9'],['தை','Thai (Jan–Feb)','10'],['மாசி','Maasi (Feb–Mar)','11'],['பங்குனி','Panguni (Mar–Apr)','12']]},
  { id:'school', ta:'பள்ளியும் வீடும்', en:'School and home', words:[
    ['பள்ளி','school','🏫'],['ஆசிரியர்','teacher','🧑‍🏫'],['மாணவன்','student (boy)','👦'],['மாணவி','student (girl)','👧'],
    ['புத்தகம்','book','📖'],['எழுதுகோல்','pen','🖊️'],['பை','bag','🎒'],['கரும்பலகை','blackboard','🖤'],
    ['வீடு','house','🏠'],['கதவு','door','🚪'],['ஜன்னல்','window','🪟'],['நாற்காலி','chair','🪑'],['மேசை','table','🛋️'],['தண்ணீர்','water','💧']]},
  { id:'nature', ta:'இயற்கை', en:'Nature', words:[
    ['சூரியன்','sun','☀️'],['நிலா','moon','🌙'],['நட்சத்திரம்','star','⭐'],['வானம்','sky','🌌'],['மழை','rain','🌧️'],
    ['மேகம்','cloud','☁️'],['காற்று','wind / air','🌬️'],['மரம்','tree','🌳'],['பூ','flower','🌼'],['இலை','leaf','🍃'],
    ['ஆறு','river','🏞️'],['கடல்','sea','🌊'],['மலை','mountain','⛰️'],['காடு','forest','🌲']]},
  { id:'verbs', ta:'செயல் சொற்கள்', en:'Action words', words:[
    ['வா','come','👋'],['போ','go','🚶'],['உட்கார்','sit','🪑'],['எழுந்திரு','get up / stand up','🧍'],['சாப்பிடு','eat','🍽️'],
    ['குடி','drink','🥛'],['படி','read / study','📖'],['எழுது','write','✍️'],['ஓடு','run','🏃'],['தூங்கு','sleep','😴'],
    ['விளையாடு','play','⚽'],['பார்','see / look','👀'],['பேசு','speak','🗣️'],['கேள்','listen / ask','👂'],['பாடு','sing','🎵'],['ஆடு','dance','💃']]}
];

/* Useful sentences for talking with the child: [Tamil, English] */
DATA.phrases = [
  ['வணக்கம்','Hello / Namaste'],
  ['நன்றி','Thank you'],
  ['உன் பெயர் என்ன?','What is your name?'],
  ['என் பெயர் மீனா.','My name is Meena.'],
  ['எப்படி இருக்கிறாய்?','How are you?'],
  ['நான் நன்றாக இருக்கிறேன்.','I am fine.'],
  ['இது என்ன?','What is this?'],
  ['அது என்ன?','What is that?'],
  ['புத்தகத்தை எடு.','Take out the book.'],
  ['சத்தமாகப் படி.','Read aloud.'],
  ['மீண்டும் சொல்.','Say it again.'],
  ['நன்றாக எழுது.','Write neatly.'],
  ['வீட்டுப்பாடம் செய்தாயா?','Did you do your homework?'],
  ['சாப்பிட்டாயா?','Did you eat?'],
  ['மிகவும் நன்று!','Very good!'],
  ['இன்று பள்ளியில் என்ன படித்தாய்?','What did you study in school today?']
];

/* Grammar topics usually taught in Class 3 */
DATA.grammar = [
  { id:'noun', ta:'பெயர்ச்சொல்', en:'Naming words (Nouns)',
    explain:'A பெயர்ச்சொல் is the name of a person, place, animal or thing. Ask the child: "Is it a name of something?"',
    cols:['Word','Meaning'],
    rows:[['ராமு','Ramu (a name)'],['சென்னை','Chennai (a place)'],['யானை','elephant'],['மேசை','table'],['பூ','flower'],['பள்ளி','school']] },
  { id:'verb', ta:'வினைச்சொல்', en:'Action words (Verbs)',
    explain:'A வினைச்சொல் tells what someone does. Act it out with the child and ask them to say the word.',
    cols:['Word','Meaning'],
    rows:[['ஓடு','run'],['படி','read'],['எழுது','write'],['சாப்பிடு','eat'],['பாடு','sing'],['தூங்கு','sleep']] },
  { id:'number', ta:'ஒருமை – பன்மை', en:'One and many (Singular / Plural)',
    explain:'To say "many", add கள் (gal / kal) at the end. If the word ends in ம், change ம் to ங்கள். If it ends in a long sound like பூ or பசு, add க்கள்.',
    cols:['One (ஒருமை)','Many (பன்மை)','Meaning'],
    rows:[['மரம்','மரங்கள்','tree → trees'],['பழம்','பழங்கள்','fruit → fruits'],['புத்தகம்','புத்தகங்கள்','book → books'],
          ['நாய்','நாய்கள்','dog → dogs'],['கை','கைகள்','hand → hands'],['பறவை','பறவைகள்','bird → birds'],
          ['பூ','பூக்கள்','flower → flowers'],['பசு','பசுக்கள்','cow → cows']] },
  { id:'opposite', ta:'எதிர்ச்சொல்', en:'Opposite words',
    explain:'Say one word, the child says the opposite. This is a common question in Class 3 exams.',
    cols:['Word','Opposite','Meaning'],
    rows:[['பெரிய','சிறிய','big – small'],['நல்ல','கெட்ட','good – bad'],['பகல்','இரவு','day – night'],['மேலே','கீழே','up – down'],
          ['உள்ளே','வெளியே','inside – outside'],['முன்','பின்','front – back'],['புதிய','பழைய','new – old'],['வெற்றி','தோல்வி','win – loss'],
          ['இன்பம்','துன்பம்','happiness – sorrow'],['வெளிச்சம்','இருட்டு','light – darkness'],['சூடு','குளிர்','hot – cold'],['வா','போ','come – go']] },
  { id:'gender', ta:'ஆண்பால் – பெண்பால்', en:'Male and female words',
    explain:'Many male words end in ன் and female words end in ள் or இ. அவன் = he, அவள் = she, அவர் = he/she (respectful).',
    cols:['Male (ஆண்பால்)','Female (பெண்பால்)','Meaning'],
    rows:[['அவன்','அவள்','he – she'],['மாணவன்','மாணவி','boy student – girl student'],['சிறுவன்','சிறுமி','boy – girl'],
          ['அண்ணன்','அக்கா','elder brother – elder sister'],['தம்பி','தங்கை','younger brother – younger sister'],
          ['அப்பா','அம்மா','father – mother'],['தாத்தா','பாட்டி','grandfather – grandmother'],['அரசன்','அரசி','king – queen']] },
  { id:'pronoun', ta:'சுட்டுப் பெயர்கள்', en:'Pronouns (I, you, he, she…)',
    explain:'These words replace names. நீ is for friends and younger people; நீங்கள் is for elders and for many people.',
    cols:['Word','Meaning'],
    rows:[['நான்','I'],['நாங்கள்','we'],['நீ','you'],['நீங்கள்','you (respect / many)'],['அவன்','he'],['அவள்','she'],
          ['அவர்','he / she (respect)'],['அது','it / that'],['இது','this'],['அவர்கள்','they']] },
  { id:'question', ta:'வினாச் சொற்கள்', en:'Question words',
    explain:'Use these to ask questions about a lesson. Most end with an "e" or "ee" sound.',
    cols:['Word','Meaning'],
    rows:[['என்ன?','what?'],['எங்கே?','where?'],['எப்போது?','when?'],['ஏன்?','why?'],['யார்?','who?'],['எப்படி?','how?'],['எத்தனை?','how many?'],['எது?','which?']] },
  { id:'tense', ta:'காலம்', en:'Tense (past, present, future)',
    explain:'இறந்தகாலம் = past (already happened), நிகழ்காலம் = present (happening now), எதிர்காலம் = future (will happen).',
    cols:['Past','Present','Future'],
    rows:[['நான் படித்தேன்','நான் படிக்கிறேன்','நான் படிப்பேன்'],['அவன் ஓடினான்','அவன் ஓடுகிறான்','அவன் ஓடுவான்'],
          ['அவள் பாடினாள்','அவள் பாடுகிறாள்','அவள் பாடுவாள்'],['நாங்கள் விளையாடினோம்','நாங்கள் விளையாடுகிறோம்','நாங்கள் விளையாடுவோம்']],
    note:'Meanings: I read / am reading / will read · He ran / is running / will run · She sang / is singing / will sing · We played / are playing / will play' },
  { id:'synonym', ta:'ஒருபொருள் தரும் பல சொற்கள்', en:'Words with the same meaning',
    explain:'Tamil has many words for the same thing. Textbooks often ask for one more word with the same meaning.',
    cols:['Word','Same meaning','Meaning'],
    rows:[['சூரியன்','கதிரவன்','sun'],['நிலா','சந்திரன்','moon'],['வீடு','இல்லம்','house'],['தண்ணீர்','நீர்','water'],
          ['பூ','மலர்','flower'],['கண்','விழி','eye'],['அம்மா','தாய்','mother'],['அப்பா','தந்தை','father']] }
];

/* Poems and verses: lines of [Tamil, English] */
DATA.poems = [
  { id:'aathichoodi', ta:'ஆத்திசூடி', en:'Aathichoodi by Avvaiyar',
    about:'Short one-line advice, one for each Tamil vowel, written by the poet Avvaiyar. Children learn these by heart in the early classes.',
    lines:[['அறம் செய விரும்பு','Love doing good deeds.'],['ஆறுவது சினம்','Anger should cool down.'],
      ['இயல்வது கரவேல்','Do not hide what you are able to give.'],['ஈவது விலக்கேல்','Do not stop others from giving.'],
      ['உடையது விளம்பேல்','Do not show off what you own.'],['ஊக்கமது கைவிடேல்','Never give up your enthusiasm.'],
      ['எண் எழுத்து இகழேல்','Never look down on numbers and letters (learning).'],['ஏற்பது இகழ்ச்சி','Begging is shameful.'],
      ['ஐயம் இட்டு உண்','Share food with the needy before you eat.'],['ஒப்புரவு ஒழுகு','Live in harmony with everyone.'],
      ['ஓதுவது ஒழியேல்','Never stop learning.'],['ஔவியம் பேசேல்','Do not speak with jealousy.'],
      ['அஃகம் சுருக்கேல்','Do not cheat when measuring grain.']] },
  { id:'kural', ta:'திருக்குறள்', en:'Thirukkural by Thiruvalluvar',
    about:'Each kural has two lines. These are the most famous ones that children learn first.',
    lines:[['அகர முதல எழுத்தெல்லாம் ஆதி\nபகவன் முதற்றே உலகு.','Just as "அ" is the first of all letters, God is the first of the world. (Kural 1)'],
      ['கற்க கசடறக் கற்பவை கற்றபின்\nநிற்க அதற்குத் தக.','Learn well and without mistakes, then live by what you have learnt. (Kural 391)'],
      ['எண்ணென்ப ஏனை எழுத்தென்ப இவ்விரண்டும்\nகண்ணென்ப வாழும் உயிர்க்கு.','Numbers and letters are like two eyes for every living person. (Kural 392)'],
      ['இனிய உளவாக இன்னாத கூறல்\nகனியிருப்பக் காய்கவர்ந் தற்று.','Speaking harsh words when sweet words are there is like eating raw fruit when ripe fruit is there. (Kural 100)']] },
  { id:'nila', ta:'நிலா நிலா ஓடி வா', en:'Moon, moon, come running (rhyme)',
    about:'A favourite Tamil nursery rhyme. Sing it together with actions.',
    lines:[['நிலா நிலா ஓடி வா','Moon, moon, come running.'],['நில்லாமல் ஓடி வா','Come running without stopping.'],
      ['மலை மேலே ஏறி வா','Climb up over the mountain and come.'],['மல்லிகைப் பூ கொண்டு வா','Bring jasmine flowers with you.']] }
];

/* Short reading stories: lines of [Tamil, English] */
DATA.stories = [
  { id:'crow', ta:'காகமும் பானையும்', en:'The thirsty crow',
    lines:[['ஒரு காகத்திற்கு மிகவும் தாகமாக இருந்தது.','A crow was very thirsty.'],
      ['அது தண்ணீர் தேடிப் பறந்தது.','It flew around looking for water.'],
      ['ஒரு பானையில் கொஞ்சம் தண்ணீர் இருந்தது.','There was a little water in a pot.'],
      ['காகத்தின் அலகு தண்ணீரை எட்டவில்லை.','The crow\'s beak could not reach the water.'],
      ['காகம் சிறிய கற்களைப் பானையில் போட்டது.','The crow dropped small stones into the pot.'],
      ['தண்ணீர் மேலே வந்தது.','The water came up.'],
      ['காகம் தண்ணீரைக் குடித்து மகிழ்ந்தது.','The crow drank the water happily.']],
    moral:['முயற்சி திருவினையாக்கும்.','Effort brings success.'],
    questions:[['காகத்திற்கு என்ன ஆனது?','What happened to the crow?','அதற்குத் தாகமாக இருந்தது.','It was thirsty.'],
      ['பானையில் என்ன இருந்தது?','What was in the pot?','கொஞ்சம் தண்ணீர் இருந்தது.','A little water.'],
      ['காகம் பானையில் என்ன போட்டது?','What did the crow put in the pot?','சிறிய கற்களைப் போட்டது.','Small stones.']] },
  { id:'race', ta:'முயலும் ஆமையும்', en:'The rabbit and the tortoise',
    lines:[['ஒரு காட்டில் ஒரு முயலும் ஒரு ஆமையும் இருந்தன.','A rabbit and a tortoise lived in a forest.'],
      ['முயல் வேகமாக ஓடும்.','The rabbit runs fast.'],
      ['ஆமை மெதுவாக நடக்கும்.','The tortoise walks slowly.'],
      ['ஒரு நாள் இரண்டும் ஓட்டப்பந்தயம் வைத்தன.','One day the two of them had a race.'],
      ['முயல் வேகமாக ஓடி, ஒரு மரத்தடியில் தூங்கியது.','The rabbit ran fast and then slept under a tree.'],
      ['ஆமை நிற்காமல் நடந்து கொண்டே இருந்தது.','The tortoise kept walking without stopping.'],
      ['கடைசியில் ஆமை வெற்றி பெற்றது.','In the end, the tortoise won.']],
    moral:['விடாமுயற்சி வெற்றி தரும்.','Never giving up brings success.'],
    questions:[['காட்டில் யார் இருந்தார்கள்?','Who lived in the forest?','முயலும் ஆமையும் இருந்தன.','A rabbit and a tortoise.'],
      ['முயல் எங்கே தூங்கியது?','Where did the rabbit sleep?','மரத்தடியில் தூங்கியது.','Under a tree.'],
      ['யார் வெற்றி பெற்றது?','Who won?','ஆமை வெற்றி பெற்றது.','The tortoise.']] }
];

if (typeof module !== 'undefined') module.exports = DATA;
