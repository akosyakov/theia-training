import { injectable, inject } from "inversify";
import URI from "@theia/core/lib/common/uri";
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry } from "@theia/core/lib/common";
import { open, KeybindingContribution, KeybindingRegistry, FrontendApplicationContribution, QuickOpenService, Endpoint, QuickOpenItem, QuickOpenMode, StatusBar, QuickOpenContribution, QuickOpenHandlerRegistry, OpenerService } from "@theia/core/lib/browser";
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
        // TODO: Add `Open Quick File...` command.
        // Use `CommandRegistry.registerCommand` to register a new command.
        // The command should call `this.open` for the first workspace root, i.e. `this.workspaceService.tryGetRoots()[0]`.
        // if there is no workspace root then the command should not be visible and enabled.
    }

    registerKeybindings(registry: KeybindingRegistry): void {
        // TODO: Add `ctrlcmd+k f` keybinding for `Open Quick File...` command.
        // Use `KeybindingRegistry.registerKeybinding` to register a new keybinding.
    }

    registerMenus(registry: MenuModelRegistry): void {
        // TODO: Add `Open Quick File...` menu item in `CommonMenus.FILE_OPEN` menu path.
        // Use `MenuModelRegistry.registerMenuAction` to register a new menu action.
    }

    onStart(): void {
        // TODO: Add `Open Quick File...` status bar item with file icon aligned left
        // Use `StatusBar.setElement` to add a new status bar entry.
    }

    registerQuickOpenHandlers(handlers: QuickOpenHandlerRegistry): void {
        /* BONUS: reimplement like QuickOpenHandler */
        // Use IDE features like content assist, reference navigation and hover to learn how to use `QuickOpenHandler`.
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