const { query } = require("../lib/db");
const { v4: uuidv4 } = require("uuid");
const instance = null;
class petsService {
  static getPetsServiceInstance() {
    console.log("petsService instance", instance);
    return instance ? instance : new petsService();
  }
  getPetsByCriteria = async (
    adoptionStatus,
    type,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    name
  ) => {
    try {
      console.log(
        "props",
        adoptionStatus,
        type,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
        name
      );

      const sql = `SELECT * FROM pets ${
        adoptionStatus ||
        type ||
        minHeight ||
        maxHeight ||
        minWeight ||
        maxWeight ||
        name
          ? `WHERE`
          : ""
      } 
          ${
            adoptionStatus
              ? `adoptionStatus = '${adoptionStatus}' 
            ${
              type || minHeight || maxHeight || minWeight || maxWeight || name
                ? "AND"
                : ""
            }`
              : ``
          }
          ${
            type
              ? `type = '${type}' ${
                  minHeight || maxHeight || minWeight || maxWeight || name
                    ? "AND"
                    : ""
                }`
              : ""
          }
          ${
            name
              ? `name = '${name}' ${
                  (minHeight, maxHeight, minWeight, maxWeight ? "AND" : "")
                }`
              : ""
          }
          ${
            minHeight
              ? `height >= ${minHeight}
                 ${maxHeight || minWeight || maxWeight ? "AND" : ""}`
              : ``
          }
          ${
            maxHeight
              ? `$height <= ${maxHeight}
                 ${minWeight || maxWeight ? "AND" : ""}`
              : ""
          }
          ${
            minWeight
              ? `weight >= ${minWeight}
                 ${maxWeight ? "AND" : ""}`
              : ""
          }
          ${maxWeight ? `weight <= ${maxWeight}` : ""}
          `;
      console.log("query", sql);
      const pets = await query(sql);
      return pets;
    } catch (err) {
      console.log(err);
    }
  };

  getPetById = async (id) => {
    try {
      const sql = `SELECT * FROM pets WHERE id = '${id}'`;
      const pet = await query(sql);
      return pet;
    } catch (err) {
      console.log(err);
    }
  };

  getPetsByUserId = async (userId) => {
    try {
      const sql = `SELECT * FROM pets WHERE owner = '${userId}'`;
      const pets = await query(sql);
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
      let checkAllergenic = hypoallergenic;
      if (!checkAllergenic) {
        checkAllergenic = 0;
      }
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
        checkAllergenic,
        dietaryRestrictions,
        breed,
      ]);
      return pet;
    } catch (err) {
      console.log(err);
    }
  };

  adoptPet = async (id, userId, adoptionType) => {
    try {
      const sql = `UPDATE pets SET owner = ? , adoptionStatus = ? WHERE id = ?`;
      const adoptedPet = await query(sql, [userId, adoptionType, id]);
      console.log("adopted pet", adoptedPet);
      return adoptedPet;
    } catch (err) {
      console.log(err);
    }
  };

  getSavedPets = async (userId) => {
    try {
      const sql = `SELECT * FROM saved , pets WHERE saved.petId = pets.id;`;
      // const sql = "SELECT * FROM saved WHERE userId = ?";
      const savedPet = await query(sql, [userId]);
      return savedPet;
    } catch (err) {
      console.log(err);
    }
  };

  savePet = async (id, userId) => {
    //need to make transaction to check if not already saved
    try {
      const sql = "INSERT INTO saved(petId,userId) VALUES (?,?)";
      const savedPet = await query(sql, [id, userId]);
      return savedPet;
    } catch (err) {
      console.log(err);
    }
  };

  unsavePet = async (id) => {
    //need to make transaction to check if saved
    try {
      const sql = "DELETE FROM saved WHERE petId = ?";
      const unsavedPet = await query(sql, [id]);
      return unsavedPet;
    } catch (err) {
      console.log(err);
    }
  };

  returnPet = async (id) => {
    try {
      console.log("ID", id);
      const sql = `UPDATE pets SET owner = NULL , adoptionStatus = NULL WHERE id = ?`;
      const returnedPet = await query(sql, [id]);
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
      // const updateId = await new Promise((res, rej) => {
      const sql =
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
                bio || hypoallergenic || dietaryRestrictions || breed ? "," : ""
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
      const updateId = await query(sql, [id]);
      return updateId;
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = petsService;
