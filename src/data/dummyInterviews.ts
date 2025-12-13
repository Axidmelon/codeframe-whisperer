import { Transcript, Speaker, Theme, Excerpt } from './dummyCodeframe';

// ============= Sample Speakers =============
const moderator: Speaker = {
  id: "mod1",
  name: "Interviewer",
  role: "moderator",
};

const sarahM: Speaker = {
  id: "p1",
  name: "Sarah M.",
  role: "participant",
  demographics: {
    age: "35-44",
    occupation: "Product Manager",
    company_size: "50-200",
  },
};

const jamesK: Speaker = {
  id: "p2",
  name: "James K.",
  role: "participant",
  demographics: {
    age: "25-34",
    occupation: "Software Engineer",
    company_size: "200-500",
  },
};

const lisaW: Speaker = {
  id: "p3",
  name: "Lisa W.",
  role: "participant",
  demographics: {
    age: "45-54",
    occupation: "Operations Director",
    company_size: "500+",
  },
};

const markT: Speaker = {
  id: "p4",
  name: "Mark T.",
  role: "participant",
  demographics: {
    age: "25-34",
    occupation: "Marketing Lead",
    company_size: "10-50",
  },
};

// ============= Interview 1: Customer Discovery =============
const interview1Themes: Theme[] = [
  {
    id: "int1_t1",
    name: "Workflow Friction",
    description: "Pain points around tool switching and manual processes",
    reasoning: "This theme emerged from Sarah's repeated mentions of time wasted on manual tasks and context switching. Keywords like 'switch', 'copy', 'manual', and 'hour' indicate significant productivity loss. The frustration tone suggests this is a high-priority pain point.",
    responses: [],
    excerpts: [
      {
        id: "e1",
        text: "The biggest challenge is when I need to switch between tools constantly.",
        fullText: "The biggest challenge is when I need to switch between tools constantly. Like yesterday, I had to copy data from the CRM into a spreadsheet, then format it for the presentation. It took me an hour when it should have been 5 minutes.",
        codes: ["WORKFLOW_FRICTION", "TOOL_SWITCHING", "TIME_WASTE"],
        sentiment: "negative",
        speaker: sarahM,
        timestamp: "00:08:24",
        sequenceOrder: 12,
        sourceId: "int1",
        contextBefore: "Interviewer: Can you walk me through a typical frustrating moment in your workday?",
        contextAfter: "Interviewer: That sounds painful. How often does that happen?",
      },
      {
        id: "e2",
        text: "Honestly, it happens almost every day. Sometimes multiple times.",
        fullText: "Honestly, it happens almost every day. Sometimes multiple times. I've started keeping a list of all the copy-paste tasks I do, and it's embarrassing how much time goes into it.",
        codes: ["WORKFLOW_FRICTION", "FREQUENCY"],
        sentiment: "negative",
        speaker: sarahM,
        timestamp: "00:09:15",
        sequenceOrder: 14,
        sourceId: "int1",
        contextBefore: "Interviewer: That sounds painful. How often does that happen?",
        contextAfter: "Interviewer: Have you tried any solutions to address this?",
      },
    ],
  },
  {
    id: "int1_t2",
    name: "Automation Desire",
    description: "Strong interest in automated workflows and integrations",
    reasoning: "Sarah explicitly requests automation features and expresses willingness to pay for them. Terms like 'automatic', 'integration', and 'save time' cluster together, indicating a clear product opportunity.",
    responses: [],
    excerpts: [
      {
        id: "e3",
        text: "If you could make that automatic, I'd pay double what you're asking.",
        fullText: "If you could make that automatic, I'd pay double what you're asking. I'm not even joking. The time savings alone would justify it.",
        codes: ["AUTOMATION_DESIRE", "WILLINGNESS_TO_PAY", "VALUE_PROP"],
        sentiment: "positive",
        speaker: sarahM,
        timestamp: "00:14:32",
        sequenceOrder: 22,
        sourceId: "int1",
        contextBefore: "Interviewer: What if our product could sync that data automatically between your CRM and presentation tools?",
        contextAfter: "Interviewer: That's really helpful feedback. Can you tell me more about what 'automatic' would look like for you?",
      },
      {
        id: "e4",
        text: "I want it to just happen in the background. No clicking, no setup.",
        fullText: "I want it to just happen in the background. No clicking, no setup every time. Set it once and forget it. Like how Slack notifications just work.",
        codes: ["AUTOMATION_DESIRE", "ZERO_FRICTION", "EXPECTATION"],
        sentiment: "neutral",
        speaker: sarahM,
        timestamp: "00:15:48",
        sequenceOrder: 24,
        sourceId: "int1",
        contextBefore: "Interviewer: That's really helpful feedback. Can you tell me more about what 'automatic' would look like for you?",
        contextAfter: "Interviewer: Great analogy with Slack. What other tools do you find work well in the background?",
      },
    ],
  },
  {
    id: "int1_t3",
    name: "Decision Making Process",
    description: "How purchasing decisions are made within the organization",
    reasoning: "Understanding the buying process is crucial for sales strategy. Sarah reveals a multi-stakeholder approval process with IT involvement, suggesting the need for security documentation and ROI materials.",
    responses: [],
    excerpts: [
      {
        id: "e5",
        text: "I'd need to get IT approval, which usually takes about two weeks.",
        fullText: "I'd need to get IT approval, which usually takes about two weeks. They're pretty strict about new tools, especially anything that touches customer data. Then it goes to my director for budget sign-off.",
        codes: ["BUYING_PROCESS", "IT_APPROVAL", "STAKEHOLDERS"],
        sentiment: "neutral",
        speaker: sarahM,
        timestamp: "00:28:10",
        sequenceOrder: 45,
        sourceId: "int1",
        contextBefore: "Interviewer: If you decided today that our product was the right fit, what would the process look like to get it approved?",
        contextAfter: "Interviewer: What does IT typically look for when evaluating new tools?",
      },
    ],
  },
];

