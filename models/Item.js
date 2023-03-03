import mongoose from "mongoose"

const ItemSchema = new mongoose.Schema({
	name: String,
	price: Number,
	quantity: Number,
})

export default mongoose.model("Item", ItemSchema)
