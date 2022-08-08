const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
const Websocket = require("ws");
const { uuid } = require('uuidv4');
const crypto = require("crypto")
const fs = require("fs")
const wss = new WebSocket.Server({ port: 6968 });
const clients = new Map()

const async_question = (q) => new Promise((resolve) => {
    readline.question(q, answer => {
        answer = new Number(answer)
        if (answer) resolve(answer == 1 ? "host" : "connect"); else {
            answer = answer.toLowerCase().trim()
            if (answer) resolve(answer == "host" ? "host" : "connect");
        }
    })
})

let type;

(async _ => {
    while (!type) type = await async_question("what would you like to do?\n\n1: Host\n2: Connect\n\nInput:");
    

})()

wss.on("connection", ws => {
    if (type & type == "host") {
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", { modulusLength: 2048, })
        clients.set(ws, { 
            uuid: uuid(),
            encryption_info: {
                PBK: publicKey,
                PRK: privateKey,
            }
        })
        ws.on("close", () => {
            clients.delete(ws)
        })

        ws.on("message", msg => {
            const data = JSON.parse(msg)
            if (!data || !data.method) return;
            switch (data.method) {
                
            }
        })

        ws.send(JSON.stringify({

        }))
    } else if (type) {

    }
});