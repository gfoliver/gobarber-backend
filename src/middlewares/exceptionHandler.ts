import { Request, Response, NextFunction } from "express";
import AppError from '../errors/Error'
import response from "../utils/response";

export default function handle(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
        return response({
            res,
            status: false,
            message: err.message,
            statusCode: err.statusCode
        })
    }
    else {
        return res.status(500).json({
            status: false,
            message: 'Internal server error'
        })
    }
}