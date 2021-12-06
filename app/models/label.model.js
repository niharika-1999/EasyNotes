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
  createLabel = (title,userId) => {
    const label = new Label({
      title: title,
      userId: userId
    });
    return label.save();
  };

  findLabels = (userId) => {
    return Label.find({ userId: userId }).populate({
        path: "userId",
        select: ["email"],
      });
  };


  findSingleLabel = (userId,id) => {
    return Label.findById({ userId: userId, _id: id });
  };

  findSingleLabelAndUpdate = (id, title,userId) => {
    return Label.findByIdAndUpdate({ userId: userId, _id: id }, 
        {
            title:title
        },
         {new: true}
        )
  };

  findAndRemove = (id,userId) => {
    return Label.findOneAndRemove({userId: userId, _id: id});
  };
}

module.exports = new LabelModel();