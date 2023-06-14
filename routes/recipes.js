var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");

router.get("/", (req, res) => res.send("im here"));


/**
 * This path returns preview details of a recipe by its id
 */
router.get("/FullDetailes/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipeDetails(req.params.recipeId);
    res.status(200).send(recipe);
  } catch (error) {
    next(error);
  }
});


/**
 * This path returns a full details of a recipe by its id
 */
router.get("/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipeFullDetails(req.params.recipeId);
    res.status(200).send(recipe);
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns details of recipes according to search
 */
router.get("/search", async (req, res, next) => {
  try {
    let queried = {};
    queried.query = req.query.query || '';
    queried.cuisine = req.query.cuisine || '';
    queried.number = req.query.resultSize || 5;
    queried.intolerance = req.query.intolerance || '';
    queried.diet = req.query.diet || '';
    const results = await recipes_utils.search(queried);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns details of  3 randoms recipes
 */
router.get("/random", async (req, res, next) => {
  try {
    const recipes = await recipes_utils.getRandoms();
    res.status(200).send(recipes);
  } catch (error) {
    next(error);
  }
});




module.exports = router;

