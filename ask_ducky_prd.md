# Ask Ducky — Product Requirements Document (PRD)

## Document status
Draft V1 for implementation

## Product summary
**Ask Ducky** is a mobile-first, share-first web toy inspired by Ente’s playful privacy branding and Ducky mascot. Users open the site, **shake their phone** (or tap a fallback button) to get a funny privacy-themed question, then **shake again** (or tap a fallback button) to reveal Ducky’s verdict. The result is presented as a polished, highly shareable card with:
- the question
- Ducky’s witty answer
- a short afterburn / punchline
- Ask Ducky branding
- a CTA and URL to try the web app

The product is not a serious privacy advisor. It is a **shareable entertainment experience with privacy-literate humor**.

---

## Why this should feel like Ente
Ente publicly presents its brand as privacy-first, end-to-end encrypted, and open source, while also embracing a playful duck mascot, **Ducky**. The official media kit includes mascot assets, brand casing guidance, icon, banners, and product screenshots. The public toys page also shows that Ente likes experimental, playful, lightweight projects, including **Privacy Pack**, **consent.gg**, and **Ducky Drip**, with several toys explicitly oriented around fast interaction and sharing. The story behind Ducky explains that the mascot became part of the brand through serendipity and deliberate embrace of playfulness rather than over-corporate seriousness.

### Source notes for implementation
Use the following as source-of-truth starting points:
- **Media kit**: official icon, mascot files, banners, screenshots, casing guidance
- **Toys page**: examples of Ente-style experiments and shareable utilities
- **Ducky story post**: mascot origin and brand personality context

Important:
- Use **current official Ducky assets from the media kit**
- Do **not** invent a different mascot style for V1
- Do **not** use old exploratory illustrations unless the Ente team explicitly approves

---

## Product goals

### Primary goal
Make users want to **share the result immediately**.

### Secondary goals
- Make the interaction feel playful and magical on mobile
- Create very high replayability through a large question/answer catalog
- Feel recognizably Ente-branded without becoming a corporate product page
- Be fast, lightweight, and easy to implement as a web app

### Success criteria
- A first-time user can get to a result in under 10 seconds
- The share CTA is the most visually prominent action on the result screen
- The shared card is attractive enough to stand on its own in social feeds and chats
- Repeated plays feel meaningfully different
- The app works well on mobile with shake as the primary interaction and tap as the fallback

---

## Non-goals
- Deep privacy education
- Personalized recommendations
- Account creation
- User-generated question input in V1
- Server-side user profiling or tracking-heavy growth loops
- Long-form onboarding
- “Chatbot” interaction style

---

## Core experience

### Core loop
1. User opens app
2. User **shakes phone** or taps **Get a question**
3. A random privacy question appears
4. User **shakes again** or taps **Reveal Ducky’s verdict**
5. A witty answer card animates in
6. Primary CTA is **Share**
7. Secondary CTA is **Ask again**

### Mobile interaction model
- **Primary interaction:** shake
- **Fallback interaction:** button
- **Desktop fallback:** click/tap buttons

### State model
#### State 1: Idle / landing
- Ask Ducky branding
- hero object / orb / duck-ball hybrid
- hint text: “Shake for a privacy question”
- fallback CTA: “Get a question”

#### State 2: Question revealed
- large question text
- hint text: “Shake for Ducky’s verdict”
- fallback CTA: “Reveal verdict”
- tertiary text/button: “New question”

#### State 3: Result / share
- question
- verdict
- afterburn line
- Ducky mood / pose / expression
- result card preview
- **primary CTA:** Share
- **secondary CTA:** Ask again
- tertiary CTA: Save image / Copy link (optional)

---

## Platform and technical scope

### Platform
- Mobile-first responsive web app
- Works well in Safari, Chrome, Firefox mobile
- Desktop support is nice, but mobile experience is the primary design target

### Recommended stack
- Next.js or another lightweight React framework
- Tailwind or a compact tokenized CSS system
- Canvas / SVG / DOM-to-image approach for share card generation
- Native Web Share API on supported devices
- Download image fallback when native share is unavailable
- Minimal or no backend for V1

### Privacy expectations
Because this is Ente-adjacent in spirit, the toy should visibly avoid creepy behavior.
- No login
- No required analytics SDKs
- No typing required
- No PII capture
- No upload required
- If analytics are used, prefer privacy-respecting aggregate analytics only

---

## Functional requirements

### FR1: Random question generation
The app must generate a random question from a large curated catalog.

Requirements:
- Question catalog should be grouped into categories
- Selection should avoid immediate repeats
- Selection should support weighted randomness
- Questions should be witty, specific, and modern

### FR2: Shake interaction
The app must support shake-based interaction on mobile.

Requirements:
- First shake reveals a question
- Second shake reveals the answer
- Motion threshold should be tuned to avoid accidental triggers
- If motion permission is blocked or unsupported, buttons must fully replace shake interaction

### FR3: Answer generation
The app must generate an answer set matched to the selected question’s category.

Each result should include:
- **verdict** (short, punchy)
- **afterburn** (smaller follow-up line)
- **Ducky mood**
- optional **practical nudge** (for some results)

