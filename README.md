# BSHD x ClimateFeatures x Internews Network
## Biodiversity and Environmental Reporting Module: "Strengthening Reporting on Biodiversity Loss, Environmental Degradation, and Sustainable Solutions"

---

### Institutional Overview & Project Background

**"Strengthening Reporting on Biodiversity Loss, Environmental Degradation, and Sustainable Solutions"** is an interactive, long-form digital training curriculum engineered specifically for working journalists, editors, and media organizations across Botswana.

#### Why This Module Exists
Botswana is currently experiencing severe biodiversity loss and environmental degradation driven by shifting climatic regimes, pollution, land use conversion, and natural resource overexploitation. Across the country, this degradation manifests as the drying of historic river basins (such as the Boteti and Thamalakane), localized desertification, flash flooding, and disruptions to fragile rangelands. These compounding pressures have intensified human-wildlife conflict along agricultural corridors, altered wildlife migration patterns, diminished nature's capacity to sustain communal livelihoods, and driven localized human displacement.

Despite the urgency of these ecological shifts, comprehensive newsroom audits and media research indicate that many working journalists in Botswana lack specialized technical training in biodiversity reporting. Furthermore, media houses often operate without dedicated financial or technical resources to cover environmental complexity beyond sporadic, reactive breaking news. **This training module exists to close that critical institutional and pedagogical gap.**

#### The Collaborating Partners
*   **Botswana Society for Human Development (BSHD):** A leading national non-governmental organization in Botswana dedicated to sustainable human development, community resilience, youth empowerment, and environmental stewardship under Project Lead **Sharon Tshipa**. BSHD serves as the overseeing organization and primary implementer of this initiative.
*   **ClimateFeatures:** A specialized environmental journalism and communication platform dedicated to elevating climate science, biodiversity storytelling, and data-driven reporting across African newsrooms, led by Module Development Lead **Baboki Kayawe**.
*   **Internews Network:** An international non-profit media development organization supporting independent journalism in over 100 countries. Internews provides vital financial and technical support to ensure that local journalists have the training and resources needed to report accurately on environmental crises.

---

### Access Restriction Status (`Working Progress — Unlisted`)

#### 1. Current Access Restriction Strategy
While the curriculum content is undergoing final review by BSHD, ClimateFeatures, and academic contributors from BUAN and UB, this website is deployed as an **Unlisted Working Progress Version** and must **not** be open access or discoverable by the general public.

To enforce this restriction without blocking internal institutional review, the following three-tier mechanism is built directly into the site architecture:
1.  **Search Engine Crawler Block (`robots.txt`):** A strict root-level `robots.txt` file disallows all web crawlers from indexing any path on the site (`User-agent: * \n Disallow: /`).
2.  **Noindex Meta Tags:** Every individual HTML page contains `<meta name="robots" content="noindex, nofollow">` within its `<head>` section, ensuring that search engines like Google, Bing, and Yahoo will not index or display the site in public search results.
3.  **Persistent Warning Banner:** A prominent, styled top banner appears on every page (`#wp-banner`) with a pulsing amber warning indicator alerting visitors that the resource is an unlisted institutional draft not intended for public distribution.

#### 2. Important Security Limitation Notice (`Public GitHub Pages vs. True Access Control`)
**Please Note:** Hosting a site on **GitHub Pages via a free public repository (`sunji-droid/bshd-biodiversity-module`) is not truly private or access-controlled.**
While `<meta name="robots" content="noindex, nofollow">` tags and `robots.txt` rules effectively prevent search engines from discovering or listing the site, **anyone who is given the exact direct URL can open and view the pages without a password or authentication barrier.**

