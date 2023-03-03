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

const app = express(cors());
app.use(express.json());

app.use("/api/item", itemRouter);
app.use("/api/bill", billRouter);

app.get("/", (req, res) => {
	res.send("hello world");
});

app.listen(3000, () => {
	console.log("server started");
});
