const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const getRecipes = async () => {
  const apiInfo = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  const allInfo = apiInfo.data.results.map((e) => {
    return {
      id: e.id,
      title: e.title,
      summary: e.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
      dishTypes: e.dishTypes.map((d)=> {return{name:d}}),
      healthScore: e.healthScore,
      image: e.image,
      steps:
        e.analyzedInstructions[0] && e.analyzedInstructions[0].steps
          ? e.analyzedInstructions[0].steps.map((a) => a.step).join(" || ")
          : "There is no steps",
      diets: e.diets ? e.diets.map((diet) => diet) : "There is no diet",
    };
  });
  return allInfo;
};

module.exports = {
    getRecipes,
}

