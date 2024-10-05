// Define custom error class
export class CustomError extends Error {
    customMsg: string;
    customStatus: number;

    constructor(customMsg: string, customStatus?: number) {
        super('It is from CustomError');
        this.name = this.constructor.name;
        this.customMsg = customMsg;
        this.customStatus = customStatus || 500;
    }
}