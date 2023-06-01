import { ObjectId } from 'mongodb';
import BaseUser from './BaseUser.js';

export default class Admin extends BaseUser {
    constructor() {
        const rootPermissions = true;
        super(rootPermissions);
    }

    createSession(collection, title, description) {
        const newSession = {
            title,
            description,
            availablePlacements: []
        };
        return collection.insertOne(newSession);
    }

    addPlacement(collection, sessionId, row, seat) {
        const filter = {
            _id: new ObjectId(sessionId)
        };
        const updateAction = {
            $push: {
                availablePlacements: {
                    row,
                    seat,
                    _id: new ObjectId()
                }
            }
        };

        return collection.findOneAndUpdate(filter, updateAction);
    }

    updateInfo(collection, sessionId, info) {
        const filter = {
            _id: new ObjectId(sessionId)
        };
        const updateAction = {
            $set: info
        };

        return collection.findOneAndUpdate(filter, updateAction);
    }

    deletePlacement(collection, sessionId, placementId) {
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
