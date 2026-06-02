export type ActivePage =
  | "home"
  | "about"
  | "vision"
  | "mission"
  | "programs"
  | "campaigns"
  | "donate"
  | "volunteer"
  | "partner"
  | "stories"
  | "blog"
  | "newsroom"
  | "global-voices"
  | "global-voices/add-commentary"
  | "events"
  | "gallery"
  | "videos"
  | "testimonials"
  | "commentary"
  | "global-impact"
  | "annual-reports"
  | "financial-transparency"
  | "leadership"
  | "founder-chronicle"
  | "board-directors"
  | "org-structure"
  | "careers"
  | "internships"
  | "faq"
  | "contact"
  | "hiv-support"
  | "halfway-house"
  | "vulnerable-foreigners"
  | "seminar-request"
  | "health-ambassadors"
  | "children-home"
  | "shelter-placement"
  | "medical-care"
  | "mother-child"
  | "visit-care"
  | "emergency-relief"
  | "scholarships"
  | "medical-outreach"
  | "women-empowerment"
  | "child-support"
  | "orphanage-support"
  | "food-relief"
  | "sustainability"
  | "water-projects"
  | "privacy"
  | "terms";

export interface Program {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  raised: number;
  goal: number;
  donorsCount: number;
  impactLabel: string;
  detailedStory?: string;
  associatedPage: ActivePage;
}

export interface Comment {
  id: string;
  name: string;
  avatarUrl: string;
  country: string;
  role: "Donor" | "Volunteer" | "Beneficiary" | "Supporter";
  date: string;
  text: string;
  rating: number;
  likes: number;
  likedByUser?: boolean;
  replies: Array<{
    name: string;
    text: string;
    date: string;
    avatarUrl: string;
  }>;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  role: string;
  date: string;
  imageUrl: string;
  readTime: string;
  tags: string[];
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  countdownDate: string; // "YYYY-MM-DD" style
  slotsAvailable: number;
}

export interface SuccessStory {
  id: string;
  title: string;
  beneficiary: string;
  location: string;
  storyBefore: string;
  storyAfter: string;
  imageUrl: string;
  impactMetrics: string;
}
