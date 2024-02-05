// Import necessary modules
const cds = require('@sap/cds');

// Define the service handler function
module.exports = cds.service.impl(async (srv) => {

    // Function to handle the CopyProduct action
    srv.on('CopyProduct', async (req) => {
   
        const { from } = req.params;

        // Copy the product data
        const newProduct = {
            name: from.name + ' (Copy)', // Append '(Copy)' to the name
            description: from.description, // Copy the description
            price: from.price // Copy the price
            // You can copy other fields as needed
        };

        // Create the new product in the database
        const result = await srv.transaction(req).create('Risks', newProduct);

        // Return the newly created product
        return result;
    });

});