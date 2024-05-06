/*
* Title: Routes
* Description: Application Routes
* Author: Ashis Kumar Paul
* Date: 06/05/2024
*/

// dependencies
const { sampleHandler } = require("../handlers/routesHandlers/sampleHandler");

const routes = {
    'sample': sampleHandler,
    
}

module.exports = routes;