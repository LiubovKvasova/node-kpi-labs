import Admin from './users/Admin.js';
import Guest from './users/Guest.js';
import databaseClient from './databaseClient.js';
import { ObjectId } from 'mongodb';

const database = databaseClient.db("movieDatabase");
const movieSessions = database.collection("sessions");

const guest = new Guest();
const admin = new Admin();

// Validation functions

const isInteger = (string) => /^[0-9]+$/.test(string);

// Page loader endpoints

export const mainPage = (req, res) => {
    const currentPage = 'main';
    const viewData = { currentPage };

    res.render(currentPage, viewData);
};

export const guestPage = (req, res) => {
    const currentPage = 'guest';
    movieSessions.find({}).toArray().then((result) => {
        const viewData = { currentPage, movieSessions: result };
        res.render(currentPage, viewData);
    });
};

export const adminPage = (req, res) => {
    const currentPage = 'admin';
    movieSessions.find({}).toArray().then((result) => {
        const viewData = { currentPage, movieSessions: result };
        res.render(currentPage, viewData);
    });
};

export const bookTicketPage = (req, res) => {
    const currentPage = 'book-tickets';
    const viewData = { currentPage };

    const {sessionId} = req.query;
    const session = movieSessions.findOne({_id: new ObjectId(sessionId)});

    session.then((result) => {
        console.log(result);
        viewData.session = result;

        if (result) {
            viewData.placements = result.availablePlacements;
        }

        res.render(currentPage, viewData);
    });
}

// REST API endpoints

export const addSession = (req, res) => {
    const {title, description} = req.body;
    const session = admin.createSession(movieSessions, title, description);

    session.then(() => {
      res.status(201);
      res.send({
          error: false,
          status: 'ok'
      });
    });
};

export const addPlacement = (req, res) => {
    const {sessionId, row, seat} = req.body;

    if (!isInteger(row) || !isInteger(seat)) {
        res.status(400);
        res.send({
            error: true,
            message: 'Row and seat should be integer numbers'
        });
        return;
    }

    admin.addPlacement(movieSessions, sessionId, parseInt(row), parseInt(seat)).then((result) => {
        console.log(result);
        if (result.lastErrorObject.n === 0) {
            res.status(404);
            res.send({
                error: true,
                message: 'No session with mentioned id was found'
            });
            return;
        }

        res.status(201);
        res.send({ added: result.lastErrorObject.updatedExisting });
    });
};

export const getSessions = (req, res) => {
    const {page, itemsPerPage, title, description} = req.query;
    const filter = {};

    if (title) {
        filter.title = title;
    }

    if (description) {
        filter.description = description;
    }

    if (Object.keys(filter).length > 0) {
        movieSessions.find(filter).toArray().then((result) => {
            res.send(result);
        });
    } else if (page && itemsPerPage) {
        if (!isInteger(page) || !isInteger(itemsPerPage)) {
            res.status(400);
            res.send({
                error: true,
                message: 'Page and itemsPerPage should be integer numbers'
            });
            return;
        }

        const pageNumber = parseInt(page);
        const itemsPerPageNumber = parseInt(itemsPerPage);

        movieSessions.find({})
            .skip((pageNumber - 1) * itemsPerPageNumber)
            .limit(itemsPerPageNumber)
            .toArray()
            .then((result) => {
                movieSessions.countDocuments({}).then((documentAmount) => {
                    if (result.length === 0 && documentAmount !== 0) {
                        res.status(400);
                        res.send({
                            error: true,
                            message: 'Parameters are out of bounds'
                        });
                        return;
                    }

                    res.send(result);
                })
            });
    } else {
        movieSessions.find({}).toArray().then((result) => {
            res.send(result);
        });
    }
};

export const getOneSession = (req, res) => {
    const {id} = req.params;
    const session = movieSessions.findOne({_id: new ObjectId(id)});

    session.then((result) => {
        if (!result) {
            res.status(404);
            res.send({
                error: true,
                message: 'No session with mentioned id was found'
            });
            return;
        }

        res.send(result);
    });
};

export const getPlacements = (req, res) => {
    const {sessionId} = req.query;
    const session = movieSessions.findOne({_id: new ObjectId(sessionId)});

    session.then((result) => {
        if (!result) {
            res.status(404);
            res.send({
                error: true,
                message: 'No session with mentioned id was found'
            });
            return;
        }

        const {availablePlacements, ...sessionInfo} = result;
        res.send({ session: sessionInfo, placements: availablePlacements });
    });
};

export const bookPlacement = (req, res) => {
    const {sessionId, placementId} = req.body;

    const removed = admin.deletePlacement(movieSessions, sessionId, placementId).then((result) => {
        if (result.lastErrorObject.n === 0) {
            res.status(404);
            res.send({
                error: true,
                message: 'No session with mentioned id was found'
            });
            return;
        }

        res.send({ removed: result.lastErrorObject.updatedExisting });
    });
};

export const updateSession = (req, res) => {
    const {sessionId, title, description} = req.body;

    admin.updateInfo(movieSessions, sessionId, {title, description}).then((result) => {
        if (result.lastErrorObject.n === 0) {
            res.status(404);
            res.send({
                error: true,
                message: 'No session with mentioned id was found'
            });
            return;
        }

        res.send({
            error: false,
            status: 'ok'
        });
    });
};

export const deleteSession = (req, res) => {
    const { sessionId } = req.body;

    const session = movieSessions.deleteOne({_id: new ObjectId(sessionId)});
    session.then((result) => {
        if (result.deletedCount === 0) {
            res.status(404);
            res.send({
                error: true,
                message: 'No session with mentioned id was found'
            });
            return;
        }

        res.send({
            error: false,
            status: 'ok'
        });
    });    
};

export const deletePlacement = (req, res) => {
    const {sessionId, placementId} = req.body;

    const removed = admin.deletePlacement(movieSessions, sessionId, placementId).then((result) => {
        if (result.lastErrorObject.n === 0) {
            res.status(404);
            res.send({
                error: true,
                message: 'No session with mentioned id was found'
            });
            return;
        }

        res.send({ removed: result.lastErrorObject.updatedExisting });
    });
};
