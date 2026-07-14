export type ResponseType<T = undefined> = {
    success: boolean;
    message: string;
    status?: number;
    data: T;
};
    