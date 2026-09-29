# mūdo (ムード)

> **Your music says more than you think.**  
> *あなたの音楽が、すべてを語る。*

mūdo is an interactive, cinematic Spotify music-analysis experience with a Japanese-inspired aesthetic. A user connects their Spotify account, chooses a listening range, and mūdo retrieves permitted Spotify data, analyzes their listening profile using deterministic information-theory algorithms, and presents an immersive spatial visual story explaining their musical habits, exploration style, genre profile, artist preferences, and an original **Music Archetype**.

This is **NOT** a music streaming application. mūdo does not stream audio, implement playback controls, or use the Spotify Web Playback SDK. It is purely an analysis, editorial storytelling, and spatial visualization experience.

---

## 1. Key Features

- **Cinematic Studio Storytelling**: Physically enter a futuristic music studio. Scroll from a dark hallway through an opening 3D studio door into the production room where a master curved monitor boots and analyzes your music.
- **Scroll-Driven Animation Architecture**: Powered by **GSAP**, **ScrollTrigger**, and **Lenis** smooth scrolling. Fully reversible—scrubbing up and down transitions fluidly across all 9 scenes.
- **Official Spotify OAuth 2.0 with PKCE**: Cryptographically secure, browser-based Proof Key for Code Exchange (RFC 7636). Zero client secret in frontend code.
- **Pure Deterministic Local Analyzer**: Zero calls to external LLMs or generative AI. All metrics and insight narratives are derived from information-theory algorithms and predefined templates.
- **Rich Demo Mode**: Explore instantly without Spotify credentials using 4 synthetic listening personas:
  - *The Sonic Explorer* (high genre entropy across 10+ genres)
  - *The Loyal Anchor* (deep artist devotion & discography loyalty)
  - *The Seasonal Nomad* (dramatic temporal shift from rock to minimal techno)
  - *The After-Hours Sleeper* (nocturnal downtempo, ambient, and spatial acoustics)
- **Zero-Cost Application Model**: 100% frontend-first / static / serverless architecture compatible with free hosting on Vercel. No databases, subscriptions, or paid API dependencies.

---

## 2. Supported Listening Ranges

EchoFlow interfaces strictly with Spotify's official top-items time horizons:

| UI Horizon | Spotify API Parameter | Timeframe Window |
|---|---|---|
| **LAST MONTH** | `short_term` | Approximately the last 4 weeks |
| **LAST 6 MONTHS** | `medium_term` | Approximately the last 6 months |
| **LAST YEAR** | `long_term` | Approximately 1 year of listening |

*Note: Spotify's API exposes affinity ranking over these specific windows, not arbitrary calendar date ranges or play-count ledgers.*

---

## 3. The 8 Original EchoFlow Archetypes

EchoFlow classifies listeners into 8 original archetypes based on a 7-dimensional normalized profile:

1. **THE EXPLORER**: Endless Horizons & Boundary Crosser. High curiosity, high genre entropy, rapid artist rotation.
2. **THE ANCHOR**: Devoted Core & Deep Resonance. Deep loyalty to favorite discographies and high emotional consistency.
3. **THE NOMAD**: Rapid Evolution & Shifting Seasons. Dynamic listening phases that reinvent themselves over time.
4. **THE AFTER-HOURS**: Nocturnal Pulse & Atmospheric Submersion. Enveloping ambient soundscapes, downtempo, and textured production.
5. **THE ECLECTIC**: Polymorphic Taste & Omnivorous Curiosity. Seamless balance across contrasting genres with high catalog breadth.
6. **THE FOCUSED**: Architectural Intent & Pure Cohesion. Disciplined sonic signatures calibrated for flow states.
7. **THE ROMANTIC**: Lyrical Depth & Emotive Architecture. Deep resonance with songwriting, melody, and narrative.
8. **THE WANDERER**: Uncharted Drift & Boundless Solitude. Spontaneous navigation through deep catalog cuts and hidden tracks.

If two archetypes score within an 8-point margin, EchoFlow awards a **Primary Archetype** with a **Secondary Influence** (e.g. *The Explorer with an After-Hours influence*).

---

## 4. Mathematical Foundations & Algorithm Complexity

EchoFlow's pure algorithm module (`src/features/analyzer/`) is independent of React and runs in Node.js, browsers, or edge workers.

### 4.1 Normalized Shannon Entropy (Genre Diversity)
Quantifies the uncertainty and spread of genre distributions:
$$H(X) = -\sum_{i=1}^{n} p(x_i) \log_2 p(x_i)$$
Normalized against the theoretical maximum entropy $H_{\max} = \log_2(n)$:
$$\text{GenreDiversity} = \left(\frac{H(X)}{\log_2(n)}\right) \times 100 \quad \in [0, 100]$$
- **Complexity**: $O(n)$ where $n$ is the number of active genre families ($n \le 16$).

### 4.2 Herfindahl-Hirschman Index (Concentration)
Quantifies artist and genre concentration:
$$\text{HHI} = \sum_{i=1}^{n} (p(x_i))^2$$
$$\text{Normalized HHI} = \left(\frac{\text{HHI} - \frac{1}{n}}{1 - \frac{1}{n}}\right) \times 100 \quad \in [0, 100]$$

