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
        "It needs one wallpaper. It asked for ten thousand photos. The ratio is off.",
        "Full photo access for a wallpaper is not a trade. It is a heist.",
        "Select the one photo it needs. The wallpaper will survive without seeing your camera roll.",
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
        "Two plus two does not require knowing where you are standing.",
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
        "Bluetooth with no pairing purpose is a tracker pretending to be a feature.",
        "Your phone is announcing itself to every Bluetooth device nearby. On purpose.",
        "You granted a permission you do not understand to an app that will not explain it.",
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
        "Always-on location for weather is a tracking subscription you did not sign up for.",
        "You can type your city name. It takes three seconds. The weather will be the same.",
        "That weather app knows every place you visit. The forecast is a side feature.",
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
        { family: "soft_roast", text: "You have seven apps humming in the background doing absolutely nothing useful for you." },
        { family: "hard_no", text: "If it does not need to run while closed, it is collecting data while you are not looking." },
      ],
      afterburns: [
        "Background activity means the app is working even when you are not. Ask what it is working on.",
        "Seven apps running in the background is seven apps with something to do. None of it is for you.",
        "You closed the app. The app did not close itself. It is still in there.",
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
        "Three permissions for one feature. The math is not adding up.",
        "An app that wants your calendar, contacts, and files wants more than your attention.",
        "If you cannot explain why it needs each permission, neither can the app.",
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
        "Your contacts did not sign up for a gaming social network. You volunteered them.",
        "Find friends means upload everyone you know so we can message them. That is the feature.",
        "The game got your phone book. Your phone book got nothing. Great deal.",
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
        "A shopping app with microphone access is a store that listens to your living room.",
        "Shopping apps need your cart, not your conversations.",
        "If the app cannot explain why it needs your microphone, the explanation is not for your benefit.",
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
        "Full photo access means the app sees everything. Your ID photos, your screenshots, your receipts.",
        "Selected photos is two taps of effort for a lot more control.",
        "You know which photos it needs. It does not need the other nine thousand.",
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
        "Meditation works the same everywhere on earth. Your zip code is not part of the practice.",
        "The app that helps you relax also wants to know where you relax. Suspicious.",
        "You can find inner peace and still deny location access. The two are compatible.",
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
        "That extension can read your bank page, your email, and your medical portal. All at once.",
        "Every extension you install is another stranger with full access to your browser.",
        "You installed it to save two clicks. It can now read every website you visit.",
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
        "Every notification is a tiny interruption. Forty a day is a full-time distraction.",
        "The app asked for notifications to help you. It uses them to sell you things.",
        "You said yes to every notification request and now your phone sounds like a slot machine.",
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
        "Your heart rate, your jogging route, and your sleep patterns. That is a detailed diary, not a fitness feature.",
        "Health data plus GPS history creates a profile more detailed than your medical records.",
        "The app knows where you run, when you sleep, and how stressed you are. That is intimate.",
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
        "Good apps degrade gracefully. Bad apps throw tantrums. You can tell them apart by the crash.",
        "The crash is not a bug. It is a negotiation tactic. The app wants that permission badly.",
        "An app that breaks without an unnecessary permission is telling you something about its priorities.",
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
        "For once, the permission actually matches the feature. The duck is pleasantly surprised.",
        "While using is fine. Always is a delivery app that follows you home and never leaves.",
        "This is the one time precise location makes sense. Do not let that normalize it for every other app.",
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
        "The free app costs nothing. It also asks for everything. Coincidence?",
        "Compare the permission lists side by side. The free version's list is longer. Always.",
        "You saved three dollars and paid with your contact list, your location, and your browsing habits.",
      ],
    },
  ],
  ai_apps: [
    {
      text: "An AI app wants access to my camera roll. Allow?",
      verdicts: [
        { family: "hard_no", text: "Your photo library is not training data. The duck says deny." },
        { family: "chaos", text: "That AI now has every photo you have ever taken. The beach ones, the ID ones, the embarrassing ones." },
        { family: "cautious_maybe", text: "Give it the specific photos it needs. Not the entire archive of your life." },
      ],
      afterburns: [
        "Your camera roll has your face, your ID, your home, and your friends. That is not a casual permission.",
        "You handed over ten thousand photos to fix one image. The duck is doing the math.",
        "AI apps get smarter with your data. Whether you get smarter with the app is less certain.",
      ],
    },
    {
      text: "Should I paste private info into ChatGPT?",
      verdicts: [
        { family: "hard_no", text: "Do not paste anything you would not put on a public website. The duck is serious." },
        { family: "cautious_maybe", text: "Turn off chat history first. Even then, be thoughtful about what you type." },
        { family: "soft_roast", text: "You already pasted it, did you not. The duck suspected as much." },
      ],
      afterburns: [
        "There is no undo button for what you share with an AI. The text box is a one-way door.",
        "You pasted your contract, your medical results, and your complaints about your boss. In one session.",
        "The AI does not judge. But its training data might remember.",
      ],
    },
    {
      text: "An AI writing tool wants to read all my documents. Safe?",
      verdicts: [
        { family: "hard_no", text: "Your documents are your business. Literally and figuratively. Do not hand them over." },
        { family: "chaos", text: "That tool just read your diary, your resume, and your unfinished novel. All at once." },
        { family: "soft_roast", text: "You connected your entire document folder to a tool you installed ten minutes ago. That is commitment." },
      ],
      afterburns: [
        "The marketing page says productive. The privacy page says we process your content. Read both.",
        "Try it with a dummy folder first. Your real documents can wait until you trust it.",
        "Your documents are the most honest version of you. Be careful who reads them.",
      ],
    },
    {
      text: "An AI photo editor uploads my photos to the cloud. Okay?",
      verdicts: [
        { family: "hard_no", text: "If it leaves your device, it lives on their servers. The duck says keep it local." },
        { family: "cautious_maybe", text: "Check if photos are deleted after processing. Most services are vague about this." },
        { family: "soft_roast", text: "You wanted a filter and sent your photos to a server farm to get it. Classic trade." },
      ],
      afterburns: [
        "Your photo went up to the cloud for a filter. Whether it came back down is another question.",
        "On-device editing exists and does not require your photos to leave your phone.",
        "That filter costs one photo upload. What happens to the upload is the real price.",
      ],
    },
    {
      text: "An AI assistant wants access to my email. Should I connect it?",
      verdicts: [
        { family: "hard_no", text: "Your inbox has passwords, receipts, and conversations you forgot about. All of it. No." },
        { family: "chaos", text: "That AI can now read every email you have ever received. Including the ones you wish you had deleted." },
        { family: "cautious_maybe", text: "Only if you deeply trust the company and the access is strictly read-only." },
      ],
      afterburns: [
        "Email access is not one permission. It is the master key to your digital life.",
        "Your inbox contains password resets, financial statements, and private conversations. All in one place.",
        "The AI wants to help you organize. It also gets to read everything while it does.",
      ],
    },
    {
      text: "Should I use an AI tool with no privacy policy?",
      verdicts: [
        { family: "hard_no", text: "No privacy policy means no promises and no accountability. Walk away." },
        { family: "soft_roast", text: "You saw the missing privacy page, shrugged, and kept typing. The duck is watching." },
        { family: "chaos", text: "No policy means they can do literally anything with your data. And nobody can stop them." },
      ],
      afterburns: [
        "A missing privacy policy is not an oversight. It is a choice. A telling one.",
        "You would not eat at a restaurant with no health rating. Same energy.",
        "The tool that does not explain its practices is the tool with the most to hide.",
      ],
    },
    {
      text: "An AI meeting tool records my calls. Should I use it?",
      verdicts: [
        { family: "cautious_maybe", text: "Only with everyone's full knowledge and consent. Not just a banner they might not notice." },
        { family: "hard_no", text: "Recording people without clear consent is an ethical and legal minefield. The duck says no." },
        { family: "soft_roast", text: "Your coworkers think this is a normal meeting. The AI thinks this is training data." },
      ],
      afterburns: [
        "Everyone in the meeting deserves to know a robot is taking notes on them.",
        "Those recordings live on a server. For how long? The tool's privacy page should tell you. If it exists.",
        "You saved thirty minutes of note-taking and created a permanent recording of everyone's voice.",
      ],
    },
    {
      text: "An AI avatar app wants 40 selfies. Worth it?",
      verdicts: [
        { family: "hard_no", text: "40 selfies is a biometric database. That is not a fair trade for a cartoon version of your face." },
        { family: "chaos", text: "You just gave an AI startup a detailed facial dataset. For a profile picture you will use for a week." },
        { family: "soft_roast", text: "You traded 40 selfies for an avatar that sort of looks like you. The duck is doing the cost-benefit analysis." },
      ],
      afterburns: [
        "You can change a leaked password. You cannot change your face.",
        "Those 40 selfies trained a model. The model lives forever. The avatar does not.",
        "The app got a biometric dataset. You got a cartoon. Everybody won. Except you.",
      ],
    },
    {
      text: "Is it safe to let AI organize my photos?",
      verdicts: [
        { family: "cautious_maybe", text: "On-device is fine. Cloud-based face scanning is a completely different conversation." },
        { family: "approved", text: "If it all stays on your device, go for it. On-device AI is the good kind." },
        { family: "soft_roast", text: "Organize means scan every face, object, and location in your library. Just so you know." },
      ],
      afterburns: [
        "On-device AI looks at your photos and keeps its mouth shut. Cloud AI tells the server everything.",
        "Face recognition in the cloud means your face and your friends' faces live on someone else's hardware.",
        "The word organize sounds innocent. The word scan is what is actually happening.",
      ],
    },
    {
      text: "An AI app says my data is used to improve the model. Okay?",
      verdicts: [
        { family: "hard_no", text: "Your private notes should not be someone else's training data. Hard pass." },
        { family: "cautious_maybe", text: "Only if you can opt out. And actually verify the opt-out works. Not just hope." },
        { family: "chaos", text: "Your private inputs are now part of a training dataset shared with millions of users. Anonymized. Probably." },
      ],
      afterburns: [
        "Improve the model is a polished way of saying we keep your data and use it.",
        "You opted into training data by not reading the default setting. That was the plan.",
        "Your data helped make the product better. For everyone except your privacy.",
      ],
    },
    {
      text: "Should I let an AI summarize my browsing history?",
      verdicts: [
        { family: "hard_no", text: "Your browsing history is a map of your mind. Do not hand it to anyone." },
        { family: "chaos", text: "That AI now knows your interests, your anxieties, your health questions, and your 2am rabbit holes." },
        { family: "soft_roast", text: "You wanted a tidy summary and offered up your entire internet history to get it." },
      ],
      afterburns: [
        "Your browsing history knows more about you than your therapist. That is not an exaggeration.",
        "The summary is convenient. The surveillance is permanent.",
        "You gave an AI your search history and it knows things about you that you have not told anyone.",
      ],
    },
    {
      text: "An AI fitness app wants my health data. Reasonable?",
      verdicts: [
        { family: "cautious_maybe", text: "Health data for fitness makes sense. Just check who else sees it besides you." },
        { family: "hard_no", text: "Health data is some of the most sensitive data you own. Do not hand it to an app you just downloaded." },
        { family: "soft_roast", text: "You gave an AI your heart rate, sleep patterns, and workout schedule for slightly better rep counting." },
      ],
      afterburns: [
        "Your resting heart rate plus your GPS history paints a very detailed portrait of your daily life.",
        "Fitness insights last a week. Health data breaches last forever.",
        "The app knows your heart rate, your sleep quality, and your stress levels. That is intimate data for a workout app.",
      ],
    },
    {
      text: "Is AI transcription safe for private conversations?",
      verdicts: [
        { family: "hard_no", text: "If the transcription happens in the cloud, a server heard your private conversation." },
        { family: "cautious_maybe", text: "On-device transcription is fine. Cloud-based means someone else's computer heard it too." },
        { family: "chaos", text: "Your private conversation is now text on a server. Stored, searchable, and backed up somewhere you do not control." },
      ],
      afterburns: [
        "On-device means the audio stays on your phone. Cloud means it went on a trip and might not come back.",
        "You transcribed a private conversation with a cloud tool. The cloud heard every word.",
        "The transcript is convenient. The audio file on their server is the part you did not think about.",
      ],
    },
    {
      text: "An AI keyboard learns how I type. Should I use it?",
      verdicts: [
        { family: "hard_no", text: "A keyboard that learns how you type sees every password, every message, every search. Everything." },
        { family: "cautious_maybe", text: "Only if it processes entirely on-device. If it sends data to the cloud, it is sending your keystrokes." },
        { family: "chaos", text: "That keyboard now has a vocabulary built from your passwords, your messages, and your confessions." },
      ],
      afterburns: [
        "Your keyboard sees everything you type. It is the most intimate app on your phone.",
        "Cloud-based predictions mean your keystrokes leave your phone. All of them.",
        "The built-in keyboard does not phone home. The fancy one might.",
      ],
    },
    {
      text: "Should I upload personal photos to an AI art generator?",
      verdicts: [
        { family: "hard_no", text: "Those photos could end up in a training dataset. Your face in an AI model is not reversible." },
        { family: "soft_roast", text: "You traded a personal photo of yourself for a painting that sort of looks like you. The duck is unimpressed." },
        { family: "chaos", text: "Your face is now part of an AI model's training data. It will generate variations of you for strangers." },
      ],
      afterburns: [
        "The art is temporary. Your face in the dataset is permanent.",
        "Use a stock photo or a landscape. Your personal photos do not need to become training data.",
        "The watercolor was fun. The biometric data you donated to generate it was not part of the pitch.",
      ],
    },
    {
      text: "An AI tool auto-saves my conversations. Problem?",
      verdicts: [
        { family: "hard_no", text: "Auto-saved conversations are a permanent record of everything you asked. Including the dumb questions." },
        { family: "soft_roast", text: "Everything you typed into that tool is saved somewhere. Hope you were careful." },
        { family: "chaos", text: "Your AI chat history is a diary you did not mean to write. And someone else is storing it." },
      ],
      afterburns: [
        "That conversation about your personal problem is saved next to your work questions. All in one log.",
        "Auto-save means you cannot unsay anything. The log remembers.",
        "Your conversations are data. Stored data gets breached. The math is simple.",
      ],
    },
    {
      text: "Is it okay to use AI for my tax documents?",
      verdicts: [
        { family: "hard_no", text: "Tax documents contain your income, your address, and your government ID. Do not upload them." },
        { family: "cautious_maybe", text: "Only with an established, well-known service. Not a startup you heard about on Twitter." },
        { family: "chaos", text: "Your income, address, and Social Security number are now in an AI tool's database. Somewhere." },
      ],
      afterburns: [
        "Tax documents are an identity theft kit. Handle them like one.",
        "You saved an hour of tax prep and uploaded your entire financial identity to do it.",
        "The AI did your taxes faster. Your data is now stored on a server you do not control. Trade-offs.",
      ],
    },
    {
      text: "An AI recommends I share more data for better results. Should I?",
      verdicts: [
        { family: "hard_no", text: "Better results for them. More exposure for you. The duck declines on your behalf." },
        { family: "soft_roast", text: "It asked nicely so you considered giving it everything. The duck recognizes this pattern." },
        { family: "chaos", text: "The AI is actively negotiating for more of your data. And it is better at negotiating than you are." },
      ],
      afterburns: [
        "The suggestion to share more data is not for your benefit. It is for theirs.",
        "Start with the minimum. If the results are bad, the tool is bad. More data will not fix that.",
        "They said better results. They meant more training data. Those are different outcomes.",
      ],
    },
    {
      text: "Should I use a free AI tool or pay for privacy?",
      verdicts: [
        { family: "approved", text: "Paying for privacy is almost always worth it. The duck rarely endorses spending money." },
        { family: "cautious_maybe", text: "Free is fine for playing around. Paid is better for anything that actually matters." },
        { family: "soft_roast", text: "You already know free means your data is the payment. You just wanted someone to say it out loud." },
      ],
      afterburns: [
        "The free tier gave you the product. It took your data as the receipt.",
        "A few dollars a month buys you a privacy policy that actually means something.",
        "Free AI tools have investors. Investors want returns. Your data is the return.",
      ],
    },
    {
      text: "An AI tool says it is end-to-end encrypted. Trust it?",
      verdicts: [
        { family: "cautious_maybe", text: "Verify if it is actually end-to-end or just encrypted in transit. Those are very different things." },
        { family: "soft_roast", text: "Encrypted sounds safe. End-to-end encrypted is safe. They are counting on you not knowing the difference." },
        { family: "approved", text: "If it is truly end-to-end encrypted, open source, and audited, that is a genuine green flag." },
      ],
      afterburns: [
        "End-to-end means even the company cannot read your data. In transit means they can.",
        "The word encrypted on a landing page is marketing. An independent audit is proof.",
        "If they can recover your data when you lose your password, it is not end-to-end. Full stop.",
      ],
    },
  ],
  cloud_storage: [
    {
      text: "I picked my cloud storage because it was popular. Okay?",
      verdicts: [
        { family: "soft_roast", text: "You picked it because everyone else did. That is not a privacy strategy. That is peer pressure." },
        { family: "cautious_maybe", text: "Popular is fine for cat photos. Check the encryption before storing anything real." },
        { family: "chaos", text: "A billion users means a billion targets. You are one of them now." },
      ],
      afterburns: [
        "Popular does not mean private. It means more people have not checked the settings.",
        "The biggest cloud services are also the biggest breach targets. Funny how that works.",
        "You picked it because it was easy. Easy is how they get a billion users and a billion files.",
      ],
    },
    {
      text: "My cloud says encrypted but not end-to-end. Close enough?",
      verdicts: [
        { family: "hard_no", text: "Not end-to-end means they can read your files whenever they want. That is not close." },
        { family: "cautious_maybe", text: "For memes and recipes, sure. For tax documents and contracts, absolutely not." },
        { family: "soft_roast", text: "Encrypted in transit means protected from strangers. Not from the company itself." },
      ],
      afterburns: [
        "They encrypted the hallway but left the room unlocked. Your files are in the room.",
        "If the provider holds the keys, they can open any door. Including yours.",
        "Close enough is not a phrase that belongs near your private files.",
      ],
    },
    {
      text: "Should I use the most convenient cloud or the most private one?",
      verdicts: [
        { family: "approved", text: "Choose privacy. Convenience fades. Regret does not. Finally, some taste." },
        { family: "cautious_maybe", text: "Use both. Convenient for casual files. Private for anything that actually matters." },
        { family: "soft_roast", text: "You already picked convenience. You are just looking for the duck to say it was fine." },
      ],
      afterburns: [
        "Convenience is the reason most people have no idea what their cloud provider does with their files.",
        "The two-cloud strategy sounds excessive until the convenient one has a breach.",
        "You put your files in the easy bucket. The easy bucket has thin walls.",
      ],
    },
    {
      text: "Is one cloud backup enough?",
      verdicts: [
        { family: "hard_no", text: "One backup is not a backup. It is a single point of failure wearing a safety vest." },
        { family: "soft_roast", text: "You have one copy of irreplaceable memories and you are calling it a backup strategy." },
        { family: "chaos", text: "That single backup is one outage, one breach, or one billing error away from zero." },
      ],
      afterburns: [
        "If you cannot afford to lose it, store it in two places that do not know each other.",
        "A backup you have never tested restoring is just a prayer with storage costs.",
        "One is none. Two is one. That math has never been wrong.",
      ],
    },
    {
      text: "Should I turn on automatic cloud uploads?",
      verdicts: [
        { family: "cautious_maybe", text: "Convenient, but everything goes up. Including that screenshot of your ex's message." },
        { family: "soft_roast", text: "Auto-upload does not filter. Your receipts, your screenshots, your ID photos. All of it." },
        { family: "approved", text: "If the service is end-to-end encrypted, auto-upload is actually the smart move." },
      ],
      afterburns: [
        "Auto-upload is a backup feature that moonlights as a privacy risk.",
        "You enabled auto-upload and forgot. Your cloud remembers everything you screenshot.",
        "Every embarrassing photo you take is now automatically preserved in the cloud. Forever.",
      ],
    },
    {
      text: "A free cloud tier offers tons of storage. What is the catch?",
      verdicts: [
        { family: "chaos", text: "The catch is your files are the product. You are storing for free and paying with data." },
        { family: "soft_roast", text: "You know there is a catch. You felt it when you skipped the terms of service." },
        { family: "cautious_maybe", text: "Free tiers are fine for files you would share publicly anyway. Not for anything private." },
      ],
      afterburns: [
        "Free storage costs exactly as much as your data is worth to their ad team.",
        "You got fifty gigabytes for free. They got fifty gigabytes of your files. Fair trade?",
        "The generosity of free storage is directly proportional to the value of your data.",
      ],
    },
    {
      text: "I store tax documents next to memes. Problem?",
      verdicts: [
        { family: "soft_roast", text: "Your tax returns and your reaction images have the same security level. Let that sink in." },
        { family: "chaos", text: "One breach and they get your Social Security number and your meme collection. What a package deal." },
        { family: "cautious_maybe", text: "The memes can stay. The tax documents need to move somewhere encrypted. Today." },
      ],
      afterburns: [
        "Your W-2 is sitting next to a photo of a cat wearing a hat. The duck is speechless.",
        "Identity theft and meme theft have very different consequences. Only one is in an encrypted folder.",
        "Organize by what would ruin your life if leaked. The memes will survive a lower tier.",
      ],
    },
    {
      text: "My cloud scans files for better search. Should I worry?",
      verdicts: [
        { family: "hard_no", text: "If they are scanning your files, they are reading your files. Better search is the excuse." },
        { family: "soft_roast", text: "Better search means their AI looked at your photos, your documents, and your spreadsheets. All of them." },
        { family: "chaos", text: "They trained a search model on the contents of your files. You got autocomplete. They got your data." },
      ],
      afterburns: [
        "You searched for vacation and it found your beach photos. It also read your medical records to get there.",
        "End-to-end encrypted storage cannot scan your files. That is not a bug. That is the point.",
        "Smart search means the server understands your files. Privacy means the server should not.",
      ],
    },
    {
      text: "Should I keep local copies or trust cloud only?",
      verdicts: [
        { family: "approved", text: "Always keep local copies of anything you cannot replace. The duck is proud of this question." },
        { family: "hard_no", text: "Cloud-only is betting your wedding photos on someone else's uptime. Keep local copies." },
        { family: "soft_roast", text: "You deleted the local copy because the cloud felt permanent. Nothing is permanent." },
      ],
      afterburns: [
        "Clouds go down. Services shut down. Hard drives in your desk survive both.",
        "Your cloud provider's uptime guarantee does not cover going out of business.",
        "If you would cry losing it, it should exist in at least two places.",
      ],
    },
    {
      text: "A cloud provider says zero-knowledge. How do I verify?",
      verdicts: [
        { family: "soft_roast", text: "Zero-knowledge is easy to put on a landing page. Proving it takes open source and audits." },
        { family: "cautious_maybe", text: "Check if the code is open source and if they have been independently audited. Blog posts do not count." },
        { family: "approved", text: "Open source code plus independent audits means the claim holds up. Rare and legitimate." },
      ],
      afterburns: [
        "Trust but verify is not just a saying. It is the difference between real and marketing encryption.",
        "If they will not show the code, they are asking you to take their word for it. Do not.",
        "The ones who can prove it are proud to. The ones who cannot get defensive when asked.",
      ],
    },
    {
      text: "Should I share a cloud folder with a direct link?",
      verdicts: [
        { family: "cautious_maybe", text: "Only if the link expires. Otherwise it will outlive the reason you shared it." },
        { family: "hard_no", text: "Direct links get forwarded, bookmarked, and forgotten. One share becomes many." },
        { family: "soft_roast", text: "A direct link is one forward away from being public. You are trusting every recipient's judgment." },
      ],
      afterburns: [
        "You shared it with one person. That person shared it with their team. The link does not care.",
        "Invite-only means you decide who sees what. A link means the link decides.",
        "That link will still be clickable in three years. Will you still want it to be?",
      ],
    },
    {
      text: "My cloud storage has not been updated in years. Problem?",
      verdicts: [
        { family: "soft_roast", text: "The service stopped updating. The threats did not. You see the problem." },
        { family: "chaos", text: "Your files are sitting on software from 2021. The security landscape has moved on without it." },
        { family: "cautious_maybe", text: "If the company is still active, check for updates. If not, move your files somewhere alive." },
      ],
      afterburns: [
        "Abandoned software is an unlocked door that nobody is watching anymore.",
        "You trusted a service that stopped caring. Your files deserve better.",
        "If the last blog post is from two years ago, the service is a ghost. Move your files.",
      ],
    },
    {
      text: "Should I encrypt files before uploading to the cloud?",
      verdicts: [
        { family: "approved", text: "Yes. Encrypting before upload is the safest approach. You understood the assignment." },
        { family: "cautious_maybe", text: "For sensitive files, absolutely. For casual ones, the cloud's own encryption is probably fine." },
        { family: "soft_roast", text: "You thought about pre-encrypting. That puts you ahead of roughly everyone the duck has talked to." },
      ],
      afterburns: [
        "Pre-encryption means even a breach is just a pile of unreadable gibberish.",
        "Two layers of encryption is not paranoia. It is knowing how breaches actually work.",
        "The ten minutes it takes to encrypt before uploading buys you permanent peace of mind.",
      ],
    },
    {
      text: "Is it safe to share cloud storage with my partner?",
      verdicts: [
        { family: "approved", text: "Shared storage with someone you trust is perfectly fine. The duck blesses this arrangement." },
        { family: "cautious_maybe", text: "Shared folder for photos, separate folder for personal documents. That is the move." },
        { family: "soft_roast", text: "Shared storage works beautifully until it does not. Keep your essentials in your own space." },
      ],
      afterburns: [
        "Share the vacation photos. Keep the tax documents in your own folder.",
        "Trust your partner. Also keep a personal encrypted folder. Both things can be true.",
        "The shared folder is for memories. Your personal folder is for things that have your name on them.",
      ],
    },
    {
      text: "I have never checked my cloud privacy settings. Should I?",
      verdicts: [
        { family: "hard_no", text: "Yes. Right now. Default settings are optimized for the company, not for you." },
        { family: "soft_roast", text: "You have been using this service for years and never once looked at the privacy tab. That is bold." },
        { family: "chaos", text: "Your files have been running on factory defaults this entire time. Who knows what is shared." },
      ],
      afterburns: [
        "Default settings are the company's preference, not yours. Five minutes changes that.",
        "You customized your notification sounds but not your privacy settings. Interesting priorities.",
        "Somewhere in those settings is a toggle that is currently sharing more than you think.",
      ],
    },
    {
      text: "A cloud service shut down. What happens to my files?",
      verdicts: [
        { family: "hard_no", text: "If you did not download them in time, they are gone. That is how cloud-only ends." },
        { family: "chaos", text: "The company folded. Your files went with it. The cloud was just someone else's computer. It got unplugged." },
        { family: "soft_roast", text: "This is why the duck keeps saying local backups. This exact moment right here." },
      ],
      afterburns: [
        "The cloud is not forever. It is as permanent as the company running it.",
        "You trusted a startup with your wedding photos. The startup trusted venture capital. Neither lasted.",
        "Somewhere your files are on a server being decommissioned. The download window closed last month.",
      ],
    },
    {
      text: "Should I pay for cloud storage or use the free tier?",
      verdicts: [
        { family: "approved", text: "Paying means you are the customer, not the product. The duck rarely recommends spending money." },
        { family: "soft_roast", text: "Free storage costs exactly what your data is worth to their business model." },
        { family: "cautious_maybe", text: "Free is fine for files you do not care about. For anything else, the paid tier is worth it." },
      ],
      afterburns: [
        "A few dollars a month is cheaper than finding out what free really cost you.",
        "Paid plans come with privacy policies that do not include scanning your files for ad targeting.",
        "You pay for streaming, coffee, and phone cases. Your files deserve at least that much.",
      ],
    },
    {
      text: "My cloud share links never expire. Should I fix that?",
      verdicts: [
        { family: "hard_no", text: "A link that never expires is a door that never closes. Fix it." },
        { family: "soft_roast", text: "Those links have been open for months. Maybe years. You have lost track and so has the duck." },
        { family: "chaos", text: "Somewhere right now, a share link you forgot about in 2022 is still working perfectly." },
      ],
      afterburns: [
        "You set those links to never expire because it was the default. The default is not your friend.",
        "Every old link is an open door you forgot to close. Some have been open for years.",
        "Expiry dates do the remembering so you do not have to.",
      ],
    },
    {
      text: "Can my cloud provider see my files?",
      verdicts: [
        { family: "hard_no", text: "If it is not end-to-end encrypted, yes. They can look at any file, any time." },
        { family: "soft_roast", text: "If their support team can restore your access, they can also look at your files. Same door." },
        { family: "cautious_maybe", text: "Most providers can see your files. The few that use end-to-end encryption genuinely cannot." },
      ],
      afterburns: [
        "If they hold the keys, they can open the lock. Your files are behind that lock.",
        "You trusted them with your files. They also trusted themselves with your files. See the difference.",
        "The test is simple: if you forget your password and they can recover your files, they can see your files.",
      ],
    },
    {
      text: "I use cloud storage for work and personal stuff. Fine?",
      verdicts: [
        { family: "hard_no", text: "Your work spreadsheets and your vacation photos in the same account. That is a collision waiting to happen." },
        { family: "soft_roast", text: "Your company's quarterly report and your weekend selfies share a login. The duck is concerned." },
        { family: "cautious_maybe", text: "Separate accounts. Work data has compliance rules your personal photos do not." },
      ],
      afterburns: [
        "If your company manages the account, they can see your personal files. All of them.",
        "A work data request pulls everything in the account. Including your personal stuff.",
        "You have separate drawers for socks and important documents. Apply the same logic here.",
      ],
    },
  ],
  photo_sharing: [
    {
      text: "Should I share vacation photos with a public link?",
      verdicts: [
        { family: "hard_no", text: "Public means anyone with the link sees everything. Your vacation is now an open gallery." },
        { family: "soft_roast", text: "You made your vacation photos accessible to the entire internet. For convenience." },
        { family: "cautious_maybe", text: "Only genuinely casual shots. Anything personal goes in a private album." },
      ],
      afterburns: [
        "That link will get forwarded to people you have never met. That is what links do.",
        "A private album takes thirty seconds more and keeps your photos yours.",
        "Your beach photos are now indexed by search engines. That was probably not the plan.",
      ],
    },
    {
      text: "Is it safe to send photos through a group chat?",
      verdicts: [
        { family: "cautious_maybe", text: "Depends on the group size and what is in the photo. Forty people is a broadcast." },
        { family: "soft_roast", text: "That group chat has forty people and you just sent something personal. Bold sharing strategy." },
        { family: "chaos", text: "Every person in that group can save, forward, and screenshot your photo right now. All forty of them." },
      ],
      afterburns: [
        "A group chat with forty people is not an album. It is a distribution list.",
        "You sent it to a group. The group sent it to their camera rolls. You lost control.",
        "The photo now exists in forty phones, forty cloud backups, and zero of your control.",
      ],
    },
    {
      text: "Should I send passport photos over email?",
      verdicts: [
        { family: "hard_no", text: "Regular email is not encrypted. Your passport is now sitting in two unprotected inboxes." },
        { family: "chaos", text: "Your passport photo lives in both inboxes indefinitely, searchable, forwardable, and unencrypted." },
        { family: "soft_roast", text: "You emailed a government ID like it was a dinner reservation. The duck needs a minute." },
      ],
      afterburns: [
        "That email with your passport will exist in their inbox long after they needed it.",
        "Your identity document is now as secure as the weakest email account in the chain.",
        "An expiring encrypted link takes the same amount of effort and none of the risk.",
      ],
    },
    {
      text: "Should I post travel photos while still on the trip?",
      verdicts: [
        { family: "cautious_maybe", text: "Wait until you are home. The photos will look exactly the same next week." },
        { family: "soft_roast", text: "You are posting geotagged proof that nobody is home right now. For the engagement." },
        { family: "chaos", text: "Live vacation posts are a real-time map of everywhere you are and everywhere you are not." },
      ],
      afterburns: [
        "The sunset will still look amazing when you post it after landing. Promise.",
        "Delayed sharing costs nothing. Real-time sharing advertises your empty house.",
        "Your followers can wait. The open window of your empty home cannot.",
      ],
    },
    {
      text: "What is the safest way to share baby photos with family?",
      verdicts: [
        { family: "approved", text: "A private, invite-only album with just close family. That is the way. The duck nods." },
        { family: "soft_roast", text: "Please do not post them publicly. Your kid will google themselves one day and have opinions." },
        { family: "cautious_maybe", text: "Private album with a trusted service. Not a public post. Not a large group chat." },
      ],
      afterburns: [
        "Your child cannot consent to an online presence. You are making that decision for them.",
        "A private album for grandparents is sweet. A public post for strangers is a different conversation.",
        "Think about what your kid would want visible when they are sixteen. Then decide.",
      ],
    },
    {
      text: "A friend wants original photos. Should I send them?",
      verdicts: [
        { family: "cautious_maybe", text: "Originals carry GPS coordinates and device info. Strip the metadata or send compressed." },
        { family: "soft_roast", text: "Original photos include your home location, the time you took them, and what phone you own. Generous package." },
        { family: "approved", text: "If you trust the friend, originals are fine. Just know what is embedded in them." },
      ],
      afterburns: [
        "That original photo knows where you were standing when you took it. To the meter.",
        "Social platforms strip metadata automatically. Direct sends hand it over completely.",
        "A compressed copy looks the same and carries none of your GPS history.",
      ],
    },
    {
      text: "Is an anyone-with-the-link album safe?",
      verdicts: [
        { family: "hard_no", text: "Anyone with the link means exactly that. Strangers included." },
        { family: "soft_roast", text: "That link is one forward, one screenshot, one group chat away from being public." },
        { family: "cautious_maybe", text: "For truly casual photos only. And set an expiry date while you are at it." },
      ],
      afterburns: [
        "You sent the link to five people. Those five people have friends too.",
        "Anyone-with-the-link is another way of saying the internet if someone shares it.",
        "Invite-only means names on a list. Link-based means hope and good intentions.",
      ],
    },
    {
      text: "Should I strip location data from photos before sharing?",
      verdicts: [
        { family: "approved", text: "Yes. Your photos contain where you live, where you work, and where you sleep. Strip it." },
        { family: "soft_roast", text: "Every photo you have ever taken contains your GPS coordinates. Most people learn this the uncomfortable way." },
        { family: "cautious_maybe", text: "For public sharing, always. For trusted friends, less critical but still a good habit." },
      ],
      afterburns: [
        "One photo of your kitchen has your home address embedded in it. Down to the street.",
        "Your photos are a location diary. Every shot timestamped and GPS-tagged.",
        "One phone setting turns off location embedding for all future photos. Do it now.",
      ],
    },
    {
      text: "Are disappearing photos actually safe to send?",
      verdicts: [
        { family: "hard_no", text: "Screenshots exist. Screen recording exists. Another phone exists. Nothing disappears." },
        { family: "soft_roast", text: "You are trusting a countdown timer to protect you from human behavior. That is optimistic." },
        { family: "chaos", text: "The photo disappeared. The screenshot the other person took in the first three seconds did not." },
      ],
      afterburns: [
        "Disappearing photos are a magic trick where the audience keeps a copy.",
        "The countdown makes people rush to screenshot. The feature creates the problem it claims to solve.",
        "If you would not want it to exist forever, do not send it. The timer is not your ally.",
      ],
    },
    {
      text: "Should I set an expiry on shared album links?",
      verdicts: [
        { family: "approved", text: "Always. Expiring links are one of the easiest privacy wins there is. The duck approves." },
        { family: "soft_roast", text: "You have album links from years ago that are still live. The duck found one from 2021." },
        { family: "cautious_maybe", text: "For personal photos, absolutely. Even for casual ones, it is a good reflex." },
      ],
      afterburns: [
        "Expiring links close the door for you. Your memory was never going to do it.",
        "A link that lasts forever is a link you will forget about. And it will still work.",
        "One toggle now saves you from forgetting about it for the next three years.",
      ],
    },
    {
      text: "Is it okay to share screenshots of private conversations?",
      verdicts: [
        { family: "hard_no", text: "The other person did not consent to their words being broadcast. That is the line." },
        { family: "soft_roast", text: "You would not want your messages screenshotted and circulated either. You know this." },
        { family: "cautious_maybe", text: "Only with explicit permission from the other person. Otherwise, it is a trust violation." },
      ],
      afterburns: [
        "A private message was private because both people agreed it was. One screenshot changes that.",
        "What someone says in confidence was not written for your group chat audience.",
        "The fastest way to lose someone's trust is to share what they said in private.",
      ],
    },
    {
      text: "Should I use a random file-transfer site for photos?",
      verdicts: [
        { family: "hard_no", text: "A site you found five minutes ago has zero accountability for your photos. Use something real." },
        { family: "soft_roast", text: "You are about to upload personal photos to a site with no privacy policy and a suspicious domain." },
        { family: "chaos", text: "That site could shut down tomorrow and your photos could end up in a data dump. Or an ad." },
      ],
      afterburns: [
        "You googled send large file and clicked the first result. The duck is uncomfortable.",
        "Free transfer sites make money somehow. Your photos might be the somehow.",
        "A service you trust takes the same amount of time and none of the mystery.",
      ],
    },
    {
      text: "Do I need to worry about metadata in photos I post online?",
      verdicts: [
        { family: "cautious_maybe", text: "Most social platforms strip it. Direct uploads to blogs and personal sites do not." },
        { family: "soft_roast", text: "Every photo you have ever taken carries GPS, timestamps, and device info. Most people never check." },
        { family: "approved", text: "If the platform strips metadata on upload, you are covered. Most big ones do." },
      ],
      afterburns: [
        "That photo of your front door has GPS coordinates accurate to a few meters. Just saying.",
        "Social media strips it. Your personal blog does not. Know which one you are using.",
        "Metadata is invisible to you and very visible to anyone who knows how to read it.",
      ],
    },
    {
      text: "Should I let a photo app auto-share albums?",
      verdicts: [
        { family: "hard_no", text: "Auto-share means no review. Every photo goes out. The good ones and the regrettable ones." },
        { family: "soft_roast", text: "You set it to auto-share three months ago and forgot about it. The duck did not forget." },
        { family: "cautious_maybe", text: "Only if you control the audience and actually review what gets shared." },
      ],
      afterburns: [
        "Auto-share does not have judgment. It sends everything including the screenshots you meant to delete.",
        "You lost editorial control over your own photos. The app is the editor now.",
        "One embarrassing photo in the auto-shared album and you are explaining it at dinner.",
      ],
    },
    {
      text: "A photo printing service wants my whole library. Allow?",
      verdicts: [
        { family: "hard_no", text: "You wanted one poster printed. They wanted your entire camera roll. Those are different asks." },
        { family: "soft_roast", text: "You gave full library access to print one photo. That is like opening your whole closet to borrow a shirt." },
        { family: "cautious_maybe", text: "Select the specific photos. There is no reason a print service needs your entire life archive." },
      ],
      afterburns: [
        "They asked for everything. You needed to give them three photos. See the disconnect.",
        "Full library access means they can browse every photo you have ever taken. Including the ones you forgot about.",
        "Select the photos manually. The extra thirty seconds is not worth the access trade.",
      ],
    },
    {
      text: "Is it safe to share photos via social media DMs?",
      verdicts: [
        { family: "cautious_maybe", text: "For casual photos, usually fine. For anything sensitive, the platform can see it." },
        { family: "soft_roast", text: "Social media DMs feel private. The platform reads them. Those are different things." },
        { family: "hard_no", text: "Most social DMs are not end-to-end encrypted. The platform has access to every photo you send." },
      ],
      afterburns: [
        "DMs on most platforms are private from other users. Not from the platform itself.",
        "You thought the conversation was between two people. It is between two people and the company.",
        "For anything you would not want the platform to see, use an encrypted messenger.",
      ],
    },
    {
      text: "Should I share high-res originals or compressed versions?",
      verdicts: [
        { family: "approved", text: "Compressed for sharing. Originals only when someone genuinely needs print quality." },
        { family: "soft_roast", text: "Not everyone needs a 50MB photo of your lunch. A compressed version will do." },
        { family: "cautious_maybe", text: "Compressed is faster, safer, and looks identical on a phone screen." },
      ],
      afterburns: [
        "A 50MB original carries your GPS, your camera model, and your exact timestamp. A compressed version does not.",
        "The person asking for originals probably just wants a clearer photo. Compressed achieves that.",
        "Originals are for printing and archiving. Everything else gets the compressed version.",
      ],
    },
    {
      text: "I shared a photo with the wrong person. What now?",
      verdicts: [
        { family: "chaos", text: "What is sent is sent. The undo window closed before the panic started." },
        { family: "soft_roast", text: "You checked the name after hitting send. That is the wrong order." },
        { family: "cautious_maybe", text: "Ask them to delete it. Revoke the link if the service allows it. Then breathe." },
      ],
      afterburns: [
        "The unsend button does not unsee. They probably already opened it.",
        "Autocomplete chose the wrong name and you tapped send on autopilot. Tale as old as smartphones.",
        "This is the moment you develop the habit of double-checking the recipient. Every time.",
      ],
    },
    {
      text: "Is Google Photos safe for personal photos?",
      verdicts: [
        { family: "cautious_maybe", text: "Secure from hackers, yes. Private from Google's AI, no. Decide what matters more to you." },
        { family: "soft_roast", text: "Your photos are safe from strangers. Google itself scans every one of them for faces and places." },
        { family: "approved", text: "For most people, it is solid. Just know it is not end-to-end encrypted. Google can see your photos." },
      ],
      afterburns: [
        "Google's AI knows your face, your friends' faces, and the restaurants you eat at. From your photos.",
        "Secure and private are not the same thing. Google Photos is one of those.",
        "It is the most convenient option and the least private one. The usual trade-off.",
      ],
    },
    {
      text: "Should I back up my photos to multiple services?",
      verdicts: [
        { family: "approved", text: "Yes. Multiple backups means no single failure can erase your memories. You cooked." },
        { family: "soft_roast", text: "You have one backup of irreplaceable photos and you are calling it covered." },
        { family: "cautious_maybe", text: "At least two. One cloud, one local. Different providers, different failure modes." },
      ],
      afterburns: [
        "Photos are the one thing on your phone that cannot be recreated. Treat them accordingly.",
        "One backup is a gamble. Two backups is a strategy. Three is the duck's recommendation.",
        "One service goes down and your wedding photos go with it. Unless you planned ahead.",
      ],
    },
  ],
  family_groups: [
    {
      text: "Should I share personal photos in the big family group?",
      verdicts: [
        { family: "hard_no", text: "A group with thirty relatives is not a private audience. It is a broadcast channel." },
        { family: "soft_roast", text: "You know someone in that group screenshots everything. You know exactly who." },
        { family: "cautious_maybe", text: "Casual stuff is fine. Anything personal goes to a smaller group of people you actually trust." },
      ],
      afterburns: [
        "That photo is one forward away from someone you did not intend to share it with.",
        "Family does not mean private. It means thirty people with different ideas about sharing.",
        "The cousin who reposts everything is in that group. Plan accordingly.",
      ],
    },
    {
      text: "Is the family group chat actually private?",
      verdicts: [
        { family: "hard_no", text: "Anyone can add anyone. Everyone can forward everything. That is not private." },
        { family: "soft_roast", text: "It feels private because you know these people. It is not private because they all have phones." },
        { family: "chaos", text: "Thirty people, zero rules, and Uncle Dave screenshots everything for his other group chats." },
      ],
      afterburns: [
        "Private means you control who sees it. In a family group, nobody controls anything.",
        "Every message you send is one screenshot away from a completely different audience.",
        "The group feels like a living room. It is actually a stage.",
      ],
    },
    {
      text: "A relative wants my ID photo in the group chat. Send it?",
      verdicts: [
        { family: "hard_no", text: "One person asked. Thirty people would receive it. That math does not work." },
        { family: "chaos", text: "Your government ID is now visible to every person in that group chat. Including the cousins you barely know." },
        { family: "soft_roast", text: "You considered sending your passport to thirty people because one uncle asked. The duck is staring." },
      ],
      afterburns: [
        "Send it in a direct message. Delete it after they confirm. That is the whole process.",
        "Your ID photo in a group chat is a gift to whoever gets compromised first.",
        "One person needed it. The whole group got it. That is how group chats work.",
      ],
    },
    {
      text: "Should I share travel plans in the family group?",
      verdicts: [
        { family: "cautious_maybe", text: "Share the stories after. Not the itinerary before." },
        { family: "soft_roast", text: "You just told thirty people when your house will be empty and for exactly how long." },
        { family: "chaos", text: "The whole family knows your flight number, hotel name, and the dates nobody is home." },
      ],
      afterburns: [
        "The trip photos will be just as good after you get back. Your house will be just as safe.",
        "Travel plans plus an empty house is more information than you meant to share.",
        "Tell the two people who need to know. Not the thirty who are just being nosy.",
      ],
    },
    {
      text: "The family wants a shared spreadsheet with everyone's info. Good idea?",
      verdicts: [
        { family: "hard_no", text: "A spreadsheet with everyone's address, birthday, and phone number in one sharable file. What could go wrong." },
        { family: "chaos", text: "Someone will accidentally share that spreadsheet publicly. The duck does not know who yet. But someone will." },
        { family: "soft_roast", text: "You are building a one-stop-shop for anyone who wants to impersonate your entire family." },
      ],
      afterburns: [
        "That spreadsheet is one wrong click away from being public. One.",
        "If any family member's account is compromised, the whole list goes with it.",
        "A family directory sounds quaint until it becomes a phishing target list.",
      ],
    },
    {
      text: "Should I share streaming passwords in the family group?",
      verdicts: [
        { family: "hard_no", text: "Your Netflix password is now searchable in thirty people's chat history. Forever." },
        { family: "soft_roast", text: "Every cousin, their partner, and their partner's roommate now has your streaming login." },
        { family: "cautious_maybe", text: "Send it privately to the one person who needs it. The group does not need your password." },
      ],
      afterburns: [
        "Your password is now in more devices than you have streaming profiles.",
        "A group chat is not a password vault. It is the opposite of a password vault.",
        "That password will be in chat backups for as long as those phones exist.",
      ],
    },
    {
      text: "Older relatives forward everything. Share private links with them?",
      verdicts: [
        { family: "soft_roast", text: "You know they will forward it. They forwarded your birthday message to the whole church group." },
        { family: "hard_no", text: "If the person forwards chain messages, they will forward your private link. Guaranteed." },
        { family: "cautious_maybe", text: "Only casual content. Nothing you would not want on a community bulletin board." },
      ],
      afterburns: [
        "They do not forward maliciously. They forward enthusiastically. The result is the same.",
        "Your private album link is now in a group chat you have never heard of.",
        "The forwarding instinct is strong. Your expiring link feature is your only defense.",
      ],
    },
    {
      text: "Should I auto-sync kid photos to a shared family album?",
      verdicts: [
        { family: "cautious_maybe", text: "Only to a tiny, trusted group. Not the extended family reunion list." },
        { family: "hard_no", text: "Auto-sync means every photo goes out without your review. Every bath time. Every tantrum." },
        { family: "soft_roast", text: "You gave up editorial control over your kid's photo presence. The duck has opinions about this." },
      ],
      afterburns: [
        "Auto-sync does not have taste. It uploads everything. Including the ones you would have deleted.",
        "Your kid cannot consent to being in a shared album. You are the filter. Be one.",
        "A curated album says I love sharing these moments. Auto-sync says I gave up.",
      ],
    },
    {
      text: "Nobody checks who has access to our family albums. Problem?",
      verdicts: [
        { family: "hard_no", text: "If nobody checks the access list, the access list only grows. That is a problem." },
        { family: "soft_roast", text: "That album has been open for three years and nobody has looked at who is in it. Not once." },
        { family: "chaos", text: "People who left the family group three Christmases ago still have access to every photo since." },
      ],
      afterburns: [
        "Your ex-in-law still has access. Nobody noticed. Nobody checked.",
        "Access lists are like closets. They only get messier if nobody cleans them.",
        "The album membership grew by accident. It will not shrink by accident.",
      ],
    },
    {
      text: "Should I share health updates in the family chat?",
      verdicts: [
        { family: "hard_no", text: "Your medical results do not belong in a group with thirty people. Call the ones who matter." },
        { family: "soft_roast", text: "Every aunt, uncle, and distant cousin now knows your diagnosis. Including the one who gossips." },
        { family: "cautious_maybe", text: "A small, close group is fine. The big family chat is a broadcast, not a conversation." },
      ],
      afterburns: [
        "Health updates in a group chat become family gossip by dinner. Every time.",
        "The people who need to know deserve a phone call, not a group message.",
        "Your medical history is now in thirty people's chat backups. That is a lot of copies.",
      ],
    },
    {
      text: "We plan events in the family group. Move it somewhere else?",
      verdicts: [
        { family: "approved", text: "For basic logistics, the group is fine. Time, place, who is bringing what. The duck approves." },
        { family: "soft_roast", text: "You are mixing wedding venue costs with grandma's recipe requests. That thread has range." },
        { family: "cautious_maybe", text: "Event logistics in the group are fine. Payment details and personal info should move out." },
      ],
      afterburns: [
        "What time should we arrive is fine. Here is my bank account number for the deposit is not.",
        "Event planning is group territory. Financial details are private territory. Keep them apart.",
        "The group can handle who is driving. It should not handle who is paying.",
      ],
    },
    {
      text: "A parent wants all grandkid photos in a shared album. Set it up?",
      verdicts: [
        { family: "approved", text: "A small private album with just the grandparents is actually sweet. The duck approves." },
        { family: "cautious_maybe", text: "Grandparents only. Not the whole extended family. Keep the audience tiny." },
        { family: "soft_roast", text: "Wholesome request. Just make sure the album stays small before it becomes the family Facebook." },
      ],
      afterburns: [
        "Grandparents get the album. The rest of the family gets shown at holidays. That is the rule.",
        "A two-person album is private. A twenty-person album is a newsletter.",
        "The grandparents want photos, not a public gallery. Keep the scope as small as the audience.",
      ],
    },
    {
      text: "Should I use the family group as my backup plan?",
      verdicts: [
        { family: "hard_no", text: "The family group is not a backup. It is a group chat. Those are wildly different things." },
        { family: "soft_roast", text: "Someone in the family has it is not a backup strategy. It is a hope." },
        { family: "chaos", text: "Your backup plan relies on Aunt Susan not deleting her chat history. That is the plan." },
      ],
      afterburns: [
        "Aunt Susan updated her phone last week and lost everything. So much for the family backup.",
        "If you cannot restore from it on demand, it is not a backup. It is a rumor.",
        "Your family is lovely. They are not an IT department.",
      ],
    },
    {
      text: "Should I share sensitive PDFs with family through a permanent link?",
      verdicts: [
        { family: "hard_no", text: "Permanent links to sensitive documents are permanent liabilities. The duck is emphatic." },
        { family: "chaos", text: "That PDF link will be clickable in five years. The document will still be sensitive. You will have forgotten it exists." },
        { family: "cautious_maybe", text: "Use an expiring link. Send it privately. And check back in a week to make sure it expired." },
      ],
      afterburns: [
        "A permanent link to a tax document is a gift that keeps on giving. To anyone with the URL.",
        "Set it to expire in a week. The recipient has seven days. That is plenty.",
        "Permanent means you need to remember it forever. You will not. Set an expiry.",
      ],
    },
    {
      text: "The family group keeps adding people I do not know. Still share?",
      verdicts: [
        { family: "hard_no", text: "If you do not recognize names in the group, treat it as public. Because it is." },
        { family: "soft_roast", text: "You have been sharing personal updates with someone's coworker's neighbor's friend." },
        { family: "cautious_maybe", text: "Stop sharing anything personal until you know every single person in that group." },
      ],
      afterburns: [
        "New members see old messages in many apps. Your home address from six months ago is still in there.",
        "You did not add them. You do not know them. They can see your messages. Act accordingly.",
        "The group grew. Your comfort with it should have shrunk.",
      ],
    },
    {
      text: "Is it fine to share financial documents in a family drive?",
      verdicts: [
        { family: "hard_no", text: "Your tax returns are in the same drive as the family vacation photos. That is not fine." },
        { family: "chaos", text: "Everyone with family drive access can see your financial documents. That is the whole family." },
        { family: "soft_roast", text: "You filed your W-2 next to the family reunion playlist. The duck is concerned about your filing system." },
      ],
      afterburns: [
        "Financial documents in a shared drive have exactly as much protection as the weakest family member's password.",
        "Anyone in the family who gets phished gives away access to your tax returns too.",
        "Your finances deserve their own locked room. Not a shared living room.",
      ],
    },
    {
      text: "Should I share my live location with the family group?",
      verdicts: [
        { family: "hard_no", text: "Live GPS with thirty relatives is surveillance dressed up as convenience. No." },
        { family: "soft_roast", text: "You shared your real-time location with thirty people to avoid texting I am on my way." },
        { family: "cautious_maybe", text: "Share it with one or two people who need it. Not the entire family broadcast." },
      ],
      afterburns: [
        "Your live dot is the most watched thing in that group chat right now.",
        "Thirty people can see you stopped at the gas station. Is that what you wanted?",
        "A text saying ten minutes away achieves the same thing without the GPS tracking.",
      ],
    },
    {
      text: "How do I share things privately with family who are not tech-savvy?",
      verdicts: [
        { family: "approved", text: "Direct messages and simple invite-only albums. No apps to install. The duck approves simplicity." },
        { family: "cautious_maybe", text: "A clickable private link is easier than teaching encryption. Meet them where they are." },
        { family: "soft_roast", text: "The easiest option is always the least private. But for family, easy is what actually gets used." },
      ],
      afterburns: [
        "If your privacy solution is too complicated for them, they will use the insecure one instead.",
        "A direct message is private and nobody needs a tutorial to use it.",
        "The goal is privacy they will actually maintain. Not perfection they will immediately abandon.",
      ],
    },
    {
      text: "Our family uses one shared account for everything. Bad?",
      verdicts: [
        { family: "hard_no", text: "Five people, one password, zero accountability. If something goes wrong, nobody knows who did it." },
        { family: "chaos", text: "One family member clicks a phishing link and every person's data is compromised instantly." },
        { family: "soft_roast", text: "You called it a family account. The security world calls it a shared liability." },
      ],
      afterburns: [
        "One compromised password means every family member is compromised. All at once.",
        "Nobody knows who changed the settings, who shared the link, or who got phished. That is the real problem.",
        "Family sharing features exist so you do not have to share one login. Use them.",
      ],
    },
    {
      text: "Should I trust family members with my passwords for emergencies?",
      verdicts: [
        { family: "cautious_maybe", text: "The trust is fine. The delivery method matters. Do not text it. Do not write it on a sticky note." },
        { family: "approved", text: "Emergency access through a password manager is the proper way. The duck endorses this." },
        { family: "soft_roast", text: "Your mom has your Netflix password on a Post-it note in her kitchen. That is not emergency planning." },
      ],
      afterburns: [
        "Emergency access means planned access. Not a panicked text with your banking password.",
        "Your mom will absolutely write your password on a sticky note. Emergency access features prevent this.",
        "A sealed envelope in a safe is old-fashioned and more secure than any text message.",
      ],
    },
  ],
  messaging: [
    {
      text: "Should I send my address in a large group chat?",
      verdicts: [
        { family: "hard_no", text: "You just gave your home address to thirty people. Some of whom you have never met." },
        { family: "soft_roast", text: "Forty-seven people now have directions to your house. For a dinner party of six." },
        { family: "cautious_maybe", text: "Send it directly to the person who needs it. The group does not need a map to your home." },
      ],
      afterburns: [
        "Group chats leak. Addresses do not expire. Think about that combination.",
        "Everyone in that chat could forward it. And you cannot unfind a house.",
        "The person who needed it could have gotten a DM. The group got a gift instead.",
      ],
    },
    {
      text: "A friend wants my passport photo over chat. Send it?",
      verdicts: [
        { family: "hard_no", text: "Your passport is your identity in a file. Regular chat is not the delivery method." },
        { family: "chaos", text: "Your passport photo is now in a chat backup on someone else's phone forever. Charming." },
        { family: "soft_roast", text: "You sent a government ID through the same app you use to send memes. The duck noticed." },
      ],
      afterburns: [
        "That photo now lives in their chat history, their cloud backup, and their phone's gallery.",
        "A passport photo is an identity theft starter pack. Deliver it carefully.",
        "Encrypted, expiring, and deletable. Those are your three requirements. The chat met zero.",
      ],
    },
    {
      text: "Is it safe to send banking screenshots in chat?",
      verdicts: [
        { family: "hard_no", text: "Your account number, balance, and routing info in a chat thread. The duck is speechless." },
        { family: "chaos", text: "Your financial details are now stored in someone else's chat history indefinitely. Enjoy." },
        { family: "soft_roast", text: "You sent your bank balance over chat because it was faster than logging in together. Priorities." },
      ],
      afterburns: [
        "That screenshot has your account number, your balance, and your transaction history. All in one tap.",
        "Convenience got you to share more financial data than a loan application asks for.",
        "Your bank has secure sharing features. Your group chat does not.",
      ],
    },
    {
      text: "Are disappearing messages actually private?",
      verdicts: [
        { family: "hard_no", text: "Screenshots exist. Disappearing messages are theater, not security." },
        { family: "soft_roast", text: "They disappear from the chat. Not from screenshots. Not from memory. Not from notification previews." },
        { family: "chaos", text: "The message disappeared. The screenshot the other person took did not." },
      ],
      afterburns: [
        "Disappearing messages are a magic trick where the audience keeps a copy.",
        "The timer creates urgency. Urgency creates screenshots. You see the problem.",
        "If the other person has thumbs and a screen, nothing truly disappears.",
      ],
    },
    {
      text: "My chat app encrypts messages but not backups. Matter?",
      verdicts: [
        { family: "hard_no", text: "Encrypted messages backed up unencrypted. That is a locked diary with photocopied pages." },
        { family: "chaos", text: "Your private messages are encrypted in transit and then sitting naked in a cloud backup." },
        { family: "soft_roast", text: "You picked the encrypted app and then let the backup undo all of it. Full circle." },
      ],
      afterburns: [
        "The encryption protects the hallway. The backup leaves the vault door open.",
        "Your messages are private until the backup makes them public.",
        "One toggle in your settings is the difference between encrypted and exposed.",
      ],
    },
    {
      text: "Should I send login credentials in a chat?",
      verdicts: [
        { family: "hard_no", text: "You texted a password. The duck needs a moment." },
        { family: "chaos", text: "Your password now lives in a chat history that gets backed up, synced, and searched." },
        { family: "soft_roast", text: "You sent a password in the same thread where you share memes. Filed between a gif and a recipe." },
      ],
      afterburns: [
        "That password is now in two chat histories, two cloud backups, and two notification logs.",
        "Search your chat for the word password. See how many results come up. Terrifying, right?",
        "A password in a chat thread has the shelf life of a text message and the sensitivity of a vault key.",
      ],
    },
    {
      text: "Should I move sensitive conversations to a more private app?",
      verdicts: [
        { family: "approved", text: "Yes. Sensitive topics deserve an app that was built for them. The duck approves the move." },
        { family: "soft_roast", text: "You have been having sensitive conversations on an unencrypted platform. Like whispering in a megaphone." },
        { family: "chaos", text: "Your private conversations are stored on servers that you do not own, in a country you did not choose." },
      ],
      afterburns: [
        "You would not discuss a medical result in a crowded elevator. Same principle.",
        "The app you use for memes does not need to be the app you use for everything.",
        "Switching apps for sensitive topics is not paranoia. It is basic compartmentalization.",
      ],
    },
    {
      text: "A group admin keeps adding strangers. Keep sharing?",
      verdicts: [
        { family: "hard_no", text: "If you do not know everyone, stop sharing personal things. Full stop." },
        { family: "soft_roast", text: "You have been sharing personal details with people whose names you do not recognize." },
        { family: "chaos", text: "There are strangers in a group where you shared your home address. That address is theirs now." },
      ],
      afterburns: [
        "New members can scroll up and read everything you ever shared. Every message.",
        "A group you do not control is a group you should not trust.",
        "You stayed because leaving felt awkward. Your data stayed because it cannot leave.",
      ],
    },
    {
      text: "Can I trust delete-for-everyone to protect me?",
      verdicts: [
        { family: "hard_no", text: "It deletes the message. Not the screenshot, not the notification preview, not the memory." },
        { family: "soft_roast", text: "Delete-for-everyone is an undo button that does not actually undo." },
        { family: "chaos", text: "They already read it. The notification showed it. Delete-for-everyone is a participation trophy." },
      ],
      afterburns: [
        "The notification preview showed the first line before you could even reach for delete.",
        "You deleted it in two seconds. They screenshotted it in one.",
        "Delete-for-everyone should be called delete-for-you-and-hope-for-the-best.",
      ],
    },
    {
      text: "Is it safe to share Wi-Fi passwords in a group chat?",
      verdicts: [
        { family: "cautious_maybe", text: "For a small trusted group, probably fine. For a large one, you just published your network key." },
        { family: "soft_roast", text: "Your home network password is now permanently searchable in twenty people's chat history." },
        { family: "chaos", text: "Anyone in the group can search the chat, find your Wi-Fi password, and connect from outside your house." },
      ],
      afterburns: [
        "Your Wi-Fi password is now stored in more places than your actual router.",
        "A Wi-Fi password in a group chat is a front door key in a public hallway.",
        "That password has an audience now. Change it after the guests leave.",
      ],
    },
    {
      text: "Should I send contract photos over chat?",
      verdicts: [
        { family: "hard_no", text: "A contract has your signature, your terms, and your personal details. Chat is not the mailroom." },
        { family: "cautious_maybe", text: "Only over encrypted messaging. And delete it from the chat immediately after." },
        { family: "soft_roast", text: "Your signed contract is now in someone's photo library between a sunset and a dog pic." },
      ],
      afterburns: [
        "That contract photo is now in their gallery, their cloud sync, and their chat backup.",
        "You would not tape a signed contract to a bulletin board. A chat thread is not much better.",
        "Contracts have signatures. Signatures are forever. Chat storage is also forever. See the problem.",
      ],
    },
    {
      text: "A stranger in a buy-sell group wants my details. Safe?",
      verdicts: [
        { family: "hard_no", text: "A stranger wants your name, number, and address for a used lamp. No." },
        { family: "chaos", text: "A stranger now has your name, phone number, and home address. For twenty dollars of furniture." },
        { family: "cautious_maybe", text: "First name and a public meeting spot. That is the maximum. The duck is serious." },
      ],
      afterburns: [
        "A twenty-dollar sale does not require your full identity. A first name and a coffee shop work fine.",
        "Scammers collect harmless-looking details until they have enough to impersonate you.",
        "If the deal falls through, a stranger still has your home address. Think about that.",
      ],
    },
    {
      text: "Is it safe to forward invitation links widely?",
      verdicts: [
        { family: "cautious_maybe", text: "Only if the link expires or has a use limit. Otherwise it will outlive the event." },
        { family: "hard_no", text: "A forwarded link reaches people three, four, five hops away from you." },
        { family: "chaos", text: "That invitation link has been forwarded to people you have never heard of. And they are joining." },
      ],
      afterburns: [
        "You sent it to ten people. They sent it to ten more. That is not a guest list anymore.",
        "An unlimited-use link is an open door with a welcome mat.",
        "The link is doing more networking than you are at this point.",
      ],
    },
    {
      text: "Should I share my live location in a chat?",
      verdicts: [
        { family: "cautious_maybe", text: "Only with one or two trusted people, and turn it off when you arrive." },
        { family: "hard_no", text: "Live location in a group chat means everyone watches you move in real time. No." },
        { family: "soft_roast", text: "You shared real-time GPS with a group because typing an address felt like too much effort." },
      ],
      afterburns: [
        "Your live dot is now the most interesting thing in that group chat.",
        "Everyone can see you stopped at the grocery store on the way. And the drive-through.",
        "A dropped pin does the same job without broadcasting your every turn.",
      ],
    },
    {
      text: "I sent something to the wrong person. What do I do?",
      verdicts: [
        { family: "chaos", text: "What is sent is sent. The notification arrived before the regret did." },
        { family: "soft_roast", text: "You had one job: check the name at the top. The duck is looking at you." },
        { family: "cautious_maybe", text: "Delete for everyone immediately. Then text them. Then hope." },
      ],
      afterburns: [
        "The notification preview already showed the first line. The rest is damage control.",
        "You deleted it in five seconds. They read it in two.",
        "Autocomplete chose the wrong person and you hit send anyway. A modern tragedy.",
      ],
    },
    {
      text: "Which messaging app is the most private?",
      verdicts: [
        { family: "approved", text: "Signal is the gold standard for private messaging. The duck gives a rare nod." },
        { family: "soft_roast", text: "You already know the answer. You just do not want to be the person who asks everyone to switch." },
        { family: "chaos", text: "The most private app is the one nobody in your group chat wants to download. Funny how that works." },
      ],
      afterburns: [
        "The best app means nothing if your contacts refuse to use it.",
        "You will suggest it. They will say maybe later. You will stay on the old app. The cycle continues.",
        "Privacy is only as strong as the least private person in the chat.",
      ],
    },
    {
      text: "Is it safe to discuss work stuff in personal messaging apps?",
      verdicts: [
        { family: "hard_no", text: "Company secrets in your personal chat history. HR would like a word." },
        { family: "soft_roast", text: "Your company's quarterly numbers are living in the same app as your family group chat." },
        { family: "chaos", text: "If your personal phone is compromised, so is every work conversation you had on it." },
      ],
      afterburns: [
        "Your boss thinks the work chat is secure. Your personal app proves otherwise.",
        "One phone backup and your work discussions are in your personal cloud. Surprise.",
        "Work stuff in personal apps is how confidential becomes searchable.",
      ],
    },
    {
      text: "Should read receipts worry me?",
      verdicts: [
        { family: "soft_roast", text: "You are worried about read receipts but you share your location with fifteen apps. Interesting." },
        { family: "approved", text: "Not really. They are annoying, not dangerous. Turn them off if they stress you out." },
        { family: "chaos", text: "Read receipts are the smallest privacy problem on your phone. But sure, start there." },
      ],
      afterburns: [
        "Read receipts reveal when you read a message. Your other apps reveal everything else.",
        "The real privacy issue is not who knows you read it. It is who else can read it.",
        "You can dodge a read receipt. You cannot dodge the twelve other tracking methods on your phone.",
      ],
    },
    {
      text: "Someone screenshotted my private message. What can I do?",
      verdicts: [
        { family: "chaos", text: "Technically? Nothing. Socially? Have the most uncomfortable conversation of your week." },
        { family: "hard_no", text: "Once screenshotted, it is out of your control. That is the uncomfortable truth." },
        { family: "soft_roast", text: "You trusted that person with a private message and they turned it into a file. Lesson learned." },
      ],
      afterburns: [
        "Screenshots are the oldest hack in messaging. No encryption can stop a camera roll.",
        "The screenshot now has a life of its own. It can be shared, forwarded, and posted.",
        "Every private message is one screenshot away from being public. That is the deal.",
      ],
    },
    {
      text: "Do encrypted messaging apps protect me from everything?",
      verdicts: [
        { family: "cautious_maybe", text: "They protect the pipe. Not the people on either end of it." },
        { family: "soft_roast", text: "Encrypted means nobody can read it in transit. The person who screenshots it reads it just fine." },
        { family: "chaos", text: "Your messages are encrypted. Your recipient's judgment is not." },
      ],
      afterburns: [
        "Encryption stops eavesdroppers. It does not stop bad decisions.",
        "The lock on the door is strong. The person you gave the key to is the variable.",
        "You secured the message and then sent it to someone who shares everything. Full circle.",
      ],
    },
  ],
  passwords_passkeys: [
    {
      text: "I use one password for most accounts. Safe enough?",
      verdicts: [
        { family: "hard_no", text: "One breach and every account falls like dominoes. This is not a plan." },
        { family: "soft_roast", text: "You have been using the same password since 2014 and calling it a system." },
        { family: "chaos", text: "A hacker only needs to crack one password to own your entire digital life. Efficient." },
      ],
      afterburns: [
        "Somewhere a breach database has your email and that exact password. Right now.",
        "You memorized the lyrics to dozens of songs but drew the line at a second password.",
        "One domino tips and suddenly your email, your bank, and your streaming are all gone.",
      ],
    },
    {
      text: "Should I get a password manager?",
      verdicts: [
        { family: "approved", text: "Yes. It is the single best thing you can do for your accounts. Rare duck approval." },
        { family: "soft_roast", text: "The fact that you are still asking means you have been winging it this whole time." },
        { family: "chaos", text: "You have been memorizing passwords like it is 2005. The duck is exhausted on your behalf." },
      ],
      afterburns: [
        "You trusted your brain with 87 unique strings and your brain said no thank you.",
        "The duck rarely endorses products. This is one of those times.",
        "You have been playing password roulette and somehow won every spin. Until now.",
      ],
    },
    {
      text: "I keep passwords in my notes app. How bad is that?",
      verdicts: [
        { family: "hard_no", text: "Unencrypted notes are the first place anyone looks. This is a treasure map with no lock." },
        { family: "soft_roast", text: "You wrote down all your passwords in the digital equivalent of a sticky note on your monitor." },
        { family: "chaos", text: "Anyone who opens your notes app has every password you own. It is a self-serve buffet." },
      ],
      afterburns: [
        "That note titled passwords is doing more heavy lifting than your entire security setup.",
        "Your notes app has less protection than the diary you kept at age twelve.",
        "One unlocked phone and your entire digital identity is a scroll away.",
      ],
    },
    {
      text: "Should I switch to passkeys?",
      verdicts: [
        { family: "approved", text: "Yes. Passkeys are more secure and easier to use. Suspiciously responsible. Approved." },
        { family: "cautious_maybe", text: "Where available, switch. Keep passwords as backup for the stragglers." },
        { family: "soft_roast", text: "Passkeys are better in every measurable way and you are still thinking about it." },
      ],
      afterburns: [
        "Passkeys cannot be phished. Passwords can. That is the whole argument.",
        "You have been typing passwords like a medieval scribe when the printing press is right there.",
        "The future showed up and it does not require you to remember anything. You are welcome.",
      ],
    },
    {
      text: "A site uses security questions. Are they secure?",
      verdicts: [
        { family: "hard_no", text: "Security questions based on real answers are just guessable passwords in disguise." },
        { family: "soft_roast", text: "Your mother's maiden name is on LinkedIn. That is not security." },
        { family: "chaos", text: "Anyone who follows you on social media can answer your security questions. They are open book exams." },
      ],
      afterburns: [
        "The correct answer to every security question is a random string nobody can guess.",
        "Your first pet's name is in four Instagram captions. The system is broken.",
        "Security questions were invented before people broadcast their lives online. They have not adapted.",
      ],
    },
    {
      text: "I shared my password with my partner over text. Okay?",
      verdicts: [
        { family: "cautious_maybe", text: "The sharing is fine. The method is a horror movie. That text lives in cloud backups now." },
        { family: "soft_roast", text: "Your password is sitting in a text thread between a grocery list and a meme. Romantic." },
        { family: "hard_no", text: "Plain text, backed up to the cloud, searchable forever. The duck needs a moment." },
      ],
      afterburns: [
        "That text message now exists on two phones, two cloud backups, and your carrier's logs.",
        "Love is sharing a password. Wisdom is not doing it over SMS.",
        "If you scrolled up right now you would find it sitting there. So could anyone else.",
      ],
    },
    {
      text: "I screenshot my 2FA backup codes. Safe?",
      verdicts: [
        { family: "hard_no", text: "Screenshots get synced to the cloud. Your backup codes are living with your selfies. Not safe." },
        { family: "soft_roast", text: "Your account recovery plan is filed between a sunset photo and a restaurant menu." },
        { family: "chaos", text: "Those backup codes are now in every cloud backup of your photos. Every single one." },
      ],
      afterburns: [
        "Somewhere between your vacation photos and your lunch pics sits the key to your entire account.",
        "You treated your emergency codes like a casual screenshot. The duck is staring.",
        "If your photo library leaks, so does your way back into every secured account.",
      ],
    },
    {
      text: "Is saving passwords in my browser good enough?",
      verdicts: [
        { family: "cautious_maybe", text: "It is the training wheels of password security. Fine for now, but you will outgrow it." },
        { family: "soft_roast", text: "Your browser is doing the job of a vault and it did not sign up for that responsibility." },
        { family: "approved", text: "If your browser encrypts them and your device is locked down, the duck will allow it." },
      ],
      afterburns: [
        "Your browser is juggling your passwords, your tabs, and your existential searches. That is a lot.",
        "It works until you switch browsers and realize your passwords did not come with you.",
        "At least you stopped reusing passwords. The bar was underground and you cleared it.",
      ],
    },
    {
      text: "Should I skip 2FA because it is annoying?",
      verdicts: [
        { family: "hard_no", text: "2FA is annoying for five seconds. Getting hacked is annoying for months." },
        { family: "soft_roast", text: "You would rather risk your accounts than tap a screen one extra time. Bold priorities." },
        { family: "chaos", text: "You chose convenience over security. Somewhere a hacker just smiled." },
      ],
      afterburns: [
        "Five seconds of annoyance or five weeks of changing passwords and calling your bank.",
        "You lock your front door every day and it is way more inconvenient than tapping a code.",
        "The people who skip 2FA are the same people who have the most interesting recovery stories.",
      ],
    },
    {
      text: "Is SMS two-factor better than nothing?",
      verdicts: [
        { family: "cautious_maybe", text: "It is a deadbolt made of cardboard. Better than an open door, but not by much." },
        { family: "approved", text: "Yes. It stops the lazy attacks. Upgrade when you can, but do not lose sleep." },
        { family: "soft_roast", text: "SMS 2FA is the participation trophy of account security. You showed up. Barely." },
      ],
      afterburns: [
        "A determined attacker can hijack your phone number over lunch. Just saying.",
        "It stops the script kiddies. It does not stop anyone who really wants in.",
        "Your text messages are doing security work they were never designed for.",
      ],
    },
    {
      text: "I change passwords by adding a number at the end. Good?",
      verdicts: [
        { family: "hard_no", text: "Attackers know this pattern. It does not add real security. At all." },
        { family: "soft_roast", text: "Password1, Password2, Password3. You think nobody else thought of this pattern." },
        { family: "chaos", text: "Credential stuffing tools test sequential variations automatically. Yours is in the queue." },
      ],
      afterburns: [
        "You are on Password7 and feeling clever. The attacker's script tried that in milliseconds.",
        "Adding a number to a bad password gives you a slightly different bad password.",
        "The exclamation point at the end is not helping either. The duck checked.",
      ],
    },
    {
      text: "Do passkeys work across all my devices?",
      verdicts: [
        { family: "cautious_maybe", text: "Mostly. A few services are still catching up, but the big ones are ready." },
        { family: "approved", text: "The ecosystem finally got its act together. Cross-device passkeys actually work now." },
        { family: "soft_roast", text: "You are looking for an excuse not to switch and the duck is not going to give you one." },
      ],
      afterburns: [
        "You switched phones and expected everything to break. It did not. Surprise.",
        "The compatibility excuse expired about a year ago. Time to update your objections.",
        "If your phone, laptop, and tablet can all stream video, they can all handle a passkey.",
      ],
    },
    {
      text: "I keep recovery codes in cloud notes. Safe?",
      verdicts: [
        { family: "hard_no", text: "Cloud notes are not encrypted by default. Your escape hatch is sitting in the open." },
        { family: "soft_roast", text: "You put the keys to the kingdom in the least guarded room of the castle." },
        { family: "cautious_maybe", text: "Only if the notes app is end-to-end encrypted. Most are not. Check yours." },
      ],
      afterburns: [
        "Recovery codes in cloud notes is like hiding your house key under a transparent mat.",
        "You went through the trouble of setting up 2FA and then left the backdoor wide open.",
        "Those codes can unlock everything. They deserve better than a note titled stuff.",
      ],
    },
    {
      text: "Which accounts need the strongest security?",
      verdicts: [
        { family: "approved", text: "Email first. It resets every other password you have. Then banking. Then everything else." },
        { family: "soft_roast", text: "Your email has a weak password and it controls every other account you own. Fix that." },
        { family: "chaos", text: "Whoever controls your email controls your bank, your socials, and your identity. Sleep well." },
      ],
      afterburns: [
        "Your email is the skeleton key. Everything else is downstream.",
        "You locked the bedroom but left the front door open. Email is the front door.",
        "Hackers do not start with your bank. They start with your email and work outward.",
      ],
    },
    {
      text: "What if my email gets hacked?",
      verdicts: [
        { family: "hard_no", text: "A hacked email is not one problem. It is every problem at once." },
        { family: "chaos", text: "They can reset every password, read every receipt, and impersonate you perfectly. It is game over." },
        { family: "soft_roast", text: "Your email was the one account that needed the strongest password and it did not have it." },
      ],
      afterburns: [
        "They do not need your bank password if they can reset it from your inbox.",
        "A compromised email is an open door to every account you ever signed up for.",
        "The duck hopes you never have to learn this lesson the hard way. But your password says otherwise.",
      ],
    },
    {
      text: "A family member wants my password for emergencies. How?",
      verdicts: [
        { family: "approved", text: "Sweet of them to ask. Set up a proper emergency access method and the duck approves." },
        { family: "soft_roast", text: "The instinct is to just text it to them. That instinct is wrong. Resist it." },
        { family: "chaos", text: "If you text it, your password now lives in their phone, their backup, and your carrier's logs forever." },
      ],
      afterburns: [
        "A sealed envelope in a safe sounds old-fashioned until everything else fails.",
        "Emergency access features exist so your password does not end up in a group chat.",
        "The people who love you most are also the most likely to screenshot your password and forget about it.",
      ],
    },
    {
      text: "I keep postponing fixing my passwords. Is that okay?",
      verdicts: [
        { family: "hard_no", text: "You have been meaning to do this for two years. The duck has been counting." },
        { family: "soft_roast", text: "Nothing bad has happened yet is the motto of every person right before something bad happens." },
        { family: "chaos", text: "You are gambling that nobody has your reused password in a breach database already. Spoiler: they might." },
      ],
      afterburns: [
        "Your passwords have been on your to-do list longer than most of your actual to-dos.",
        "You found time to reorganize your streaming watchlist but not your account security.",
        "Procrastination is a strategy. It is just a terrible one.",
      ],
    },
    {
      text: "Should I use a different password for every account?",
      verdicts: [
        { family: "approved", text: "Yes. This is the one question where the duck has zero nuance. Do it." },
        { family: "hard_no", text: "Reusing passwords is handing attackers a master key. One breach and everything falls." },
        { family: "soft_roast", text: "You know the answer. You have always known the answer. You just do not want to do the work." },
      ],
      afterburns: [
        "One unique password per account turns a catastrophe into a minor inconvenience.",
        "You would not use the same key for your house, car, and office. Same logic.",
        "The effort feels huge until you realize a tool does it for you in seconds.",
      ],
    },
    {
      text: "Is biometric login (face or fingerprint) safe?",
      verdicts: [
        { family: "approved", text: "Your face stays on your device and it is harder to steal than a string of characters. Approved." },
        { family: "cautious_maybe", text: "For daily unlocks, absolutely. Just make sure your backup PIN is not 1234." },
        { family: "soft_roast", text: "Your face is unique and permanent. Use it for logins, but know the stakes." },
      ],
      afterburns: [
        "Your fingerprint is a better password than anything you have ever typed.",
        "Nobody is going to guess your face. They might guess password123.",
        "The one login method you literally cannot forget. Unless you get a very dramatic haircut.",
      ],
    },
    {
      text: "My password was in a data breach. What do I do?",
      verdicts: [
        { family: "hard_no", text: "That password is now public property. Change it everywhere. Right now." },
        { family: "chaos", text: "That password is in a database being sold to anyone who wants it. It has a price tag and everything." },
        { family: "soft_roast", text: "You found out your password was breached and your first instinct was to ask a duck. Change it first." },
      ],
      afterburns: [
        "Breached passwords get tested against every major service automatically. Yours is in the queue.",
        "The breach happened months ago. The only question is whether someone has used it yet.",
        "If you reused that password anywhere else, congratulations, those accounts are breached too.",
      ],
    },
  ],
  signups_phone: [
    {
      text: "A shopping site wants my phone number. Do they need it?",
      verdicts: [
        { family: "hard_no", text: "They need your payment. Not your phone number. That is a no from the duck." },
        { family: "soft_roast", text: "They want your number for marketing. Your order ships just fine without it." },
        { family: "chaos", text: "That phone number will be in their database, their partner's database, and three marketing lists by Tuesday." },
      ],
      afterburns: [
        "Your order does not need your phone number. Their ad team does.",
        "Leave it blank. If the form complains, add a fake one. The duck permits it.",
        "You are buying socks, not applying for a mortgage. They will survive without your digits.",
      ],
    },
    {
      text: "Should I use Sign in with Google?",
      verdicts: [
        { family: "cautious_maybe", text: "Convenient and avoids another password. But now Google knows every service you join." },
        { family: "approved", text: "For a random quiz site, sure. For your banking, absolutely not." },
        { family: "soft_roast", text: "You clicked Sign in with Google because creating a password felt like too much effort." },
      ],
      afterburns: [
        "One click got you in. One Google lockout gets you out of everything.",
        "Google now has a receipt for every service you have ever signed into. That is the trade.",
        "You avoided one password and gained one very powerful single point of failure.",
      ],
    },
    {
      text: "Should I use my real email for a one-time signup?",
      verdicts: [
        { family: "hard_no", text: "You will never visit this site again. Your inbox will hear from them forever." },
        { family: "soft_roast", text: "You gave your real email to a site you visited once. That site will never forget you." },
        { family: "cautious_maybe", text: "Use an alias. If they leak it, you will know exactly who did." },
      ],
      afterburns: [
        "One-time signups have a funny way of becoming permanent newsletter subscriptions.",
        "That site got breached in 2024. Your real email was in there. Still worth it?",
        "An alias email is a tripwire. When spam shows up, you know who sold you out.",
      ],
    },
    {
      text: "An app wants my contacts to find friends. Allow?",
      verdicts: [
        { family: "hard_no", text: "Your contacts did not consent to being uploaded. You do not get to decide for them." },
        { family: "soft_roast", text: "Find friends is a polite way of saying upload your entire phone book to our servers." },
        { family: "chaos", text: "Every number in your contacts is now in that app's database. Including your dentist." },
      ],
      afterburns: [
        "Your contacts signed up for your phone book, not a social network's growth team.",
        "You wanted to find three friends and uploaded three hundred contacts to do it.",
        "The find friends button is the app's growth strategy wearing a helpful disguise.",
      ],
    },
    {
      text: "A site says phone number is required for security. True?",
      verdicts: [
        { family: "cautious_maybe", text: "Sometimes legit. Usually it is their marketing team wearing a security hat." },
        { family: "soft_roast", text: "They said security. They meant subscriber list. The duck can read between the lines." },
        { family: "hard_no", text: "Email verification works fine. The phone number is for them, not for you." },
      ],
      afterburns: [
        "Real security uses authenticator apps. Marketing uses required phone numbers.",
        "If you can skip the field and the site still works, it was never required.",
        "They put security in the label so you would not question the data collection.",
      ],
    },
    {
      text: "Should I make a burner email for sketchy signups?",
      verdicts: [
        { family: "approved", text: "Absolutely. A dedicated email for untrusted sites is smart. Rare duck approval." },
        { family: "soft_roast", text: "You should have done this before signing up for fifty random sites with your real email." },
        { family: "chaos", text: "Your real email is already in databases you do not know about. A burner would have caught that." },
      ],
      afterburns: [
        "Your real inbox is a VIP room. Stop letting strangers in.",
        "A burner email takes two minutes to create and absorbs years of spam.",
        "When the breach notification arrives, it hits the burner. Not your real life.",
      ],
    },
    {
      text: "A food delivery app defaults to marketing opt-in. Untick it?",
      verdicts: [
        { family: "approved", text: "Always untick marketing opt-ins. Every single time. The duck insists." },
        { family: "soft_roast", text: "You almost let a burger app send you daily emails for the rest of your life." },
        { family: "hard_no", text: "Pre-checked boxes are designed to catch you when you are hungry and distracted." },
      ],
      afterburns: [
        "That checkbox was pre-checked because they knew you would not look.",
        "You ordered dinner and almost subscribed to a lifetime of promotional emails.",
        "The pizza arrives once. The marketing emails arrive forever.",
      ],
    },
    {
      text: "Should I use my real name on every platform?",
      verdicts: [
        { family: "hard_no", text: "Your full real name on every platform is a data broker's dream. Stop gifting it." },
        { family: "soft_roast", text: "You used your full legal name on a meme app. The duck is trying to understand why." },
        { family: "cautious_maybe", text: "LinkedIn, yes. A random quiz app, absolutely not." },
      ],
      afterburns: [
        "Your real name on ten platforms creates a profile that writes itself.",
        "A pseudonym on casual apps is not paranoia. It is common sense.",
        "Your name plus your email plus your birthday is everything a scammer needs.",
      ],
    },
    {
      text: "An app will not work without notifications enabled. Allow?",
      verdicts: [
        { family: "hard_no", text: "An app that holds features hostage for notification access is not respecting you." },
        { family: "soft_roast", text: "They blocked the app until you agreed to be interrupted forever. And you said okay." },
        { family: "cautious_maybe", text: "Enable them to get in. Then revoke the permission in settings. They will never know." },
      ],
      afterburns: [
        "Forced notifications are the app version of someone who will not stop tapping your shoulder.",
        "You got past the gate. Now close it behind you. Revoke in settings.",
        "Apps that demand your attention before delivering value have their priorities backwards.",
      ],
    },
    {
      text: "Should I allow cross-app tracking?",
      verdicts: [
        { family: "hard_no", text: "The popup literally asks if you want to be tracked. The duck trusts you to say no." },
        { family: "soft_roast", text: "You considered saying yes to a popup that says allow this app to track you. Read it again." },
        { family: "chaos", text: "You tapped Allow and now every ad knows about the shoes you looked at three days ago." },
      ],
      afterburns: [
        "Deny does not break anything. It just stops ads from stalking you across apps.",
        "The guilt-trip message about personalized experience is just tracking in a party hat.",
        "You denied tracking. The app works exactly the same. Funny how that works.",
      ],
    },
    {
      text: "A brand offers a birthday discount for my date of birth. Worth it?",
      verdicts: [
        { family: "soft_roast", text: "You traded a permanent data point for a one-time discount. The math is not in your favor." },
        { family: "cautious_maybe", text: "If you love the brand, sure. Just know your birthday is in their database forever now." },
        { family: "chaos", text: "That birthday is now in a marketing database, a customer profile, and probably a data broker's file." },
      ],
      afterburns: [
        "Your birthday is a common security question answer. You just gave it away for 10% off.",
        "The discount expires. The data does not.",
        "A fake birthday gets you the same coupon and costs you nothing real.",
      ],
    },
    {
      text: "Is it better to create accounts or browse without signing up?",
      verdicts: [
        { family: "approved", text: "If guest checkout exists, use it. Fewer accounts means fewer breach targets." },
        { family: "soft_roast", text: "You create accounts on sites you visit once and then forget the password immediately." },
        { family: "chaos", text: "Every account is another entry in another database waiting for its breach notification." },
      ],
      afterburns: [
        "Guest checkout was invented for this exact moment. Use it.",
        "You have more accounts than you have passwords. That is the problem.",
        "The account you forgot about is the one that gets breached. Every time.",
      ],
    },
    {
      text: "A checkout page wants my phone number. Shipping or marketing?",
      verdicts: [
        { family: "soft_roast", text: "It says shipping updates. It means we will text you promotions until the heat death of the universe." },
        { family: "cautious_maybe", text: "Some delivery services genuinely need it. Check if the field is optional first." },
        { family: "chaos", text: "That phone number went from checkout straight to a marketing automation tool. The package was a bonus." },
      ],
      afterburns: [
        "Your package found your house without your phone number for decades. It can manage.",
        "If the field is optional, it is not for shipping. It is for their marketing team.",
        "Email tracking exists. Your phone number was never about your package.",
      ],
    },
    {
      text: "Should I give my phone number for account recovery?",
      verdicts: [
        { family: "cautious_maybe", text: "For your email and bank, yes. For a free trial you will forget about, absolutely not." },
        { family: "hard_no", text: "Only for accounts that would actually ruin your day if you lost them." },
        { family: "soft_roast", text: "You gave recovery access to a service you used once in 2019. That was generous." },
      ],
      afterburns: [
        "Your phone number as recovery also means your phone number as a SIM-swap target.",
        "Recovery info is a key. Do not hand copies to every door you walk past.",
        "For the accounts that matter, it is essential. For everything else, it is just more data out there.",
      ],
    },
    {
      text: "A platform wants full profile details before showing prices. Red flag?",
      verdicts: [
        { family: "hard_no", text: "If they hide pricing behind a full profile, they are collecting data first, selling second." },
        { family: "soft_roast", text: "They want your full name, email, and company size before telling you what it costs. The duck sees through this." },
        { family: "chaos", text: "You filled out a complete profile just to see a price. They got your data. You got sticker shock." },
      ],
      afterburns: [
        "Transparent businesses show prices. Data-hungry businesses show forms.",
        "If they want your job title before showing a number, you are the product.",
        "You gave them a sales lead in exchange for a pricing page. They won that trade.",
      ],
    },
    {
      text: "Should I sign up with my main email or a secondary one?",
      verdicts: [
        { family: "approved", text: "Secondary email for anything non-essential. Your main inbox deserves better. Approved." },
        { family: "soft_roast", text: "Your main email is in two hundred databases because you used it everywhere. The inbox reflects that." },
        { family: "cautious_maybe", text: "Main email for services you trust and use daily. Secondary for everything else." },
      ],
      afterburns: [
        "Your main email is the master key. Stop handing copies to strangers.",
        "A breach hits the secondary email. You shrug. That is the whole strategy.",
        "You have separate bags for groceries and gym clothes but one email for everything. Interesting.",
      ],
    },
    {
      text: "An app asks for my contacts during setup. Decline?",
      verdicts: [
        { family: "hard_no", text: "Decline. Your contacts did not sign up for this app. You do not get to volunteer them." },
        { family: "soft_roast", text: "It asked during setup because that is when you are excited and least likely to say no." },
        { family: "chaos", text: "You tapped Allow and uploaded your grandmother's phone number to a startup's database." },
      ],
      afterburns: [
        "Setup is when apps ask for the most and you think about it the least.",
        "Your contacts trusted you with their number, not with distributing it.",
        "The app works fine without your contacts. It just grows slower. That is their problem.",
      ],
    },
    {
      text: "Is it safe to use Apple or Google login everywhere?",
      verdicts: [
        { family: "cautious_maybe", text: "Convenient until your Apple or Google account has a problem. Then everything has a problem." },
        { family: "soft_roast", text: "You chained every account to one login. If that lock breaks, every door opens." },
        { family: "approved", text: "For throwaway accounts, it is fine. For anything you care about, use a unique login." },
      ],
      afterburns: [
        "One password reset away from losing access to everything you signed into.",
        "You built a house of cards and the bottom card says Sign in with Google.",
        "Convenient until the day you get locked out of the one account that controls them all.",
      ],
    },
    {
      text: "Should I delete old accounts I no longer use?",
      verdicts: [
        { family: "approved", text: "Yes. Old accounts are unlocked doors you forgot about. Close them." },
        { family: "soft_roast", text: "You have accounts on sites that no longer exist. The data does though." },
        { family: "hard_no", text: "Every forgotten account is a breach you will not notice until someone uses your data." },
      ],
      afterburns: [
        "That account from 2016 has your old password, your old email, and zero monitoring.",
        "You forgot about it. The breach database did not.",
        "Deleting old accounts is digital housekeeping. Your future self will thank you.",
      ],
    },
    {
      text: "A signup form asks for way too much info. Abandon it?",
      verdicts: [
        { family: "approved", text: "If a signup form reads like a loan application, find an alternative. The duck supports this." },
        { family: "hard_no", text: "A newsletter signup asking for your address and birthday is not a newsletter. It is a data grab." },
        { family: "soft_roast", text: "They asked for everything and you almost gave it because the submit button was green." },
      ],
      afterburns: [
        "The form had twelve fields. You needed access to one feature. The math does not work.",
        "If it feels like too much info, it is too much info. Trust the discomfort.",
        "Somewhere there is a competitor that asks for an email and nothing else.",
      ],
    },
  ],
  public_wifi_travel: [
    {
      text: "Airport Wi-Fi is free. Should I log into anything?",
      verdicts: [
        { family: "hard_no", text: "Free airport Wi-Fi is a shared hallway. Do not open your front door in it." },
        { family: "cautious_maybe", text: "Scroll Twitter, sure. Log into your bank, absolutely not." },
        { family: "chaos", text: "You and three hundred strangers are on the same network. Log into something fun." },
      ],
      afterburns: [
        "The price of free Wi-Fi is everyone else on that network seeing your traffic.",
        "Your gate has better snacks than security. Same goes for the Wi-Fi.",
        "You would not shout your password across the terminal. Open Wi-Fi is basically that.",
      ],
    },
    {
      text: "Should I check my bank on public Wi-Fi?",
      verdicts: [
        { family: "hard_no", text: "Your bank account and a coffee shop network should never meet. Hard no." },
        { family: "chaos", text: "You are checking your balance on a network shared with every stranger in this building. Bold." },
        { family: "soft_roast", text: "You wanted to save mobile data so you risked your savings instead. Interesting math." },
      ],
      afterburns: [
        "Your latte cost four dollars. The Wi-Fi could cost you a lot more.",
        "Mobile data exists for exactly this moment. Use it.",
        "The person at the next table does not need to know your account balance.",
      ],
    },
    {
      text: "A cafe Wi-Fi wants me to log in with social media. Do it?",
      verdicts: [
        { family: "hard_no", text: "Social login for Wi-Fi is a data trade, not a security measure." },
        { family: "soft_roast", text: "You traded your Facebook profile for thirty minutes of Wi-Fi. Worth it?" },
        { family: "chaos", text: "That cafe now has your social profile linked to your physical location. Cozy." },
      ],
      afterburns: [
        "The cafe got your name, email, friends list, and location. You got Wi-Fi. Fair trade?",
        "Ask for a regular password like it is 2010. It still works.",
        "Your social profile is not a coupon. Stop using it like one.",
      ],
    },
    {
      text: "My phone auto-connects to public networks. Turn that off?",
      verdicts: [
        { family: "hard_no", text: "Your phone is introducing itself to every network it walks past. Stop that." },
        { family: "approved", text: "Turn it off. Five seconds of manual connecting saves a lot of trouble." },
        { family: "chaos", text: "Your phone joins every network named Free WiFi like a golden retriever greeting strangers." },
      ],
      afterburns: [
        "Attackers name fake networks Starbucks WiFi and your phone falls for it every time.",
        "Your phone has been shaking hands with networks you have never met.",
        "Auto-connect is your phone being too friendly for its own good.",
      ],
    },
    {
      text: "Should I post that I am traveling while still away?",
      verdicts: [
        { family: "cautious_maybe", text: "Wait until you are home. Your timeline is not going anywhere." },
        { family: "soft_roast", text: "You are live-broadcasting that your house is empty. For the likes." },
        { family: "chaos", text: "Live vacation posts are a real-time announcement that nobody is home. Enjoy the engagement." },
      ],
      afterburns: [
        "The sunset will look exactly the same when you post it next week.",
        "Your followers can wait. Your empty house cannot defend itself.",
        "Nothing says please rob me like a geotagged beach photo posted in real time.",
      ],
    },
    {
      text: "Is it safe to use a hotel business center computer?",
      verdicts: [
        { family: "hard_no", text: "That computer has been touched by hundreds of strangers. Do not log into anything on it." },
        { family: "cautious_maybe", text: "Print a boarding pass, sure. Type a password, absolutely not." },
        { family: "chaos", text: "Every guest before you could have left a keylogger on that machine. Fun thought." },
      ],
      afterburns: [
        "That keyboard has seen more passwords than a data breach.",
        "You would not borrow a stranger's toothbrush. Same energy with shared computers.",
        "The business center is where passwords go to die.",
      ],
    },
    {
      text: "Should I use public USB charging stations?",
      verdicts: [
        { family: "hard_no", text: "Public USB ports can transfer data while they charge. Bring your own wall plug." },
        { family: "cautious_maybe", text: "Only with a charge-only cable that blocks data. Otherwise, skip it." },
        { family: "chaos", text: "That USB port might be charging your phone and browsing your files at the same time." },
      ],
      afterburns: [
        "You plugged your phone into a stranger's USB port at an airport. Read that sentence again.",
        "A ten-dollar portable battery is cheaper than an identity theft.",
        "The power outlet next to it does not steal data. Just saying.",
      ],
    },
    {
      text: "Should I leave Bluetooth on while traveling?",
      verdicts: [
        { family: "soft_roast", text: "Your Bluetooth has been waving hello to every stranger you have walked past today." },
        { family: "hard_no", text: "Bluetooth in a crowded place is a beacon. Turn it off when you are not using it." },
        { family: "chaos", text: "Every airport, train station, and market you walked through got a ping from your phone." },
      ],
      afterburns: [
        "Your phone is networking more aggressively than you are on this trip.",
        "Bluetooth off is two taps. Identity theft recovery is two months.",
        "You do not need your headphones paired while walking through a bazaar.",
      ],
    },
    {
      text: "Is it safe to share my live location publicly during a trip?",
      verdicts: [
        { family: "hard_no", text: "Public live location during travel is a full itinerary for anyone watching." },
        { family: "chaos", text: "Strangers know where you are, where you are going, and that you are not home. Perfect." },
        { family: "soft_roast", text: "You broadcast your GPS coordinates for the engagement. The duck is processing this." },
      ],
      afterburns: [
        "Your live location dot is doing more sharing than you intended.",
        "Share a pin after you leave, not a live dot while you are there.",
        "The only people who need your real-time location already have your number.",
      ],
    },
    {
      text: "Should I keep digital copies of my ID on my phone?",
      verdicts: [
        { family: "cautious_maybe", text: "Useful for emergencies, but your camera roll is not a vault. Use an encrypted app." },
        { family: "soft_roast", text: "Your passport photo lives between a sunset and a food pic. That is not a filing system." },
        { family: "approved", text: "Smart to have a backup. Just store it somewhere that requires a password to open." },
      ],
      afterburns: [
        "A lost phone with your ID in the camera roll is an identity theft starter kit.",
        "Your passport deserves at least as much security as your dating app.",
        "Encrypted storage turns a liability into a lifeline.",
      ],
    },
    {
      text: "There are multiple free Wi-Fi networks here. Which is real?",
      verdicts: [
        { family: "hard_no", text: "If you cannot verify which is real, use none of them. The duck does not guess." },
        { family: "cautious_maybe", text: "Ask staff for the exact name and spell-check it. One letter off means fake." },
        { family: "chaos", text: "One of those is a trap and you have a fifty-fifty chance of picking it. Fun game." },
      ],
      afterburns: [
        "Starbucks_WiFi and Starbucks_WiFi_Free look the same to your phone. Only one is real.",
        "Setting up a fake Wi-Fi network takes about three minutes. So does connecting to one.",
        "When the options look suspicious, your phone's data plan is the safest network in the room.",
      ],
    },
    {
      text: "Should I send sensitive documents over public Wi-Fi?",
      verdicts: [
        { family: "hard_no", text: "Sending private documents over public Wi-Fi is like reading them aloud in a crowded room." },
        { family: "chaos", text: "Your tax return just traveled over a network shared with strangers. Hope they enjoyed it." },
        { family: "soft_roast", text: "You could not wait twenty minutes for a private connection. The documents could." },
      ],
      afterburns: [
        "That file passed through a network you share with everyone in this building.",
        "Patience is a virtue. Sending contracts over airport Wi-Fi is not.",
        "Your phone has its own private connection. The documents would prefer it.",
      ],
    },
    {
      text: "Is roaming stress a valid excuse for worse privacy habits?",
      verdicts: [
        { family: "hard_no", text: "No. Jet lag does not make public Wi-Fi more secure. The duck checked." },
        { family: "soft_roast", text: "You are negotiating with yourself about whether exhaustion changes the rules. It does not." },
        { family: "chaos", text: "You lowered your guard because you were tired. Hackers work all time zones." },
      ],
      afterburns: [
        "Your privacy settings do not care about your sleep schedule.",
        "You packed sunscreen and a charger but not a single secure habit. Interesting priorities.",
        "The best privacy decisions happen before the airport, not during a layover meltdown.",
      ],
    },
    {
      text: "Should I use a VPN on public Wi-Fi?",
      verdicts: [
        { family: "approved", text: "Always. A VPN on public Wi-Fi is the bare minimum. Rare and enthusiastic duck approval." },
        { family: "soft_roast", text: "You are asking whether you should lock the door. The answer has always been yes." },
        { family: "cautious_maybe", text: "A reputable paid one, yes. A free one you found five minutes ago, absolutely not." },
      ],
      afterburns: [
        "A VPN is a curtain on a glass house. Without it, everyone sees everything.",
        "The free VPN you grabbed from the app store might be worse than no VPN at all.",
        "It takes thirty seconds to turn on and it is the difference between private and public.",
      ],
    },
    {
      text: "I forgot to turn off location sharing after my trip. Problem?",
      verdicts: [
        { family: "soft_roast", text: "You have been broadcasting your location to everyone since you landed. Welcome home." },
        { family: "chaos", text: "Your friends have been watching you commute to work for three weeks. Riveting content." },
        { family: "cautious_maybe", text: "Turn it off now. Then set a reminder for next time because you will forget again." },
      ],
      afterburns: [
        "Your trip ended. Your location sharing did not get the memo.",
        "Everyone knows you went to the grocery store four times this week. Congratulations.",
        "Temporary features that become permanent are how privacy erodes. One toggle at a time.",
      ],
    },
    {
      text: "Is it safe to scan my boarding pass into random apps?",
      verdicts: [
        { family: "hard_no", text: "That barcode is your name, booking, and frequent flyer number in a rectangle. Guard it." },
        { family: "soft_roast", text: "You handed a random app your full travel identity because it had a nice interface." },
        { family: "chaos", text: "That barcode contains enough data to change your seat, cancel your flight, or steal your miles." },
      ],
      afterburns: [
        "A boarding pass barcode is a QR code for your entire trip. Treat it like one.",
        "The airline's own app is the only one that needs to see that barcode.",
        "People post boarding passes on Instagram. Those people have had their flights changed by strangers.",
      ],
    },
    {
      text: "Should I AirDrop files to someone nearby?",
      verdicts: [
        { family: "approved", text: "To someone you know, it is fast and secure. The duck approves direct transfers." },
        { family: "soft_roast", text: "Your AirDrop has been set to everyone this whole time. The whole train can see your name." },
        { family: "chaos", text: "Open AirDrop on a crowded subway and see what strangers send you. Actually, do not." },
      ],
      afterburns: [
        "Contacts only is two words that prevent a lot of unsolicited surprises.",
        "There is a reason your name pops up on strangers' phones. Fix your settings.",
        "AirDrop to a friend is fine. AirDrop to the universe is a party you did not mean to host.",
      ],
    },
    {
      text: "I store all travel bookings in one email thread. Risky?",
      verdicts: [
        { family: "soft_roast", text: "One email thread has your flights, hotels, and every confirmation number. Organized and exposed." },
        { family: "chaos", text: "A hacker who gets your email gets your complete travel biography. Flights, hotels, car rentals, all of it." },
        { family: "cautious_maybe", text: "Convenient until someone else reads that thread. Then it is a complete dossier." },
      ],
      afterburns: [
        "That thread is a one-stop shop for anyone who wants to know where you have been and where you are going.",
        "Your itinerary is more detailed than a stalker's notebook. And it is in your inbox.",
        "Splitting bookings across a secure app and your inbox is five minutes of effort and a lot less risk.",
      ],
    },
    {
      text: "Is hotel Wi-Fi safe enough for work?",
      verdicts: [
        { family: "hard_no", text: "Hotel Wi-Fi is public Wi-Fi wearing a robe. Still not safe for work." },
        { family: "soft_roast", text: "That password printed on the key card does not make it a private network. Every guest has it." },
        { family: "chaos", text: "You are about to send company data over a network shared with two hundred guests and a conference." },
      ],
      afterburns: [
        "The hotel password is on every key card in the building. That is not security.",
        "Your company's confidential data and a stranger's Netflix are on the same pipe.",
        "Work from the hotel room, sure. Work on the hotel network, maybe not.",
      ],
    },
    {
      text: "Should I use mobile data instead of public Wi-Fi?",
      verdicts: [
        { family: "approved", text: "For anything that matters, absolutely. Your carrier's network is yours alone." },
        { family: "soft_roast", text: "You have been using free Wi-Fi to save data while your privacy pays the difference." },
        { family: "chaos", text: "Free Wi-Fi saved you two dollars of data and cost you an unknown amount of privacy." },
      ],
      afterburns: [
        "Your data plan is the only network in this building that is not shared with strangers.",
        "A few megabytes of mobile data is cheaper than whatever public Wi-Fi is actually costing you.",
        "The free thing is free because you are paying with something else.",
      ],
    },
  ],
  links_backups: [
    {
      text: "I will disable this share link later. Will I actually?",
      verdicts: [
        { family: "soft_roast", text: "You will not. Set an expiry date instead of trusting future you." },
        { family: "chaos", text: "That link will be active three years from now. The duck is certain." },
        { family: "approved", text: "Set an expiry now instead of relying on future you. Smart move." },
      ],
      afterburns: [
        "Expiry dates do what your memory refuses to.",
        "The link you forget about is always the one that causes problems.",
        "Future you has never once come back to disable a link. Be honest.",
      ],
    },
    {
      text: "I have old share links still active. Should I clean them up?",
      verdicts: [
        { family: "hard_no", text: "Yes. Old links are open doors you forgot about. Close them." },
        { family: "soft_roast", text: "Those links have been active for months. Maybe years. You did not notice. The duck did." },
        { family: "approved", text: "Review and revoke anything you no longer need. The duck respects a good cleanup." },
      ],
      afterburns: [
        "You have links from 2022 that are still clickable right now. That is the problem.",
        "If you do not remember sharing it, nobody should still have access to it.",
        "Old links are like old keys. If you do not know who has them, change the lock.",
      ],
    },
    {
      text: "Anyone with the link can see my album. Is that private?",
      verdicts: [
        { family: "hard_no", text: "Anyone with the link means anyone. Including people you never sent it to." },
        { family: "soft_roast", text: "Private-ish is not a real privacy setting. The duck checked." },
        { family: "chaos", text: "That link has been forwarded to people you have never heard of. And they forwarded it too." },
      ],
      afterburns: [
        "You sent it to five people. They sent it to their group chat. That is how links work.",
        "Anyone-with-the-link is one forward away from everyone-with-the-link.",
        "Invite-only means names on a list. Link-based means crossed fingers.",
      ],
    },
    {
      text: "Should I set expiry dates on share links?",
      verdicts: [
        { family: "approved", text: "Always. Expiring links are the easiest privacy win there is. The duck insists." },
        { family: "soft_roast", text: "You have links from years ago still active. The duck did an audit. It was not pretty." },
        { family: "cautious_maybe", text: "For anything personal, absolutely. Even casual links benefit from a deadline." },
      ],
      afterburns: [
        "Expiring links close themselves. Your memory was never going to do it.",
        "A week is usually enough. Forever is never the right answer.",
        "You set it once and it handles itself. That is the lowest-effort win available.",
      ],
    },
    {
      text: "I back up to one cloud service only. Enough?",
      verdicts: [
        { family: "hard_no", text: "One backup is a single point of failure wearing a backup costume." },
        { family: "soft_roast", text: "Your only copy of irreplaceable files is one outage away from being zero copies." },
        { family: "cautious_maybe", text: "Better than nothing. But one is a start, not a strategy." },
      ],
      afterburns: [
        "That service goes down and your files go with it. Unless you planned ahead.",
        "Two backups in different places turns a disaster into an inconvenience.",
        "If you would be devastated to lose it, one copy is gambling. Two is insurance.",
      ],
    },
    {
      text: "I have never tested restoring from my backup. Should I?",
      verdicts: [
        { family: "hard_no", text: "An untested backup is not a backup. It is a prayer." },
        { family: "soft_roast", text: "You have been paying for backup storage you have never verified actually works. Hopeful." },
        { family: "chaos", text: "That backup might be corrupted, empty, or three years out of date. You would not know." },
      ],
      afterburns: [
        "The worst time to discover your backup does not work is the day you need it.",
        "Test the restore once. Just once. The peace of mind is worth the ten minutes.",
        "A backup is a promise. A tested backup is proof the promise holds up.",
      ],
    },
    {
      text: "I shared a folder link on a public page. Bad?",
      verdicts: [
        { family: "hard_no", text: "A private folder on a public page is a contradiction. Fix it immediately." },
        { family: "chaos", text: "That folder is now accessible to anyone who visits that page. Bots included." },
        { family: "soft_roast", text: "You put a private folder link in a public space. The duck is still processing this." },
      ],
      afterburns: [
        "Public page plus private link equals public access. That is the math.",
        "Search engines index links on public pages. Your folder is now searchable.",
        "Revoke the link. Create a new one. Send it privately this time.",
      ],
    },
    {
      text: "Will I remember where my important files are in six months?",
      verdicts: [
        { family: "soft_roast", text: "You will not. You barely remember where they are now." },
        { family: "chaos", text: "In six months you will be searching every device, drive, and cloud you own. The duck has seen this before." },
        { family: "approved", text: "If you write it down somewhere secure today, yes. Otherwise, no chance." },
      ],
      afterburns: [
        "A file you cannot find is as good as a file you lost.",
        "You have files in three clouds, two drives, and a phone. Good luck finding the right one later.",
        "A simple note listing where things live saves hours of frantic searching later.",
      ],
    },
    {
      text: "I keep encrypted and unencrypted backups together. Problem?",
      verdicts: [
        { family: "hard_no", text: "The unencrypted copy makes the encrypted one pointless. Separate them." },
        { family: "soft_roast", text: "You went through the trouble of encrypting a backup and then put the plain copy right next to it." },
        { family: "cautious_maybe", text: "Ideally separate them. The unencrypted version is the one that will be read if compromised." },
      ],
      afterburns: [
        "The encrypted version is doing its job. The unencrypted version next to it is undoing it.",
        "Your security is only as strong as the weakest copy. And the weakest copy has no encryption.",
        "You locked one door and left the window open. Same room, same files.",
      ],
    },
    {
      text: "Nobody audits our shared links. Should someone start?",
      verdicts: [
        { family: "hard_no", text: "Unaudited links accumulate like dust. And they are just as invisible until something goes wrong." },
        { family: "soft_roast", text: "Those links have been open for years and nobody looked. The duck looked. It was bad." },
        { family: "approved", text: "A quarterly review takes ten minutes and closes doors nobody knew were open." },
      ],
      afterburns: [
        "Nobody is in charge of the links. The links are in charge of themselves. That is the problem.",
        "Someone should own this. Even if it is just one person with a calendar reminder.",
        "Every unreviewed link is a door that has been open since the day it was shared.",
      ],
    },
    {
      text: "I rely on cloud trash as my undo button. Is that a backup?",
      verdicts: [
        { family: "hard_no", text: "Trash empties itself. That is not a backup strategy. That is a countdown." },
        { family: "soft_roast", text: "Your disaster recovery plan is the recycle bin. The duck needs to sit down." },
        { family: "chaos", text: "Cloud trash auto-deletes after 30 days. Hope you never need a file on day 31." },
      ],
      afterburns: [
        "Trash is where deleted things go to die. Not where important things go to be safe.",
        "A real backup exists in a separate location that does not empty itself on a timer.",
        "Undo and backup are not the same thing. One lasts seconds. The other should last forever.",
      ],
    },
    {
      text: "A link preview shows more info than expected. Send it anyway?",
      verdicts: [
        { family: "hard_no", text: "If the preview reveals too much, so does the link. Do not send it." },
        { family: "cautious_maybe", text: "Test the link in a private chat first. If the preview shows too much, find another way." },
        { family: "soft_roast", text: "The link preview just announced the title, thumbnail, and description before you could react. Surprise." },
      ],
      afterburns: [
        "Link previews are generated by the receiving app. You do not control what they show.",
        "The preview showed everyone in the chat what you thought was a private link. It was not.",
        "Test first. Share second. The preview is the first thing everyone sees.",
      ],
    },
    {
      text: "My recovery keys are in the same account they recover. Okay?",
      verdicts: [
        { family: "hard_no", text: "That is like locking your spare key inside the house. Classic." },
        { family: "chaos", text: "If you lose access to the account, you lose the recovery method too. A perfect closed loop." },
        { family: "soft_roast", text: "You stored the escape plan inside the thing you need to escape from. The duck is impressed, negatively." },
      ],
      afterburns: [
        "The whole point of a recovery key is that it works when everything else fails. Yours fails with it.",
        "A recovery key in the same account is a lifeboat stored at the bottom of the ocean.",
        "Put it somewhere else. A different service, a password manager, a piece of paper. Anything else.",
      ],
    },
    {
      text: "Should I pass a backup drive around the family?",
      verdicts: [
        { family: "soft_roast", text: "That drive has been at your aunt's house for two years. She thinks it is a coaster." },
        { family: "chaos", text: "The drive is somewhere in the family. Nobody is quite sure where. That is your backup plan." },
        { family: "cautious_maybe", text: "It works in theory. In practice, drives get lost, forgotten, and used as doorstops." },
      ],
      afterburns: [
        "Physical drives have a way of becoming furniture. Then disappearing entirely.",
        "Your backup is in someone else's house, in a drawer they have not opened in a year.",
        "If the family IT plan relies on someone remembering to bring a drive to Thanksgiving, that is not a plan.",
      ],
    },
    {
      text: "Should I duplicate backups across devices that are not locked?",
      verdicts: [
        { family: "hard_no", text: "Unlocked devices with sensitive backups are a walking data breach." },
        { family: "soft_roast", text: "Your backup is on a device anyone can pick up and browse. Like leaving your diary on the kitchen table." },
        { family: "cautious_maybe", text: "Only if every device is encrypted and locked. Unlocked copies are liabilities." },
      ],
      afterburns: [
        "More copies is good. Unsecured copies is bad. Both can be true at the same time.",
        "An unlocked backup is not a safety net. It is a display case.",
        "Every copy needs a lock. No exceptions. Not even the old laptop in the closet.",
      ],
    },
    {
      text: "I shared a private album link in a busy group chat. Problem?",
      verdicts: [
        { family: "hard_no", text: "That private link is now in the hands of everyone in the group. All of them." },
        { family: "chaos", text: "Everyone in that chat can forward your private album to their own contacts. And some will." },
        { family: "soft_roast", text: "Private link in a public-ish group. That is like whispering into a megaphone." },
      ],
      afterburns: [
        "A private link in a group chat is private in name only.",
        "Revoke it. Create a new one. Send it to the right people this time.",
        "The link is now in forty phones, forty cloud backups, and zero of your control.",
      ],
    },
    {
      text: "Can a backup count if I have never restored from it?",
      verdicts: [
        { family: "hard_no", text: "A backup you have never tested is not a backup. It is optimism with storage costs." },
        { family: "soft_roast", text: "You have faith in a backup you have never actually tried. That is dedication to hope." },
        { family: "chaos", text: "That backup could be empty, corrupted, or three versions out of date. You will never know until you check." },
      ],
      afterburns: [
        "The restore is the part that matters. The backup is just preparation for it.",
        "Untested backups have a way of failing at the exact moment you need them most.",
        "Ten minutes of testing now saves ten hours of panic later. The duck has done the math.",
      ],
    },
    {
      text: "Should I use one permanent link for everything I share?",
      verdicts: [
        { family: "hard_no", text: "One link for everything means one leak exposes everything." },
        { family: "soft_roast", text: "You gave the same link to everyone for years. The duck has calculated the total audience. It is large." },
        { family: "chaos", text: "That universal link has been shared, forwarded, and bookmarked by more people than you will ever know." },
      ],
      afterburns: [
        "One link to rule them all is a great movie concept and a terrible sharing strategy.",
        "If you need to revoke one link, everything breaks. That is not a system. That is a trap.",
        "Different audiences need different links. Your boss and your friends should not share a URL.",
      ],
    },
    {
      text: "Is it safe to store sensitive files on an external hard drive?",
      verdicts: [
        { family: "cautious_maybe", text: "Only if the drive is encrypted. An unencrypted drive in a desk drawer is not safe." },
        { family: "soft_roast", text: "Your sensitive files are on an unencrypted drive in your desk. That is a filing cabinet with no lock." },
        { family: "approved", text: "An encrypted external drive stored securely is one of the best offline backups. The duck approves." },
      ],
      afterburns: [
        "A lost unencrypted drive is a complete data leak in a portable package.",
        "Encryption turns a stolen drive into a paperweight. Without it, it is an open book.",
        "The drive is offline and encrypted. That is actually harder to hack than most cloud services.",
      ],
    },
    {
      text: "How often should I review who has access to my shared files?",
      verdicts: [
        { family: "approved", text: "At least quarterly for anything sensitive. Set a reminder. The duck endorses schedules." },
        { family: "soft_roast", text: "The answer is more often than never. Which is your current frequency." },
        { family: "cautious_maybe", text: "At least once a year. More often for anything that would embarrass you if leaked." },
      ],
      afterburns: [
        "Your access list has grown every time you shared something. It has never shrunk. That is a pattern.",
        "People who no longer need access still have it. Because nobody checked.",
        "A ten-minute review once a quarter prevents the kind of problem that takes weeks to fix.",
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

export const textures: string[] = [
  "grain",
  "dots",
  "crosshatch",
  "waves",
  "confetti",
  "mesh",
];
