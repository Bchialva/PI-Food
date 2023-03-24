const { Recipe, Diet } = require("../../db");

const recipeDbInfo = async () => {
  try {
    const databaseRecipes = await Recipe.findAll({
      include: [{
        model: Diet,
        as: 'diets',
        attributes: ['name'],
        through: { attributes: [] }
      }]
    });

    const databaseRecipesMapped = databaseRecipes.map(recipe => {
      const recipeData = recipe.toJSON();
      const dietsArray = recipe.diets.map(diet => diet.name);
      return {
        ...recipeData,
        diets: dietsArray
      };
    });
    
    return databaseRecipesMapped;
    
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  recipeDbInfo
};