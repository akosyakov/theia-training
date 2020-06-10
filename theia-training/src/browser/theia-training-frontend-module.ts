import '../../src/browser/style/index.css';

import { ContainerModule } from 'inversify';
import { TheiaTrainingFrontendContribution } from './theia-training-frontend-contribution';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { MenuContribution } from '@theia/core';
import { ThemeService } from '@theia/core/lib/browser/theming';
import { CallHierarchyContribution } from '@theia/callhierarchy/lib/browser/callhierarchy-contribution';
import { MonacoThemingService } from '@theia/monaco/lib/browser/monaco-theming-service';

// TODO: Change my.color-theme.json to highlight strings in green.
// Configure `foreground` as `#22aa44` (green) for `strings` tokens in `string.quoted.single`, `string.quoted.double` and `string.quoted.triple` scopes.
// See https://code.visualstudio.com/api/extension-capabilities/theming#color-theme to learn more about tokens, scopes and token colors.
MonacoThemingService.register({
    id: 'my-dark',
    label: 'My Dark Theme',
    uiTheme: 'vs-dark',
    json: require('../../src/browser/data/my.color-theme.json')
});
ThemeService.get().setCurrentTheme('my-dark');

export default new ContainerModule((bind, unbind, isBound, rebind) => {
    bind(TheiaTrainingFrontendContribution).toSelf().inSingletonScope();
    bind(MenuContribution).toService(TheiaTrainingFrontendContribution);
    bind(FrontendApplicationContribution).toService(TheiaTrainingFrontendContribution);

    // BONUS: remove `Call Hierarch` view contribution
    rebind(CallHierarchyContribution).toConstantValue({
        registerCommands: () => { },
        registerMenus: () => { },
        registerKeybindings: () => { }
    } as any);
});