import express from 'express';
import { createTest, deleteTest, getTest, listTest, updateTest } from '../controllers/testController.js';
const testRouter = express.Router();

testRouter.get("/list", listTest);
testRouter.get("/search", getTest);
testRouter.post("/add", createTest);
testRouter.delete("/delete", deleteTest)
testRouter.patch("/test/update", updateTest)

export default testRouter;