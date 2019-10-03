export interface Files {
    /**
     * `true` if a folder
     * `false` if a file
     */
    isDirectory: boolean;
    /**
     * child uris
     * `undefined` if a file
     */
    children?: string[];
}

export const fileListPath = '/services/fileList';
export const FileListService = Symbol('FileListService');
export interface FileListService {
    // JSON-RPC request
    getFiles(uri: string): Promise<Files>;

    // JSON-RPC notification
    onDidChangeFile?(uri: string): void;
}