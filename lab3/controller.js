import Admin from './users/Admin.js';
import Guest from './users/Guest.js';

const movieSessions = [];

const guest = new Guest();
const admin = new Admin();

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

    res.send({
        error: false,
        status: 'ok'
    });
};

export const addPlacement = (req, res) => {
    const {sessionId, row, seat} = req.body;

    const session = movieSessions.find(({id}) => id === sessionId);
    if (!session) {
        res.status(404);
        res.send({
            error: true,
            message: 'No session with mentioned id was found'
        });
        return;
    }

    const added = admin.addPlacement(session, row, seat);
    res.send({ added });
};

export const getSessions = (req, res) => {
    const output = JSON.stringify(movieSessions);
    res.send(output);
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

    const booked = guest.bookPlacement(session, placementId);
    res.send({ booked });
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
