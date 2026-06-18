export interface CommunityValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  detail: string;
}

export interface GettingStartedStep {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  buttonAction: string;
  link?: string;
}

export interface CommunityRule {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  positiveTone: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: "Platforms" | "Guides" | "Developer Support";
  link: string;
  badge: string;
  iconName: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Participation" | "Technical" | "Circles";
}

export interface NewcomerTip {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  tag: "Virtual Gatherings" | "Interactive Workshops" | "Global Showcase";
  organizer: string;
}

export const COMMUNITY_VALUES: CommunityValue[] = [
  {
    id: "value-inclusivity",
    title: "Radical Inclusivity",
    description: "Whether you are a writer, coder, artist, designer, scientist, or general dreamer — you belong in the Verse. We speak plainly, explain concepts instantly, and ensure every workspace is accessible to absolute beginners.",
    icon: "Heart"
  },
  {
    id: "value-curiosity",
    title: "Informed Curiosity",
    description: "We encourage questions of all shapes and depths. In the Verse, there are no 'stupid' or 'naive' questions. Failing safely and being public about what you do not know is a foundational superpower.",
    icon: "HelpCircle"
  },
  {
    id: "value-co-creation",
    title: "Decentralized Co-creation",
    description: "The Verse is not built by a single core crew. It is a canvas generated collectively by its members. You have the sovereign power to suggest, start, or branch out into custom interest circles.",
    icon: "Sparkles"
  },
  {
    id: "value-openness",
    title: "Open Knowledge Share",
    description: "Every scrap of data, code, design asset, and community log is open. We share in the open, speak in the open, and help other members elevate their skills through friendly feedback.",
    icon: "BookOpen"
  },
  {
    id: "value-global-ecosystem",
    title: "Global Borderless Ecosystem",
    description: "Verse is an ecosystem of multiple regions in the world, being a citizen of a particular country is not an issue. Join us and we’re going to accept you with nothing but total love.",
    icon: "Globe"
  }
];

export const STATS: StatItem[] = [
  {
    id: "stat-members",
    value: "14,500+",
    label: "Active Dreamers",
    detail: "Spanning 85 countries and speaking 12+ primary languages"
  },
  {
    id: "stat-circles",
    value: "45+",
    label: "Interest Circles",
    detail: "Custom focus nodes for design, dev, sci-fi writing, and science"
  },
  {
    id: "stat-activities",
    value: "120+",
    label: "Monthly Events",
    detail: "Hour-long panels, interactive sandbox workshops, and coffee catchups"
  },
  {
    id: "stat-contributions",
    value: "100% Free",
    label: "Open Source Code",
    detail: "Nonprofit community assets built together, accessible for everyone"
  }
];

export const GETTING_STARTED_STEPS: GettingStartedStep[] = [
  {
    id: 1,
    title: "Unlock Your Digital Passport",
    description: "Create your unique profile badge and secure your community Passport key. Having this key gets you access to coordinate tools across our local and global networks.",
    buttonText: "Generate Passport",
    buttonAction: "passport"
  },
  {
    id: 2,
    title: "Step Behind the Verse Gate (Twitter’s Hub)",
    description: "Join our active community on Twitter to get the latest updates, participate in spaces, and connect with other builders.",
    buttonText: "Join Twitter’s Hub",
    buttonAction: "twitter",
    link: "https://verse.bitcoin.com/"
  },
  {
    id: 3,
    title: "Cast Your First Greeting",
    description: "Introduce yourself in the #say-hello channel! We love knowing what you are passionate about, what you wish to learn, or if you just want to say hi.",
    buttonText: "Write Hello Draft",
    buttonAction: "hello"
  }
];

