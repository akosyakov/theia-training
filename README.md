# Exercise 3: Implement File List View JSON-RPC Service

[![Gitpod - code now](https://img.shields.io/badge/Gitpod-code%20now-blue.svg?longCache=true)](https://gitpod.io#https://github.com/akosyakov/theia-training/tree/exercise-3)

In this exercise, you learn:
- how to add a new JSON-RPC service;
- how to handle reconnections;
- what is the connection scoping and how to work with multiple windows.

### Task 1: Implement a backend service
- Implement fetching files info for the given uri in `NodeFileListService.getFiles`:
  - use `fs-extra` module to check whether a path points to the directory with `stat(fsPath)`
  - use `fs-extra` module to read child directories with `readdir(fsPath)`
  - remember that only URIs can be passed between frontend and backend, never paths, see https://github.com/eclipse-theia/theia/wiki/Coding-Guidelines#uripath

## Bonus

### Task 2: Render when the backend service is offline
- Render offline mode when FileListService is disconnected in `FileListWidget.render`
  - Use `JsonRpcProxy<FileListService>` as a type to detect when a connection is closed or opened.

### Task 3: Notify when the backend service fetching files
- Show info message when `getFiles` is called in `NodeFileListService.getFiles` with `MessageService.info`
  - Check that each window does not receive a notification from another window.