### 4.3 Total Variation Distance (Temporal Period Shift)
Measures the divergence between two probability distributions $P$ (recent) and $Q$ (baseline):
$$\text{TVD}(P, Q) = \frac{1}{2} \sum_{i} |P(i) - Q(i)|$$
$$\text{RecentChangeScore} = \text{TVD}(P, Q) \times 100 \quad \in [0, 100]$$

### 4.4 Exploration Score Formula
$$\text{Exploration} = \text{GenreDiversity} \times 0.35 + \text{ArtistDiversity} \times 0.35 + \text{CatalogDiversity} \times 0.15 + \text{RecentChange} \times 0.15$$

### 4.5 Algorithmic Complexity Summary
- **Genre Aggregation**: $O(A \cdot G)$ where $A \approx 50$ (artists) and $G \approx 3$ (genres per artist).
- **Category Sorting**: $O(K \log K)$ where $K \le 16$ unique genre families.
- **Archetype Classification**: $O(M \cdot D)$ where $M = 8$ archetypes and $D = 7$ dimensions ($56$ operations).

---

## 5. Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5 (Strict mode)
- **UI Library**: React 19
- **Styling**: Tailwind CSS, Glassmorphic CSS with fallbacks
- **Animation**: GSAP 3, ScrollTrigger, Lenis Smooth Scroll
- **Icons**: Lucide React
- **Testing**: Node.js Native Test Runner with `tsx`

---

## 6. Architecture

```text
src/
├── app/
│   ├── callback/        # Spotify OAuth PKCE redirect handler
│   ├── globals.css      # Custom utilities, theme variables & scrollbar
│   ├── layout.tsx       # Root layout with responsive viewport & noindex SEO
│   └── page.tsx         # Master application orchestrator
├── components/
│   ├── glass/           # GlassCard, GlassButton, GlassPill, GlassMetric
│   ├── studio/          # StudioDoor, StudioEnvironment, MonitorBoot, StudioTimeline
│   ├── visualizations/  # UniverseView, GenreVisualization, ArtistVisualization, etc.
│   └── PrivacyModal.tsx # Transparent privacy disclosure
├── features/
│   ├── analyzer/        # Pure deterministic mathematical engine (Zero React deps)
│   └── spotify/         # PKCE generator, auth manager, rate-limiting API client
├── data/
│   ├── archetypes.ts    # 8 Archetype definitions and visual profiles
│   ├── demo-data.ts     # 4 Synthetic listening personas
│   ├── genre-map.ts     # Transparent classification dictionary
│   └── weights.ts       # Deterministic scoring rules
├── styles/
│   ├── glass.css        # Backdrop blur fallbacks & glass utilities
│   └── studio.css       # 3D perspective, monitor frame, scanlines & CRT glow
└── types/
    └── index.ts         # TypeScript interfaces and domain types
```

---

## 7. Spotify OAuth Setup Guide

### 7.1 Create a Spotify Developer App
1. Visit the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Click **Create an App**.
3. Name your app **EchoFlow** and add a description.
4. Under **Redirect URIs**, add:
   ```text
   http://localhost:3000/callback
   ```
   *(For production, also add your deployed URL, e.g. `https://your-app.vercel.app/callback`)*.
5. In **Which API/SDKs are you planning to use?**, check **Web API**.
6. Save your settings and copy your **Client ID**.

> [!IMPORTANT]
> **Never copy or use the Client Secret.** EchoFlow uses OAuth 2.0 PKCE, which executes securely directly inside the user's browser without requiring or exposing a secret.

### 7.2 Spotify Development Mode Restrictions
Spotify Web API apps created in Development Mode can only authenticate accounts registered in the app's **Users and Access** list in the Spotify Developer Dashboard (up to 25 users). If other users attempt to log in before Spotify approves extension quota, Spotify returns an `access_denied (403)` error.
**EchoFlow's Demo Mode provides complete access to all features and visualizations without requiring a registered Spotify account.**

### 7.3 Minimum Scopes Used
EchoFlow requests only read-only scopes necessary for analysis:
- `user-top-read`: Top tracks and artists affinity
- `user-read-recently-played`: Supplementary recent listening signal
- `user-read-private`: Public display name

---

## 8. Local Development

### 8.1 Clone and Install
```bash
git clone <repo-url>
cd ElementalAura
npm install
```

### 8.2 Configure Environment Variables
Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
```
*(If left blank, the app will prompt you to use Demo Mode)*.

### 8.3 Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 8.4 Run Unit Tests
```bash
npm test
```
Executes the test suite covering entropy math, deterministic classification, archetype scoring, and persona evaluations.

### 8.5 Production Build
```bash
npm run build
npm run start
```

---

## 9. Privacy & Security Design

- **No Long-Term Storage**: Data is kept in transient browser memory / `sessionStorage` during the active session.
- **No Database**: EchoFlow does not maintain a database of listening habits.
- **No External LLM/AI Processing**: User listening content is never transmitted to OpenAI, Anthropic, or external language models.
- **No Audio Playback**: EchoFlow does not stream or cache audio files.
- **SEO Protection**: Protected with `<meta name="robots" content="noindex,nofollow,noarchive">`.

---

## 10. Deployment

EchoFlow is built to run on free static/serverless hosting such as **Vercel**:
1. Push your repository to GitHub / GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. Set `NEXT_PUBLIC_SPOTIFY_CLIENT_ID` and `NEXT_PUBLIC_SPOTIFY_REDIRECT_URI` in the Vercel Environment Variables dashboard.
4. Deploy with one click.
