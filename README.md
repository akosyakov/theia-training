# Exercise 1: Implement Quick File

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#https://github.com/akosyakov/theia-training/tree/solution-1)

In this exercise, you learn:
- frontend and backend application lifecycle and contributions;
- how to register commands, keybindings and menus;
- how to use the command palette and the status bar;
- how to open files.

### Task 1: Register a command
- Add `Open Quick File...` command in `TheiaTrainingFrontendContribution.registerCommands`.
- Use `CommandRegistry.registerCommand` to register a new command.
- The command should call `this.open` for the first workspace root, i.e. `this.workspaceService.tryGetRoots()[0]`.
- If there is no workspace root then the command should not be visible and enabled.

### Task 2: Register a keybinding
- Add `ctrlcmd+k f` keybinding for `Open Quick File...` command in `TheiaTrainingFrontendContribution.registerKeybindings`.
- Use `KeybindingRegistry.registerKeybinding` to register a new keybinding.

### Task 3: Register a menu
- Add `Open Quick File...` menu item in `CommonMenus.FILE_OPEN` menu path in `TheiaTrainingFrontendContribution.registerMenus`
- Use `MenuModelRegistry.registerMenuAction` to register a new menu action.

### Task 4: Add a status bar item
- Add `Open Quick File...` status bar item with file icon aligned left in `TheiaTrainingFrontendContribution.onStart`.
- Use `StatusBar.setElement` to add a new status bar entry.

## Bonus

### Task 5: Implement a quick open handler
- Reimplement `TheiaTrainingFrontendContribution` as `QuickOpenHandler`, see `TheiaTrainingFrontendContribution.registerQuickOpenHandlers`.
- Use IDE features like content assist, reference navigation and hover to learn how to use `QuickOpenHandler`.