### FR4: Share card generation
The app must generate a polished share card image.

The share asset must include:
- Ask Ducky branding
- question
- verdict
- afterburn
- Ducky visual / mood
- web app URL
- short call-to-action text

### FR5: Native sharing
The app must make sharing the default next action after reveal.

Requirements:
- Use native share sheet where available
- Include image + link if supported
- Fallback to:
  - save/download image
  - copy link
  - copy caption

### FR6: Repeat play
After sharing or dismissing share, user should be able to immediately try again.

Requirements:
- One-tap “Ask again”
- Prevent same question from repeating too often
- Quick animation reset

---

## Content system

## Content structure
Use a structured content model rather than a giant pool of fully handwritten single-use cards.

### Recommended schema
```json
{
  "categories": [
    {
      "id": "permissions",
      "name": "Permissions",
      "questions": [
        {
          "id": "perm_001",
          "text": "This flashlight app wants my contacts, microphone, and camera. Is it trying to illuminate my soul?",
          "severity": "high",
          "tags": ["app", "permissions", "mobile"]
        }
      ],
      "verdictPools": {
        "hard_no": ["Ducky says absolutely not."],
        "cautious_maybe": ["Only if you enjoy reading permissions like literature."],
        "yes": ["Suspiciously responsible. Approved."]
      },
      "afterburnPools": [
        "That request is doing entirely too much.",
        "Your data is not a sign-up bonus."
      ],
      "duckMoods": ["horrified", "side_eye", "judgey"]
    }
  ]
}
```

### Question categories for V1
1. App permissions
2. AI apps
3. Cloud storage
4. Photo sharing
5. Family/group sharing
6. Messaging
7. Passwords and passkeys
8. Phone numbers and signups
9. Public Wi‑Fi and travel
10. Links, albums, and backup behavior

### Quantity target for V1
- **180–250 questions**
- **80–120 verdicts**
- **60–80 afterburn lines**
- **6–8 Ducky moods**
- **12–20 share footer lines**

This document includes a **starter pack** big enough for implementation, prototyping, and content expansion.

### Content rules
- Questions should feel like situations people recognize
- Humor should come from specificity and privacy literacy
- Avoid obscure jargon in the question
- The verdict should be short enough to be screenshot-friendly
- The afterburn should add extra delight, not repeat the verdict
- Tone should be witty, not cruel
- Avoid making legal/safety promises
- Avoid impersonating real advice from Ente the company

---

## Tone and voice

### Desired tone
- witty
- internet-native
- privacy-literate
- slightly judgmental in a funny way
- playful, not corporate
- visually premium, verbally unserious

### Avoid
- preachy moralizing
- angry doomposting
- generic “Magic 8 Ball” language everywhere
- overlong explanations
- chatbot vibes
- fake certainty in high-stakes topics

### Tone ladder
Use these verdict families:
- **Hard No**
- **Cautious Maybe**
- **Approved / Strong Yes**
- **Chaos / Nerd mode**
- **Soft roast**

---

## UX and visual design notes

## Design priority
The result screen is the product.

If the result screen is not beautiful enough to screenshot and share, the app fails.

### Visual direction
The visual system should feel like:
- privacy-first
- dark and polished
- bold and minimal
- playful because of Ducky, not because of clutter
- premium enough to feel designed, toy-like enough to feel approachable

### Strong recommendation
Use a **dark visual base** and let Ducky / accent colors provide warmth and surprise.

### Layout principles
- Large typography
- Very few UI elements visible at once
- Strong vertical rhythm
- Lots of whitespace
- One obvious next action
- Motion with restraint
- Every screen should look screenshot-worthy

### Home / idle screen
Should include:
- Ask Ducky wordmark or text lockup
- duck-orb / privacy ball hero
- subtle motion
- one line of attitude-heavy copy
- shake hint
- fallback button

Suggested subtitle options:
- “Shake for a privacy verdict”
- “Privacy advice, badly delivered”
- “A judgmental duck for your digital life”
- “A magic 8-ball, but with boundaries”

### Question screen
- Question should dominate the viewport
- Question card may feel like a prompt suspended in anticipation
- Include tiny helper text, not extra navigation noise

### Result screen
Must include:
- question
- giant verdict
- smaller afterburn
- Ducky reaction
- strong share button
- ask again button

### Share card aesthetics
The share card should look like a collectible.

Recommended structure:
- top: Ask Ducky lockup
- middle: question
- center-weighted verdict in larger type
- bottom: afterburn + URL
- Ducky reaction integrated, not stuck on as clip art
- subtle texture / glow / grain allowed
- card should export cleanly for story/social use

### Motion design
Use animation to heighten ritual:
- idle float
- shake response
- reveal burst / blur / bounce
- subtle confetti is optional, but only if tasteful
- haptics on mobile when available

### Illustration / mascot guidance
Use official **Ducky** assets from Ente’s media kit. If multiple poses exist, map them to moods such as:
- smug
- horrified
- impressed
- suspicious
- disappointed
- chaotic

