import { injectable, inject } from "inversify";
import { open, FrontendApplicationContribution, OpenerService } from "@theia/core/lib/browser";
import { FileNavigatorContribution } from "@theia/navigator/lib/browser/navigator-contribution";
import { WorkspaceService } from "@theia/workspace/lib/browser";
import URI from "@theia/core/lib/common/uri";
import { MenuModelRegistry, MAIN_MENU_BAR, MenuContribution } from "@theia/core";
import { TerminalMenus } from "@theia/terminal/lib/browser/terminal-frontend-contribution";

@injectable()
export class TheiaTrainingFrontendContribution implements FrontendApplicationContribution, MenuContribution {

    @inject(FileNavigatorContribution)
    protected readonly navigatorContribution: FileNavigatorContribution;

    @inject(WorkspaceService)
    protected readonly workspaceService: WorkspaceService;

    @inject(OpenerService)
    protected readonly openerService: OpenerService;

    async initializeLayout(): Promise<void> {
        // TODO: reveal the explorer by default
        await this.navigatorContribution.openView({ reveal: true });

        // BONUS: Open README.md if it is present
        const roots = await this.workspaceService.roots;
        if (roots.length) {
            try {
                await open(this.openerService, new URI(roots[0].uri).resolve('README.md'));
            } catch {
                /* no-op: README.md does not exist */
            }
        }
    }

    registerMenus(menus: MenuModelRegistry) {
        // TODO: Remove `Terminal` item from the main menu.
        menus.unregisterMenuAction(TerminalMenus.TERMINAL.slice(-1)[0], MAIN_MENU_BAR);
    }

}