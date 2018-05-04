import { Injectable } from '@angular/core';

@Injectable()
export class DebuggerService {
    state: boolean;

    constructor(state: boolean) {
        this.state = state;
    }

    log(message: string) {
        message = `[${Date.now().toLocaleString}] - ${message}`;
    }

    write(message: string) {
        if (this.state) {
            console.log(message);
        }
    }

    writeError(message: string) {
        if (this.state) {
            console.error(message);
        }
    }
}