Do not redraw Ducky for V1 unless the Ente team explicitly wants a custom illustration pass.

### Color and style guidance
The official media kit page exposes mascot, icon, banners, and product screenshots, but does not publish a full token sheet inline. So the implementation should treat the **media kit assets and live Ente UI** as the source of truth for exact visual tokens.

Directionally:
- dark backgrounds should dominate
- bright Ente-style green should be reserved for key accents / success / brand moments
- warm duck yellows can be used sparingly inside the mascot art
- avoid rainbow novelty palette
- do not overuse gradients
- do not make it candy-like or childish

Implementation note:
- Derive exact production tokens from the official media kit assets and current website UI during design handoff
- One commonly cited Ente icon green is **#00BC45**, but because the current official media-kit page does not list hex values inline, treat asset extraction from official files as final source of truth

### Typography direction
- clean geometric / modern sans feel
- heavy display weight for verdicts
- readable medium-weight body for questions
- no ornamental novelty type
- strong contrast and large sizes on mobile

### Visual references inside Ente’s public ecosystem
Lean on the spirit of:
- the official media kit
- Ente’s current homepage product polish
- Toys projects that are fast, visual, and share-oriented
- Ducky Drip as evidence that Ducky can carry playful standalone experiences

---

## Brand implementation notes

### Naming
Primary product name:
**Ask Ducky**

### Casing
Use Ente’s official casing guidance from the media kit:
- Company: **Ente**
- Product: **Ente Photos**

For this toy:
- use **Ask Ducky** consistently
- avoid “ask ducky”, “ASK DUCKY”, or “Ente’s Ask Ducky” unless intentionally stylized in a logo treatment

### Branding rules
- Make it feel adjacent to Ente, not a cluttered microsite
- Keep branding light but recognizable
- Use official mascot and icon assets where needed
- Do not overload the page with product marketing copy

### Asset references for designers / engineers
Start with:
- official **Media Kit**
- **Mascot** section from the media kit
- **Banners** and **screenshots** for visual language
- **Ducky Drip** as reference for duck-centered playful interaction
- **Privacy Pack** as reference for share-oriented behavior

---

## Share strategy

## Share-first philosophy
The reveal screen should make sharing feel like the natural next step.

### Primary CTA
**Share this**

### Secondary CTA
**Ask again**

### Share outputs
#### A. Native share payload
- image
- link
- optional short text caption

#### B. Copyable share text
Example templates:
- “I asked Ducky a privacy question and got judged immediately.”
- “A duck just gave me better privacy advice than most apps.”
- “Shake your phone. Receive a privacy verdict.”
- “This duck has concerns. Try Ask Ducky.”

#### C. Story-friendly image
A vertical export should be supported eventually, but square/portrait-safe is acceptable for V1.

### Result uniqueness levers
To keep the app shareable and replayable:
- vary question
- vary verdict
- vary afterburn
- vary Ducky mood
- vary share footer line
- vary subtle visual treatment by category or mood

---

## Implementation notes for the agent

### Suggested folder structure
```txt
/app
  /data
    questions.json
    verdicts.json
    afterburns.json
    shareFooters.json
    brandTokens.json
  /components
    AskDuckyShell.tsx
    OrbHero.tsx
    QuestionCard.tsx
    ResultCard.tsx
    ShareCard.tsx
    DuckyMood.tsx
    MotionPermissionGate.tsx
  /lib
    randomize.ts
    shake.ts
    share.ts
    exportImage.ts
    contentEngine.ts
  /public
    /ducky
    /brand
```

### Content engine rules
- Select a category-weighted random question
- Select a verdict family based on question severity / tag
- Pull from category-specific verdicts first, then global verdicts
- Pull one afterburn line
- Pull one Ducky mood
- Pull one share footer
- Avoid exact repetition for at least the last 10 played results locally

### Local persistence
Use local storage only for:
- recent question IDs
- recent verdict IDs
- motion permission status if helpful
- last result for re-share recovery

### Share image export
Support at least:
- square format (safe default)
- vertical 9:16 safe zone-ready composition later

Export priorities:
1. native share with file if supported
2. native share with link + text
3. download PNG + copy caption
4. copy link fallback

### Motion notes
- Add a permission request affordance on iOS when required
- Tune threshold conservatively to avoid false triggers
- Debounce successive shakes
- Include a visible fallback button in every state

---

## Analytics and measurement
Keep analytics lightweight and privacy-respecting.

Track only aggregate product events if needed:
- app_open
- motion_permission_granted
- question_generated
- verdict_revealed
- share_attempted
- share_completed (if detectable)
- ask_again_clicked
- image_downloaded
- link_copied

Avoid:
- detailed user fingerprinting
- cross-site trackers
- invasive session replay

---

## Accessibility and resilience

### Accessibility
- All interactions must have tap/button fallback
- Shake must never be the only path
- Large text and high contrast
- Support reduced motion where possible
- Semantic buttons and keyboard-accessible desktop fallback
- Alt text for mascot illustrations where appropriate

