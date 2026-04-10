export type ItemType = "material" | "quiz";
export type ItemStatus = "done" | "pending";

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
}

export interface ModuleItem {
  id: string;
  title: string;
  type: ItemType;
  status: ItemStatus;
  content?: {
    heading: string;
    text: string;
  };
  quizContent?: {
    questions: QuizQuestion[];
  };
}

export interface Module {
  id: string;
  title: string;
  description: string;
  progress: number; // 0 - 100
  items: ModuleItem[];
}

export const modules: Module[] = [
  {
    id: "mod-1",
    title: "Introduction to Phishing",
    description: "Learn the basics of phishing and why scammers use it.",
    progress: 100,
    items: [
      {
        id: "m1-1",
        title: "What is Phishing?",
        type: "material",
        status: "done",
        content: {
          heading: "What exactly is Phishing?",
          text: "Phishing is a type of social engineering where attackers deceive people into revealing sensitive information or installing malware such as ransomware. Attackers masquerade as a trusted entity of some kind, often a real or plausibly real person, or a company the victim might do business with. Phishing attacks can happen via email, telephone, or text message. In banking, it's typically used to steal your login credentials, PINs, or One-Time Passwords (OTP).",
        },
      },
      {
        id: "m1-2",
        title: "The Dangers of Phishing in Digital Banking",
        type: "material",
        status: "done",
        content: {
          heading: "Why it's dangerous",
          text: "In the digital banking ecosystem, a successful phishing attempt means direct access to your financial assets. Attackers do not need to physically break into a bank vault; if you hand over your digital keys, they can transfer your money in seconds. Moreover, if a fraudster accesses your primary bank account, they can often pivot to other connected accounts or use your identity to open credit lines, leading to devastating financial loss.",
        },
      },
      {
        id: "m1-3",
        title: "Phishing Basic",
        type: "quiz",
        status: "done",
        quizContent: {
          questions: [
            {
              id: "q1",
              text: "Which of the following is an example of a typosquatting URL for cimbniaga.co.id?",
              options: [
                "cimbniaga.co.id/login",
                "cimbnaiga.co.id/auth",
                "octoclicks.cimbniaga.co.id",
                "cimbniaga.co.id/promo",
              ],
            },
            {
              id: "q2",
              text: "What should you do if you receive a text message claiming to be from the bank asking for your PIN or OTP?",
              options: [
                "Reply to the message",
                "Call the sender's number",
                "Ignore and block the number",
                "Forward the message to a friend",
              ],
            },
            {
              id: "q3",
              text: "Which channel is NOT typically used for phishing attacks?",
              options: [
                "Email",
                "SMS",
                "Face-to-face teller branch",
                "Social Media Direct Messages",
              ],
            },
          ],
        },
      },
    ],
  },
  {
    id: "mod-2",
    title: "Identifying Fake Links & Messages",
    description: "Learn how to spot fake URLs, suspicious messages, and spoofed emails.",
    progress: 50,
    items: [
      {
        id: "m2-1",
        title: "How to Spot a Fake URL",
        type: "material",
        status: "done",
        content: {
          heading: "Anatomy of a Fake Link",
          text: "Fake links often look incredibly similar to the real ones. Attackers use 'typosquatting' (e.g., c1mbniaga.com instead of cimbniaga.com) or unusual top-level domains. Always inspect the URL carefully before clicking or entering your credentials. Remember, a bank will never ask you to update your password through an unexpected, urgent link.",
        },
      },
      { id: "m2-2", title: "Red Flags in SMS & WhatsApp Messages", type: "material", status: "pending" },
      { id: "m2-3", title: "Fake Link Detection Quiz", type: "quiz", status: "pending" },
    ],
  },
  {
    id: "mod-3",
    title: "Social Engineering Tactics",
    description: "Understand the psychological tricks attackers use to manipulate victims.",
    progress: 0,
    items: [
      { id: "m3-1", title: "What is Social Engineering?", type: "material", status: "pending" },
      { id: "m3-2", title: "Common Manipulation Techniques", type: "material", status: "pending" },
      { id: "m3-3", title: "Social Engineering Quiz", type: "quiz", status: "pending" },
    ],
  },
  {
    id: "mod-4",
    title: "Securing Your Banking Account",
    description: "Best practices to keep your CIMB Niaga account and credentials safe.",
    progress: 0,
    items: [
      { id: "m4-1", title: "Strong Password & PIN Hygiene", type: "material", status: "pending" },
      { id: "m4-2", title: "How to Enable Two-Factor Authentication", type: "material", status: "pending" },
      { id: "m4-3", title: "Account Security Quiz", type: "quiz", status: "pending" },
    ],
  },
  {
    id: "mod-5",
    title: "What to Do If You Are Targeted",
    description: "Immediate steps to take if you suspect you've been a phishing victim.",
    progress: 0,
    items: [
      { id: "m5-1", title: "Immediate Actions After a Phishing Attack", type: "material", status: "pending" },
      { id: "m5-2", title: "How to Report to CIMB PhishGuard", type: "material", status: "pending" },
      { id: "m5-3", title: "Incident Response Quiz", type: "quiz", status: "pending" },
    ],
  },
];
