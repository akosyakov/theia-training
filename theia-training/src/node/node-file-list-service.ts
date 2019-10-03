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
        // TODO: implement fetching files info for the given uri
        // use `fs-extra` module to check whether a path points to the directory with `stat(fsPath``
        // use `fs-extra` module to read child directories with `readdir(fsPath)`
        // remember that only URIs can be passed between frontend and backend, never paths
        // see https://github.com/eclipse-theia/theia/wiki/Coding-Guidelines#uripath
    }

}