import '../../src/browser/style/index.css';

const myDarkCss = require('../../src/browser/style/variables-my-dark.useable.css');


import { ContainerModule } from 'inversify';
import { TheiaTrainingFrontendContribution } from './theia-training-frontend-contribution';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { MenuContribution } from '@theia/core';
import { ThemeService, BuiltinThemeProvider } from '@theia/core/lib/browser/theming';
import { CallHierarchyContribution } from '@theia/callhierarchy/lib/browser/callhierarchy-contribution';

export default new ContainerModule((bind, unbind, isBound, rebind) => {
    bind(TheiaTrainingFrontendContribution).toSelf().inSingletonScope();
    bind(MenuContribution).toService(TheiaTrainingFrontendContribution);
    bind(FrontendApplicationContribution).toService(TheiaTrainingFrontendContribution);

    const themeService = ThemeService.get();
    themeService.register({
        id: 'my-dark',
        label: 'My Dark Theme',
        description: 'Bright fonts on dark backgrounds.',
        editorTheme: 'dark-plus', // loaded in /packages/monaco/src/browser/textmate/monaco-theme-registry.ts
        activate(): void {
            BuiltinThemeProvider.darkCss.use();
            myDarkCss.use();
        },
        deactivate(): void {
            myDarkCss.unuse();
            BuiltinThemeProvider.darkCss.unuse();
        }
    });
    // TODO: set my-dark as a current theme

    // BONUS: remove `Call Hierarch` view contribution
    rebind(CallHierarchyContribution).toConstantValue({
        registerCommands: () => { },
        registerMenus: () => { },
        registerKeybindings: () => { }
    } as any);
});