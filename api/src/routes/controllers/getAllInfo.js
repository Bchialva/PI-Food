const {getRecipes} = require("./getRecipes");
const {recipeDbInfo} = require("./getRecipesToDb");

const getAllInfo = async () => {
  const apiInfo = await getRecipes();
  const dbInfo = await recipeDbInfo();
  const totalInfo = apiInfo.concat(dbInfo);
  return totalInfo;
};

module.exports = {getAllInfo};