### Resilience
- Motion permission denied: full app still works
- Web Share unsupported: image download + copy link fallback
- DOM-to-image failure: render plain fallback card
- No network: app should still work after initial load if bundled statically

---

## Risks
- Over-randomness can make answers feel irrelevant
- Weak visual design will kill shareability
- Too much humor without privacy literacy will feel generic
- Too much privacy seriousness will kill replayability
- A tiny catalog will make repeats obvious very quickly

### Mitigations
- Category-match answers to questions
- Use strong visual QA on the share card
- Add enough content before launch
- Weight question rotation to avoid obvious repeats
- Test share exports early

---

## Nice-to-have features after V1
- “Brutal mode” with harsher responses
- Category filter
- Daily question
- Deep links to exact results
- Regionalized content packs
- Seasonal Ducky moods
- Story-specific export templates
- Tiny “practical tip” mode toggle

---

## Acceptance criteria

### Product
- User can get to a question in one interaction
- User can get to a verdict in one more interaction
- User can share a result from the result screen
- User can immediately try another round

### Content
- At least 100 questions seeded for first internal prototype
- At least 60 verdicts
- At least 40 afterburn lines
- At least 6 Ducky moods
- Category-matched answer logic works

### Visual
- Result screen is polished enough for screenshots
- Share card includes brand, question, verdict, CTA, URL
- Mobile layout feels premium, not prototype-y

### Technical
- Works on modern mobile browsers
- Graceful fallback without motion permissions
- Share and save flows work

---

# Starter content pack

## Category list
- permissions
- ai_apps
- cloud_storage
- photo_sharing
- family_groups
- messaging
- passwords_passkeys
- signups_phone
- public_wifi_travel
- links_backups

---

## Ducky moods
```json
[
  "smug",
  "horrified",
  "side_eye",
  "impressed",
  "disappointed",
  "chaotic",
  "suspicious",
  "deeply_tired"
]
```

---

## Share footer lines
```json
[
  "Shake for a privacy verdict",
  "Privacy advice, badly delivered",
  "A judgmental duck for your digital life",
  "This duck has concerns",
  "Ask Ducky before you trust that app",
  "A magic 8-ball, but with boundaries",
  "Better boundaries. Smaller blast radius.",
  "The beak has spoken",
  "Privacy, but make it shareable",
  "Get judged. Try again."
]
```

---

## Verdict pack
```json
{
  "globalVerdicts": {
    "hard_no": [
      "Ducky says absolutely not.",
      "That is a no from the duck.",
      "No, and now I need a minute.",
      "Absolutely not, bestie.",
      "That app is asking for a lot on a first date.",
      "This feels like a future regret.",
      "Not everything needs your camera roll.",
      "That is not privacy. That is faith.",
      "No. Next question.",
      "Your threat model just filed a complaint.",
      "The beak rejects this plan.",
      "You are under-panicking.",
      "Respectfully: nope.",
      "This duck would like to unsubscribe.",
      "Delete the idea, not your standards.",
      "That request is spiritually suspicious.",
      "No, but thank you for your misplaced optimism.",
      "This is how data gets ideas.",
      "Hard pass. Soft concern.",
      "I have seen enough."
    ],
    "cautious_maybe": [
      "Maybe, but only with guardrails.",
      "Acceptable with paranoia.",
      "Proceed like someone who reads permissions.",
      "Yes, but squint at it first.",
      "Allowed under supervision.",
      "Maybe. Keep your blast radius small.",
      "Fine, but do not get comfortable.",
      "Proceed with tasteful suspicion.",
      "Only if you have backups and boundaries.",
      "Tentative quack of approval.",
      "Not terrible, but I am watching.",
      "Reasonable with constraints.",
      "You may proceed, but suspiciously.",
      "This passes, barely.",
      "Possible. I still have notes.",
      "Conditional yes. Read the fine print.",
      "A cautious duck nods.",
      "Okay, but keep one eye open.",
      "You can do this the smart way or the convenient way. Choose wisely.",
      "I will allow it, reluctantly."
    ],
    "approved": [
      "Suspiciously responsible. Approved.",
      "That'll do, duck.",
      "Approved by the beak.",
      "Privacy win detected.",
      "Finally, some taste.",
      "Look at you making sensible choices.",
      "This duck is impressed.",
      "Green light. Rare but deserved.",
      "That is how you keep your dignity and your data.",
      "Delightfully competent.",
      "You understood the assignment.",
      "Good boundaries. Strong work.",
      "This is refreshingly sane.",
      "Gold star for not oversharing.",
      "Approved with mild enthusiasm.",
      "That is actually solid.",
      "A rare clean yes.",
      "You cooked, privately.",
      "Now this is what I call self-control.",
      "Unexpectedly excellent."
    ],
    "chaos": [
      "Metadata is gossip and you are feeding it.",
      "Convenience is doing a lot of work here.",
      "Your privacy instincts are fighting for their life.",
      "This has the energy of a bad headline.",
      "That permission list reads like identity theft fan fiction.",
      "Your future self is already annoyed.",
      "Somewhere, an ad-tech executive just sat up straighter.",
      "This plan has main-character energy and weak boundaries.",
      "That is less a workflow and more a trust fall.",
      "The vibes are encrypted, the judgment is not.",
      "This is not threat modeling. This is improv.",
      "A little paranoia is just product literacy.",
      "The math is not mathing, privately.",
      "Your attack surface just got ambitious.",
      "That is a lot of exposure for very little payoff.",
      "This duck is auditing your life choices.",
      "The blast radius is non-trivial.",
      "That setup is one inconvenience away from disaster.",
      "You are outsourcing caution to luck.",
      "This is between you, your browser, and God."
    ]
  }
}
```

