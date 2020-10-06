const express = require('express')
const xss = require('xss')
const RecipesService = require('./recipes-service')
const IngredientsService = require('./ingredients-service')


const recipesRouter = express.Router()
const jsonParser = express.json()

const serializeRecipe = rec => ({
    id: rec.id,
    title: xss(rec.title),
    original_url: xss(rec.original_url),
    created: rec.date_created
})

const serializeIngredient = ing => ({
    id: ing.id,
    title: xss(ing.title),
    description: xss(ing.description),
    amount_str: xss(ing.amount_str),
    amount_in_metric: ing.amount_in_metric,
    metric_unit: ing.metric_unit
})


//Path to all recipes
recipesRouter
    .route('/')
    .get((req, res, next) => {
        RecipesService.getAllRecipes(req.app.get('db'), 1)
            .then(rec => {
                return res
                    .status(200)
                    .json(rec.map(serializeRecipe))
            })
            .catch(next)

    })
    .post(jsonParser, (req, res, next) => {
        const user_id = 1;
        const { title, original_url, ingredients } = req.body;
        const newRecipe = { title, original_url, user_id };

        //here I run ingredients.amount_str through 
        //conversion middleware to get value in metric
        //and save with ingredient object

        RecipesService.addRecipe(
            req.app.get('db'),
            newRecipe,
            ingredients
        )
            .then(rec => {
                console.log(rec)
                return res
                    .status(201)
                    .json(serializeRecipe(rec))
            })

            .catch(next)
    })



//Path to specific recipe
recipesRouter
    .route('/:id')

    .get((req, res, next) => {
        RecipesService.getRecipeById(
            req.app.get('db'),
            req.params.id
        )
            .then(rec => {
                return res
                    .status(200)
                    .json(serializeRecipe(rec))
            })
            .catch(next)
    })

    .delete((req, res, next) => {
        RecipesService.deleteRecipe(
            req.app.get('db'),
            req.params.id
        )
            .then(rec => {
                return res
                    .status(204)
                    .end()
            })
    })



//Path to all ingredients from recipe with specified id
recipesRouter
    .route('/:id/ingredients')
    .get((req, res, next) => {
        IngredientsService.getAllIngredients(
            req.app.get('db'),
            req.params.id
        )
            .then(rec => {
                return res
                    .status(200)
                    .json(rec.map(serializeIngredient))
            })

            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { title, description, amount_str } = req.body;
        const amount_in_metric = 5;
        const metric_unit = 'mL';
        const newIngredient = { title, description, amount_str, amount_in_metric, metric_unit, recipe_id: req.params.id }
        IngredientsService.addIngredient(
            req.app.get('db'),
            req.params.id,
            newIngredient
        )

            .then(ing => {
                res
                    .status(201)
                    .json(serializeIngredient(ing))
            })

            .catch(next)
    })



//Path to specific ingredient from recipe with specified id
recipesRouter
    .route('/:id/ingredients/:ingredient')
    .get((req, res, next) => {
        IngredientsService.getIngredientById(
            req.app.get('db'),
            req.params.id,
            req.params.ingredient
        )
            .then(rec => {
                return res
                    .status(200)
                    .json(serializeIngredient(rec))
            })

            .catch(next)
    })

    .delete((req, res, next) => {
        IngredientsService.deleteIngredient(
            req.app.get('db'),
            req.params.id,
            req.params.ingredient
        )
            .then(rec => {
                return res
                    .status(204)
                    .end()
            })
            .catch(next)

    })






module.exports = recipesRouter;