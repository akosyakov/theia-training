- Add `Open Quick File...` command in `TheiaTrainingFrontendContribution.registerCommand`.
The command should call `this.open` for the first workspace root, i.e. `this.workspaceService.tryGetRoots()[0]`.
Ff there is no a workspace root then the command should not be visible and enabled.
- Add `ctrlcmd+k f` keybinding for `Open Quick File...` command in `TheiaTrainingFrontendContribution.registerKeybindings`.
- Add `Open Quick File...` menu item in `CommonMenus.FILE_OPEN` menu path in `TheiaTrainingFrontendContribution.registerMenus`
- Add `Open Quick File...` status bar item with file icon aligned to a left in `TheiaTrainingFrontendContribution.onStart`.

### Bonus

- Reimplement `TheiaTrainingFrontendContribution` as `QuickOpenHandler`, see `TheiaTrainingFrontendContribution.registerQuickOpenHandlers`.