export const COMMUNITY_RULES: CommunityRule[] = [
  {
    id: "rule-collab",
    title: "Prioritize Kind Intent",
    shortDescription: "Always give grace and communicate with uplifting, cooperative language.",
    fullDescription: "We speak positively, assuming noble and kind intentions. If a misunderstanding arises, we seek resolution with patience, active listening, and clear, respectful dialogue.",
    positiveTone: "Constructive & welcoming communication"
  },
  {
    id: "rule-growth",
    title: "Share and Lift",
    shortDescription: "Do not hoard insights. Teach what you learn, no matter how small.",
    fullDescription: "If you troubleshoot a tricky bug, read an exceptional book, or find a fantastic shortcut, share it! Write a short guide in our Wiki, or post a thread in #insights. Lifting others is how we expand.",
    positiveTone: "Collaborative knowledge sharing"
  },
  {
    id: "rule-integrity",
    title: "Sovereign Respect",
    shortDescription: "Keep boundaries intact. All spaces are safe, safe-for-work, and constructive.",
    fullDescription: "We strictly preserve the physical, mental, and spatial boundaries of all members. Spamming, unsolicited promotions, hate speech, and harassing other community nodes are strictly forbidden.",
    positiveTone: "Safe and constructive environments for all"
  },
  {
    id: "rule-mod",
    title: "Moderate with Gentle Mercy",
    shortDescription: "Correct with love and clear paths back into the circle.",
    fullDescription: "If someone breaks a guideline inadvertently, we guide them gently rather than alienating them. Our goal is rehabilitation and growth. We build bridges, not blockades.",
    positiveTone: "Restorative safety and support"
  }
];

export const RESOURCES_LIST: ResourceItem[] = [
  {
    id: "resource-wiki",
    title: "The Community Wiki",
    description: "The source of truth for everything Verse. Contains complete lore, project logs, list of active circles, and our community budget.",
    category: "Guides",
    link: "https://t.me/GetVerse/177601",
    badge: "Knowledge Base",
    iconName: "BookOpen"
  },
  {
    id: "resource-starter-guide",
    title: "Interactive Starter Guide",
    description: "An elegant, interactive playground to test basic commands, system workflows, and discover how to write Verse widgets.",
    category: "Guides",
    link: "https://t.me/GetVerse/387150/545213",
    badge: "For Beginners",
    iconName: "Compass"
  },
  {
    id: "resource-tools",
    title: "Verse Toolbox & SDK",
    description: "The primary GitHub monorepo hosting our community toolkits, starter templates, custom browser widgets, and styles.",
    category: "Developer Support",
    link: "https://t.me/GetVerse/355494",
    badge: "GitHub Repo",
    iconName: "Github"
  },
  {
    id: "resource-forum",
    title: "In-Depth Forum",
    description: "For long-form essays, formal ecosystem suggestions, RFCs, and collaborative project planning that needs persistence.",
    category: "Platforms",
    link: "https://t.me/GetVerse/476423",
    badge: "Discussions",
    iconName: "FileText"
  },
  {
    id: "resource-oncall",
    title: "Newcomer Helpdesk Support",
    description: "Stuck somewhere? Get assigned a dedicated community 'Sherpa' buddy who will personally help you integrate into the ecosystem.",
    category: "Developer Support",
    link: "https://t.me/GetVerse/387150/542108",
    badge: "Personal Guide",
    iconName: "Users"
  }
];

