// Import necessary modules
const cds = require('@sap/cds');
const { v4: uuidv4 } = require('uuid');


module.exports = cds.service.impl(async (srv) => {
    const { Risks } = srv.entities;
  
    srv.on('CopyEntity', async (req) => {
      const { ID } =  req.params[0];
    
      // Fetch the entity to copy
      const entityToCopy = await srv.tx(req).run(SELECT.one(Risks).where({ ID }));
 
      if (!entityToCopy) {
        req.error(404, `Entity with ID ${ID} not found`);
      }
  
      // Perform the deep copy
      const copiedEntity = { ...entityToCopy, ID: uuidv4()}; // Assuming ID is a UUID field
  
      // Save the copied entity
      await srv.tx(req).run(INSERT.into(Risks).entries(copiedEntity));
 
      // Set the navigation target to the object page with the copied entity's ID
      req.info.redirect = `../Risks/${copiedEntity.ID}`;
    });
  });