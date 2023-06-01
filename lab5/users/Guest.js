import BaseUser from './BaseUser.js';

export default class Guest extends BaseUser {
    constructor() {
        super();
    }

    bookPlacement(collection, sessionId, placementId) {
        const filter = {
            _id: new ObjectId(sessionId)
        };
        const updateAction = {
            $pull: {
                availablePlacements: {
                    _id: new ObjectId(placementId)
                }
            }
        };

        return collection.findOneAndUpdate(filter, updateAction);
    }
}