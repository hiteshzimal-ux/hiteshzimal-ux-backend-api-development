const express = require("express");
const router = express.Router();

const validateUser =
require("../middleware/validation");

let users = [
  {
    id: 1,
    name: "Hitesh",
    email: "hitesh@gmail.com"
  }
];

// GET ALL USERS

router.get("/", (req, res) => {

  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// GET USER BY ID

router.get("/:id", (req, res) => {

  const user = users.find(
    user => user.id === Number(req.params.id)
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Not Found"
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// CREATE USER

router.post(
  "/",
  validateUser,
  (req, res) => {

    const { name, email } = req.body;

    const emailExists =
      users.find(
        user => user.email === email
      );

    if (emailExists) {

      return res.status(400).json({
        success: false,
        message: "Email Already Exists"
      });
    }

    const newUser = {
      id: users.length + 1,
      name,
      email
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      message: "User Created",
      data: newUser
    });
  }
);

// UPDATE USER

router.put("/:id", (req, res) => {

  const user =
    users.find(
      user =>
      user.id === Number(req.params.id)
    );

  if (!user) {

    return res.status(404).json({
      success: false,
      message: "User Not Found"
    });
  }

  user.name =
    req.body.name || user.name;

  user.email =
    req.body.email || user.email;

  res.status(200).json({
    success: true,
    message: "User Updated",
    data: user
  });
});

// DELETE USER

router.delete("/:id", (req, res) => {

  const index =
    users.findIndex(
      user =>
      user.id === Number(req.params.id)
    );

  if (index === -1) {

    return res.status(404).json({
      success: false,
      message: "User Not Found"
    });
  }

  users.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "User Deleted"
  });
});

module.exports = router;