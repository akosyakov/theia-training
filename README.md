- Implement fetching files info for the given uri in `NodeFileListService.getFiles`:
  - use `fs-extra` module to check whether a path points to the directory with `stat(fsPath)`
  - use `fs-extra` module to read child directories with `readdir(fsPath)`
  - remember that only URIs can be passed between frontend and backend, never paths, see https://github.com/eclipse-theia/theia/wiki/Coding-Guidelines#uripath

### Bonus

- Render offline mode when FileListService is disconnected in `FileListWidget.render`
  - Use `JsonRpcProxy<FileListService>` as a type to detect when a connection is closed or opened.
- Show info message when `getFiles` is called in `NodeFileListService.getFiles` with `MessageService.info`
  - Check that each window does not receive a notification from another window.