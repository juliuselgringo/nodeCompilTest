const express = require('express');
const { config } = require('dotenv');
const path = require('path');
const mistral = require('@mistralai/mistralai');

// wrapper o2switch
if(typeof PhusionPassenger !== "undefined"){
    PhusionPassenger({autoInstall: false})
}

const app = express();
const port = 3000;

config();

const apiKey = process.env.MISTRAL_API_KEY;
const client = new mistral.Mistral({apiKey: apiKey})

app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req,res) => {
    return res.sendFile(path.join(__dirname, "/public/index.html"));
})


app.post('/api/ia', async (req,res) => {
    try{
        console.log(req.body.message)
        if(!client) return res.status(503).json({message: 'Service indisponible(clé API manquante)'});
        const userMessage = req.body.message;
        console.log(userMessage);
        if(!userMessage || typeof userMessage !== 'string'){
            return res.status(400).json({message: 'message requis'});
        }
        const chatResponse = await client.chat.complete({
            model: 'mistral-small-latest',
            messages: [
                {
                    role: 'system',
                    content: 'You create a linked in post of the subject the user share you. If the user share you a url use websearch, read the content, analyse, and write the linked in post.'
                },
                { role: 'user', content: userMessage }
            ]
        });
        return res.json({ reply: chatResponse.choices[0].message.content });
    } catch (err) {
        console.error('[CHAT][ERROR]', err.message);
        return res.status(500).json({ message: 'Erreur interne (chat)' });
    }
})



if(typeof PhusionPassenger !== "undefined"){
    app.listen("passenger");
}else {
    app.listen(port, () => {
        console.log("Server is listening...");
    });
}
