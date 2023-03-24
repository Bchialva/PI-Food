const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const {Diet} = require ("../../db");


const searchInfo = async () => {
  const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
  const apiInfo = response.data.results.map(e => ({
    vegetarian: e.vegetarian,
    vegan: e.vegan,
    glutenFree: e.glutenFree,
    dairyFree: e.dairyFree,
    dietTypes: e.diets,
  }));
  return apiInfo;
};

const cleanInfoDiets = async () => {
  const data = await searchInfo();
  const dietTypes = [...new Set(data.flatMap(obj => obj.dietTypes))];
  const properties = ["vegetarian", ...dietTypes];
  const diets = properties.map(prop => ({ name: prop }));
  await Diet.bulkCreate(diets);
  console.log("Data saved successfully");
};

const checkAndCleanDiets = async () => {
  let dietsArray = [];
  const count = await Diet.count();
  if (count === 0) {
    await cleanInfoDiets();
  }
  const diets = await Diet.findAll();
  dietsArray = diets.map(diet => diet.name);
  return dietsArray;
};


module.exports = {
  checkAndCleanDiets,
};