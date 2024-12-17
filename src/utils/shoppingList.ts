import { Ingredient } from '../types';

export function consolidateIngredients(ingredients: Ingredient[]): Ingredient[] {
  const consolidated = ingredients.reduce((acc, curr) => {
    const existing = acc.find(
      item => 
        item.name.toLowerCase() === curr.name.toLowerCase() && 
        item.unit.toLowerCase() === curr.unit.toLowerCase()
    );

    if (existing) {
      existing.quantity += curr.quantity;
    } else {
      acc.push({ ...curr });
    }

    return acc;
  }, [] as Ingredient[]);

  return consolidated.sort((a, b) => a.name.localeCompare(b.name));
}

export function generateShoppingListEmail(ingredients: Ingredient[]): string {
  const body = ingredients
    .map(ing => `- ${ing.quantity} ${ing.unit} ${ing.name}`)
    .join('\n');

  return `mailto:?subject=Liste de courses&body=${encodeURIComponent(body)}`;
}

export function printShoppingList(ingredients: Ingredient[]): void {
  const content = ingredients
    .map(ing => `${ing.quantity} ${ing.unit} ${ing.name}`)
    .join('\n');

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Liste de courses</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { margin-bottom: 20px; }
            ul { list-style-type: none; padding: 0; }
            li { padding: 8px 0; border-bottom: 1px solid #eee; }
          </style>
        </head>
        <body>
          <h1>Liste de courses</h1>
          <ul>
            ${ingredients
              .map(ing => `<li>${ing.quantity} ${ing.unit} ${ing.name}</li>`)
              .join('')}
          </ul>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }
}