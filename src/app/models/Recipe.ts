export class Recipe {
  public id?: string;
  public createdAt?: firebase.firestore.Timestamp;
  public updatedAt?: firebase.firestore.Timestamp;
  public storageLocation?: string;
  public cloudinary?: any;
  public context?: string;
  public author?: string;
  public cookTime?: number;
  public datePublished?: Date;
  public description?: string;
  public image?: string;
  public keywords?: string;
  public name?: string;
  public nutrition?: Nutrition;
  public prepTime?: number;
  public recipeCategory?: string;
  public recipeCuisine?: string;
  public recipeYield?: string;
  public totalTime?: number;
  public video?: Video;
}

export class Nutrition {
  public type?: string;
  public calories?: string;
  public fatContent?: string;
}

export class RecipeIngredient {
  public id?: string;
  public qty?: number;
  public ingredient?: string;
}

export class RecipeInstruction {
  public id?: string;
  public name?: string;
  public text?: string;
  public url?: string;
  public image?: string;
}

export class Video {
  public video?: VideoClass;
}

export class VideoClass {
  public name?: string;
  public description?: string;
  public thumbnailURL?: string;
  public contentURL?: string;
  public embedURL?: string;
  public uploadDate?: Date;
  public duration?: string;
  public hasPart?: HasPart[];
}

export class HasPart {
  public id?: string;
  public name?: string;
  public startOffset?: number;
  public endOffset?: number;
  public url?: string;
}
