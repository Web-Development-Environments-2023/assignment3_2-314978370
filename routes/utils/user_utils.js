const DButils = require("./DButils");

// mark recipe as favorite for logged in user
async function markAsFavorite(user_id, recipe_id){
    await DButils.execQuery(`insert into FavoriteRecipes values ('${user_id}',${recipe_id})`);
}

// get users favorite recipes
async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from FavoriteRecipes where user_id='${user_id}'`);
    return recipes_id;
}

// add recipe to viewed
async function addViewed(user_id, recipe_id){
    await DButils.execQuery(`insert into viewed values ('${user_id}','${recipe_id}', NOW())`);
}

// get users 3 last seen recipes
async function getLastViewed(user_id){
    const last = await DButils.execQuery(`select recipe_id from viewed where user_id='${user_id}' order by date Desc limit 3`)
    return last
}

// get all users last viewed
async function getViewed(user_id){
    const viewed = await DButils.execQuery(`select recipe_id from viewed where user_id='${user_id}'`)
    return viewed
}

// give like to recipe
async function giveLike(recipe_id){
    let likes = await DButils.execQuery(`select popularity from recipes where recipe_id='${recipe_id}'`)
    likes+=1
    await DButils.execQuery(`update recipes set popularity='${likes}' where recipe_id='${recipe_id}'`)
}


// add new recipe to db
async function addNewRecipe(user_id, title, ready_in_minutes, vegetarian, vegan, gluten_free, servings, instructions, ingredients, image){
    await DButils.execQuery(`insert into recipes (user_id, title, ready_in_minutes, vegetarian, vegan, gluten_free, numberOfportions, instructions, ingredients)
    VALUES ('${user_id}', '${title}', '${ready_in_minutes}', '${vegetarian}', '${vegan}', '${gluten_free}', '${servings}', '${instructions}', '${ingredients}')`);
}

// add new recipe to family recipes
async function addNewFamilyRecipe(user_id, title, author, whenDoWeEat, ingredients, instructions, image){
    await DButils.execQuery(`insert into family_recipe (user_id,title, author, whenDoWeEat, ingredients, instructions, image)
    VALUES ('${user_id}', '${title}', '${author}', '${whenDoWeEat}', '${ingredients}', '${instructions}', '${image}'`);
}


// get all recipes that logged in user created
async function getUserCreated(user_id){
    const created = await DButils.execQuery(`select * from recipes where user_id='${user_id}'`)
    return created
}



// get all users family recipes
async function getFamily(user_id){
    const family = await DButils.execQuery(`select * from family_recipes where user_id='${user_id}'`)
    return family
}

exports.getFavoriteRecipes = getFavoriteRecipes;
exports.getFamily = getFamily;
exports.addNewFamilyRecipe = addNewFamilyRecipe;
exports.getUserCreated = getUserCreated;
exports.addNewRecipe = addNewRecipe;
exports.addViewed = addViewed;
exports.getLastViewed = getLastViewed;
exports.getViewed = getViewed;
exports.giveLike = giveLike;
exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
