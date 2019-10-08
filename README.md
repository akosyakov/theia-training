# Exercise 5: Implement a Language Server

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#https://github.com/akosyakov/theia-training/tree/exercise-5)

In this exercise, you learn:
- what is a language server protocol (LSP);
- how to integrate a language server via a native Theia extension;
- how to integrate a language server via a VS Code extension.

### Task 1: Implement to lower case code action
- See https://microsoft.github.io/language-server-protocol/specifications/specification-3-14/#textDocument_codeAction
- Change `MyLanguageServer.initialize` to allow code actions and execute command requests.
- Implement `MyLanguageServer.codeAction` to provide to lowercase quick fixes for in uppercase warnings.
- Implement `MyLanguageServer.executeCommand` to apply the quick fix.
- Add tests to `MyLanguageServerTest` and execute them with `./gradlew test` in `lsp4j-server` project.
- Package with `./gradlew shadowJar` in `lsp4j-server` and then `yarn build` in `theia-training` projects.
- Set `languageServerExample.trace.server` as `verbose` to trace JSON-RPC communications to hunt down issues during development.
  - See https://code.visualstudio.com/api/language-extensions/language-server-extension-guide#logging-support-for-language-server

## Bonus

### Task 2: Integrate a language server via a VS Code extension
- Implement a VS Code extension following https://code.visualstudio.com/api/language-extensions/language-server-extension-guide
- Create `plugins` folder in the project root.
- Package an extension to vsxi files and copy it into `plugins` folder.
- Change `start` script in `browser-app` to pass `--plugins=local-dir:../plugins` option.
- Launch `browser-app`.
