import { Program, Comment, TeamMember, FAQItem, BlogItem, EventItem, SuccessStory } from "./types";

// Premium Sponsorship Partners
export const SPONSORS = [
  { name: "Global Philanthropy Alliance", logoText: "GPA" },
  { name: "Unilever Humanitarian", logoText: "Unilever" },
  { name: "Gates Foundation Partner Network", logoText: "Gates Net" },
  { name: "Dubai Cares International", logoText: "Dubai Cares" },
  { name: "HSBC Wealth Legacy", logoText: "HSBC Legacy" },
  { name: "AstraZeneca Medical Relief", logoText: "AstraZeneca" },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "H.H. Prince Fazza Al Maktoum",
    role: "President & Founder",
    bio: "Visionary philanthropist dedicated to eliminating extreme poverty and empowering vulnerable communities through modern sustainable action.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
  },
  {
    name: "Dr. Sarah Kensington-Lin",
    role: "Executive Director",
    bio: "Former UNHCR Director with 20+ years of designing global relief structures and healthcare infrastructure management.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
  },
  {
    name: "Michael Anderson",
    role: "Chief of Global Logistics",
    bio: "Pioneered specialized response networks connecting supplies to active conflict zones and disaster zones in minutes.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
  },
  {
    name: "Sheikha Mariam Al Nahyan",
    role: "Director of Child Welfare",
    bio: "Dedicated pediatric psychologist and advocate for early childhood nutrition solutions throughout rural developing communities.",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80"
  },
  {
    name: "Omar Al Mansoori",
    role: "Head of Sustainability Division",
    bio: "Engineer with a passion for building robust deep-well aquifers, solar-powered clinics, and micro-grid systems.",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80"
  },
  {
    name: "Elena Peterson",
    role: "Director of Financial Integrity",
    bio: "Ensures that 100% of direct donations reach intended destinations with absolute transparency and audit perfection.",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80"
  }
];

export const PROGRAMS: Program[] = [
  {
    id: "edu-01",
    title: "Global Education Initiative & Schools Program",
    category: "Education Support",
    description: "Constructing advanced smart-learning schools and supplying learning electronics to rural zones in Asia and Latin America.",
    imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800",
    raised: 4200000,
    goal: 5000000,
    donorsCount: 14820,
    impactLabel: "140 Schools Built, 45k pupils sponsored",
    associatedPage: "scholarships",
    detailedStory: "Our flagship education program establishes safe, modern public learning institutions and remote digital learning tools for children who previously walked hours to access lessons. We supply clean water reservoirs, digital computer labs, and continuous professional teacher salaries."
  },
  {
    id: "hunger-01",
    title: "The Oasis Humanitarian Hunger Shield",
    category: "Hunger Relief",
    description: "Sustained high-nutrition supply kits distribution to prevent famine and empower local farm co-operatives.",
    imageUrl: "https://images.unsplash.com/photo-1504151932400-72d425550d2d?q=80&w=800",
    raised: 2850000,
    goal: 3000000,
    donorsCount: 22100,
    impactLabel: "3.2M Nutrient-rich Meals Handed out",
    associatedPage: "food-relief",
    detailedStory: "Through our community kitchens and dry-ration support kits, the Oasis project protects infants and pregnant mothers from acute malnutrition. We buy supplies locally to preserve agricultural cycles and empower local trade models."
  },
  {
    id: "med-01",
    title: "Mobile Surgical Suites & Medical Caravans",
    category: "Medical Outreach",
    description: "Deploying high-tech custom mobile surgery vehicles and ophthalmic clinical camps globally.",
    imageUrl: "https://images.unsplash.com/photo-1584515906207-fd664b1c585a?q=80&w=800",
    raised: 6150000,
    goal: 8000000,
    donorsCount: 19430,
    impactLabel: "92k surgical procedures, 400k clinic checks",
    associatedPage: "medical-outreach",
    detailedStory: "Our state-of-the-art mobile units navigate rugged landscapes to offer cataracts surgeries, dental procedures, life-saving oncology screenings, and primary pediatrics. Under the support of international surgeons, we give all operations with absolute care and zero cost."
  },
  {
    id: "emp-01",
    title: "Covenant Women's Micro-Legacy Fund",
    category: "Women Empowerment",
    description: "Delivering business grants, technical tailoring machines, and commercial literacy workshops for widows.",
    imageUrl: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?q=80&w=800",
    raised: 1120000,
    goal: 1500000,
    donorsCount: 4120,
    impactLabel: "8,200 women startup business owners certified",
    associatedPage: "women-empowerment",
    detailedStory: "Empowering a woman triggers dynamic family enrichment. We provide interest-free capital grants, accounting software coaching, and commercial cooperative contracts so women lead local enterprises confidently."
  },
  {
    id: "dis-01",
    title: "Rapid Crisis & Emergency Response Team",
    category: "Disaster Relief",
    description: "Supplying warm shelters, medical diagnostic supplies, and clear water following sudden natural forces.",
    imageUrl: "https://images.unsplash.com/photo-1460355976672-71c3f0a4dbbd?w=800&q=80",
    raised: 3950000,
    goal: 4000000,
    donorsCount: 18500,
    impactLabel: "42 Crisis sites actively supported",
    associatedPage: "emergency-relief",
    detailedStory: "When major earthquakes, severe cyclones, or localized monsoons displace civilians, our logistics crews land within 24 hours. We arrange robust temporary field hospitals, power generators, and warm winter garments."
  },
  {
    id: "water-01",
    title: "Deep-Aquifer Water Well Excavation",
    category: "Clean Water Projects",
    description: "Deploying high-torque drilling machinery to uncover fresh water systems at subterranean depths.",
    imageUrl: "https://images.unsplash.com/photo-1541816521255-ff76dbc5c120?q=80&w=800",
    raised: 2310000,
    goal: 2500000,
    donorsCount: 9340,
    impactLabel: "620 Waterwells operational, 1.2M citizens served",
    associatedPage: "water-projects",
    detailedStory: "Many communities suffer from mud-laden shallow pools. Our engineering operations strike deep underground paths to clear toxic risk, giving high-capacity water systems featuring modern solar purification."
  }
];

