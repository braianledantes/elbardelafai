import { readJSON } from "../utils.js";
import { randomUUID } from 'node:crypto';

const ingredients = readJSON('./data/ingredients.json');
sortIngredients();

function sortIngredients() {
    ingredients.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
}

export class IngredientModel {
    static async getAll({ search = "", page = 1, pageSize = 12 }) {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        let ingredientsResult = ingredients;
        
        if (search) {
            const s = search.toLowerCase();
            ingredientsResult = ingredients.filter(
                i => i.name.toLowerCase().includes(s)
            )
        } 

        const maxPages = Math.ceil(ingredientsResult.length / pageSize);

        if (start < ingredientsResult.length) {
            ingredientsResult = ingredientsResult.slice(start, end);
        } else {
            ingredientsResult = ingredientsResult.slice(-pageSize)
        }


        return {
            page,
            maxPages,
            pageSize: ingredientsResult.length,
            ingredients: ingredientsResult
        };
    }

    static async getByName({ name }) {
        return ingredients.find(i => i.name === name);
    }
}