export type Recipe = {
  id: string;
  name: string;
  image: string;
  category: 'meat' | 'fish' | 'vegetarian';
  servings: number;
  ingredients: Ingredient[];
  steps: string[];
  prepTime: number;
  cookTime: number;
};

export type Ingredient = {
  name: string;
  quantity: number;
  unit: string;
};

export type CalendarEvent = {
  date: string;
  recipeId: string;
};

export type ShoppingListItem = {
  name: string;
  quantity: number;
  unit: string;
  checked: boolean;
};