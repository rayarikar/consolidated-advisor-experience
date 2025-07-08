import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

export class ResponseHandler {
  static success<T>(res: Response, data: T, statusCode: number = 200): Response {
    const response: ApiResponse<T> = {
      success: true,
      data,
      timestamp: new Date().toISOString()
    };
    
    return res.status(statusCode).json(response);
  }

  static error(
    res: Response,
    code: string,
    message: string,
    statusCode: number = 500,
    details?: any
  ): Response {
    const response: ApiResponse = {
      success: false,
      error: {
        code,
        message,
        details
      },
      timestamp: new Date().toISOString()
    };
    
    return res.status(statusCode).json(response);
  }

  static notFound(res: Response, message: string = 'Resource not found'): Response {
    return this.error(res, 'NOT_FOUND', message, 404);
  }

  static badRequest(res: Response, message: string = 'Bad request', details?: any): Response {
    return this.error(res, 'BAD_REQUEST', message, 400, details);
  }

  static internalError(res: Response, message: string = 'Internal server error'): Response {
    return this.error(res, 'INTERNAL_ERROR', message, 500);
  }
}