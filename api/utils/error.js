// Error Handling for StatusCode like password length is too long
export const errorHandler = (statusCode, message)=>{
    const error = new Error()
    error.statusCode = statusCode
    error.message = message
    return error;
}