/*
 * @file            : label.model.js
 * @author          : Niharika Rao
 * @since           : 08-12-2021
 */
const mongoose = require("mongoose");

/**
 * @description Create schema for label collection
 */
const LabelSchema = mongoose.Schema(
  {
    title: {type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Label = mongoose.model("Label", LabelSchema);

class LabelModel {
    /**
   * @description Query to create a label
   * @param {String} title
   * @param {String} userId
   */
  createLabel = (title,userId) => {
    const label = new Label({
      title: title,
      userId: userId
    });
    return label.save();
  };

  /**
   * @description Query to find all labels
   * @param {String} userId
   * @returns data
   */

  findLabels = (userId) => {
    return Label.find({ userId: userId }).populate({
        path: "userId",
        select: ["email"],
      });
  };
  /**
   * @description Query to find one specific note
   * @param {String} id
   * @param {String} userId
   */
  findSingleLabel = (userId,id) => {
    return Label.findById({ userId: userId, _id: id });
  };

/**
   * @description Query to find and update note
   * @param {String} id
   * @param {String} title
   * @param {String} userId
   */
  findSingleLabelAndUpdate = (id, title,userId) => {
    return Label.findByIdAndUpdate({ userId: userId, _id: id }, 
        {
            title:title
        },
         {new: true}
        )
  };
   /**
   * @description Query to find and remove a label
   * @param {String} id
   * @param {String} userId
   */
  findAndRemove = (id,userId) => {
    return Label.findOneAndRemove({userId: userId, _id: id});
  };
}

module.exports = new LabelModel();