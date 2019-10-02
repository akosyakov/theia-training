# Theia Workshop

[Theia](http://theia-ide.org/) is the new star on the dev tools sky: with Theia, you can write your own IDE-like applications that run as desktop tools as well as in the browser.
Theia is web-native, entirely written in Typescript, and offers a degree of customizability similar to Eclipse RCP.
It is open source and in the process of becoming an Eclipse project, backed by companies like TypeFox, Ericsson, ARM, RedHat, Google, IBM and SAP.

In this workshop, you’ll get acquainted with the base architecture of Theia, you will learn how to compose existing building blocks to author your own specialized IDE, and you will see how to implement your own extensions.

## Exercises

The workshop consists of several exercises.
For each exercise, there are 2 branches in the repository: one with an exercise and another with a solution.

### Getting started

During the workshop, you will use Theia-based Online IDE for GitHub - [Gitpod](https://gitpod.io/).
To start with the exercises you only need a modern browser. For the best experience, please use [Chrome](https://www.google.com/chrome/).
You can open any branch on GitHub by prefixing its URL with `gitpod.io#`.
For example, to open Gitpod for the exercise 0:
- go to the exercise's branch - https://github.com/akosyakov/theia-training/tree/exercise-0
- prefix it with `gitpod.io#` - [https://gitpod.io#https://github.com/akosyakov/theia-training/tree/exercise-0](https://gitpod.io/#https://github.com/TypeFox/theia-workshop/tree/exercise-0)

### [Exercise 0: Build Theia Application](https://github.com/akosyakov/theia-training/blob/exercise-0/EXERCISE.md#exercise-0-build-theia-application)

In this exercise, you learn:
- the structure of a Theia extension project;
- how to create a Theia application, build and run it;
- how to configure a Theia extension with dependency injection.

### [Exercise 1: Implement Quick File](https://github.com/akosyakov/theia-training/tree/exercise-1#exercise-1-implement-quick-file)

In this exercise, you learn:
- frontend and backend application lifecycle and contributions;
- how to register commands, keybindings and menus;
- how to use the command palette and the status bar;
- how to open files.

### [Exercise 2: Implement File List View](https://github.com/akosyakov/theia-training/tree/exercise-2#exercise-2-implement-file-list-view)

In this exercise, you learn:
- what is a widget and its lifecycle hooks;
- how to add a view (singleton widget);
- how to render in React;
- how to preserve a widget state between reloads.

### [Exercise 3: Implement File List View JSON-RPC Service](https://github.com/akosyakov/theia-training/tree/exercise-3#exercise-3-implement-file-list-view-json-rpc-service)

In this exercise, you learn:
- how to add a new JSON-RPC service;
- how to handle reconnections;
- what is the connection scoping and how to work with multiple windows.

### [Exercise 4: Implement JSON-Form Widget Open Handler](https://github.com/akosyakov/theia-training/tree/exercise-4#exercise-4-implement-json-form-widget-open-handler)

In this exercise, you learn:
- how to add a new open handler;
- how to configure and use preferences;
- what is the navigatable widget and how to implement one.

### [Exercise 5: Implement a Language Server](https://github.com/akosyakov/theia-training/tree/exercise-5#exercise-5-implement-a-language-server)

In this exercise, you learn:
- what is a language server protocol (LSP);
- how to integrate a language server via a native Theia extension;
- how to integrate a language server via a VS Code extension.

### [Exercise 6: Style and white-label Theia application](https://github.com/akosyakov/theia-training/tree/exercise-6#exercise-6-style-and-white-label-theia-application)

In this exercise, you learn:
- how to customize the default layout;
- how to customize the menu bar;
- how to remove functionality;
- how to customize theming.
