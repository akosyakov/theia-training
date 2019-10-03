import * as React from 'react';
import { injectable, inject, postConstruct } from "inversify";
import { open, ReactWidget, LabelProvider, Message, OpenerService, StatefulWidget } from "@theia/core/lib/browser";
import URI from '@theia/core/lib/common/uri';
import { FileListService, Files } from '../common/file-list-protocol';
import { JsonRpcProxy } from '@theia/core';

export class FileComponent extends React.Component<FileComponent.Props> {

    render(): React.ReactNode {
        return <div onClick={this.openFile}>{this.props.labelProvider.getName(new URI(this.props.uri))}</div>;
    }

    protected readonly openFile = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        this.props.onOpenFile(this.props.uri);
    }

}
export namespace FileComponent {
    export interface Props {
        uri: string;
        labelProvider: LabelProvider;
        onOpenFile: (uri: string) => void
    }
}

@injectable()
export class FileListWidget extends ReactWidget implements StatefulWidget {

    static ID = 'fileList';

    // BONUS: render offline when FileListService is disconnected
    // use `JsonRpcProxy<FileListService>` as a type to detect when a connection is closed or opened
    @inject(FileListService)
    protected readonly fileListService: JsonRpcProxy<FileListService>;

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

    protected online = true;

    @postConstruct()
    protected init(): void {
        this.fileListService.onDidCloseConnection(() => {
            this.online = false;
            this.update();
        })
        this.fileListService.onDidOpenConnection(() => {
            this.online = true;
            this.update();
        })
    }


    protected onActivateRequest(msg: Message): void {
        super.onActivateRequest(msg);
        this.node.focus();
    }

    protected path: string[] = [];
    protected current: Files & { uri: string } | undefined;

    protected render(): React.ReactNode {
        if (!this.online) {
            return <div>Offline</div>;
        }
        const children = this.current && this.current.children;
        return <React.Fragment>
            {this.path.length > 0 && <div onClick={this.openParent}>..</div>}
            {children && children.map((uri, index) => <FileComponent key={index} uri={uri} labelProvider={this.labelProvider} onOpenFile={this.openChild} />)}
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

    get file(): string | undefined {
        return this.current && this.current.uri;
    }
    set file(uri: string | undefined) {
        this.path.length = 0;
        this.current = undefined;
        if (uri) {
            this.doOpen(uri)
        } else {
            this.update();
        }
    }

    protected readonly doOpen = async (uri: string): Promise<void> => {
        const files = await this.fileListService.getFiles(uri);
        if (files.isDirectory) {
            this.current = Object.assign(files, { uri });
            this.update();
        } else {
            open(this.openerService, new URI(uri));
        }
    }

    storeState(): object {
        return {
            path: this.path,
            current: this.current
        }
    }

    restoreState(oldState: object): void {
        Object.assign(this, oldState);
        this.update();
    }

}