export const EVENTS: EventItem[] = [
  {
    id: "ev-1",
    title: "Annual Imperial Hope Gala & Auction 2026",
    date: "2026-11-15",
    time: "18:00 EST",
    location: "The Grand Plaza, Manhattan, New York",
    description: "An exclusive, high-ceiling gala welcoming visionary business leaders, international ambassadors, and global change-makers under our unified purpose.",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80",
    countdownDate: "2026-11-15",
    slotsAvailable: 120
  },
  {
    id: "ev-2",
    title: "Fazza Medical Caravan Launch Ceremony",
    date: "2026-08-22",
    time: "09:00 UTC",
    location: "Bishkek Central Field Caravan Hub, Kyrgyzstan",
    description: "Witness the launch of 15 fully equipped multi-specialty mobile operating units advancing deep into Central Asian communities.",
    imageUrl: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=600&q=80",
    countdownDate: "2026-08-22",
    slotsAvailable: 45
  },
  {
    id: "ev-3",
    title: "Desert-to-Oasis Agritech Symposium",
    date: "2026-10-05",
    time: "14:00 GST",
    location: "Royal Knowledge Center, Dubai, UAE",
    description: "Scholars, farmers, and tech leaders gather to analyze dry-climate irrigation strategies to end agricultural starvation.",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80",
    countdownDate: "2026-10-05",
    slotsAvailable: 200
  }
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: "ss-1",
    title: "From Waterborne Illness to Clean Future",
    beneficiary: "The Alay Valley Citizens",
    location: "Alay, Kyrgyzstan",
    storyBefore: "Alay families fetched water from an active open swamp 4 miles away. Pediatric intestinal illness affected 80% of children, and school attendance hovered under historic lows.",
    storyAfter: "Following the Fazza Deep-Aquifer Well execution, Alay accesses 40,000 liters of sweet, mineralized water daily. School attendance has surpassed 98% with waterborne illness completely wiped from regional charts.",
    imageUrl: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80",
    impactMetrics: "99.2% Infection Reduction • 2,200 Lives Restored"
  },
  {
    id: "ss-2",
    title: "Nurturing a Future Surgeon’s Vision",
    beneficiary: "Amina Al-Masri",
    location: "Sohag Governorate, Egypt",
    storyBefore: "Amina was forced out of school at age 11 when her family could no longer afford the annual registration fees and essential transport books.",
    storyAfter: "Sponsored through our Scholarship Program, Amina completed her studies at the top of her district and is now a matriculated third-year medical scholar in Alexandria on a 100% foundation grant.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
    impactMetrics: "Top Academic Rank • Fully Funded Medical Degree"
  }
];

