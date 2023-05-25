import BaseUser from './BaseUser.js';
import MovieSession from '../models/MovieSession.js';

export default class Admin extends BaseUser {
    constructor () {
        super();
    }

    createSession (title, description) {
        return new MovieSession(title, description);
    }

    addPlacement (session, row, seat) {
        return session.addPlacement(row, seat);
    }

    updateInfo (session, info) {
        session.updateInfo(info);
    }
}
