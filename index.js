import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { itemRouter, billRouter } from './routes/index.js';

const mongodbURI = "mongodb+srv://pittukadost:pittuthegreat@cluster0.6755wow.mongodb.net/?retryWrites=true&w=majority";

mongoose
    .connect(mongodbURI, { useNewUrlParser: true })
    .then(() => console.log("Database Connected Successfully"))
    .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

const app = express();
app.use(cors({
	origin: "http://localhost:3000",
}));
app.use(express.json());

app.use("/api/item", itemRouter);
app.use("/api/bill", billRouter);

app.listen(8000, () => {
	console.log("server started");
});
