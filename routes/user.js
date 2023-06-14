var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipe_utils = require("./utils/recipes_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users").then((users) => {
      if (users.find((x) => x.user_id === req.session.user_id)) {
        req.user_id = req.session.user_id;
        next();
      }
    }).catch(err => next(err));
  } else {
    res.sendStatus(401);
  }
});


/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    await user_utils.markAsFavorite(user_id,recipe_id);
    res.status(200).send("The Recipe successfully saved as favorite");
    } catch(error){
    next(error);
  }
})

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    let favorite_recipes = {};
    const recipes_id = await user_utils.getFavoriteRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});


/**
 * This path returns the logged in user's last seen recipes
 */
router.get('getLastSeen', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const last = await user_utils.getLastViewed(user_id);
    if (last.length === 0){
      res.status(404).send("Last viewed not found")
    } else{
      res.status(200).send("returned last 3 seen recipes")
    }
  } catch(error){
    next(error);
  }
})


/**
 * This path addes the viewed recipe to viewed
 */
router.post('addToSeen', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    await user_utils.addViewed(user_id, recipe_id)
    res.status(200).send("added to viewed list")
  } catch(error){
    next(error);
  }
})



/**
 * This path adds a like to a recipe
 */
router.put('like', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    recipes = await DButils.execQuery("SELECT recipe_id from recipes");
    if (recipes.find((x) => x.recipe_id !== recipe_id))
      throw { status: 400, message: "Error, invalid recipe id" };
    await user_utils.giveLike(recipe_id)
    res.status(201).send("successfuly added like")
  } catch(error){
    next(error);
  }
})


/**
 * This path adds a new recipe from a logged in user
 */
router.post('/createRecipe', async (req,res,next) =>{
  try{
    const user_id = req.session.user_id;
    let recipe_details = {
      title: req.body.title,
      ready_in_minutes: req.body.readyInMinutes,
      vegetarian: req.body.vegetarian,
      vegan: req.body.vegan,
      gluten_free: req.body.gluten_free,
      servings: req.body.servings,
      instructions: req.body.instructions,
      ingredients: req.body.ingredients,
    }
    await user_utils.addNewRecipe(user_id, recipe_details.title, recipe_details.ready_in_minutes, recipe_details.vegetarian, recipe_details.vegan, recipe_details.gluten_free, recipe_details.servings, recipe_details.instructions, recipe_details.ingredients, recipe_details.image)
    res.status(201).send("New recipe has been added")
  }catch(error){
    next(error);
  }
}) 


/**
 * This path adds a new family recipe from a logged in user
 */
// add new recipe to family recipes

router.post('/FamilyRecipe', async (req,res,next) =>{
  try{
    const user_id = req.session.user_id;
    let recipe_details = {
      title: req.body.title,
      author: req.body.author,
      whenDoWeEat: req.body.whenDoWeEat,
      instructions: req.body.instructions,
      ingredients: req.body.ingredients,
      image: req.body.image,
    }
    await user_utils.addNewFamilyRecipe(user_id, recipe_details.title, recipe_details.author, recipe_details.whenDoWeEat, recipe_details.ingredients, recipe_details.instructions, recipe_details.image)
    res.status(201).send("New recipe has been added")
  }catch(error){
    next(error);
  }
}) 


/**
 * This path gets a logged users personal recipes
 */

router.get('/personalRecipe', async (req,res,next) =>{
  try{
    const user_id = req.session.user_id;
    await user_utils.getUserCreated(user_id)
    res.status(200).send("data about the user's created recipes recieved")
  }catch(error){
    next(error);
  }
}) 


/**
 * This path gets a logged users personal recipes
 */

router.get('/FamilyRecipe', async (req,res,next) =>{
  try{
    const user_id = req.session.user_id;
    await user_utils.getFamily(user_id)
    res.status(200).send("data about the user's created recipes recieved")
  }catch(error){
    next(error);
  }
}) 

module.exports = router;
