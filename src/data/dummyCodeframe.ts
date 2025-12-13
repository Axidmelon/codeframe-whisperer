// ============= Core Types =============
export type Sentiment = "positive" | "negative" | "neutral";
export type DataSourceType = "survey" | "interview" | "focus_group";

// ============= Speaker (for interviews/focus groups) =============
export interface Speaker {
  id: string;
  name: string;
  role?: "moderator" | "participant";
  demographics?: Record<string, string>; // age, gender, role, etc.
}

// ============= Survey Response (original, backward compatible) =============
export interface Response {
  id: string;
  text: string;
  code: string;
  sentiment: Sentiment;
}

// ============= Excerpt (for interviews/focus groups) =============
export interface Excerpt {
  id: string;
  text: string;
  fullText?: string; // Full paragraph if truncated
  codes: string[]; // Support multiple codes
  sentiment: Sentiment;
  speaker?: Speaker;
  timestamp?: string; // "00:14:32" or line number
  sequenceOrder?: number; // Position in transcript
  sourceId: string; // Link to parent transcript/interview
  contextBefore?: string; // Preceding dialogue for context
  contextAfter?: string; // Following dialogue for context
}

// ============= Union type for both survey and qualitative data =============
export type CodedItem = Response | Excerpt;

// ============= Type guard to check if item is an Excerpt =============
export function isExcerpt(item: CodedItem): item is Excerpt {
  return 'codes' in item && Array.isArray((item as Excerpt).codes);
}

// ============= Theme (updated to support both types) =============
export interface Theme {
  id: string;
  name: string;
  description: string;
  reasoning: string;
  responses: Response[]; // Keep for backward compatibility with surveys
  excerpts?: Excerpt[]; // Optional for qualitative data
}

// ============= Question (for surveys) =============
export interface Question {
  id: string;
  text: string;
  themes: Theme[];
}

// ============= Transcript (for interviews/focus groups) =============
export interface Transcript {
  id: string;
  title: string;
  type: DataSourceType;
  speakers: Speaker[];
  themes: Theme[];
  duration?: string;
  date?: string;
  totalExcerpts?: number;
}

