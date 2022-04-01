import fs from 'fs';
import qrCode from 'qrcode';
import { PassThrough } from "stream";


class AuthService {

    constructor() { }

    async getQrCode(request, response) {
        try {
            const content = fs.readFileSync('components/last.qr', {
                encoding: 'utf8',
                flag: 'r'
            });

            const qrStream = new PassThrough();
            await qrCode.toFileStream(qrStream, content,
                {
                    type: 'png',
                    width: 600,
                    errorCorrectionLevel: 'H'
                }
            );

            qrStream.pipe(response);
        } catch (err) {
            console.error('Failed to return content', err);
            return response.status(500).send('Failed to return content');
        }
    }
}

export default AuthService;
