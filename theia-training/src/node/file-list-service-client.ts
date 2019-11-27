import * as path from 'path';
import * as cp from 'child_process';
import { injectable } from "inversify";
import { JsonRpcProxyFactory } from "@theia/core/lib/common/messaging/proxy-factory";
import { DEBUG_MODE } from "@theia/core/lib/node/debug";
import { FileListService, FileListClient, Files } from "../common/file-list-protocol";
import { createMessageConnection, StreamMessageReader, StreamMessageWriter, Trace } from 'vscode-jsonrpc';
import { BackendApplicationContribution } from "@theia/core/lib/node/backend-application";

@injectable()
export class FileListServiceClient implements FileListService, BackendApplicationContribution {

    protected readonly proxyFactory = new JsonRpcProxyFactory<FileListService>();
    protected readonly remote = this.proxyFactory.createProxy();
    protected client: FileListClient | undefined;

    initialize(): void {
        // we cannot do this.remote.setClient(client) because of https://github.com/eclipse-theia/theia/issues/7131
        this.remote.setClient({
            onDidChangeSomething: uri => {
                if (this.client) {
                    this.client.onDidChangeSomething(uri);
                }
            }
        });

        const jarPath = path.join(path.dirname(require.resolve('file-server/package.json')), 'build/libs/my-file-server.jar');
        const args = [];
        if (DEBUG_MODE) {
            args.push('-agentlib:jdwp=transport=dt_socket,server=y,address=8000,suspend=n,quiet=y');
        }
        args.push(...['-jar', jarPath]);
        console.log(`[file-server]: java ${args.join(' ')}`)
        const serverProcess = cp.spawn('java', args, {
            stdio: ['pipe', 'pipe', 2]
        });

        console.log(`[file-server: ${serverProcess.pid}] started`);
        serverProcess.once('exit', () => console.log(`[file-server: ${serverProcess.pid}] exited`));
        serverProcess.on('error', error => console.error(`[file-server: ${serverProcess.pid}]`, error));

        const reader = new StreamMessageReader(serverProcess.stdout!);
        const writer = new StreamMessageWriter(serverProcess.stdin!);
        const connection = createMessageConnection(reader, writer, {
            error: (message: string) => console.error(`[file-server: ${serverProcess.pid}] ${message}`),
            warn: (message: string) => console.warn(`[file-server: ${serverProcess.pid}] ${message}`),
            info: (message: string) => console.info(`[file-server: ${serverProcess.pid}] ${message}`),
            log: (message: string) => console.info(`[file-server: ${serverProcess.pid}] ${message}`)
        });
        connection.trace(Trace.Verbose, {
            // tslint:disable-next-line:no-any
            log: (message: any, data?: string) => console.info(`[file-server: ${serverProcess.pid}] ${message}` + (typeof data === 'string' ? ' ' + data : ''))
        });
        this.proxyFactory.listen(connection);
    }

    dispose(): void { }

    setClient(client: FileListClient | undefined): void {
        this.client = client;
    }

    getFiles(uri: string): Promise<Files> {
        return this.remote.getFiles(uri);
    }

}