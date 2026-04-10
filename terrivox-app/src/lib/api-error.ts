/**
 * Custom Error Class for API Error Control mapping
 */
export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    // Restore prototype chain for TypeScript specific Error classes
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

// Utility class for handling known and unexpected errors safely across API routes
export class ErrorHandler {
  static handle(error: any) {
    if (error instanceof ApiError) {
        return Response.json(
            { success: false, message: error.message, statusCode: error.statusCode }, 
            { status: error.statusCode }
        );
    }
    
    // Fallback unhandled backend exception
    console.error('Unexpected Backend Exception:', error);
    
    return Response.json(
        { success: false, message: 'Internal Server Error. Please contact admin.', statusCode: 500 },
        { status: 500 }
    );
  }
}
