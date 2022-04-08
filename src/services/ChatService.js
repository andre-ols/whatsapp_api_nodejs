
import pkg from "whatsapp-web.js";
import client from './clientWhatsapp.js';
const { MessageMedia, Location } = pkg;

class ChatService {
    constructor() { }

    async sendMessage(request, response) {
        try {
            const { phone } = request.params;
            const { message } = request.body;
            await client.sendMessage(`${phone}@c.us`, message);
            return response.status(200).send({
                message: 'Message sent successfully'
            });
        } catch (err) {
            console.error('Failed to send message', err);
            return response.status(500).send('Failed to send message');
        }
    }

    async sendMedia(request, response) {
        try {
            const { phone } = request.params;
            const { url, message } = request.body;
            console.log(phone, message, url);
            if (!url || !phone)
                return response.status(400).send({
                    message: 'Invalid parameters'
                });

            const media = await MessageMedia.fromUrl(url);
            console.log(media);
            const res = await client.sendMessage(`${phone}@c.us`, media, { caption: message });
            console.log(res);
            return response.status(200).send({ message: 'Message sent successfully' });
        }
        catch (err) {
            console.error('Failed to send media', err);
            return response.status(500).send('Failed to send media');
        }
    }

    async sendLocation(request, response) {
        try {
            const { phone } = request.params;
            const { latitude, longitude, message } = request.body;
            if (!latitude || !longitude || !phone)
                return response.status(400).send({
                    message: 'Invalid parameters'
                });

            const location = new Location(latitude, longitude, message);
            await client.sendMessage(`${phone}@c.us`, location);
            return response.status(200).send({ message: 'Message sent successfully' });
        }
        catch (err) {
            console.error('Failed to send location', err);
            return response.status(500).send('Failed to send location');
        }
    }

    async getChatById(request, response) {
        try {
            const { phone } = request.params;
            if (!phone)
                return response.status(400).send({
                    message: 'Invalid parameters'
                });

            const chat = await client.getChatById(`${phone}@c.us`);
            return response.status(200).send({
                message: 'Chat fetched successfully',
                chat
            });
        }
        catch (err) {
            console.error('Failed to fetch chat', err);
            return response.status(500).send('Failed to fetch chat');
        }
    }

    async getChats(request, response) {
        try {
            const chats = await client.getChats();
            return response.status(200).send({
                message: 'Chats fetched successfully',
                chats
            });
        }
        catch (err) {
            console.error('Failed to fetch chats', err);
            return response.status(500).send('Failed to fetch chats');
        }
    }

}

export default ChatService;