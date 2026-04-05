import type {
  Category,
  CategoryId,
  Question,
  QuestionVerdict,
  ShareCaptionTemplate,
} from "@/lib/types";

const categoryNames: Record<CategoryId, string> = {
  permissions: "Permissions",
  ai_apps: "AI Apps",
  cloud_storage: "Cloud Storage",
  photo_sharing: "Photo Sharing",
  family_groups: "Family Groups",
  messaging: "Messaging",
  passwords_passkeys: "Passwords & Passkeys",
  signups_phone: "Phone Numbers & Signups",
  public_wifi_travel: "Public Wi-Fi & Travel",
  links_backups: "Links & Backups",
};

export const categories: Category[] = [
  { id: "permissions", name: categoryNames.permissions, weight: 12 },
  { id: "ai_apps", name: categoryNames.ai_apps, weight: 10 },
  { id: "cloud_storage", name: categoryNames.cloud_storage, weight: 10 },
  { id: "photo_sharing", name: categoryNames.photo_sharing, weight: 11 },
  { id: "family_groups", name: categoryNames.family_groups, weight: 8 },
  { id: "messaging", name: categoryNames.messaging, weight: 10 },
  { id: "passwords_passkeys", name: categoryNames.passwords_passkeys, weight: 9 },
  { id: "signups_phone", name: categoryNames.signups_phone, weight: 10 },
  { id: "public_wifi_travel", name: categoryNames.public_wifi_travel, weight: 9 },
  { id: "links_backups", name: categoryNames.links_backups, weight: 11 },
];

export const shareCaptions: ShareCaptionTemplate[] = [
  "I asked Ducky a privacy question and got judged immediately.",
  "A duck just gave me better privacy advice than most apps.",
  "Shake your phone. Receive a privacy verdict.",
  "This duck has concerns. Try Ask Ducky.",
  "I came for fun and left with boundaries.",
  "Ask Ducky before you overshare with confidence.",
  "A privacy verdict from an aggressively observant duck.",
  "This was supposed to be fun. The duck had notes.",
  "I shook my phone and got a digital intervention.",
  "Ask Ducky. Get judged. Probably deserved.",
].map((text, index) => ({ id: `caption_${index + 1}`, text }));

// --- Questions with inline verdicts and afterburns ---

interface RawQuestion {
  text: string;
  verdicts: [QuestionVerdict, QuestionVerdict, QuestionVerdict];
  afterburns: [string, string, string];
}

