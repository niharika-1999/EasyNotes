/**
 * @file            : note.controller.js
 * @author          : Niharika Rao
 * @since           : 15-10-2021
 */

const noteService = require('../../service/note.service');
const dtoObj = require("./note.responseSchema");
let responseObject;
const logger = require("../../../config/winstonLogger");
const { application } = require('express');

class noteOperations {
     /**
   * @description handles request response for creating a Note and saves it
   * @param {Object} req
   * @param {Object} res
   * @param {Object} responseObject
   */
    create = (req, res) => {
        let body = req.body;
        let filename= (req.file===undefined)?(undefined):(req.file.filename);
        noteService.createANewNote(body, filename, (err, data) => {
            if (err) {
                responseObject = dtoObj.noteApiFailure;
                responseObject.message = err.message;
                res.send(responseObject);
            }
            responseObject = dtoObj.noteApiSuccess;
            responseObject.message = data;
            res.send(responseObject);
        });
    };
     /**
   * @description Retrieve and return all notes from the database.
   * @param {Object} req
   * @param {Object} res
   * @param {Object} responseObject
   */
    findNotes = (req, res) => {
        noteService.findAllNotes(req.body.userId).then(notes => {
            res.send(notes);
        }).catch(err => {
            logger.error(err.message)
            responseObject = dtoObj.noteApiFailure;
            responseObject.message = err.message;
            res.send(responseObject);
        });
    };

     /**
   * @description handles request response for finding a single note with a noteId
   * @param {Object} req
   * @param {Object} res
   * @param {Object} responseObject
   */
    findOne = (req, res) => {
        let id = req.params.noteId;
        noteService.findOnlyOneNote(id, (err, data) => {
            if (err) {
                if (err.kind === "ObjectId") {
                    logger.error(err.message);
                    responseObject = dtoObj.noteApiFindFailure;
                    responseObject.message = err.message;
                    res.send(responseObject);
                }
                logger.error(err.message);
                responseObject = dtoObj.noteApiFailure;
                responseObject.message = err.message;
                res.send(responseObject);
            }
            if (!data) {
                responseObject = dtoObj.noteApiFindFailure;
                res.send(responseObject);
            }
            responseObject = dtoObj.noteApiSuccess;
            responseObject.message = data;
            res.send(responseObject);
        });
    };
     /**
   * @description Update a note identified by the noteId in the request
   * @param {Object} req
   * @param {Object} res
   */
    update = (req, res) => {
        let id = req.params.noteId;
        let body = req.body;
        let trash=req.body.isTrash;
        let color=req.body.color;
        let filename= (req.file===undefined)?(undefined):(req.file.filename);
        noteService.updateANote( req.params.userId, id, body,trash,color,filename).then(note => {
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                logger.error(err.message);
                responseObject = dtoObj.noteApiFindFailure;
                responseObject.message = err.message;
                res.send(responseObject);
            }
            logger.error(err.message);
            responseObject = dtoObj.noteApiFailure;
            responseObject.message = err.message;
            res.send(responseObject);
        });
    }
     /**
   * @description Delete a note with the specified noteId in the request
   * @param {Object} req
   * @param {Object} res
   * @param {Object} responseObject
   */
    delete = (req, res) => {
        let id = req.params.noteId;
        let userId = req.params.userId;
        noteService.deleteANote(userId, id).then(note => {
            res.send({message: "Note deleted "});
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                logger.error(err.message);
                responseObject = dtoObj.noteApiFailure;
                responseObject.message = err.message;
                res.send(responseObject);
            }
            logger.error(err.message);
            responseObject = dtoObj.noteApiFailure;
            responseObject.message = err.message;
            res.send(responseObject);
        });
    };
}
module.exports = new noteOperations();