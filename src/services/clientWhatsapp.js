import pkg from 'whatsapp-web.js';

const { Client, LocalAuth } = pkg;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

client.on('authenticated', (session) => {
    fs.unlinkSync('./components/last.qr');
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
    fs.access('last.qr', fs.constants.F_OK, (err) => {
        if (!err) {
            fs.unlinkSync('last.qr');
        }
        fs.writeFileSync('last.qr', qr);
    });
});

export default client;