// Question-level codeframes - specific themes for each question
export const questionLevelData: Question[] = [
  {
    id: "q1",
    text: "What do you like most about our product?",
    themes: [
      {
        id: "t1",
        name: "Ease of Use",
        description: "Responses highlighting intuitive design and user-friendliness",
        reasoning: "The theme 'Ease of Use' emerged from clustering responses that explicitly mention intuitive navigation, simplicity, and low learning curve. Terms like 'easy', 'simple', 'intuitive', and 'straightforward' appeared consistently. This theme was separated from 'Performance' because it focuses on the cognitive effort required to use the product rather than its technical capabilities.",
        responses: [
          { id: "r1", text: "The interface is so intuitive, I figured it out in minutes", code: "USABILITY_INTUITIVE", sentiment: "positive" },
          { id: "r2", text: "Love how simple the navigation is", code: "USABILITY_NAVIGATION", sentiment: "positive" },
          { id: "r3", text: "Easy to onboard my team without training", code: "USABILITY_ONBOARDING", sentiment: "positive" },
          { id: "r4", text: "The dashboard layout makes sense", code: "USABILITY_LAYOUT", sentiment: "positive" },
        ],
      },
      {
        id: "t2",
        name: "Speed & Performance",
        description: "Responses praising fast load times and responsiveness",
        reasoning: "This theme captures responses focused on technical performance metrics. Keywords like 'fast', 'quick', 'responsive', and 'instant' dominated this cluster. The theme was named 'Speed & Performance' rather than just 'Speed' to encompass both load times and runtime responsiveness mentioned by users.",
        responses: [
          { id: "r5", text: "The app loads instantly, no waiting around", code: "PERF_SPEED", sentiment: "positive" },
          { id: "r6", text: "Reports generate so much faster than competitors", code: "PERF_REPORTS", sentiment: "positive" },
          { id: "r7", text: "Real-time sync is impressive", code: "PERF_SYNC", sentiment: "positive" },
        ],
      },
      {
        id: "t3",
        name: "Value for Money",
        description: "Responses about pricing and ROI",
        reasoning: "Responses in this theme explicitly connect product benefits to cost. Terms like 'worth', 'affordable', 'value', and 'ROI' indicate economic evaluation. This was separated from feature-focused themes because the positive sentiment is tied to cost-benefit analysis rather than functionality alone.",
        responses: [
          { id: "r8", text: "Great features for the price point", code: "PRICING_VALUE", sentiment: "positive" },
          { id: "r9", text: "The free tier is generous enough for small teams", code: "PRICING_FREE_TIER", sentiment: "positive" },
          { id: "r10", text: "Worth every penny compared to alternatives", code: "PRICING_ROI", sentiment: "positive" },
        ],
      },
    ],
  },
  {
    id: "q2",
    text: "What frustrates you most about our product?",
    themes: [
      {
        id: "t4",
        name: "Performance Issues",
        description: "Complaints about slowness, bugs, and crashes",
        reasoning: "This theme aggregates negative experiences related to technical performance. Unlike the positive 'Speed & Performance' theme in Q1, this captures frustration with lag, crashes, and bugs. The distinction helps identify specific pain points versus general satisfaction.",
        responses: [
          { id: "r11", text: "The mobile app crashes frequently", code: "PERF_CRASHES", sentiment: "negative" },
          { id: "r12", text: "Search is painfully slow with large datasets", code: "PERF_SEARCH_SLOW", sentiment: "negative" },
          { id: "r13", text: "Too many bugs after recent updates", code: "PERF_BUGS", sentiment: "negative" },
          { id: "r14", text: "Sync errors happen too often", code: "PERF_SYNC_ERRORS", sentiment: "negative" },
        ],
      },
      {
        id: "t5",
        name: "Confusing UX",
        description: "Difficulty navigating or understanding features",
        reasoning: "This theme captures usability frustrations, the inverse of Q1's 'Ease of Use'. Responses mention confusion, hidden features, and unclear workflows. Separating positive and negative usability feedback by question helps track improvement areas.",
        responses: [
          { id: "r15", text: "Settings are buried too deep in menus", code: "UX_SETTINGS_HIDDEN", sentiment: "negative" },
          { id: "r16", text: "Can never find the export button", code: "UX_DISCOVERABILITY", sentiment: "negative" },
          { id: "r17", text: "The workflow for approvals is confusing", code: "UX_WORKFLOW", sentiment: "negative" },
        ],
      },
      {
        id: "t6",
        name: "Pricing Concerns",
        description: "Frustrations with cost, pricing tiers, or value",
        reasoning: "Negative pricing feedback is captured separately from positive value perception to identify specific pricing friction. Terms like 'expensive', 'paywall', and 'overpriced' cluster together, revealing cost sensitivity patterns.",
        responses: [
          { id: "r18", text: "Too expensive for what you get", code: "PRICING_EXPENSIVE", sentiment: "negative" },
          { id: "r19", text: "Key features locked behind premium tier", code: "PRICING_PAYWALL", sentiment: "negative" },
          { id: "r20", text: "Price increases feel unjustified", code: "PRICING_INCREASES", sentiment: "negative" },
        ],
      },
    ],
  },
  {
    id: "q3",
    text: "Why would you recommend (or not recommend) us to a colleague?",
    themes: [
      {
        id: "t7",
        name: "Recommend - Productivity",
        description: "Would recommend due to efficiency gains",
        reasoning: "Positive recommendation drivers focused on productivity and time savings. These responses link recommendation intent to tangible work benefits like 'saves hours', 'streamlines', and 'automates'. This helps identify the strongest advocacy triggers.",
        responses: [
          { id: "r21", text: "It saves our team hours every week", code: "REC_TIME_SAVINGS", sentiment: "positive" },
          { id: "r22", text: "Streamlined our entire approval process", code: "REC_PROCESS", sentiment: "positive" },
          { id: "r23", text: "Automation features are game-changing", code: "REC_AUTOMATION", sentiment: "positive" },
        ],
      },
      {
        id: "t8",
        name: "Recommend - Support",
        description: "Would recommend due to excellent customer support",
        reasoning: "This theme captures advocacy driven by support experience rather than product features. Keywords like 'responsive', 'helpful', and 'support team' indicate that service quality is a significant recommendation driver.",
        responses: [
          { id: "r24", text: "Their support team is incredibly responsive", code: "REC_SUPPORT_RESPONSIVE", sentiment: "positive" },
          { id: "r25", text: "They actually listen to feedback and ship fixes fast", code: "REC_SUPPORT_FEEDBACK", sentiment: "positive" },
        ],
      },
      {
        id: "t9",
        name: "Would Not Recommend",
        description: "Reasons for not recommending",
        reasoning: "Detractor responses are grouped to understand churn risk factors. These responses explicitly state they wouldn't recommend and provide reasons, helping prioritize retention-focused improvements.",
        responses: [
          { id: "r26", text: "Too many alternatives that do it better", code: "NOT_REC_COMPETITION", sentiment: "negative" },
          { id: "r27", text: "Not reliable enough for critical workflows", code: "NOT_REC_RELIABILITY", sentiment: "negative" },
          { id: "r28", text: "Learning curve is too steep for most teams", code: "NOT_REC_COMPLEXITY", sentiment: "negative" },
        ],
      },
    ],
  },
  {
    id: "q4",
    text: "What features would you like us to add or improve?",
    themes: [
      {
        id: "t10",
        name: "Integration Requests",
        description: "Requests for third-party integrations",
        reasoning: "This theme clusters feature requests specifically about connecting to external tools. High frequency of specific tool names (Slack, Salesforce, etc.) and terms like 'integrate', 'connect', and 'sync with' define this category.",
        responses: [
          { id: "r29", text: "Need native Slack integration", code: "FEAT_SLACK", sentiment: "neutral" },
          { id: "r30", text: "Salesforce sync would be huge for our workflow", code: "FEAT_SALESFORCE", sentiment: "neutral" },
          { id: "r31", text: "Please add Zapier support", code: "FEAT_ZAPIER", sentiment: "neutral" },
        ],
      },
      {
        id: "t11",
        name: "Reporting & Analytics",
        description: "Requests for better data visualization and reporting",
        reasoning: "Feature requests mentioning dashboards, charts, exports, and analytics cluster together. This represents a distinct capability area separate from core functionality improvements.",
        responses: [
          { id: "r32", text: "Custom report builder would be amazing", code: "FEAT_REPORTS", sentiment: "neutral" },
          { id: "r33", text: "More chart types for presentations", code: "FEAT_CHARTS", sentiment: "neutral" },
          { id: "r34", text: "Scheduled report emails", code: "FEAT_SCHEDULED_REPORTS", sentiment: "neutral" },
        ],
      },
      {
        id: "t12",
        name: "Mobile Improvements",
        description: "Requests for better mobile experience",
        reasoning: "Mobile-specific requests were separated because they represent a distinct platform with unique constraints. Terms like 'mobile app', 'phone', 'offline', and 'on the go' define this cluster.",
        responses: [
          { id: "r35", text: "Mobile app needs offline mode", code: "FEAT_MOBILE_OFFLINE", sentiment: "neutral" },
          { id: "r36", text: "Push notifications for important updates", code: "FEAT_PUSH_NOTIF", sentiment: "neutral" },
          { id: "r37", text: "Better mobile editing experience", code: "FEAT_MOBILE_EDIT", sentiment: "neutral" },
        ],
      },
    ],
  },
];

