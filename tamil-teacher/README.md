# Amma's Tamil Class

A small website that helps a parent who cannot read Tamil teach Class 3 Tamil (CBSE, second language; works for Sri Chaitanya and similar schools).

Every Tamil word is shown with **Tanglish** (Tamil in English letters) and the **English meaning**, and can be heard aloud using the device's Tamil voice.

## Sections
- **Start here** – how to teach, how to read Tanglish, a weekly plan
- **Letters** – 12 vowels, 18 consonants, full 216-letter uyirmei chart
- **Words** – 13 topics (family, body, colours, numbers 1–100, animals, birds, fruits, vegetables, days, Tamil months, school, nature, action words) plus everyday phrases
- **Grammar** – nouns, verbs, singular/plural, opposites, male/female, pronouns, question words, tenses, synonyms
- **Poems & stories** – Aathichoodi, Thirukkural, Nila Nila rhyme, two short stories with questions
- **Practice** – three quiz games and a letter-tracing board
- **Homework helper** – paste any Tamil text (e.g. copied from the textbook with Google Lens) and get Tanglish line by line, audio and a meaning link

## Use it
- Open `tamil-class-single-file.html` in any browser (one file, works offline except fonts), or
- Host the folder with GitHub Pages and open `index.html`.

Edit lessons in `data.js` (Tanglish is generated automatically by `translit.js`), then run `./build.sh` to rebuild `index.html` and the single-file version.

## Hosting at study.techrajesh.com
The workflow `.github/workflows/tamil-site.yml` publishes this folder with GitHub Pages whenever it changes on `master`.
1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Same page, **Custom domain**: `study.techrajesh.com` → Save, then tick **Enforce HTTPS** once it is offered.
3. At the domain's DNS provider add a record: type `CNAME`, name `study`, value `rajesh1231.github.io`.