export const FAQS_LIST: FAQItem[] = [
  {
    id: "faq-what-is",
    question: "What exactly is the 'Verse'?",
    answer: "The Verse is an inclusive, non-profit community platform built by and for creators, tech enthusiasts, writers, and artists. Think of it as a cozy, coordinate space where folks collaborate on open-source gadgets, share research, write lore, and establish regional clubs.",
    category: "General"
  },
  {
    id: "faq-cost",
    question: "Is joining or participating free?",
    answer: "Absolutely! There are no entry fees, subscription walls, or hidden tolls. All our main tools, guides, and workshops are fully open-source and run entirely by volunteers and public-interest sponsorships.",
    category: "General"
  },
  {
    id: "faq-not-coder",
    question: "I don't know how to code! Is there space for me?",
    answer: "Yes, 100%! The Verse is strongly dedicated to proving that modern digital workspaces need writers, visual illustrators, translations experts, meeting coordinate partners, community advocates, event hosts, and active learners. Non-coding roles are highly celebrated here.",
    category: "Participation"
  },
  {
    id: "faq-what-is-circle",
    question: "What are 'Interest Circles'?",
    answer: "Interest Circles are smaller, highly focused sub-spaces within our Discord and Wiki platforms. They center around topics like #ux-design, #sci-fi-literature, #durable-databases, and even #cooking-experiments. Moving between circles is dynamic — join as many as you like!",
    category: "Circles"
  },
  {
    id: "faq-meetings",
    question: "Are there scheduled live hangouts?",
    answer: "Yes! Every single week we hold low-pressure video coffee chats (open camera optional), monthly orientation huddles specifically for newcomers, and live builder sandbox sessions.",
    category: "General"
  },
  {
    id: "faq-first-step",
    question: "Help, I feel overwhelmed, where do I start?",
    answer: "Take a deep breath! We recommend starting small: open up our interactive steps in 'How to Get Started', join the Discord arrival-gate, and post a short hello in #say-hello. Within minutes, a friendly member or a community Sherpa buddy will welcome you and guide you in.",
    category: "Participation"
  }
];

export const NEWCOMER_TIPS: NewcomerTip[] = [
  {
    id: "tip-no-shame",
    title: "Embrace the 'Lurk'",
    description: "There is absolutely no rush to contribute or make noise. It is completely okay to sit back, read, and observe our Discord rooms for weeks until you feel comfortable. Take your own time!",
    icon: "Eye"
  },
  {
    id: "tip-ask-buddy",
    title: "Ask for a 'Sherpa Companion'",
    description: "Feel intimidated by Discord servers? Submit a request via our Helpdesk Support Resource, and we will pair you with a friendly, experienced mentor to answer your direct DMs and show you around.",
    icon: "HeartHandshake"
  },
  {
    id: "tip-tiny-starts",
    title: "Begin with a Tiny 'Fix'",
    description: "You don't need to rebuild the wheel. Fix a spelling mistake on our community wiki, submit a nice feedback form, or help answer another newcomer's question. Tiny gestures carry огромную strength!",
    icon: "Sliders"
  },
  {
    id: "tip-audio-intro",
    title: "Turn off notifications (mostly)",
    description: "Discord can sometimes be chatty. We recommend muting busy channels and just checking back during your cozy afternoon tea break. Protect your creative focus and space!",
    icon: "BellOff"
  }
];

export const COMMUNITY_EVENTS: CommunityEvent[] = [
  {
    id: "event-office-hours",
    title: "Newcomer Welcome Office Hours",
    date: "Every Wednesday",
    time: "4:00 PM - 5:00 PM UTC",
    description: "A friendly recurring video sandbox. No slides, no formal requirements. Pop in, introduce yourself, or ask questions directly with community hosts.",
    tag: "Virtual Gatherings",
    organizer: "Host: Sarah (Sherpa Lead)"
  },
  {
    id: "event-sandbox-workshop",
    title: "Circle Sandbox: Wiki Contribution Hack",
    date: "June 25, 2026",
    time: "6:00 PM - 8:00 PM UTC",
    description: "Learn how to establish your own page, edit logs, and record your project details on our beautiful open Wiki database.",
    tag: "Interactive Workshops",
    organizer: "Host: Marcus & Circle Team"
  },
  {
    id: "event-global-pulse",
    title: "Global Pulse: Bi-Weekly Co-Creator Show",
    date: "July 2, 2026",
    time: "1:00 AM - 2:30 AM UTC",
    description: "Watch other members demo their open source apps, creative poems, UI refactors, and translation decks. Bring your questions and cheer them on!",
    tag: "Global Showcase",
    organizer: "Host: Verse Central Guild"
  }
];
