import mongoose from "mongoose";
import { ApiError } from "./ApiError.js";
const TransactionHandler=(requestHandler)=>{
    return async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      await requestHandler(req, res, next, session);

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      next(error instanceof ApiError ? error : new ApiError(500, error.message));
    } finally {
      session.endSession();
    }
  };
};
export {TransactionHandler}