If BSHD or project partners require **guaranteed, absolute access restriction** during the review phase (where uninvited users are blocked by a login screen or password prompt), one of the following technical solutions must be implemented:
*   **Option A (GitHub Private Repository + Paid Plan):** Upgrade the GitHub repository to private and utilize a paid GitHub Enterprise/Team plan that allows GitHub Pages deployments from private repositories with GitHub user authentication.
*   **Option B (External Static Hosting with Password Protection):** Deploy the static repository files to a modern static hosting platform (such as **Vercel**, **Netlify**, or **Cloudflare Pages**) and enable **Password Protection / Basic Authentication** across the deployment preview URL.

---

### Go-Live Checklist (Launching Publicly)

When Sharon Tshipa (BSHD) and project partners confirm that all final content has been dropped in and the module is ready for its official, public open-access launch, follow this simple **4-Step Go-Live Checklist**:

1.  **Remove the `noindex, nofollow` Meta Tags:**
    Open every HTML file (`index.html`, `foreword.html`, `unit1.html`, etc.) and delete or comment out the following line inside the `<head>`:
    ```html
    <!-- Remove this line: -->
    <meta name="robots" content="noindex, nofollow">
    ```
2.  **Update `robots.txt` to Allow Indexing:**
    Open `/robots.txt` at the root directory and replace the `Disallow: /` rule with a public crawler allowance:
    ```txt
    User-agent: *
    Allow: /
    Sitemap: https://sunji-droid.github.io/bshd-biodiversity-module/sitemap.xml
    ```
3.  **Hide or Remove the Working Progress Banner:**
    Open `/assets/css/style.css` and add `display: none !important;` to the `#wp-banner` rule:
    ```css
    #wp-banner {
      display: none !important; /* Module officially launched */
    }
    ```
    *(Alternatively, delete the `<div id="wp-banner">...</div>` HTML block from the pages).*
4.  **Generate and Add `sitemap.xml`:**
    Create a `sitemap.xml` file listing all 13 top-level `.html` pages and place it at the root of the repository so Google and other search engines can index the full curriculum immediately upon launch.

---

### Full Folder and File Structure Tree

```text
bshd-biodiversity-module/
│
├── index.html                 # Section 01: Home & Overview
├── foreword.html              # Section 02: Foreword (BSHD Leadership)
├── partners.html              # Section 03: Main Project Partners Profiles
├── disclaimer.html            # Section 04: Legal Disclaimer & Terms of Use
├── attribution.html           # Section 05: Attribution & Contributors Credits
├── glossary.html              # Section 06: Searchable Glossary of Terms
├── unit1.html                 # Section 07: Unit 1 — Global Biodiversity Status
├── unit2.html                 # Section 08: Unit 2 — Botswana Biodiversity Issues
├── unit3.html                 # Section 09: Unit 3 — Climate Change & SD Nexus
├── unit4.html                 # Section 10: Unit 4 — Reporting Practice & Lenses
├── unit5.html                 # Section 11: Unit 5 — The Story Clinic (Case Studies)
├── closing-reflection.html    # Section 12: Closing Reflection & Checklist
├── project-partners.html      # Section 13: Closing Acknowledgments & Credits
├── print-module.html          # Compiled Full Module Printable View (for PDF export)
├── robots.txt                 # Search engine crawler directives (currently Disallow: /)
├── README.md                  # Comprehensive technical documentation (this file)
│
└── assets/
    ├── css/
    │   └── style.css          # Master stylesheet (Theme variables, responsiveness, print rules)
    ├── js/
    │   ├── search-data.js     # Unified search index across all 13 sections and subsections
    │   └── app.js             # Core JS (Theme toggle, sidebar accordion, progress tracker, search modal)
    └── images/
        ├── BSHD NGO Logo.jpg          # Official BSHD Black & Gold Logo
        ├── Main Logo-01.png           # Official ClimateFeatures Logo (Light background)
        ├── Main Logo-01.jpg           # Official ClimateFeatures Logo (Alternate JPG format)
        ├── Alternative Logo-01.jpg    # Official ClimateFeatures Logo (Dark background)
        ├── internews-placeholder.svg  # Polished SVG placeholder for Internews Network logo slot
        └── favicon.svg                # Custom vector favicon (Sunburst leaf motif)
```

