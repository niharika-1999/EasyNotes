/*
 * @file            : label.service.js
 * @author          : Niharika Rao
 * @since           : 08-12-2021
 */
const labelModel = require("../models/label.model");

class LabelService {
  createNewLabel = (title,userId) => {
     return labelModel.createLabel(title,userId);
  };

 //find all labels
  findAllLabels = (userId) => {
      return labelModel.findLabels(userId);
  };

 //find a single label
  findLabel = (findId,userId) => {
      return labelModel.findSingleLabel(findId,userId);
  };

 //Find label and update it with the request body
  updateLabel = (findId, title,userId) => {
      return labelModel.findSingleLabelAndUpdate(
        findId,
        title,
        userId
      );
  };

  //delete a label
  deleteById =(findId,userId) => {
      return labelModel.findAndRemove(findId,userId);
  };
}

module.exports = new LabelService();