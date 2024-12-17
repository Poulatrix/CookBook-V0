import React, { useState } from 'react';
import { Recipe, CalendarEvent, ShoppingListItem } from './types';
import { recipes as initialRecipes } from './data/recipes';
import { RecipeCard } from './components/RecipeCard';
import { RecipeDetail } from './components/RecipeDetail';
import { Calendar } from './components/Calendar';
import { ShoppingList } from './components/ShoppingList';
import { SearchBar } from './components/SearchBar';
import { RecipeForm } from './components/RecipeForm';
import { Filter, Plus } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>('recipes', initialRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedCategory, setSelectedCategory] = useLocalStorage<string>('selectedCategory', 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [calendarEvents, setCalendarEvents] = useLocalStorage<CalendarEvent[]>('calendarEvents', []);
  const [shoppingList, setShoppingList] = useLocalStorage<ShoppingListItem[]>('shoppingList', []);
  const [activeTab, setActiveTab] = useLocalStorage<'recipes' | 'calendar' | 'shopping'>('activeTab', 'recipes');
  const [showRecipeForm, setShowRecipeForm] = useState(false);

  const filteredRecipes = recipes.filter(
    recipe => (
      (selectedCategory === 'all' || recipe.category === selectedCategory) &&
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleAddToShoppingList = (ingredients: Recipe['ingredients']) => {
    const newItems = ingredients.map(ing => ({
      ...ing,
      checked: false,
    }));
    setShoppingList([...shoppingList, ...newItems]);
  };

  const handleAddCalendarEvent = (date: string, recipeId: string) => {
    setCalendarEvents([...calendarEvents, { date, recipeId }]);
  };

  const handleAddRecipe = (newRecipe: Omit<Recipe, 'id'>) => {
    const recipeWithId = {
      ...newRecipe,
      id: (recipes.length + 1).toString(),
    };
    setRecipes([...recipes, recipeWithId]);
    setShowRecipeForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Mes Recettes</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTab('recipes')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'recipes' ? 'bg-blue-500 text-white' : 'text-gray-600'
                }`}
              >
                Recettes
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'calendar' ? 'bg-blue-500 text-white' : 'text-gray-600'
                }`}
              >
                Planning
              </button>
              <button
                onClick={() => setActiveTab('shopping')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'shopping' ? 'bg-blue-500 text-white' : 'text-gray-600'
                }`}
              >
                Courses
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'recipes' && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === 'all' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Tous
                  </button>
                  <button
                    onClick={() => setSelectedCategory('meat')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === 'meat' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Viandes
                  </button>
                  <button
                    onClick={() => setSelectedCategory('fish')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === 'fish' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Poissons
                  </button>
                  <button
                    onClick={() => setSelectedCategory('vegetarian')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === 'vegetarian' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Végétarien
                  </button>
                </div>
                <SearchBar onSearch={setSearchQuery} />
              </div>
              <button
                onClick={() => setShowRecipeForm(true)}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Nouvelle recette
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => setSelectedRecipe(recipe)}
                />
              ))}
            </div>
          </>
        )}

        {activeTab === 'calendar' && (
          <Calendar
            events={calendarEvents}
            recipes={recipes}
            onAddEvent={handleAddCalendarEvent}
          />
        )}

        {activeTab === 'shopping' && (
          <ShoppingList
            items={shoppingList}
            onToggleItem={(index) => {
              const newList = [...shoppingList];
              newList[index].checked = !newList[index].checked;
              setShoppingList(newList);
            }}
            onRemoveItem={(index) => {
              setShoppingList(shoppingList.filter((_, i) => i !== index));
            }}
          />
        )}

        {selectedRecipe && (
          <RecipeDetail
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
            onAddToShoppingList={handleAddToShoppingList}
          />
        )}

        {showRecipeForm && (
          <RecipeForm
            onSubmit={handleAddRecipe}
            onClose={() => setShowRecipeForm(false)}
          />
        )}
      </main>
    </div>
  );
}

export default App;