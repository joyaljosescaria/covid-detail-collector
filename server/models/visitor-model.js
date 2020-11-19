const db = require("../config/dbConfig.js");

// GET ALL visitors
const find = () => {
  return db("visitors");
};



// ADD A visitors
const addVisitor = visitors => {
  return db("visitors").insert(visitors, "id");
};

// UPDATE visitors
const updateVisitor = (id, post) => {
  return db("visitors")
    .where("id", id)
    .update(post);
};

// REMOVE visitors
const removeVisitor = id => {
  return db("visitors")
    .where("id", id)
    .del();
};

module.exports = {
  find,
  addVisitor,
  updateVisitor,
  removeVisitor
};
