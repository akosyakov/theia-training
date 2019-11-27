import { JsonRpcServer } from "@theia/core/lib/common/messaging/proxy-factory";

export interface Files {
    isDirectory: boolean;
    /** child uris */
    children?: string[];
}

export const fileListPath = '/services/fileList';
export const FileListService = Symbol('FileListService');
export interface FileListService extends JsonRpcServer<FileListClient> {
    getFiles(uri: string): Promise<Files>;
}

export interface FileListClient {
    onDidChangeSomething(uri: string): void;
}