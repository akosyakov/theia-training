import * as fs from 'fs';
import * as url from 'url';
import * as express from 'express';
import { injectable } from 'inversify';
import { BackendApplicationContribution } from '@theia/core/lib/node/backend-application';
import { FileUri } from '@theia/core/lib/node/file-uri';

@injectable()
export class TheiaTrainingBackendContribution implements BackendApplicationContribution {

    configure(app: express.Application): void {
        app.get('/listFiles', (request, response) => {
            try {
                const query = url.parse(request.url).query;
                if (!query) {
                    response.status(400).send('invalid query');
                    return;
                }
                const fsPath = FileUri.fsPath(decodeURIComponent(query));
                fs.readdir(fsPath, (err, files) => {
                    if (err) {
                        if (err.code === 'ENOENT') {
                            console.error('not found', err);
                            response.status(404).send('not found');
                            return;
                        }
                        console.error(`Failed fo list file`, err);
                        if (!response.headersSent) {
                            response.status(500).send('failed to list files');
                        }
                        return;
                    }
                    response.json(files);
                });
            } catch (e) {
                console.error('Failed fo list files', e);
                response.status(500).send('failed to list files');
            }
        });
    }

}