// Overall (survey-level) codeframe - themes that cut across all questions
// This allows comparison of the same theme appearing in likes, dislikes, recommendations, etc.
export const overallCodeframeThemes: Theme[] = [
  {
    id: "overall_usability",
    name: "Usability & UX",
    description: "All responses related to user experience, navigation, and ease of use across questions",
    reasoning: "This overall theme aggregates usability-related feedback from all questions to provide a holistic view. Combining positive usability mentions from Q1 with negative UX frustrations from Q2 reveals the full picture of the user experience. 47 total mentions across 4 questions make this the second-most discussed topic. The theme enables cross-question analysis like 'What aspects of usability drive satisfaction vs frustration?'",
    responses: [
      { id: "r1", text: "The interface is so intuitive, I figured it out in minutes", code: "USABILITY_POSITIVE", sentiment: "positive" },
      { id: "r2", text: "Love how simple the navigation is", code: "USABILITY_POSITIVE", sentiment: "positive" },
      { id: "r15", text: "Settings are buried too deep in menus", code: "USABILITY_NEGATIVE", sentiment: "negative" },
      { id: "r16", text: "Can never find the export button", code: "USABILITY_NEGATIVE", sentiment: "negative" },
      { id: "r17", text: "The workflow for approvals is confusing", code: "USABILITY_NEGATIVE", sentiment: "negative" },
      { id: "r28", text: "Learning curve is too steep for most teams", code: "USABILITY_NEGATIVE", sentiment: "negative" },
    ],
  },
  {
    id: "overall_performance",
    name: "Performance & Reliability",
    description: "All responses about speed, stability, bugs, and technical performance",
    reasoning: "Performance themes from Q1 (positive) and Q2 (negative) are combined to show the net perception of technical quality. This overall view reveals that while 23% of users praise speed, 31% cite performance issues as frustrations—indicating a gap between expectations and experience. The theme helps prioritize technical debt vs new features.",
    responses: [
      { id: "r5", text: "The app loads instantly, no waiting around", code: "PERF_POSITIVE", sentiment: "positive" },
      { id: "r6", text: "Reports generate so much faster than competitors", code: "PERF_POSITIVE", sentiment: "positive" },
      { id: "r11", text: "The mobile app crashes frequently", code: "PERF_NEGATIVE", sentiment: "negative" },
      { id: "r12", text: "Search is painfully slow with large datasets", code: "PERF_NEGATIVE", sentiment: "negative" },
      { id: "r13", text: "Too many bugs after recent updates", code: "PERF_NEGATIVE", sentiment: "negative" },
      { id: "r27", text: "Not reliable enough for critical workflows", code: "PERF_NEGATIVE", sentiment: "negative" },
    ],
  },
  {
    id: "overall_pricing",
    name: "Pricing & Value",
    description: "All responses about cost, pricing, ROI, and value perception",
    reasoning: "Combining positive value perception (Q1) with pricing frustrations (Q2) reveals the pricing sentiment balance. This is critical for pricing strategy decisions. Currently shows 40% positive, 60% negative pricing sentiment—suggesting a perceived value gap that needs addressing.",
    responses: [
      { id: "r8", text: "Great features for the price point", code: "PRICING_POSITIVE", sentiment: "positive" },
      { id: "r9", text: "The free tier is generous enough for small teams", code: "PRICING_POSITIVE", sentiment: "positive" },
      { id: "r18", text: "Too expensive for what you get", code: "PRICING_NEGATIVE", sentiment: "negative" },
      { id: "r19", text: "Key features locked behind premium tier", code: "PRICING_NEGATIVE", sentiment: "negative" },
      { id: "r20", text: "Price increases feel unjustified", code: "PRICING_NEGATIVE", sentiment: "negative" },
    ],
  },
  {
    id: "overall_support",
    name: "Customer Support",
    description: "All responses mentioning support, feedback handling, and service quality",
    reasoning: "Support-related responses are aggregated to measure service quality perception. Interestingly, support only appears positively (in recommendation drivers), with no negative support mentions. This suggests support is a strength that can be leveraged in marketing and retention efforts.",
    responses: [
      { id: "r24", text: "Their support team is incredibly responsive", code: "SUPPORT_POSITIVE", sentiment: "positive" },
      { id: "r25", text: "They actually listen to feedback and ship fixes fast", code: "SUPPORT_POSITIVE", sentiment: "positive" },
    ],
  },
  {
    id: "overall_features",
    name: "Feature Gaps",
    description: "All feature requests and missing functionality mentions",
    reasoning: "This theme aggregates all feature requests from Q4 plus implicit feature gaps mentioned in other questions (like 'not reliable enough' implying need for reliability features). The 15 unique feature requests cluster into 3 sub-themes: Integrations (40%), Reporting (33%), and Mobile (27%). This prioritization helps roadmap planning.",
    responses: [
      { id: "r29", text: "Need native Slack integration", code: "FEATURE_REQUEST", sentiment: "neutral" },
      { id: "r30", text: "Salesforce sync would be huge for our workflow", code: "FEATURE_REQUEST", sentiment: "neutral" },
      { id: "r32", text: "Custom report builder would be amazing", code: "FEATURE_REQUEST", sentiment: "neutral" },
      { id: "r35", text: "Mobile app needs offline mode", code: "FEATURE_REQUEST", sentiment: "neutral" },
      { id: "r36", text: "Push notifications for important updates", code: "FEATURE_REQUEST", sentiment: "neutral" },
    ],
  },
  {
    id: "overall_productivity",
    name: "Productivity Impact",
    description: "All responses about time savings, efficiency, and workflow improvements",
    reasoning: "Productivity-focused responses are key advocacy drivers (appearing strongly in Q3 recommendations). This theme captures the tangible business value users derive from the product. High positive sentiment (92%) and strong correlation with NPS promoters make this the primary value proposition to emphasize.",
    responses: [
      { id: "r21", text: "It saves our team hours every week", code: "PRODUCTIVITY_POSITIVE", sentiment: "positive" },
      { id: "r22", text: "Streamlined our entire approval process", code: "PRODUCTIVITY_POSITIVE", sentiment: "positive" },
      { id: "r23", text: "Automation features are game-changing", code: "PRODUCTIVITY_POSITIVE", sentiment: "positive" },
    ],
  },
];

export const overallCodeframe = {
  totalQuestions: questionLevelData.length,
  totalThemes: overallCodeframeThemes.length,
  totalResponses: questionLevelData.reduce(
    (sum, q) => sum + q.themes.reduce((tSum, t) => tSum + t.responses.length, 0),
    0
  ),
  allThemes: overallCodeframeThemes,
};