const interview1: Transcript = {
  id: "int1",
  title: "Customer Interview - Sarah M. (Product Manager)",
  type: "interview",
  date: "2024-12-10",
  duration: "42:00",
  speakers: [moderator, sarahM],
  themes: interview1Themes,
  totalExcerpts: 5,
};

// ============= Interview 2: Technical User =============
const interview2Themes: Theme[] = [
  {
    id: "int2_t1",
    name: "API & Integration Needs",
    description: "Technical requirements for developer-friendly integrations",
    reasoning: "James, as a software engineer, focuses on technical implementation details. Keywords like 'API', 'webhook', 'documentation', and 'SDK' indicate developer-centric needs that differ from end-user requirements.",
    responses: [],
    excerpts: [
      {
        id: "e6",
        text: "The first thing I look for is the API documentation.",
        fullText: "The first thing I look for is the API documentation. If it's outdated or poorly organized, that's a red flag. I don't want to spend three days figuring out how to make a simple integration work.",
        codes: ["API_NEEDS", "DOCUMENTATION", "EVALUATION_CRITERIA"],
        sentiment: "neutral",
        speaker: jamesK,
        timestamp: "00:05:42",
        sequenceOrder: 8,
        sourceId: "int2",
        contextBefore: "Interviewer: When you're evaluating a new tool for your team, what do you look at first?",
        contextAfter: "Interviewer: What makes API documentation 'good' in your opinion?",
      },
      {
        id: "e7",
        text: "Webhooks are non-negotiable for us. We need real-time updates.",
        fullText: "Webhooks are non-negotiable for us. We need real-time updates when things change. Polling every few minutes isn't acceptable for our use case. We're building real-time dashboards and the data needs to be fresh.",
        codes: ["API_NEEDS", "WEBHOOKS", "REAL_TIME", "REQUIREMENTS"],
        sentiment: "neutral",
        speaker: jamesK,
        timestamp: "00:12:18",
        sequenceOrder: 18,
        sourceId: "int2",
        contextBefore: "Interviewer: What specific API features are must-haves for your team?",
        contextAfter: "Interviewer: How are you currently handling real-time updates with your existing tools?",
      },
    ],
  },
  {
    id: "int2_t2",
    name: "Performance Concerns",
    description: "Technical performance requirements and concerns",
    reasoning: "James raises specific performance metrics and scaling concerns. Numbers like '10,000 records' and 'under 500 milliseconds' indicate measurable requirements that should inform product development.",
    responses: [],
    excerpts: [
      {
        id: "e8",
        text: "We need to sync about 10,000 records per hour. Can your system handle that?",
        fullText: "We need to sync about 10,000 records per hour. Can your system handle that without rate limiting us to death? Our current provider caps us at 1,000 per hour and it's causing major delays.",
        codes: ["PERFORMANCE", "SCALING", "RATE_LIMITS", "PAIN_POINT"],
        sentiment: "negative",
        speaker: jamesK,
        timestamp: "00:18:55",
        sequenceOrder: 28,
        sourceId: "int2",
        contextBefore: "Interviewer: Let's talk about scale. What volumes are you typically working with?",
        contextAfter: "Interviewer: That's a significant volume. What happens when you hit those rate limits?",
      },
      {
        id: "e9",
        text: "Response times need to be under 500 milliseconds for the search API.",
        fullText: "Response times need to be under 500 milliseconds for the search API. Our users are on the search page constantly, and anything slower than that feels sluggish. It directly impacts their productivity.",
        codes: ["PERFORMANCE", "LATENCY", "USER_EXPERIENCE"],
        sentiment: "neutral",
        speaker: jamesK,
        timestamp: "00:22:30",
        sequenceOrder: 34,
        sourceId: "int2",
        contextBefore: "Interviewer: What about response times? Do you have specific requirements there?",
        contextAfter: "Interviewer: Have you measured your current tool's response times?",
      },
    ],
  },
];