---

### Local Development & Testing Guide

Because this project is built using 100% plain HTML5, CSS3, and client-side ES6 JavaScript with zero backend or database dependencies, running and testing locally is fast and effortless.

#### 1. Running Locally
*   **Method 1 (Direct File Opening):** Double-click any `.html` file (e.g., `index.html`) to open it directly in your web browser (`file:///.../index.html`). All relative navigation links, search indexing, and theme toggling will function cleanly.
*   **Method 2 (Local Web Server - Recommended):** Open your terminal inside the project root and start a lightweight HTTP server:
    ```bash
    # Using Python 3:
    python3 -m http.server 8000
    
    # Or using Node.js http-server:
    npx http-server -p 8000
    ```
    Then navigate your browser to `http://localhost:8000`.

#### 2. Testing Key Interactive Features
Before pushing any changes to GitHub, verify that the following core features work correctly across desktop and mobile viewports:
*   **Search Engine Modal (`Ctrl+K` / `Cmd+K`):** Press `Ctrl+K` or click the search button in the top navigation. Type terms like *Okavango*, *DWNP*, *investigative*, or *Prof Kabou* to ensure instant fuzzy snippet matching.
*   **Reading Progress Tracker (`localStorage`):** Click the **"✔️ Mark Section Complete"** button on any unit or scroll past 40% of the page. Verify that a green checkmark appears next to that section inside the sidebar and that the header progress bar percentage increments accurately.
*   **Sidebar Accordion (`▶` button):** Click the arrow button next to **Unit 1**, **Unit 2**, or **Unit 4** in the sidebar to ensure that the sub-navigation lists (`#1-1`, `#2-1`, `#4-7`, etc.) expand and highlight correctly.
*   **Unit 5 Story Clinic Tabs:** Navigate to `unit5.html` and click the tabs (`1. Breaking News Lead`, `2. Explanatory Rewrite`, `3. Investigative Angle`, `4. Solutions Framework`) across the three case study cards to verify smooth tab switching.
*   **Theme Switcher (`☀️` / `🌙`):** Click the **Dark Canvas** / **Light Canvas** button in the header to confirm that the reading canvas smoothly toggles between high-contrast light editorial mode and dark institutional mode.
*   **Full Module PDF Compilation (`print-module.html`):** Click **"🖨️ Print Full Module"** in the top navigation and trigger your browser's print dialog (`Ctrl+P` / `Cmd+P`) to verify that all five units are compiled with clean page breaks and exact print-media formatting.

---

### GitHub Pages Deployment Guide

This project is tailored specifically for instant deployment on **GitHub Pages** under the designated repository: `sunji-droid/bshd-biodiversity-module`.

#### Step-by-Step Deployment Instructions
1.  **Create / Verify GitHub Repository:** Ensure that a repository named `bshd-biodiversity-module` exists under the GitHub account `sunji-droid` (`https://github.com/sunji-droid/bshd-biodiversity-module`).
2.  **Push Files to `main` Branch:**
    ```bash
    git init
    git add .
    git commit -m "Deploy complete BSHD x ClimateFeatures Biodiversity Reporting Module"
    git branch -M main
    git remote add origin https://github.com/sunji-droid/bshd-biodiversity-module.git
    git push -u origin main
    ```
3.  **Enable GitHub Pages in Repository Settings:**
    *   Navigate to your repository on GitHub.com and click **Settings** → **Pages** (in the left sidebar).
    *   Under **Build and deployment** → **Source**, select **Deploy from a branch**.
    *   Under **Branch**, select `main` and `/ (root)` folder, then click **Save**.
4.  **Verify Live URL:**
    Within 60 seconds, GitHub Pages will deploy the module live at:
    `https://sunji-droid.github.io/bshd-biodiversity-module/`
    *(Remember: Even once deployed, the site remains hidden from search engines due to the active `noindex` and `robots.txt` restrictions).*

---

### Content & Attribution Editing Guides

