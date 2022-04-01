import fs from 'fs';
import path from 'path';
import pkg from 'whatsapp-web.js';

const pathQr = path.resolve('last.qr');
console.log(pathQr);

const { Client, LocalAuth } = pkg;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

client.on('authenticated', (session) => {
    console.log('Authenticated');
    fs.unlinkSync(pathQr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('qr', qr => {
    console.log("QR RECEIVED", qr);
    fs.access(pathQr, fs.constants.F_OK, (err) => {
        if (!err) {
            fs.unlinkSync(pathQr);
        }
        fs.writeFileSync(pathQr, qr);
    });
});

export default client;