---

## Afterburn pack
```json
[
  "That request is doing entirely too much.",
  "Your data is not a sign-up bonus.",
  "Privacy is not being dramatic.",
  "A little paranoia is healthy in this economy.",
  "Permissions are a personality test, and this app failed.",
  "Your camera roll deserves better boundaries.",
  "End-to-end encryption would like a word.",
  "That’s not convenience. That’s surrender.",
  "Metadata remembers what you forgot.",
  "You can be chill and still have boundaries.",
  "Your future self would like fewer regrets.",
  "No one needs that much access to be helpful.",
  "This is why screenshots of permissions go viral.",
  "Some apps need a hobby other than collecting data.",
  "Your trust should not be this easy to win.",
  "That setup has 'why did I allow that' energy.",
  "You are not overthinking it. The app is over-asking.",
  "There are easier ways to create problems.",
  "Not every product deserves the whole you.",
  "A privacy-respecting option probably exists.",
  "The best backup plan is the one you actually set up.",
  "Links travel farther than your intentions.",
  "Family group chats are not archival systems.",
  "An account does not need your life story.",
  "Phone numbers are handed out way too casually.",
  "The cloud is not automatically your friend.",
  "Public Wi‑Fi should never make decisions for you.",
  "A strong password is cheaper than regret.",
  "Passkeys are less dramatic than password recovery.",
  "The safest share is the one with less to leak.",
  "That permission request should be embarrassed.",
  "You do not need perfect privacy. Just fewer own-goals.",
  "This could have been a link instead of an incident.",
  "A tiny bit of friction beats a large cleanup later.",
  "You can love convenience without marrying it.",
  "This duck would prefer less improvisation.",
  "That is not caution. That is chaos in a trench coat.",
  "You can absolutely do better than this.",
  "Protect the boring stuff too. That is where the damage hides.",
  "A safer path is usually one tap away."
]
```

---

# Question pack (starter)

## permissions
```json
[
  "This flashlight app wants my contacts, mic, and camera. Is it trying to illuminate my soul?",
  "A wallpaper app wants full photo access. For vibes. Do I allow it?",
  "This calculator app needs location. What are we calculating here, exactly?",
  "A notes app wants Bluetooth, contacts, and notifications. Is this a notebook or a surveillance internship?",
  "This weather app wants my precise location all the time. Is 'roughly nearby' not enough for clouds?",
  "A QR scanner wants access to my files, camera, and phone state. Do I salute or uninstall?",
  "This keyboard wants network access and clipboard permission. Am I typing or donating?",
  "A PDF scanner wants my contacts. Is it planning to network on my behalf?",
  "This event app wants motion, location, contacts, and camera before I’ve even opened it. Bold?",
  "A habit tracker wants to read my app usage. Am I building discipline or providing market research?",
  "This shopping app wants microphone access. Are the discounts voice activated now?",
  "A recipe app wants my location and photos. Is dinner also a data pipeline?",
  "This wallpaper app wants to run in the background forever. For what, emotional support?",
  "A productivity app wants calendar, contacts, reminders, and full storage. Do I just hand over the keys?",
  "This meditation app wants Bluetooth and exact location. Inner peace, outer surveillance?",
  "A scanner app wants all-time photo access instead of selected photos. Should I be flattered?",
  "This game wants my contact list. Are they inviting my enemies too?",
  "A transit app wants always-on location. Do trains need this much intimacy?",
  "This browser extension wants permission to read and change all data on all websites. Casual.",
  "A finance app wants screenshots disabled and clipboard access. Comforting or concerning?"
]
```

## ai_apps
```json
[
  "This AI headshot app wants my whole camera roll. Worth the cheekbones?",
  "An AI photo enhancer says 'upload everything for better results.' Do I let it cook?",
  "This AI journaling app wants to learn my style from private notes. Romantic or reckless?",
  "An AI wallpaper generator wants my gallery for inspiration. Inspiration from what, exactly?",
  "This AI friend app wants my contacts, microphone, and chat history. Am I making a friend or a dossier?",
  "A new AI productivity tool wants all my emails to 'organize my life.' Is that generous or invasive?",
  "This AI note taker wants meeting access, calendar access, and cloud docs. Does it also want my blood type?",
  "An AI keyboard promises smarter replies if I let it see everything I type. How adventurous am I feeling?",
  "This AI search app says privacy matters, but its permission screen looks like a land grab. Cute?",
  "An AI avatar app wants 40 selfies and permanent storage. Should I become data in exchange for jawline?",
  "This AI transcription app says recordings may be reviewed for quality. Whose quality exactly?",
  "An AI organizer wants my photos to detect receipts, faces, and 'memories.' Helpful or weirdly intimate?",
  "This AI browser wants to summarize all tabs and browsing history. Efficient or catastrophic?",
  "An AI fitness app wants my health data, location, and photos. Is it training me or itself?",
  "This AI diary says my entries are private, but the policy reads like interpretive dance. Do I trust it?",
  "An AI clone app wants voice samples from multiple rooms. Is the clone worth the chaos?",
  "A startup AI app has no clear privacy page but does have a very confident mascot. Red flag?",
  "This AI shopping assistant wants inbox access to find receipts. Do I invite it in?",
  "An AI family album app wants automatic face clustering in the cloud. Charming or cursed?",
  "This AI memory app says it stores 'personal context' to help me later. How much context is too much context?"
]
```

