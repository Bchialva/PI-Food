const Router = require('express');
const router = Router();
const { checkAndCleanDiets } = require ('./controllers/getDiets')



router.get("/diets", async (req, res) => {
    try {
        const diet = await checkAndCleanDiets();
        res.status(200).send(diet);
        
    } catch (error) {
        res.status(400).json(error.message)
    }
})





module.exports = router;