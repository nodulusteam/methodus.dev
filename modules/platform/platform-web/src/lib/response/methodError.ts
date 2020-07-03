
export class MethodError extends Error {
    public error: string;
    public statusCode: number;
    constructor(error: string, statusCode?: number) {
        let message = error;
        if (typeof error === 'object') {
            message = (error as Error).message;
        }
        super(message);
        this.error = error;
        this.statusCode = statusCode || 500;
    }
}