## cloud_storage
```json
[
  "Should I upload personal photos to a cloud service I picked because the logo was nice?",
  "This cloud drive says encryption, but the fine print is fuzzy. Am I storing files or hoping?",
  "Do I back up my documents to the easiest service or the one I actually trust?",
  "A cloud app says my files are safe, but not end-to-end encrypted. Is that close enough?",
  "Should I keep important scans in regular cloud storage and call it a day?",
  "This free cloud tier is generous in a way that makes me nervous. Do I accept the generosity?",
  "Do I put tax documents in the same place I casually dump memes and screenshots?",
  "This storage app says it can scan my files to improve search. Helpful or a lot?",
  "Should I trust a cloud provider just because lots of people use it?",
  "A storage service says it can recover my files for me anytime. Comforting or too much access?",
  "Is one cloud backup enough, or am I building my future regrets?",
  "Do I turn on automatic uploads for everything and let fate sort it out?",
  "This backup flow is annoyingly secure. Do I still do it?",
  "Should I use a cloud drive that lets support access files if needed?",
  "A file storage app wants to analyze uploads for smart organization. Is that a fair trade?",
  "This provider says zero knowledge in headlines and vague things elsewhere. How skeptical is healthy?",
  "Do I separate sensitive files from casual files, or is that me being dramatic?",
  "Should I trust a private cloud app that is open source but slightly less convenient?",
  "Do I keep the originals local too, or is cloud-only living dangerously?",
  "This cloud share link never expires by default. Inspirational or irresponsible?"
]
```

## photo_sharing
```json
[
  "Do I share vacation photos with a public link and just trust the universe?",
  "A friend wants the whole album in a giant chat thread. Character building?",
  "Should I send passport photos over email because it’s 'just easier'?",
  "Do I post the family trip live, or wait until I’m not literally still there?",
  "Should I share baby photos in the broad family group and hope they stay there?",
  "My friend wants originals through a random file transfer site. Do I oblige?",
  "Should I send personal photos as email attachments or use a private album link?",
  "Is it fine to dump event photos into a public drive link if I rename the folder 'private'?",
  "Do I upload old photos to a site I have never heard of because storage is cheap?",
  "A wedding album needs sharing with many people. Public link or invite-only?",
  "Should I text sensitive screenshots like they’re memes?",
  "Do I let a photo app auto-share albums because it seems convenient?",
  "Is it okay to share location-rich photos without checking metadata first?",
  "Can I send document photos in the same channel as party pics and cat memes?",
  "Should I keep a private album link forever, or set an expiry like a grown-up?",
  "This file share says 'anyone with the link.' How often does 'anyone' become too many people?",
  "Do I blur first and share later, or is that too much effort for one screenshot?",
  "Should I trust social app DMs with private photos because they 'disappear'?",
  "A public post is easier than a private album. Do I take the easy road?",
  "Should I share high-res originals with everyone, or only the people who actually need them?"
]
```

## family_groups
```json
[
  "The family group chat has 37 people and no boundaries. Do I drop personal photos in there?",
  "Should I share school documents in the cousin group because technically they are family?",
  "My relatives want one giant shared album forever. Sweet or terrifying?",
  "Do I post travel plans in the extended family group while I’m still away?",
  "Should I send health reports to the family chat because calling everyone is exhausting?",
  "The family wants a shared cloud folder with no structure. Is chaos a storage strategy?",
  "Do I trust older relatives to not forward a private album link into the void?",
  "Should I keep kids’ photos in a broad family album that keeps growing?",
  "The group keeps changing members. Do I still use it for personal stuff?",
  "Should I share passwords for streaming in the same place we share legal documents? Asking for a household.",
  "A relative wants me to send ID proof in the family WhatsApp group. Do I love them enough for that?",
  "Should I post live location in the family group to avoid 14 phone calls?",
  "Do I put financial documents in a shared family drive that everyone forgets exists?",
  "Should I assume family groups are private because the people are familiar?",
  "The family wants everyone’s birthdays, addresses, and numbers in one spreadsheet. Efficient or cursed?",
  "Should I keep wedding logistics and guest data in a giant family chat forever?",
  "A parent wants all grandkid photos auto-synced to one shared folder. Cute or risky?",
  "Do I use a family group as my backup plan because 'someone will have it'?",
  "Should I share sensitive PDFs with relatives through a permanent drive link?",
  "The family album is convenient, but nobody reviews access. Still fine?"
]
```

