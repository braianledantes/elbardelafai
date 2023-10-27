import { Router } from "express";
import { IngredientController } from "../controllers/ingredients.js";

export const ingredientsRouter = Router();

ingredientsRouter.get('/', IngredientController.getAll);

ingredientsRouter.get('/random', IngredientController.getRandom);

ingredientsRouter.get('/:name', IngredientController.getByName);