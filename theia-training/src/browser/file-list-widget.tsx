import * as React from 'react';
import { injectable, inject } from "inversify";
import { open, ReactWidget, LabelProvider, Message, OpenerService } from "@theia/core/lib/browser";
import { FileSystem, FileStat } from "@theia/filesystem/lib/common";
import URI from '@theia/core/lib/common/uri';

@injectable()
export class FileListWidget extends ReactWidget {

    static ID = 'fileList';

    @inject(FileSystem)
    protected readonly fileSystem: FileSystem;

    @inject(LabelProvider)
    protected readonly labelProvider: LabelProvider;

    @inject(OpenerService)
    protected readonly openerService: OpenerService;

    constructor() {
        super();
        this.id = FileListWidget.ID;
        this.title.label = 'File List';
        this.title.caption = 'File List';
        this.title.iconClass = 'fa fa-file';
        this.node.tabIndex = 0;
        this.node.classList.add('theia-file-list');
    }

    protected onActivateRequest(msg: Message): void {
        super.onActivateRequest(msg);
        this.node.focus();
    }

    protected path: string[] = [];
    protected current: FileStat | undefined;

    protected render(): React.ReactNode {
        const children = this.current && this.current.children;
        return <React.Fragment>
            {this.path.length > 0 && <div onClick={this.openParent}>..</div>}
            {children && children.map((file, index) => <FileComponent key={index} file={file} labelProvider={this.labelProvider} onOpenFile={this.openChild} />)}
        </React.Fragment>
    }

    protected readonly openParent = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();

        this.doOpen(this.path.pop()!);
    }

    protected readonly openChild = (uri: string) => {
        this.path.push(this.current!.uri);
        this.doOpen(uri);
    }

    get file(): FileStat | undefined {
        return this.current;
    }
    set file(stat: FileStat | undefined) {
        this.path.length = 0;
        this.current = undefined;
        if (stat) {
            this.doOpen(stat.uri)
        } else {
            this.update();
        }
    }

    protected readonly doOpen = async (uri: string): Promise<void> => {
        const file = await this.fileSystem.getFileStat(uri);
        if (!file) {
            return;
        }
        if (file.isDirectory) {
            this.current = file;
            this.update();
        } else {
            open(this.openerService, new URI(file.uri));
        }
    }

}

export class FileComponent extends React.Component<FileComponent.Props> {

    render(): React.ReactNode {
        return <div onClick={this.openFile}>{this.props.labelProvider.getName(this.props.file)}</div>;
    }

    protected readonly openFile = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        this.props.onOpenFile(this.props.file.uri);
    }

}
export namespace FileComponent {
    export interface Props {
        file: FileStat;
        labelProvider: LabelProvider;
        onOpenFile: (uri: string) => void
    }
}
