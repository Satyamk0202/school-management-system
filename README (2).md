# ABC School Management Website

A multi-page school website for admissions, student records, achievements and alumni, with a built-in assistant chatbot.

**Built with:** HTML, CSS, JavaScript, jQuery, Bootstrap 4.6 (loaded from CDN, so an internet connection is needed).

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home page with quick links |
| `adm.html` | Admission application form |
| `registration.html` | Register a student |
| `search.html` | Search students by name, roll number or class; delete records |
| `student-list.html` | Sortable student table, class counts, CSV export |
| `login.html` | Demo sign-in screen (not secure, see Limitations) |
| `q4.html` | Achievement gallery (carousel) |
| `page1.html`, `page2.html`, `page3.html` | Individual achievement pages |
| `q5.html` | Alumni cards |

## Shared files

- `style.css`: site-wide styles.
- `nav.js`: header, navbar and footer shared by every page. Edit the `links` list at the top to add or rename menu items.
- `chatbot.js`: floating assistant widget, loaded automatically by `nav.js`.

## Images

Included: `pic1.jpeg` to `pic5.jpeg` (alumni photos).

**Add these yourself** (the pages show an "Image coming soon" placeholder until you do):
`image.jpeg` (dance cup), `image2.jpeg` (English olympiad), `image3.jpeg` (cricket cup).

## Running locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Going live

Upload the whole folder to any static host, such as Netlify, GitHub Pages, Vercel or your own web hosting. `index.html` is the home page. File names are lowercase; hosts are case-sensitive, so keep them that way.

## Configuration

1. **Admission form emails:** create a free endpoint (for example at Formspree) and paste its URL into `var ENDPOINT = ""` near the bottom of `adm.html`. Until then, submitted applications are discarded after showing a success message.
2. **AI chatbot:** by default the bot answers from a built-in FAQ. For real AI answers, set `AI_ENDPOINT` at the top of `chatbot.js` to your own server URL. That server calls the Claude API and returns `{"reply": "..."}`. Never place an API key in any file in this folder; browser code is public.
3. **Chatbot answers:** edit the `FAQ` list in `chatbot.js` to match your school's real information (fees, timings, contact details).
4. **School name and year:** change "ABC School" in `nav.js` and the page titles. The footer year updates automatically.

## Limitations (read before launching)

- **Student data is stored in the visitor's own browser** (`localStorage`). Each device sees only its own records, and clearing browser data deletes them. A live system needs a backend and database.
- **Login is a demo.** It accepts any username and password and protects nothing. Real authentication requires a server.
- **Student records are personal data.** Don't collect real children's information on this site until it has a secure backend and, where required, a privacy policy and parental consent process.
- The alumni names and bios are placeholders. Replace them with real, consented information.

## Browser support

Current versions of Chrome, Edge, Firefox and Safari, on desktop and mobile.