## messaging
```json
[
  "Should I send my address in a big neighborhood group chat?",
  "A friend wants my passport copy over messaging. Do I become a PDF dispenser?",
  "Should I send banking screenshots in chat because it’s faster than explaining?",
  "Is disappearing messages enough, or am I spiritually optimistic?",
  "Do I share private files in a platform that backs everything up unencrypted somewhere?",
  "A work group wants personal details in chat. Is this collaboration or oversharing?",
  "Should I send login codes in the same thread where we gossip?",
  "Can I drop a contract photo in chat and call it secure enough?",
  "Should I trust app DMs with personal documents because they are convenient?",
  "A stranger in a buy/sell chat wants my number, email, and address up front. Efficient or alarming?",
  "Do I send location live in a thread with too many people in it?",
  "Should I use a disappearing photo for something I would hate to see screenshotted?",
  "This chat app says messages are encrypted, but backups are optional. Do I investigate or vibe?",
  "Can I send a Wi‑Fi password in a giant event thread without consequences?",
  "Should I move sensitive discussion from normal chat to something more private, or is that dramatic?",
  "A group admin keeps adding random people. Do I still send personal info there?",
  "Should I share invitation links publicly in a chat that gets forwarded all the time?",
  "Can I trust read receipts and delete-for-everyone to save me from myself?",
  "Do I send travel plans in a broad social group because it’s efficient?",
  "Should I DM private photos on a platform best known for screenshots?"
]
```

## passwords_passkeys
```json
[
  "Should I reuse one decent password everywhere and call it a system?",
  "Do I finally get a password manager, or keep living like this?",
  "Passkeys sound great, but I barely understand them. Do I still switch?",
  "Should I save passwords in plain notes because future me is forgetful?",
  "A site wants security questions based on my actual life. Charming or terrible?",
  "Should I text my partner the account password because love is trust?",
  "Do I keep 2FA backup codes in screenshots next to vacation selfies?",
  "Is browser password save good enough, or do I need a grown-up setup?",
  "Should I store important recovery codes in one unencrypted folder called 'important'?",
  "Do I skip 2FA because it’s annoying and hope charisma protects me?",
  "Should I share a streaming account password with six relatives and a strong belief in destiny?",
  "A site still uses SMS 2FA only. Do I accept my fate?",
  "Should I keep the same password but add a different exclamation mark each time?",
  "Do passkeys make me safer or just more annoying to my other devices?",
  "Should I put recovery codes in cloud notes because paper feels medieval?",
  "Can I trust myself to remember which accounts matter enough for stronger security?",
  "Should I use email as my recovery method for everything and pray the email survives?",
  "A family member wants the password 'just in case.' Is that compassion or a future ticket to chaos?",
  "Do I postpone fixing my account security because nothing bad has happened yet?",
  "Should I use a password manager even if the setup feels like admitting adulthood?"
]
```

## signups_phone
```json
[
  "Does this shopping site really need my phone number for socks?",
  "A random app wants my birthday, phone, and address before I can browse. Courtship is dead?",
  "Should I use Sign in with Google here and move on with my life?",
  "This site says phone number is required for 'security.' Is that true or branding?",
  "Do I use my real email for this sketchy coupon site?",
  "Should I give my number to a service I plan to use exactly once?",
  "This app wants contacts to 'find friends.' I have concerns.",
  "Do I make a burner email, or am I overcommitting to the bit?",
  "Should I use Apple/Google login or create a new account with a fragile password?",
  "A food delivery app wants exact location, phone, and marketing opt-in by default. Hungry enough?",
  "Do I hand over my number for account recovery if I barely trust the account itself?",
  "This platform wants full profile details before showing pricing. Intriguing or invasive?",
  "Should I sign up with my main email on a service whose design already looks tired?",
  "A brand asks for my birthday for a discount. Is the discount worth the annual surveillance?",
  "Do I give my real name on every platform, or can mystery still exist?",
  "This app won’t let me proceed without notifications enabled. Boundary issue?",
  "Should I allow cross-app tracking because the popup was emotionally persuasive?",
  "Do I create accounts for everything, or live more link-first?",
  "A website wants my phone number before checkout. Is that logistics or ambition?",
  "Should I share my contacts so a social app can tell me who’s already here, unfortunately?"
]
```

