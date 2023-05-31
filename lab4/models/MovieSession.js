import { randomUUID } from 'crypto';
import SessionPlacement from './SessionPlacement.js';

export default class MovieSession {
    #availablePlacements = {};

    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.id = randomUUID();
    }

    addPlacement(row, seat) {
        const existing = this.getPlacements().find(
            (value) => value.row === row && value.seat === seat
        );

        if (existing) {
            return false;
        }

        const newPlacement = new SessionPlacement(row, seat);
        const {
            id
        } = newPlacement;
        this.#availablePlacements[id] = newPlacement;
        return true;
    }

    getPlacements() {
        return Object.values(this.#availablePlacements);
    }

    deletePlacement(id) {
        if (!this.#availablePlacements[id]) {
            return false;
        }

        delete this.#availablePlacements[id];
        return true;
    }

    bookPlacement(id) {
        return this.deletePlacement(id);
    }

    updateInfo(info) {
        const entries = Object.entries(info);

        for (const [key, value] of entries) {
            if (value) {
                this[key] = value;
            }
        }
    }
}