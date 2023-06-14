const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";
const DButils = require("./DButils");



/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */


async function getRecipeInformation(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
}



async function getRecipeDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);

    if (recipe_info === null){
        recipe_info = await DButils.execQuery(`select recipe_id,user_id,title,readyInMinutes,image,popularity,vegan,vegetarian,glutenFree from recipes where recipe_id='${recipe_id}'`)
        return recipe_info;
    }

    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;

    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        
    }
}

async function getRecipeFullDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);

    if (recipe_info === null){
        recipe_info = await DButils.execQuery(`select * from recipes where recipe_id='${recipe_id}'`)

    }
    return recipe_info;
}


async function getRandoms(){
    let randoms = await axios.get(`${api_domain}/random?number=3`, {
        params: {
            apiKey: process.env.spooncular_apiKey
        }
    })
    let recipes = []
    for (let recipe of randoms){
        let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe.data;

        recipes.push( {
            id: id,
            title: title,
            readyInMinutes: readyInMinutes,
            image: image,
            popularity: aggregateLikes,
            vegan: vegan,
            vegetarian: vegetarian,
            glutenFree: glutenFree,
            
        })
    }
    return recipes;
}

async function search(queried){
    let results = await axios.get(`${api_domain}/complexSearch`, {
        params: {
            apiKey: process.env.spooncular_apiKey,
            query: queried.query,
            cuisine: queried.cuisine,
            diet: queried.diet,
            intolerances: queried.intolerances,
            number: queried.number,
            instructionsRequired: true,
        }
    })

    return results;
}




exports.search = search;
exports.getRandoms = getRandoms;
exports.getRecipeFullDetails = getRecipeFullDetails;
exports.getRecipeDetails = getRecipeDetails;



