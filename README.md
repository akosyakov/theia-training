- Implement rendering of a file list in `FileListWidget.render`:
  - if a path is not empty then first `..` div element should be rendered which triggers `openParent` on click
  - if current stat has children then for each child `FileComponent` should be rendered which triggers `openChild` on click

### Bonus

- Implement `StatefulWidget` by `FileListWidget` to preserve the path and current state on the page reload.
- Implement rendering of a file icon in `FileComponent.render`
  - Use `LabelProvider.getIcon` to get an icon
  - Since `getIcon` is async the code should be refactored to first compute an icon and then trigger rerendering