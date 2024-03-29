import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import { itemRouter, billRouter } from './routes/index.js';

dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI, { 
		useNewUrlParser: true,  
		useUnifiedTopology: true,
	    })
    .then(() => console.log("Database Connected Successfully"))
    .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

const app = express();
app.use(cors({
	origin: process.env.CLIENT_URL,
}));
app.use(express.json());

app.use("/api/item", itemRouter);
app.use("/api/bill", billRouter);

app.listen(8000, () => {
	console.log("server started");
});
