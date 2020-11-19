const router = require("express").Router();

const usersDB = require("../models/visitor-model.js");

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const visitors = await usersDB.find();
    // console.log(Date(visitors[0].created_at).toLocaleDateString());  
    // var now = new Date(visitors[0].created_at);
    // var date = now.toLocaleDateString();
    // var time = now.toLocaleTimeString();
    // console.log(date + ' ' + time)

    res.status(200).json(visitors);
  } catch (err) { 
    res.status(500).json({ err: err });   
  } 
}); 


// INSERT USER INTO DB
router.post("/", async (req, res) => { 
  const newUser = req.body;
  if (!newUser.name || !newUser.place || !newUser.phno) {
    res.status(404).json({ err: "Please provide the name / place / phonenumber" });
  } else {
    try {
      const user = await usersDB.addVisitor(newUser);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ err: "Error in adding user" });
    }
  }
});

router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const newChanges = req.body;
  if (!newChanges.name || !newChanges.place || !newChanges.phno) {
    res.status(404).json({ err: "You are missing information" });
  } else { 
    try {
      const addChanges = await usersDB.updateVisitor(userId, newChanges);
      res.status(200).json(addChanges);
    } catch (err) {
      res.status(500).json({ err: "Error in updating user" });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  
  try {
    const deleting = await usersDB.removeVisitor(userId);
    res.status(200).send({ del : "deleted"});   
  } catch (err) { 
    res.status(500).json({ err: "Error in deleting user" });
  } 
}); 
 
module.exports = router;  
 