const rawQuestions: Record<CategoryId, RawQuestion[]> = {
  permissions: [
    {
      text: "Should I let a flashlight app access my contacts?",
      verdicts: [
        { family: "hard_no", text: "Ducky says absolutely not. A flashlight has one job." },
        { family: "chaos", text: "You are about to let a flashlight network on your behalf. Incredible." },
        { family: "soft_roast", text: "You genuinely considered handing your contact list to a torch. The duck is sighing." },
      ],
      afterburns: [
        "Your data is not a sign-up bonus.",
        "A flashlight needs exactly one permission: the flashlight.",
        "That request is doing entirely too much.",
      ],
    },
    {
      text: "A wallpaper app wants all my photos. Normal?",
      verdicts: [
        { family: "hard_no", text: "It wants your wallpaper, not your life story. Hard pass." },
        { family: "soft_roast", text: "You were about to donate your entire camera roll to a wallpaper app. Generous." },
        { family: "chaos", text: "That wallpaper app now has front-row access to every photo you have taken. Enjoy." },
      ],
      afterburns: [
        "Not every product deserves the whole you.",
        "Full photo access for a wallpaper is not a trade. It is a surrender.",
        "Select photos manually. The wallpaper will survive.",
      ],
    },
    {
      text: "Why does a calculator need my location?",
      verdicts: [
        { family: "hard_no", text: "It does not. Deny it and do not think about it again." },
        { family: "chaos", text: "Maybe it is calculating your precise coordinates for its own amusement." },
        { family: "soft_roast", text: "You clocked the weirdness and still hovered over Allow. The duck is watching." },
      ],
      afterburns: [
        "A calculator needs numbers, not your GPS coordinates.",
        "If an app cannot explain the permission, the answer is no.",
        "Metadata remembers what you forgot.",
      ],
    },
    {
      text: "An app wants Bluetooth access. Should I care?",
      verdicts: [
        { family: "cautious_maybe", text: "Depends what the app actually does. If it does not pair with anything, deny it." },
        { family: "hard_no", text: "Bluetooth with no purpose is tracking dressed up as a feature." },
        { family: "soft_roast", text: "You probably tapped Allow before you finished reading. Classic." },
      ],
      afterburns: [
        "Bluetooth without a pairing reason is a proximity tracker.",
        "Some apps collect Bluetooth data to build location profiles.",
        "That is not convenience. That is surrender with extra steps.",
      ],
    },
    {
      text: "This weather app wants my location all the time. Okay?",
      verdicts: [
        { family: "cautious_maybe", text: "While using the app is reasonable. All the time is a full surveillance subscription." },
        { family: "hard_no", text: "A weather app tracking your every move is not a forecast. It is a file on you." },
        { family: "chaos", text: "You have a meteorological stalker now. Hope the weather is worth it." },
      ],
      afterburns: [
        "Always-on location for a weather app is a hard no from the duck.",
        "You can type your city name. It takes three seconds.",
        "Convenience keeps sending you invoices.",
      ],
    },
    {
      text: "A QR scanner wants access to my files. Why?",
      verdicts: [
        { family: "hard_no", text: "A QR scanner reads codes. Full stop. Deny the rest." },
        { family: "chaos", text: "That QR scanner is far more interested in your files than in any QR code." },
        { family: "soft_roast", text: "You almost handed your file system to a barcode reader. The duck is auditing your life choices." },
      ],
      afterburns: [
        "Your camera already has a QR scanner built in. Just use that.",
        "If the app works without the permission, the permission is for them.",
        "Not every app needs a key to your whole house.",
      ],
    },
    {
      text: "A keyboard app wants network access. Safe?",
      verdicts: [
        { family: "hard_no", text: "A networked keyboard can send every password you type. That is not a feature." },
        { family: "chaos", text: "You gave your keyboard internet access. It now sees every secret you have ever typed." },
        { family: "cautious_maybe", text: "Some keyboards use the network for predictions. Know what you are trading." },
      ],
      afterburns: [
        "Your keyboard is the most sensitive app on your device.",
        "A keyboard with network access is a keylogger with good branding.",
        "Some apps need a hobby other than collecting data.",
      ],
    },
    {
      text: "Should I let an app run in the background?",
      verdicts: [
        { family: "cautious_maybe", text: "Only apps that genuinely need it — navigation, music, timers. The rest can wait." },
        { family: "soft_roast", text: "You have seven apps humming in the background doing absolutely nothing useful." },
        { family: "hard_no", text: "If it does not need to run while closed, that is not convenience. That is chaos in a trench coat." },
      ],
      afterburns: [
        "Background activity means background data collection.",
        "Check what is running. Then ask yourself why.",
        "Links travel farther than your intentions — so does background data.",
      ],
    },
    {
      text: "An app wants my calendar, contacts, and files. Too much?",
      verdicts: [
        { family: "hard_no", text: "That is a no from the duck. Three permissions, zero reasons." },
        { family: "chaos", text: "At this point just hand over your house keys and save everyone some time." },
        { family: "soft_roast", text: "You read that permission list and still considered it. Remarkable." },
      ],
      afterburns: [
        "Apps that ask for everything usually need very little.",
        "Greedy permissions are the first red flag. Every time.",
        "Start with nothing. Add only what breaks.",
      ],
    },
    {
      text: "A game wants my contact list. Should I allow it?",
      verdicts: [
        { family: "hard_no", text: "No game has ever needed your contacts. Not once. Not ever." },
        { family: "chaos", text: "That game is about to invite every person you know without asking them." },
        { family: "soft_roast", text: "You know exactly why it wants your contacts. Say the word. The word is no." },
      ],
      afterburns: [
        "Your contacts did not consent to being uploaded to a game server.",
        "Find friends features exist to grow the app, not help you.",
        "Social features in games are marketing dressed as gameplay.",
      ],
    },
    {
      text: "A shopping app wants microphone access. Why?",
      verdicts: [
        { family: "hard_no", text: "A shopping app does not need to hear you. The duck says deny." },
        { family: "chaos", text: "That shopping app wants to listen while you live your life. Cozy." },
        { family: "soft_roast", text: "You wondered instead of just denying it. The duck takes note." },
      ],
      afterburns: [
        "Microphone access means it can listen. That is the whole point.",
        "Shopping apps need your cart, not your voice.",
        "If you cannot think of why it needs it, it probably does not.",
      ],
    },
    {
      text: "Should I give an app access to all my photos or just some?",
      verdicts: [
        { family: "approved", text: "Select photos only. You cooked, privately." },
        { family: "soft_roast", text: "You know the right answer. You just do not want to tap Select Photos." },
        { family: "cautious_maybe", text: "Full access is technically fine if you fully trust the app. Selected is smarter." },
      ],
      afterburns: [
        "Full photo access means the app sees everything. Including the screenshots.",
        "Selected photos gives you control without breaking anything.",
        "Take the extra two seconds. It is worth it.",
      ],
    },
    {
      text: "A meditation app wants my location. Do I need to allow it?",
      verdicts: [
        { family: "hard_no", text: "Inner peace does not require GPS coordinates. Hard pass." },
        { family: "chaos", text: "That meditation app is mapping your stress levels to your zip code." },
        { family: "soft_roast", text: "You almost let a breathing exercise track your movements. The duck is breathing deeply." },
      ],
      afterburns: [
        "Meditation works the same everywhere. Location adds nothing for you.",
        "If the feature works without it, the permission is for them, not you.",
        "You can be chill and still have boundaries.",
      ],
    },
    {
      text: "A browser extension wants to read all my website data. Install it?",
      verdicts: [
        { family: "hard_no", text: "That extension can see every site you visit. Every single one. Think." },
        { family: "chaos", text: "You just handed a random extension access to your banking, email, and everything else. Fun." },
        { family: "cautious_maybe", text: "Only if you fully trust the developer. That is a lot of trust to extend." },
      ],
      afterburns: [
        "Browser extensions with full access can read your passwords and messages.",
        "The fewer extensions, the smaller your attack surface.",
        "Somewhere, an ad-tech executive just sat up straighter.",
      ],
    },
    {
      text: "An app wants to send me notifications. Allow?",
      verdicts: [
        { family: "cautious_maybe", text: "Only if you actually want to hear from it. Not by default." },
        { family: "soft_roast", text: "You enable notifications from everything and then wonder why your phone never stops." },
        { family: "chaos", text: "Enjoy 47 daily notifications about deals you do not care about. You earned this." },
      ],
      afterburns: [
        "Notifications are an attention tax. Be selective.",
        "Most apps want notification access for marketing, not for you.",
        "You can always turn them on later. You cannot un-ring a bell.",
      ],
    },
    {
      text: "A fitness app wants my health data and location. Too much?",
      verdicts: [
        { family: "cautious_maybe", text: "Health data for fitness makes sense. Location history on top is a stretch." },
        { family: "hard_no", text: "Your heart rate plus your GPS history is a very detailed profile. Be careful." },
        { family: "chaos", text: "That app now knows where you run, how fast, your resting heart rate, and more." },
      ],
      afterburns: [
        "Health data is some of the most sensitive data you own.",
        "Location plus health data paints a picture you might not want painted.",
        "That is not caution. That is chaos in a trench coat.",
      ],
    },
    {
      text: "Should I let an app track me across other apps?",
      verdicts: [
        { family: "hard_no", text: "No. That is literally what the tracking prompt exists to stop. Deny it." },
        { family: "soft_roast", text: "You tapped Allow because it was faster than reading. The duck has seen this before." },
        { family: "chaos", text: "Now every ad you see will feel like it is reading your mind. Because it is." },
      ],
      afterburns: [
        "Cross-app tracking builds a profile you never agreed to.",
        "Denying tracking does not break the app. It just limits their profits.",
        "If they guilt-trip you about it, that is extra reason to deny.",
      ],
    },
    {
      text: "An app crashes without a permission. Should I give in?",
      verdicts: [
        { family: "cautious_maybe", text: "If the permission genuinely matches the feature, grant it. Otherwise, find a better app." },
        { family: "soft_roast", text: "An app crashing on denial is holding your features hostage. That is not a good sign." },
        { family: "hard_no", text: "Apps that break without unnecessary permissions are not worth keeping." },
      ],
      afterburns: [
        "A well-built app works with minimal permissions.",
        "Crashing on denial is usually a design choice, not a technical limit.",
        "There is almost always a competitor that asks for less.",
      ],
    },
    {
      text: "A food delivery app wants my precise location. Fine?",
      verdicts: [
        { family: "approved", text: "For delivery, precise location actually makes sense. Tentative quack of approval." },
        { family: "cautious_maybe", text: "While using the app, yes. All the time, no." },
        { family: "soft_roast", text: "This is one of the rare times it is actually justified. Savor the moment." },
      ],
      afterburns: [
        "Precise location for delivery is reasonable. Just limit it to while using.",
        "Even justified permissions deserve a time limit.",
        "Check if it is set to while using or always. Those are very different things.",
      ],
    },
    {
      text: "A free app wants way more permissions than a paid one. Why?",
      verdicts: [
        { family: "chaos", text: "Because you are not the customer. You are the product. Welcome." },
        { family: "hard_no", text: "More permissions means more data. That is how free apps pay the bills." },
        { family: "soft_roast", text: "You already know the answer. You just wanted it not to be true." },
      ],
      afterburns: [
        "Free apps often pay for themselves with your data.",
        "Compare permissions before picking the free option.",
        "Sometimes paying a few dollars buys you actual privacy.",
      ],
    },
  ],
  ai_apps: [
    {
      text: "An AI app wants access to my camera roll. Allow?",
      verdicts: [
        { family: "hard_no", text: "Your photo library is not training data. The duck says deny." },
        { family: "chaos", text: "That AI now has every photo you have ever taken. Enjoy the model." },
        { family: "cautious_maybe", text: "Give it the specific photos it needs. Not the entire archive of your life." },
      ],
      afterburns: [
        "Your camera roll has more personal data than most documents.",
        "AI apps learn from what you give them. Give less.",
        "Not every product deserves the whole you.",
      ],
    },
    {
      text: "Should I paste private info into ChatGPT?",
      verdicts: [
        { family: "hard_no", text: "Do not paste anything you would not put on a public website. Full stop." },
        { family: "cautious_maybe", text: "Turn off chat history first. Even then, be thoughtful about what you share." },
        { family: "soft_roast", text: "You already pasted it, did you not. The duck suspected as much." },
      ],
      afterburns: [
        "There is no undo button for what you share with an AI.",
        "Anything you paste could be used for training unless you opt out.",
        "The duck is sighing.",
      ],
    },
    {
      text: "An AI writing tool wants to read all my documents. Safe?",
      verdicts: [
        { family: "hard_no", text: "Your documents are your business. Literally and figuratively. Do not hand them over." },
        { family: "chaos", text: "That tool just read your diary, your resume, and your unfinished screenplay." },
        { family: "cautious_maybe", text: "Only connect documents you would be fine with becoming public." },
      ],
      afterburns: [
        "Read the privacy policy. Not the marketing page.",
        "Try it with test data first. Never start with the real thing.",
        "Just because it is helpful does not mean it is private.",
      ],
    },
    {
      text: "An AI photo editor uploads my photos to the cloud. Okay?",
      verdicts: [
        { family: "hard_no", text: "If it leaves your device, you have lost control of it. The duck is firm on this." },
        { family: "cautious_maybe", text: "Check where the photos go and whether they are actually deleted after." },
        { family: "soft_roast", text: "You wanted a filter and traded your photos to get it. A classic deal." },
      ],
      afterburns: [
        "Cloud processing means your photos live on someone else's servers.",
        "Look for apps that edit on-device instead.",
        "Is this filter worth giving up this photo? Ask yourself honestly.",
      ],
    },
    {
      text: "An AI assistant wants access to my email. Should I connect it?",
      verdicts: [
        { family: "hard_no", text: "Your inbox has passwords, receipts, and your most personal correspondence. No." },
        { family: "chaos", text: "That AI can now read every email you have ever received. All of them." },
        { family: "cautious_maybe", text: "Only if you trust the company deeply and the access is read-only with clear limits." },
      ],
      afterburns: [
        "Email access is access to your entire digital life.",
        "A compromised AI integration means a compromised inbox.",
        "Metadata remembers what you forgot — and email has a lot of metadata.",
      ],
    },
    {
      text: "Should I use an AI tool with no privacy policy?",
      verdicts: [
        { family: "hard_no", text: "No privacy policy means no promises. Walk away. The duck has walked." },
        { family: "soft_roast", text: "You saw the missing privacy page and considered using it anyway. Classic." },
        { family: "chaos", text: "No policy means they can do anything with your data. Anything at all." },
      ],
      afterburns: [
        "A missing privacy policy is the biggest red flag there is.",
        "If they will not say what they do with your data, assume the worst.",
        "There are always alternatives that actually explain their practices.",
      ],
    },
    {
      text: "An AI meeting tool records my calls. Should I use it?",
      verdicts: [
        { family: "cautious_maybe", text: "Only with everyone's full knowledge. And check where those recordings live." },
        { family: "hard_no", text: "Recording people without clear consent is both an ethical and legal problem." },
        { family: "soft_roast", text: "Your coworkers are probably unaware they are being recorded right now." },
      ],
      afterburns: [
        "Everyone in the meeting should know it is being recorded.",
        "Check how long recordings are stored and who can access them.",
        "Convenience does not override other people's privacy.",
      ],
    },
    {
      text: "An AI avatar app wants 40 selfies. Worth it?",
      verdicts: [
        { family: "hard_no", text: "40 selfies is a biometric database. That is not a fair trade for a cartoon duck." },
        { family: "chaos", text: "You just gave an AI startup a detailed facial dataset. For a fun picture." },
        { family: "soft_roast", text: "You traded 40 selfies for an avatar that sort of looks like you. The duck is not impressed." },
      ],
      afterburns: [
        "Face data cannot be changed like a password.",
        "Ask where the photos go after the avatar is generated.",
        "A fun result does not justify unlimited data collection.",
      ],
    },
    {
      text: "Is it safe to let AI organize my photos?",
      verdicts: [
        { family: "cautious_maybe", text: "On-device is fine. Cloud-based face scanning is a different conversation entirely." },
        { family: "approved", text: "If it stays on your device, go for it. Green light. Rare but deserved." },
        { family: "soft_roast", text: "It depends entirely on whether organize means on your phone or on their servers." },
      ],
      afterburns: [
        "On-device AI keeps your photos private. Cloud AI does not.",
        "Face recognition in the cloud means your face lives on their servers.",
        "Check if the processing happens locally or somewhere else entirely.",
      ],
    },
    {
      text: "An AI app says my data is used to improve the model. Okay?",
      verdicts: [
        { family: "hard_no", text: "Your private notes should not be someone else's training data. Hard pass." },
        { family: "cautious_maybe", text: "Only if you can genuinely opt out. And actually verify that the opt-out works." },
        { family: "chaos", text: "Your private inputs are now part of a training dataset. Congratulations to the model." },
      ],
      afterburns: [
        "Improve the model is a polished way of saying we keep your data.",
        "Opt out of training if the option exists. Then verify it worked.",
        "Your data becoming part of the product was not in the pitch.",
      ],
    },
    {
      text: "Should I let an AI summarize my browsing history?",
      verdicts: [
        { family: "hard_no", text: "Your browsing history is a map of your life. Do not hand it to anyone." },
        { family: "chaos", text: "That AI now knows your interests, your anxieties, and your 2am rabbit holes." },
        { family: "soft_roast", text: "You wanted a summary and offered up your entire internet history to get it." },
      ],
      afterburns: [
        "Browsing history reveals more about you than most documents.",
        "Efficiency is not worth full surveillance.",
        "This plan has main-character energy and weak boundaries.",
      ],
    },
    {
      text: "An AI fitness app wants my health data. Reasonable?",
      verdicts: [
        { family: "cautious_maybe", text: "Health data for fitness makes sense. Check what it actually shares and with whom." },
        { family: "hard_no", text: "Health data is extremely sensitive. Only trust apps with a real privacy track record." },
        { family: "soft_roast", text: "You gave an AI your heart rate data for slightly more optimized workout tips." },
      ],
      afterburns: [
        "Health data combined with AI can reveal a lot more than you expect.",
        "Fitness insights are helpful. Health data breaches are not.",
        "Check if the data stays on your device or travels to their servers.",
      ],
    },
    {
      text: "Is AI transcription safe for private conversations?",
      verdicts: [
        { family: "hard_no", text: "If the transcription happens in the cloud, the conversation is not private anymore." },
        { family: "cautious_maybe", text: "Use on-device transcription. Cloud-based means someone else effectively hears it." },
        { family: "chaos", text: "Your private conversation is now text on someone else's server. Stored indefinitely." },
      ],
      afterburns: [
        "On-device transcription keeps the audio on your phone.",
        "Cloud transcription means the audio was sent somewhere for processing.",
        "Private conversations deserve private tools.",
      ],
    },
    {
      text: "An AI keyboard learns how I type. Should I use it?",
      verdicts: [
        { family: "hard_no", text: "A keyboard that learns your typing style sees everything. Passwords included." },
        { family: "cautious_maybe", text: "Only if it processes entirely on-device and sends nothing to the cloud." },
        { family: "chaos", text: "That keyboard now has a vocabulary trained on your most private keystrokes." },
      ],
      afterburns: [
        "Your keyboard is the most sensitive app on your device. Full stop.",
        "If predictions are cloud-based, your keystrokes are leaving your phone.",
        "Stick with the built-in keyboard if you want fewer risks.",
      ],
    },
    {
      text: "Should I upload personal photos to an AI art generator?",
      verdicts: [
        { family: "hard_no", text: "Those photos could end up in a training dataset. The duck says no upload." },
        { family: "soft_roast", text: "You traded a personal photo for a painting that sort of looks like you." },
        { family: "chaos", text: "Your face is now part of an AI model's concept of art. Congratulations." },
      ],
      afterburns: [
        "Once uploaded, you have no control over where those images go.",
        "Use stock photos or generate something abstract instead.",
        "Art generators are fun. Your face in their model is permanent.",
      ],
    },
    {
      text: "An AI tool auto-saves my conversations. Problem?",
      verdicts: [
        { family: "cautious_maybe", text: "Check where they are saved and exactly who can access them." },
        { family: "hard_no", text: "Auto-saved conversations are a liability waiting for a breach." },
        { family: "soft_roast", text: "Everything you typed is saved somewhere. Hope you were thoughtful about it." },
      ],
      afterburns: [
        "Saved conversations are data. And data can be leaked.",
        "Delete old conversations if the tool lets you.",
        "Turn off auto-save for anything remotely sensitive.",
      ],
    },
    {
      text: "Is it okay to use AI for my tax documents?",
      verdicts: [
        { family: "hard_no", text: "Tax documents contain your entire financial identity. Do not upload them." },
        { family: "cautious_maybe", text: "Only with an established, trusted service. Not a random AI startup you found last week." },
        { family: "chaos", text: "Your income, address, and ID number are now in an AI tool. Somewhere." },
      ],
      afterburns: [
        "Tax documents contain everything needed for identity theft.",
        "Use offline tools for documents this sensitive.",
        "Convenience is not worth it when the stakes are this high.",
      ],
    },
    {
      text: "An AI recommends I share more data for better results. Should I?",
      verdicts: [
        { family: "hard_no", text: "Better results for them. More exposure for you. That is a no from the duck." },
        { family: "soft_roast", text: "It asked nicely so you considered giving it everything. The duck sees this pattern." },
        { family: "chaos", text: "The AI is actively negotiating for more of your data. And it is winning." },
      ],
      afterburns: [
        "More data means a better product for them, not necessarily for you.",
        "Start with the minimum. Add more only if the results genuinely justify it.",
        "You can always share more later. You cannot take it back.",
      ],
    },
    {
      text: "Should I use a free AI tool or pay for privacy?",
      verdicts: [
        { family: "approved", text: "Paying for privacy is almost always worth it. A cautious duck nods." },
        { family: "cautious_maybe", text: "Free is fine for casual use. Paid is better for anything that matters." },
        { family: "soft_roast", text: "You already know free means your data pays the bill." },
      ],
      afterburns: [
        "Free AI tools often monetize through your data.",
        "A few dollars a month buys real privacy commitments.",
        "Check the paid plan's privacy terms. They are usually much stronger.",
      ],
    },
    {
      text: "An AI tool says it is end-to-end encrypted. Trust it?",
      verdicts: [
        { family: "cautious_maybe", text: "Verify whether it is actually end-to-end or just encrypted in transit. Those are different things." },
        { family: "soft_roast", text: "Encrypted sounds safe until you read the fine print. The duck recommends reading." },
        { family: "approved", text: "If it is truly end-to-end encrypted and open source, that is a genuinely good sign." },
      ],
      afterburns: [
        "End-to-end encrypted means even the company cannot read your data.",
        "Encrypted in transit is not the same thing. Not even close.",
        "Look for open source code and independent audits to back the claim.",
      ],
    },
  ],
  cloud_storage: [
    {
      text: "I picked my cloud storage because it was popular. Okay?",
      verdicts: [
        { family: "soft_roast", text: "Popularity is not a privacy policy. The duck has noted this." },
        { family: "cautious_maybe", text: "Popular is fine for casual files. Check the encryption for anything sensitive." },
        { family: "chaos", text: "A billion users does not mean a billion good decisions were made." },
      ],
      afterburns: [
        "Popular services are popular targets too.",
        "Check encryption and data access policies, not just market share.",
        "Your privacy instincts are fighting for their life.",
      ],
    },
    {
      text: "My cloud says encrypted but not end-to-end. Close enough?",
      verdicts: [
        { family: "hard_no", text: "Not end-to-end means they can read your files. That is not close enough." },
        { family: "cautious_maybe", text: "For casual files, maybe. For anything sensitive, that is a no." },
        { family: "soft_roast", text: "Encrypted means safe for them. Not end-to-end means safe from you too. Not the same." },
      ],
      afterburns: [
        "If the provider can access your files, so can anyone who compromises them.",
        "End-to-end encryption means only you hold the keys.",
        "Real encryption means the company genuinely cannot read your stuff.",
      ],
    },
    {
      text: "Should I use the most convenient cloud or the most private one?",
      verdicts: [
        { family: "approved", text: "Choose privacy. Convenience is not worth the trade. Finally, some taste." },
        { family: "cautious_maybe", text: "Convenient for casual stuff. Private for anything that actually matters." },
        { family: "soft_roast", text: "You already picked convenience. You are just looking for someone to validate it." },
      ],
      afterburns: [
        "The most convenient option is usually the least private one.",
        "You can use both. Separate your casual and sensitive files.",
        "A small inconvenience now beats a large problem later.",
      ],
    },
    {
      text: "Is one cloud backup enough?",
      verdicts: [
        { family: "hard_no", text: "One backup is not a backup. It is a single point of failure with feelings." },
        { family: "soft_roast", text: "You have one copy of irreplaceable files and you are calling it a strategy." },
        { family: "chaos", text: "That single backup is one outage away from being zero backups." },
      ],
      afterburns: [
        "If you cannot afford to lose it, back it up twice.",
        "A backup you have never tested is just a hope.",
        "The 3-2-1 rule exists because one backup is not enough.",
      ],
    },
    {
      text: "Should I turn on automatic cloud uploads?",
      verdicts: [
        { family: "cautious_maybe", text: "Convenient, but everything gets uploaded. Including your awkward screenshots." },
        { family: "soft_roast", text: "Auto-upload means every photo goes to the cloud. Every. Single. One." },
        { family: "approved", text: "If the service is end-to-end encrypted, auto-upload is actually smart." },
      ],
      afterburns: [
        "Auto-upload is great for backups, risky for privacy.",
        "Think about what you screenshot before enabling this.",
        "Check that the cloud service meets your privacy standards first.",
      ],
    },
    {
      text: "A free cloud tier offers tons of storage. What is the catch?",
      verdicts: [
        { family: "chaos", text: "The catch is your data. You are paying with information, not money. Welcome." },
        { family: "soft_roast", text: "You know there is a catch. You just do not want to go looking for it." },
        { family: "cautious_maybe", text: "Free tiers are fine for casual files. Read the terms for anything sensitive." },
      ],
      afterburns: [
        "Free storage usually means they scan or monetize your data somehow.",
        "If the product is free, you are contributing to the product.",
        "Somewhere, an ad-tech executive just sat up straighter.",
      ],
    },
    {
      text: "I store tax documents next to memes. Problem?",
      verdicts: [
        { family: "soft_roast", text: "Your tax returns and your reaction images have the same security level. Think about that." },
        { family: "cautious_maybe", text: "Separate your sensitive files into a more secure location. Now." },
        { family: "chaos", text: "One breach and they get your financial identity and your meme folder. What a haul." },
      ],
      afterburns: [
        "Sensitive files deserve a separate, encrypted location.",
        "Not every file needs the same level of security. Tax docs need the highest.",
        "Organize by sensitivity, not just by topic.",
      ],
    },
    {
      text: "My cloud scans files for better search. Should I worry?",
      verdicts: [
        { family: "hard_no", text: "If they are scanning your files, they are reading your files. That is the definition." },
        { family: "cautious_maybe", text: "For photos and docs, this means AI is analyzing your actual content." },
        { family: "soft_roast", text: "Better search means they index what is inside your files. The duck is not thrilled." },
      ],
      afterburns: [
        "Scanning for search means your files are not truly private.",
        "End-to-end encrypted storage cannot scan your files. That is the point.",
        "Look for services that search without reading file contents.",
      ],
    },
    {
      text: "Should I keep local copies or trust cloud only?",
      verdicts: [
        { family: "approved", text: "Always keep local copies of anything you cannot replace. Suspiciously responsible." },
        { family: "hard_no", text: "Cloud-only is gambling on uptime. Keep local copies." },
        { family: "soft_roast", text: "You deleted the local copy because the cloud felt permanent. It is not." },
      ],
      afterburns: [
        "Clouds go down. Services shut down. Local copies survive both.",
        "Your cloud provider's uptime is not your backup strategy.",
        "If you would be devastated to lose it, keep it in two places.",
      ],
    },
    {
      text: "A cloud provider says zero-knowledge. How do I verify?",
      verdicts: [
        { family: "cautious_maybe", text: "Look for open-source code and independent security audits. Not just blog posts." },
        { family: "soft_roast", text: "Zero-knowledge is easy to claim. Significantly harder to prove." },
        { family: "approved", text: "If it is open source and audited, the claim is probably real. Green light." },
      ],
      afterburns: [
        "Open source lets anyone verify the encryption claims.",
        "Independent audits are the gold standard for trust.",
        "If they cannot prove it, do not take their word for it.",
      ],
    },
    {
      text: "Should I share a cloud folder with a direct link?",
      verdicts: [
        { family: "cautious_maybe", text: "Only if the link expires and you trust every single person who receives it." },
        { family: "hard_no", text: "Direct links get forwarded. Use invite-only sharing instead." },
        { family: "soft_roast", text: "A direct link is one forward away from being public. Just one." },
      ],
      afterburns: [
        "Links travel farther than your intentions.",
        "Invite-only sharing gives you actual control over who sees what.",
        "Set an expiry date. Future you will thank current you.",
      ],
    },
    {
      text: "My cloud storage has not been updated in years. Problem?",
      verdicts: [
        { family: "soft_roast", text: "If the service is not updating, neither are its security practices. The duck is concerned." },
        { family: "cautious_maybe", text: "Check if the company is still active and maintaining security updates." },
        { family: "chaos", text: "Your files are sitting on software from several years ago. Good luck with that." },
      ],
      afterburns: [
        "Outdated software means outdated security.",
        "If the service looks abandoned, move your files somewhere maintained.",
        "Active development is a sign the company takes security seriously.",
      ],
    },
    {
      text: "Should I encrypt files before uploading to the cloud?",
      verdicts: [
        { family: "approved", text: "Yes. Encrypting before upload is the safest approach. You understood the assignment." },
        { family: "cautious_maybe", text: "For sensitive files, absolutely. For casual ones, the cloud's encryption is probably sufficient." },
        { family: "soft_roast", text: "You thought about it, which is already more than most people do." },
      ],
      afterburns: [
        "Pre-encryption means even a breach cannot expose your files.",
        "Double encryption is not paranoia. It is good practice.",
        "Tools exist that make this easy. No excuses.",
      ],
    },
    {
      text: "Is it safe to share cloud storage with my partner?",
      verdicts: [
        { family: "approved", text: "Shared storage with someone you trust is perfectly fine. A cautious duck nods." },
        { family: "cautious_maybe", text: "Fine, but keep your most sensitive files in a separate personal space." },
        { family: "soft_roast", text: "Shared storage works until it does not. Keep some things separate. Just in case." },
      ],
      afterburns: [
        "Sharing is fine. Just do not put everything in the shared folder.",
        "Trust is great. Separate folders for sensitive files is smarter.",
        "Keep personal documents in your own space.",
      ],
    },
    {
      text: "I have never checked my cloud privacy settings. Should I?",
      verdicts: [
        { family: "hard_no", text: "Yes. Right now. Default settings are almost never the most private ones." },
        { family: "soft_roast", text: "You have been using it for years without once looking at the settings. Bold." },
        { family: "chaos", text: "Your files have been configured to factory defaults this whole time. Enjoy." },
      ],
      afterburns: [
        "Default settings prioritize convenience, not your privacy.",
        "It takes five minutes to review and tighten your settings.",
        "You might be surprised what is shared or public by default.",
      ],
    },
    {
      text: "A cloud service shut down. What happens to my files?",
      verdicts: [
        { family: "hard_no", text: "If you did not download them in time, they are gone. This is how cloud-only ends." },
        { family: "chaos", text: "Your files vanished with the company. This is the cloud-only lifestyle in action." },
        { family: "soft_roast", text: "This is precisely why local backups exist. Lesson learned." },
      ],
      afterburns: [
        "Cloud services can shut down with very little warning.",
        "Export your data regularly. Do not wait for shutdown notices.",
        "Always have a second copy of anything irreplaceable.",
      ],
    },
    {
      text: "Should I pay for cloud storage or use the free tier?",
      verdicts: [
        { family: "cautious_maybe", text: "Free is fine for casual use. Paid usually means better privacy commitments." },
        { family: "approved", text: "Paying means you are the customer, not the product. Rare but deserved." },
        { family: "soft_roast", text: "Free storage costs something. It is just not money." },
      ],
      afterburns: [
        "Paid plans usually come with stronger privacy policies.",
        "A few dollars a month is cheap insurance for your files.",
        "Check what the free tier scans or shares before trusting it.",
      ],
    },
    {
      text: "My cloud share links never expire. Should I fix that?",
      verdicts: [
        { family: "hard_no", text: "A link that never expires is a door that never closes. Yes, fix it." },
        { family: "soft_roast", text: "Those links have been open for months. Maybe years. The duck has counted." },
        { family: "chaos", text: "Somewhere, an old link you completely forgot about is still working right now." },
      ],
      afterburns: [
        "Set expiry dates on every shared link.",
        "Old links are the easiest thing to forget and the riskiest to leave open.",
        "Review your shared links at least once a year.",
      ],
    },
    {
      text: "Can my cloud provider see my files?",
      verdicts: [
        { family: "hard_no", text: "If it is not end-to-end encrypted, yes. They can. That is the arrangement." },
        { family: "cautious_maybe", text: "Most providers can see your files. End-to-end encrypted ones cannot." },
        { family: "soft_roast", text: "If they can reset your password and restore your access, they can see your files." },
      ],
      afterburns: [
        "If they hold the keys, they can unlock your files.",
        "End-to-end encryption is the only guarantee they cannot look.",
        "Ask yourself: could their support team access my files if asked? That is your answer.",
      ],
    },
    {
      text: "I use cloud storage for work and personal stuff. Fine?",
      verdicts: [
        { family: "cautious_maybe", text: "Separate them. Work data has different rules, risks, and compliance requirements." },
        { family: "soft_roast", text: "Your work files and your vacation photos share the same folder. That is brave." },
        { family: "hard_no", text: "Mixing work and personal in one account is a disaster waiting to happen." },
      ],
      afterburns: [
        "If your company manages the account, they can access your personal files.",
        "Use separate accounts for work and personal. Non-negotiable.",
        "A data request from your employer could expose everything in that account.",
      ],
    },
  ],
  photo_sharing: [
    {
      text: "Should I share vacation photos with a public link?",
      verdicts: [
        { family: "hard_no", text: "Public means anyone with the link can see them. Use invite-only." },
        { family: "soft_roast", text: "You made your vacation accessible to the entire internet. Bold move." },
        { family: "cautious_maybe", text: "Only if the photos are genuinely casual. Anything personal, keep private." },
      ],
      afterburns: [
        "Public links get forwarded. That is what they do.",
        "A private album takes thirty seconds more and is much safer.",
        "Links travel farther than your intentions.",
      ],
    },
    {
      text: "Is it safe to send photos through a group chat?",
      verdicts: [
        { family: "cautious_maybe", text: "Depends on the size of the group and how personal the photos actually are." },
        { family: "soft_roast", text: "That group chat has forty people and you just sent something personal. Interesting choice." },
        { family: "chaos", text: "Everyone in that group can save, forward, and screenshot those photos right now." },
      ],
      afterburns: [
        "Group chats are not private albums.",
        "The more people in a group, the less private it is.",
        "Send sensitive photos in a direct message, not to the whole group.",
      ],
    },
    {
      text: "Should I send passport photos over email?",
      verdicts: [
        { family: "hard_no", text: "Email is not encrypted by default. Identity documents do not belong there." },
        { family: "chaos", text: "Your passport is now sitting in two unencrypted inboxes indefinitely." },
        { family: "cautious_maybe", text: "Only over encrypted email. Regular email is not safe for this." },
      ],
      afterburns: [
        "Identity documents in email are a phishing target.",
        "Use an encrypted sharing service with an expiring link instead.",
        "Delete the email after the recipient confirms receipt.",
      ],
    },
    {
      text: "Should I post travel photos while still on the trip?",
      verdicts: [
        { family: "cautious_maybe", text: "Wait until you are home. Live posts announce your absence to everyone." },
        { family: "soft_roast", text: "You are currently announcing to the internet that your house is empty." },
        { family: "chaos", text: "Live vacation posts are a real-time map of everywhere you are not." },
      ],
      afterburns: [
        "Post after the trip. The photos will still be good.",
        "Delayed sharing is free security.",
        "Live posting reveals your location and your empty home simultaneously.",
      ],
    },
    {
      text: "What is the safest way to share baby photos with family?",
      verdicts: [
        { family: "approved", text: "A private, invite-only album with a trusted service. That is the way." },
        { family: "cautious_maybe", text: "Use a private album. Avoid public posts and large group chats." },
        { family: "soft_roast", text: "Please do not post them publicly. Your kid will form opinions about this later." },
      ],
      afterburns: [
        "Your child cannot consent to being online. Protect their privacy.",
        "Private albums with trusted family members are the safest option.",
        "Think about what your kid would want visible when they are older.",
      ],
    },
    {
      text: "A friend wants original photos. Should I send them?",
      verdicts: [
        { family: "cautious_maybe", text: "Originals contain metadata. Strip it first or send a compressed version." },
        { family: "soft_roast", text: "Original photos carry GPS data, timestamps, and your device information. Generous gift." },
        { family: "approved", text: "If you trust the friend and the platform, originals are fine." },
      ],
      afterburns: [
        "Original photos include metadata like precise location and camera model.",
        "Most sharing platforms strip metadata automatically. Direct sends do not.",
        "When in doubt, send a compressed copy.",
      ],
    },
    {
      text: "Is an anyone-with-the-link album safe?",
      verdicts: [
        { family: "hard_no", text: "Anyone with the link means exactly that. Anyone." },
        { family: "soft_roast", text: "That link is one forward away from being completely public." },
        { family: "cautious_maybe", text: "Only for non-sensitive photos. And set an expiry date while you are at it." },
      ],
      afterburns: [
        "Links get shared, forwarded, and bookmarked by people you have never met.",
        "Invite-only is always safer than link-based sharing.",
        "If the photos are personal, the link should be controlled.",
      ],
    },
    {
      text: "Should I strip location data from photos before sharing?",
      verdicts: [
        { family: "approved", text: "Yes. Location data in photos can reveal where you live, work, and sleep. Strip it." },
        { family: "soft_roast", text: "Most people do not know their photos contain GPS coordinates. Now you do." },
        { family: "cautious_maybe", text: "For public sharing, always. For trusted people, it matters less." },
      ],
      afterburns: [
        "Photo metadata includes GPS, time, and device information.",
        "Most social platforms strip metadata on upload. Direct sends do not.",
        "One setting removes location data from all future photos. Set it now.",
      ],
    },
    {
      text: "Are disappearing photos actually safe to send?",
      verdicts: [
        { family: "hard_no", text: "Screenshots exist. Disappearing photos are not actually gone." },
        { family: "soft_roast", text: "You are trusting a timer to protect you from human behavior. Optimistic." },
        { family: "chaos", text: "Disappearing means the app hides it. Not that it cannot be captured." },
      ],
      afterburns: [
        "If someone wants to save it, they will find a way.",
        "Disappearing photos create a false sense of security.",
        "Only send what you would be okay with existing forever.",
      ],
    },
    {
      text: "Should I set an expiry on shared album links?",
      verdicts: [
        { family: "approved", text: "Yes. Always. Expiring links are one of the easiest privacy wins available." },
        { family: "soft_roast", text: "You have links from years ago that are still active. The duck has concerns." },
        { family: "cautious_maybe", text: "For personal photos, absolutely. For casual ones, it is still a good habit." },
      ],
      afterburns: [
        "Expiring links close themselves. You do not have to remember.",
        "A link that lasts forever is a link you will forget about.",
        "Set it and forget it. That is the whole point of expiry.",
      ],
    },
    {
      text: "Is it okay to share screenshots of private conversations?",
      verdicts: [
        { family: "hard_no", text: "The other person did not consent to their messages being shared. That is the whole thing." },
        { family: "soft_roast", text: "You would not want your messages screenshotted and circulated either." },
        { family: "cautious_maybe", text: "Only with the other person's explicit permission. Otherwise, no." },
      ],
      afterburns: [
        "Screenshots of private chats are a trust violation.",
        "What someone says in private was meant to stay private.",
        "Ask before sharing. It takes five seconds.",
      ],
    },
    {
      text: "Should I use a random file-transfer site for photos?",
      verdicts: [
        { family: "hard_no", text: "Random file transfer sites have zero accountability. Use something you actually know." },
        { family: "soft_roast", text: "You are about to upload personal photos to a site you found five minutes ago." },
        { family: "chaos", text: "That site could close tomorrow and your photos could end up anywhere." },
      ],
      afterburns: [
        "Unknown services have unknown privacy practices.",
        "Free file transfer sites often do not encrypt your uploads.",
        "Use a trusted service with a clear privacy policy.",
      ],
    },
    {
      text: "Do I need to worry about metadata in photos I post online?",
      verdicts: [
        { family: "cautious_maybe", text: "Most social platforms strip it. But direct uploads and personal sites do not." },
        { family: "soft_roast", text: "Your photos carry your location, device info, and timestamps. Nice package." },
        { family: "approved", text: "If the platform strips metadata automatically, you are fine." },
      ],
      afterburns: [
        "Metadata can include GPS coordinates accurate to a few meters.",
        "Check your platform's policy on metadata stripping.",
        "When posting on personal sites or blogs, strip metadata manually.",
      ],
    },
    {
      text: "Should I let a photo app auto-share albums?",
      verdicts: [
        { family: "cautious_maybe", text: "Only if you control who is in the shared group and review what gets shared." },
        { family: "hard_no", text: "Auto-sharing means you do not review what goes out. That is a bad deal." },
        { family: "soft_roast", text: "You set it to auto-share and forgot about it three months ago. The duck remembers." },
      ],
      afterburns: [
        "Auto-share means every photo goes out without your review.",
        "Manually sharing takes a moment but keeps you in control.",
        "Review auto-shared albums regularly to catch anything you missed.",
      ],
    },
    {
      text: "A photo printing service wants my whole library. Allow?",
      verdicts: [
        { family: "hard_no", text: "Give it the specific photos you want printed. Not your entire life archive." },
        { family: "soft_roast", text: "You gave a print service your entire camera roll to print one poster. Efficient." },
        { family: "cautious_maybe", text: "Select specific photos. There is no reason it needs everything." },
      ],
      afterburns: [
        "Photo services only need the photos you are actually printing.",
        "Full library access means they can see and store everything else too.",
        "Select photos manually. It only takes a minute.",
      ],
    },
    {
      text: "Is it safe to share photos via social media DMs?",
      verdicts: [
        { family: "cautious_maybe", text: "For casual photos, usually fine. For sensitive ones, use encrypted messaging." },
        { family: "soft_roast", text: "Social media DMs are not as private as they feel." },
        { family: "hard_no", text: "Most social platforms can access DM content. Use encrypted messaging for anything sensitive." },
      ],
      afterburns: [
        "DMs on most platforms are not end-to-end encrypted.",
        "The platform can see everything in your DMs.",
        "For anything sensitive, use a proper encrypted messenger.",
      ],
    },
    {
      text: "Should I share high-res originals or compressed versions?",
      verdicts: [
        { family: "approved", text: "Compressed versions for most people. Originals only when they genuinely need them." },
        { family: "soft_roast", text: "Not everyone needs a 50MB photo of your lunch." },
        { family: "cautious_maybe", text: "Compressed is safer and faster. Originals carry more metadata than you think." },
      ],
      afterburns: [
        "High-res originals contain more metadata and detail than necessary.",
        "Compressed versions look the same to almost everyone.",
        "Originals are for printing. Compressed is for sharing.",
      ],
    },
    {
      text: "I shared a photo with the wrong person. What now?",
      verdicts: [
        { family: "chaos", text: "What is sent is sent. Ask them to delete it and learn from this." },
        { family: "cautious_maybe", text: "Ask them to delete it immediately. Revoke the link if the service allows it." },
        { family: "soft_roast", text: "Double-check the recipient next time. This one is out of your hands now." },
      ],
      afterburns: [
        "Once shared, you cannot fully control where a photo goes.",
        "Some platforms let you unsend or revoke access. Check immediately.",
        "This is why reviewing before sending matters.",
      ],
    },
    {
      text: "Is Google Photos safe for personal photos?",
      verdicts: [
        { family: "cautious_maybe", text: "Secure from outside threats, yes. But Google scans your photos for AI features. Decide if that is okay." },
        { family: "soft_roast", text: "Your photos are safe from hackers. Less so from Google's own AI." },
        { family: "approved", text: "For most people, it is a solid option. Just know it is not end-to-end encrypted." },
      ],
      afterburns: [
        "Google Photos scans for faces, objects, and locations.",
        "It is secure, but not private from Google itself.",
        "Consider end-to-end encrypted alternatives for sensitive photos.",
      ],
    },
    {
      text: "Should I back up my photos to multiple services?",
      verdicts: [
        { family: "approved", text: "Yes. Multiple backups means no single point of failure. You cooked." },
        { family: "soft_roast", text: "You have one backup and are calling it a strategy. The duck has concerns." },
        { family: "cautious_maybe", text: "At least two. One cloud, one local is a good start." },
      ],
      afterburns: [
        "Photos are irreplaceable. Treat backups accordingly.",
        "One backup is better than none. Two is much better than one.",
        "Use different providers so one outage does not end everything.",
      ],
    },
  ],
  family_groups: [
    {
      text: "Should I share personal photos in the big family group?",
      verdicts: [
        { family: "hard_no", text: "A group with thirty relatives is not a private audience. It is a broadcast." },
        { family: "soft_roast", text: "You know someone in that group will forward it. You know this." },
        { family: "cautious_maybe", text: "Only casual photos. Anything personal, use a smaller group." },
      ],
      afterburns: [
        "The bigger the group, the less private it is.",
        "Familiarity does not equal security.",
        "Create a smaller group for people who actually need to see it.",
      ],
    },
    {
      text: "Is the family group chat actually private?",
      verdicts: [
        { family: "hard_no", text: "A group anyone can add people to is not private. It is managed chaos." },
        { family: "soft_roast", text: "It feels private because it is family. It is not." },
        { family: "chaos", text: "Thirty people, no rules, and screenshots happen constantly." },
      ],
      afterburns: [
        "Anyone in the group can forward anything in the group.",
        "Private means you control who sees it. Do you?",
        "Treat family groups as semi-public spaces.",
      ],
    },
    {
      text: "A relative wants my ID photo in the group chat. Send it?",
      verdicts: [
        { family: "hard_no", text: "Never send identity documents in a group chat. Send it privately." },
        { family: "chaos", text: "Your ID photo is now visible to every person in that group. Congratulations." },
        { family: "soft_roast", text: "You considered sending your ID to thirty people because one person asked. Classic." },
      ],
      afterburns: [
        "Send identity documents in a direct, encrypted message only.",
        "Group chats are not secure channels for personal documents.",
        "Delete the photo from the chat after the person confirms receipt.",
      ],
    },
    {
      text: "Should I share travel plans in the family group?",
      verdicts: [
        { family: "cautious_maybe", text: "Share after you are back. Not while you are still away." },
        { family: "soft_roast", text: "You are announcing your empty house to thirty people. The duck is concerned." },
        { family: "chaos", text: "Everyone in the group now knows exactly when your home is empty and for how long." },
      ],
      afterburns: [
        "Travel plans reveal when you are not home.",
        "Share after the trip. The stories will still be good.",
        "A smaller, trusted group is better for trip updates.",
      ],
    },
    {
      text: "The family wants a shared spreadsheet with everyone's info. Good idea?",
      verdicts: [
        { family: "hard_no", text: "A spreadsheet with addresses and phone numbers in a shared folder is a liability." },
        { family: "chaos", text: "Everyone's addresses, birthdays, and phone numbers in one unsecured document. Bold." },
        { family: "soft_roast", text: "That spreadsheet is one accidental share away from being very, very public." },
      ],
      afterburns: [
        "Personal data in a shared document has no real access controls.",
        "If anyone in the family gets compromised, that whole list is exposed.",
        "Use a contact-sharing feature instead of a spreadsheet.",
      ],
    },
    {
      text: "Should I share streaming passwords in the family group?",
      verdicts: [
        { family: "hard_no", text: "Passwords do not belong in group chats. Send them privately." },
        { family: "soft_roast", text: "Your Netflix password is now visible to every cousin and their devices." },
        { family: "cautious_maybe", text: "Share only in a direct message to the specific person who needs it." },
      ],
      afterburns: [
        "Group chats are not password managers.",
        "Send credentials privately. Delete the message after.",
        "Use a shared password manager if multiple people need regular access.",
      ],
    },
    {
      text: "Older relatives forward everything. Share private links with them?",
      verdicts: [
        { family: "soft_roast", text: "You already know the answer. They will forward it. They always do." },
        { family: "hard_no", text: "If there is any chance it gets forwarded, assume it will." },
        { family: "cautious_maybe", text: "Only share casual content. Nothing sensitive." },
      ],
      afterburns: [
        "Forwarding is how private links become public links.",
        "Share directly and ask them not to forward. Then accept the uncertainty.",
        "Consider who might see it beyond the person you sent it to.",
      ],
    },
    {
      text: "Should I auto-sync kid photos to a shared family album?",
      verdicts: [
        { family: "cautious_maybe", text: "Only to a small, trusted group. Not the entire extended family." },
        { family: "hard_no", text: "Auto-sync means no review. Every photo goes out, good or embarrassing." },
        { family: "soft_roast", text: "Auto-sync means you are not reviewing what gets shared. The duck reviews things." },
      ],
      afterburns: [
        "Review photos before sharing them. Auto-sync skips that step entirely.",
        "Your kid's photos deserve careful, intentional sharing.",
        "A manually curated album is worth the extra effort.",
      ],
    },
    {
      text: "Nobody checks who has access to our family albums. Problem?",
      verdicts: [
        { family: "hard_no", text: "If nobody reviews access, access grows forever. That is indeed a problem." },
        { family: "soft_roast", text: "Your family album has been open for years and nobody has looked at the access list." },
        { family: "chaos", text: "People who left the family group three years ago still have access right now." },
      ],
      afterburns: [
        "Access should be reviewed at least once a year.",
        "Remove people who no longer need to be in the album.",
        "Shared albums grow. Access controls should grow with them.",
      ],
    },
    {
      text: "Should I share health updates in the family chat?",
      verdicts: [
        { family: "hard_no", text: "Health information is deeply personal. Share only with those who genuinely need to know." },
        { family: "cautious_maybe", text: "A small, close group is fine. The big family group is not." },
        { family: "soft_roast", text: "Your medical update is now known by every aunt, uncle, and distant cousin." },
      ],
      afterburns: [
        "Health data is sensitive. Share it selectively and intentionally.",
        "A phone call is more private than a group message.",
        "Not everyone in the family group needs your medical details.",
      ],
    },
    {
      text: "We plan events in the family group. Move it somewhere else?",
      verdicts: [
        { family: "cautious_maybe", text: "Event logistics are fine. Personal details and financial info should move." },
        { family: "approved", text: "For basic planning, the group is fine. A cautious duck approves." },
        { family: "soft_roast", text: "You are mixing wedding budgets with casual family chat. The duck has noted this." },
      ],
      afterburns: [
        "Event planning in a group is fine. Sharing payment details is not.",
        "Separate logistics from personal information.",
        "Use a shared doc or event tool for details that need to stay organized.",
      ],
    },
    {
      text: "A parent wants all grandkid photos in a shared album. Set it up?",
      verdicts: [
        { family: "cautious_maybe", text: "A small, private album with just the grandparents is fine." },
        { family: "approved", text: "For a small, trusted group, shared albums are a great solution." },
        { family: "soft_roast", text: "Make sure the album is private and not the entire extended family. Please." },
      ],
      afterburns: [
        "Keep the album small. Grandparents, parents, and that is it.",
        "Review the album privacy settings before adding photos.",
        "A private album is different from a shared one with no limits.",
      ],
    },
    {
      text: "Should I use the family group as my backup plan?",
      verdicts: [
        { family: "hard_no", text: "The family group is not a backup. It is a group chat. Those are different things." },
        { family: "soft_roast", text: "Someone in the family has it is not a backup strategy. The duck is firm on this." },
        { family: "chaos", text: "Your backup plan relies on Aunt Susan not deleting her chat history. That is the plan." },
      ],
      afterburns: [
        "Backups need to be reliable. Group chats are not.",
        "Use actual backup services. Not family members.",
        "If you cannot restore from it on demand, it is not a backup.",
      ],
    },
    {
      text: "Should I share sensitive PDFs with family through a permanent link?",
      verdicts: [
        { family: "hard_no", text: "Permanent links to sensitive documents are permanent risks." },
        { family: "cautious_maybe", text: "Use an expiring link. And send it privately, not in the group." },
        { family: "chaos", text: "That PDF link will still be accessible in five years. The duck has done the math." },
      ],
      afterburns: [
        "Permanent links should not be used for sensitive documents.",
        "Set an expiry. A week is usually enough.",
        "Sensitive documents deserve encrypted, temporary sharing.",
      ],
    },
    {
      text: "The family group keeps adding people I do not know. Still share?",
      verdicts: [
        { family: "hard_no", text: "If you do not know everyone in the group, treat it as public." },
        { family: "soft_roast", text: "You have been sharing personal things with strangers. The duck is auditing your life choices." },
        { family: "cautious_maybe", text: "Stop sharing anything personal until you know everyone in the group." },
      ],
      afterburns: [
        "New members can see old messages in many chat apps.",
        "A group with unknown members is not a private group.",
        "Ask who the new people are before continuing to share.",
      ],
    },
    {
      text: "Is it fine to share financial documents in a family drive?",
      verdicts: [
        { family: "hard_no", text: "A shared family drive is not the place for financial documents." },
        { family: "chaos", text: "Your tax returns are in the same folder as family recipes. Interesting organization." },
        { family: "cautious_maybe", text: "Only in a separate, restricted folder with specific access controls." },
      ],
      afterburns: [
        "Financial documents need restricted access, not family access.",
        "Anyone with drive access can see those files.",
        "Use a separate, encrypted location for financial files.",
      ],
    },
    {
      text: "Should I share my live location with the family group?",
      verdicts: [
        { family: "cautious_maybe", text: "Only temporarily, with specific people, for a specific reason." },
        { family: "hard_no", text: "Live location with a large group is too much information for too many people." },
        { family: "soft_roast", text: "You shared your real-time GPS with thirty people to avoid a few phone calls." },
      ],
      afterburns: [
        "Live location reveals exactly where you are in real time.",
        "Share with one or two people, not the whole group.",
        "Turn it off when you no longer need it. Set a reminder.",
      ],
    },
    {
      text: "How do I share things privately with family who are not tech-savvy?",
      verdicts: [
        { family: "approved", text: "Simple invite-only albums and direct messages. Keep it straightforward." },
        { family: "cautious_maybe", text: "A private link they can click is easier than teaching new tools." },
        { family: "soft_roast", text: "The easiest path is usually the least private. Find a middle ground." },
      ],
      afterburns: [
        "A direct message is private and everyone knows how to use it.",
        "Simple, private sharing tools exist. You do not need to be technical.",
        "Invite-only albums work for non-technical family members too.",
      ],
    },
    {
      text: "Our family uses one shared account for everything. Bad?",
      verdicts: [
        { family: "hard_no", text: "One account means no individual accountability and shared risk. Very bad." },
        { family: "chaos", text: "If one person gets phished, the whole family is compromised instantly." },
        { family: "soft_roast", text: "Five people sharing one account is not a family plan. It is a risk pool." },
      ],
      afterburns: [
        "Shared accounts mean shared blame when something goes wrong.",
        "Each person should have their own account with their own credentials.",
        "If one password is compromised, everyone in the family is affected.",
      ],
    },
    {
      text: "Should I trust family members with my passwords for emergencies?",
      verdicts: [
        { family: "cautious_maybe", text: "Use a password manager with emergency access. Not a text message." },
        { family: "approved", text: "Emergency access features exist for exactly this reason. Use them." },
        { family: "soft_roast", text: "Trusting someone is fine. Texting your passwords is not the way to do it." },
      ],
      afterburns: [
        "Password managers have emergency access features. Use those.",
        "A sealed envelope in a safe is more secure than a text message.",
        "Plan for emergencies properly. Do not improvise with passwords.",
      ],
    },
  ],
  messaging: [
    {
      text: "Should I send my address in a large group chat?",
      verdicts: [
        { family: "hard_no", text: "Your home address does not belong in a group with dozens of people." },
        { family: "soft_roast", text: "You just gave your home address to everyone in that group. All of them." },
        { family: "cautious_maybe", text: "Send it in a direct message to the person who actually needs it." },
      ],
      afterburns: [
        "Group chats are not private, no matter how familiar the people feel.",
        "Your address is sensitive information. Share it selectively.",
        "Send it directly to the person who needs it. Not the group.",
      ],
    },
    {
      text: "A friend wants my passport photo over chat. Send it?",
      verdicts: [
        { family: "hard_no", text: "Not over regular chat. Use an encrypted service with expiring links." },
        { family: "chaos", text: "Your passport photo is now in a chat backup on someone else's phone forever." },
        { family: "cautious_maybe", text: "Only over encrypted messaging. Delete it from the chat after." },
      ],
      afterburns: [
        "Identity documents should never travel through unencrypted channels.",
        "Even encrypted chats get backed up. Delete the message after.",
        "Use a secure file sharing service instead of a chat thread.",
      ],
    },
    {
      text: "Is it safe to send banking screenshots in chat?",
      verdicts: [
        { family: "hard_no", text: "Banking details in chat is asking for trouble. Do not do it." },
        { family: "chaos", text: "Your account number is now saved in someone else's chat history indefinitely." },
        { family: "soft_roast", text: "You sent financial information over chat because it was slightly faster. Noted." },
      ],
      afterburns: [
        "Banking screenshots contain account numbers, balances, and more.",
        "What is convenient for you is convenient for anyone who accesses that chat.",
        "Use your bank's built-in sharing features instead.",
      ],
    },
    {
      text: "Are disappearing messages actually private?",
      verdicts: [
        { family: "hard_no", text: "Screenshots exist. Disappearing messages are not actually gone." },
        { family: "soft_roast", text: "They disappear from the chat. Not from screenshots. Not from memory." },
        { family: "chaos", text: "Disappearing means the app hides them. It does not mean nobody saved them first." },
      ],
      afterburns: [
        "Disappearing messages create a false sense of security.",
        "If someone wants to keep it, they will screenshot it.",
        "Only send what you would be okay with existing forever.",
      ],
    },
    {
      text: "My chat app encrypts messages but not backups. Matter?",
      verdicts: [
        { family: "hard_no", text: "Unencrypted backups mean your messages are readable in the cloud. That matters." },
        { family: "cautious_maybe", text: "Turn on encrypted backups if the app offers it. Check now." },
        { family: "chaos", text: "Your encrypted messages are sitting unencrypted in a cloud backup somewhere." },
      ],
      afterburns: [
        "Encrypted messaging with unencrypted backups is a half measure.",
        "Check your backup settings. Enable encryption if available.",
        "The backup is the weakest link in most messaging apps.",
      ],
    },
    {
      text: "Should I send login credentials in a chat?",
      verdicts: [
        { family: "hard_no", text: "You texted a password. The duck needs a moment." },
        { family: "chaos", text: "Your password is now in a chat history that gets backed up unencrypted." },
        { family: "soft_roast", text: "You sent a password in the same thread where you share memes." },
      ],
      afterburns: [
        "Chat histories are searched, backed up, and sometimes compromised.",
        "Use a password manager to share credentials securely.",
        "Delete the message immediately after the person gets it.",
      ],
    },
    {
      text: "Should I move sensitive conversations to a more private app?",
      verdicts: [
        { family: "approved", text: "Yes. Use an app with end-to-end encryption for anything sensitive." },
        { family: "soft_roast", text: "You have been having sensitive conversations on an unencrypted platform this whole time." },
        { family: "cautious_maybe", text: "For anything you would not want leaked, yes. Move it." },
      ],
      afterburns: [
        "Different conversations deserve different levels of privacy.",
        "End-to-end encrypted apps exist for exactly this reason.",
        "The extra step is worth it for conversations that matter.",
      ],
    },
    {
      text: "A group admin keeps adding strangers. Keep sharing?",
      verdicts: [
        { family: "hard_no", text: "If you do not know everyone, stop sharing personal things. Full stop." },
        { family: "soft_roast", text: "You have been sharing personal things with people you have never met." },
        { family: "chaos", text: "There are now strangers in a group where you shared your home address." },
      ],
      afterburns: [
        "New members can often see old messages.",
        "A group with unknown people is a public channel.",
        "Leave the group or stop sharing. Do not just hope for the best.",
      ],
    },
    {
      text: "Can I trust delete-for-everyone to protect me?",
      verdicts: [
        { family: "hard_no", text: "It deletes the message. Not the screenshot, not the notification preview, not the memory." },
        { family: "soft_roast", text: "Delete-for-everyone is an undo button that does not actually undo." },
        { family: "chaos", text: "They already read it. The notification showed it. It is too late." },
      ],
      afterburns: [
        "Notifications show message previews before you can delete.",
        "Think before sending. Delete-for-everyone is not a safety net.",
        "Some apps do not even guarantee the message is actually removed.",
      ],
    },
    {
      text: "Is it safe to share Wi-Fi passwords in a group chat?",
      verdicts: [
        { family: "cautious_maybe", text: "For a small trusted group, probably fine. For a large one, no." },
        { family: "soft_roast", text: "That Wi-Fi password is now accessible to everyone in the group, forever." },
        { family: "chaos", text: "Your home network password is now searchable in twenty people's chat history." },
      ],
      afterburns: [
        "Wi-Fi passwords give access to your home network.",
        "Share it verbally or in a direct message to the specific person.",
        "Change your Wi-Fi password if you shared it too broadly.",
      ],
    },
    {
      text: "Should I send contract photos over chat?",
      verdicts: [
        { family: "hard_no", text: "Contracts have signatures, terms, and personal details. Use encrypted sharing." },
        { family: "cautious_maybe", text: "Only over encrypted messaging. And delete it from the chat after." },
        { family: "soft_roast", text: "Your signed contract is now in someone's photo library. Good organizational choice." },
      ],
      afterburns: [
        "Contracts contain legally sensitive information.",
        "A photo of a contract in chat is essentially a public document.",
        "Use secure file sharing with access controls.",
      ],
    },
    {
      text: "A stranger in a buy-sell group wants my details. Safe?",
      verdicts: [
        { family: "hard_no", text: "Never give personal details to strangers upfront. Meet in public." },
        { family: "chaos", text: "A stranger now has your name, number, and home address. What a haul." },
        { family: "cautious_maybe", text: "Share only what is necessary. A first name and a meeting point." },
      ],
      afterburns: [
        "Strangers do not need your full details to complete a sale.",
        "Scammers collect details that seem harmless individually.",
        "Meet in a public place. Share minimal information.",
      ],
    },
    {
      text: "Is it safe to forward invitation links widely?",
      verdicts: [
        { family: "cautious_maybe", text: "Only if the link has limited uses or an expiry date." },
        { family: "hard_no", text: "Links that get forwarded reach people you never intended." },
        { family: "chaos", text: "That invitation link has been forwarded to people you have never heard of." },
      ],
      afterburns: [
        "Forwarded links are impossible to control once they leave your hands.",
        "Use limited-use or expiring invitation links.",
        "If anyone with the link can join, anyone will.",
      ],
    },
    {
      text: "Should I share my live location in a chat?",
      verdicts: [
        { family: "cautious_maybe", text: "Only with one or two trusted people, and only when you actually need to." },
        { family: "hard_no", text: "Live location reveals exactly where you are in real time. Be selective." },
        { family: "soft_roast", text: "You shared real-time GPS with a group because it was easier than texting an address." },
      ],
      afterburns: [
        "Live location is powerful. Use it very selectively.",
        "Turn it off as soon as you no longer need it.",
        "There is no reason an entire group needs your real-time location.",
      ],
    },
    {
      text: "I sent something to the wrong person. What do I do?",
      verdicts: [
        { family: "chaos", text: "What is sent is sent. Ask them to delete it. Learn from this." },
        { family: "cautious_maybe", text: "Delete for everyone immediately. Then ask them to delete it too." },
        { family: "soft_roast", text: "Double-check the recipient next time. This one is out of your hands." },
      ],
      afterburns: [
        "Most apps let you delete for everyone. Act fast.",
        "The notification might have already shown a preview. Hope for the best.",
        "This is why proofreading includes checking who you are sending to.",
      ],
    },
    {
      text: "Which messaging app is the most private?",
      verdicts: [
        { family: "approved", text: "Signal is the gold standard for private messaging. The duck approves." },
        { family: "cautious_maybe", text: "Any app with end-to-end encryption and a solid privacy policy is a good start." },
        { family: "soft_roast", text: "You already know the answer. You just do not want to ask your contacts to switch." },
      ],
      afterburns: [
        "End-to-end encryption is the minimum requirement.",
        "Open-source apps let anyone verify the encryption actually works.",
        "The most private app is the one you and your contacts actually use.",
      ],
    },
    {
      text: "Is it safe to discuss work stuff in personal messaging apps?",
      verdicts: [
        { family: "hard_no", text: "Work information in personal apps is a data leak waiting to happen." },
        { family: "cautious_maybe", text: "For casual chat, maybe. For confidential work, absolutely not." },
        { family: "soft_roast", text: "Your company's sensitive information is living in your personal chat history." },
      ],
      afterburns: [
        "Work apps exist for a reason. Use them for work.",
        "Personal apps do not have the same security policies.",
        "A breach of your personal account exposes work data too.",
      ],
    },
    {
      text: "Should read receipts worry me?",
      verdicts: [
        { family: "cautious_maybe", text: "They are a minor privacy consideration. Turn them off if they bother you." },
        { family: "soft_roast", text: "You are worried about read receipts but share your location freely. Interesting priorities." },
        { family: "approved", text: "You can turn them off. It is a personal choice, not a security crisis." },
      ],
      afterburns: [
        "Read receipts tell people when and if you read their messages.",
        "They are a convenience feature, not a serious security threat.",
        "Turn them off if you want more control over your availability.",
      ],
    },
    {
      text: "Someone screenshotted my private message. What can I do?",
      verdicts: [
        { family: "chaos", text: "Nothing technical. You can ask them to delete it and have a very uncomfortable conversation." },
        { family: "hard_no", text: "Once screenshotted, it is out of your control. This is how it works." },
        { family: "soft_roast", text: "This is why you should only send things you are okay with existing forever." },
      ],
      afterburns: [
        "Screenshots are the oldest privacy bypass in messaging.",
        "No app can fully prevent screenshots.",
        "Send only what you would be comfortable seeing shared.",
      ],
    },
    {
      text: "Do encrypted messaging apps protect me from everything?",
      verdicts: [
        { family: "cautious_maybe", text: "They protect messages in transit. Not from screenshots, device access, or bad judgment." },
        { family: "soft_roast", text: "Encrypted means nobody can read it except the person who screenshots it." },
        { family: "chaos", text: "End-to-end encryption protects the pipe. Not the people on either end of it." },
      ],
      afterburns: [
        "Encryption protects against interception, not all risks.",
        "Device security matters as much as message encryption.",
        "The weakest link is usually human behavior, not the technology.",
      ],
    },
  ],
  passwords_passkeys: [
    {
      text: "I use one password for most accounts. Safe enough?",
      verdicts: [
        { family: "hard_no", text: "One breach and every account is compromised. This is not a plan. Change them." },
        { family: "soft_roast", text: "You already know this is bad. You have known for years. You just have not fixed it yet." },
        { family: "chaos", text: "A hacker only needs to crack one password to own your entire digital life. Enjoy." },
      ],
      afterburns: [
        "Password reuse is the number one way accounts get compromised.",
        "A password manager makes unique passwords completely effortless.",
        "If one service gets breached, every account with that password is at risk.",
      ],
    },
    {
      text: "Should I get a password manager?",
      verdicts: [
        { family: "approved", text: "Yes. It is the single best thing you can do for your accounts. The duck is firm on this." },
        { family: "soft_roast", text: "You should have done this years ago. But better late than never." },
        { family: "cautious_maybe", text: "Absolutely. Pick a reputable one and start migrating your passwords today." },
      ],
      afterburns: [
        "A password manager remembers so you do not have to.",
        "It takes an afternoon to set up. It protects you for years.",
        "You will wonder how you managed without it.",
      ],
    },
    {
      text: "I keep passwords in my notes app. How bad is that?",
      verdicts: [
        { family: "hard_no", text: "Unencrypted notes are the first place anyone looks. Move them now." },
        { family: "soft_roast", text: "Your passwords are in a plain text note. The duck is not okay with this." },
        { family: "chaos", text: "Anyone who opens your notes app has every password you own. All of them." },
      ],
      afterburns: [
        "Notes apps are not encrypted or access-controlled by default.",
        "A password manager encrypts your passwords behind a master key.",
        "If someone sees your phone unlocked, they see your notes.",
      ],
    },
    {
      text: "Should I switch to passkeys?",
      verdicts: [
        { family: "approved", text: "Yes. Passkeys are more secure and easier to use. Suspiciously responsible. Approved." },
        { family: "cautious_maybe", text: "Where available, switch. Keep passwords as backup for services that are not ready yet." },
        { family: "soft_roast", text: "Passkeys are better in every measurable way and you are still thinking about it." },
      ],
      afterburns: [
        "Passkeys cannot be phished. Passwords can. That is the whole argument.",
        "They are tied to your device, not a string you have to memorize.",
        "Passkeys are less dramatic than password recovery.",
      ],
    },
    {
      text: "A site uses security questions. Are they secure?",
      verdicts: [
        { family: "hard_no", text: "Security questions based on real answers are just guessable passwords in disguise." },
        { family: "soft_roast", text: "Your mother's maiden name is on LinkedIn. That is not security." },
        { family: "chaos", text: "Anyone who follows you on social media can answer your security questions." },
      ],
      afterburns: [
        "Use random, fake answers and store them in your password manager.",
        "Security questions are the weakest form of account recovery.",
        "Real answers to security questions are often publicly available.",
      ],
    },
    {
      text: "I shared my password with my partner over text. Okay?",
      verdicts: [
        { family: "cautious_maybe", text: "The sharing is fine. The method is not. Use a password manager's sharing feature." },
        { family: "soft_roast", text: "Your password is now in a text message that gets backed up to the cloud." },
        { family: "hard_no", text: "Never send passwords in plain text. There is a proper way to do this." },
      ],
      afterburns: [
        "Text messages are stored, backed up, and sometimes intercepted.",
        "Password managers have secure sharing features for exactly this.",
        "Delete the message after they receive it. Both of you.",
      ],
    },
    {
      text: "I screenshot my 2FA backup codes. Safe?",
      verdicts: [
        { family: "hard_no", text: "Screenshots get synced to the cloud. Your backup codes are living with your selfies. Not safe." },
        { family: "soft_roast", text: "Your recovery codes are in your camera roll. That is not a security plan." },
        { family: "chaos", text: "Those backup codes are now in every cloud backup of your photos. Everywhere." },
      ],
      afterburns: [
        "Your backup codes are living with your selfies. That is not a security plan.",
        "Store backup codes in your password manager, not your camera roll.",
        "If your photo library is compromised, so are your recovery codes.",
      ],
    },
    {
      text: "Is saving passwords in my browser good enough?",
      verdicts: [
        { family: "cautious_maybe", text: "Better than nothing. But a dedicated password manager is more secure." },
        { family: "soft_roast", text: "It is the bare minimum. But at least you are not reusing passwords everywhere." },
        { family: "approved", text: "If your browser encrypts them and you have a strong device password, it is decent." },
      ],
      afterburns: [
        "Browser password managers are improving. Dedicated ones are still better.",
        "Make sure your browser passwords are protected by a master password.",
        "The important thing is that each password is unique.",
      ],
    },
    {
      text: "Should I skip 2FA because it is annoying?",
      verdicts: [
        { family: "hard_no", text: "2FA is annoying for five seconds. Getting hacked is annoying for months." },
        { family: "soft_roast", text: "You skipped the best security feature available because of a minor inconvenience." },
        { family: "chaos", text: "You chose convenience over security. Hackers appreciate that." },
      ],
      afterburns: [
        "2FA stops most account takeovers. It is worth the extra tap.",
        "Use an authenticator app. It is faster than you think.",
        "The annoyance of 2FA is nothing compared to the annoyance of recovery.",
      ],
    },
    {
      text: "Is SMS two-factor better than nothing?",
      verdicts: [
        { family: "cautious_maybe", text: "Yes, but it is the weakest form of 2FA. Use an authenticator app when you can." },
        { family: "approved", text: "Way better than nothing. Upgrade to an app when possible." },
        { family: "soft_roast", text: "SMS 2FA can be intercepted, but it still stops most basic attacks." },
      ],
      afterburns: [
        "SMS can be intercepted via SIM swapping attacks.",
        "Any 2FA is better than no 2FA. Start with what the service offers.",
        "An authenticator app is more secure and works offline.",
      ],
    },
    {
      text: "I change passwords by adding a number at the end. Good?",
      verdicts: [
        { family: "hard_no", text: "Attackers know this pattern. It does not add real security. At all." },
        { family: "soft_roast", text: "Password1, Password2, Password3. You think nobody else thought of this pattern." },
        { family: "chaos", text: "Credential stuffing tools test sequential variations automatically. Yours included." },
      ],
      afterburns: [
        "Predictable patterns are the first thing attackers try.",
        "Use a password manager to generate truly random passwords.",
        "A unique random password is always stronger than a pattern.",
      ],
    },
    {
      text: "Do passkeys work across all my devices?",
      verdicts: [
        { family: "cautious_maybe", text: "Getting better. Most work across Apple, Google, and major password managers." },
        { family: "approved", text: "Cross-device support is solid now. Major platforms sync passkeys." },
        { family: "soft_roast", text: "The setup is a one-time effort. After that, it just works." },
      ],
      afterburns: [
        "Passkeys sync across devices within the same ecosystem.",
        "Third-party password managers now support cross-platform passkeys.",
        "The transition is smoother than you are expecting.",
      ],
    },
    {
      text: "I keep recovery codes in cloud notes. Safe?",
      verdicts: [
        { family: "hard_no", text: "Cloud notes are not encrypted by default. Move them to a password manager." },
        { family: "soft_roast", text: "Your recovery codes are in the least secure place you could have chosen." },
        { family: "cautious_maybe", text: "Only if the notes app is end-to-end encrypted. Most are not." },
      ],
      afterburns: [
        "Recovery codes are as powerful as passwords. Store them accordingly.",
        "A password manager is the right home for recovery codes.",
        "If someone accesses your notes, they access your accounts.",
      ],
    },
    {
      text: "Which accounts need the strongest security?",
      verdicts: [
        { family: "approved", text: "Email, banking, and anything that can reset other accounts. Start there." },
        { family: "cautious_maybe", text: "Start with email. If someone gets your email, they get everything." },
        { family: "soft_roast", text: "Your email has a weak password and it controls every other account you own." },
      ],
      afterburns: [
        "Your email account is the master key. Protect it first.",
        "Prioritize accounts that can reset passwords for other accounts.",
        "Financial accounts and primary email deserve the strongest protection.",
      ],
    },
    {
      text: "What if my email gets hacked?",
      verdicts: [
        { family: "hard_no", text: "A hacked email means every account linked to it is immediately at risk." },
        { family: "chaos", text: "They can reset every password, read every receipt, and impersonate you perfectly." },
        { family: "cautious_maybe", text: "Change the password immediately and enable 2FA. Then audit every linked account." },
      ],
      afterburns: [
        "Email is the single most important account to protect.",
        "A compromised email cascades into every connected service.",
        "Use 2FA on your email above all other accounts.",
      ],
    },
    {
      text: "A family member wants my password for emergencies. How?",
      verdicts: [
        { family: "approved", text: "Use a password manager with an emergency access feature. That is what they exist for." },
        { family: "cautious_maybe", text: "Set up emergency access through a password manager. Not through text." },
        { family: "soft_roast", text: "Do not just text it to them. There is a proper way to do this." },
      ],
      afterburns: [
        "Password managers have emergency access for exactly this scenario.",
        "A sealed envelope in a safe works too.",
        "Plan for emergencies before they happen.",
      ],
    },
    {
      text: "I keep postponing fixing my passwords. Is that okay?",
      verdicts: [
        { family: "hard_no", text: "Every day you wait is another day you are vulnerable. Start today." },
        { family: "soft_roast", text: "Nothing bad has happened yet is not a security strategy. The duck has notes." },
        { family: "chaos", text: "You are gambling that nobody has your reused password in a breach database already." },
      ],
      afterburns: [
        "Breaches happen constantly. Your credentials may already be exposed.",
        "Start with your three most important accounts. That takes ten minutes.",
        "The best time to fix this was a year ago. The second best time is now.",
      ],
    },
    {
      text: "Should I use a different password for every account?",
      verdicts: [
        { family: "approved", text: "Absolutely. That is the entire point of a password manager." },
        { family: "hard_no", text: "Reusing passwords means one breach compromises everything you have." },
        { family: "soft_roast", text: "You already know the answer is yes. You have known for a while now." },
      ],
      afterburns: [
        "Unique passwords contain the damage from any single breach.",
        "A password manager makes this completely effortless.",
        "If it sounds like too much work, that is exactly what password managers solve.",
      ],
    },
    {
      text: "Is biometric login (face or fingerprint) safe?",
      verdicts: [
        { family: "approved", text: "It is convenient and secure. The data stays on your device. Green light." },
        { family: "cautious_maybe", text: "For unlocking your phone and apps, yes. Just have a strong backup PIN too." },
        { family: "soft_roast", text: "Your face is harder to steal than your password. Use biometrics." },
      ],
      afterburns: [
        "Biometric data is stored locally, not in the cloud.",
        "It is faster and more secure than a four-digit PIN.",
        "Pair it with a strong backup password for full security.",
      ],
    },
    {
      text: "My password was in a data breach. What do I do?",
      verdicts: [
        { family: "hard_no", text: "Change it immediately. On every account where you used it." },
        { family: "chaos", text: "That password is in a database being sold to anyone who wants it right now." },
        { family: "cautious_maybe", text: "Change it now. Then check haveibeenpwned.com for other exposures." },
      ],
      afterburns: [
        "Breached passwords are tested against every major service automatically.",
        "Change it everywhere you reused it. Not just the breached site.",
        "This is the moment to finally set up a password manager.",
      ],
    },
  ],
  signups_phone: [
    {
      text: "A shopping site wants my phone number. Do they need it?",
      verdicts: [
        { family: "hard_no", text: "They need your payment. Not your phone number. That is a no from the duck." },
        { family: "soft_roast", text: "They want your number for marketing. Not for your order." },
        { family: "chaos", text: "That phone number will be in their database and on every marketing list forever." },
      ],
      afterburns: [
        "Skip optional phone number fields. They are rarely actually required.",
        "Your phone number is a permanent identifier. Share it sparingly.",
        "If the field is not required, leave it blank.",
      ],
    },
    {
      text: "Should I use Sign in with Google?",
      verdicts: [
        { family: "cautious_maybe", text: "It is convenient and avoids a new password. But it ties your accounts to Google." },
        { family: "approved", text: "For low-stakes accounts, it is quick and avoids password reuse." },
        { family: "soft_roast", text: "Convenient for you. Also convenient for Google to track every service you sign up for." },
      ],
      afterburns: [
        "Social logins trade convenience for giving the provider more data.",
        "If Google locks your account, you lose access to everything linked to it.",
        "For important accounts, a unique email and password is better.",
      ],
    },
    {
      text: "Should I use my real email for a one-time signup?",
      verdicts: [
        { family: "hard_no", text: "Use a burner or alias email. You will never use this account again." },
        { family: "soft_roast", text: "You gave your real email to a site you visited once. Enjoy the spam forever." },
        { family: "cautious_maybe", text: "Use an email alias or a dedicated signup email for this." },
      ],
      afterburns: [
        "One-time signups become permanent newsletter subscriptions.",
        "Email aliases keep your real inbox clean and let you trace leaks.",
        "A dedicated signup email keeps your primary inbox safe.",
      ],
    },
    {
      text: "An app wants my contacts to find friends. Allow?",
      verdicts: [
        { family: "hard_no", text: "Your contacts did not consent to being uploaded. Deny it." },
        { family: "soft_roast", text: "Find friends means upload your entire contact list to our servers. That is the feature." },
        { family: "chaos", text: "Every phone number in your contacts is now in that app's database." },
      ],
      afterburns: [
        "Contact uploads share other people's data without their consent.",
        "You can find friends manually without giving away your contacts.",
        "These features exist to grow the app, not to help you.",
      ],
    },
    {
      text: "A site says phone number is required for security. True?",
      verdicts: [
        { family: "cautious_maybe", text: "Sometimes true. But often it is marketing disguised as security." },
        { family: "soft_roast", text: "They said security. They meant marketing list." },
        { family: "hard_no", text: "Email-based verification works fine. Phone is usually optional if you push back." },
      ],
      afterburns: [
        "Legitimate security uses 2FA apps, not mandatory phone numbers.",
        "If you can skip it, skip it.",
        "Phone numbers are valuable to marketers. That is usually the real reason.",
      ],
    },
    {
      text: "Should I make a burner email for sketchy signups?",
      verdicts: [
        { family: "approved", text: "Absolutely. A separate email for untrusted services is smart. You cooked." },
        { family: "soft_roast", text: "You should have done this before signing up for fifty random sites." },
        { family: "cautious_maybe", text: "Yes. Or use an email alias service for even better tracking." },
      ],
      afterburns: [
        "A burner email protects your real inbox from spam and breaches.",
        "Email alias services let you trace exactly which service leaked your info.",
        "It takes two minutes to set up and saves years of inbox chaos.",
      ],
    },
    {
      text: "A food delivery app defaults to marketing opt-in. Untick it?",
      verdicts: [
        { family: "approved", text: "Always untick marketing opt-ins. Every single time. Green light." },
        { family: "soft_roast", text: "You almost let a burger app send you daily emails for the rest of your life." },
        { family: "hard_no", text: "Default opt-ins are designed to catch you when you are not paying attention." },
      ],
      afterburns: [
        "Pre-checked marketing boxes are a dark pattern. Untick them.",
        "If you want marketing, you can always opt in later. You cannot un-opt-in from spam.",
        "Read the checkboxes at checkout. They count on you not reading.",
      ],
    },
    {
      text: "Should I use my real name on every platform?",
      verdicts: [
        { family: "hard_no", text: "No. Use your real name only where legally required." },
        { family: "soft_roast", text: "Your full name on every platform makes you very easy to find and very easy to profile." },
        { family: "cautious_maybe", text: "For professional platforms, yes. For random apps, absolutely not." },
      ],
      afterburns: [
        "A consistent username across platforms creates a trackable identity.",
        "Use a pseudonym where your real name is not necessary.",
        "Your real name plus your email is enough to build a detailed profile of you.",
      ],
    },
    {
      text: "An app will not work without notifications enabled. Allow?",
      verdicts: [
        { family: "hard_no", text: "An app that forces notifications is prioritizing engagement over your respect." },
        { family: "soft_roast", text: "You let an app hold its features hostage for notification access. Bold negotiation." },
        { family: "cautious_maybe", text: "Enable them to get in. Then revoke notification access in your phone settings." },
      ],
      afterburns: [
        "Required notifications are a dark pattern.",
        "You can revoke notification access in your phone settings after.",
        "Apps that gate features behind notifications do not respect your attention.",
      ],
    },
    {
      text: "Should I allow cross-app tracking?",
      verdicts: [
        { family: "hard_no", text: "No. That is the whole point of the tracking prompt. Deny it every time." },
        { family: "soft_roast", text: "The popup literally asks if you want to be tracked and you considered saying yes." },
        { family: "chaos", text: "Allow and every ad you see will know what you just shopped for. Enjoy." },
      ],
      afterburns: [
        "Cross-app tracking builds a profile you never agreed to.",
        "Denying tracking does not break the app.",
        "If they guilt-trip you about it, that is extra reason to deny.",
      ],
    },
    {
      text: "A brand offers a birthday discount for my date of birth. Worth it?",
      verdicts: [
        { family: "soft_roast", text: "You traded a permanent data point for a one-time discount. The duck has done the math." },
        { family: "cautious_maybe", text: "If you love the brand, sure. Just know your birthday is now in their database forever." },
        { family: "chaos", text: "That birthday is now part of your profile in a marketing database indefinitely." },
      ],
      afterburns: [
        "Birthdays are commonly used for identity verification. Share carefully.",
        "A 10% discount costs you a permanent piece of personal data.",
        "Use a fake birthday if the discount matters that much.",
      ],
    },
    {
      text: "Is it better to create accounts or browse without signing up?",
      verdicts: [
        { family: "approved", text: "If you can use a service without an account, do it. Rare but deserved." },
        { family: "soft_roast", text: "Every account you create is another entry in another database." },
        { family: "cautious_maybe", text: "Create accounts only for services you will actually use regularly." },
      ],
      afterburns: [
        "Fewer accounts means fewer breach risks.",
        "Guest checkout exists for a reason. Use it.",
        "Every account is surface area for leaks.",
      ],
    },
    {
      text: "A checkout page wants my phone number. Shipping or marketing?",
      verdicts: [
        { family: "soft_roast", text: "It says shipping. It means marketing. The duck knows the difference." },
        { family: "cautious_maybe", text: "Delivery services genuinely need a number sometimes. Check if it is required." },
        { family: "chaos", text: "That phone number is going straight from checkout to a marketing database." },
      ],
      afterburns: [
        "If the field is optional, skip it.",
        "Delivery notifications usually work with email too.",
        "Marketing disguised as logistics is the oldest trick in e-commerce.",
      ],
    },
    {
      text: "Should I give my phone number for account recovery?",
      verdicts: [
        { family: "cautious_maybe", text: "For accounts you genuinely care about, yes. It is a valid recovery method." },
        { family: "hard_no", text: "Only for accounts that truly matter. For everything else, email recovery is sufficient." },
        { family: "soft_roast", text: "You gave your number to a site you do not even remember signing up for." },
      ],
      afterburns: [
        "Phone recovery is useful but also makes SIM swapping a risk.",
        "For important accounts, pair phone recovery with 2FA.",
        "Do not give recovery info to services you barely use.",
      ],
    },
    {
      text: "A platform wants full profile details before showing prices. Red flag?",
      verdicts: [
        { family: "hard_no", text: "If they hide pricing behind a full profile, they are collecting data, not selling a product." },
        { family: "soft_roast", text: "They want your data before showing you what they charge. The duck is suspicious." },
        { family: "chaos", text: "You filled out a full profile just to see if you could even afford it." },
      ],
      afterburns: [
        "Transparent pricing should not require a full profile.",
        "If they want data before showing prices, the product might be you.",
        "Look for pricing elsewhere or contact them directly.",
      ],
    },
    {
      text: "Should I sign up with my main email or a secondary one?",
      verdicts: [
        { family: "approved", text: "Use a secondary email for anything non-essential. Suspiciously responsible." },
        { family: "soft_roast", text: "Your main email is in two hundred databases because you used it everywhere." },
        { family: "cautious_maybe", text: "Main email for services you trust. Secondary for everything else." },
      ],
      afterburns: [
        "Your main email is the key to your digital life. Protect it.",
        "A secondary email catches spam and breach fallout so your main inbox does not.",
        "Email aliases make this even easier.",
      ],
    },
    {
      text: "An app asks for my contacts during setup. Decline?",
      verdicts: [
        { family: "hard_no", text: "Decline. Your contacts are other people's private information." },
        { family: "approved", text: "Yes, decline. You can always allow it later if you actually need it." },
        { family: "soft_roast", text: "It asked during setup because that is when you are least likely to question it." },
      ],
      afterburns: [
        "Contact access during setup is a growth tactic, not a feature.",
        "You can use most apps without uploading your contacts.",
        "Declining during setup does not break anything.",
      ],
    },
    {
      text: "Is it safe to use Apple or Google login everywhere?",
      verdicts: [
        { family: "cautious_maybe", text: "Convenient, but it creates a single point of failure. Use wisely." },
        { family: "soft_roast", text: "If Apple or Google locks your account, you lose access to everything linked to it." },
        { family: "approved", text: "For low-stakes accounts, it is a reasonable choice." },
      ],
      afterburns: [
        "Social logins are convenient but tie everything to one provider.",
        "If that provider account is compromised, every linked service is too.",
        "For important accounts, use a unique email and password instead.",
      ],
    },
    {
      text: "Should I delete old accounts I no longer use?",
      verdicts: [
        { family: "approved", text: "Yes. Old accounts are attack surface you forgot about. Delete them." },
        { family: "soft_roast", text: "You have accounts on sites you do not even remember signing up for." },
        { family: "hard_no", text: "Every forgotten account is a potential breach you will not notice." },
      ],
      afterburns: [
        "Old accounts with reused passwords are easy targets.",
        "If you do not use it, delete it.",
        "Fewer accounts means less exposure.",
      ],
    },
    {
      text: "A signup form asks for way too much info. Abandon it?",
      verdicts: [
        { family: "approved", text: "If a signup asks for more than it needs, find an alternative. The duck supports this." },
        { family: "hard_no", text: "Excessive data collection during signup is a clear red flag." },
        { family: "soft_roast", text: "They asked for everything and you almost gave it. The duck has seen this before." },
      ],
      afterburns: [
        "The more data you give at signup, the more they have to lose in a breach.",
        "Fill in only what is required. Skip everything optional.",
        "There is almost always a competitor that asks for less.",
      ],
    },
  ],
  public_wifi_travel: [
    {
      text: "Airport Wi-Fi is free. Should I log into anything?",
      verdicts: [
        { family: "hard_no", text: "Free airport Wi-Fi and important logins do not mix. The duck is firm." },
        { family: "cautious_maybe", text: "Only with a VPN. Without one, stick to casual browsing." },
        { family: "chaos", text: "Free Wi-Fi is how strangers get to share a network with you." },
      ],
      afterburns: [
        "Free Wi-Fi means anyone on that network can see unencrypted traffic.",
        "Use a VPN or wait until you are on a trusted network.",
        "Airport Wi-Fi is convenient. It is not secure.",
      ],
    },
    {
      text: "Should I check my bank on public Wi-Fi?",
      verdicts: [
        { family: "hard_no", text: "Never access banking on public Wi-Fi without a VPN. Never." },
        { family: "chaos", text: "Your banking session on open Wi-Fi is visible to anyone sniffing the network." },
        { family: "cautious_maybe", text: "Only with a VPN. Use mobile data if you do not have one." },
      ],
      afterburns: [
        "Banking on public Wi-Fi is one of the highest-risk things you can do casually.",
        "Use your phone's mobile data for banking. It is much safer.",
        "A VPN is the absolute minimum for sensitive activity on public Wi-Fi.",
      ],
    },
    {
      text: "A cafe Wi-Fi wants me to log in with social media. Do it?",
      verdicts: [
        { family: "hard_no", text: "Social login for Wi-Fi is data collection, not security." },
        { family: "soft_roast", text: "You traded your Facebook profile for thirty minutes of Wi-Fi. Worth it?" },
        { family: "chaos", text: "That cafe now has your social profile linked to your physical location. Cozy." },
      ],
      afterburns: [
        "Social Wi-Fi logins collect your profile data and your physical location.",
        "Use mobile data or ask for a regular password instead.",
        "If Wi-Fi requires your social account, it is not worth it.",
      ],
    },
    {
      text: "My phone auto-connects to public networks. Turn that off?",
      verdicts: [
        { family: "hard_no", text: "Yes. Auto-connecting to unknown networks is a security risk." },
        { family: "approved", text: "Turn it off. Connect manually to networks you actually trust." },
        { family: "chaos", text: "Your phone joins every network named Free WiFi without asking you first." },
      ],
      afterburns: [
        "Auto-connecting means your phone trusts every network it recognizes.",
        "Attackers create fake networks with common names to catch auto-connections.",
        "Manual connection takes five seconds and is much safer.",
      ],
    },
    {
      text: "Should I post that I am traveling while still away?",
      verdicts: [
        { family: "cautious_maybe", text: "Wait until you are home. Live posts announce your absence to everyone." },
        { family: "soft_roast", text: "You are currently telling everyone your house is empty. The duck takes note." },
        { family: "chaos", text: "Live vacation posts are a real-time announcement that you are not home." },
      ],
      afterburns: [
        "Post after the trip. The photos will be just as good.",
        "Delayed sharing is the simplest security measure there is.",
        "Live posting reveals your location and your empty home simultaneously.",
      ],
    },
    {
      text: "Is it safe to use a hotel business center computer?",
      verdicts: [
        { family: "hard_no", text: "Shared computers can have keyloggers and malware. Do not log into anything." },
        { family: "cautious_maybe", text: "For printing a boarding pass, maybe. For logging into accounts, never." },
        { family: "chaos", text: "That hotel computer has been used by hundreds of strangers. Think carefully." },
      ],
      afterburns: [
        "Shared computers are among the least secure places to log in.",
        "Use your own device whenever possible.",
        "If you must use a shared computer, change your passwords afterward.",
      ],
    },
    {
      text: "Should I use public USB charging stations?",
      verdicts: [
        { family: "hard_no", text: "Public USB ports can transfer data, not just power. Bring your own charger." },
        { family: "cautious_maybe", text: "Use a charge-only cable or your own wall adapter." },
        { family: "chaos", text: "That USB port might be charging your phone and copying your data simultaneously." },
      ],
      afterburns: [
        "Juice jacking is real. Use your own cable and adapter.",
        "A portable battery pack eliminates this risk entirely.",
        "Charge-only cables block data transfer. Carry one.",
      ],
    },
    {
      text: "Should I leave Bluetooth on while traveling?",
      verdicts: [
        { family: "cautious_maybe", text: "Turn it off when not actively using it. Simple." },
        { family: "soft_roast", text: "Your Bluetooth has been discoverable to every stranger you have walked past." },
        { family: "hard_no", text: "Bluetooth in public spaces can be used for tracking and unauthorized connections." },
      ],
      afterburns: [
        "Bluetooth broadcasts your device to nearby scanners.",
        "Turn it off in crowded public spaces.",
        "Only enable Bluetooth when you are actively connecting to something.",
      ],
    },
    {
      text: "Is it safe to share my live location publicly during a trip?",
      verdicts: [
        { family: "hard_no", text: "Public live location tells everyone exactly where you are in real time." },
        { family: "chaos", text: "Strangers now know your real-time location and that you are not home." },
        { family: "soft_roast", text: "You broadcast your GPS coordinates for the engagement. The duck is not impressed." },
      ],
      afterburns: [
        "Live location should only be shared with trusted individuals.",
        "Share your trip photos after you return, not during.",
        "Real-time location is extremely personal information.",
      ],
    },
    {
      text: "Should I keep digital copies of my ID on my phone?",
      verdicts: [
        { family: "cautious_maybe", text: "Useful for emergencies, but keep them in an encrypted app, not your camera roll." },
        { family: "soft_roast", text: "Your passport photo is in your camera roll next to vacation selfies. Bold storage choice." },
        { family: "approved", text: "Yes, but store them in a secure, encrypted app. Not your camera roll." },
      ],
      afterburns: [
        "A lost or stolen phone with ID photos in the camera roll is an identity theft risk.",
        "Use a password-protected app for sensitive documents.",
        "Encrypt anything you would not want a stranger to see.",
      ],
    },
    {
      text: "There are multiple free Wi-Fi networks here. Which is real?",
      verdicts: [
        { family: "hard_no", text: "If you cannot verify which is real, use none of them." },
        { family: "cautious_maybe", text: "Ask staff for the exact network name. Do not guess." },
        { family: "chaos", text: "One of those is fake and waiting for you to connect. The duck is sure of it." },
      ],
      afterburns: [
        "Fake Wi-Fi networks are designed to look exactly like the real ones.",
        "Always confirm the exact network name with staff.",
        "When in doubt, use your mobile data.",
      ],
    },
    {
      text: "Should I send sensitive documents over public Wi-Fi?",
      verdicts: [
        { family: "hard_no", text: "Never send sensitive documents on public Wi-Fi without a VPN." },
        { family: "chaos", text: "Your sensitive documents just traveled over a network shared with strangers." },
        { family: "cautious_maybe", text: "Only with a VPN. Otherwise, wait for a secure connection." },
      ],
      afterburns: [
        "Public Wi-Fi is an open channel. Treat it accordingly.",
        "Sensitive documents deserve a secure, private connection.",
        "A few minutes of waiting beats a potential data leak.",
      ],
    },
    {
      text: "Is roaming stress a valid excuse for worse privacy habits?",
      verdicts: [
        { family: "hard_no", text: "No. Stress does not change the risks. The duck is sympathetic but firm." },
        { family: "soft_roast", text: "Being tired is not a security policy." },
        { family: "chaos", text: "You lowered your guard because you were jet-lagged. Hackers do not take vacations." },
      ],
      afterburns: [
        "Travel stress is real. The risks you take under stress are also real.",
        "Set up secure habits before the trip when you are thinking clearly.",
        "Automation and preparation beat in-the-moment decisions.",
      ],
    },
    {
      text: "Should I use a VPN on public Wi-Fi?",
      verdicts: [
        { family: "approved", text: "Always. A VPN is the baseline for public Wi-Fi safety. This is a rare green light." },
        { family: "soft_roast", text: "You are asking whether you should lock your front door. The answer is yes." },
        { family: "cautious_maybe", text: "A reputable paid VPN, yes. A free random one, not necessarily." },
      ],
      afterburns: [
        "A VPN encrypts your traffic so others on the network cannot see it.",
        "Use a paid, reputable VPN. Free VPNs often sell your data.",
        "It is the simplest thing you can do to protect yourself on public Wi-Fi.",
      ],
    },
    {
      text: "I forgot to turn off location sharing after my trip. Problem?",
      verdicts: [
        { family: "cautious_maybe", text: "Turn it off now. Better late than never." },
        { family: "soft_roast", text: "You have been broadcasting your location to people since you got home. Good update." },
        { family: "chaos", text: "Your location has been shared with everyone for weeks. Hope everyone enjoyed the journey." },
      ],
      afterburns: [
        "Set a reminder to turn off location sharing after trips.",
        "Review your location sharing settings regularly.",
        "Location sharing should be temporary, not permanent.",
      ],
    },
    {
      text: "Is it safe to scan my boarding pass into random apps?",
      verdicts: [
        { family: "hard_no", text: "Boarding passes contain personal information. Only scan into trusted apps." },
        { family: "soft_roast", text: "Your boarding pass has your name, booking reference, and frequent flyer number." },
        { family: "cautious_maybe", text: "Only the airline's official app. Not random travel tools." },
      ],
      afterburns: [
        "Boarding pass barcodes contain personal details that can be decoded.",
        "Use only official airline apps for boarding pass storage.",
        "Never post photos of your boarding pass online.",
      ],
    },
    {
      text: "Should I AirDrop files to someone nearby?",
      verdicts: [
        { family: "cautious_maybe", text: "To someone you know, it is fine. Keep AirDrop set to contacts only." },
        { family: "approved", text: "AirDrop to known contacts is secure. Just do not leave it open to everyone." },
        { family: "soft_roast", text: "Your AirDrop has been set to everyone this whole time. The duck noticed." },
      ],
      afterburns: [
        "Set AirDrop to contacts only. Not everyone.",
        "Open AirDrop is how strangers send you unwanted files.",
        "It is a great feature when configured properly.",
      ],
    },
    {
      text: "I store all travel bookings in one email thread. Risky?",
      verdicts: [
        { family: "cautious_maybe", text: "If your email is compromised, all your travel details are conveniently in one place." },
        { family: "soft_roast", text: "One email thread has your flights, hotels, and every confirmation number. Organized and exposed." },
        { family: "chaos", text: "A hacker who gets into your email has your complete travel itinerary. Nice of you." },
      ],
      afterburns: [
        "Spread sensitive information across secure locations.",
        "Use a travel app or encrypted notes for itineraries.",
        "A compromised email exposes every booking in that thread.",
      ],
    },
    {
      text: "Is hotel Wi-Fi safe enough for work?",
      verdicts: [
        { family: "cautious_maybe", text: "Only with a VPN. Hotel Wi-Fi is shared with every guest in the building." },
        { family: "hard_no", text: "Hotel Wi-Fi is public Wi-Fi with a password. Still not safe for work." },
        { family: "soft_roast", text: "That password on the hotel key card does not make the network secure." },
      ],
      afterburns: [
        "A password does not make hotel Wi-Fi private. All guests share the network.",
        "Use a VPN for any work activity on hotel Wi-Fi.",
        "Your company data deserves better than hotel-grade security.",
      ],
    },
    {
      text: "Should I use mobile data instead of public Wi-Fi?",
      verdicts: [
        { family: "approved", text: "Yes. Mobile data is significantly more secure than public Wi-Fi." },
        { family: "soft_roast", text: "You have been using free Wi-Fi to save data while your privacy pays the difference." },
        { family: "cautious_maybe", text: "For anything sensitive, absolutely. Save public Wi-Fi for casual browsing." },
      ],
      afterburns: [
        "Mobile data goes directly to your carrier, not through a shared network.",
        "The extra data cost is worth the security.",
        "For banking and logins, mobile data is always the safer choice.",
      ],
    },
  ],
  links_backups: [
    {
      text: "I will disable this share link later. Will I actually?",
      verdicts: [
        { family: "soft_roast", text: "You will not. Set an expiry date instead of trusting future you." },
        { family: "chaos", text: "That link will be active three years from now. The duck is certain." },
        { family: "approved", text: "Set an expiry now instead of relying on future you. Smart." },
      ],
      afterburns: [
        "Expiry dates do what memory does not.",
        "The link you forget about is the one that causes problems.",
        "Future you is not going to remember. Automate it.",
      ],
    },
    {
      text: "I have old share links still active. Should I clean them up?",
      verdicts: [
        { family: "hard_no", text: "Yes. Old links are open doors you forgot about." },
        { family: "soft_roast", text: "Those links have been active for months. Maybe years. The duck has been watching." },
        { family: "approved", text: "Review and revoke anything you no longer need. A cautious duck nods." },
      ],
      afterburns: [
        "Old links pile up. Access reviews do not happen by themselves.",
        "Schedule a quarterly review of your shared links.",
        "If you do not remember sharing it, revoke it.",
      ],
    },
    {
      text: "Anyone with the link can see my album. Is that private?",
      verdicts: [
        { family: "hard_no", text: "Anyone with the link means anyone. That is not private." },
        { family: "soft_roast", text: "Private-ish is not a real privacy setting. The duck checked." },
        { family: "chaos", text: "That link has been forwarded to people you have never heard of." },
      ],
      afterburns: [
        "Use invite-only sharing for anything personal.",
        "Links are shared, forwarded, and bookmarked more than you think.",
        "If anyone with the link can access it, control depends entirely on who has the link.",
      ],
    },
    {
      text: "Should I set expiry dates on share links?",
      verdicts: [
        { family: "approved", text: "Always. Expiring links are one of the easiest privacy wins you can take." },
        { family: "soft_roast", text: "You have links from years ago that are still active. The duck has done an audit." },
        { family: "cautious_maybe", text: "For anything personal, absolutely. For casual stuff, it is still a good habit." },
      ],
      afterburns: [
        "Expiring links close themselves so you do not have to remember.",
        "A week is usually long enough. A year almost never is.",
        "Set it and forget it. That is the whole point.",
      ],
    },
    {
      text: "I back up to one cloud service only. Enough?",
      verdicts: [
        { family: "hard_no", text: "One backup is a single point of failure. Add a second one." },
        { family: "soft_roast", text: "Your only backup is one outage away from being zero backups. The math is bad." },
        { family: "cautious_maybe", text: "Better than nothing. But add a second backup location when you can." },
      ],
      afterburns: [
        "One backup is better than none. Two is much better than one.",
        "Different providers protect against different failures.",
        "If you cannot afford to lose it, back it up twice.",
      ],
    },
    {
      text: "I have never tested restoring from my backup. Should I?",
      verdicts: [
        { family: "hard_no", text: "An untested backup is not a backup. It is a hope." },
        { family: "soft_roast", text: "You have a backup you have never verified actually works. That is not a backup." },
        { family: "chaos", text: "That backup might be corrupted and you will not know until you desperately need it." },
      ],
      afterburns: [
        "Test your restore process at least once a year.",
        "A backup that cannot be restored is useless.",
        "The worst time to discover your backup does not work is when you need it.",
      ],
    },
    {
      text: "I shared a folder link on a public page. Bad?",
      verdicts: [
        { family: "hard_no", text: "A public link to a private folder is a contradiction. Fix it." },
        { family: "chaos", text: "That folder is now accessible to anyone who visits that page." },
        { family: "soft_roast", text: "You put a private folder link in a public space. The duck is processing this." },
      ],
      afterburns: [
        "Public links on public pages are fully public.",
        "Use invite-only sharing for anything that should be restricted.",
        "Revoke the link and create a new one with proper access controls.",
      ],
    },
    {
      text: "Will I remember where my important files are in six months?",
      verdicts: [
        { family: "soft_roast", text: "You will not. Write it down somewhere secure before you forget." },
        { family: "chaos", text: "In six months you will be searching every device and cloud service you own." },
        { family: "approved", text: "If you document where things are now, yes. If not, probably not." },
      ],
      afterburns: [
        "Document your storage locations in a secure note.",
        "Future you will be grateful for current you's organization.",
        "A file you cannot find is as good as a file you have lost.",
      ],
    },
    {
      text: "I keep encrypted and unencrypted backups together. Problem?",
      verdicts: [
        { family: "cautious_maybe", text: "Ideally separate them. The unencrypted copies weaken the encrypted ones." },
        { family: "soft_roast", text: "Your encrypted backup is sitting right next to the unencrypted version. Interesting." },
        { family: "hard_no", text: "The unencrypted copy defeats the purpose of the encrypted one." },
      ],
      afterburns: [
        "If someone accesses the unencrypted copy, the encryption is irrelevant.",
        "Keep encrypted backups separate from unencrypted ones.",
        "The weakest copy defines your actual security level.",
      ],
    },
    {
      text: "Nobody audits our shared links. Should someone start?",
      verdicts: [
        { family: "hard_no", text: "Yes. Unaudited shared links accumulate risk silently over time." },
        { family: "soft_roast", text: "Those links have been open for years and nobody has looked at them. The duck has." },
        { family: "approved", text: "A quarterly review takes minutes and prevents significant problems." },
      ],
      afterburns: [
        "Links without audits grow into uncontrolled access.",
        "Someone should own the review process. Even informally.",
        "The longer links go unreviewed, the riskier they become.",
      ],
    },
    {
      text: "I rely on cloud trash as my undo button. Is that a backup?",
      verdicts: [
        { family: "hard_no", text: "Trash empties itself. That is not a backup strategy. That is a countdown." },
        { family: "soft_roast", text: "Your backup plan is hoping something stays in the trash long enough. The duck has concerns." },
        { family: "chaos", text: "Cloud trash auto-deletes after 30 days. Hope you do not need it on day 31." },
      ],
      afterburns: [
        "Trash is temporary by design. Backups should be permanent.",
        "A real backup exists in a separate location you control.",
        "Do not confuse undo with recovery. They are not the same thing.",
      ],
    },
    {
      text: "A link preview shows more info than expected. Send it anyway?",
      verdicts: [
        { family: "hard_no", text: "If the preview reveals too much, the link reveals too much." },
        { family: "cautious_maybe", text: "Check what the preview exposes. You might want a different sharing method." },
        { family: "soft_roast", text: "The link preview just showed everyone the title, thumbnail, and description. Surprise." },
      ],
      afterburns: [
        "Link previews pull metadata that you might not want shared.",
        "Some platforms let you disable link previews.",
        "Test the link in a private chat first to see what the preview actually reveals.",
      ],
    },
    {
      text: "My recovery keys are in the same account they recover. Okay?",
      verdicts: [
        { family: "hard_no", text: "That is like locking your spare key inside the house. Classic." },
        { family: "chaos", text: "If you lose access to the account, you lose the recovery method too. Perfect circle." },
        { family: "soft_roast", text: "You stored the backup inside the thing it is supposed to back up. The duck is impressed, negatively." },
      ],
      afterburns: [
        "Recovery keys must be stored separately from what they recover.",
        "Use a different service, a password manager, or a physical copy.",
        "The whole point of recovery is accessing things when the main way fails.",
      ],
    },
    {
      text: "Should I pass a backup drive around the family?",
      verdicts: [
        { family: "cautious_maybe", text: "It works but it is unreliable. Digital backups are more practical." },
        { family: "soft_roast", text: "That drive has been at your aunt's house for two years and counting." },
        { family: "chaos", text: "The drive is somewhere. Nobody is quite sure where. That is your backup." },
      ],
      afterburns: [
        "Physical drives get lost, damaged, or forgotten.",
        "Digital backups are accessible from anywhere.",
        "If the drive is your only backup, it is not enough.",
      ],
    },
    {
      text: "Should I duplicate backups across devices that are not locked?",
      verdicts: [
        { family: "hard_no", text: "Unlocked devices with sensitive backups are a walking data breach." },
        { family: "soft_roast", text: "Your backup is on a device anyone can pick up and browse freely." },
        { family: "cautious_maybe", text: "Only if the devices are encrypted and password-protected." },
      ],
      afterburns: [
        "A backup on an unlocked device is a liability, not a safety net.",
        "Encrypt every device that has sensitive data.",
        "The more copies you have, the more you need to secure each one.",
      ],
    },
    {
      text: "I shared a private album link in a busy group chat. Problem?",
      verdicts: [
        { family: "hard_no", text: "That link is now accessible to everyone in the group. All of them." },
        { family: "chaos", text: "Everyone in that chat can forward your private album to anyone they want." },
        { family: "soft_roast", text: "Private link, public distribution. That is not how privacy works." },
      ],
      afterburns: [
        "A private link stops being private the moment it is widely shared.",
        "Revoke the link and create a new one for the right audience.",
        "Share private links in direct messages, not group chats.",
      ],
    },
    {
      text: "Can a backup count if I have never restored from it?",
      verdicts: [
        { family: "hard_no", text: "A backup you have never tested is not a backup. It is optimism." },
        { family: "soft_roast", text: "You have faith in a backup you have never actually tried. Inspiring." },
        { family: "chaos", text: "That backup could be empty, corrupted, or incomplete. You would not know either way." },
      ],
      afterburns: [
        "Test your backups. It takes minutes and could save everything.",
        "A backup is only real if you can restore from it.",
        "The restore is the part that actually matters, not the backup.",
      ],
    },
    {
      text: "Should I use one permanent link for everything I share?",
      verdicts: [
        { family: "hard_no", text: "One link for everything means one link exposes everything." },
        { family: "soft_roast", text: "You gave the same link to everyone for years. The duck has done the math on who has it." },
        { family: "chaos", text: "That universal link is known by more people than you realize." },
      ],
      afterburns: [
        "Different content deserves different links with different access.",
        "Revoking one link should not break access to everything.",
        "Compartmentalize your sharing. One link per purpose.",
      ],
    },
    {
      text: "Is it safe to store sensitive files on an external hard drive?",
      verdicts: [
        { family: "cautious_maybe", text: "Only if the drive is encrypted and stored somewhere secure." },
        { family: "soft_roast", text: "That unencrypted drive in your desk drawer is not secure storage." },
        { family: "approved", text: "An encrypted external drive is a great offline backup. You cooked, privately." },
      ],
      afterburns: [
        "Encrypt external drives that contain sensitive data.",
        "A lost or stolen drive without encryption is a full data leak.",
        "Physical security matters as much as digital security.",
      ],
    },
    {
      text: "How often should I review who has access to my shared files?",
      verdicts: [
        { family: "approved", text: "At least quarterly. More often for sensitive content." },
        { family: "soft_roast", text: "The answer is more often than never, which is your current frequency." },
        { family: "cautious_maybe", text: "At least once a year. Set a calendar reminder and stick to it." },
      ],
      afterburns: [
        "Access lists grow over time. Regular reviews keep them clean.",
        "Remove anyone who no longer needs access.",
        "A calendar reminder makes this easy to maintain.",
      ],
    },
  ],
};

function buildQuestions(): Question[] {
  return Object.entries(rawQuestions).flatMap(([categoryId, items]) =>
    items.map((item, index) => ({
      id: `${categoryId}_${String(index + 1).padStart(3, "0")}`,
      categoryId: categoryId as CategoryId,
      text: item.text,
      verdicts: item.verdicts,
      afterburns: item.afterburns,
    })),
  );
}

export const questions = buildQuestions();

export const visualVariantsByCategory: Record<CategoryId, string[]> = {
  permissions: ["alert-halo", "scan-lines"],
  ai_apps: ["scan-lines", "vault-beam"],
  cloud_storage: ["vault-beam", "soft-cloud"],
  photo_sharing: ["film-glow", "soft-cloud"],
  family_groups: ["soft-cloud", "film-glow"],
  messaging: ["alert-halo", "soft-cloud"],
  passwords_passkeys: ["vault-beam", "alert-halo"],
  signups_phone: ["scan-lines", "film-glow"],
  public_wifi_travel: ["vault-beam", "scan-lines"],
  links_backups: ["alert-halo", "film-glow"],
};
