import BaseUser from './BaseUser.js';
import MovieSession from '../models/MovieSession.js';

export default class Admin extends BaseUser {
    constructor () {
        const rootPermissions = true;
        super(rootPermissions);
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

    deletePlacement (session, placementId) {
        session.deletePlacement(placementId);
    }
}
