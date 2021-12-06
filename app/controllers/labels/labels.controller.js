const labelService = require("../../service/label.service");
const logger = require("../../../config/winstonLogger");

class LabelController { 
    create = async (req, res) => {
      let title = req.body.title;
      let userId = req.body.userId;
      try {
        const data = await labelService.createNewLabel(title,userId);
        return res.send(data);
      } catch (error) {
          logger.error(error);
          res.send(error);
      }
    };

    findAll = async (req, res) => {
        let userId = req.body.userId;
      try {
        const data = await labelService.findAllLabels(userId);
        logger.info("responded with all labels");
        return res.send(data);
      } catch (error) {
          logger.error(error);
          return res.send(error);
      }
    };

    findOne = async (req, res ) => {
      let id = req.params.labelId; 
      let userId = req.body.userId; 
      try {
        const data = await labelService.findLabel(userId, id);
        return res.send(data);
        }
       catch(error) {
          logger.error(error);
          return res.send(error);
      }
    };

    update = async (req, res) => {
      let id = req.params.labelId;
      let userId = req.body.userId;
      let title = req.body.title; 
      try {
        const data = await labelService.updateLabel(userId,id, title);
        return res.send(data);
      } catch (error) {
          logger.error(error);
          return res.send(error);
      }
    };

    deleteOne = async (req, res) => {
      let id = req.params.labelId;
      let userId = req.body.userId;
      try {
          const data = await labelService.deleteById(id)
          return res.send("Note deleted successfully.");
      } catch (error) {
          logger.error(error);
          return res.send(error);
      }
    };
  }
    
  module.exports = new LabelController();