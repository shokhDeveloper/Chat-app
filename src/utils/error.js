export class ServerError extends Error {
    constructor(message){
        super(message)
            this.message = message;
            this.status = 500
    }
}

export class ClientError extends Error {
    constructor(message, status){
        super(message, status)
        this.message = message
        this.status = status
    }
}

export const globalError = (res, error) => {
    return res.status(error.status || 500).json({message: error.message, status: error.status || 500});
}