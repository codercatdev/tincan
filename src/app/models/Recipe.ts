

export interface Recipe {
  id?: string;
  created?: string;
  detectedText?: string;
  storageLocation?: string;
  processing?: boolean;
  url?: string;
  context?: string;
  type?: string;
  author?: string;
  cookTime?: string;
  datePublished?: Date;
  description?: string;
  image?: string;
  recipeIngredient?: RecipeIngredient[];
  interactionStatistic?: InteractionStatistic;
  name?: string;
  nutrition?: Nutrition;
  prepTime?: string;
  recipeInstructions?: string;
  recipeYield?: string;
  suitableForDiet?: string;
}

export interface InteractionStatistic {
  type?: string;
  interactionType?: string;
  userInteractionCount?: string;
}

export interface Nutrition {
  type?: string;
  calories?: string;
  fatContent?: string;
}

export interface RecipeIngredient{
  qty: number;
  ingredient: string;
}
