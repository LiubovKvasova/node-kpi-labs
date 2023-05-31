import BaseUser from './BaseUser.js';

export default class Guest extends BaseUser {
    constructor () {
        super();
    }

    bookPlacement (session, placementId) {
        return session.bookPlacement(placementId);
    }
}
