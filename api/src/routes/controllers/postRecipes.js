// const { Recipe, Diet } = require("../../db");

// const postRecipes = async (
//   title,
//   summary,
//   healthScore,
//   image,
//   steps,
//   diets
// ) => {
//   if (!title || !summary || !healthScore || !image || !steps) {
//     const recipePost = await Recipe.create({
//       title,
//       summary,
//       healthScore,
//       image,
//     });
//     let dietsDb = await Diet.findAll({ where: { name: diets } });
//     recipePost.addDiet(dietsDb);

//     return recipePost;
//   }
// };

// module.exports = {
//   postRecipes
// };