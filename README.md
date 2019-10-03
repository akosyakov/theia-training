## Styling and white-labeling Theia applications

- Customize the default layout in `TheiaTrainingFrontendContribution.initializeLayout`:
  - Reveal the explorer by default, use `FileNavigatorContribution.openView` ans pass `true` as a reveal flag.
  - Use `Reset Workbench Layout` command to reload with the default layout.
- Customize the main menu:
  - Remove `Terminal` item from the main menu in `TheiaTrainingFrontendContribution.registerMenus`.
  Use `MenuModelRegistry.unregisterMenuAction` with the last segment of `TerminalMenus.TERMINAL` and `MAIN_MENU_BAR`.
  - Add logo icon. In `index.css` set `background-image` of `theia-icon` class to `url(gitpod-logo.svg)`.
- Add new theme:
  - In `theia-training-frontend-module.ts` set `my-dark` as a current theme.
  - Modify variables-my-dark.useable.css to set `--theia-ui-font-color1` variable as `#6688CC`.
  - Use `Change Color Theme` command to switch between themes and see how text color is changed in the explorer.

### Bonus

- Customize the default layout in `TheiaTrainingFrontendContribution.initializeLayout`:
    - Open README.md if it is present.
    - Use `WorkspaceService.roots` to get a URI of the first root and resolve `README.md` against it.
    - Use `OpenerService` to open this URI. Ignore an error in the case if a URI cannot be opened, i.e. a file does not exist.
- Remove `Call Hierarchy` view contribution.
Rebind `CallHierarchyContribution` to a constant object stubbing commands, menus and keybidnings registration.
- TODO: Customize textmate highligting.