const interview2: Transcript = {
  id: "int2",
  title: "Customer Interview - James K. (Software Engineer)",
  type: "interview",
  date: "2024-12-11",
  duration: "38:00",
  speakers: [moderator, jamesK],
  themes: interview2Themes,
  totalExcerpts: 4,
};

// ============= Focus Group: Enterprise Users =============
const focusGroupThemes: Theme[] = [
  {
    id: "fg1_t1",
    name: "Enterprise Security Requirements",
    description: "Security and compliance needs for large organizations",
    reasoning: "Multiple participants raise security as a top concern, with specific mentions of SOC 2, SSO, and audit logs. The convergence of opinions from different companies suggests this is a universal enterprise requirement.",
    responses: [],
    excerpts: [
      {
        id: "e10",
        text: "SOC 2 compliance is table stakes for us. We can't even start the conversation without it.",
        fullText: "SOC 2 compliance is table stakes for us. We can't even start the conversation without it. Our security team won't even look at vendors who aren't certified.",
        codes: ["SECURITY", "SOC2", "COMPLIANCE", "REQUIREMENTS"],
        sentiment: "neutral",
        speaker: lisaW,
        timestamp: "00:08:15",
        sequenceOrder: 12,
        sourceId: "fg1",
        contextBefore: "Moderator: Let's talk about what it takes to get a new tool approved in your organizations. Lisa, what's the process like for you?",
        contextAfter: "Moderator: Mark, how about at your company?",
      },
      {
        id: "e11",
        text: "Same for us, but we also need SSO with SAML. Managing separate logins is a nightmare.",
        fullText: "Same for us, but we also need SSO with SAML. Managing separate logins is a nightmare at our scale. We have 200 people who would need access, and IT refuses to manage another set of credentials.",
        codes: ["SECURITY", "SSO", "SAML", "SCALE"],
        sentiment: "negative",
        speaker: markT,
        timestamp: "00:09:02",
        sequenceOrder: 14,
        sourceId: "fg1",
        contextBefore: "Moderator: Mark, how about at your company?",
        contextAfter: "Lisa: Oh yeah, SSO is huge. We actually passed on a tool last year just because they didn't have it.",
      },
      {
        id: "e12",
        text: "We actually passed on a tool last year just because they didn't have SSO.",
        fullText: "Oh yeah, SSO is huge. We actually passed on a tool last year just because they didn't have it. The product was great, but the security gap was a dealbreaker.",
        codes: ["SECURITY", "SSO", "DEALBREAKER", "LOST_DEAL"],
        sentiment: "negative",
        speaker: lisaW,
        timestamp: "00:09:28",
        sequenceOrder: 15,
        sourceId: "fg1",
        contextBefore: "Mark: Same for us, but we also need SSO with SAML. Managing separate logins is a nightmare at our scale.",
        contextAfter: "Moderator: That's really interesting. So security isn't just a checkbox—it's actually influencing purchase decisions. What other factors carry that weight?",
      },
    ],
  },
  {
    id: "fg1_t2",
    name: "Vendor Support Expectations",
    description: "Requirements for enterprise-level support and service",
    reasoning: "Participants discuss support needs with specific mentions of SLAs, dedicated account managers, and response times. The premium placed on support suggests an opportunity for enterprise pricing tiers.",
    responses: [],
    excerpts: [
      {
        id: "e13",
        text: "We need a dedicated account manager. I can't be submitting tickets into the void.",
        fullText: "We need a dedicated account manager. I can't be submitting tickets into the void and waiting three days for someone to get back to me. When something breaks, it affects our whole team.",
        codes: ["SUPPORT", "ACCOUNT_MANAGER", "RESPONSE_TIME", "ENTERPRISE_NEEDS"],
        sentiment: "negative",
        speaker: lisaW,
        timestamp: "00:22:45",
        sequenceOrder: 35,
        sourceId: "fg1",
        contextBefore: "Moderator: Let's shift to talk about support. What does good vendor support look like for you?",
        contextAfter: "Mark: Agreed. At minimum, we need guaranteed response times in the contract.",
      },
      {
        id: "e14",
        text: "At minimum, we need guaranteed response times in the contract.",
        fullText: "Agreed. At minimum, we need guaranteed response times in the contract. Something like 4-hour response for critical issues. It's the only way to get buy-in from leadership.",
        codes: ["SUPPORT", "SLA", "CONTRACT", "LEADERSHIP_BUY_IN"],
        sentiment: "neutral",
        speaker: markT,
        timestamp: "00:23:18",
        sequenceOrder: 37,
        sourceId: "fg1",
        contextBefore: "Lisa: We need a dedicated account manager. I can't be submitting tickets into the void.",
        contextAfter: "Moderator: Are there any support experiences—good or bad—that really stand out?",
      },
    ],
  },
  {
    id: "fg1_t3",
    name: "Pricing Transparency",
    description: "Frustrations with opaque enterprise pricing",
    reasoning: "Both participants express frustration with hidden pricing and sales-driven processes. The emotional language ('hate', 'frustrating') suggests this is a significant pain point that affects vendor perception.",
    responses: [],
    excerpts: [
      {
        id: "e15",
        text: "I hate when I have to 'talk to sales' just to see pricing.",
        fullText: "I hate when I have to 'talk to sales' just to see pricing. Just put it on the website. I don't want to sit through a demo just to find out it's way outside our budget.",
        codes: ["PRICING", "TRANSPARENCY", "FRUSTRATION", "SALES_PROCESS"],
        sentiment: "negative",
        speaker: markT,
        timestamp: "00:32:10",
        sequenceOrder: 52,
        sourceId: "fg1",
        contextBefore: "Moderator: What about the evaluation process itself? Any friction points?",
        contextAfter: "Lisa: The worst is when they give you a quote that's wildly different from what you expected.",
      },
      {
        id: "e16",
        text: "The worst is when they give you a quote that's wildly different from what you expected.",
        fullText: "The worst is when they give you a quote that's wildly different from what you expected based on their 'starting at' pricing. Feels like a bait and switch.",
        codes: ["PRICING", "TRANSPARENCY", "BAIT_AND_SWITCH", "FRUSTRATION"],
        sentiment: "negative",
        speaker: lisaW,
        timestamp: "00:32:45",
        sequenceOrder: 54,
        sourceId: "fg1",
        contextBefore: "Mark: I hate when I have to 'talk to sales' just to see pricing.",
        contextAfter: "Moderator: How do you typically handle that situation?",
      },
    ],
  },
];

const focusGroup1: Transcript = {
  id: "fg1",
  title: "Focus Group - Enterprise Buyers Panel",
  type: "focus_group",
  date: "2024-12-12",
  duration: "55:00",
  speakers: [moderator, lisaW, markT],
  themes: focusGroupThemes,
  totalExcerpts: 7,
};

// ============= Export all data =============
export const interviewData: Transcript[] = [interview1, interview2];

export const focusGroupData: Transcript[] = [focusGroup1];

export const allQualitativeData: Transcript[] = [...interviewData, ...focusGroupData];

// ============= Aggregated statistics =============
export const qualitativeDataSummary = {
  totalInterviews: interviewData.length,
  totalFocusGroups: focusGroupData.length,
  totalTranscripts: allQualitativeData.length,
  totalExcerpts: allQualitativeData.reduce(
    (sum, t) => sum + t.themes.reduce((tSum, theme) => tSum + (theme.excerpts?.length || 0), 0),
    0
  ),
  totalThemes: allQualitativeData.reduce((sum, t) => sum + t.themes.length, 0),
  uniqueSpeakers: [...new Set(allQualitativeData.flatMap(t => t.speakers.filter(s => s.role === 'participant').map(s => s.id)))].length,
};
