import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Recipe, Ingredient } from '../types';

type Props = {
  onSubmit: (recipe: Omit<Recipe, 'id'>) => void;
  onClose: () => void;
};

export function RecipeForm({ onSubmit, onClose }: Props) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState<'meat' | 'fish' | 'vegetarian'>('meat');
  const [servings, setServings] = useState(4);
  const [prepTime, setPrepTime] = useState(0);
  const [cookTime, setCookTime] = useState(0);
  const [ingredients, setIngredients] = useState<Omit<Ingredient, 'id'>[]>([]);
  const [steps, setSteps] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      image,
      category,
      servings,
      prepTime,
      cookTime,
      ingredients,
      steps,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Nouvelle Recette</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Nom</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Catégorie</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Recipe['category'])}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="meat">Viande</option>
              <option value="fish">Poisson</option>
              <option value="vegetarian">Végétarien</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Personnes</label>
              <input
                type="number"
                value={servings}
                onChange={(e) => setServings(Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Préparation (min)</label>
              <input
                type="number"
                value={prepTime}
                onChange={(e) => setPrepTime(Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Cuisson (min)</label>
              <input
                type="number"
                value={cookTime}
                onChange={(e) => setCookTime(Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Ingrédients</label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].name = e.target.value;
                    setIngredients(newIngredients);
                  }}
                  className="flex-1 border rounded-lg px-3 py-2"
                  placeholder="Nom"
                />
                <input
                  type="number"
                  value={ingredient.quantity}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].quantity = Number(e.target.value);
                    setIngredients(newIngredients);
                  }}
                  className="w-24 border rounded-lg px-3 py-2"
                  placeholder="Quantité"
                />
                <input
                  type="text"
                  value={ingredient.unit}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index].unit = e.target.value;
                    setIngredients(newIngredients);
                  }}
                  className="w-24 border rounded-lg px-3 py-2"
                  placeholder="Unité"
                />
                <button
                  type="button"
                  onClick={() => setIngredients(ingredients.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setIngredients([...ingredients, { name: '', quantity: 0, unit: '' }])}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
            >
              <Plus className="w-4 h-4" />
              Ajouter un ingrédient
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Étapes</label>
            {steps.map((step, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={step}
                  onChange={(e) => {
                    const newSteps = [...steps];
                    newSteps[index] = e.target.value;
                    setSteps(newSteps);
                  }}
                  className="flex-1 border rounded-lg px-3 py-2"
                  placeholder={`Étape ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => setSteps(steps.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setSteps([...steps, ''])}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
            >
              <Plus className="w-4 h-4" />
              Ajouter une étape
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Créer la recette
          </button>
        </form>
      </div>
    </div>
  );
}