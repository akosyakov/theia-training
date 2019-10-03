import { injectable, inject } from "inversify";
import { AbstractViewContribution, OpenViewArguments, FrontendApplicationContribution } from "@theia/core/lib/browser";
import { FileListWidget } from "./file-list-widget";
import { WorkspaceService } from "@theia/workspace/lib/browser";

@injectable()
export class FileListViewContribution extends AbstractViewContribution<FileListWidget> implements FrontendApplicationContribution  {

    @inject(WorkspaceService)
    protected readonly workspaceService: WorkspaceService;

    constructor() {
        super({
            widgetId: FileListWidget.ID,
            widgetName: 'File List',
            defaultWidgetOptions: {
                area: 'left',
                rank: 100
            },
            toggleCommandId: 'fileList:toggle',
            toggleKeybinding: 'ctrlcmd+k f'
        });
    }

    async openView(args: Partial<OpenViewArguments> = {}): Promise<FileListWidget> {
        const widget = await super.openView(args);
        if (!widget.file) {
            const roots = await this.workspaceService.roots;
            if (roots.length) {
                widget.file = roots[0];
            }
        }
        return widget;
    }

    async onStart(): Promise<void> {
        await this.openView({
            reveal: true
        });
    }

}