## public_wifi_travel
```json
[
  "Airport Wi‑Fi is free and my judgment is tired. Do I log into important stuff?",
  "Should I upload travel documents over hotel Wi‑Fi and call it brave?",
  "Do I connect automatically to public networks because convenience is a lifestyle?",
  "A cafe Wi‑Fi asks for social login. Am I getting online or starting a relationship?",
  "Should I check banking on public Wi‑Fi if I’m in a hurry?",
  "Do I book sensitive travel stuff on shared hostel internet and trust the ambiance?",
  "This lounge Wi‑Fi has no password and too much confidence. Fine?",
  "Should I AirDrop photos to strangers nearby because it’s faster than thinking?",
  "Do I leave Bluetooth on while traveling because pairing later is annoying?",
  "Should I post that I’m away from home while still away from home?",
  "Is it okay to share my live location publicly during a trip for vibes?",
  "Do I keep digital copies of ID in easy reach on every device while traveling?",
  "Should I use shared computers to print travel documents in a panic?",
  "Can I scan boarding passes into every app that asks nicely?",
  "Do I connect to the first 'Free Airport WiFi' network I see and hope branding is honest?",
  "Should I message passport scans over public internet because the line is moving?",
  "Do I store all travel bookings in one unlocked inbox thread?",
  "Is roaming stress a valid excuse for weaker privacy decisions?",
  "Should I use public charging and trust the cable situation spiritually?",
  "Do I leave location sharing on after the trip because remembering to turn it off is a burden?"
]
```

## links_backups
```json
[
  "Should I make a public link and just promise myself I’ll disable it later?",
  "Do I keep old share links alive forever because nobody complained yet?",
  "This album link is private-ish. Is private-ish a setting now?",
  "Should I send 'anyone with the link' access and trust my own restraint?",
  "Do I use one permanent link for every family album because simplicity is elegant?",
  "Should I expire shared links, or is that me being annoyingly responsible?",
  "Do I back up all my photos in exactly one place and call it resilience?",
  "Should I test my backups or preserve the mystery?",
  "Can I trust myself to remember where the only copy lives six months from now?",
  "Do I keep encrypted and unencrypted backups side by side because options feel nice?",
  "Should I share a folder link in a public event page because it’s efficient?",
  "This link preview exposes more than I expected. Do I still send it?",
  "Do I rename sensitive folders 'misc' and hope operational security counts?",
  "Should I keep recovery material inside the same account it helps recover?",
  "A link never expires and nobody audits access. Is that modern minimalism?",
  "Should I duplicate backups across devices I barely lock?",
  "Do I send the backup drive around the family like a ceremonial object?",
  "Should I trust cloud trash/recycle bin as my backup strategy?",
  "Can a backup still be called a backup if I’ve never restored from it?",
  "Do I share a private album link in a thread that definitely gets forwarded?"
]
```

---

## Optional category-specific verdict ideas
```json
{
  "permissions": {
    "hard_no": [
      "That permission screen needs to calm down.",
      "Your flashlight does not need a social life.",
      "This app has boundary issues."
    ]
  },
  "ai_apps": {
    "hard_no": [
      "The model may be hungry, but that is not your problem.",
      "Do not donate your camera roll to the content machine.",
      "That AI app wants context bordering on custody."
    ]
  },
  "cloud_storage": {
    "cautious_maybe": [
      "Only if the encryption story is not fan fiction.",
      "Cloud, yes. Blind trust, no.",
      "Back it up, but with standards."
    ]
  },
  "photo_sharing": {
    "cautious_maybe": [
      "Share the album, not your whole life.",
      "Invite-only is hot right now.",
      "A private link would solve this elegantly."
    ]
  },
  "family_groups": {
    "hard_no": [
      "Family familiarity is not a security model.",
      "That group chat has no perimeter.",
      "Love them, yes. Trust the forwarding chain, no."
    ]
  },
  "messaging": {
    "cautious_maybe": [
      "This could stay in chat, but only barely.",
      "Choose the app with fewer receipts and better boundaries.",
      "Delete-for-everyone is not absolution."
    ]
  },
  "passwords_passkeys": {
    "approved": [
      "Passkeys are boring in all the right ways.",
      "A password manager is less dramatic than account recovery.",
      "Finally, some operational maturity."
    ]
  },
  "signups_phone": {
    "hard_no": [
      "That checkout does not need your autobiography.",
      "This app is collecting vibes and identifiers.",
      "No free tote bag is worth this much metadata."
    ]
  },
  "public_wifi_travel": {
    "hard_no": [
      "Travel stress is not a privacy exemption.",
      "Free Wi‑Fi and tired judgment are a dangerous duo.",
      "That network name alone should humble you."
    ]
  },
  "links_backups": {
    "cautious_maybe": [
      "A link with an expiry is a sign of growth.",
      "Backups are attractive when tested.",
      "Private by default looks good on you."
    ]
  }
}
```

---

## Visual implementation checklist
- Use official Ducky mascot assets from Ente media kit
- Use Ente-derived dark UI styling and accent extraction from official assets
- Design the result screen first, then the idle and question states
- Ensure square share card exports cleanly
- Keep the share CTA primary and visually dominant
- Add subtle motion and haptics without clutter
- Preserve generous spacing and large type on mobile
- Avoid making the interface feel like a chatbot or dashboard

---

## Handoff note for the implementation agent
Build V1 around:
1. a rock-solid content engine
2. excellent mobile interaction and fallback behavior
3. a beautiful result/share card
4. crisp performance
5. brand fidelity to official Ente / Ducky assets

If forced to cut scope, cut everything before cutting the quality of the result screen and share flow.
