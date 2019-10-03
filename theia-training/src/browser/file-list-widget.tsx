import * as React from 'react';
import { injectable, inject } from "inversify";
import { open, ReactWidget, LabelProvider, Message, OpenerService } from "@theia/core/lib/browser";
import { FileSystem, FileStat } from "@theia/filesystem/lib/common";
import URI from '@theia/core/lib/common/uri';

/**
 * BONUS: implement `StatefulWidget` to preserve the path and current state on the page reload
 */
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
        /* TODO implement rendering
        - Implement rendering of a file list in `FileListWidget.render`.
        - The model of `FileListWidget` is a current file with a path which a user follows to open this file.
        These variables are represented in code like `FileListWidget.current` and `FileListWidget.path` properties.
        - If a path is not emptry then render `..` as a first element.
        When a user clicks on it the last element of a path should be opened.
        You can do it by calling `FileListWidget.openParent`.
        - If a current file has children, i.e. it's a directory, then for each child file render `FileComponent`.
        When a user clicks on a child node the corresponding file should be opened.
        You can do it by calling `FileListWidget.openChild`.
         */
        return null;
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
        // BONUS: render file icon
        // `LabelProvider.getIcon` provides an icon for the given object
        // but it is async, so the code should be refactored to first compute an icon and then trigger rerendering
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
