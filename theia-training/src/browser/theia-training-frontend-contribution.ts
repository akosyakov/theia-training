import { injectable, inject } from "inversify";
import URI from "@theia/core/lib/common/uri";
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry } from "@theia/core/lib/common";
import { open, KeybindingContribution, KeybindingRegistry, FrontendApplicationContribution, QuickOpenService, Endpoint, QuickOpenItem, QuickOpenMode, CommonMenus, StatusBar, StatusBarAlignment, QuickOpenContribution, QuickOpenHandlerRegistry, OpenerService } from "@theia/core/lib/browser";
import { WorkspaceService } from "@theia/workspace/lib/browser";

@injectable()
export class TheiaTrainingFrontendContribution implements CommandContribution, MenuContribution, KeybindingContribution, FrontendApplicationContribution, QuickOpenContribution {

    readonly prefix = 'file';

    readonly description = 'Quick File'

    @inject(QuickOpenService)
    protected readonly quickOpenService: QuickOpenService;

    @inject(WorkspaceService)
    protected readonly workspaceService: WorkspaceService;

    @inject(OpenerService)
    protected readonly openereService: OpenerService;

    @inject(StatusBar)
    protected readonly statusBar: StatusBar;

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand({
            id: 'training.quickFile.open',
            label: 'Open Quick File'
        }, {
            execute: () => {
                const root = this.workspaceService.tryGetRoots()[0];
                if (root) {
                    this.open(root.uri);
                }
            },
            isEnabled: () => this.workspaceService.tryGetRoots().length > 0,
            isVisible: () => this.workspaceService.tryGetRoots().length > 0
        });
    }

    registerKeybindings(registry: KeybindingRegistry): void {
        registry.registerKeybinding({
            command: 'training.quickFile.open',
            keybinding: 'ctrlcmd+k f'
        });
    }

    registerMenus(registry: MenuModelRegistry): void {
        registry.registerMenuAction(CommonMenus.FILE_OPEN, {
            commandId: 'training.quickFile.open'
        });
    }

    onStart(): void {
        this.statusBar.setElement('training.quickFile', {
            text: '$(file)',
            alignment: StatusBarAlignment.LEFT,
            priority: 1,
            command: 'training.quickFile.open'
        });
    }

    registerQuickOpenHandlers(handlers: QuickOpenHandlerRegistry): void {
        /* BONUS: reimplement like QuickOpenHandler */
        // handlers.registerHandler(this);
    }

    protected async open(current: string, path: string[] = []): Promise<void> {
        const listFilesUrl = new Endpoint({ path: 'listFiles' }).getRestUrl();
        const url = listFilesUrl.withQuery(current).toString();
        const response = await fetch(url);
        const files: string[] = await response.json();
        const items: QuickOpenItem[] = files.map(file => new QuickOpenItem({
            label: file,
            run: mode => {
                if (mode === QuickOpenMode.OPEN) {
                    const currentUri = new URI(current);
                    const fileUri = currentUri.withPath(currentUri.path.join(file));
                    if (fileUri.path.ext && fileUri.path.name) {
                        open(this.openereService, fileUri);
                    } else {
                        path.push(current);
                        this.open(fileUri.toString(true), path);
                    }
                    return true;
                }
                return false;
            }
        }));
        if (path.length) {
            items.unshift(new QuickOpenItem({
                label: '..',
                run: mode => {
                    if (mode === QuickOpenMode.OPEN) {
                        this.open(path.pop()!, path);
                        return true;
                    }
                    return false;
                }
            }));
        }
        this.quickOpenService.open({
            onType: (_, acceptor) => acceptor(items)
        }, {
            fuzzyMatchLabel: true,
            placeholder: 'Type file name...'
        });
    }

}