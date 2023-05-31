import { randomUUID } from 'crypto';

export default class SessionPlacement {
    constructor (row, seat) {
        this.row = row;
        this.seat = seat;
        this.id = randomUUID();

        // This prevents object from mutating
        Object.freeze(this);
    }
}