export const BLOG_POSTS: BlogItem[] = [
  {
    id: "blog-1",
    title: "The Silent Water Crisis: Engineering Solutions for Subterranean Springs",
    excerpt: "Why typical hand pumps fail inside 12 months, and how solar-powered deep aquifers are transforming the landscape of rural clean water relief.",
    content: "Clean water is not simply health—it is the direct catalyst for industrialization, domestic safety, and girl-child school retention. For decades, traditional relief organisations distributed cheap cast-iron hand pumps that corroded or dried out because water tables shifted. Our engineers implement highly advanced high-force drills to touch pristine subterranean channels over 400 feet deep. Incorporating localized solar-powered micro-pumps and maintenance committees ensures life flows indefinitely.",
    author: "Eng. Yousef Bin Rashid",
    role: "Head of Sustainability Division",
    date: "2026-05-18",
    imageUrl: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600&q=80",
    readTime: "7 min read",
    tags: ["Water Projects", "Innovation", "Engineering"]
  },
  {
    id: "blog-2",
    title: "Pioneering Dignity and micro-industry in Women-Led Farming Collectives",
    excerpt: "How local microcapital grants stimulate self-sustaining villages and unlock dynamic family health developments.",
    content: "Micro-loans often trap rural women in complex repayment circles. Our approach replaces high-rate micro-loans with direct, conditional microcapital grants. Under our tailoring and agrarian workshops, local mothers establish a collaborative business cooperative. They pool surplus farm produce, process modern garments, and use digital sales portals to secure stable monthly incomes.",
    author: "Dr. Sarah Kensington-Lin",
    role: "Executive Director",
    date: "2026-05-24",
    imageUrl: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=600&q=80",
    readTime: "5 min read",
    tags: ["Empowerment", "Microgrants", "Sustainability"]
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "How does Prince Fazza Charity Foundation verify fund distribution?",
    answer: "We deploy real-time block-based ledgers and engage Sir Ernst & Young audit structures globally. 100% of public direct campaign donations are channeled strictly into target operations, with operational costs covered entirely by our internal endowment legacy fund."
  },
  {
    question: "Can I choose which country our donation supports?",
    answer: "Absolutely. In the custom donation module, you can specify individual campaign areas, such as Central Asian Aquifers, Middle East Pediatric caravans, and South Asia emergency shelters."
  },
  {
    question: "How do I volunteer for active international caravans?",
    answer: "Visit the Volunteer section. Fill in your medical, educational, or translation qualifications. Our HR operations office will connect you with valid missions in 2-3 weeks."
  },
  {
    question: "What is your registration status inside the United States?",
    answer: "The Prince Fazza Charity Foundation is registered as an official 501(c)(3) tax-exempt international humanitarian organization organized under the laws of New York State."
  }
];

