export function badRequestError(){
    return{
        type: "BadRequestError",
        message: "Bad request, try again later"
    }
}

export function invalidDataError(details: string) {
    return {
        type: 'InvalidDataError',
        message: `Invalid data: ${details}`,
    };
}

export function notFoundError(details: string) {
    return {
        type: 'NotFoundError',
        message: `${details} not found`
    }
}

export function conflictError() {
    return {
        type: 'ConflictError',
        message: `Conflict, you cannot do this`
    }
}