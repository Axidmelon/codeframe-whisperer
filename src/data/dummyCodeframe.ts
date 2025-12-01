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
        reasoning: "The name 'Cola Preference' was chosen because 100% of responses in this cluster explicitly mentioned cola brands (Coke, Coca-Cola, Pepsi). The word frequency analysis showed 'cola' and related brand terms appearing 4 times across 4 responses. The sentiment analysis revealed positive preference indicators ('love', 'best', 'prefer') consistently paired with cola brands. Alternative names like 'Brand Loyalty' or 'Beverage Choice' were considered but 'Cola Preference' was selected as it precisely captures both the product category (cola) and the behavior pattern (preference expression) demonstrated in the responses.",
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
        reasoning: "The theme name 'Non-Cola Preference' was selected to create a clear contrast with the 'Cola Preference' theme. Analysis showed these responses mentioned alternative soft drink categories: lemon-lime (Sprite), citrus (Mountain Dew), and fruit-flavored (Fanta). The term 'Non-Cola' was chosen over alternatives like 'Alternative Beverages' or 'Other Soft Drinks' because it maintains structural parallelism with the Cola theme while clearly indicating the distinguishing characteristic. The semantic analysis confirmed zero overlap in product attributes between these responses and cola-based responses, validating the categorical separation.",
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
        reasoning: "The name 'Health Conscious' was selected because the underlying motivation in all three responses centers on health awareness rather than taste or brand preference. Key terms like 'unhealthy', 'sugar-free', and 'sparkling water' indicate wellness-driven decision making. The adjective 'conscious' was specifically chosen over alternatives like 'Health Concerns' or 'Wellness Focus' because it implies an active, intentional mindset rather than passive worry. This theme represents a fundamental shift from product preference to lifestyle values, which is why it was separated from other themes despite also discussing beverage choices.",
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
        reasoning: "The name 'Price Sensitivity' was chosen because all responses explicitly prioritize economic factors in their purchase decisions. The term 'sensitivity' was selected over 'focus' or 'concern' as it is the standard terminology in consumer behavior research for measuring how price changes influence purchasing decisions. Keywords like 'main factor', 'discounts', 'deals', and 'affordable' demonstrate varying degrees of price consciousness. Alternative theme names like 'Budget Conscious' or 'Cost Factors' were considered, but 'Price Sensitivity' was deemed most appropriate as it captures both the rational economic calculation and the emotional importance of cost to these consumers.",
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
        reasoning: "The theme name 'Brand Loyalty' was selected because these responses demonstrate established, ongoing relationships with brands rather than situational preferences. The co-occurrence of terms like 'trust', 'stick to', 'loyal', and 'reputation' indicates relational commitment beyond functional benefits. The word 'loyalty' was specifically chosen over 'trust' or 'preference' because it encompasses both the behavioral aspect (repeat purchase) and the attitudinal aspect (emotional commitment) evident in these responses. This theme was deliberately separated from 'Price Sensitivity' because these consumers prioritize brand relationship over economic factors, representing a fundamentally different purchase motivation framework.",
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
