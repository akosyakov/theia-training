import { injectable, inject } from "inversify";
import { FrontendApplicationContribution, OpenerService } from "@theia/core/lib/browser";
import { FileNavigatorContribution } from "@theia/navigator/lib/browser/navigator-contribution";
import { WorkspaceService } from "@theia/workspace/lib/browser";
import { MenuModelRegistry, MenuContribution } from "@theia/core";

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

        // BONUS: Open README.md if it is present
    }

    registerMenus(menus: MenuModelRegistry) {
        // TODO: Remove `Terminal` item from the main menu.
    }

}