All pages in this repository have been built using a clean, modular HTML structure where section headers and paragraphs are clearly demarcated. Dropping in final copy from BSHD and academic partners requires **zero structural rebuilds**.

#### 1. Updating Unit or Subsection Content
1.  Open the target unit file inside your text editor (for example, `unit4.html` or `unit2.html`).
2.  Locate the specific subsection heading using its exact `id` or title (for example, `<h2 id="2-3">2.3 Botswana National Ecosystem Assessment (BUAN)</h2>`).
3.  Replace the text inside the surrounding `<p>...</p>` and `<ul>...</ul>` tags with the final approved copy from the client.
4.  If the new text contains important keywords or quotes that should be searchable via the global search modal, open `assets/js/search-data.js` and update the `content:` string corresponding to that `id`.

#### 2. Updating the Glossary (`glossary.html`)
When the final official list of Key Biodiversity Reporting Terms is supplied by BSHD:
1.  Open `glossary.html` and locate the `#glossary-terms-container` div (`<div id="glossary-terms-container" class="glossary-list">`).
2.  Add or replace individual term cards using this clean HTML template:
    ```html
    <div class="glossary-term-card" data-letter="E">
      <div class="glossary-term-header">
        <h3>Ecosystem Services</h3>
        <span class="glossary-tag">Resource Economics & Rights</span>
      </div>
      <p>
        Insert plain-language definition here...
      </p>
    </div>
    ```
    *(Ensure `data-letter="X"` matches the first letter of the term so alphabetical tab filtering works automatically).*
3.  Add the new term entry to `window.SEARCH_INDEX` inside `assets/js/search-data.js` so it appears in live modal search results.

#### 3. Adding New Contributor Names to Attribution Page (`attribution.html`)
To replace pending placeholder slots (such as those for Oxpeckers, DWNP, UNDP, or Peer Reviewers) when final names are supplied:
1.  Open `attribution.html` and locate the target institutional group (for example, `<div class="attribution-group"><h3>Oxpeckers Contributors...</h3>`).
2.  Replace the `[Oxpeckers Specialist Slot — Name Pending]` text and role inside the `<div class="contributor-item">...</div>` block with the contributor's full name, specific project role, and designation.
3.  Remove `style="border-style: dashed;"` from the contributor item so it renders with a solid border like finalized entries.

#### 4. Updating the Internews Network Logo Asset
When the official high-resolution vector or PNG logo for **Internews Network** is supplied:
1.  Save the new logo file inside `/assets/images/` as `internews-logo.png` or `internews-logo.svg`.
2.  Open `assets/css/style.css` or run a project-wide find and replace across all `.html` files, replacing `assets/images/internews-placeholder.svg` with the new logo path (`assets/images/internews-logo.png`).

---

### Credits & Acknowledgments

*   **Project Oversight & Lead:** Sharon Tshipa (`Botswana Society for Human Development — BSHD`)
*   **Module Development Lead:** Baboki Kayawe (`ClimateFeatures`)
*   **Academic & Technical Contributors:** Professor Wame Hambira, Professor Masamba, Professor Moalafhi (`BUAN National Ecosystem Assessment`) • Professor Olekae Thakadu (`Okavango Research Institute, University of Botswana`) • Professor Fadhel Kabou (`Global Institute for Sustainable Prosperity, Unit 4.7 Contributor`)
*   **Collaborating Institutions & Reviewers:** Department of Wildlife and National Parks (`DWNP`), Department of Forestry and Range Resources (`DFRR`), United Nations Development Programme (`UNDP Botswana`), and Oxpeckers Investigative Environmental Journalism.
*   **Supporting Media Network:** Internews Network (`Earth Journalism Network`)

---

### Build Credits

**Built by Kabo Merapelo Onamile for the Botswana Society for Human Development (BSHD), ClimateFeatures, and Internews Network.**

*Be alive, Be you.. • Elevating Environmental Journalism Across Botswana.*
