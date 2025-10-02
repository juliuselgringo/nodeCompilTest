const express = require('express');
const { config } = require('dotenv');

// wrapper o2switch
if(typeof PhusionPassenger !== "undefined"){
    PhusionPassenger({autoInstall: false})
}

const app = express();
const port = 3000;

config();

app.get('/', (req,res) => {
    return res.status(200).json({
        message: "Hello world from API"
    });
})

app.get('/test', (req,res) => {
    return res.status(200).json({
        message: "test fonctionne"
    })
})

if(typeof PhusionPassenger !== "undefined"){
    app.listen("passenger");
}else {
    app.listen(port, () => {
        const url = process.env.URL;
        console.log("Server is listening...");
        console.log(`${url}`);
    });
}
