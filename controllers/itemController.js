import { Item } from '../models/index.js'

const createItem = async (req, res) => {
	const { name, price, quantity } = req.body

	try {
		const oldItem = await Item.findOne({"name": name}) 
		if(oldItem) throw new Error('Item already exists')

		const item = await Item.create({ name, price, quantity })
		return res.status(201).json({item})
	} catch (error) {
		console.log(error)
		return res.status(400).json({ "error": error.message })
	}
}

const listItems = async (req, res) => {
	try {
		const items = await Item.find()
		return res.status(200).json({items})
	} catch (error) {
		return res.status(400).json({ "error": error.message })
	}
}

const editItem = async (req, res) => {
	const { id } = req.params
	const { name, price, quantity } = req.body

	try {
		if (quantity < 0) throw new Error('Quantity cannot be negative')

		const updatedItem = await Item.findByIdAndUpdate(id, { name, price, quantity }, { new: true })
		if (!updatedItem) throw new Error('Item not found')

		return res.status(200).json({updatedItem})
	} catch (error) {
		return res.status(400).json({ "error": error.message })
	}
}

const deleteItem = async (req, res) => {
	const { id } = req.params

	try {
		const deletedItem = await Item.findByIdAndDelete(id)
		if (!deletedItem) throw new Error('Item not found')

		return res.status(200).json({deletedItem})
	} catch (error) {
		return res.status(400).json({ "error": error.message })
	}
}

const itemController = {
	createController: createItem,
	listController: listItems,
	editController: editItem,
	deleteController: deleteItem,
}

export default itemController
