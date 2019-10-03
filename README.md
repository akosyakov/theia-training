# Exercise 2: Implement File List View

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#https://github.com/akosyakov/theia-training/tree/solution-2)

In this exercise, you learn:
- what is a widget and its lifecycle hooks;
- how to add a view (singleton widget);
- how to render in React;
- how to preserve a widget state between reloads.

### Task 1: Render a file list
- Implement rendering of a file list in `FileListWidget.render`.
- The model of `FileListWidget` is a current file with a path which a user followed to open this file.
It's represented in code like `FileListWidget.current` and `FileListWidget.path` properties.
- If a path is not emptry then render `..` as a first element.
When a user clicks on it the last element of a path should be opened.
You can do it by calling `FileListWidget.openParent`.
- If a current file has children, i.e. it's a directory, then for each child file render `FileComponent`.
When a user clicks on a child node the corresponding file should be opened.
You can do it by calling `FileListWidget.openChild`.

## Bonus

### Task 2: Implement a stateful widget
- Implement `StatefulWidget` by `FileListWidget` to preserve the path and current state when the page is reloaded.
- Show `File List` view by default only for the initial layout by renaming `FileListViewContribution.onStart` to `FileListViewContribution.initializeLayout`.

### Task 3: Render a file icon
- Implement rendering of a file icon in `FileComponent.render`
  - Use `LabelProvider.getIcon` to get an icon
  - Since `getIcon` is async the code should be refactored to first compute an icon and then trigger rerendering