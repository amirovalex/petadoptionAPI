let express = require("express");
let router = express.Router();
const petsService = require("../../data/pets");
const auth = require("../../middleware/auth.js");
const { isUserAdmin } = require("../../middleware/isUserAdmin.js");
const { validateBody } = require("../../middleware/validateBody.js");
const { addPetSchema } = require("../../schemas/allSchemas");
//Routes

//GET ROUTES

//GET PETS BY CRITERIA FROM DB
router.get("/", auth, async (req, res) => {
  try {
    const { type, minHeight, maxHeight, minWeight, maxWeight, name } =
      req.query;
    let { adoptionStatus } = req.query;
    // if (adoptionStatus === "null") {
    //   adoptionStatus = null;
    // }
    const db = petsService.getPetsServiceInstance();
    const result = await db.getPetsByCriteria(
      adoptionStatus,
      type,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight,
      name
    );
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

//GET PET BY ID
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const db = petsService.getPetsServiceInstance();
    const result = await db.getPetById(id);

    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

//GET SAVED PETS BY USER ID
router.get("/saved/user/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const db = petsService.getPetsServiceInstance();
    const result = await db.getSavedPets(id);

    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

//GET PETS BY USER ID
router.get("/user/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const db = petsService.getPetsServiceInstance();
    const result = await db.getPetsByUserId(userId);

    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

//POST ROUTES

//ADD PET TO DB
router.post(
  "/",
  validateBody(addPetSchema),
  auth,
  isUserAdmin,
  async (req, res) => {
    try {
      const {
        type,
        name,
        adoptionStatus,
        picture,
        weight,
        height,
        color,
        bio,
        hypoallergenic,
        dietaryRestrictions,
        breed,
      } = req.body;
      const db = petsService.getPetsServiceInstance();
      const result = await db.addNewPet(
        type,
        name,
        adoptionStatus,
        picture,
        weight,
        height,
        color,
        bio,
        hypoallergenic,
        dietaryRestrictions,
        breed
      );

      res.send(result);
    } catch (err) {
      console.log(err);
    }
  }
);

//ADOPT A PET
router.post("/:id/adopt", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, adoptionType } = req.body;

    //protected to logged in users
    if (userId) {
      const db = petsService.getPetsServiceInstance();
      const result = await db.adoptPet(id, userId, adoptionType);
      res.send(result);
    }
  } catch (err) {
    console.log(err);
  }
});

//RETURN A PET
router.post("/:id/return", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    //protected to logged in users
    if (userId) {
      const db = petsService.getPetsServiceInstance();
      const result = await db.returnPet(id);
      res.send(result);
    }
  } catch (err) {
    console.log(err);
  }
});

//SAVE A PET
router.post("/:id/save", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    //protected to logged in users
    if (userId) {
      const db = petsService.getPetsServiceInstance();
      const result = await db.savePet(id, userId);
      res.send(result);
    }
  } catch (err) {
    console.log(err);
  }
});

//PUT ROUTES

//EDIT PET IN DB BY ID
router.put("/:id", auth, isUserAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      type,
      name,
      adoptionStatus,
      picture,
      weight,
      height,
      color,
      bio,
      hypoallergenic,
      dietaryRestrictions,
      breed,
    } = req.body;

    //protected to logged in users
    const db = petsService.getPetsServiceInstance();
    const result = await db.updatePet(
      id,
      type,
      name,
      adoptionStatus,
      picture,
      weight,
      height,
      color,
      bio,
      hypoallergenic,
      dietaryRestrictions,
      breed
    );
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

//DELETE ROUTES

//DELETE SAVED PET
router.put("/:id/save", auth, async (req, res) => {
  try {
    console.log("request body", req.body);
    const { id } = req.params;
    const { userId } = req.body;
    console.log("petId:", typeof id, "user id:", userId);
    //protected to logged in users
    if (userId) {
      const db = petsService.getPetsServiceInstance();
      const result = await db.unsavePet(id, userId);
      res.send(result);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
