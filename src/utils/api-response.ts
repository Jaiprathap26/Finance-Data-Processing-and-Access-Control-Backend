export class ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: { message: string; details?: unknown };

    constructor(success: boolean, data?: T, message?: string) {
        this.success = success;
        this.data = data;
        this.message = message;
    }

    static success<T>(data: T, message?: string): ApiResponse<T> {
        return new ApiResponse(true, data, message);
    }

    static error(message: string, details?: unknown): ApiResponse<never> {
        const res = new ApiResponse<never>(false);
        res.error = { message, details };
        return res;
    }
}