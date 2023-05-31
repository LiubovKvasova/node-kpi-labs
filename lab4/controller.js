import Admin from './users/Admin.js';
import Guest from './users/Guest.js';

const movieSessions = [];

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
    const viewData = { currentPage, movieSessions };

    res.render(currentPage, viewData);
};

export const adminPage = (req, res) => {
    const currentPage = 'admin';
    const viewData = { currentPage, movieSessions };

    res.render(currentPage, viewData);
};

export const bookTicketPage = (req, res) => {
    const currentPage = 'book-tickets';
    const viewData = { currentPage };

    const {sessionId} = req.query;

    const session = movieSessions.find(({id}) => id === sessionId);
    viewData.session = session;

    if (session) {
        viewData.placements = session.getPlacements();
    }

    res.render(currentPage, viewData);
}

// REST API endpoints

export const addSession = (req, res) => {
    const {title, description} = req.body;
    const session = admin.createSession(title, description);
    movieSessions.push(session);

    res.status(201);
    res.send({
        error: false,
        status: 'ok'
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

    const session = movieSessions.find(({id}) => id === sessionId);
    if (!session) {
        res.status(404);
        res.send({
            error: true,
            message: 'No session with mentioned id was found'
        });
        return;
    }

    const added = admin.addPlacement(session, parseInt(row), parseInt(seat));
    res.status(201);
    res.send({ added });
};

export const getSessions = (req, res) => {
    // Pagination part
    const {page, itemsPerPage, title, description} = req.query;
    let results = [];

    let matchedSessions = movieSessions;

    if (title) {
        matchedSessions = matchedSessions
            .filter((session) => session.title === title);
    }

    if (description) {
        matchedSessions = matchedSessions
            .filter((session) => session.description === description);
    }

    if (page && itemsPerPage) {
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

        const lastIndex = pageNumber * itemsPerPageNumber;
        const firstIndex = lastIndex - itemsPerPageNumber;

        for (let i = firstIndex; i < lastIndex; i++) {
            const movie = matchedSessions[i];

            if (movie) {
                results.push(movie);
            }
        }

        if (results.length === 0 && matchedSessions.length !== 0) {
            res.status(400);
            res.send({
                error: true,
                message: 'Parameters are out of bounds'
            });
            return;
        }
    } else {
        results = matchedSessions;
    }

    res.send(results);
};

export const getOneSession = (req, res) => {
    const {id} = req.params;
    const session = movieSessions.find((session) => session.id === id);

    if (!session) {
        res.status(404);
        res.send({
            error: true,
            message: 'No session with mentioned id was found'
        });
        return;
    }

    res.send(session);
};

export const getPlacements = (req, res) => {
    const {sessionId} = req.query;

    const session = movieSessions.find(({id}) => id === sessionId);
    if (!session) {
        res.status(404);
        res.send({
            error: true,
            message: 'No session with mentioned id was found'
        });
        return;
    }

    const placements = session.getPlacements();
    res.send({ session, placements });
};

export const bookPlacement = (req, res) => {
    const {sessionId, placementId} = req.body;

    const session = movieSessions.find(({id}) => id === sessionId);
    if (!session) {
        res.status(404);
        res.send({
            error: true,
            message: 'No session with mentioned id was found'
        });
        return;
    }

    const removed = guest.bookPlacement(session, placementId);
    res.send({ removed });
};

export const updateSession = (req, res) => {
    const {sessionId, title, description} = req.body;

    const session = movieSessions.find(({id}) => id === sessionId);
    if (!session) {
        res.status(404);
        res.send({
            error: true,
            message: 'No session with mentioned id was found'
        });
        return;
    }

    admin.updateInfo(session, {title, description});
    res.send({
        error: false,
        status: 'ok'
    });
};

export const deleteSession = (req, res) => {
    const { sessionId } = req.body;

    const session = movieSessions.find(({id}) => id === sessionId);
    if (!session) {
        res.status(404);
        res.send({
            error: true,
            message: 'No session with mentioned id was found'
        });
        return;
    }

    const sessionIndex = movieSessions.indexOf(session);
    movieSessions.splice(sessionIndex, 1);

    res.send({
        error: false,
        status: 'ok'
    });
};

export const deletePlacement = (req, res) => {
    const {sessionId, placementId} = req.body;

    const session = movieSessions.find(({id}) => id === sessionId);
    if (!session) {
        res.status(404);
        res.send({
            error: true,
            message: 'No session with mentioned id was found'
        });
        return;
    }

    const removed = admin.deletePlacement(session, placementId);
    res.send({ removed });
};
