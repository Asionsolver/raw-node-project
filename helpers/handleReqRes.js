/*
* Title: Handle Request Response
* Description: Handle Request Response
* Author: Ashis Kumar Paul
* Date: 06/05/2024
*/

// Dependencies
const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("../Routes/routes");
const { notFoundHandler } = require("../handlers/routesHandlers/notFoundHandler");


// Module Scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
    // Request Handle

    // get the URL and parse it
    const parsedUrl = url.parse(req.url, true);
    
    // get the path
    const path = parsedUrl.pathname;
    
    // remove extra slashes
    const trimmedPath = path.replace(/^\/+|\/+$/g, "");
   
    // get the method of the request in lowercase
    const method = req.method.toLowerCase();
    
    // get the query string as an object
    const queryStringObject = parsedUrl.query;
   
    // get the headers as an object
    const headers = req.headers;
    
    // All request properties are available here
    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headers,
    };


    // get the payload, if any
    const decoder = new StringDecoder("utf-8");
    let realData = "";

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    chosenHandler(requestProperties, (statusCode, payload)=>{
        statusCode = typeof(statusCode) === "number" ? statusCode : 500;
        payload = typeof payload === "object" ? payload : {};

        const payloadString = JSON.stringify(payload);

        // return the response
        res.writeHead(statusCode);
        res.end(payloadString);
    })

    req.on("data", (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on("end", () => {
        realData += decoder.end();

        res.end("Hello World");
    });
};

module.exports = handler;