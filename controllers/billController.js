import easyinvoice from "easyinvoice"

const createBill = async (req, res) => {
	const { client, information, products } = req.body

	var data = {
			"images": {
					"logo": "https://public.easyinvoice.cloud/img/logo_en_original.png",
			},
			"sender": {
					"company": "Sample Corp",
					"address": "Sample Street 123",
					"zip": "1234 AB",
					"city": "Sampletown",
					"country": "Samplecountry",
			},
			"settings": {
					"currency": "INR", 
			},
			"bottom-notice": "We hope you enjoyed doing business with us. For questions about this invoice, contact 7061508120",

			"client": client,
			"information": information,
			"products": products,
	};

	try {
		const result = await easyinvoice.createInvoice(data)
		return res.status(200).send(result.pdf)
	} catch (error) {
		return res.status(500).send(error)
	}
}

const billController = {
	createController: createBill,
}

export default billController
