/*
 * @file            : label.routes.js
 * @author          : Niharika Rao
 * @since           : 08-12-2021
 */
const express = require("express");
const labelRouter = express.Router(); 
const labels = require("../controllers/labels/labels.controller");
const {labelValidate,ensureTokenLabel}=require("../middleware/label.middleware");

//create a new label
labelRouter.post("/", labelValidate, ensureTokenLabel, labels.create);

//Find all labels
labelRouter.get("/", ensureTokenLabel, labels.findAll);

//Find a single label with labelId
labelRouter.get("/:labelId", ensureTokenLabel,  labels.findOne);

//Update a label with labelId
labelRouter.put("/:labelId", labelValidate, ensureTokenLabel, labels.update);


//Delete a label with labelId
labelRouter.delete("/:labelId", ensureTokenLabel, labels.deleteOne);

module.exports = labelRouter; 