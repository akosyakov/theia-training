# Exercise 4: Implement JSON-Form Widget Open Handler

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#https://github.com/akosyakov/theia-training/tree/solution-4)

In this exercise, you learn:
- how to add a new open handler;
- how to configure and use preferences;
- what is the navigatable widget and how to implement one.

### Task 1: Open JSON data file with JSON-Form by default

Your task is to implement for which file the JSON-Form widget should be opened, and when it should be used as a primary widget.
Right now, it can be opened for any file, and an editor widget has a priority over it.

Change `JsonschemaFormOpenHandler` in a way that:
- Only JSON files can be opened.
- If a file name ends with `-data` (e.g.  `simple-data.json`) then the JSON-form should be opened by default instead of the code editor.
- Otherwise the code editor should be opened.

### Task 2: Make suffix of JSON data files configurable

- `jsonschema-form-preferences.ts` defines `jsonschema-form.dataSuffix` preference which can be changes by a user: `File` -> `Settings` -> `Open Preferences`
- Using this preference in `JsonschemaFormOpenHandler` make suffix of JSON data files configurable.

## Bonus

### Task 3: Control when a JSON-Form widget should be opened with preferences

- Add a new preference `jsonschema-form.open` in `jsonschema-form-preferences.ts`. It should be of `string` type, but allow only following values:
  - `always` to open any JSON file with JSON-FORM widget;
  - `never` to never apply it;
  - and `default` to base it on suffix matching as it was implemented in Task 1.
- Change `JsonschemaFormOpenHandler` to respect this preference`

### Task 4: Auto reveal a file in the navigator for a JSON-Form widget

Navigatable widget is a widget which is backed up with a file resource.
The shell and some other components treat such widgets specially,
for example a widget gets properly renamed and closed if an underlying file gets moved or deleted,
a file for such widget can be revealed in the navigator, and so on.

- Implement `NavigatabelWidget` by  `JsonschemaFormWidget`.