// GENERATE 60 PREMIUM REALISTIC COMMENTS
export const COMMENTS: Comment[] = [
  {
    id: "c1",
    name: "H.E. Sheikh Mansoor Al Qasimi",
    avatarUrl: "https://ui-avatars.com/api/?name=Mansoor+Al+Qasimi&background=0A2540&color=fff",
    country: "United Arab Emirates",
    role: "Donor",
    date: "2026-05-29",
    text: "The financial transparency and meticulous execution of the Fazza Foundation's surgical caravan in Central Asia has been absolute. Seeing our donations translate directly to high-capacity mobile operating rooms gives our family wealth foundation immense pride. Extremely humble and professional management.",
    rating: 5,
    likes: 312,
    replies: [
      {
        name: "Dr. Sarah Kensington-Lin",
        text: "We are deeply honored by Your Excellency's continued support and trust in our mobile surgical program.",
        date: "2026-05-30",
        avatarUrl: "https://ui-avatars.com/api/?name=Sarah+Lin&background=D4AF37&color=000"
      }
    ]
  },
  {
    id: "c2",
    name: "Dr. Catherine Vance",
    avatarUrl: "https://ui-avatars.com/api/?name=Catherine+Vance&background=10B981&color=fff",
    country: "United Kingdom",
    role: "Volunteer",
    date: "2026-05-22",
    text: "Volunteering as a lead ophthalmic surgeon on the 2025 caravan was the most profound experience of my clinical career. The level of logistics precision arranged by Prince Fazza's team exceeded that of top international private hospitals. We successfully restored vision to over 1,400 cataract patients.",
    rating: 5,
    likes: 184,
    replies: []
  },
  {
    id: "c3",
    name: "Guillermo Mendez",
    avatarUrl: "https://ui-avatars.com/api/?name=Guillermo+Mendez&background=D4AF37&color=fff",
    country: "Peru",
    role: "Beneficiary",
    date: "2026-05-15",
    text: "For fifteen years, our entire district drank toxic muddy water from the dry river bed. Prince Fazza's dynamic drilling machines penetrated deep into our underground rock in three days. Today, our children are completely free of typhoid. We pray for your long life and your team's protection.",
    rating: 5,
    likes: 541,
    replies: [
      {
        name: "Yousef Bin Rashid",
        text: "Hearing this fuels our engineering crew to push further into dry terrains. Thank you for your warm words, Kwami.",
        date: "2026-05-16",
        avatarUrl: "https://ui-avatars.com/api/?name=Yousef+Rashid&background=0A2540&color=fff"
      }
    ]
  },
  {
    id: "c4",
    name: "Eleanor Hughes",
    avatarUrl: "https://ui-avatars.com/api/?name=Eleanor+Hughes&background=F59E0B&color=fff",
    country: "United States",
    role: "Donor",
    date: "2026-05-27",
    text: "Having audited several global charities over my lifetime, the low-overhead structure of the Prince Fazza Charity Foundation is spectacular. Direct, impact-centric funding with robust reporting. I've switched my monthly endowment allocation fully to their digital education program.",
    rating: 5,
    likes: 92,
    replies: []
  },
  {
    id: "c5",
    name: "Yuki Tanaka",
    avatarUrl: "https://ui-avatars.com/api/?name=Yuki+Tanaka&background=3B82F6&color=fff",
    country: "Japan",
    role: "Supporter",
    date: "2026-05-11",
    text: "The rapid response team sent by Fazza Foundation after the earthquake in our partner prefecture saved several trapped families. Their specialized thermal cameras and immediate field trauma kits are highly professional.",
    rating: 5,
    likes: 72,
    replies: []
  },
  {
    id: "c6",
    name: "Robert M. Haddon",
    avatarUrl: "https://ui-avatars.com/api/?name=Robert+Haddon&background=6366F1&color=fff",
    country: "United States",
    role: "Donor",
    date: "2026-05-08",
    text: "An absolutely incredible foundation. My monthly donation goes directly to sponsoring two orphans in Cairo and Sohag. The monthly video updates and academic transcripts of their growth are extremely touching and professional.",
    rating: 5,
    likes: 120,
    replies: []
  },
  {
    id: "c7",
    name: "Mateo Silva",
    avatarUrl: "https://ui-avatars.com/api/?name=Mateo+Silva&background=EC4899&color=fff",
    country: "Brazil",
    role: "Volunteer",
    date: "2026-05-04",
    text: "I helped coordinate the soccer and learning academy built in Rio's favelas by the Foundation. These kids have gone from dangerous street lifestyles to daily coding workshops, physical security, and nutritious meal packs. This is true social engineering.",
    rating: 5,
    likes: 215,
    replies: []
  },
  {
    id: "c8",
    name: "Dr. Fatima Al Suwaidi",
    avatarUrl: "https://ui-avatars.com/api/?name=Fatima+Al+Suwaidi&background=8B5CF6&color=fff",
    country: "United Arab Emirates",
    role: "Donor",
    date: "2026-05-01",
    text: "Perfect combination of compassionate care and scientific logistics. The modular pediatric intensive nurseries financed by Prince Fazza have drastically lowered infant mortality in crucial remote zones of Yemen and Mauritania.",
    rating: 5,
    likes: 410,
    replies: []
  },
  {
    id: "c9",
    name: "Ananya Deshmukh",
    avatarUrl: "https://ui-avatars.com/api/?name=Ananya+Deshmukh&background=06B6D4&color=fff",
    country: "India",
    role: "Beneficiary",
    date: "2026-04-28",
    text: "Through the Women's Micro-Legacy Fund, I purchased computerized sewing machines and hired three underprivileged girls to work with me. We compile and distribute sustainable linen clothes to local retailers. This program saved us from major financial depression.",
    rating: 5,
    likes: 318,
    replies: []
  },
  {
    id: "c10",
    name: "Karl Mueller",
    avatarUrl: "https://ui-avatars.com/api/?name=Karl+Mueller&background=14B8A6&color=fff",
    country: "United States",
    role: "Donor",
    date: "2026-04-20",
    text: "Very straightforward digital system. I made my contribution via USDC crypto, and the block tracking confirmation was instantly tied to our corporate tax offset form in Munich. Clean, technological integration that matches premium luxury.",
    rating: 5,
    likes: 85,
    replies: []
  }
];

