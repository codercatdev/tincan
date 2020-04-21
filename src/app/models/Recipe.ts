

export interface Recipe {
  id?: string;
  created?: string;
  detectedText?: string;
  storageLocation?: string;
  processing?: boolean;
  context?: string;
  author?: string;
  cookTime?: number;
  datePublished?: Date;
  description?: string;
  image?: string;
  keywords?: string;
  name?: string;
  nutrition?: Nutrition;
  prepTime?: number;
  recipeCategory?: string;
  recipeCuisine?: string;
  recipeIngredients?: RecipeIngredient[];
  recipeInstructions?: RecipeInstruction[];
  recipeYield?: string;
  totalTime?: number;
  video?: Video;
}

export interface Nutrition {
  type?: string;
  calories?: string;
  fatContent?: string;
}

export interface RecipeIngredient {
  qty: number;
  ingredient: string;
}

export interface RecipeInstruction {
  name?: string;
  text?: string;
  url?: string;
  image?: string;
}

export interface Video {
  video?: VideoClass;
}

export interface VideoClass {
  name?: string;
  description?: string;
  thumbnailURL?: string;
  contentURL?: string;
  embedURL?: string;
  uploadDate?: Date;
  duration?: string;
  hasPart?: HasPart[];
}

export interface HasPart {
  id?: string;
  name?: string;
  startOffset?: number;
  endOffset?: number;
  url?: string;
}
