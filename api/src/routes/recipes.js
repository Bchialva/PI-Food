const { Router } = require("express");
require("dotenv").config();
const router = Router();
const {getAllInfo} = require("./controllers/getAllInfo");
const { Recipe, Diet } = require("../db");

router.get("/recipes", async (req, res) => {
  try {
    const { name } = req.query;
    const recipes = await getAllInfo();
  if(name) {
  const byName = await recipes.filter(i => i.title.toLowerCase().includes(name.toString().toLowerCase()))
  byName.length ?
  res.status(200).send(byName) :
  res.status(404).send('Recipe not found');
} else {
  res.status(200).json(recipes);
}
} catch (error) {
console.log(error.message);
return res.status(404).send("No recipe found");
}
});


router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allInfo = await getAllInfo();
    if (id) {
      const idFiltered = await allInfo.filter((e) => e.id == id);
      if (idFiltered.length) return res.status(200).json(idFiltered);
    }
  } catch (error) {
    console.log(error.message);
    res.status(404).send("No recipe found with matching id");
  }
});

router.post("/recipes", async (req, res) => {
  const { steps, title, summary, healthScore, image, diets, createdInDb } = req.body;

  try {
    if (!title || !summary || !healthScore || !image || !steps) {
      return res.status(400).send("Please provide all required information");
    }

    if (!diets || !diets.length) {
      return res.status(400).send("Please provide at least one diet");
    }

    const recipePost = await Recipe.create({
      steps,
      title,
      summary,
      healthScore,
      image,
      createdInDb
    });

    for (let i = 0; i < diets.length; i++) {
      const diet = diets[i];
      const dietDb = await Diet.findOne({
        where: { name: diet }
      });
      if (dietDb) {
        await recipePost.addDiet(dietDb);
      }
    }

    console.log("Recipe created successfully with diets: ", diets);

    return res.status(200).send("Recipe created successfully");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Error creating recipe");
  }
});

router.delete("/recipes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      Recipe.destroy({
        where: {
          id: id,
        },
      });
    }
    return res.status(200).send("Recipe deleted");
  } catch (error) {
    console.log(error.message);
    return res.status(400).send("Cannot delete recipe");
  }
});

module.exports = router;