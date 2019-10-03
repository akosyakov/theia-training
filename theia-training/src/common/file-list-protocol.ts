export interface Files {
    isDirectory: boolean;
    /** child uris */
    children?: string[];
}

export const fileListPath = '/services/fileList';
export const FileListService = Symbol('FileListService');
export interface FileListService {
    getFiles(uri: string): Promise<Files>;
}