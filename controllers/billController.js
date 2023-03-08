import template from "../config/template.js"
import { Item } from "../models/index.js"

const wrapProduct = (product) => {
	return `<tr>
		<td>${product.name}</td>
		<td>${product.quantity}</td>
		<td>${product.price}</td>
		<td>${product.discount}%</td>
		<td>${product.productAmount}</td>
	</tr>
	`
}

const addCalculations = (products) => {
	let totalAmount = 0, totalDiscount = 0, totalCost = 0;
	let productCost, productAmount, productDiscount;

	products = products.map((product) => {
		productCost = product.quantity * product.price;

		productDiscount = product.discount / 100 * productCost;
		productDiscount = Math.round(productDiscount);

		productAmount = productCost - productDiscount;

		totalAmount += productAmount;
		totalDiscount += productDiscount;
		totalCost += productCost;

		return { ...product, productAmount }
	})

	return { totalAmount, totalDiscount, totalCost, modifiedProducts: products }
}

const fillTemplate = (clientName, products) => {
	let { totalAmount, totalDiscount, totalCost, modifiedProducts} = addCalculations(products);

	let tableData = "";
	modifiedProducts.forEach((modifiedProduct) => {
		tableData += wrapProduct(modifiedProduct);
	})

	let totalData = `<p>Subtotal: ${totalCost}</p>
		<p>Discount: ${totalDiscount}</p>
		<p>Total: ${totalAmount}</p>`
	
	let finalTemplate = template
		.replace("{{customerName}}", clientName)
		.replace("{{tableData}}", tableData)
		.replace("{{totals}}", totalData)

	return finalTemplate;
}

const createBill = async (req, res) => {
	const { clientName, products } = req.body

	try {
		let findItemPromises = [];
		for (const product of products) {
			findItemPromises.push(Item.findById(product._id));
		}
		const foundItems = await Promise.all(findItemPromises);
		foundItems.forEach((foundItem, index) => {
			if (!foundItem) {
				throw new Error("Product not found");
			}

			if (foundItem.quantity < products[index].quantity) {
				throw new Error("Insufficient quantity");
			}
		})

		let updateItemPromises = [];
		for (const product of products) {
			updateItemPromises.push(Item.findByIdAndUpdate(product._id, { $inc: { quantity: -product.quantity } }))
		}
		await Promise.all(updateItemPromises);

		return res.status(200).send(fillTemplate(clientName, products))
	} catch (error) {
		return res.status(400).json({ "error": error.message })
	}
}

const billController = {
	createController: createBill,
}

export default billController
