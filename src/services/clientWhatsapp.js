import fs from 'fs';
import path from 'path';
import pkg from 'whatsapp-web.js';

const pathQr = path.resolve('last.qr');
console.log(pathQr);

const { Client, LocalAuth } = pkg;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--unhandled-rejections=strict'] }
});

client.on("qr", (qr) => {
    console.log("QR RECEIVED", qr);
    fs.writeFileSync(pathQr, qr);
});

client.on("authenticated", () => {
    console.log("AUTH!");
    try {
        fs.unlinkSync(pathQr);
    } catch (err) { }
});

client.on("auth_failure", (msg) => {
    console.error('AUTHENTICATION FAILURE', msg);
    process.exit();
});

client.on("disconnected", () => {
    console.log("disconnected");
});

client.on("ready", () => {
    console.log("Client is ready!");
});

export default client;