import * as fs from 'fs-extra';
import { FileListService, Files } from "../common/file-list-protocol";
import { FileUri } from "@theia/core/lib/node/file-uri";
import { injectable, inject } from "inversify";
import URI from '@theia/core/lib/common/uri';
import { MessageService } from '@theia/core';

@injectable()
export class NodeFileListService implements FileListService {

    // BONUS: show info message when `getFiles` is called
    // check that each window does not receive a notification from another window
    @inject(MessageService)
    protected readonly messageService: MessageService;

    async getFiles(uri: string): Promise<Files> {
        this.messageService.info(uri);
        const currentUri = new URI(uri);
        const fsPath = FileUri.fsPath(currentUri)
        const stat = await fs.stat(fsPath);
        if (!stat.isDirectory()) {
            return {
                isDirectory: false
            };
        }
        const files = await fs.readdir(fsPath);
        return {
            isDirectory: true,
            children: files.map(file => currentUri.withPath(currentUri.path.join(file)).toString())
        };
    }

}