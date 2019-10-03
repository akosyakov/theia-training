# Exercise 6: Style and white-label Theia application

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#https://github.com/akosyakov/theia-training/tree/solution-6)

In this exercise, you learn:
- how to customize the default layout;
- how to customize the menu bar;
- how to remove functionality;
- how to customize theming.

### Task 1: Customize the default layout
- Customize the default layout in `TheiaTrainingFrontendContribution.initializeLayout`.
- Reveal the explorer by default, use `FileNavigatorContribution.openView` ans pass `true` as a reveal flag.
- Use `Reset Workbench Layout` command to reload with the default layout.

### Task 2: Customize the main menu
- Remove `Terminal` item from the main menu in `TheiaTrainingFrontendContribution.registerMenus`.
Use `MenuModelRegistry.unregisterMenuAction` with the last segment of `TerminalMenus.TERMINAL` and `MAIN_MENU_BAR`.
- Add logo icon. In `index.css` set `background-image` of `theia-icon` class to `url(gitpod-logo.svg)`.

### Task 3: Add a new theme
- In `theia-training-frontend-module.ts` set `my-dark` as a current theme.
- Modify variables-my-dark.useable.css to set `--theia-ui-font-color1` variable as `#6688CC`.
- Use `Change Color Theme` command to switch between themes and see how text color is changed in the explorer.

## Bonus

### Task 4: More customizations to the default layout
- Customize the default layout in `TheiaTrainingFrontendContribution.initializeLayout`.
- Open README.md if it is present.
- Use `WorkspaceService.roots` to get a URI of the first root and resolve `README.md` against it.
- Use `OpenerService` to open this URI. Ignore an error in the case if a URI cannot be opened, i.e. a file does not exist.

### Task 5: Remove `Call Hierarchy` contribution
- Rebind `CallHierarchyContribution` to a constant object stubbing commands, menus and keybidnings registration.

### Task 6: Customize the editor theme
- Change `my-dark` theme to use `myEditorTheme` as an editor theme in `theia-training-frontend-module.ts`
- Configure `foreground` as `#22aa44` (green) for `strings` tokens in `string.quoted.single`, `string.quoted.double` and `string.quoted.triple` scopes.
- See https://code.visualstudio.com/api/extension-capabilities/theming#color-theme to learn more about tokens, scopes and token colors.
