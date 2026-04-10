/**
 * Generic API Response wrapper class for consistent frontend-backend communication
 */
export class ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  statusCode: number;

  private constructor(success: boolean, message: string, statusCode: number, data?: T) {
    this.success = success;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }

  static success<T>(data: T, message: string = 'Operation successful', statusCode: number = 200) {
    return new ApiResponse<T>(true, message, statusCode, data);
  }

  static created<T>(data: T, message: string = 'Resource created successfully') {
    return new ApiResponse<T>(true, message, 201, data);
  }

  static error(message: string = 'Operation failed', statusCode: number = 400) {
    return new ApiResponse<null>(false, message, statusCode);
  }

  // Helper method to convert to standard JSON Response for Next.js API Routes
  toResponse() {
    return Response.json(this, { status: this.statusCode });
  }
}
