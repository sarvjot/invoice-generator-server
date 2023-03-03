import { Item } from '../models/index.js'

const createItem = async (req, res) => {
	const { name, price, quantity } = req.body

	try {
		const item = await Item.create({ name, price, quantity })
		return res.status(201).json({item})
	} catch (error) {
		return res.status(500).json({error: 'Error creating item'})
	}
}

const listItems = async (req, res) => {
	try {
		const items = await Item.find()
		return res.status(200).json({items})
	} catch (error) {
		return res.status(500).json({error: 'Error fetching items'})
	}
}

const editItem = async (req, res) => {
	const { id } = req.params
	const { name, price, quantity } = req.body

	try {
		const updatedItem = await Item.findByIdAndUpdate(id, { name, price, quantity }, { new: true })
		return res.status(200).json({updatedItem})
	} catch (error) {
		return res.status(500).json({error: 'Error updating item'})
	}
}

const deleteItem = async (req, res) => {
	const { id } = req.params

	try {
		const deletedItem = await Item.findByIdAndDelete(id)
		return res.status(200).json({deletedItem})
	} catch (error) {
		return res.status(500).json({error: 'Error deleting item'})
	}
}

const itemController = {
	createController: createItem,
	listController: listItems,
	editController: editItem,
	deleteController: deleteItem,
}

export default itemController
