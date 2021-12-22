const { query } = require("../lib/db");
const { v4: uuidv4 } = require("uuid");
const instance = null;

class petsService {
  static getPetsServiceInstance() {
    console.log("petsService instance", instance);
    return instance ? instance : new petsService();
  }
  getPetsByCriteria = async (adoptionStatus, type, height, weight, name) => {
    try {
      console.log(adoptionStatus, type, height, weight, name);
      const sql = `SELECT * FROM pets WHERE 
          ${
            adoptionStatus
              ? `adoptionStatus = '${adoptionStatus}' 
            ${type || height || weight || name ? "AND" : ""}`
              : `adoptionStatus IS NULL ${
                  type || height || weight || name ? "AND" : ""
                }`
          }
          ${
            type
              ? `type = '${type}' ${height || weight || name ? "AND" : ""}`
              : ""
          }
          ${height ? `height = ${height} ${weight || name ? "AND" : ""}` : ""}
          ${name ? `name = '${name}' ${weight ? "AND" : ""}` : ""}
          ${weight ? `weight = ${weight}` : ""}
          `;
      const pets = await query(sql);
      console.log("console", pets, "console");
      return pets;
    } catch (err) {
      console.log(err);
    }
  };

  getPetById = async (id) => {
    try {
      const sql = `SELECT * FROM pets WHERE id = '${id}'`;
      const pet = await query(sql);
      console.log("console", pet, "console");
      return pet;
    } catch (err) {
      console.log(err);
    }
  };

  getPetsByUserId = async (userId) => {
    try {
      const sql = `SELECT * FROM pets WHERE owner = '${userId}'`;
      const pets = await query(sql);
      console.log("console", pets, "console");
      return pets;
    } catch (err) {
      console.log(err);
    }
  };

  addNewPet = async (
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
  ) => {
    try {
      const petId = uuidv4();
      const sql = `INSERT INTO pets(id,type,name,adoptionStatus,picture,weight,height,color,bio,hypoallergenic,dietaryRestrictions,breed) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
      const pet = await query(sql, [
        petId,
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
      ]);
      console.log("console", pet, "console");
      return pet;
    } catch (err) {
      console.log(err);
    }
  };

  adoptPet = async (id, userId, adoptionType) => {
    try {
      const sql = `UPDATE pets SET owner = ? , adoptionStatus = ? WHERE id = ?`;
      const adoptedPet = await query(sql, [userId, adoptionType, id]);
      console.log("console", pet, "console");
      return adoptedPet;
    } catch (err) {
      console.log(err);
    }
  };

  savePet = async (id, userId) => {
    //need to make transaction to check if not already saved
    try {
      const sql = "INSERT INTO saved(petId,userId) VALUES (?,?)";
      const savedPet = await query(sql, [id, userId]);
      console.log("console", savedPet, "console");
      return savedPet;
    } catch (err) {
      console.log(err);
    }
  };

  unsavePet = async (id) => {
    //need to make transaction to check if saved
    try {
      console.log(id);
      const sql = "DELETE FROM saved WHERE id = ?";
      const unsavedPet = await query(sql, [id]);
      console.log("console", unsavedPet, "console");
      return unsavedPet;
    } catch (err) {
      console.log(err);
    }
  };

  returnPet = async (id) => {
    try {
      const sql = `UPDATE pets SET owner = NULL , adoptionStatus =  WHERE id = ?`;
      const returnedPet = await query(sql, [id]);
      console.log("console", returnedPet, "console");
      return returnedPet;
    } catch (err) {
      console.log(err);
    }
  };

  updatePet = async (
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
  ) => {
    try {
      const updateId = await new Promise((res, rej) => {
        const query =
          `UPDATE pets SET ` +
          `${
            type
              ? `type = '${type}' ${
                  name ||
                  adoptionStatus ||
                  picture ||
                  weight ||
                  height ||
                  color ||
                  bio ||
                  hypoallergenic ||
                  dietaryRestrictions ||
                  breed
                    ? ","
                    : ""
                }`
              : ""
          }` +
          `${
            name
              ? `name = '${name}' ${
                  adoptionStatus ||
                  picture ||
                  weight ||
                  height ||
                  color ||
                  bio ||
                  hypoallergenic ||
                  dietaryRestrictions ||
                  breed
                    ? ","
                    : ""
                }`
              : ""
          }` +
          `${
            adoptionStatus
              ? `adoptionStatus = '${adoptionStatus}' ${
                  picture ||
                  weight ||
                  height ||
                  color ||
                  bio ||
                  hypoallergenic ||
                  dietaryRestrictions ||
                  breed
                    ? ","
                    : ""
                }`
              : ""
          }` +
          `${
            picture
              ? `picture = '${picture}' ${
                  weight ||
                  height ||
                  color ||
                  bio ||
                  hypoallergenic ||
                  dietaryRestrictions ||
                  breed
                    ? ","
                    : ""
                }`
              : ""
          }` +
          `${
            weight
              ? `weight = ${weight} ${
                  height ||
                  color ||
                  bio ||
                  hypoallergenic ||
                  dietaryRestrictions ||
                  breed
                    ? ","
                    : ""
                }`
              : ""
          }` +
          `${
            height
              ? `height= ${height} ${
                  color || bio || hypoallergenic || dietaryRestrictions || breed
                    ? ","
                    : ""
                }`
              : ""
          }` +
          `${
            color
              ? `color= '${color}' ${
                  bio || hypoallergenic || dietaryRestrictions || breed
                    ? ","
                    : ""
                }`
              : ""
          }` +
          `${
            bio
              ? `bio= '${bio}' ${
                  hypoallergenic || dietaryRestrictions || breed ? "," : ""
                }`
              : ""
          }` +
          //need to send string
          `${
            hypoallergenic
              ? `hypoallergenic= ${hypoallergenic} ${
                  dietaryRestrictions || breed ? "," : ""
                }`
              : ""
          }` +
          `${
            dietaryRestrictions
              ? `dietaryRestrictions= '${dietaryRestrictions}' ${
                  breed ? "," : ""
                }`
              : ""
          }` +
          `${breed ? `dietaryRestrictions= '${dietaryRestrictions}'` : ""}` +
          `WHERE id = ?`;
        connection.query(query, [id], (err, result) => {
          if (err) {
            console.log(err);
            rej(new Error(err.message));
          }
          res(result);
        });
      });
      console.log("console", updateId, "console");
      return updateId;
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = petsService;
