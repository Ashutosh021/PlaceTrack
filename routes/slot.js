const express = require("express");
const slotRouter = express.Router();
const {
  slotForm,
  createSlot,
  editSlotForm,
  updateSlot,
  validateForm,
  validate,
} = require("../controller/slot");
const upload = require("../middleware/upload");
const isLoggedIn = require("../middleware/isLoggedIn");


slotRouter
  .get("/create", isLoggedIn, slotForm)
  .post("/create", isLoggedIn, createSlot);

slotRouter.post("/update/:Id", isLoggedIn, updateSlot);

slotRouter.get("/edit/:Id", isLoggedIn, editSlotForm);

slotRouter
  .get("/validate/:Id", isLoggedIn, validateForm)
  .post("/validate/:Id", isLoggedIn, upload.single("locationPic"), validate);


module.exports = slotRouter;
