import * as path from 'path';
import { injectable } from 'inversify';
import { BaseLanguageServerContribution, IConnection } from '@theia/languages/lib/node';
import { environment } from '@theia/application-package';

@injectable()
export class ServerContribution extends BaseLanguageServerContribution {

    readonly id = 'languageServerExample';
    readonly name = 'Language Server Example';

    async start(clientConnection: IConnection): Promise<void> {
        await this.startJavaServer(clientConnection);
    }

    protected async startTsServer(clientConnection: IConnection): Promise<void> {
        const command = process.execPath;
        const args: string[] = [
            path.resolve(__dirname, './server'),
            '--stdio'
        ];
        const serverConnection = await this.createProcessStreamConnectionAsync(command, args, { env: environment.electron.runAsNodeEnv() });
        this.forward(clientConnection, serverConnection);
    }

    protected async startJavaServer(clientConnection: IConnection): Promise<void> {
        const jar = path.resolve(__dirname, '../../build/my-language-server.jar');
        const command = 'java';
        const args: string[] = [
            '-jar',
            jar
        ];
        const serverConnection = this.createProcessStreamConnection(command, args);
        this.forward(clientConnection, serverConnection);
    }

}
