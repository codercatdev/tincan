
import * as admin from 'firebase-admin';

admin.initializeApp()

export {recipesOnWrite} from './triggers/recipes';
export {recipeIngredientsOnWrite} from './triggers/recipe_ingredients';
export {recipeInstructionsOnWrite} from './triggers/recipe_instructions';
