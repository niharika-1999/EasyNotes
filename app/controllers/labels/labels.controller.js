/* 
 * @file            : label.controller.js
 * @author          : Niharika Rao
 * @version         : 1.0
 * @since           : 08-12-2021
*/
const labelService = require("../../service/label.service");
const logger = require("../../../config/winstonLogger");

class LabelController { 
    /**
   * @description request response for creating a label
   */
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
    /**
   * @description  request response for retrieving all labels from the database.
   * @param {Object} req
   * @param {Object} res
   */

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

    /**
   * @description request response for finding a single label with a labelId
   */

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

    /**
   * @description request response for updating a label identified by the labelId in the request
   * @param {Object} req
   * @param {Object} res
   */

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

    /**
   * @description  request response for deleting a label with the specified labelId in the request
   */

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