// PROGRAMMATICALLY FILL UP TO 60 DIVERSE SOPHISTICATED REVIEWS
const countries = [
  "United States", "Canada", "Singapore", "Australia", "New Zealand", "Netherlands", "Norway", 
  "Sweden", "Denmark", "Spain", "Italy", "Oman", "Bahrain", "Qatar", "Kuwait", "Paraguay", 
  "Kyrgyzstan", "Slovakia", "Jordan", "Lebanon", "France", "Belgium", "Ireland", "Malaysia"
];
const names = [
  "Johnathan Smith", "Linda Wu", "Ahmad Al Hashimi", "Tariq Mahmood", "Noura Al Kaabi", "Samuel Peterson",
  "James Harper", "Chloe Dupont", "Sofia Rossi", "Carlos Mendez", "Fatima Al Mansoori", "Liam O'Connor",
  "Chloe Dupont", "Zayn Malik", "Abishek Patel", "Amelie Laurent", "Clara Fischer", "Tariq Al-Fahad", "Oliver Vance",
  "Isabella Garcia", "Grace Thompson", "Dmitry Volkov", "Hana Kim", "Lucas Mercer", "Priya Nair", "Gabriel Sato"
];
const roles: Array<"Donor" | "Volunteer" | "Beneficiary" | "Supporter"> = ["Donor", "Volunteer", "Beneficiary", "Supporter"];
const feedbacktexts = [
  "The micro-irrigation solutions have completely safeguarded our local orchards from devastating draughts. A marvelous initiative that respects our culture.",
  "Unrivaled standard of corporate governance and charitable accountability. Prince Fazza's field updates keep us connected with our sponsorship targets.",
  "Our small regional hospital in the valley received a premium ICU diagnostic suite fully stocked. We can inspect patients who used to travel nine hours.",
  "An outstanding model of human empathy. I volunteered as an educational mentor for orphans in the Alexandria campus and felt extremely close to the children.",
  "Such clean execution. Prince Fazza Charity Foundation demonstrates how modern digital analytics can optimize international food shipments.",
  "Truly world-class. Our family made a legacy donor pledge and we were presented with comprehensive geo-mapped impact dashboards.",
  "I am deeply inspired by the vision. Educating a girl is indeed educating an entire village.",
  "Their water initiatives are unmatched. They don't just dig a well, they deploy complete remote sensor monitors to track functional wear.",
  "Every dollar is tracked. The financial auditing ledger is fully viewable from our profile cards.",
  "A magnificent humanitarian platform. The custom portal is so easy to traverse and navigate."
];

for (let i = 11; i <= 60; i++) {
  const name = names[i % names.length] + " " + String.fromCharCode(65 + (i % 26)) + ".";
  const country = countries[i % countries.length];
  const role = roles[i % roles.length];
  const rating = 4 + (i % 2); // 4 or 5 stars
  const text = feedbacktexts[i % feedbacktexts.length] + " This charity platform represents the pinnacle of elite international philanthropy.";
  
  COMMENTS.push({
    id: `c${i}`,
    name,
    avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`,
    country,
    role,
    date: `2026-04-${Math.min(30, Math.max(1, 30 - (i % 28)) < 10 ? "0" : "")}${Math.min(30, Math.max(1, 30 - (i % 28)))}`,
    text,
    rating,
    likes: Math.floor(Math.random() * 80) + 5,
    replies: []
  });
}
