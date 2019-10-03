import '../../src/browser/style/index.css';

const myDarkCss = require('../../src/browser/style/variables-my-dark.useable.css');


import { ContainerModule } from 'inversify';
import { TheiaTrainingFrontendContribution } from './theia-training-frontend-contribution';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { MenuContribution } from '@theia/core';
import { ThemeService, BuiltinThemeProvider } from '@theia/core/lib/browser/theming';

// BONUS: Use myEditorTheme as an editor theme for `my-dark` theme. Change my.color-theme.json to highlight strings in green.
// See https://code.visualstudio.com/api/extension-capabilities/theming#color-theme to learn more about tokens, scopes and token colors.
// import { MonacoThemeRegistry } from '@theia/monaco/lib/browser/textmate/monaco-theme-registry';
// const myEditorTheme = MonacoThemeRegistry.SINGLETON.register(
//    require('../../src/browser/data/my.color-theme.json'), {}, 'my-dark', 'vs-dark').name!;

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
});