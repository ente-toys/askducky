import type {
  AfterburnLine,
  Category,
  CategoryId,
  Question,
  ShareCaptionTemplate,
  ShareFooter,
  VerdictFamily,
  VerdictLine,
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

export const shareFooters: ShareFooter[] = [
  "Shake for a privacy verdict",
  "Privacy advice, badly delivered",
  "A judgmental duck for your digital life",
  "This duck has concerns",
  "Ask Ducky before you trust that app",
  "A magic 8-ball, but with boundaries",
  "Better boundaries. Smaller blast radius.",
  "The beak has spoken",
  "Privacy, but make it shareable",
  "Get judged. Try again.",
  "Boundaries look good on you",
  "Less trust. Better outcomes.",
  "A duck with standards",
  "Security theatre sold separately",
].map((text, index) => ({ id: `footer_${index + 1}`, text }));

export const shareCaptions: ShareCaptionTemplate[] = [
  "I asked Ducky a privacy question and got judged immediately.",
  "A duck just gave me better privacy advice than most apps.",
  "Shake your phone. Receive a privacy verdict.",
  "This duck has concerns. Try Ask Ducky.",
  "I came for vibes and left with boundaries.",
  "Ask Ducky before you overshare with confidence.",
  "A privacy verdict from an aggressively observant duck.",
  "This was supposed to be fun. The duck had notes.",
  "I shook my phone and got a digital intervention.",
  "Ask Ducky. Get judged. Probably deserved.",
].map((text, index) => ({ id: `caption_${index + 1}`, text }));

// --- Global afterburns (not category-specific) ---

const globalAfterburnTexts: string[] = [
  "Privacy is not being dramatic.",
  "A little paranoia is healthy in this economy.",
  "Your future self would like fewer regrets.",
  "Not every product deserves the whole you.",
  "A tiny bit of friction beats a large cleanup later.",
  "You can love convenience without marrying it.",
  "You can absolutely do better than this.",
  "You do not need perfect privacy. Just fewer own-goals.",
  "The easiest flow is rarely the cleanest one.",
  "Share less. Sleep better.",
  "Some things are not worth the convenience.",
  "Good enough security beats no security every time.",
  "That decision is easier to make now than to undo later.",
  "The default setting is not always the safe one.",
  "Convenience keeps sending you invoices.",
];

// --- Category-specific afterburns ---

const categoryAfterburnTexts: { text: string; categoryIds: CategoryId[] }[] = [
  // permissions
  { text: "No app needs that many permissions to do one thing.", categoryIds: ["permissions"] },
  { text: "Permissions are a personality test, and this app failed.", categoryIds: ["permissions"] },
  { text: "That permission list is longer than the app's feature list.", categoryIds: ["permissions"] },
  { text: "A flashlight does not need to know who you call.", categoryIds: ["permissions"] },
  { text: "If the permissions feel wrong, they probably are.", categoryIds: ["permissions"] },
  { text: "Your camera roll is not a free sample.", categoryIds: ["permissions"] },
  // ai_apps
  { text: "The model is only as private as the data you feed it.", categoryIds: ["ai_apps"] },
  { text: "AI tools learn from what you give them. Choose carefully.", categoryIds: ["ai_apps"] },
  { text: "Just because it is smart does not mean it is safe.", categoryIds: ["ai_apps"] },
  { text: "Your private notes are not training data.", categoryIds: ["ai_apps"] },
  { text: "Read the AI privacy policy, not just the marketing page.", categoryIds: ["ai_apps"] },
  { text: "A smarter tool still needs proper boundaries.", categoryIds: ["ai_apps"] },
  // cloud_storage
  { text: "Encryption matters more than brand recognition.", categoryIds: ["cloud_storage"] },
  { text: "One backup is not a backup. It is a single point of failure.", categoryIds: ["cloud_storage"] },
  { text: "The cloud is someone else's computer. Act accordingly.", categoryIds: ["cloud_storage"] },
  { text: "Free storage usually has a cost you cannot see.", categoryIds: ["cloud_storage"] },
  { text: "Not all encryption is equal. End-to-end is the one that matters.", categoryIds: ["cloud_storage"] },
  { text: "If they can read your files for you, they can read your files.", categoryIds: ["cloud_storage"] },
  // photo_sharing
  { text: "Photos carry more data than you think. Location, time, device.", categoryIds: ["photo_sharing"] },
  { text: "A public link means anyone with it can see your photos.", categoryIds: ["photo_sharing"] },
  { text: "Once a photo is shared, you do not control where it goes.", categoryIds: ["photo_sharing"] },
  { text: "Sharing originals means sharing the metadata too.", categoryIds: ["photo_sharing"] },
  { text: "Private albums are only private if the link stays private.", categoryIds: ["photo_sharing"] },
  { text: "Not every photo needs to be shared at full resolution.", categoryIds: ["photo_sharing"] },
  // family_groups
  { text: "Familiarity is not a security model.", categoryIds: ["family_groups"] },
  { text: "Family group chats are not a secure document vault.", categoryIds: ["family_groups"] },
  { text: "The more people in a group, the less private it is.", categoryIds: ["family_groups"] },
  { text: "Love your family. Do not trust their forwarding habits.", categoryIds: ["family_groups"] },
  { text: "Not every relative needs access to everything.", categoryIds: ["family_groups"] },
  { text: "Shared albums grow. Access controls usually do not.", categoryIds: ["family_groups"] },
  // messaging
  { text: "Encrypted does not mean the backup is encrypted too.", categoryIds: ["messaging"] },
  { text: "Delete-for-everyone does not delete-from-screenshots.", categoryIds: ["messaging"] },
  { text: "If the platform reads your messages, it is not private.", categoryIds: ["messaging"] },
  { text: "A chat thread is not a filing cabinet.", categoryIds: ["messaging"] },
  { text: "Disappearing messages are not a security guarantee.", categoryIds: ["messaging"] },
  { text: "Think about who else is in the thread before you send.", categoryIds: ["messaging"] },
  // passwords_passkeys
  { text: "A password manager is less work than recovering hacked accounts.", categoryIds: ["passwords_passkeys"] },
  { text: "Reusing passwords is a subsidy for attackers.", categoryIds: ["passwords_passkeys"] },
  { text: "Two-factor authentication is annoying until you need it.", categoryIds: ["passwords_passkeys"] },
  { text: "Passkeys remove the weakest link: you remembering a password.", categoryIds: ["passwords_passkeys"] },
  { text: "Your strongest password is useless if you reuse it.", categoryIds: ["passwords_passkeys"] },
  { text: "Security questions based on real answers are just guessable passwords.", categoryIds: ["passwords_passkeys"] },
  // signups_phone
  { text: "Every account you create is a surface area for leaks.", categoryIds: ["signups_phone"] },
  { text: "Your phone number is more identifying than you think.", categoryIds: ["signups_phone"] },
  { text: "If you would not give them your ID, why give them your number?", categoryIds: ["signups_phone"] },
  { text: "A burner email costs nothing. A data leak costs more.", categoryIds: ["signups_phone"] },
  { text: "Signing up is easy. Deleting your account usually is not.", categoryIds: ["signups_phone"] },
  { text: "Required fields are not always actually required.", categoryIds: ["signups_phone"] },
  // public_wifi_travel
  { text: "Free Wi-Fi and low judgment are a risky combination.", categoryIds: ["public_wifi_travel"] },
  { text: "If you would not say it on a loudspeaker, do not send it on open Wi-Fi.", categoryIds: ["public_wifi_travel"] },
  { text: "Travel stress is not a valid reason to skip basic security.", categoryIds: ["public_wifi_travel"] },
  { text: "A VPN on public Wi-Fi is the bare minimum.", categoryIds: ["public_wifi_travel"] },
  { text: "Public charging stations can be data transfer points too.", categoryIds: ["public_wifi_travel"] },
  { text: "The network name 'Free Airport WiFi' is not a guarantee of anything.", categoryIds: ["public_wifi_travel"] },
  // links_backups
  { text: "A link that never expires is a door that never closes.", categoryIds: ["links_backups"] },
  { text: "If you have never tested your backup, you do not have a backup.", categoryIds: ["links_backups"] },
  { text: "Share links travel further than you intend.", categoryIds: ["links_backups"] },
  { text: "A backup in one place is a gamble, not a plan.", categoryIds: ["links_backups"] },
  { text: "Expiring links are a small effort with a large payoff.", categoryIds: ["links_backups"] },
  { text: "Old links pile up. Access reviews do not happen by themselves.", categoryIds: ["links_backups"] },
];

export const afterburns: AfterburnLine[] = [
  ...globalAfterburnTexts.map((text, i) => ({
    id: `afterburn_g${i + 1}`,
    text,
  })),
  ...categoryAfterburnTexts.map((item, i) => ({
    id: `afterburn_c${i + 1}`,
    text: item.text,
    categoryIds: item.categoryIds,
  })),
];

// --- Verdicts ---
// Global verdicts work for any category. Category-specific verdicts reference the topic directly.

interface VerdictEntry {
  text: string;
  categoryIds?: CategoryId[];
}

const verdictsByFamily: Record<VerdictFamily, VerdictEntry[]> = {
  hard_no: [
    // Global
    { text: "Ducky says absolutely not." },
    { text: "That is a no from the duck." },
    { text: "No. Next question." },
    { text: "Respectfully: nope." },
    { text: "Hard pass." },
    { text: "This duck would like to opt out on your behalf." },
    { text: "Not a chance." },
    { text: "No, and please reconsider." },
    { text: "The duck is shaking its head." },
    { text: "Absolutely not." },
    // permissions
    { text: "That app does not need all that access.", categoryIds: ["permissions"] },
    { text: "Deny it. The app will survive.", categoryIds: ["permissions"] },
    { text: "Those permissions are a red flag.", categoryIds: ["permissions"] },
    { text: "No app needs your contacts to show you weather.", categoryIds: ["permissions"] },
    // ai_apps
    { text: "Do not give an AI tool your entire library.", categoryIds: ["ai_apps"] },
    { text: "That is too much data for a feature you will use twice.", categoryIds: ["ai_apps"] },
    { text: "The AI does not need that. You do not need that.", categoryIds: ["ai_apps"] },
    { text: "Do not upload private data to a tool you barely understand.", categoryIds: ["ai_apps"] },
    // cloud_storage
    { text: "Do not store sensitive files somewhere without real encryption.", categoryIds: ["cloud_storage"] },
    { text: "That cloud provider is not earning this level of trust.", categoryIds: ["cloud_storage"] },
    // photo_sharing
    { text: "Do not share that album publicly.", categoryIds: ["photo_sharing"] },
    { text: "Those photos deserve a private link, not a public one.", categoryIds: ["photo_sharing"] },
    // family_groups
    { text: "The family group chat is not the place for that.", categoryIds: ["family_groups"] },
    { text: "Do not put personal documents in a group with 30 relatives.", categoryIds: ["family_groups"] },
    // messaging
    { text: "Do not send sensitive documents over unencrypted chat.", categoryIds: ["messaging"] },
    { text: "That does not belong in a group thread.", categoryIds: ["messaging"] },
    // passwords_passkeys
    { text: "Do not share passwords over text.", categoryIds: ["passwords_passkeys"] },
    { text: "Stop reusing that password. Today.", categoryIds: ["passwords_passkeys"] },
    // signups_phone
    { text: "That site does not need your real phone number.", categoryIds: ["signups_phone"] },
    { text: "Do not hand over your number for a coupon.", categoryIds: ["signups_phone"] },
    // public_wifi_travel
    { text: "Do not log into your bank on airport Wi-Fi.", categoryIds: ["public_wifi_travel"] },
    { text: "Open Wi-Fi and sensitive logins do not mix.", categoryIds: ["public_wifi_travel"] },
    // links_backups
    { text: "A permanent public link to private files is not okay.", categoryIds: ["links_backups"] },
    { text: "Do not leave that share link active forever.", categoryIds: ["links_backups"] },
  ],
  cautious_maybe: [
    // Global
    { text: "Maybe, but be careful." },
    { text: "Proceed with caution." },
    { text: "Allowed, but keep your guard up." },
    { text: "Fine, but double-check the details first." },
    { text: "This passes, barely." },
    { text: "Okay, but do not get comfortable." },
    { text: "Possible. I still have concerns." },
    { text: "Conditional yes." },
    { text: "The duck is cautiously nodding." },
    { text: "Not terrible, but not great either." },
    // permissions
    { text: "Grant it, but only the minimum it actually needs.", categoryIds: ["permissions"] },
    { text: "Allow it for now, but review those permissions later.", categoryIds: ["permissions"] },
    { text: "Give it access this once. Not permanently.", categoryIds: ["permissions"] },
    // ai_apps
    { text: "Use it, but do not feed it anything sensitive.", categoryIds: ["ai_apps"] },
    { text: "Try it with test data first, not your real files.", categoryIds: ["ai_apps"] },
    { text: "The tool is fine. The data you give it is the risk.", categoryIds: ["ai_apps"] },
    // cloud_storage
    { text: "Use it, but verify the encryption is real first.", categoryIds: ["cloud_storage"] },
    { text: "Fine for casual files. Sensitive ones deserve better.", categoryIds: ["cloud_storage"] },
    // photo_sharing
    { text: "Share the album, but use an invite-only link.", categoryIds: ["photo_sharing"] },
    { text: "Fine to share, but strip the metadata first.", categoryIds: ["photo_sharing"] },
    // family_groups
    { text: "Share it with the small family group, not the big one.", categoryIds: ["family_groups"] },
    { text: "Okay if the group is small and trusted. Is it?", categoryIds: ["family_groups"] },
    // messaging
    { text: "Send it, but use an encrypted platform.", categoryIds: ["messaging"] },
    { text: "Fine for this conversation. Not as a habit.", categoryIds: ["messaging"] },
    // passwords_passkeys
    { text: "Better than nothing, but upgrade your setup soon.", categoryIds: ["passwords_passkeys"] },
    { text: "Use it for now, but set up a proper manager.", categoryIds: ["passwords_passkeys"] },
    // signups_phone
    { text: "Sign up, but use a secondary email.", categoryIds: ["signups_phone"] },
    { text: "Create the account, but give minimal information.", categoryIds: ["signups_phone"] },
    // public_wifi_travel
    { text: "Use it with a VPN. Not without.", categoryIds: ["public_wifi_travel"] },
    { text: "Fine for browsing. Not for logging in.", categoryIds: ["public_wifi_travel"] },
    // links_backups
    { text: "Share the link, but set it to expire.", categoryIds: ["links_backups"] },
    { text: "One backup is fine for now. Add a second when you can.", categoryIds: ["links_backups"] },
  ],
  approved: [
    // Global
    { text: "Approved." },
    { text: "That is a good call." },
    { text: "The duck approves." },
    { text: "Finally, some common sense." },
    { text: "Solid decision." },
    { text: "Green light." },
    { text: "That is the right move." },
    { text: "Good instinct. Follow it." },
    { text: "You understood the assignment." },
    { text: "Look at you being responsible." },
    // permissions
    { text: "Good. Only grant what the app actually needs.", categoryIds: ["permissions"] },
    { text: "Denying that permission was the right call.", categoryIds: ["permissions"] },
    // ai_apps
    { text: "Using AI without handing over your personal data? Smart.", categoryIds: ["ai_apps"] },
    { text: "Good move checking the privacy policy first.", categoryIds: ["ai_apps"] },
    // cloud_storage
    { text: "End-to-end encrypted storage? That is the way.", categoryIds: ["cloud_storage"] },
    { text: "Keeping local and cloud copies? Smart redundancy.", categoryIds: ["cloud_storage"] },
    // photo_sharing
    { text: "Private album with invite-only access? Perfect.", categoryIds: ["photo_sharing"] },
    { text: "Stripping metadata before sharing is a power move.", categoryIds: ["photo_sharing"] },
    // family_groups
    { text: "Keeping sensitive stuff out of the family chat? Wise.", categoryIds: ["family_groups"] },
    { text: "A smaller, trusted group for important things. Good.", categoryIds: ["family_groups"] },
    // messaging
    { text: "Using encrypted messaging for sensitive stuff? Correct.", categoryIds: ["messaging"] },
    { text: "Moving that conversation to a private channel is smart.", categoryIds: ["messaging"] },
    // passwords_passkeys
    { text: "A password manager. Finally. Proud of you.", categoryIds: ["passwords_passkeys"] },
    { text: "Passkeys are the right direction. Keep going.", categoryIds: ["passwords_passkeys"] },
    // signups_phone
    { text: "Using a secondary email for signups? That is the move.", categoryIds: ["signups_phone"] },
    { text: "Not giving your real number to a random app? Correct.", categoryIds: ["signups_phone"] },
    // public_wifi_travel
    { text: "VPN on public Wi-Fi. Basic but effective.", categoryIds: ["public_wifi_travel"] },
    { text: "Waiting until you are on a trusted network? Smart.", categoryIds: ["public_wifi_travel"] },
    // links_backups
    { text: "Expiring links and tested backups. Well done.", categoryIds: ["links_backups"] },
    { text: "Multiple backup locations. That is actual resilience.", categoryIds: ["links_backups"] },
  ],
  chaos: [
    // Global
    { text: "This is a bold strategy. Let us see how it goes." },
    { text: "Your privacy instincts are fighting for their life." },
    { text: "That is a lot of trust for very little reason." },
    { text: "This is not a plan. This is optimism." },
    { text: "You are outsourcing caution to luck." },
    { text: "This setup is one mistake away from being a problem." },
    { text: "The risk here is not zero, and you are acting like it is." },
    { text: "This is the kind of decision that ages poorly." },
    { text: "Somewhere, a security researcher just winced." },
    { text: "This is between you and the consequences." },
    // permissions
    { text: "You gave a calculator location access. Bold.", categoryIds: ["permissions"] },
    { text: "That permission list is longer than the app's description.", categoryIds: ["permissions"] },
    // ai_apps
    { text: "You gave an AI your entire photo library. Interesting choice.", categoryIds: ["ai_apps"] },
    { text: "That AI tool now knows more about you than most of your friends.", categoryIds: ["ai_apps"] },
    // cloud_storage
    { text: "All your important files in one unencrypted cloud. Adventurous.", categoryIds: ["cloud_storage"] },
    { text: "You are trusting a free tier with irreplaceable files.", categoryIds: ["cloud_storage"] },
    // photo_sharing
    { text: "A public album link in a group chat. That will travel.", categoryIds: ["photo_sharing"] },
    { text: "You just shared original photos with full GPS metadata.", categoryIds: ["photo_sharing"] },
    // family_groups
    { text: "You put ID documents in the family WhatsApp. Noted.", categoryIds: ["family_groups"] },
    { text: "The family group has 40 members and no rules. Good luck.", categoryIds: ["family_groups"] },
    // messaging
    { text: "You sent your passport over regular SMS. Okay then.", categoryIds: ["messaging"] },
    { text: "Banking details in a group thread. What could go wrong.", categoryIds: ["messaging"] },
    // passwords_passkeys
    { text: "The same password for everything. Living on the edge.", categoryIds: ["passwords_passkeys"] },
    { text: "Your recovery codes are in an unencrypted note. Brave.", categoryIds: ["passwords_passkeys"] },
    // signups_phone
    { text: "You gave your real phone number to a coupon site. They are thrilled.", categoryIds: ["signups_phone"] },
    { text: "Six new accounts this week, all with the same password. Classic.", categoryIds: ["signups_phone"] },
    // public_wifi_travel
    { text: "Banking on airport Wi-Fi without a VPN. Thrilling.", categoryIds: ["public_wifi_travel"] },
    { text: "You connected to 'Free WiFi' without checking whose it is.", categoryIds: ["public_wifi_travel"] },
    // links_backups
    { text: "That share link has been active for two years. It has seen things.", categoryIds: ["links_backups"] },
    { text: "Your only backup is a folder you have never tested. Optimistic.", categoryIds: ["links_backups"] },
  ],
  soft_roast: [
    // Global
    { text: "Not wrong, just sloppy." },
    { text: "You know better. You are just being lazy." },
    { text: "This is fine. Technically." },
    { text: "Could be worse. Could also be much better." },
    { text: "The bar is low and you are limbo dancing under it." },
    { text: "Not a disaster. More of a slow leak." },
    { text: "This has 'I will fix it later' energy." },
    { text: "You are doing the minimum. It shows." },
    { text: "Acceptable, but barely." },
    { text: "The duck is sighing." },
    // permissions
    { text: "You allowed it without reading. That is a pattern.", categoryIds: ["permissions"] },
    { text: "You hit accept on those permissions pretty fast.", categoryIds: ["permissions"] },
    // ai_apps
    { text: "You tried the AI tool without checking the privacy policy. Typical.", categoryIds: ["ai_apps"] },
    { text: "You uploaded personal photos to a random AI app. We all saw that.", categoryIds: ["ai_apps"] },
    // cloud_storage
    { text: "Your backup strategy is hope. That is not a strategy.", categoryIds: ["cloud_storage"] },
    { text: "You picked the storage provider by logo, not by policy.", categoryIds: ["cloud_storage"] },
    // photo_sharing
    { text: "You shared originals when a link would have been enough.", categoryIds: ["photo_sharing"] },
    { text: "You forgot to check the album privacy settings. Again.", categoryIds: ["photo_sharing"] },
    // family_groups
    { text: "You overshared in the family chat. It happens. A lot.", categoryIds: ["family_groups"] },
    { text: "You trusted the family group to stay private. Sweet.", categoryIds: ["family_groups"] },
    // messaging
    { text: "You sent that in plain text and hoped for the best.", categoryIds: ["messaging"] },
    { text: "You used the wrong chat for something that mattered.", categoryIds: ["messaging"] },
    // passwords_passkeys
    { text: "You added an exclamation mark and called it a new password.", categoryIds: ["passwords_passkeys"] },
    { text: "You are still saving passwords in your notes app.", categoryIds: ["passwords_passkeys"] },
    // signups_phone
    { text: "You gave your real info to a site you will use once.", categoryIds: ["signups_phone"] },
    { text: "You signed up with your main email. Again.", categoryIds: ["signups_phone"] },
    // public_wifi_travel
    { text: "You skipped the VPN because you were in a rush. Relatable.", categoryIds: ["public_wifi_travel"] },
    { text: "You used hotel Wi-Fi for something important. We have all been there.", categoryIds: ["public_wifi_travel"] },
    // links_backups
    { text: "That link has been public for months. You forgot about it.", categoryIds: ["links_backups"] },
    { text: "You have one backup and you have never tested it. Classic.", categoryIds: ["links_backups"] },
  ],
};

export const verdicts: VerdictLine[] = Object.entries(verdictsByFamily).flatMap(
  ([family, entries]) =>
    entries.map((entry, index) => ({
      id: `${family}_${index + 1}`,
      family: family as VerdictFamily,
      text: entry.text,
      categoryIds: entry.categoryIds,
    })),
);

// --- Questions ---
// Written to sound like real things a person would actually wonder, not comedy bits.

const rawQuestions: Record<CategoryId, string[]> = {
  permissions: [
    "A flashlight app is asking for access to my contacts. Should I allow it?",
    "This wallpaper app wants access to all my photos. Is that normal?",
    "A calculator app is requesting my location. Should I be concerned?",
    "A notes app wants Bluetooth and contacts access. Does it need that?",
    "This weather app wants my precise location all the time, not just when I use it. Is that okay?",
    "A QR scanner wants access to my files and phone state. Should I allow it?",
    "This keyboard app wants network access and clipboard permission. Is that safe?",
    "A PDF scanner is asking for my contacts. Why would it need that?",
    "This event app wants location, contacts, and camera access before I have even used it. Should I allow all that?",
    "A habit tracker wants to see my app usage data. Is that reasonable?",
    "A shopping app is asking for microphone access. Why?",
    "This recipe app wants my location and photo library. Does a recipe app need those?",
    "An app wants to run in the background all the time. Should I let it?",
    "A productivity app wants access to my calendar, contacts, reminders, and all files. Is that too much?",
    "This meditation app wants Bluetooth and location access. Do I need to give it that?",
    "An app wants access to my entire photo library instead of letting me pick specific photos. Should I allow that?",
    "A game is asking for my contact list. Is there any reason to allow it?",
    "A transit app wants always-on location access. Is that necessary?",
    "A browser extension wants permission to read and change data on all websites. Should I install it?",
    "A finance app wants clipboard access. Is that a concern?",
  ],
  ai_apps: [
    "An AI headshot app wants access to my full camera roll. Should I allow it?",
    "An AI photo tool says it needs to upload all my photos for better results. Should I do that?",
    "An AI journaling app wants to analyze my private notes to learn my writing style. Is that safe?",
    "An AI wallpaper generator wants access to my gallery. Should I give it that?",
    "An AI companion app wants my contacts, microphone, and chat history. Is that normal?",
    "An AI productivity tool wants access to all my emails. Should I connect it?",
    "This AI meeting assistant wants access to my calendar, meetings, and cloud documents. Is that too much?",
    "An AI keyboard says it needs to see everything I type to give better suggestions. Should I allow that?",
    "An AI search tool asks for broad permissions but says privacy matters. How do I evaluate that?",
    "An AI avatar app wants 40 selfies and says it will store them permanently. Should I upload them?",
    "An AI transcription tool says recordings may be reviewed by humans for quality. Should I use it for private meetings?",
    "An AI photo organizer wants to detect faces and objects in my photos. Is cloud-based face scanning okay?",
    "An AI browser wants to read my browsing history and open tabs. Should I let it?",
    "An AI fitness app wants my health data, location, and photos. Does it need all of that?",
    "An AI diary app says my entries are private, but the privacy policy is vague. Should I trust it?",
    "An AI voice clone app wants voice recordings from different environments. Should I provide them?",
    "A new AI startup has no clear privacy page. Should I try the app anyway?",
    "An AI shopping tool wants access to my email inbox to find receipts. Is that a good idea?",
    "An AI family album app does face clustering in the cloud. Is that safe for photos of my kids?",
    "An AI memory app says it stores personal context to help me later. How much personal data is that?",
  ],
  cloud_storage: [
    "I picked a cloud storage provider because it was popular. Is that enough reason to trust it?",
    "A cloud drive says it uses encryption, but the details are not clear. Is my data actually safe?",
    "Should I use the most convenient cloud service or the one with better privacy practices?",
    "My cloud storage says files are safe but does not offer end-to-end encryption. Is that close enough?",
    "I keep important scans in regular cloud storage. Should I move them somewhere more secure?",
    "A free cloud tier offers a lot of storage. What is the catch?",
    "I store tax documents in the same cloud folder as memes and screenshots. Is that a problem?",
    "My storage provider scans files to improve search. Should I be concerned about that?",
    "Should I trust a cloud provider just because a lot of people use it?",
    "A cloud service says support can access my files if needed. Is that normal?",
    "Is having one cloud backup enough, or should I have copies in multiple places?",
    "Should I turn on automatic photo uploads to the cloud?",
    "The secure backup flow is more annoying to set up. Is it worth the effort?",
    "My cloud provider says zero knowledge in marketing but is vague in the actual policy. What should I do?",
    "Should I separate sensitive files from casual files in cloud storage?",
    "There is a privacy-focused cloud app that is open source but less convenient. Is it worth switching?",
    "Should I keep original copies of important files locally in addition to the cloud?",
    "My cloud share links never expire by default. Should I change that?",
    "Is it safe to share a cloud folder with someone using a direct link?",
    "I have not checked my cloud storage privacy settings since I signed up. Should I?",
  ],
  photo_sharing: [
    "I want to share vacation photos. Should I use a public link or something more private?",
    "A friend wants all the photos from an event. Should I dump them in a chat or use a shared album?",
    "I need to send passport photos to someone. Is email okay for that?",
    "Should I post live vacation photos while I am still away, or wait until I am back?",
    "I want to share baby photos with family. What is the safest way to do that?",
    "A friend wants original files through a random file transfer site. Should I use it?",
    "Should I send personal photos as email attachments or use a private album link?",
    "I shared event photos with an 'anyone with the link' folder. Is that risky?",
    "Should I upload old photos to a service I have never heard of because it is cheap?",
    "I need to share a wedding album with a lot of people. Public link or invite-only?",
    "Is it okay to send screenshots of sensitive information in a casual chat?",
    "Should I let a photo app automatically share albums with selected contacts?",
    "Do I need to worry about metadata in photos before sharing them?",
    "Is it fine to share document photos in the same chat thread as regular conversations?",
    "Should I set an expiry on a private album link, or is it fine to leave it up?",
    "How risky is an 'anyone with the link' share setting compared to invite-only?",
    "Should I strip location data from photos before posting them publicly?",
    "Is it safe to send private photos through social media DMs?",
    "Should I share photos publicly because it is easier than creating a private album?",
    "Do I need to share original high-res files, or is a lower resolution version enough?",
  ],
  family_groups: [
    "The family group chat has over 30 people. Should I share personal photos there?",
    "Should I share school documents in the extended family group?",
    "My relatives want one big shared album that anyone can add to. Is that okay?",
    "Should I post travel plans in the family group while I am still away?",
    "Is it okay to share health updates in the family chat?",
    "The family wants a shared cloud folder with no organization. Is that going to be a problem?",
    "Older relatives tend to forward things. Should I share private album links with them?",
    "Should I keep photos of my kids in a broad family album that keeps growing?",
    "The family group keeps adding new people. Should I still share personal things there?",
    "We share streaming passwords in the same group as personal documents. Is that fine?",
    "A relative asked me to send a copy of my ID in the family WhatsApp group. Should I?",
    "Should I share my live location in the family group so people stop calling?",
    "We have financial documents in a shared family drive that no one manages. Is that okay?",
    "Is the family group actually private, or should I treat it as semi-public?",
    "The family wants everyone's addresses and phone numbers in a shared spreadsheet. Good idea?",
    "We are planning a wedding in the family chat. Should logistics stay there or move somewhere else?",
    "A parent wants all grandkid photos auto-synced to a shared album. Should I set that up?",
    "Is using the family group as a backup plan a real backup strategy?",
    "Should I share sensitive PDFs with family through a permanent drive link?",
    "Nobody in the family reviews who has access to our shared albums. Is that a problem?",
  ],
  messaging: [
    "Should I share my home address in a large neighborhood group chat?",
    "A friend wants me to send a photo of my passport over chat. Should I?",
    "Is it safe to send banking screenshots in a regular chat?",
    "Are disappearing messages actually private, or can they still be saved?",
    "I share files on a messaging platform that does not encrypt cloud backups. Should I worry?",
    "A work group wants personal details shared in chat. Is that appropriate?",
    "Should I send login credentials in the same thread where we chat casually?",
    "Is it okay to send a photo of a signed contract over chat?",
    "Should I trust direct messages for sharing personal documents?",
    "A stranger in a buy-sell group wants my phone number, email, and address upfront. Is that safe?",
    "Should I share my live location in a thread with a lot of people?",
    "Can I send a disappearing photo and trust that it will not be screenshotted?",
    "My messaging app encrypts messages but not backups. Does that matter?",
    "I shared a Wi-Fi password in a large event group chat. Is that a problem?",
    "Should I move a sensitive conversation to a different, more private app?",
    "A group admin keeps adding people I do not know. Should I stop sharing personal things there?",
    "Is it safe to forward invitation links in a chat that gets shared widely?",
    "Can I rely on read receipts and delete-for-everyone to protect my messages?",
    "Should I share travel plans in a large social group?",
    "Is it safe to DM private photos on a platform that is known for easy screenshotting?",
  ],
  passwords_passkeys: [
    "I use one good password for most of my accounts. Is that safe enough?",
    "Should I finally set up a password manager?",
    "I do not fully understand passkeys. Should I switch to them anyway?",
    "I keep some passwords in plain text notes. How bad is that?",
    "A site uses security questions based on real personal facts. Is that secure?",
    "I shared an account password with my partner over text. Is that okay?",
    "I screenshot my two-factor backup codes and keep them in my camera roll. Is that safe?",
    "Is saving passwords in my browser good enough, or do I need a dedicated manager?",
    "I store recovery codes in an unencrypted folder. Should I move them?",
    "I skipped two-factor authentication because it is annoying. Am I at risk?",
    "I share a streaming password with several family members. Is that a security issue?",
    "A site only supports SMS for two-factor authentication. Is that still worth enabling?",
    "I change my password by adding a different number at the end. Is that effective?",
    "Do passkeys actually make me safer, or just more dependent on one device?",
    "I keep recovery codes in cloud notes. Should they be somewhere more secure?",
    "How do I decide which accounts are important enough for stronger security?",
    "I use email recovery for every account. What happens if my email gets compromised?",
    "A family member wants my password in case something happens to me. What is the safe way to do that?",
    "I keep putting off improving my account security because nothing bad has happened yet. Is that okay?",
    "Is a password manager worth the hassle of setting everything up?",
  ],
  signups_phone: [
    "A shopping site wants my phone number to buy socks. Do they actually need it?",
    "An app wants my birthday, phone number, and address before I can even browse. Is that normal?",
    "Should I use Sign in with Google instead of creating a new account?",
    "A site says my phone number is required for security. Is that true?",
    "Should I use my real email for a site I am only visiting once?",
    "Is it worth creating a separate email for signups and newsletters?",
    "An app wants my contacts to help me find friends. Should I allow that?",
    "Should I make a burner email for sketchy signups?",
    "Is it safer to use Apple or Google login, or to create a new account with a password?",
    "A food delivery app defaults to marketing opt-in. Should I untick that or does it not matter?",
    "Should I give my phone number for account recovery to a service I barely trust?",
    "A platform wants full profile details before showing pricing. Is that a red flag?",
    "Should I use my main email for a service whose website already looks outdated?",
    "A brand offers a birthday discount in exchange for my date of birth. Worth it?",
    "Do I need to use my real name on every platform?",
    "An app will not let me proceed without enabling notifications. Should I just allow it?",
    "Should I allow cross-app tracking if the app says it helps personalize my experience?",
    "Is it better to create accounts or use apps without signing up where possible?",
    "A checkout page asks for my phone number. Is that for shipping or something else?",
    "An app wants access to my contacts to show me who is already using it. Should I allow that?",
  ],
  public_wifi_travel: [
    "I am at the airport and the Wi-Fi is free. Should I log into anything important?",
    "Should I upload travel documents over hotel Wi-Fi?",
    "My phone connects to public networks automatically. Should I turn that off?",
    "A cafe Wi-Fi requires me to log in with my social media account. Is that safe?",
    "Should I check my bank account on public Wi-Fi if I need to?",
    "Is it safe to book a hotel or flight using shared hostel internet?",
    "This lounge Wi-Fi has no password at all. Is that okay to use?",
    "Should I AirDrop files to someone nearby instead of using the internet?",
    "I leave Bluetooth on all the time when traveling. Is that a risk?",
    "Should I post on social media that I am away from home while I am still traveling?",
    "Is it safe to share my live location publicly during a trip?",
    "Should I keep digital copies of my ID on my phone while traveling?",
    "Is it safe to use a shared computer at a hotel to print travel documents?",
    "A travel app wants me to scan my boarding pass. Should I?",
    "There are multiple free Wi-Fi networks at this airport. How do I know which one is real?",
    "Should I send passport photos over Wi-Fi when I am in a hurry?",
    "I keep all my travel bookings in one email thread. Is that a risk?",
    "Does being stressed while traveling excuse looser privacy habits?",
    "Should I use public USB charging stations at the airport?",
    "I forgot to turn off location sharing after my trip ended. Does that matter?",
  ],
  links_backups: [
    "I created a share link and plan to disable it later. Will I actually remember?",
    "I have old share links that are still active. Should I do something about that?",
    "This album link is set to private, but anyone with the link can see it. Is that really private?",
    "I shared a folder with 'anyone with the link' access. How risky is that?",
    "I use one permanent link for every family album. Should I create separate ones?",
    "Should I set expiry dates on share links, or is that overkill?",
    "All my photos are backed up to exactly one cloud service. Is that enough?",
    "I have never actually tested restoring from my backup. Should I?",
    "Will I remember where my only copy of important files is stored six months from now?",
    "I keep encrypted and unencrypted backups in the same place. Is that a problem?",
    "I shared a folder link on a public event page. Should I have used something more private?",
    "A link preview shows more information than I expected. Should I be worried?",
    "I named a sensitive folder something vague hoping no one would look inside. Is that security?",
    "My recovery material is stored inside the same account it is supposed to recover. Is that okay?",
    "Nobody ever audits our shared links. Should someone start?",
    "I have copies of sensitive files on multiple devices that are not all locked. Is that a risk?",
    "We pass a backup drive around the family. Is that a reliable system?",
    "I rely on cloud trash and recycle bin as my undo button. Is that actually a backup?",
    "Can a backup count as a backup if I have never successfully restored from it?",
    "I shared a private album link in a group thread that gets forwarded a lot. Is that going to be a problem?",
  ],
};

const categoryDefaultFamilies: Record<CategoryId, VerdictFamily[]> = {
  permissions: ["hard_no", "chaos", "soft_roast"],
  ai_apps: ["hard_no", "chaos", "cautious_maybe"],
  cloud_storage: ["cautious_maybe", "approved", "soft_roast"],
  photo_sharing: ["cautious_maybe", "soft_roast", "hard_no"],
  family_groups: ["hard_no", "soft_roast", "chaos"],
  messaging: ["cautious_maybe", "hard_no", "soft_roast"],
  passwords_passkeys: ["approved", "cautious_maybe", "soft_roast"],
  signups_phone: ["hard_no", "soft_roast", "cautious_maybe"],
  public_wifi_travel: ["hard_no", "chaos", "soft_roast"],
  links_backups: ["cautious_maybe", "approved", "soft_roast"],
};

function inferSeverity(text: string): "high" | "medium" | "low" {
  const lower = text.toLowerCase();
  if (
    lower.includes("passport") ||
    lower.includes("bank") ||
    lower.includes("id") ||
    lower.includes("password") ||
    lower.includes("login") ||
    lower.includes("credential") ||
    lower.includes("recovery code") ||
    lower.includes("all websites") ||
    lower.includes("sensitive")
  ) {
    return "high";
  }

  if (
    lower.includes("photo") ||
    lower.includes("contacts") ||
    lower.includes("location") ||
    lower.includes("address") ||
    lower.includes("travel") ||
    lower.includes("backup") ||
    lower.includes("encrypt") ||
    lower.includes("phone number")
  ) {
    return "medium";
  }

  return "low";
}

function buildQuestions(): Question[] {
  return Object.entries(rawQuestions).flatMap(([categoryId, lines]) =>
    lines.map((text, index) => ({
      id: `${categoryId}_${String(index + 1).padStart(3, "0")}`,
      categoryId: categoryId as CategoryId,
      text,
      severity: inferSeverity(text),
      tags: text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .split(/\s+/)
        .filter((token) => token.length > 3)
        .slice(0, 4),
      weight: 1,
      preferredFamilies: categoryDefaultFamilies[categoryId as CategoryId],
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
