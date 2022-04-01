import fs from 'fs';
import path from 'path';
import qrCode from 'qrcode';
import { PassThrough } from "stream";


class AuthService {

    constructor() { }

    async getQrCode(request, response) {
        try {
            const pathQr = path.resolve('last.qr');
            const content = fs.readFileSync(pathQr, {
                encoding: 'utf8',
                flag: 'r'
            });

            console.log(content);

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
