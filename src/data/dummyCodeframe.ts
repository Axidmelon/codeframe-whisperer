export interface Response {
  id: string;
  text: string;
  code: string;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  reasoning: string;
  responses: Response[];
}

export interface Question {
  id: string;
  text: string;
  themes: Theme[];
}

export const questionLevelData: Question[] = [
  {
    id: "q1",
    text: "What is your favorite soft drink brand?",
    themes: [
      {
        id: "t1",
        name: "Cola Preference",
        description: "Responses mentioning cola-based beverages",
        reasoning: "This theme was generated after analyzing response patterns where brand-specific cola mentions ('Coke', 'Coca-Cola', 'Pepsi') were consistently identified. The LLM recognized these as a distinct cluster based on the product category (cola-based), with semantic similarity in brand preference expressions and positive sentiment markers.",
        responses: [
          { id: "r1", text: "I love Coke, it's refreshing", code: "COLA_COKE" },
          { id: "r2", text: "Coca-Cola is the best", code: "COLA_COKE" },
          { id: "r3", text: "Pepsi all the way", code: "COLA_PEPSI" },
          { id: "r4", text: "I prefer Coca Cola over others", code: "COLA_COKE" },
        ],
      },
      {
        id: "t2",
        name: "Non-Cola Preference",
        description: "Responses about non-cola drinks",
        reasoning: "The model identified a pattern of responses mentioning non-cola beverages (Sprite, Mountain Dew, Fanta). These were grouped separately from cola preferences because they represent a different product category with distinct flavor profiles (citrus, fruit-based) and consumer motivations, forming a natural thematic boundary.",
        responses: [
          { id: "r5", text: "Sprite is my favorite", code: "LEMON_LIME_SPRITE" },
          { id: "r6", text: "Mountain Dew for the energy", code: "CITRUS_MDEW" },
          { id: "r7", text: "I like Fanta orange", code: "FRUIT_FANTA" },
        ],
      },
      {
        id: "t3",
        name: "Health Conscious",
        description: "Responses showing concern for health",
        reasoning: "Through semantic analysis, the LLM detected health-related language patterns ('unhealthy', 'sugar-free', 'avoid') coupled with negative product sentiment. These responses shared a common concern for wellness and health implications, distinguishing them from brand preference themes. The model recognized this as a distinct consumer mindset cluster.",
        responses: [
          { id: "r8", text: "I avoid soft drinks, they're unhealthy", code: "HEALTH_AVOID" },
          { id: "r9", text: "Only sugar-free options for me", code: "HEALTH_SUGAR_FREE" },
          { id: "r10", text: "I switched to sparkling water", code: "HEALTH_ALTERNATIVE" },
        ],
      },
    ],
  },
  {
    id: "q2",
    text: "What factors influence your soft drink purchase decisions?",
    themes: [
      {
        id: "t4",
        name: "Price Sensitivity",
        description: "Cost-related considerations",
        reasoning: "The LLM identified economic decision-making language across responses ('price', 'discounts', 'affordable'). These were classified together because they all reference cost as the primary purchase driver, with contextual indicators showing rational, budget-conscious consumer behavior rather than emotional brand attachment.",
        responses: [
          { id: "r11", text: "Price is the main factor", code: "FACTOR_PRICE" },
          { id: "r12", text: "I look for discounts and deals", code: "FACTOR_DEALS" },
          { id: "r13", text: "Affordable options are important", code: "FACTOR_AFFORDABILITY" },
        ],
      },
      {
        id: "t5",
        name: "Brand Loyalty",
        description: "Brand preference and trust",
        reasoning: "Pattern analysis revealed responses with loyalty-indicating language ('trust', 'reputation', 'loyal', 'stick to') that signaled emotional brand attachment. The model grouped these separately from price sensitivity because they represent relationship-based decision-making rather than transactional factors, forming a distinct psychological theme.",
        responses: [
          { id: "r14", text: "I stick to brands I trust", code: "FACTOR_TRUST" },
          { id: "r15", text: "Brand reputation matters", code: "FACTOR_REPUTATION" },
          { id: "r16", text: "I'm loyal to my favorite brand", code: "FACTOR_LOYALTY" },
        ],
      },
    ],
  },
];

export const overallCodeframe = {
  totalQuestions: 2,
  totalThemes: 5,
  totalResponses: 16,
  allThemes: [
    ...questionLevelData[0].themes,
    ...questionLevelData[1].themes,
  ],
};
